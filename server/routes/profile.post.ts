import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { UserNotFoundError } from "~/utils/error";
import { isObjectEmpty } from "~/utils/objects";
import { db } from "~~/db";
import { users } from "~~/schema/user";

const bodySchema = z.object({
    // Base information
    common: z.record(z.any()),

    // Preference Information
    preference: z.record(z.any()),
});

// Check for changes in the user's profile
export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);

    const user = await getUser(event);

    if (!user) throw UserNotFoundError();

    // TODO: Check if user is company, apply company credits

    // Preference Updates
    if (!isObjectEmpty(body.preference)) {
        // Acquire the preference, then apply 'loose overwrite'
        const appliedPrefs = Object.assign(
            {},
            user.preferences,
            body.preference
        );
        await db
            .update(users)
            .set({ preferences: appliedPrefs })
            .where(eq(users.id, user.id));
    }

    // User Properties Update
    if (!isObjectEmpty(body.common)) {
        // Directly apply update
        await db.update(users).set(body.common).where(eq(users.id, user.id));
    }

    // Set last update
    await db
        .update(users)
        .set({ updatedAt: dayjs().toISOString() })
        .where(eq(users.id, user.id));
});

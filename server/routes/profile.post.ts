import { z } from "zod";
import { UserNotFoundError } from "~/utils/error";
import { isObjectEmpty } from "~/utils/objects";

const bodySchema = z.object({
    // Base information
    common: z.record(z.any()),

    // Preference Information
    preference: z.record(z.any()),
});

// Check for changes in the user's profile
export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);

    const user = await UserUtil.from(event);
    if (!user) throw UserNotFoundError();

    // Preference Updates
    if (!isObjectEmpty(body.preference)) {
        // TODO: Check if user is company, apply company credits
        //@ts-ignore
        await user.update({ preferences: body.preference });
    }

    // User Meta Update
    if (!isObjectEmpty(body.common)) {
        //@ts-ignore
        await user.update(body.common);
    }
});

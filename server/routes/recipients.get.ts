// A route for getting the checklist items

import { eq } from "drizzle-orm";
import { db } from "~~/db";
import { users } from "~~/schema/user";
import { getConversation } from "./messages.get";

export default defineEventHandler(async (event) => {
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    console.log(user);

    // Check if the user is a provider
    if (!isUser(user, "ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER")) {
        throw createError({
            status: 403,
            statusMessage: `User type is not allowed ${user.roles}`,
            message: "Only a provider user type is allowed in this entrypoint",
        });
    }

    // Get all user that has messaged this provider
    const recipients = await Promise.all(
        (
            await getConversation(user.id)
        ).map(async (m) => ({
            ...m.with,
            preferences: (
                await db.select().from(users).where(eq(users.id, m.with.id))
            ).at(0)!.preferences,
        }))
    );

    return recipients;
});

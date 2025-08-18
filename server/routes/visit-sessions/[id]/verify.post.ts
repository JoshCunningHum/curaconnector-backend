import { eq } from "drizzle-orm";
import { z } from "zod";
import { isUser } from "~/utils/isUser";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

const schema = z.object({
    token: z.string({ required_error: "Verification Token is required!" }),
});

export default defineEventHandler(async (event) => {
    const sid = parseInt(getRouterParam(event, "id") ?? "-1");
    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, sid));

    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    // User should only be a recipient
    if (!isUser(user, "ROLE_RECIPIENT")) {
        throw createError({
            status: 403,
            statusMessage: "User is not a recipient",
            message: "Only a recipient can verify a visit session",
        });
    }

    // User should be the target/recipeint of the visit session
    if (session.recipient !== user.id) {
        throw createError({
            status: 401,
            statusMessage: "User mistmatch",
            message:
                "Only the visit session recipient can verify their own visit session",
        });
    }

    // Check if passed code is correct
    const body = await validateBody(event, schema);
    if (session.verificationCode !== body.token) {
        throw createError({
            status: 403,
            statusMessage: "Invalid token",
            message: "Verification does not match",
        });
    }

    // If all checks are done, update the session data
    await db
        .update(visitSessions)
        .set({ isVerified: true, verifiedDate: new Date().toISOString() })
        .where(eq(visitSessions.id, sid));
});

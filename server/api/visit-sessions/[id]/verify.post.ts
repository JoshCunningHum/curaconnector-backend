import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

const schema = z.object({
    token: z.string({ required_error: "Verification Token is required!" }),
    tasks: z.array(z.string()),
});

export default defineEventHandler(async (event) => {
    const sid = parseInt(getRouterParam(event, "id") ?? "-1");
    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, sid));

    const user = await UserUtil.from(event);
    if (!user) throw UserNotFoundError();

    // User should only be a recipient
    if (!user.is("ROLE_RECIPIENT")) {
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

    // If all checks are done, update the session data and the checklist
    const newChecklist = Object.fromEntries(
        Object.entries(session.checklist).map(([k, v]) => [
            k,
            body.tasks.includes(k), // If current key is found in the tasks, then it is completed
        ])
    );

    console.log(newChecklist, body.token);

    await db
        .update(visitSessions)
        .set({ verifiedAt: new Date().toISOString(), checklist: newChecklist })
        .where(eq(visitSessions.id, sid));
});

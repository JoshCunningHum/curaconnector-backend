import { eq } from "drizzle-orm";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

export default defineEventHandler(async (event) => {
    const sid = parseInt(getRouterParam(event, "id") ?? "-1");
    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, sid));

    if (!session) {
        throw createError({
            status: 404,
            statusMessage: "Visit Session Not Found",
            message: "Provided Visit Session ID does not exist",
        });
    }

    // Compute completion rate
    const tasks = Object.entries(session.checklist);
    const taskcount = tasks.length;
    const finished = tasks.filter(([_, v]) => v).length;
    const completedRatio = ~((finished / (taskcount || 1)) * 100);

    // Get extra details on the users
    const recipient = await UserHelper.from(session.recipient);
    const visitor = await UserHelper.from(session.visitor);

    return {
        ...session,
        completed: completedRatio,
        recipient: recipient!.toJson(),
        visitor: visitor!.toJson(),
    };
});

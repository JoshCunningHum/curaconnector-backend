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
    const recipient = (await getUser(session.recipient))!;
    const visitor = (await getUser(session.visitor))!;

    return {
        ...session,
        completed: completedRatio,
        recipient: {
            id: recipient.id,
            name: await getName(recipient),
            profile: recipient.profilePicture,
        },
        visitor: {
            id: visitor.id,
            name: await getName(visitor),
            profile: visitor.profilePicture,
        },
    };
});

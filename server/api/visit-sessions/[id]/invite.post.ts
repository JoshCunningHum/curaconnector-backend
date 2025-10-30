import { eq } from "drizzle-orm";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

export default defineEventHandler(async (event) => {
    const user = await UserUtil.from(event);
    const vsId = parseInt(getRouterParam(event, "id") ?? "-1");

    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, vsId));

    console.log(session, vsId);

    // Update the invite date
    await db
        .update(visitSessions)
        .set({ invitedAt: new Date().toISOString() })
        .where(eq(visitSessions.id, vsId));

    // Send an invite notification to the recipient
    WSS.broadcast(
        session.recipient,
        "notif:visit-session-invite",
        user.name!,
        vsId,
        Object.keys(session.checklist)
    );
});

import { eq } from "drizzle-orm";
import { locationSharing } from "~/tasks/broadcast/locshare";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

export default defineEventHandler(async (event) => {
    const user = await UserUtil.from(event);
    if (!user.is("ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER")) {
        throw createError({
            statusCode: 403,
            statusMessage: "Invalid User",
            message: "Only providers can end a visit session",
        });
    }

    const vsId = parseInt(getRouterParam(event, "id") ?? "-1");
    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, vsId));

    if (session.visitor !== user.id) {
        throw createError({
            status: 403,
            statusMessage: "Invalid User",
            message: "Provider did not create the  session",
        });
    }

    // Update the end date
    await db
        .update(visitSessions)
        .set({ endedAt: new Date().toISOString() })
        .where(eq(visitSessions.id, vsId));

    // End location sharing sessions
    locationSharing.removeSession([session.recipient, session.visitor]);
    // Notify the recipient
    WSS.broadcast(session.recipient, "gps:end", session.visitor);
});

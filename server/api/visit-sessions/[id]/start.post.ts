import { eq } from "drizzle-orm";
import { locationSharing } from "~/tasks/broadcast/locshare";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

export default defineEventHandler(async (event) => {
    const vsId = parseInt(getRouterParam(event, "id") ?? "-1");

    const [session] = await db
        .select()
        .from(visitSessions)
        .where(eq(visitSessions.id, vsId));

    // Update start date
    await db
        .update(visitSessions)
        .set({ startedAt: new Date().toISOString() })
        .where(eq(visitSessions.id, vsId));

    // Create a location sharing sharing session
    locationSharing.addSession(session.recipient, session.visitor);

    // Send the accept notif to the provider
    WSS.broadcast(session.visitor, "notif:visit-session-accept", vsId);
});

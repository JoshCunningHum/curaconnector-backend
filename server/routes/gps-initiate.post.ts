import { eq } from "drizzle-orm";
import { z } from "zod";
import { locationSharing } from "~/tasks/broadcast/locshare";
import { db } from "~~/db";
import { messages } from "~~/schema/message";

const bodySchema = z.object({
    messageId: z.number(),
});

export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const msgId = body.messageId;
    const [msg] = await db
        .select()
        .from(messages)
        .where(eq(messages.id, msgId));

    // Create a session for this
    locationSharing.addSession(msg.sender, msg.receiver);
});

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
    const user = await UserUtil.from(event);

    const msgId = body.messageId;
    const [msg] = await db
        .select()
        .from(messages)
        .where(eq(messages.id, msgId));

    // Get conversation
    const conversation = await ConversationUtil.fromMessage(msg);
    // Get the 'other' members
    const [member] = conversation.other(user);

    // Create a session for this
    locationSharing.addSession(user.id, member.id);
});

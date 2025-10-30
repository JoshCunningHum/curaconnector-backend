// Get all messages from a certain user (paginated)

import { z } from "zod";
import { validateQuery } from "~/utils/validateBody";

const querySchema = z.object({
    limit: z.coerce.number().default(20),
    cursor: z.coerce.number().optional(), // The ID of the last message received
});

export default defineEventHandler(async (event) => {
    const user = await UserUtil.from(event);

    const other = parseInt(getRouterParam(event, "id")!);
    const otherUser = await UserUtil.from(other);

    const query = await validateQuery(event, querySchema);

    // Get the messages
    const [conversation] = await ConversationUtil.with(user, otherUser!);
    const messages = await conversation.messages(query);

    let nextCursor: number | null = null;
    if (messages.length === query.limit) {
        nextCursor = messages.at(-1)?.id ?? null;
    }

    messages.reverse();
    const response = { messages, nextCursor };

    return response;
});

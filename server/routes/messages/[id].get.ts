// Get all messages from a certain user (paginated)

import { z } from "zod";
import { and, desc, eq, or, lt } from "drizzle-orm";
import { db } from "../../../db";
import { messages } from "../../../schema/message";
import { validateQuery } from "~/utils/validateBody";

const querySchema = z.object({
    limit: z.coerce.number().default(20),
    cursor: z.coerce.number().optional(), // The ID of the last message received
});

export default defineEventHandler(async (event) => {
    const otherUserId = getRouterParam(event, "id");
    if (!otherUserId)
        throw createError({
            statusCode: 400,
            message: "Other user ID is required",
        });

    const query = await validateQuery(event, querySchema);
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const messageList = await db
        .select()
        .from(messages)
        .where(
            and(
                or(
                    and(
                        eq(messages.sender, user.id),
                        eq(messages.receiver, +otherUserId)
                    ),
                    and(
                        eq(messages.sender, +otherUserId),
                        eq(messages.receiver, user.id)
                    )
                ),
                query.cursor ? lt(messages.id, query.cursor) : undefined
            )
        )
        .orderBy(desc(messages.createdAt))
        .limit(query.limit);

    let nextCursor: number | null = null;
    if (messageList.length === query.limit) {
        nextCursor = messageList[messageList.length - 1].id;
    }

    messageList.reverse();
    const response = { messages: messageList, nextCursor };
    console.log(response);

    return response;
});

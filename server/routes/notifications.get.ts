// Get all notifications for the current user (paginated)

import { z } from "zod";
import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "../../db";
import { notifications } from "../../schema/notification";

const querySchema = z.object({
    limit: z.coerce.number().default(15),
    cursor: z.coerce.number().optional(), // The ID of the last notification received
});

export default defineEventHandler(async (event) => {
    const query = await getValidatedQuery(event, (q) => querySchema.parse(q));
    const user = await UserUtil.from(event);

    const notificationList = await db
        .select()
        .from(notifications)
        .where(
            and(
                eq(notifications.to, user.id),
                query.cursor ? lt(notifications.id, query.cursor) : undefined
            )
        )
        .orderBy(desc(notifications.createdAt))
        .limit(query.limit);

    let nextCursor: number | null = null;
    if (notificationList.length === query.limit) {
        nextCursor = notificationList.at(-1)!.id;
    }

    return { notifications: notificationList, nextCursor };
});

// Dispute a rating

import { z } from "zod";
import { and, eq, count } from "drizzle-orm";
import { db } from "~~/db";
import { ratingDisputes, ratings } from "~~/schema/ratings";

const bodySchema = z.object({
    message: z.string().min(10, "Dispute message must be at least 10 characters long."),
});

export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, "user_id");
    const ratingId = getRouterParam(event, "rating_id");
    if (!userId || !ratingId)
        throw createError({ statusCode: 400, message: "User ID and Rating ID are required" });

    const body = await validateBody(event, bodySchema);
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    // 1. Verify the rating exists and belongs to the user
    const [rating] = await db
        .select()
        .from(ratings)
        .where(and(eq(ratings.id, +ratingId), eq(ratings.to, user.id)));

    if (!rating) {
        throw createError({
            statusCode: 404,
            message: "Rating not found or you are not the recipient.",
        });
    }

    // 2. Check if the rating has already been disputed
    const [existingDispute] = await db
        .select({ value: count() })
        .from(ratingDisputes)
        .where(eq(ratingDisputes.ratingId, +ratingId));

    if (existingDispute.value > 0) {
        throw createError({ statusCode: 409, message: "This rating has already been disputed." });
    }

    // 3. Create the dispute
    const [newDispute] = await db
        .insert(ratingDisputes)
        .values({
            ratingId: +ratingId,
            message: body.message,
        })
        .returning();

    // 4. Mark the original rating as disputed
    await db.update(ratings).set({ disputed: true }).where(eq(ratings.id, +ratingId));

    return newDispute;
});

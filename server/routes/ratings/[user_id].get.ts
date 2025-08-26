// Get all ratings for a receiver (paginated), along with a summary

import { and, avg, count, desc, eq, lt } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../../db";
import { ratings } from "../../../schema/ratings";

const querySchema = z.object({
    limit: z.coerce.number().default(10),
    cursor: z.coerce.number().optional(), // The ID of the last rating received
});

export default defineEventHandler(async (event) => {
    const userId = getRouterParam(event, "user_id");
    if (!userId)
        throw createError({ statusCode: 400, message: "User ID is required" });

    const query = await getValidatedQuery(event, (q) => querySchema.parse(q));

    // Fetch the summary and the paginated ratings in parallel
    const [summaryResult, ratingList] = await Promise.all([
        db
            .select({
                averageRating: avg(ratings.rating),
                totalRatings: count(ratings.id),
            })
            .from(ratings)
            .where(eq(ratings.to, +userId)),

        db
            .select()
            .from(ratings)
            .where(
                and(
                    eq(ratings.to, +userId),
                    query.cursor ? lt(ratings.id, query.cursor) : undefined
                )
            )
            .orderBy(desc(ratings.createdAt))
            .limit(query.limit),
    ]);

    let nextCursor: number | null = null;
    if (ratingList.length === query.limit) {
        nextCursor = ratingList[ratingList.length - 1].id;
    }

    return {
        summary: {
            average: summaryResult[0]?.averageRating ?? 0,
            total: summaryResult[0]?.totalRatings ?? 0,
        },
        ratings: ratingList,
        nextCursor,
    };
});

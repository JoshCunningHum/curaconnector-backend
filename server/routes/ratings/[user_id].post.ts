// Create a new rating for a user

import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { visitSessions } from "~~/schema/visit-session";
import { db } from "../../../db";
import { ratings } from "../../../schema/ratings";
import { UserRole } from "../../../schema/user";

const bodySchema = z.object({
    rating: z.number().min(1).max(5),
    content: z.string().optional().default(""),
});

const ratingAuthors: UserRole[] = ["ROLE_RECIPIENT", "ROLE_COMPANY"];
const ratingReceivers: UserRole[] = ["ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER"];

export default defineEventHandler(async (event) => {
    const receiverId = parseInt(getRouterParam(event, "user_id") ?? "0");
    if (!receiverId)
        throw createError({
            statusCode: 400,
            message: "Receiver ID is required",
        });

    const body = await validateBody(event, bodySchema);
    const author = await UserUtil.from(event);

    // 1. Check user type permissions
    if (!author.is(...ratingAuthors)) {
        throw createError({
            statusCode: 403,
            message: "You are not authorized to create ratings.",
        });
    }

    const receiver = await UserUtil.from(receiverId);
    if (!receiver?.is(...ratingReceivers)) {
        throw createError({
            statusCode: 404,
            message:
                "The user you are trying to rate is not a valid rating receiver.",
        });
    }

    // 2. Check if a rating already exists
    const [existingRating] = await db
        .select({ value: count() })
        .from(ratings)
        .where(and(eq(ratings.author, author.id), eq(ratings.to, +receiverId)));

    if (existingRating.value > 0) {
        throw createError({
            statusCode: 409,
            message: "You have already rated this user.",
        });
    }

    // 3. Check for prior visit sessions
    const [sessions] = await db
        .select({ value: count() })
        .from(visitSessions)
        .where(
            and(
                eq(visitSessions.recipient, author.id),
                eq(visitSessions.visitor, receiver.id)
            )
        );

    if (sessions.value === 0) {
        throw createError({
            statusCode: 403,
            message: "You must have a prior visit session to rate this user.",
        });
    }

    // 3. Create the rating
    const [newRating] = await db
        .insert(ratings)
        .values({
            author: author.id,
            to: +receiverId,
            rating: body.rating,
            content: body.content,
        })
        .returning();

    return newRating;
});

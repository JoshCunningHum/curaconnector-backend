// Create a new rating for a user

import { z } from "zod";
import { and, eq, or, count } from "drizzle-orm";
import { db } from "../../../db";
import { ratings } from "../../../schema/ratings";
import { messages } from "../../../schema/message";
import { users, UserRole } from "../../../schema/user";
import { getUser } from "../../utils/getUser";

const bodySchema = z.object({
    rating: z.number().min(1).max(5),
    content: z.string().optional().default(""),
});

const ratingAuthors: UserRole[] = ["ROLE_RECIPIENT", "ROLE_COMPANY"];
const ratingReceivers: UserRole[] = ["ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER"];

export default defineEventHandler(async (event) => {
    const receiverId = getRouterParam(event, "user_id");
    if (!receiverId) throw createError({ statusCode: 400, message: "Receiver ID is required" });

    const body = await validateBody(event, bodySchema);
    const author = await getUser(event);
    if (!author) throw UserNotFoundError();

    // 1. Check user type permissions
    if (!author.roles.some((role) => ratingAuthors.includes(role))) {
        throw createError({
            statusCode: 403,
            message: "You are not authorized to create ratings.",
        });
    }

    const [receiver] = await db.select().from(users).where(eq(users.id, +receiverId));
    if (!receiver || !receiver.roles.some((role) => ratingReceivers.includes(role))) {
        throw createError({
            statusCode: 404,
            message: "The user you are trying to rate is not a valid rating receiver.",
        });
    }

    // 2. Check if a rating already exists
    const [existingRating] = await db
        .select({ value: count() })
        .from(ratings)
        .where(and(eq(ratings.author, author.id), eq(ratings.to, +receiverId)));

    if (existingRating.value > 0) {
        throw createError({ statusCode: 409, message: "You have already rated this user." });
    }

    // 3. Check for prior communication
    const [communication] = await db
        .select({ value: count() })
        .from(messages)
        .where(
            or(
                and(eq(messages.sender, author.id), eq(messages.receiver, +receiverId)),
                and(eq(messages.sender, +receiverId), eq(messages.receiver, author.id))
            )
        );

    if (communication.value === 0) {
        throw createError({
            statusCode: 403,
            message: "You must have a prior conversation to rate this user.",
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

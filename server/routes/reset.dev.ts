import { db } from "~~/db";
import { conversation, conversationMember } from "~~/schema/conversation";
import { favorites } from "~~/schema/favorites";
import { messages } from "~~/schema/message";
import { messageAccesses } from "~~/schema/message-access";
import { notifications } from "~~/schema/notification";
import { ratingDisputes, ratings } from "~~/schema/ratings";
import { visitSessions } from "~~/schema/visit-session";

export default defineEventHandler(async (event) => {
    await db.delete(messages);
    await db.delete(messageAccesses);
    await db.delete(conversationMember);
    await db.delete(conversation);

    // Favorites
    await db.delete(favorites);

    // Remove all notifications
    await db.delete(notifications);

    // Remove visit sessions
    await db.delete(visitSessions);

    // Ratings
    await db.delete(ratings);
    await db.delete(ratingDisputes);
});

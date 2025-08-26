import { integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const conversation = sqliteTable("conversation", {
    id: integer("id").primaryKey().unique(),
    // To be honest, I don't know what to put in here other than ID
});

export type Conversation = typeof conversation.$inferSelect;
export type NewConversation = typeof conversation.$inferInsert;

export const conversationMember = sqliteTable("conversation_member", {
    id: integer("id").primaryKey().unique(),
    conversationId: integer("group_id")
        .notNull()
        .references(() => conversation.id),
    userId: integer("user_id")
        .notNull()
        .references(() => users.id),
});

export type ConversationMember = typeof conversationMember.$inferSelect;
export type NewConversationMember = typeof conversationMember.$inferInsert;

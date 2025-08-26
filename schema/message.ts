import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { conversation } from "./conversation";

export const messageTypes = [
    "message",
    "gps:invite",
    "section",
    "notice",
] as const;
export type MessageType = (typeof messageTypes)[number];

export const messages = sqliteTable("messages", {
    id: integer("id").primaryKey().unique(),

    conversation: integer("conversation")
        .references(() => conversation.id)
        .notNull(),
    sender: integer("senderId")
        .references(() => users.id)
        .notNull(),

    content: text("content").notNull(),
    type: text("type").$type<MessageType>(),

    createdAt: text("createdAt")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

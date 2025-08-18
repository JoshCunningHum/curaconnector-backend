import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const messageTypes = ["gps:invite", "section", "notice"] as const;
export type MessageType = (typeof messageTypes)[number];

export const messages = sqliteTable("messages", {
    id: integer("id").primaryKey().unique(),

    sender: integer("senderId")
        .references(() => users.id)
        .notNull(),
    receiver: integer("receiverId")
        .references(() => users.id)
        .notNull(),

    content: text("content").notNull(),
    type: text("type").$type<MessageType>(),

    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    seen: integer("seen", { mode: "boolean" }).notNull().default(false),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

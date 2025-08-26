// This is a table where the company can grant/revoke access to roster providers

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { conversation } from "./conversation";
import { users } from "./user";

export const messageAccesses = sqliteTable("message_accesses", {
    id: integer("id").primaryKey().unique(),

    conversationId: integer("conversation_id")
        .references(() => conversation.id)
        .notNull(),
    companyId: integer("company_id")
        .references(() => users.id)
        .notNull(),
    rosterId: integer("roster_id")
        .references(() => users.id)
        .notNull(),
    recipientId: integer("recipient_id")
        .references(() => users.id)
        .notNull(),
    enabled: integer("enabled", { mode: "boolean" }).default(true).notNull(),

    createdAt: text("created_at")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),
    updatedAt: text("updated_at")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),
});

export type MessageAccess = typeof messageAccesses.$inferSelect;
export type NewMessageAccess = typeof messageAccesses.$inferInsert;

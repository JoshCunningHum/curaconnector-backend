import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const recipients = sqliteTable("recipients", {
    id: integer("id").primaryKey().unique(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),

    firstname: text("first_name").notNull(),
    lastname: text("last_name").notNull(),

    metadata: text("metadata", { mode: "json" }).$type<Record<string, any>>(),
});

export type Recipient = typeof recipients.$inferSelect;
export type NewRecipient = typeof recipients.$inferInsert;

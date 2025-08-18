import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const companies = sqliteTable("companies", {
    id: integer("id").primaryKey().unique(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),

    name: text("name").notNull(),
});

export type Company = typeof companies.$inferSelect;
export type NewCompany = typeof companies.$inferInsert;

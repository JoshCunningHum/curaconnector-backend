import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const rosterproviders = sqliteTable("roster_providers", {
    id: integer("id").primaryKey().unique(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    companyId: integer("company_id")
        .references(() => users.id)
        .notNull(),

    firstname: text("first_name").notNull(),
    lastname: text("last_name").notNull(),
});

export type RosterProvider = typeof rosterproviders.$inferSelect;
export type NewRosterProvider = typeof rosterproviders.$inferSelect;

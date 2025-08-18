import { sqliteTable, integer } from "drizzle-orm/sqlite-core";
import { users } from "./user";

// Used to intercept company messages
export const rosterAccess = sqliteTable("roster_access", {
    id: integer("id").primaryKey().unique(),
    recipient: integer("recipient_id")
        .references(() => users.id)
        .notNull(),
    roster: integer("roster_id")
        .references(() => users.id)
        .notNull()
        .unique(), // A roster member is handled only by 1 company
    state: integer("state", { mode: "boolean" }),
});

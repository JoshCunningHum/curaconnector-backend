import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const favorites = sqliteTable("favorites", {
    id: integer("id").primaryKey().unique(),
    by: integer("by")
        .references(() => users.id)
        .notNull(),
    to: integer("to")
        .references(() => users.id)
        .notNull(),

    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
});

export type Favorite = typeof favorites.$inferSelect;
export type NewFavorite = typeof favorites.$inferSelect;

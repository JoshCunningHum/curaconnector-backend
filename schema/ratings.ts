import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";

export const ratings = sqliteTable("ratings", {
    id: integer("id").primaryKey().unique(),
    author: integer("author_id")
        .references(() => users.id)
        .notNull(),
    to: integer("to_id")
        .references(() => users.id)
        .notNull(),

    rating: integer("rating").notNull(),
    content: text("content").notNull().default(""),

    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    disputed: integer("disputed", { mode: "boolean" }).default(false),
});

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;

export const ratingDisputes = sqliteTable("rating_disputes", {
    id: integer("id").primaryKey().unique(),
    ratingId: integer("rating_id")
        .references(() => ratings.id)
        .notNull(),

    message: text("message").notNull(),

    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    approved: integer("approved", { mode: "boolean" }).default(false),
});

export type RatingDispute = typeof ratingDisputes.$inferSelect;
export type NewRatingDispute = typeof ratingDisputes.$inferInsert;

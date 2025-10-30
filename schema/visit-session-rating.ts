import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { visitSessions } from "./visit-session";

export const VisitSessionRating = sqliteTable("VisitSessionRating", {
    id: int().primaryKey({ autoIncrement: true }),
    visitSession: int()
        .references(() => visitSessions.id)
        .notNull(),

    score: int().notNull(),
    details: text(),

    createdAt: int()
        .notNull()
        .$default(() => Date.now()),
});

export type VisitSessionRating = typeof VisitSessionRating.$inferSelect;
export type NewVisitSessionRating = typeof VisitSessionRating.$inferInsert;

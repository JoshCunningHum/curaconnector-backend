import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { users } from "./user";
import { PatientPreference } from "~/contants/preferences";

type CheckListItems = keyof PatientPreference;
export const visitSessions = sqliteTable("visit_sessions", {
    id: integer("id").primaryKey().unique(),
    visitor: integer("visitor")
        .references(() => users.id)
        .notNull(),
    recipient: integer("recipient")
        .references(() => users.id)
        .notNull(),
    createdAt: text("createdAt")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),

    checklist: text("checklist", { mode: "json" })
        .$type<Partial<Record<CheckListItems, boolean>>>()
        .notNull()
        .default({}),
    verificationCode: text("verification_code").notNull(),

    isVerified: integer("is_verified", { mode: "boolean" })
        .default(false)
        .notNull(),
    verifiedDate: text("verified_date"),
});

export type VisitSession = typeof visitSessions.$inferSelect;
export type NewVisitSession = typeof visitSessions.$inferInsert;

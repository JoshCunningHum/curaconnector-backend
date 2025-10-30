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

    // The point of creating the session
    createdAt: text("createdAt")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),

    // The point of sending the invite
    invitedAt: text("invitedAt"),

    // The point of accepting the invite
    startedAt: text("startedAt"),

    // The point where the provider ended the session
    endedAt: text("endedAt"), // Set by the provider

    // The point where the client successfully verified the session
    verifiedAt: text("verified_date"),

    checklist: text("checklist", { mode: "json" })
        .$type<Partial<Record<CheckListItems, boolean>>>()
        .notNull()
        .default({}),

    verificationCode: text("verification_code").notNull(),
});

export type VisitSession = typeof visitSessions.$inferSelect;
export type NewVisitSession = typeof visitSessions.$inferInsert;

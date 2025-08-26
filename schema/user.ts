import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
    PatientPreference,
    ProviderPreference,
} from "../server/contants/preferences";

// ROLES
export const userRolesMap = [
    "ROLE_USER", // The only purpose it to ensure array always have 1 role
    "ROLE_RECIPIENT",
    "ROLE_PROVIDER",
    "ROLE_ROSTER_PROVIDER",
    "ROLE_COMPANY",
] as const;
export type UserRole = (typeof userRolesMap)[number];

// Metadata
export type UserPreferences = PatientPreference | ProviderPreference;
export interface UserMetadata {
    firstname?: string;
    lastname?: string;
    name?: string;

    // For Rosters
    companyId?: number;
}

// Table
export const users = sqliteTable("users", {
    id: integer("id").primaryKey().unique(),

    email: text("email").notNull(),
    password: text("password").notNull(),

    roles: text("roles", { mode: "json" })
        .notNull()
        .$type<[UserRole, ...UserRole[]]>()
        .$defaultFn(() => ["ROLE_USER"]), // Types ensure that there should be at least 1 user type

    createdAt: text("createdAt")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),
    updatedAt: text("updatedAt")
        .$defaultFn(() => new Date().toISOString())
        .notNull(),

    isOnline: integer("isOnline", { mode: "boolean" }).default(false),
    lastLogin: text("lastLogin").$defaultFn(() => new Date().toISOString()),

    // Metadata
    preferences: text("preferences", { mode: "json" })
        .$type<UserPreferences>()
        //@ts-ignore
        .$defaultFn(() => ({})),

    metadata: text("metadata", { mode: "json" })
        .notNull()
        .default({})
        .$type<UserMetadata>(),

    profilePicture: text("profile_picture").default("default.png"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

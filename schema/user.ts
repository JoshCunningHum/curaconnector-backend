import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
    PatientPreference,
    ProviderPreference,
} from "../server/contants/preferences";
import { Recipient } from "./recipient";
import { Provider } from "./provider";
import { Company } from "./company";
import { RosterProvider } from "./rosterprovider";

export const userRolesMap = [
    "ROLE_USER", // The only purpose it to ensure array always have 1 role
    "ROLE_RECIPIENT",
    "ROLE_PROVIDER",
    "ROLE_ROSTER_PROVIDER",
    "ROLE_COMPANY",
] as const;
export type UserRole = (typeof userRolesMap)[number];

export const users = sqliteTable("users", {
    id: integer("id").primaryKey().unique(),

    email: text("email").notNull(),
    password: text("password").notNull(),

    roles: text("roles", { mode: "json" })
        .notNull()
        .$type<[UserRole, ...UserRole[]]>()
        .$defaultFn(() => ["ROLE_USER"]), // Types ensure that there should be at least 1 user type

    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
    updatedAt: text("updatedAt").$defaultFn(() => new Date().toISOString()),
    lastLogin: text("lastLogin"),

    coords: text("coordinates", { mode: "json" }).$type<{
        latitude: number;
        longitude: number;
    }>(),

    // Stored as a seperate field
    preferences: text("preferences", { mode: "json" }).$type<
        PatientPreference | ProviderPreference
    >(),

    // Metadata
    profilePicture: text("profile_picture"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// Sub Users
export type SubUser = Recipient | Provider | Company | RosterProvider;

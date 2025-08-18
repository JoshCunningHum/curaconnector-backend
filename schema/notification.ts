import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { users } from "./user";

type NotificationTypes = "message" | "rated" | "visit-session";

export const notifications = sqliteTable("notifications", {
    id: integer("id").primaryKey().unique(),
    to: integer("to_id")
        .references(() => users.id)
        .notNull(),

    type: text("type").notNull().$type<NotificationTypes>().default("message"),
    metadata: text("metadata", { mode: "json" }).notNull().$type<{
        subject: string; // The title of the notification
        description: string; // The extra details of the notification
        refer: number; // This could be a message id or rating id, base on the type
    }>(),

    read: integer("read", { mode: "boolean" }).default(false),
    createdAt: text("createdAt").$defaultFn(() => new Date().toISOString()),
});

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

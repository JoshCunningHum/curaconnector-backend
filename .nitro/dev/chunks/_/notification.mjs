import { sqliteTable, text, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const notifications = sqliteTable("notifications", {
  id: integer("id").primaryKey().unique(),
  to: integer("to_id").references(() => users.id).notNull(),
  type: text("type").notNull().$type().default("message"),
  metadata: text("metadata", { mode: "json" }).notNull().$type(),
  read: integer("read", { mode: "boolean" }).default(false),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString())
});

export { notifications as n };
//# sourceMappingURL=notification.mjs.map

import { sqliteTable, integer, text } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const messages = sqliteTable("messages", {
  id: integer("id").primaryKey().unique(),
  sender: integer("senderId").references(() => users.id).notNull(),
  receiver: integer("receiverId").references(() => users.id).notNull(),
  content: text("content").notNull(),
  type: text("type").$type(),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()),
  seen: integer("seen", { mode: "boolean" }).notNull().default(false)
});

export { messages as m };
//# sourceMappingURL=message.mjs.map

import { sqliteTable, integer, text } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const ratings = sqliteTable("ratings", {
  id: integer("id").primaryKey().unique(),
  author: integer("author_id").references(() => users.id).notNull(),
  to: integer("to_id").references(() => users.id).notNull(),
  rating: integer("rating").notNull(),
  content: text("content").notNull().default(""),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()),
  disputed: integer("disputed", { mode: "boolean" }).default(false)
});
const ratingDisputes = sqliteTable("rating_disputes", {
  id: integer("id").primaryKey().unique(),
  ratingId: integer("rating_id").references(() => ratings.id).notNull(),
  message: text("message").notNull(),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()),
  approved: integer("approved", { mode: "boolean" }).default(false)
});

export { ratingDisputes as a, ratings as r };
//# sourceMappingURL=ratings.mjs.map

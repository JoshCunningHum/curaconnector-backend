import { sqliteTable, text, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const favorites = sqliteTable("favorites", {
  id: integer("id").primaryKey().unique(),
  by: integer("by").references(() => users.id).notNull(),
  to: integer("to").references(() => users.id).notNull(),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString())
});

export { favorites as f };
//# sourceMappingURL=favorites.mjs.map

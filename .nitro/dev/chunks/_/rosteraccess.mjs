import { sqliteTable, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const rosterAccess = sqliteTable("roster_access", {
  id: integer("id").primaryKey().unique(),
  recipient: integer("recipient_id").references(() => users.id).notNull(),
  roster: integer("roster_id").references(() => users.id).notNull().unique(),
  // A roster member is handled only by 1 company
  state: integer("state", { mode: "boolean" })
});

export { rosterAccess as r };
//# sourceMappingURL=rosteraccess.mjs.map

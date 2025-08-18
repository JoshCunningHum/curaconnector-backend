import { sqliteTable, text, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users } from './nitro.mjs';

const visitSessions = sqliteTable("visit_sessions", {
  id: integer("id").primaryKey().unique(),
  visitor: integer("visitor").references(() => users.id).notNull(),
  recipient: integer("recipient").references(() => users.id).notNull(),
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()).notNull(),
  checklist: text("checklist", { mode: "json" }).$type().notNull().default({}),
  verificationCode: text("verification_code").notNull(),
  isVerified: integer("is_verified", { mode: "boolean" }).default(false).notNull(),
  verifiedDate: text("verified_date")
});

export { visitSessions as v };
//# sourceMappingURL=visit-session.mjs.map

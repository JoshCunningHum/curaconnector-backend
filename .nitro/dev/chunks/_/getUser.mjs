import { eq } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import { isEvent } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { sqliteTable, text, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { f as users, e as db, p as userRolesMap } from './nitro.mjs';

const companies = sqliteTable("companies", {
  id: integer("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull()
});

const providers = sqliteTable("providers", {
  id: integer("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  firstname: text("first_name").notNull(),
  lastname: text("last_name").notNull(),
  metadata: text("metadata", { mode: "json" }).$type()
});

const recipients = sqliteTable("recipients", {
  id: integer("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  firstname: text("first_name").notNull(),
  lastname: text("last_name").notNull(),
  metadata: text("metadata", { mode: "json" }).$type()
});

const rosterproviders = sqliteTable("roster_providers", {
  id: integer("id").primaryKey().unique(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyId: integer("company_id").references(() => users.id).notNull(),
  firstname: text("first_name").notNull(),
  lastname: text("last_name").notNull()
});

const isCallable = (fn) => {
  return typeof fn === "function";
};

async function getUser(obj) {
  if (typeof obj === "object") obj = obj.context.jwt.id;
  return (await db.select().from(users).where(eq(users.id, obj)))[0];
}
async function getUserSubtable(id) {
  let roles;
  if (typeof id === "number") {
    const user = await getUser(id);
    if (!user) throw new Error("User not found");
    roles = user.roles;
  } else {
    roles = id;
  }
  const subtable = await execBasedUserType(
    { id: -1, roles },
    {
      ROLE_RECIPIENT: recipients,
      ROLE_COMPANY: companies,
      ROLE_PROVIDER: providers,
      ROLE_ROSTER_PROVIDER: rosterproviders
    }
  );
  return subtable;
}
async function getUserConcrete(_user) {
  const user = isEvent(_user) ? await getUser(_user) : typeof _user === "number" ? await getUser(_user) : _user;
  if (!user) throw new Error(`User not found!`);
  const { roles, id } = user;
  const subtable = await getUserSubtable(roles);
  const query = db.select({
    sub: subtable,
    base: users
  }).from(users).leftJoin(subtable, eq(users.id, subtable.userId)).where(eq(users.id, id));
  const [result] = await query;
  if (!result) throw new Error("User congregate not found");
  return {
    sub: result.sub,
    user: result.base
  };
}
async function execBasedUserType(user, cbs) {
  const map = userRolesMap.slice(1);
  const fn = cbs[map.find((role) => user.roles.includes(role)) || "ROLE_USER"];
  if (!fn || fn === null) return;
  if (isCallable(fn)) return await fn(user);
  return fn;
}

export { getUserConcrete as a, recipients as b, companies as c, execBasedUserType as e, getUser as g, isCallable as i, providers as p, rosterproviders as r };
//# sourceMappingURL=getUser.mjs.map

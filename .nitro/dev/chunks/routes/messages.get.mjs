import { defineEventHandler } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { g as getUser, e as execBasedUserType, c as companies, b as recipients, r as rosterproviders, p as providers } from '../_/getUser.mjs';
import { U as UserNotFoundError } from '../_/error.mjs';
import { sql, getTableColumns, or, eq } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import { e as db, f as users } from '../_/nitro.mjs';
import { m as messages } from '../_/message.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ufo@1.6.1/node_modules/ufo/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import 'node:fs/promises';
import 'node:path';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/youch-core@0.3.2/node_modules/youch-core/build/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/youch@4.1.0-beta.8/node_modules/youch/build/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/source-map.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/plugin/isBetween.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import 'node:events';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/croner@9.1.0/node_modules/croner/dist/croner.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/std-env@3.9.0/node_modules/std-env/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/better-sqlite3/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/better-sqlite3@12.2.0/node_modules/better-sqlite3/lib/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/drivers/fs.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const messages_get = defineEventHandler(async (event) => {
  const user = await getUser(event);
  if (!user) throw UserNotFoundError();
  return await execBasedUserType(user, {
    ROLE_COMPANY: getMessagesCompany,
    ROLE_RECIPIENT: getMessagesCommon,
    ROLE_PROVIDER: getMessagesCommon,
    ROLE_ROSTER_PROVIDER: getMessagesCommon
  });
});
const getConversation = async (userID) => {
  const _withField = sql`CASE WHEN ${messages.sender} = ${userID} THEN ${messages.receiver} ELSE ${messages.sender} END`;
  const _rowNumber = sql`ROW_NUMBER() OVER (PARTITION BY ${_withField} ORDER BY ${messages.createdAt} DESC)`;
  const msg = db.select({
    with: _withField.as("with"),
    row: _rowNumber.as("row"),
    ...getTableColumns(messages)
  }).from(messages).where(or(eq(messages.sender, userID), eq(messages.receiver, userID))).as("subquery");
  const results = await db.select({
    with: {
      id: users.id,
      role: users.roles,
      name: sql`CASE
      WHEN ${users.roles} LIKE '%ROLE_COMPANY%' THEN ${companies.name}
      WHEN ${users.roles} LIKE '%ROLE_RECIPIENT%' THEN ${recipients.firstname} || ' ' || ${recipients.lastname}
      WHEN ${users.roles} LIKE '%ROLE_ROSTER_PROVIDER%' THEN ${rosterproviders.firstname} || ' ' || ${rosterproviders.lastname}
      WHEN ${users.roles} LIKE '%ROLE_PROVIDER%' THEN ${providers.firstname} || ' ' || ${providers.lastname}
      ELSE '' END`,
      profile: users.profilePicture
    },
    lastMsg: {
      sender: msg.sender,
      content: msg.content,
      type: msg.type,
      sentAt: msg.createdAt,
      seen: msg.seen
    }
  }).from(users).leftJoin(companies, eq(users.id, companies.userId)).leftJoin(recipients, eq(users.id, recipients.userId)).leftJoin(providers, eq(users.id, providers.userId)).leftJoin(rosterproviders, eq(users.id, rosterproviders.userId)).innerJoin(msg, eq(users.id, msg.with)).where(eq(msg.row, 1));
  return results;
};
async function getMessagesCompany(user) {
  const rosters = await db.select({
    r: getTableColumns(rosterproviders),
    u: getTableColumns(users)
  }).from(rosterproviders).leftJoin(users, eq(rosterproviders.userId, users.id)).where(eq(rosterproviders.companyId, user.id));
  const result = (await Promise.all(
    rosters.map(async (u) => {
      return (await getConversation(u.r.userId)).map((v) => {
        var _a;
        return {
          ...v,
          roster: {
            name: `${u.r.firstname} ${u.r.lastname}`,
            id: u.r.id,
            userId: u.r.userId,
            profile: (_a = u.u) == null ? void 0 : _a.profilePicture
          }
        };
      });
    })
  )).flat().toSorted(
    (a, b) => {
      var _a, _b;
      return new Date((_a = a.lastMsg.sentAt) != null ? _a : "0").getTime() - new Date((_b = b.lastMsg.sentAt) != null ? _b : "0").getTime();
    }
  );
  return result;
}
async function getMessagesCommon(user) {
  const _withField = sql`CASE WHEN ${messages.sender} = ${user.id} THEN ${messages.receiver} ELSE ${messages.sender} END`;
  const _rowNumber = sql`ROW_NUMBER() OVER (PARTITION BY ${_withField} ORDER BY ${messages.createdAt} DESC)`;
  const msg = db.select({
    with: _withField.as("with"),
    row: _rowNumber.as("row"),
    ...getTableColumns(messages)
  }).from(messages).where(or(eq(messages.sender, user.id), eq(messages.receiver, user.id))).as("subquery");
  const results = await db.select({
    with: {
      id: users.id,
      roles: users.roles,
      name: sql`CASE
                    WHEN ${users.roles} LIKE '%ROLE_COMPANY%' THEN ${companies.name}
                    WHEN ${users.roles} LIKE '%ROLE_RECIPIENT%' THEN ${recipients.firstname} || ' ' || ${recipients.lastname}
                    WHEN ${users.roles} LIKE '%ROLE_ROSTER_PROVIDER%' THEN ${rosterproviders.firstname} || ' ' || ${rosterproviders.lastname}
                    WHEN ${users.roles} LIKE '%ROLE_PROVIDER%' THEN ${providers.firstname} || ' ' || ${providers.lastname}
                ELSE '' END`,
      profile: users.profilePicture
    },
    lastMsg: {
      sender: msg.sender,
      content: msg.content,
      type: msg.type,
      sentAt: msg.createdAt,
      seen: msg.seen
    }
  }).from(users).leftJoin(companies, eq(users.id, companies.userId)).leftJoin(recipients, eq(users.id, recipients.userId)).leftJoin(providers, eq(users.id, providers.userId)).leftJoin(rosterproviders, eq(users.id, rosterproviders.userId)).innerJoin(msg, eq(users.id, msg.with)).where(eq(msg.row, 1));
  return results;
}

export { messages_get as default, getConversation };
//# sourceMappingURL=messages.get.mjs.map

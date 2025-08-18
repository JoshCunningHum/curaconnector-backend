import { defineEventHandler, createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { v as validateBody } from '../_/validateBody.mjs';
import { g as getUser } from '../_/getUser.mjs';
import { U as UserNotFoundError } from '../_/error.mjs';
import { g as getName } from '../_/getName.mjs';
import { e as db, W as WSS } from '../_/nitro.mjs';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import { n as notifications } from '../_/notification.mjs';
import { v as visitSessions } from '../_/visit-session.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
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
import 'node:events';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/croner@9.1.0/node_modules/croner/dist/croner.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/std-env@3.9.0/node_modules/std-env/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/better-sqlite3/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/better-sqlite3@12.2.0/node_modules/better-sqlite3/lib/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/drivers/fs.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const generateToken = (_config = {}) => {
  const { characters, length } = Object.assign({}, _config, {
    characters: "0123456789",
    length: 4
  });
  let r = "";
  for (let i = 0; i < length; i++) {
    const index = Math.random() * length;
    r += characters[index];
  }
  return r;
};

const bodySchema = z.object({
  recipient: z.number({ required_error: "Recipient ID is required" }),
  checklist: z.array(z.string({ required_error: "" }))
});
const index_post = defineEventHandler(async (event) => {
  const body = await validateBody(event, bodySchema);
  const recipientId = body.recipient;
  const user = await getUser(event);
  if (!user) throw UserNotFoundError();
  if (!["ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER"].some(
    (r) => user.roles.includes(r)
  )) {
    throw createError({
      status: 401,
      message: "Only provider user types can access this route",
      statusMessage: "Unauthorized"
    });
  }
  const recipient = await getUser(recipientId);
  if (!recipient) throw UserNotFoundError();
  if (!recipient.roles.includes("ROLE_RECIPIENT")) {
    throw createError({
      status: 400,
      message: `User[${recipientId}] is not a recipient`,
      statusMessage: "User is not a recipient"
    });
  }
  const code = generateToken({ length: 4 });
  const checklist = Object.fromEntries(body.checklist.map((k) => [k, false]));
  const [session] = await db.insert(visitSessions).values({
    recipient: recipientId,
    visitor: user.id,
    verificationCode: code,
    checklist
  }).returning();
  const [notif] = await db.insert(notifications).values({
    to: recipientId,
    type: "visit-session",
    metadata: {
      subject: `${await getName(user)} started a visit session`,
      description: `Session consists of ${body.checklist.length} service`,
      refer: user.id
    }
  }).returning();
  const isRecipientOnline = WSS.has(recipientId);
  if (isRecipientOnline) {
    WSS.broadcast(recipientId, "notif:visit-session", notif);
  }
  return session;
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map

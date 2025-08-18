import { defineEventHandler, getRouterParam, createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { v as validateBody } from '../../_/validateBody.mjs';
import { g as getUser, e as execBasedUserType, a as getUserConcrete } from '../../_/getUser.mjs';
import { U as UserNotFoundError } from '../../_/error.mjs';
import { g as getName } from '../../_/getName.mjs';
import { e as db, W as WSS } from '../../_/nitro.mjs';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import { n as notifications } from '../../_/notification.mjs';
import { m as messages } from '../../_/message.mjs';
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

const bodySchema = z.object({
  content: z.string().min(1).optional(),
  type: z.enum(["gps:invite"]).optional()
});
const _id__post = defineEventHandler(async (event) => {
  var _a, _b;
  const to = parseInt((_a = getRouterParam(event, "id")) != null ? _a : "-1");
  if (!to) {
    throw createError({
      statusCode: 400,
      message: "Recipient ID is required"
    });
  }
  const body = await validateBody(event, bodySchema);
  const user = await getUser(event);
  if (!user) throw UserNotFoundError();
  const receiver = await getUser(to);
  if (!receiver) {
    throw createError({
      statusCode: 404,
      message: "Message Receiver does not exist!"
    });
  }
  const receiverName = await getName(receiver);
  let msgContent = body.content || "";
  if (body.type === "gps:invite") {
    msgContent = JSON.stringify({ started: -1, ended: -1 });
  }
  const newMessageObj = {
    sender: user.id,
    receiver: +to,
    content: msgContent
  };
  if (body.type) newMessageObj.type = body.type;
  const [msg] = await db.insert(messages).values(newMessageObj).returning();
  const [notif] = await db.insert(notifications).values({
    to: user.id,
    metadata: {
      subject: `${receiverName} is trying to reach out`,
      description: (_b = body.content) != null ? _b : `${getName(user)} offered a location invite`,
      refer: to
    }
  }).returning();
  const isOnline = WSS.has(to);
  if (isOnline) {
    console.log("Sending message notification");
    WSS.broadcast(to, "message:reply", msg);
    WSS.broadcast(to, "notif:message", notif);
  } else {
    console.log("Message receiver is not connected to sockets");
  }
  await execBasedUserType(user, {
    // If the receiver is a roster provider, send notification to the company
    ROLE_ROSTER_PROVIDER: async () => {
      const roster = (await getUserConcrete(user)).sub;
      const isCompanyOnline = WSS.has(roster.companyId);
      if (!isCompanyOnline) {
        console.log("Company of message receiver not online");
        return;
      } else console.log("Sending message notification to company");
      WSS.broadcast(roster.companyId, "message:roster-reply", msg);
      WSS.broadcast(roster.companyId, "notif:message", notif);
    }
  });
  return msg;
});

export { _id__post as default };
//# sourceMappingURL=_id_.post.mjs.map

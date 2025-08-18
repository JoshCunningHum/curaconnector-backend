import { defineEventHandler, getRouterParam, createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { v as validateBody } from '../../_/validateBody.mjs';
import { U as UserNotFoundError } from '../../_/error.mjs';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import { eq, count, and, or } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import { e as db, f as users } from '../../_/nitro.mjs';
import { r as ratings } from '../../_/ratings.mjs';
import { m as messages } from '../../_/message.mjs';
import { g as getUser } from '../../_/getUser.mjs';
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
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/dist/index.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/drivers/fs.mjs';
import 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().optional().default("")
});
const ratingAuthors = ["ROLE_RECIPIENT", "ROLE_COMPANY"];
const ratingReceivers = ["ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER"];
const _user_id__post = defineEventHandler(async (event) => {
  const receiverId = getRouterParam(event, "user_id");
  if (!receiverId) throw createError({ statusCode: 400, message: "Receiver ID is required" });
  const body = await validateBody(event, bodySchema);
  const author = await getUser(event);
  if (!author) throw UserNotFoundError();
  if (!author.roles.some((role) => ratingAuthors.includes(role))) {
    throw createError({
      statusCode: 403,
      message: "You are not authorized to create ratings."
    });
  }
  const [receiver] = await db.select().from(users).where(eq(users.id, +receiverId));
  if (!receiver || !receiver.roles.some((role) => ratingReceivers.includes(role))) {
    throw createError({
      statusCode: 404,
      message: "The user you are trying to rate is not a valid rating receiver."
    });
  }
  const [existingRating] = await db.select({ value: count() }).from(ratings).where(and(eq(ratings.author, author.id), eq(ratings.to, +receiverId)));
  if (existingRating.value > 0) {
    throw createError({ statusCode: 409, message: "You have already rated this user." });
  }
  const [communication] = await db.select({ value: count() }).from(messages).where(
    or(
      and(eq(messages.sender, author.id), eq(messages.receiver, +receiverId)),
      and(eq(messages.sender, +receiverId), eq(messages.receiver, author.id))
    )
  );
  if (communication.value === 0) {
    throw createError({
      statusCode: 403,
      message: "You must have a prior conversation to rate this user."
    });
  }
  const [newRating] = await db.insert(ratings).values({
    author: author.id,
    to: +receiverId,
    rating: body.rating,
    content: body.content
  }).returning();
  return newRating;
});

export { _user_id__post as default };
//# sourceMappingURL=_user_id_.post.mjs.map

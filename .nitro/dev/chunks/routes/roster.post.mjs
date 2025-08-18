import { defineEventHandler, createError, readMultipartFormData } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { g as getUser, r as rosterproviders } from '../_/getUser.mjs';
import { U as UserNotFoundError } from '../_/error.mjs';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import { a as arrayBufferToString } from '../_/arrayBufferToString.mjs';
import { hash } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/argon2@0.43.0/node_modules/argon2/argon2.cjs';
import { A as ARGON_PARALLELISM, n as ARGON_TIMECOST, o as ARGON_MEMORYCOST, e as db, f as users } from '../_/nitro.mjs';
import { u as uploadPFP } from '../_/uploadPFP.mjs';
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

const hashString = (str) => hash(str, {
  memoryCost: ARGON_MEMORYCOST,
  timeCost: ARGON_TIMECOST,
  parallelism: ARGON_PARALLELISM
});

const roster_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const user = await getUser(event);
  if (!user) throw UserNotFoundError();
  if (!user.roles.includes("ROLE_COMPANY")) {
    throw createError({
      statusCode: 403,
      statusMessage: "Invalid Operation",
      message: "Only a company user type can create roster members"
    });
  }
  const body = await readMultipartFormData(event) || [];
  const profilePic = body.find((el) => el.name === "profile");
  if (!profilePic || !profilePic.filename) {
    throw createError({
      statusCode: 400,
      message: "Profile picture file is required."
    });
  }
  const _firstname = arrayBufferToString(
    (_a = body.find((el) => el.name === "firstname")) == null ? void 0 : _a.data
  );
  const _lastname = arrayBufferToString(
    (_b = body.find((el) => el.name === "lastname")) == null ? void 0 : _b.data
  );
  const _email = arrayBufferToString(
    (_c = body.find((el) => el.name === "email")) == null ? void 0 : _c.data
  );
  const _password = arrayBufferToString(
    (_d = body.find((el) => el.name === "password")) == null ? void 0 : _d.data
  );
  const { data, error } = z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email("Invalid Email"),
    password: z.string()
  }).safeParse({
    firstname: _firstname,
    lastname: _lastname,
    email: _email,
    password: _password
  });
  if (error) {
    throw createError({
      statusCode: 400,
      message: error.issues[0].message
    });
  }
  const profilePicPath = await uploadPFP(profilePic);
  const hashedpassword = await hashString(data.password);
  const [rosterUser] = await db.insert(users).values({
    email: data.email,
    password: hashedpassword,
    roles: ["ROLE_ROSTER_PROVIDER"],
    profilePicture: profilePicPath
  }).returning();
  const [roster] = await db.insert(rosterproviders).values({
    companyId: user.id,
    firstname: data.firstname,
    lastname: data.lastname,
    userId: rosterUser.id
  }).returning();
  return {
    id: rosterUser.id,
    rosterId: roster.id,
    profileURL: profilePicPath
  };
});

export { roster_post as default };
//# sourceMappingURL=roster.post.mjs.map

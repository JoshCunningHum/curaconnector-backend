import { defineEventHandler, readMultipartFormData, createError } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { a as arrayBufferToString } from '../_/arrayBufferToString.mjs';
import { d as safeTry, e as db, f as users, A as ARGON_PARALLELISM, n as ARGON_TIMECOST, o as ARGON_MEMORYCOST, g as safeAwait, i as createAccessToken, j as createRefreshToken, J as JWT_EXPIRES_IN, p as userRolesMap } from '../_/nitro.mjs';
import { u as uploadPFP } from '../_/uploadPFP.mjs';
import { hash } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/argon2@0.43.0/node_modules/argon2/argon2.cjs';
import { eq } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import { e as execBasedUserType, c as companies, b as recipients, p as providers } from '../_/getUser.mjs';
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

function get(...params) {
  const [_first, _second, _third] = params;
  if (Array.isArray(_first) && typeof _second === "string") {
    const arr = _first;
    return arr == null ? void 0 : arr.find((e) => e.name === _second);
  }
}

const recipientMetadata = z.object({
  firstname: z.string({ required_error: "Firstname is required!" }),
  lastname: z.string({ required_error: "Lastname is required!" })
});
const providerMetadata = z.object({
  firstname: z.string({ required_error: "Firstname is required!" }),
  lastname: z.string({ required_error: "Lastname is required!" })
});
const companyMetadata = z.object({
  name: z.string({ required_error: "Company name is required!" })
});
const bodySchema = z.object({
  email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
  password: z.string({ required_error: "Password is required" }).regex(/.*[A-Z]/, "Password must have at least 1 uppercase letter").regex(/.*[a-z]/, "Password must have at least 1 lowercase letter").regex(
    /.*[\!\@\$\.]/,
    "Password must contain at least 1 symbol (!, @, $, .)"
  ).min(8, "Password must be at least 8 characters long").max(500, "Password can't exceed 500 characters"),
  type: z.enum(userRolesMap, {
    message: "DevError: Invalid user type",
    required_error: "DevError: No usertype passed on user creation"
  }),
  metadata: z.union([recipientMetadata, providerMetadata, companyMetadata], {
    message: "Invalid Metadata type",
    required_error: "Metadata is required"
  })
});
const register_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const _body = await readMultipartFormData(event);
  const _email = arrayBufferToString((_a = get(_body, "email")) == null ? void 0 : _a.data);
  const _password = arrayBufferToString((_b = get(_body, "password")) == null ? void 0 : _b.data);
  const _type = arrayBufferToString((_c = get(_body, "type")) == null ? void 0 : _c.data);
  const _pfpData = get(_body, "profilePicture");
  const [_metadata, _] = safeTry(
    () => {
      var _a2, _b2;
      return JSON.parse((_b2 = arrayBufferToString((_a2 = get(_body, "metadata")) == null ? void 0 : _a2.data)) != null ? _b2 : "{}");
    }
  );
  const { data: body, error: _argError } = await bodySchema.safeParse({
    email: _email,
    password: _password,
    type: _type,
    metadata: _metadata
  });
  if (_argError) {
    console.log(
      "From validating form data",
      _argError.issues,
      _body == null ? void 0 : _body.map((el) => ({ ...el, data: arrayBufferToString(el.data) }))
    );
    throw createError({
      status: 400,
      message: _argError.issues[0].message
    });
  }
  const [existing] = await db.select().from(users).where(eq(users.email, body.email));
  if (existing) {
    throw createError({
      statusCode: 409,
      message: `Email ${body.email} already used. Please use another email`,
      statusMessage: "Email Conflict"
    });
  }
  const hashedpassword = await hash(body.password, {
    memoryCost: ARGON_MEMORYCOST,
    timeCost: ARGON_TIMECOST,
    parallelism: ARGON_PARALLELISM
  });
  const profileFileName = await uploadPFP(_pfpData);
  const [user] = await db.insert(users).values({
    email: body.email,
    password: hashedpassword,
    roles: [body.type],
    profilePicture: profileFileName
  }).returning();
  const [sub, error] = await safeAwait(
    execBasedUserType(user, {
      ROLE_PROVIDER: createProvider.bind(null, body),
      ROLE_RECIPIENT: createRecipient.bind(null, body),
      ROLE_COMPANY: createCompany.bind(null, body)
    })
  );
  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    });
  }
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      roles: user.roles,
      profile: user.profilePicture
    },
    sub,
    expiresIn: JWT_EXPIRES_IN
  };
});
const createProvider = async (body, user) => {
  const metadata = body.metadata;
  const [provider] = await db.insert(providers).values({ ...metadata, userId: user.id }).returning();
  return provider;
};
const createRecipient = async (body, user) => {
  const metadata = body.metadata;
  const [recipient] = await db.insert(recipients).values({ ...metadata, userId: user.id }).returning();
  return recipient;
};
const createCompany = async (body, user) => {
  const metadata = body.metadata || {};
  const [company] = await db.insert(companies).values({ ...metadata, userId: user.id }).returning();
  return company;
};

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map

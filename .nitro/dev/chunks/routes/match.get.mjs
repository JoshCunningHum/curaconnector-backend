import { defineEventHandler } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { i as isUser } from '../_/isUser.mjs';
import { eq, or, isNotNull, count, avg, and } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import dayjs from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js';
import { i as isCallable, g as getUser, r as rosterproviders, p as providers } from '../_/getUser.mjs';
import { d as safeTry, e as db, f as users } from '../_/nitro.mjs';
import { U as UserNotFoundError } from '../_/error.mjs';
import { f as favorites } from '../_/favorites.mjs';
import { r as ratings } from '../_/ratings.mjs';
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

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const _Preference = class _Preference {
  constructor(config) {
    __publicField(this, "invert");
    __publicField(this, "name");
    __publicField(this, "matchFn");
    this.matchFn = config.matchFn;
  }
  Inverted() {
    var _a;
    this.invert = !((_a = this.invert) != null ? _a : false);
    return this;
  }
  Name(name) {
    this.name = name;
    return this;
  }
  SkipFalseyDemand(...keys) {
    const odlfn = this.matchFn;
    this.matchFn = (demand, supply) => {
      const hasFalsey = keys.some((k) => !demand[k]);
      if (hasFalsey) return true;
      return odlfn(demand, supply);
    };
    return this;
  }
  SkipIfDemand(req) {
    const oldfn = this.matchFn;
    this.matchFn = (demand, supply) => {
      const valid = Object.entries(req).every(([k, v]) => {
        const dv = demand[k];
        if (isCallable(v)) return v(dv);
        return dv === v;
      });
      if (valid) return true;
      return oldfn(demand, supply);
    };
    return this;
  }
  SkipIfSupply(req) {
    const oldfn = this.matchFn;
    this.matchFn = (demand, supply) => {
      const valid = Object.entries(req).every(([k, v]) => {
        const dv = demand[k];
        if (isCallable(v)) return v(dv);
        return dv === v;
      });
      if (valid) return true;
      return oldfn(demand, supply);
    };
    return this;
  }
  // Static Builder
  static Custom(matchFn) {
    return new _Preference({ matchFn });
  }
  // Subset
  static Subset() {
    return ({
      demandKey,
      supplyKey
    }) => {
      return new _Preference({
        matchFn: (demand, supply) => demand[demandKey].every((t) => supply[supplyKey].includes(t))
      });
    };
  }
  // Match
  static Match() {
    return ({
      demandKey,
      supplyKey
    }) => new _Preference({
      matchFn: (demand, supply) => demand[demandKey] === supply[supplyKey]
    });
  }
  static Int() {
    return ({
      demandKey,
      supplyKey,
      strategy = "equal"
    }) => {
      return new _Preference({
        matchFn(demand, supply) {
          const d = demand[demandKey];
          const s = supply[supplyKey];
          return _Preference.IntStrategies[strategy](d, s);
        }
      });
    };
  }
  // # Pipeline
  static Pipeline(preferences, config = {}) {
    const steps = /* @__PURE__ */ new Map();
    const onFail = config.onFail || (() => {
    });
    Object.entries(preferences).forEach(([key, value]) => {
      if (!value.name) value.Name(key);
      steps.set(key, value);
    });
    return {
      $inferDemand: {},
      $inferSupply: {},
      check(a, b) {
        return [...steps.entries()].every(([key, p]) => {
          let [result, err] = safeTry(() => p.matchFn(a, b));
          if (!result && err) onFail(err.message, p.name, p);
          else if (!result) onFail("Failed match", p.name, p);
          return result !== !!p.invert;
        });
      },
      process(base, compares) {
        const bPref = base.preferences;
        console.log(`________________ Process matching: ${base.email} ___________________`);
        console.log(bPref);
        return compares.filter((o) => {
          const oPref = o.preferences;
          const result = this.check(bPref, oPref);
          console.log(oPref);
          console.log(`  ${!result ? "Failed" : "Successful"} Try: ${o.email}`);
          if (!result) return false;
          return true;
        });
      }
    };
  }
};
__publicField(_Preference, "IntStrategies", {
  equal: (a, b) => a === b,
  atleast: (a, b) => a >= b,
  atmost: (a, b) => a <= b,
  greater: (a, b) => a > b,
  lesser: (a, b) => a < b
});
let Preference = _Preference;

const skill = Preference.Subset()({
  demandKey: `prefTitle`,
  supplyKey: "title"
});
const language = Preference.Subset()({
  demandKey: "prefLanguage",
  supplyKey: "knownLanguage"
});
const religion = Preference.Subset()({
  demandKey: "religion",
  supplyKey: "religionAwareness"
});
const gender = Preference.Match()({
  demandKey: "prefGender",
  supplyKey: "gender"
}).SkipIfDemand({
  prefGender: (v) => v === "both" || !v
});
const experience = Preference.Match()({
  demandKey: "prefExperience",
  supplyKey: "experience"
});
const veteran = Preference.Match()({
  demandKey: "prefVeteran",
  supplyKey: "veteran"
});
const telemedicine = Preference.Match()({
  demandKey: "prefTelemed",
  supplyKey: "canTelemed"
});
const smoking = Preference.Match()({
  demandKey: "smokes",
  supplyKey: "smokes"
}).SkipIfDemand({ allowSmoke: true }).SkipIfSupply({ allowSmoke: true });
const privatepay = Preference.Int()({
  demandKey: "prefHourlyPay",
  supplyKey: "hourlyRate",
  strategy: "atmost"
});
const lifting = Preference.Int()({
  demandKey: "prefLift",
  supplyKey: "liftLimit",
  strategy: "atleast"
});
const dateRange = Preference.Custom((demand, supply) => {
  const dS = dayjs(demand.prefStart);
  const dE = dayjs(demand.prefEnd);
  const sS = dayjs(supply.canStart);
  const sE = dayjs(supply.canEnd);
  const startValid = dS.isBetween(sS, sE, "day", "[]");
  const endValid = dE.isBetween(sS, sE, "day", "[]");
  return startValid && endValid;
});
const preferences = Preference.Pipeline(
  {
    title: skill,
    language,
    religion,
    gender,
    experience,
    veteran,
    smoking,
    telemedicine,
    lifting,
    dateRange,
    privatepay
  },
  {
    onFail: (message, name, pref) => console.log(`	${message}
		@${name}`)
  }
);

const sensitiveUser = ({ password, ...rest }) => rest;

const match_get = defineEventHandler(async (event) => {
  const user = await getUser(event);
  if (!user) throw UserNotFoundError();
  const roles = user.roles;
  const rolesAllowed = ["ROLE_RECIPIENT", "ROLE_COMPANY"];
  if (!roles.some((r) => rolesAllowed.includes(r))) return [];
  let query = db.select({ base: users, prov: providers, rost: rosterproviders }).from(users).leftJoin(providers, eq(users.id, providers.userId));
  if (isUser(user, "ROLE_RECIPIENT")) {
    query = query.leftJoin(rosterproviders, eq(users.id, rosterproviders.id)).groupBy(users.id).where(or(isNotNull(rosterproviders.id), isNotNull(providers.id)));
  } else {
    query = query.groupBy(users.id).where(isNotNull(providers.id));
  }
  const providersArr = await query;
  const results = preferences.process(
    user,
    providersArr.map((f) => f.base)
  );
  const mapped = await Promise.all(
    results.map(async (_u) => {
      const u = sensitiveUser(_u);
      const q = providersArr.find((f) => f.base.id === u.id);
      const s = q.prov || q.rost;
      const [r] = await db.select({
        averageRating: avg(ratings.rating),
        totalRatings: count(ratings.id)
      }).from(ratings).where(eq(ratings.to, +u.id));
      const fCount = await db.select().from(favorites).where(and(eq(favorites.by, user.id), eq(favorites.to, u.id)));
      return {
        user: {
          id: u.id,
          name: `${s.firstname} ${s.lastname}`,
          profilePicture: u.profilePicture,
          details: u.preferences,
          score: r.averageRating || 0,
          scoreCount: r.totalRatings || 0
        },
        isFavourite: fCount.length > 0
      };
    })
  );
  console.log(`-------------------- Returned Matches ---------------------`);
  console.log(mapped);
  return mapped;
});

export { match_get as default };
//# sourceMappingURL=match.get.mjs.map

import destr from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/destr@2.0.5/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, getRequestHeader, getResponseHeader, getRequestHeaders, setResponseHeaders, setResponseStatus, send, createError, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/h3@1.15.3/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/hookable@5.5.3/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ofetch@1.4.1/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/node-mock-http@1.0.0/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ufo@1.6.1/node_modules/ufo/dist/index.mjs';
import { klona } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/klona@2.0.6/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/defu@6.1.4/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/scule@1.3.0/node_modules/scule/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/radix3@1.1.2/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import consola from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/consola@3.4.2/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/youch-core@0.3.2/node_modules/youch-core/build/index.js';
import { Youch } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/youch@4.1.0-beta.8/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/source-map@0.7.4/node_modules/source-map/source-map.js';
import dayjs from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js';
import isBetween from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/plugin/isBetween.js';
import { z } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/zod@3.25.67/node_modules/zod/dist/esm/index.js';
import EventEmitter from 'node:events';
import { Cron } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/croner@9.1.0/node_modules/croner/dist/croner.js';
import { isTest } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/std-env@3.9.0/node_modules/std-env/dist/index.mjs';
import jwt from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/jsonwebtoken@9.0.2/node_modules/jsonwebtoken/index.js';
import { eq } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/index.js';
import { drizzle } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/better-sqlite3/index.js';
import Database from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/better-sqlite3@12.2.0/node_modules/better-sqlite3/lib/index.js';
import { sqliteTable, text, integer } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/drizzle-orm@0.44.2_@types+b_8a624cc9ffd98e02c10a3d5dfc6bcc4d/node_modules/drizzle-orm/sqlite-core/index.js';
import { createStorage, prefixStorage } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/unstorage@1.16.0_db0@0.3.2__9166184297968f9042977213a3faa766/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file://D:/Documents/WebsitesPrograms/Work/Axel/backend/node_modules/.pnpm/ohash@2.0.11/node_modules/ohash/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"D:/Documents/WebsitesPrograms/Work/Axel/backend/server/assets"}];

const assets = createStorage();

for (const asset of serverAssets) {
  assets.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/Documents/WebsitesPrograms/Work/Axel/backend"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"D:/Documents/WebsitesPrograms/Work/Axel/backend/server"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/Documents/WebsitesPrograms/Work/Axel/backend/.nitro"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"D:/Documents/WebsitesPrograms/Work/Axel/backend/.nitro/cache"}));
storage.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"D:/Documents/WebsitesPrograms/Work/Axel/backend/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {}
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json || !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

function defineNitroPlugin(def) {
  return def;
}

const _AxYUmWvSnFs3sRfvzNo66QFm5DXwihwFmFXdwyd4JM = defineNitroPlugin(() => {
  dayjs.extend(isBetween);
  console.log("Loaded dayjs plugin");
});

const WebsocketMessageSchema = z.object({
  event: z.string().min(1, "Event name cannot be empty"),
  data: z.array(z.any()).optional().default([])
});
const createWSHandler = (cb) => cb;
function isWSConn(p) {
  if (typeof p !== "object") return false;
  if (!p) return false;
  return "peer" in p && "id" in p && "token" in p;
}

const scheduledTasks = [{"cron":"* * * * *","tasks":["broadcast:locshare"]}];

const tasks = {
  "broadcast:locshare": {
          meta: {
            description: "",
          },
          resolve: () => Promise.resolve().then(function () { return locshare$1; }).then(r => r.default || r),
        }
};

function defineTask(def) {
  if (typeof def.run !== "function") {
    def.run = () => {
      throw new TypeError("Task must implement a `run` method!");
    };
  }
  return def;
}
const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}
function startScheduleRunner() {
  if (!scheduledTasks || scheduledTasks.length === 0 || isTest) {
    return;
  }
  const payload = {
    scheduledTime: Date.now()
  };
  for (const schedule of scheduledTasks) {
    new Cron(schedule.cron, async () => {
      await Promise.all(
        schedule.tasks.map(
          (name) => runTask(name, {
            payload,
            context: {}
          }).catch((error) => {
            console.error(
              `Error while running scheduled task "${name}"`,
              error
            );
          })
        )
      );
    });
  }
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
class Member {
  constructor(config) {
    __publicField$1(this, "id");
    __publicField$1(this, "coord");
    this.id = config.id;
    this.coord = config.data;
  }
  isEqual(obj) {
    const id = Member.getId(obj);
    return this.id == id;
  }
  updateLocationPoolOf({ id, coord: data }) {
    WSS.broadcast(this.id, "gps:receive", id, ...data);
  }
  toString() {
    const [lat, lon] = this.coord;
    return `[${this.id}] ${lat},${lon}`;
  }
  // Helpers
  static getId(obj) {
    if (typeof obj === "number") return obj;
    return obj.id;
  }
  static create(user) {
    return new Member({ id: user, data: [0, 0] });
  }
}
class Session {
  constructor(p1, p2) {
    __publicField$1(this, "members");
    this.members = [p1, p2];
  }
  get memberIds() {
    return this.members.map((m) => m.id);
  }
  get(m) {
    const id = Member.getId(m);
    return this.members.find((m2) => m2.isEqual(id));
  }
  has(member) {
    const id = Member.getId(member);
    return this.members.some((m) => m.id === id);
  }
  isEqual(session) {
    if (Array.isArray(session)) return session.every(this.has);
    return this.members.every(session.has);
  }
  get id() {
    return this.memberIds.join("-");
  }
  static getId(s) {
    if (Array.isArray(s)) return s.join("-");
    return s.id;
  }
  updateLocationPools() {
    const [p1, p2] = this.members;
    console.log(`${p1} | ${p2}`);
    p1.updateLocationPoolOf(p2);
    p2.updateLocationPoolOf(p1);
  }
}
class LocationSharingManager {
  constructor() {
    __publicField$1(this, "members", /* @__PURE__ */ new Map());
    __publicField$1(this, "sessions", /* @__PURE__ */ new Map());
  }
  addSession(p1, p2) {
    var _a, _b;
    const m1 = (_a = this.members.get(p1)) != null ? _a : this.members.set(p1, Member.create(p1)).get(p1);
    const m2 = (_b = this.members.get(p2)) != null ? _b : this.members.set(p2, Member.create(p2)).get(p2);
    const s = new Session(m1, m2);
    if (this.getSession([m1, m2])) {
      console.log(
        `A location sharing session is already happening between [${p1}] and [${p2}]`
      );
      return;
    }
    this.sessions.set(s.id, s);
  }
  setLocation(m, coord) {
    const mid = Member.getId(m);
    const member = this.members.get(mid);
    if (member) {
      member.coord = coord;
    } else {
      console.log(`Failed to update un existing member[${mid}] location`);
    }
  }
  updateLocationPools() {
    if (!this.sessions.size) return;
    this.sessions.forEach((s) => s.updateLocationPools);
  }
  getSession(s) {
    return this.sessions.get(Session.getId(s));
  }
  getSessions(m) {
    return this.sessions.values().filter((s) => s.has(m)).toArray();
  }
  removeSession(s) {
    const session = this.getSession(s);
    if (!session) {
      console.log(
        `Attempted to remove unexisting location sharing session between ${Session.getId(
          s
        )}`
      );
      return;
    }
    console.log(`Deleting session between ${session.id}`);
    const members = session.members;
    this.sessions.delete(session.id);
    members.forEach((m) => {
      const sessionsLeft = this.getSessions(m).length;
      console.log(
        `Member[${m.id}] has ${sessionsLeft || "No"} session/s left`
      );
      if (sessionsLeft > 0) return;
      this.members.delete(m.id);
    });
  }
}

const interval = 1e3;
const max = 6e4 / interval;
const locationSharing = new LocationSharingManager();
const locshare = defineTask({
  meta: {
    name: "broadcast:locshare",
    description: "Broadcasts the location of every location-sharing sessions"
  },
  run({ payload, context }) {
    let n = 1;
    const id = setInterval(() => {
      if (n >= max) clearInterval(id);
      n++;
      locationSharing.updateLocationPools();
    }, interval);
    return { result: "Success" };
  }
});

const locshare$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  default: locshare,
  locationSharing: locationSharing
});

const gps_end = createWSHandler(async (peer, other) => {
  const own = WSS.getId(peer);
  locationSharing.removeSession([own, other]);
  WSS.broadcast(other, "gps:end", own);
});

const gps_send = createWSHandler(
  async (peer, latitude, longitude) => {
    const uid = WSS.getId(peer);
    locationSharing.setLocation(uid, [latitude, longitude]);
  }
);

function safeTry(fn) {
  try {
    return [fn(), null];
  } catch (err) {
    return [null, err];
  }
}
async function safeAwait(fnOrPromise) {
  try {
    const result = typeof fnOrPromise === "function" ? await fnOrPromise() : await fnOrPromise;
    return [result, null];
  } catch (err) {
    return [null, err];
  }
}

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  console.warn(
    "\u26A0\uFE0F  JWT_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
  );
  return "dev-jwt-secret-curaconnector";
})();
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || (() => {
  console.warn(
    "\u26A0\uFE0F  JWT_REFRESH_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
  );
  return "dev-jwt-refresh-secret-curaconnector";
})();
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
process.env.JWT_REFRESH_EXPIRES_IN || "7d";
const ARGON_MEMORYCOST = parseInt(process.env.ARGON_MEMORYCOST || "65536");
const ARGON_TIMECOST = parseInt(process.env.ARGON_TIMECOST || "3");
const ARGON_PARALLELISM = parseInt(process.env.ARGON_PARALLELISM || "1");

const createAccessToken = ({ id, email }) => {
  return jwt.sign({ id, email, type: "access" }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};
const createRefreshToken = ({ id, email }) => {
  return jwt.sign({ id, email, type: "refresh" }, JWT_REFRESH_SECRET);
};
const decodeToken = async (token, secret = JWT_REFRESH_SECRET) => {
  return new Promise((res, rej) => {
    jwt.verify(token, secret, {}, (err, decoded) => {
      if (err) rej(err);
      else res(decoded);
    });
  });
};
const refreshTokens = /* @__PURE__ */ new Set();

const init = createWSHandler(
  async (peer, id, token, custodian = false) => {
    const [decoded, err] = await safeAwait(decodeToken(token, JWT_SECRET));
    if (err) {
      console.log("Initialization Error: Token invalid");
      peer.send({ event: "error", data: ["Token invalid"] });
      return;
    }
    if (decoded.id !== id) {
      console.log("Initialization Error: Token invalid");
      peer.send({ event: "error", data: ["Token invalid"] });
      return;
    }
    WSS.add({ peer, id, token, custodian });
    WSS.broadcast(peer, "init:reply", "Initialization Complete");
    console.log(
      `Peer: ${decoded.email} [${decoded.id}] has been initialized`
    );
  }
);

const ping = createWSHandler(async (peer) => {
  peer.send("pong");
});

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const handlers$1 = { ping, init, gps_send, gps_end };
class WSS {
  static get conns() {
    return this.cmap.values().flatMap((g) => g.values().toArray()).toArray();
  }
  static getId(c) {
    var _a, _b;
    if (typeof c === "number") return c;
    const pid = this.getPeerId(c);
    return (_b = (_a = this.conns.find((conn) => conn.peer.id === pid)) == null ? void 0 : _a.id) != null ? _b : -1;
  }
  static getPeerId(c) {
    if (typeof c === "string") return c;
    return isWSConn(c) ? c.peer.id : c.id;
  }
  static getPeer(peer) {
    const uid = this.getId(peer);
    const pid = this.getPeerId(peer);
    const conn = this.cmap.get(uid);
    return conn == null ? void 0 : conn.get(pid);
  }
  static getPeers(peer) {
    var _a, _b;
    const uid = this.getId(peer);
    return (_b = (_a = this.cmap.get(uid)) == null ? void 0 : _a.values().toArray()) != null ? _b : [];
  }
  static add(c) {
    var _a;
    const uid = this.getId(c.id);
    const map = (_a = this.cmap.get(uid)) != null ? _a : /* @__PURE__ */ new Map();
    if (!this.cmap.has(uid)) this.cmap.set(uid, map);
    map.set(c.peer.id, c);
    this.events.listeners("open").forEach((cb) => cb(c));
  }
  static remove(peer) {
    const uid = this.getId(peer);
    const map = this.cmap.get(uid);
    const conn = map == null ? void 0 : map.get(peer);
    if (conn) this.events.listeners("close").forEach((cb) => cb(conn));
    map == null ? void 0 : map.delete(peer);
  }
  static broadcast(uid, event, ...data) {
    const conns = this.getPeers(uid);
    if (conns.length === 0) {
      console.warn(`Broadcasting to an unexisting peer: ${uid}`);
      return;
    }
    conns.forEach((p) => p.peer.send({ event, data }));
  }
  static send(id, event, ...data) {
    const conn = this.getPeer(id);
    if (!conn) {
      console.warn(`Sending to an unexisting peer: ${id}`);
      return;
    }
    conn.peer.send({ event, data });
  }
  static has(pId) {
    return this.getPeers(pId).length > 0;
  }
  // Peer Events
  static on(type, cb) {
    return this.events.on(type, cb);
  }
  static off(type, cb) {
    return this.events.off(type, cb);
  }
}
__publicField(WSS, "cmap", /* @__PURE__ */ new Map());
__publicField(WSS, "events", new EventEmitter());

const sqlite = new Database(process.env.DB_URL || "./data/db.sqlite");
const db = drizzle({ client: sqlite });

const userRolesMap = [
  "ROLE_USER",
  // The only purpose it to ensure array always have 1 role
  "ROLE_RECIPIENT",
  "ROLE_PROVIDER",
  "ROLE_ROSTER_PROVIDER",
  "ROLE_COMPANY"
];
const users = sqliteTable("users", {
  id: integer("id").primaryKey().unique(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  roles: text("roles", { mode: "json" }).notNull().$type().$defaultFn(() => ["ROLE_USER"]),
  // Types ensure that there should be at least 1 user type
  createdAt: text("createdAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()),
  updatedAt: text("updatedAt").$defaultFn(() => (/* @__PURE__ */ new Date()).toISOString()),
  lastLogin: text("lastLogin"),
  coords: text("coordinates", { mode: "json" }).$type(),
  // Stored as a seperate field
  preferences: text("preferences", { mode: "json" }).$type(),
  // Metadata
  profilePicture: text("profile_picture")
});

const _zE8ZRVxIP1oUXqj1x7NN0Ia510GR8a_8JF8L2v6I5w = defineNitroPlugin(async (nitro) => {
  WSS.on("close", async (conn) => {
    const peers = WSS.getPeers(conn);
    console.log(
      `[WS-CLOSE] ${conn.id}-${conn.peer.id}${peers.length > 1 ? ` <${peers.length - 1}> Connection Left` : ""}`
    );
    await db.update(users).set({ lastLogin: dayjs().toISOString() }).where(eq(users.id, conn.id));
  });
});

const plugins = [
  _AxYUmWvSnFs3sRfvzNo66QFm5DXwihwFmFXdwyd4JM,
_zE8ZRVxIP1oUXqj1x7NN0Ia510GR8a_8JF8L2v6I5w
];

const anonRoutes = [
  // Non-Auth Routes
  "/login",
  "/register",
  // Images (handled by the images middleware for auth/verification)
  /^\/images\/.*/
];
const isAnonRoute = (path) => anonRoutes.some((p) => typeof p === "string" ? p === path : p.test(path));
const _m810OB = defineEventHandler(async (event) => {
  console.log(
    `${{ get: "Fetching", post: "Posting" }[event.method.toLowerCase()]}: ${event.path}`
  );
  if (isAnonRoute(event.path)) return;
  const authHeaders = event.headers.get("Authorization");
  if (!authHeaders) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized access"
    });
  }
  const token = authHeaders.split(" ")[1];
  const [decoded, err] = await safeAwait(decodeToken(token, JWT_SECRET));
  if (err) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized Access"
    });
  }
  event.context.jwt = decoded;
});

const _lazy_Z2hRUc = () => import('../routes/api/gps.mjs');
const _lazy_ROzNBd = () => import('../routes/_ws.mjs');
const _lazy_2GYMM9 = () => import('../routes/favorites.get.mjs');
const _lazy_iTD2aP = () => import('../routes/favorites.post.mjs');
const _lazy_Yj63gX = () => import('../routes/give-roster-access.mjs');
const _lazy_9PdMuU = () => import('../routes/gps-initiate.post.mjs');
const _lazy_3H0tAK = () => import('../routes/index.dev.mjs');
const _lazy_4aZWUm = () => import('../routes/login.post.mjs');
const _lazy_8lQN3z = () => import('../routes/logout.mjs');
const _lazy_zd3Udo = () => import('../routes/match.get.mjs');
const _lazy_NB4Xnw = () => import('../routes/messages.get.mjs');
const _lazy_VUR73L = () => import('../routes/messages/_id_.get.mjs');
const _lazy_4rBn94 = () => import('../routes/messages/_id_.post.mjs');
const _lazy_jqE6_U = () => import('../routes/notifications.get.mjs');
const _lazy_ln9BmK = () => import('../routes/profile.get.mjs');
const _lazy_Gmxy1_ = () => import('../routes/profile.post.mjs');
const _lazy_AFhXkv = () => import('../routes/profile.put.mjs');
const _lazy_Ukik7s = () => import('../routes/ratings/_user_id_.get.mjs');
const _lazy_fPEN_J = () => import('../routes/ratings/_user_id_.post.mjs');
const _lazy_ZaV7xj = () => import('../routes/ratings/_user_id/dispute/_rating_id_.post.mjs');
const _lazy_mI5dIq = () => import('../routes/recipients.get.mjs');
const _lazy_0Yg5hf = () => import('../routes/refresh.post.mjs');
const _lazy_Cb8G2H = () => import('../routes/register.post.mjs');
const _lazy_YboCyW = () => import('../routes/revoke-roster-access.mjs');
const _lazy_nM6N_P = () => import('../routes/roster.post.mjs');
const _lazy_GpslI3 = () => import('../routes/set-coord.post.dev.mjs');
const _lazy_ZNq7eT = () => import('../routes/subscription.dev.post.mjs');
const _lazy_Srf8Mn = () => import('../routes/subscription.get.mjs');
const _lazy_Kxt04R = () => import('../routes/visit-sessions/index.get.mjs');
const _lazy_5wJwoC = () => import('../routes/visit-sessions/_id/verify.post.mjs');
const _lazy_yQKaEP = () => import('../routes/index.get.mjs');
const _lazy_NI90bD = () => import('../routes/index.post.mjs');

const handlers = [
  { route: '', handler: _m810OB, lazy: false, middleware: true, method: undefined },
  { route: '/api/gps', handler: _lazy_Z2hRUc, lazy: true, middleware: false, method: undefined },
  { route: '/_ws', handler: _lazy_ROzNBd, lazy: true, middleware: false, method: undefined },
  { route: '/favorites', handler: _lazy_2GYMM9, lazy: true, middleware: false, method: "get" },
  { route: '/favorites', handler: _lazy_iTD2aP, lazy: true, middleware: false, method: "post" },
  { route: '/give-roster-access', handler: _lazy_Yj63gX, lazy: true, middleware: false, method: undefined },
  { route: '/gps-initiate', handler: _lazy_9PdMuU, lazy: true, middleware: false, method: "post" },
  { route: '/', handler: _lazy_3H0tAK, lazy: true, middleware: false, method: undefined },
  { route: '/login', handler: _lazy_4aZWUm, lazy: true, middleware: false, method: "post" },
  { route: '/logout', handler: _lazy_8lQN3z, lazy: true, middleware: false, method: undefined },
  { route: '/match', handler: _lazy_zd3Udo, lazy: true, middleware: false, method: "get" },
  { route: '/messages', handler: _lazy_NB4Xnw, lazy: true, middleware: false, method: "get" },
  { route: '/messages/:id', handler: _lazy_VUR73L, lazy: true, middleware: false, method: "get" },
  { route: '/messages/:id', handler: _lazy_4rBn94, lazy: true, middleware: false, method: "post" },
  { route: '/notifications', handler: _lazy_jqE6_U, lazy: true, middleware: false, method: "get" },
  { route: '/profile', handler: _lazy_ln9BmK, lazy: true, middleware: false, method: "get" },
  { route: '/profile', handler: _lazy_Gmxy1_, lazy: true, middleware: false, method: "post" },
  { route: '/profile', handler: _lazy_AFhXkv, lazy: true, middleware: false, method: "put" },
  { route: '/ratings/:user_id', handler: _lazy_Ukik7s, lazy: true, middleware: false, method: "get" },
  { route: '/ratings/:user_id', handler: _lazy_fPEN_J, lazy: true, middleware: false, method: "post" },
  { route: '/ratings/:user_id/dispute/:rating_id', handler: _lazy_ZaV7xj, lazy: true, middleware: false, method: "post" },
  { route: '/recipients', handler: _lazy_mI5dIq, lazy: true, middleware: false, method: "get" },
  { route: '/refresh', handler: _lazy_0Yg5hf, lazy: true, middleware: false, method: "post" },
  { route: '/register', handler: _lazy_Cb8G2H, lazy: true, middleware: false, method: "post" },
  { route: '/revoke-roster-access', handler: _lazy_YboCyW, lazy: true, middleware: false, method: undefined },
  { route: '/roster', handler: _lazy_nM6N_P, lazy: true, middleware: false, method: "post" },
  { route: '/set-coord', handler: _lazy_GpslI3, lazy: true, middleware: false, method: "post" },
  { route: '/subscription.dev', handler: _lazy_ZNq7eT, lazy: true, middleware: false, method: "post" },
  { route: '/subscription', handler: _lazy_Srf8Mn, lazy: true, middleware: false, method: "get" },
  { route: '/visit-sessions/:id', handler: _lazy_Kxt04R, lazy: true, middleware: false, method: "get" },
  { route: '/visit-sessions/:id/verify', handler: _lazy_5wJwoC, lazy: true, middleware: false, method: "post" },
  { route: '/visit-sessions', handler: _lazy_yQKaEP, lazy: true, middleware: false, method: "get" },
  { route: '/visit-sessions', handler: _lazy_NI90bD, lazy: true, middleware: false, method: "post" }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(nodeHandler, aRequest);
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

export { ARGON_PARALLELISM as A, JWT_EXPIRES_IN as J, WSS as W, tasks as a, startScheduleRunner as b, WebsocketMessageSchema as c, safeTry as d, db as e, users as f, safeAwait as g, handlers$1 as h, createAccessToken as i, createRefreshToken as j, refreshTokens as k, locationSharing as l, decodeToken as m, ARGON_TIMECOST as n, ARGON_MEMORYCOST as o, userRolesMap as p, runTask as r, scheduledTasks as s, trapUnhandledNodeErrors as t, useNitroApp as u };
//# sourceMappingURL=nitro.mjs.map

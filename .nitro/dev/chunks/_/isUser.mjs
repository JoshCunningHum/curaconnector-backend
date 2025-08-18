import { g as getUser } from './getUser.mjs';

function isUser(user, ...roles) {
  if (typeof user === "number") {
    return new Promise((res, rej) => {
      getUser(user).then((u) => roles.some((r) => u == null ? void 0 : u.roles.includes(r)));
    });
  }
  return roles.some((r) => user.roles.includes(r));
}

export { isUser as i };
//# sourceMappingURL=isUser.mjs.map

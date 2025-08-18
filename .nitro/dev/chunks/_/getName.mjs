import { g as getUser, a as getUserConcrete } from './getUser.mjs';

async function getName(obj) {
  if (typeof obj === "number") {
    const user = await getUser(obj);
    return await getName(user);
  } else if ("roles" in obj) {
    const cong = await getUserConcrete(obj);
    if (!cong) return;
    return await getName(cong.sub);
  } else {
    if ("name" in obj) return obj.name;
    else return `${obj.firstname} ${obj.lastname}`;
  }
}

export { getName as g };
//# sourceMappingURL=getName.mjs.map

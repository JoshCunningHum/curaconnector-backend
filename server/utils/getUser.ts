import { eq } from "drizzle-orm";
import { H3Event, isEvent } from "h3";
import { NonEmptyArray, RequiredOnlyBy } from "~/types/Utils";
import { companies } from "~~/schema/company";
import { providers } from "~~/schema/provider";
import { recipients } from "~~/schema/recipient";
import { rosterproviders } from "~~/schema/rosterprovider";
import { SubUser, User, UserRole, userRolesMap, users } from "~~/schema/user";
import { db } from "../../db";
import { isCallable } from "./typeguards";

// # Get User Plain
export async function getUser(id: number): Promise<User | undefined>;
export async function getUser(event: H3Event): Promise<User | undefined>;
export async function getUser(
    obj: number | H3Event
): Promise<User | undefined> {
    if (typeof obj === "object") obj = obj.context.jwt.id;
    return (await db.select().from(users).where(eq(users.id, obj)))[0];
}

// # Get User SubTable (recipient/provider/company etc)
type UserLike = RequiredOnlyBy<User, "id" | "roles">;

interface UserCongregate {
    user: User;
    sub: SubUser;
}
type UserSubtables =
    | typeof companies
    | typeof recipients
    | typeof rosterproviders
    | typeof providers;

export async function getUserSubtable(
    roles: NonEmptyArray<UserRole>
): Promise<UserSubtables>;
export async function getUserSubtable(id: number): Promise<UserSubtables>;
export async function getUserSubtable(
    id: number | NonEmptyArray<UserRole>
): Promise<UserSubtables> {
    let roles: NonEmptyArray<UserRole>;

    if (typeof id === "number") {
        const user = await getUser(id);

        if (!user) throw new Error("User not found");
        roles = user.roles;
    } else {
        roles = id;
    }

    const subtable = await execBasedUserType(
        { id: -1, roles },
        {
            ROLE_RECIPIENT: recipients,
            ROLE_COMPANY: companies,
            ROLE_PROVIDER: providers,
            ROLE_ROSTER_PROVIDER: rosterproviders,
        }
    );

    return subtable!;
}

// # Get User Concrete (user with its concrete row)
export async function getUserConcrete(
    event: H3Event
): Promise<UserCongregate | undefined>;
export async function getUserConcrete(
    user: UserLike
): Promise<UserCongregate | undefined>;
export async function getUserConcrete(
    user: number
): Promise<UserCongregate | undefined>;
export async function getUserConcrete(
    _user: UserLike | H3Event | number
): Promise<UserCongregate | undefined> {
    const user = isEvent(_user)
        ? await getUser(_user)
        : typeof _user === "number"
        ? await getUser(_user)
        : _user;
    if (!user) throw new Error(`User not found!`);

    const { roles, id } = user;

    // Determine type
    const subtable = await getUserSubtable(roles);

    const query = db
        .select({
            sub: subtable,
            base: users,
        })
        .from(users)
        .leftJoin(subtable, eq(users.id, subtable.userId))
        .where(eq(users.id, id));

    const [result] = await query;

    if (!result) throw new Error("User congregate not found");

    return {
        sub: result.sub,
        user: result.base,
    } as UserCongregate;
}

// # Execute function based on user type

export async function execBasedUserType<
    U extends UserLike,
    R extends Partial<Record<UserRole, ((u: U) => unknown) | unknown>>
>(
    user: U,
    cbs: R
): Promise<
    | (R[keyof R] extends (...p: any[]) => any
          ? Awaited<ReturnType<R[keyof R]>>
          : R[keyof R])
    | undefined
> {
    const map = userRolesMap.slice(1) as Exclude<UserRole, "ROLE_USER">[];
    const fn =
        cbs[map.find((role) => user.roles.includes(role)) || "ROLE_USER"];
    if (!fn || fn === null) return;
    if (isCallable(fn)) return await fn(user);
    //@ts-ignore too much types
    return fn;
}

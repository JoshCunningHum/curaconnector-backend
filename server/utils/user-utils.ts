import { hash, verify } from "argon2";
import { eq } from "drizzle-orm";
import { H3Event } from "h3";
import {
    ARGON_MEMORYCOST,
    ARGON_PARALLELISM,
    ARGON_TIMECOST,
    DEFAULT_PROFILE_PICTURE,
} from "~/contants/config";
import { db } from "~~/db";
import { NewUser, User, UserRole, users } from "~~/schema/user";

// All-utils regarding users

export type UserLike = User["id"] | User["email"] | User | H3Event | UserHelper;
export class UserHelper {
    // Properties
    user: User;

    // Static Methods
    static async get(
        obj: UserLike,
        refetch = false
    ): Promise<User | undefined> {
        if (this.is(obj)) return obj.user;
        if (typeof obj === "object") {
            if ("context" in obj) obj = obj.context.jwt.id;
            else if (refetch) obj = obj.id;
            else return obj;
        }

        const filter =
            typeof obj === "number" ? eq(users.id, obj) : eq(users.email, obj);
        const [user] = await db.select().from(users).where(filter);

        return user;
    }

    static from(obj: H3Event): Promise<UserHelper>;
    static from(obj: UserHelper | User): UserHelper;
    static from(obj: string | number): Promise<UserHelper | undefined>;
    static from(obj: UserLike): Promise<UserHelper | undefined>;
    static from(obj: UserLike) {
        if (this.is(obj)) return obj;
        return new Promise(async (res, rej) => {
            const user = await this.get(obj);
            if (!user) res(undefined);
            else res(new UserHelper(user));
        });
    }

    static async create(obj: NewUser) {
        // Hash the password
        const password = await hash(obj.password, {
            memoryCost: ARGON_MEMORYCOST,
            timeCost: ARGON_TIMECOST,
            parallelism: ARGON_PARALLELISM,
        });

        const [user] = await db
            .insert(users)
            .values({ ...obj, password })
            .returning();

        return new UserHelper(user);
    }

    static is(u: UserLike): u is UserHelper {
        if (!u) return false;
        if (typeof u !== "object") return false;
        return "equals" in u;
    }

    // Constructor
    constructor(user: User) {
        this.user = user;
    }

    // Getters
    get sync() {
        return new Promise(async (res, rej) => {
            const user = await UserHelper.get(this.user, true);
            this.user = user!;
            res(user);
        });
    }

    get id() {
        return this.user.id;
    }

    get meta() {
        return this.user.metadata;
    }

    get pref() {
        return this.user.preferences;
    }

    get filter() {
        return {
            id: eq(users.id, this.user.id),
            email: eq(users.email, this.user.email),
        };
    }

    get sensitive() {
        const { password, ...rest } = this.user;
        return rest;
    }

    get name() {
        const metadata = this.user.metadata;

        return this.is("ROLE_COMPANY")
            ? metadata.name
            : `${metadata.firstname} ${metadata.lastname}`;
    }

    get roles() {
        return this.user.roles;
    }

    is(...roles: UserRole[]) {
        return roles.some((r) => this.user.roles.includes(r));
    }

    equals(obj: UserLike) {
        switch (typeof obj) {
            case "string":
                return this.user.email === obj;
            case "number":
                return this.id === obj;
            case "object":
                return "context" in obj
                    ? obj.context.jwt.id === this.id
                    : obj.id === this.id;
            default:
                return false;
        }
    }

    async update(obj: NewUser) {
        // Do an override for preferences and meta
        const nMeta = Object.assign({}, this.meta, obj.metadata || {});
        const nPref = Object.assign({}, this.pref, obj.preferences || {});

        await db
            .update(users)
            .set({
                ...obj,
                metadata: nMeta,
                preferences: nPref,
                updatedAt: new Date().toISOString(),
            })
            .where(this.filter.id);
    }

    async checkPassword(str: string) {
        const [isValid] = await safeAwait(verify(this.user.password, str));
        return !!isValid;
    }

    online(): boolean;
    online(status: boolean): Promise<void>;
    online(status?: boolean) {
        if (status === undefined) return this.user.isOnline;

        // If status is set, then update the table
        const user = this.user;
        return new Promise(async (res, rej) => {
            await db
                .update(users)
                .set({
                    isOnline: status,
                    lastLogin: status
                        ? user.lastLogin
                        : new Date().toISOString(),
                })
                .where(this.filter.id);

            res(undefined);
        });
    }

    toJson(config?: { preference?: boolean; dates?: boolean }) {
        const { preference = false, dates = false } = config || {};
        const user = this.user;
        const name = this.name!;

        // Universal User Type
        return {
            id: this.id,
            name,
            email: user.email,
            role: user.roles,
            profile: this.user.profilePicture ?? DEFAULT_PROFILE_PICTURE,
            online: this.online(),
            lastLogin: user.lastLogin,
            metadata: user.metadata,

            // Optional fields
            preferences: preference ? user.preferences : undefined,
            createdAt: dates ? user.createdAt : undefined,
            updatedAt: dates ? user.updatedAt : undefined,
        };
    }
}

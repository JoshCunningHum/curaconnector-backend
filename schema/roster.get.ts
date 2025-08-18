import { db } from "~~/db";
import { rosterproviders } from "./rosterprovider";
import { users } from "./user";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    if (!user.roles.includes("ROLE_COMPANY")) {
        throw createError({
            status: 401,
            message:
                "Only company users are allowed to access roster collection",
        });
    }
    const roster = await db
        .select({
            id: users.id,
            firstname: rosterproviders.firstname,
            lastname: rosterproviders.lastname,
            userObj: {
                id: users.id,
                email: users.email,
                createdAt: users.createdAt,
                profilePicturePath: users.profilePicture,
                preferences: users.preferences,
            },
        })
        .from(rosterproviders)
        .innerJoin(users, eq(rosterproviders.id, users.id))
        .where(eq(rosterproviders.companyId, user.id));

    return { roster };
});

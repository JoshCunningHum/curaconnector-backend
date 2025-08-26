import { eq } from "drizzle-orm";
import { UserNotFoundError } from "~/utils/error";
import { UserHelper } from "~/utils/user-utils";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";
import { users } from "~~/schema/user";

// This entry point might not be needed

export default defineEventHandler(async (event) => {
    const user = await UserHelper.from(event);
    if (!user) throw UserNotFoundError();

    if (!user.is("ROLE_RECIPIENT", "ROLE_COMPANY")) {
        throw createError({
            status: 403,
            statusMessage: "Invalid Usertype",
            message:
                "Only companies and recipients can have provider favorites",
        });
    }

    const faves = await db
        .select({
            id: favorites.id,
            provider: { id: users.id },
            createdAt: favorites.createdAt,
        })
        .from(favorites)
        .leftJoin(users, eq(favorites.to, users.id))
        .where(eq(favorites.by, user.id));

    return faves;
});

import { eq } from "drizzle-orm";
import { UserNotFoundError } from "~/utils/error";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";
import { providers } from "~~/schema/provider";
import { rosterproviders } from "~~/schema/rosterprovider";
import { users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const favs = await db
        .select()
        .from(favorites)
        .leftJoin(users, eq(favorites.to, users.id))
        .leftJoin(providers, eq(providers.userId, favorites.to))
        .leftJoin(rosterproviders, eq(rosterproviders.userId, favorites.to))
        .where(eq(favorites.by, user.id));

    // Return the list as is
    return favs.map((r) => ({
        user: r.users,
        sub: r.providers || r.roster_providers,
    }));
});

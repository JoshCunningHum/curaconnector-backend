import { and, avg, count, eq, isNotNull, or } from "drizzle-orm";
import { preferences } from "~/contants/preferences";
import { UserNotFoundError } from "~/utils/error";
import { getUser } from "~/utils/getUser";
import { sensitiveUser } from "~/utils/sensitive";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";
import { providers } from "~~/schema/provider";
import { ratings } from "~~/schema/ratings";
import { rosterproviders as roster } from "~~/schema/rosterprovider";
import { UserRole, users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    // TODO: Implement batching
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const roles = user.roles;

    // Return nothing when user is not recipient/company
    const rolesAllowed: UserRole[] = ["ROLE_RECIPIENT", "ROLE_COMPANY"];
    if (!roles.some((r) => rolesAllowed.includes(r))) return [];

    // Acquire all providers; Add roster providers if its a recipient
    // ! This is a very expensive query, PROTOTYPE env only
    let query = db
        .select({ base: users, prov: providers, rost: roster })
        .from(users)
        .leftJoin(providers, eq(users.id, providers.userId));

    if (isUser(user, "ROLE_RECIPIENT")) {
        // @ts-expect-error idk why drizzle does this
        query = query
            .leftJoin(roster, eq(users.id, roster.id))
            .groupBy(users.id)
            .where(or(isNotNull(roster.id), isNotNull(providers.id)));
    } else {
        // @ts-expect-error idk why drizzle does this
        query = query.groupBy(users.id).where(isNotNull(providers.id));
    }

    const providersArr = await query;

    // Execute matching algorithm
    const results = preferences.process(
        user,
        providersArr.map((f) => f.base)
    );

    const mapped = await Promise.all(
        results.map(async (_u) => {
            const u = sensitiveUser(_u);
            const q = providersArr.find((f) => f.base.id === u.id)!;
            const s = q.prov || q.rost;

            const [r] = await db
                .select({
                    averageRating: avg(ratings.rating),
                    totalRatings: count(ratings.id),
                })
                .from(ratings)
                .where(eq(ratings.to, +u.id));

            // Check if favourite
            const fCount = await db
                .select()
                .from(favorites)
                .where(and(eq(favorites.by, user.id), eq(favorites.to, u.id)));

            return {
                user: {
                    id: u.id,
                    name: `${s.firstname} ${s.lastname}`,
                    profilePicture: u.profilePicture,
                    details: u.preferences,
                    score: r.averageRating || 0,
                    scoreCount: r.totalRatings || 0,
                },
                isFavourite: fCount.length > 0,
            };
        })
    );

    console.log(`-------------------- Returned Matches ---------------------`);
    console.log(mapped);

    return mapped;
});

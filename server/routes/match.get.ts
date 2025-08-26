import { and, avg, count, eq } from "drizzle-orm";
import { preferences } from "~/contants/preferences";
import { UserNotFoundError } from "~/utils/error";
import { UserHelper } from "~/utils/user-utils";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";
import { ratings } from "~~/schema/ratings";
import { users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    // TODO: Implement batching
    const userH = await UserHelper.from(event);
    if (!userH) throw UserNotFoundError();

    // Return nothing when user is not recipient/company
    if (!userH.is("ROLE_COMPANY", "ROLE_RECIPIENT")) return [];

    const user = userH.user;

    // Acquire all providers; Add roster providers if its a recipient
    // ! This is a very expensive query, PROTOTYPE env only
    let providers = await db.select().from(users);

    if (userH.is("ROLE_COMPANY")) {
        // Modify the providers array to exclude roster members
        providers = providers.filter((p) => {
            const companyId = p.metadata.companyId;
            if (!companyId) return true;
            return companyId !== user.id;
        });
    }

    // Execute matching algorithm
    const results = preferences.process(user, providers);

    const mapped = await Promise.all(
        results.map(async (u) => {
            const h = new UserHelper(u);

            // Get Ratings
            const [r] = await db
                .select({
                    averageRating: avg(ratings.rating),
                    totalRatings: count(ratings.id),
                })
                .from(ratings)
                .where(eq(ratings.to, +u.id));

            // Check if favourite
            const [fav] = await db
                .select()
                .from(favorites)
                .where(and(eq(favorites.by, user.id), eq(favorites.to, u.id)));

            return {
                user: {
                    id: u.id,
                    name: h.name,
                    profilePicture: u.profilePicture,
                    details: u.preferences,
                    score: r.averageRating || 0,
                    scoreCount: r.totalRatings || 0,
                },
                isFavourite: !!fav,
            };
        })
    );

    console.log(`-------------------- Returned Matches ---------------------`);
    console.log(mapped);

    return mapped;
});

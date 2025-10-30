import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { UserNotFoundError } from "~/utils/error";
import { UserUtil } from "~/utils/user-utils";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";

const bodySchema = z.object({
    id: z.number({ required_error: "User ID required" }),
});

export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);
    // ? Maybe just use the user-id in the event context?
    const user = await UserUtil.from(event);

    // Acquire the user in the parameters and check its validity
    const provider = await UserUtil.from(body.id);
    if (!provider) {
        throw createError({
            statusCode: 403,
            statusMessage: "Provider not found",
        });
    }

    // Check if user is a provider, if not then do not proceed
    if (!provider.is("ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER")) {
        throw createError({
            statusCode: 403,
            statusMessage: "User is not a provider",
        });
    }

    // Check if user is already favorite
    const favoriteResult = await db
        .select()
        .from(favorites)
        .where(
            and(eq(favorites.by, user.id), eq(favorites.to, provider.user.id))
        );

    if (favoriteResult.length) {
        // Delete row if already favorite
        const [returned] = favoriteResult;
        await db.delete(favorites).where(eq(favorites.id, returned.id));
    } else {
        // Create the Favorite Row
        await db
            .insert(favorites)
            .values({ by: user.id, to: provider.user.id });
    }
});

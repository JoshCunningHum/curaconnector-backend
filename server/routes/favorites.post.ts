import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { UserNotFoundError } from "~/utils/error";
import { db } from "~~/db";
import { favorites } from "~~/schema/favorites";

const bodySchema = z.object({
  id: z.number({ required_error: "User ID required" }),
});

export default defineEventHandler(async (event) => {
  const body = await validateBody(event, bodySchema);

  const user = await getUser(event);
  if (!user) throw UserNotFoundError();

  // Acquire the user in the parameters and check its validity
  const provider = await getUser(body.id);
  if (!provider) {
    throw createError({
      statusCode: 403,
      statusMessage: "Provider not found",
    });
  }

  // Check if user is a provider, if not then do not proceed
  if (
    !provider.roles.some(
      (r) => r === "ROLE_PROVIDER" || r === "ROLE_ROSTER_PROVIDER"
    )
  ) {
    throw createError({
      statusCode: 403,
      statusMessage: "User is not a provider",
    });
  }

  // Check if user is already favorited
  const favoriteResult = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.by, user.id), eq(favorites.to, provider.id)));

  if (favoriteResult.length) {
    // Delete row if already favorited
    const [returned] = favoriteResult;
    await db.delete(favorites).where(eq(favorites.id, returned.id));
  } else {
    // Create the Favorite Row
    await db.insert(favorites).values({ by: user.id, to: provider.id });
  }
});

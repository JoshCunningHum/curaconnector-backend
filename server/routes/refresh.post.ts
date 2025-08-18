import { count, eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { JWT_EXPIRES_IN, JWT_REFRESH_SECRET } from "~/contants/config";
import { safeAwait } from "~/utils/safetry";
import { createAccessToken, decodeToken, JwtPayload, refreshTokens } from "~/utils/tokens";
import { validateBody } from "~/utils/validateBody";
import { db } from "~~/db";
import { users } from "~~/schema/user";

const bodySchema = z.object({
    refreshToken: z.string({ required_error: "Refresh token required" }),
});

export default defineEventHandler(async (event) => {
    const { refreshToken } = await validateBody(event, bodySchema);

    if (!refreshTokens.has(refreshToken)) {
        throw createError({
            statusCode: 403,
            message: "The provided refresh token is invalid or has been revoked",
        });
    }

    const [decoded, err] = await safeAwait(decodeToken(refreshToken));

    if (err) {
        throw createError({
            statusCode: 403,
            // * Do not specify what is wrong with the token for security measures
            message: "The provided token is invalid or has been revoked",
        });
    }

    // Verify token type
    if (decoded.type !== "refresh") {
        throw createError({
            statusCode: 403,
            message: "The provided token is not a refresh token",
        });
    }

    // Find user to get full details
    const [{ count: usercount }] = await db
        .select({ count: count() })
        .from(users)
        .where(eq(users.id, decoded.id));

    if (usercount === 0) {
        throw createError({
            statusCode: 403,
            message: "The user associated with this token no longer exists",
        });
    }

    // Generate new access token
    const accessToken = createAccessToken(decoded);

    return {
        accessToken,
        expiresIn: JWT_EXPIRES_IN,
    };
});

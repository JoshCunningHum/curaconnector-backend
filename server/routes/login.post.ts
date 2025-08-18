import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/db";
import { users } from "~~/schema/user";
import argon2 from "argon2";
import {
    createAccessToken,
    createRefreshToken,
    refreshTokens,
} from "~/utils/tokens";
import { JWT_EXPIRES_IN } from "~/contants/config";
import { validateBody } from "~/utils/validateBody";

const bodySchema = z.object({
    email: z
        .string({ required_error: "Email required" })
        .email("Incorrect Email Format"),
    password: z.string({ required_error: "Password is required" }),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await validateBody(event, bodySchema);

    // Check if user exists
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
        throw createError({
            statusCode: 401,
            message: "Invalid credentials",
        });
    }

    // Check if password matches
    const [validPassword] = await safeAwait(
        argon2.verify(user.password, password)
    );
    if (!validPassword) {
        throw createError({
            statusCode: 401,
            message: `Invalid credentials`,
        });
    }

    // Create tokens
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // Store refresh token
    refreshTokens.add(refreshToken);

    // Acquire the user concrete
    const conc = await getUserConcrete({ id: user.id, roles: user.roles })!;

    // Return tokens
    return {
        accessToken,
        refreshToken,
        user: {
            id: user.id,
            email: user.email,
            roles: user.roles,
            profile: user.profilePicture,
        },
        sub: conc?.sub,
        expiresIn: JWT_EXPIRES_IN,
    };
});

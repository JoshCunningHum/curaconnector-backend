import { z } from "zod";
import { JWT_EXPIRES_IN } from "~/contants/config";
import {
    createAccessToken,
    createRefreshToken,
    refreshTokens,
} from "~/utils/tokens";
import { UserUtil } from "~/utils/user-utils";
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
    const user = await UserUtil.from(email);

    if (!user) {
        throw createError({
            statusCode: 401,
            message: "Invalid credentials",
        });
    }

    // Check if password matches
    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
        throw createError({
            statusCode: 401,
            message: `Invalid credentials`,
        });
    }

    // Create tokens
    const accessToken = createAccessToken(user.user);
    const refreshToken = createRefreshToken(user.user);

    // Store refresh token
    refreshTokens.add(refreshToken);

    // Return tokens
    return {
        accessToken,
        refreshToken,
        user: user.toJson({ dates: true, preference: true }),
        expiresIn: JWT_EXPIRES_IN,
    };
});

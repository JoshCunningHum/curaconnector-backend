import { z } from "zod";
import { refreshTokens } from "~/utils/tokens";
import { validateBody } from "~/utils/validateBody";

const bodySchema = z.object({
    refreshToken: z.string({ required_error: "Refresh token required" }),
});

export default defineEventHandler(async (event) => {
    const { refreshToken } = await validateBody(event, bodySchema);

    refreshTokens.delete(refreshToken);

    return "Loggedout successfully";
});

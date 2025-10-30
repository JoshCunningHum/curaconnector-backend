import { z } from "zod";
import { refreshTokens } from "~/utils/tokens";
import { UserUtil } from "~/utils/user-utils";
import { validateBody } from "~/utils/validateBody";

const bodySchema = z.object({
    refreshToken: z.string({ required_error: "Refresh token required" }),
});

export default defineEventHandler(async (event) => {
    const { refreshToken } = await validateBody(event, bodySchema);
    refreshTokens.delete(refreshToken);

    const user = await UserUtil.from(event);
    user?.online(false);

    return "Loggedout successfully";
});

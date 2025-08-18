import { JWT_SECRET } from "~/contants/config";
import { decodeToken } from "~/utils/tokens";

// Sadly you have to whitelist anon routes, please change if you know what a better way
const anonRoutes = [
    // Non-Auth Routes
    "/login",
    "/register",

    // Images (handled by the images middleware for auth/verification)
    /^\/images\/.*/,
];

const isAnonRoute = (path: string) =>
    anonRoutes.some((p) => (typeof p === "string" ? p === path : p.test(path)));

export default defineEventHandler(async (event) => {
    console.log(
        `${{ get: "Fetching", post: "Posting" }[event.method.toLowerCase()]}: ${
            event.path
        }`
    );

    // Only do auth when accessing anon routes
    if (isAnonRoute(event.path)) return;

    const authHeaders = event.headers.get("Authorization");
    if (!authHeaders) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized access",
        });
    }

    const token = authHeaders.split(" ")[1]!;

    // Decode token
    const [decoded, err] = await safeAwait(decodeToken(token, JWT_SECRET));

    if (err) {
        throw createError({
            statusCode: 401,
            message: "Unauthorized Access",
        });
    }

    event.context.jwt = decoded;
});

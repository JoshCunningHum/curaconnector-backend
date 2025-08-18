import { type StringValue } from "ms";

// ------------------------
//        JWT
// ------------------------

export const JWT_SECRET =
    process.env.JWT_SECRET ||
    (() => {
        console.warn(
            "⚠️  JWT_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
        );
        return "dev-jwt-secret-curaconnector";
    })();

export const JWT_REFRESH_SECRET =
    process.env.JWT_REFRESH_SECRET ||
    (() => {
        console.warn(
            "⚠️  JWT_REFRESH_SECRET not set in environment variables. Using default (NOT SECURE FOR PRODUCTION)"
        );
        return "dev-jwt-refresh-secret-curaconnector";
    })();

export const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1d") as StringValue;
export const JWT_REFRESH_EXPIRES_IN = (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as StringValue;

// ------------------------
//        Argon
// ------------------------

export const ARGON_MEMORYCOST = parseInt(process.env.ARGON_MEMORYCOST || "65536");
export const ARGON_TIMECOST = parseInt(process.env.ARGON_TIMECOST || "3");
export const ARGON_PARALLELISM = parseInt(process.env.ARGON_PARALLELISM || "1");

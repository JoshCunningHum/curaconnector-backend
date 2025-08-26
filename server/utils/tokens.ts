import jwt from "jsonwebtoken";
import {
    JWT_EXPIRES_IN,
    JWT_REFRESH_SECRET,
    JWT_SECRET,
} from "~/contants/config";
import { User } from "~~/schema/user";

export type JwtPayload = Pick<User, "id" | "email"> & {
    type: "access" | "refresh";
};

export const createAccessToken = ({ id, email }: Omit<JwtPayload, "type">) => {
    return jwt.sign({ id, email, type: "access" }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
};

// * Note: does not contain expiree since it is in the mobile app
export const createRefreshToken = ({ id, email }: Omit<JwtPayload, "type">) => {
    return jwt.sign({ id, email, type: "refresh" }, JWT_REFRESH_SECRET);
};

export const decodeToken = async (
    token: string,
    secret = JWT_REFRESH_SECRET
): Promise<JwtPayload> => {
    return new Promise<JwtPayload>((res, rej) => {
        jwt.verify(token, secret, {}, (err, decoded) => {
            if (err) rej(err);
            else res(decoded as JwtPayload);
        });
    });
};

// In-memory storage for refresh tokens
export const refreshTokens = new Set<string>();

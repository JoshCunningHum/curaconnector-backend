import { type User } from "~~/schema/user";

export const sensitiveUser = ({ password, ...rest }: User) => rest;

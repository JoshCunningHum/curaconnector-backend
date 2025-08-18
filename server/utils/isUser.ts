import { User, UserRole } from "~~/schema/user";

function isUser(user: User, ...role: UserRole[]): boolean;
function isUser(user: number, ...role: UserRole[]): Promise<boolean>;
function isUser(
    user: User | number,
    ...roles: UserRole[]
): Promise<boolean> | boolean {
    if (typeof user === "number") {
        return new Promise<boolean>((res, rej) => {
            getUser(user).then((u) => roles.some((r) => u?.roles.includes(r)));
        });
    }
    return roles.some((r) => user.roles.includes(r));
}

export { isUser };

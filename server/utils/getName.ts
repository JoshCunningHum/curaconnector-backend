import { SubUser, User } from "~~/schema/user";
import { getUser } from "~/utils/getUser";

export function getName(user: User): Promise<string | undefined>;
export function getName(id: User["id"]): Promise<string | undefined>;
export function getName(subUser: SubUser): Promise<string | undefined>;
export async function getName(obj: User | User["id"] | SubUser) {
    if (typeof obj === "number") {
        const user = (await getUser(obj)) as User;
        return await getName(user);
    } else if ("roles" in obj) {
        const cong = await getUserConcrete(obj);
        if (!cong) return;
        return await getName(cong.sub);
    } else {
        if ("name" in obj) return obj.name;
        else return `${obj.firstname} ${obj.lastname}`;
    }
}

import { UserNotFoundError } from "~/utils/error";
import { User } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    const user = await getUserConcrete(event);
    if (!user) throw UserNotFoundError();

    // Separate User and SubUser,
    const { user: _user, sub } = user;

    //  Then remove the password (and other senstive data)
    // TODO: Add more data to remove
    const sensitive: (keyof User)[] = ["password"];
    sensitive.forEach((key) => delete _user[key]);

    console.log("Preferences: ", { sub, _user });

    return {
        user,
        sub,
    };
});

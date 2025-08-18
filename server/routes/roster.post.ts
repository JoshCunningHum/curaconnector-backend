import { z } from "zod";
import { arrayBufferToString } from "~/utils/arrayBufferToString";
import { hashString } from "~/utils/hash";
import { uploadPFP } from "~/utils/uploadPFP";
import { db } from "~~/db";
import { rosterproviders } from "~~/schema/rosterprovider";
import { users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    // Must be a company user type
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();
    if (!user.roles.includes("ROLE_COMPANY")) {
        throw createError({
            statusCode: 403,
            statusMessage: "Invalid Operation",
            message: "Only a company user type can create roster members",
        });
    }

    const body = (await readMultipartFormData(event)) || [];
    const profilePic = body.find((el) => el.name === "profile");

    if (!profilePic || !profilePic.filename) {
        throw createError({
            statusCode: 400,
            message: "Profile picture file is required.",
        });
    }

    const _firstname = arrayBufferToString(
        body.find((el) => el.name === "firstname")?.data
    );
    const _lastname = arrayBufferToString(
        body.find((el) => el.name === "lastname")?.data
    );
    const _email = arrayBufferToString(
        body.find((el) => el.name === "email")?.data
    );
    const _password = arrayBufferToString(
        body.find((el) => el.name === "password")?.data
    );

    const { data, error } = z
        .object({
            firstname: z.string(),
            lastname: z.string(),
            email: z.string().email("Invalid Email"),
            password: z.string(),
        })
        .safeParse({
            firstname: _firstname,
            lastname: _lastname,
            email: _email,
            password: _password,
        });

    if (error) {
        throw createError({
            statusCode: 400,
            message: error.issues[0].message,
        });
    }

    // Add the profile picture
    const profilePicPath = await uploadPFP(profilePic);

    // Create a new user
    const hashedpassword = await hashString(data.password);
    const [rosterUser] = await db
        .insert(users)
        .values({
            email: data.email,
            password: hashedpassword,
            roles: ["ROLE_ROSTER_PROVIDER"],
            profilePicture: profilePicPath,
        })
        .returning();

    // Create a new roster
    const [roster] = await db
        .insert(rosterproviders)
        .values({
            companyId: user.id,
            firstname: data.firstname,
            lastname: data.lastname,
            userId: rosterUser.id,
        })
        .returning();

    // Return the user details
    return {
        id: rosterUser.id,
        rosterId: roster.id,
        profileURL: profilePicPath,
    };
});

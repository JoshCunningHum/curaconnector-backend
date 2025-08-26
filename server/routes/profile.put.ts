// Handle profile picture upload

import { eq } from "drizzle-orm";
import { uploadPFP } from "~/utils/uploadPFP";
import { db } from "~~/db";
import { users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    const user = await UserHelper.from(event);

    const multipart = await readMultipartFormData(event);
    const pfpData = multipart?.find((el) => el.name === "profilePicture");

    console.log(multipart);

    if (!pfpData || !pfpData.filename) {
        throw createError({
            statusCode: 400,
            message: "Profile picture file is required.",
        });
    }

    const newFilename = await uploadPFP(pfpData);

    // Update the user's profile picture in the database
    await db
        .update(users)
        .set({ profilePicture: newFilename })
        .where(eq(users.id, user.id));

    return { success: true, profilePictureUrl: `/images/pfps/${newFilename}` };
});

// A route for getting the checklist items

export default defineEventHandler(async (event) => {
    const user = await UserHelper.from(event);
    if (!user) throw UserNotFoundError();

    console.log(user);

    // Check if the user is a provider
    if (!user.is("ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER")) {
        throw createError({
            status: 403,
            statusMessage: `User type is not allowed ${user.roles}`,
            message: "Only a provider user type is allowed in this entrypoint",
        });
    }

    // TODO: Get all user that has messaged this provider
});

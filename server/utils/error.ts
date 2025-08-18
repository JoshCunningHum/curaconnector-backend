// List of common errors

export const UserNotFoundError = () => {
    return createError({
        statusCode: 404,
        statusMessage: "User not found",
    });
};

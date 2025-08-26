export default defineEventHandler(async (event) => {
    const user = await UserHelper.from(event);
    return user.toJson({ preference: true, dates: true });
});

export default defineEventHandler(async (event) => {
    const user = await UserUtil.from(event);
    return user.toJson({ preference: true, dates: true });
});

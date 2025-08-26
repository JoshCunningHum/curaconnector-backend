import { z } from "zod";

const schema = z.object({
    rosterId: z.number({ required_error: "Provider ID is required" }),
});

export default defineEventHandler(async (event) => {
    const body = await validateBody(event, schema);

    const user = await UserHelper.from(event);
    if (!user.is("ROLE_COMPANY")) {
        throw createError({
            statusCode: 403,
            statusMessage: "User type invalid",
            message: "Only company user type is allowed",
        });
    }

    const recipientId = parseInt(getRouterParam(event, "id")!);

    // Get conversation
    const [conversation] = await ConversationUtil.with(
        user,
        body.rosterId,
        recipientId
    );
    await conversation.setAccess(false);

    // TODO: Then create a message where the company is the sender

    // TODO: Send a notification on the recipient

    // TODO: Send a notification on the roster
});

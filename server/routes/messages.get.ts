import { UserHelper } from "~/utils/user-utils";

export default defineEventHandler(async (event) => {
    const user = await UserHelper.from(event);

    // Get all the conversations
    const conversations = await ConversationUtil.with(user);

    // Format
    const results = await Promise.all(
        conversations.map(async (c) => {
            const other = c.other(user).at(0)!;
            const name = other.name;
            const profile = other.user.profilePicture;

            const [last] = await c.messages({ limit: 1 });
            const lastSender = c.members.find((m) => m.equals(last.sender));

            return {
                id: c.id,
                name,
                profile,
                other: other.toJson(),
                last: {
                    id: last.id,
                    content: last.content,
                    type: last.type,
                    sentAt: last.createdAt,

                    sender: last.sender,
                    senderName: lastSender?.name,
                },
                members: c.members.map((m) => m.toJson()),
            };
        })
    );

    return results;
});

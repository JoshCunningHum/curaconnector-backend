import { and, eq, getTableColumns, inArray, lt, lte, sql } from "drizzle-orm";
import { db } from "~~/db";
import {
    conversation,
    Conversation,
    conversationMember,
} from "~~/schema/conversation";
import { MessageAccess, messageAccesses } from "~~/schema/message-access";
import { UserHelper, UserLike } from "./user-utils";
import { Message, messages } from "~~/schema/message";
import { users } from "~~/schema/user";

export type ConversationIdentifier = Conversation | Conversation["id"];
export class ConversationUtil {
    c: Conversation;
    members: UserHelper[];
    access?: MessageAccess;

    // Static Methods
    static async with(...ids: UserLike[]) {
        const _uuids = await Promise.all(
            ids.map(async (id) => (await UserHelper.get(id))!.id)
        );

        // Remove duplicates
        const uuids = [...new Set(_uuids)];

        // Get all valid groups first
        return await Promise.all(
            (
                await db
                    .select({ id: conversationMember.conversationId })
                    .from(conversationMember)
                    .where(inArray(conversationMember.userId, uuids))
                    .groupBy(conversationMember.conversationId)
                    .having(
                        sql`count(distinct ${conversationMember.userId}) >= ${uuids.length}`
                    )
            ).map(this.from)
        );
    }

    static async message(config: {
        from: UserLike;
        message: string;
        type?: Message["type"];
        to: UserLike;
    }) {
        const { from, message, to, type = "message" } = config;

        // Get the receivers
        const sender = await UserHelper.from(from);
        const direct = await UserHelper.from(to);
        const receivers = [direct!];

        if (direct?.is("ROLE_ROSTER_PROVIDER")) {
            // Include company to the receivers
            const companyId = direct.user.metadata.companyId!;
            const company = await UserHelper.from(companyId);
            receivers.push(company!);
        }

        const members = [sender!, ...receivers];

        // Check if there's already a conversation between the members
        let [c] = await this.with(sender!, ...receivers);
        let isFirstMessage = false;

        if (!c) {
            isFirstMessage = true;

            // Create a new conversation
            const [con] = await db.insert(conversation).values({}).returning();

            // Create the members
            await Promise.all(
                [sender, ...receivers].map(async (m) => {
                    const userId = m!.id;
                    return await db
                        .insert(conversationMember)
                        .values({
                            conversationId: con.id,
                            userId,
                        })
                        .returning();
                })
            );

            // Create the conversation util
            c = new ConversationUtil(con, members);
        }

        // Send the message
        const m = await c.send(sender!, message, type);

        // Return the message and the conversation util
        return {
            isFirstMessage,
            conversation: c,
            message: m,
        };
    }

    static async from(_id: ConversationIdentifier) {
        const id = typeof _id === "number" ? _id : _id.id;
        // Fetch Members
        const members = (
            await db
                .select(getTableColumns(users))
                .from(conversationMember)
                .innerJoin(users, eq(conversationMember.userId, users.id))
                .where(eq(conversationMember.conversationId, id))
        ).map<UserHelper>((u) => {
            return new UserHelper(u);
        });

        // Check for any accesses
        const [access] = await db
            .select()
            .from(messageAccesses)
            .where(eq(messageAccesses.conversationId, id))
            .limit(1);

        return new ConversationUtil({ id }, members, access);
    }

    static async fromMessage(obj: Message) {
        return await this.from(obj.conversation);
    }

    // Constructor
    private constructor(
        c: ConversationUtil["c"],
        m: ConversationUtil["members"],
        a?: ConversationUtil["access"]
    ) {
        this.c = c;
        this.members = m;
        this.access = a;
    }

    get id() {
        return this.c.id;
    }

    async name(base: UserLike) {
        const user = (await UserHelper.from(base))!;

        // Get the other members
        const others = this.other(user);
        // Filter out base on base
        const isRecipient = user.is("ROLE_RECIPIENT");

        const u = others
            .filter((o) => {
                return isRecipient
                    ? o.is("ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER")
                    : o.is("ROLE_RECIPIENT");
            })
            .at(0)!;

        return u.name;
    }

    async hasAccess(base: UserLike) {
        const user = await UserHelper.from(base);
        if (!user) return false;

        // Check if user is found in the member
        if (!this.members.some(user.equals)) return false;

        // Check if user is a roster, if not then true
        if (!user.is("ROLE_ROSTER_PROVIDER")) return true;

        // Check if user has access
        await this.sync();
        return this.access?.enabled;
    }

    async sync(config?: { members?: boolean; access?: boolean }) {
        const { access = true, members = false } = config || {};

        // Get members
        if (members) {
            this.members = await Promise.all(
                (
                    await db
                        .select()
                        .from(conversationMember)
                        .where(eq(conversationMember.conversationId, this.c.id))
                ).map(async (m) => (await UserHelper.from(m.userId))!)
            );
        }

        // Get Accesses
        if (access) {
            this.access = (
                await db
                    .select()
                    .from(messageAccesses)
                    .where(eq(messageAccesses.conversationId, this.c.id))
                    .limit(1)
            ).at(0);
        }
    }

    other(u: UserLike) {
        console.log(this.members);
        return this.members.filter((m) => !m.equals(u));
    }

    // Send message
    async send(
        by: UserLike,
        content: string,
        type: Message["type"] = "message"
    ) {
        // Check first if user is in the conversation
        if (!this.hasAccess(by))
            throw new Error("User has no access in the conversation");

        const user = this.members.find((m) => m.equals(by))!;

        // Then create a message from this
        const [message] = await db
            .insert(messages)
            .values({
                content,
                conversation: this.c.id,
                sender: user.id,
                type,
            })
            .returning();

        return this.formatMessage(message);
    }

    // Get Messages
    formatMessage(m: Message) {
        const u = this.members.find((u) => u.equals(m.sender))!;
        return {
            ...m,
            senderName: u.name,
            senderProfile: u.user.profilePicture,
            isCompany: u.is("ROLE_COMPANY"),
        };
    }

    async messages(config?: { cursor?: number; limit?: number }) {
        const { limit, cursor = 0 } = config || {};

        const filter = [eq(messages.conversation, this.id)];
        if (cursor) filter.push(lte(messages.id, cursor));

        return (
            await db
                .select()
                .from(messages)
                .where(and(...filter))
                .limit(limit ?? 1000)
        ).map((m) => this.formatMessage(m));
    }

    // Set Access
    async setAccess(status: boolean) {
        // Only company-roster-recipient conversation allowed
        if (this.members.length < 3) return;

        const company = this.members.find((m) => m.is("ROLE_COMPANY"))!;
        const recipient = this.members.find((m) => m.is("ROLE_RECIPIENT"))!;
        const provider = this.members.find((m) =>
            m.is("ROLE_ROSTER_PROVIDER")
        )!;

        if (this.access === undefined && status) {
            const [access] = await db
                .insert(messageAccesses)
                .values({
                    conversationId: this.id,
                    companyId: company.id,
                    recipientId: recipient.id,
                    rosterId: provider.id,
                })
                .returning();

            this.access = access;
        } else if (this.access) {
            await db
                .update(messageAccesses)
                .set({ enabled: status })
                .where(eq(messageAccesses.id, this.access.id));
        }
    }
}

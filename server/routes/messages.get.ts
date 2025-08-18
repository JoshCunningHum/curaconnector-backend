import { and, eq, getTableColumns, or, sql } from "drizzle-orm";
import { db } from "~~/db";
import { companies } from "~~/schema/company";
import { messages } from "~~/schema/message";
import { providers } from "~~/schema/provider";
import { recipients } from "~~/schema/recipient";
import { rosterAccess } from "~~/schema/rosteraccess";
import { rosterproviders } from "~~/schema/rosterprovider";
import { User, users } from "~~/schema/user";

export default defineEventHandler(async (event) => {
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    return await execBasedUserType(user, {
        ROLE_COMPANY: getMessagesCompany,
        ROLE_RECIPIENT: getMessagesCommon,
        ROLE_PROVIDER: getMessagesCommon,
        ROLE_ROSTER_PROVIDER: getMessagesCommon,
    });
});

export const getConversation = async (userID: number) => {
    // Get all messages where the current user is involved
    const _withField = sql<number>`CASE WHEN ${messages.sender} = ${userID} THEN ${messages.receiver} ELSE ${messages.sender} END`;
    // Make sure only the latest per group is queried
    const _rowNumber = sql<number>`ROW_NUMBER() OVER (PARTITION BY ${_withField} ORDER BY ${messages.createdAt} DESC)`;

    //
    const msg = db
        .select({
            with: _withField.as("with"),
            row: _rowNumber.as("row"),
            ...getTableColumns(messages),
        })
        .from(messages)
        .where(or(eq(messages.sender, userID), eq(messages.receiver, userID)))
        .as("subquery");

    const results = await db
        .select({
            with: {
                id: users.id,
                role: users.roles,
                name: sql`CASE
      WHEN ${users.roles} LIKE '%ROLE_COMPANY%' THEN ${companies.name}
      WHEN ${users.roles} LIKE '%ROLE_RECIPIENT%' THEN ${recipients.firstname} || ' ' || ${recipients.lastname}
      WHEN ${users.roles} LIKE '%ROLE_ROSTER_PROVIDER%' THEN ${rosterproviders.firstname} || ' ' || ${rosterproviders.lastname}
      WHEN ${users.roles} LIKE '%ROLE_PROVIDER%' THEN ${providers.firstname} || ' ' || ${providers.lastname}
      ELSE '' END`,
                profile: users.profilePicture,
            },
            lastMsg: {
                sender: msg.sender,
                content: msg.content,
                type: msg.type,
                sentAt: msg.createdAt,
                seen: msg.seen,
            },
        })
        .from(users)
        .leftJoin(companies, eq(users.id, companies.userId))
        .leftJoin(recipients, eq(users.id, recipients.userId))
        .leftJoin(providers, eq(users.id, providers.userId))
        .leftJoin(rosterproviders, eq(users.id, rosterproviders.userId))
        .innerJoin(msg, eq(users.id, msg.with))
        .where(eq(msg.row, 1));

    return results;
};

async function getMessagesCompany(user: User) {
    // Get all roster under this company
    const rosters = await db
        .select({
            r: getTableColumns(rosterproviders),
            u: getTableColumns(users),
        })
        .from(rosterproviders)
        .leftJoin(users, eq(rosterproviders.userId, users.id))
        .where(eq(rosterproviders.companyId, user.id));

    // Get all conversation from each roster
    const result = (
        await Promise.all(
            rosters.map(async (u) => {
                return (await getConversation(u.r.userId)).map((v) => ({
                    ...v,
                    roster: {
                        name: `${u.r.firstname} ${u.r.lastname}`,
                        id: u.r.id,
                        userId: u.r.userId,
                        profile: u.u?.profilePicture,
                    },
                }));
            })
        )
    )
        .flat()
        .toSorted(
            (a, b) =>
                new Date(a.lastMsg.sentAt ?? "0").getTime() -
                new Date(b.lastMsg.sentAt ?? "0").getTime()
        );

    return result;
}

async function getMessagesRoster(user: User) {}

async function getMessagesCommon(user: User) {
    // Get all messages where the current user is involved
    const _withField = sql<number>`CASE WHEN ${messages.sender} = ${user.id} THEN ${messages.receiver} ELSE ${messages.sender} END`;
    // Make sure only the latest per group is queried
    const _rowNumber = sql<number>`ROW_NUMBER() OVER (PARTITION BY ${_withField} ORDER BY ${messages.createdAt} DESC)`;

    //
    const msg = db
        .select({
            with: _withField.as("with"),
            row: _rowNumber.as("row"),
            ...getTableColumns(messages),
        })
        .from(messages)
        .where(or(eq(messages.sender, user.id), eq(messages.receiver, user.id)))
        .as("subquery");

    const results = await db
        .select({
            with: {
                id: users.id,
                roles: users.roles,
                name: sql`CASE
                    WHEN ${users.roles} LIKE '%ROLE_COMPANY%' THEN ${companies.name}
                    WHEN ${users.roles} LIKE '%ROLE_RECIPIENT%' THEN ${recipients.firstname} || ' ' || ${recipients.lastname}
                    WHEN ${users.roles} LIKE '%ROLE_ROSTER_PROVIDER%' THEN ${rosterproviders.firstname} || ' ' || ${rosterproviders.lastname}
                    WHEN ${users.roles} LIKE '%ROLE_PROVIDER%' THEN ${providers.firstname} || ' ' || ${providers.lastname}
                ELSE '' END`,
                profile: users.profilePicture,
            },
            lastMsg: {
                sender: msg.sender,
                content: msg.content,
                type: msg.type,
                sentAt: msg.createdAt,
                seen: msg.seen,
            },
        })
        .from(users)
        .leftJoin(companies, eq(users.id, companies.userId))
        .leftJoin(recipients, eq(users.id, recipients.userId))
        .leftJoin(providers, eq(users.id, providers.userId))
        .leftJoin(rosterproviders, eq(users.id, rosterproviders.userId))
        .innerJoin(msg, eq(users.id, msg.with))
        .where(eq(msg.row, 1));

    return results;
}

import { and, eq, getTableColumns, inArray } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/db";
import { rosterproviders } from "~~/schema/rosterprovider";
import { User } from "~~/schema/user";
import { VisitSession, visitSessions } from "~~/schema/visit-session";

const bodySchema = z.object({
    with: z.array(z.number({ required_error: "" })).optional(),
    offset: z.number().optional(),
});

export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);
    const filter = body.with ?? [];

    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const sessions =
        (await execBasedUserType(user, {
            ROLE_RECIPIENT: _recipientSessions.bind(null, filter),
            ROLE_PROVIDER: _providerSessions.bind(null, filter),
            ROLE_ROSTER_PROVIDER: _providerSessions.bind(null, filter),
            ROLE_COMPANY: _companySessions.bind(null, filter),
        })) ?? [];

    return sessions;
});

type VisitSessionFn = (filter: number[], user: User) => Promise<VisitSession[]>;

const _recipientSessions: VisitSessionFn = async (from, user) => {
    const filter_user = eq(visitSessions.recipient, user.id);
    const specify_provider = inArray(visitSessions.visitor, from);

    return await db
        .select()
        .from(visitSessions)
        .where(
            from.length > 0
                ? and(filter_user, specify_provider)
                : specify_provider
        );
};

const _providerSessions: VisitSessionFn = async (from, user) => {
    const filter_user = eq(visitSessions.visitor, user.id);
    const specify_recipient = inArray(visitSessions.recipient, from);

    return await db
        .select()
        .from(visitSessions)
        .where(
            from.length > 0
                ? and(filter_user, specify_recipient)
                : specify_recipient
        );
};

const _companySessions: VisitSessionFn = async (from, user) => {
    // Only match roster providers under this company
    const filter_own = eq(rosterproviders.companyId, user.id);
    // Only match roster providers under the from filter
    const specify_roster = inArray(visitSessions.visitor, from);

    // TODO: Add a filter for the recipient as well

    return await db
        .select({
            ...getTableColumns(visitSessions),
        })
        .from(visitSessions)
        .innerJoin(
            rosterproviders,
            eq(rosterproviders.id, visitSessions.visitor)
        )
        .where(from.length > 0 ? and(filter_own, specify_roster) : filter_own);
};

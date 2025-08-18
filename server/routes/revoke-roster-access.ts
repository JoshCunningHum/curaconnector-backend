import { and, count, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/db";
import { rosterAccess } from "~~/schema/rosteraccess";
import { RosterProvider } from "~~/schema/rosterprovider";

const _body = z.object({
    recipient: z.number(),
    roster: z.number(),
});

export default eventHandler(async (event) => {
    const body = await validateBody(event, _body);
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    const recipient = await getUser(body.recipient);
    const roster = await getUser(body.roster);

    if (!recipient) {
        throw createError({ status: 400, message: "Unexisting Recipient ID" });
    }

    if (!roster) {
        throw createError({ status: 400, message: "Unexisting Roster ID" });
    }

    const rosterSub = (await getUserConcrete(roster))?.sub as RosterProvider;

    // Check if passed roster is under the company
    if (rosterSub.companyId == user.id) {
        throw createError({
            status: 400,
            message: "Roster ID is not under current company!",
        });
    }

    // Check if access has already been given
    const [hasAccess] = await db
        .select({ id: rosterAccess.id, state: rosterAccess.state })
        .from(rosterAccess)
        .where(
            and(
                eq(rosterAccess.recipient, body.recipient),
                eq(rosterAccess.roster, body.roster)
            )
        );

    if (!hasAccess || !hasAccess.state) {
        throw createError({
            status: 403,
            message: "Recipient already has no access",
        });
    }

    // If not then update the row
    await db
        .update(rosterAccess)
        .set({ state: false })
        .where(eq(rosterAccess.id, hasAccess.id));

    return "OK";
});

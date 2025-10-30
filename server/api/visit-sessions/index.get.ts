import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "~~/db";
import { visitSessions } from "~~/schema/visit-session";

const bodySchema = z.object({
    with: z.array(z.number({ required_error: "" })).optional(),
});

export default defineEventHandler(async (event) => {
    const user = await UserUtil.from(event);
    const isRecipient = user.is("ROLE_RECIPIENT");

    // TODO: Add the 'with' filter

    const sessions = await db
        .select()
        .from(visitSessions)
        .where(
            eq(
                isRecipient ? visitSessions.recipient : visitSessions.visitor,
                user.id
            )
        );

    // Perform Mapping
    const mapped = await Promise.all(
        sessions.map(async (s) => {
            const otherId = isRecipient ? s.visitor : s.recipient;
            const other = await UserUtil.from(otherId)!;

            return {
                ...s,
                other: other!.toJson(),
            };
        })
    );

    return mapped;
});

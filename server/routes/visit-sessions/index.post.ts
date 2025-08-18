import { z } from "zod";
import { generateToken } from "~/utils/generateCode";
import { db } from "~~/db";
import { notifications } from "~~/schema/notification";
import { UserRole } from "~~/schema/user";
import { visitSessions } from "~~/schema/visit-session";

const bodySchema = z.object({
    recipient: z.number({ required_error: "Recipient ID is required" }),
    checklist: z.array(z.string({ required_error: "" })),
});

export default defineEventHandler(async (event) => {
    const body = await validateBody(event, bodySchema);
    const recipientId = body.recipient;

    const user = await getUser(event);
    if (!user) throw UserNotFoundError();
    // Only Provider types can access this route
    if (
        !(["ROLE_PROVIDER", "ROLE_ROSTER_PROVIDER"] as UserRole[]).some((r) =>
            user.roles.includes(r)
        )
    ) {
        throw createError({
            status: 401,
            message: "Only provider user types can access this route",
            statusMessage: "Unauthorized",
        });
    }

    // Check if recipient exists
    const recipient = await getUser(recipientId);
    if (!recipient) throw UserNotFoundError();

    // Make sure that userRecipient is a recipient
    if (!recipient.roles.includes("ROLE_RECIPIENT")) {
        throw createError({
            status: 400,
            message: `User[${recipientId}] is not a recipient`,
            statusMessage: "User is not a recipient",
        });
    }
    // Create a new visit session
    const code = generateToken({ length: 4 });
    const checklist = Object.fromEntries(body.checklist.map((k) => [k, false]));

    const [session] = await db.insert(visitSessions).values({
        recipient: recipientId,
        visitor: user.id,
        verificationCode: code,
        checklist: checklist,
    })
        .returning();

    // Create notification
    const [notif] = await db
        .insert(notifications)
        .values({
            to: recipientId,
            type: "visit-session",
            metadata: {
                subject: `${await getName(user)} started a visit session`,
                description: `Session consists of ${body.checklist.length} service`,
                refer: user.id,
            },
        })
        .returning();

    const isRecipientOnline = WSS.has(recipientId);

    if (isRecipientOnline) {
        WSS.broadcast(recipientId, "notif:visit-session", notif);
    }

    // Return the created visit session
    return session;
});



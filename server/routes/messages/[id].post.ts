// Send a message to a certain user

import { z } from "zod";
import { notifications } from "~~/schema/notification";
import { RosterProvider } from "~~/schema/rosterprovider";
import { db } from "../../../db";
import { messages } from "../../../schema/message";

const bodySchema = z.object({
    content: z.string().min(1).optional(),
    type: z.enum(["gps:invite"]).optional(),
});

export default defineEventHandler(async (event) => {
    const to = parseInt(getRouterParam(event, "id") ?? "-1");
    if (!to) {
        throw createError({
            statusCode: 400,
            message: "Recipient ID is required",
        });
    }

    const body = await validateBody(event, bodySchema);
    const user = await getUser(event);
    if (!user) throw UserNotFoundError();

    // Check if receiver(to) exists
    const receiver = await getUser(to);
    if (!receiver) {
        throw createError({
            statusCode: 404,
            message: "Message Receiver does not exist!",
        });
    }

    const receiverName = await getName(receiver);
    let msgContent: string = body.content || "";
    if (body.type === "gps:invite") {
        msgContent = JSON.stringify({ started: -1, ended: -1 });
    }

    const newMessageObj: Record<string, any> = {
        sender: user.id,
        receiver: +to,
        content: msgContent,
    };
    if (body.type) newMessageObj.type = body.type;

    const [msg] = await db
        .insert(messages)
        //@ts-expect-error
        .values(newMessageObj)
        .returning();

    // TODO: Don't add notifications when the previous message from the sender has not been read yet

    const [notif] = await db
        .insert(notifications)
        .values({
            to: user.id,
            metadata: {
                subject: `${receiverName} is trying to reach out`,
                description:
                    body.content ??
                    `${getName(user)} offered a location invite`,
                refer: to,
            },
        })
        .returning();

    // Try to send a message notification (used in notifications and messagenger UI)

    const isOnline = WSS.has(to);

    if (isOnline) {
        console.log("Sending message notification");

        WSS.broadcast(to, "message:reply", msg);
        WSS.broadcast(to, "notif:message", notif);
    } else {
        console.log("Message receiver is not connected to sockets");
    }

    await execBasedUserType(user, {
        // If the receiver is a roster provider, send notification to the company
        ROLE_ROSTER_PROVIDER: async () => {
            const roster = (await getUserConcrete(user))!.sub as RosterProvider;
            const isCompanyOnline = WSS.has(roster.companyId);

            if (!isCompanyOnline) {
                console.log("Company of message receiver not online");
                return;
            } else console.log("Sending message notification to company");

            WSS.broadcast(roster.companyId, "message:roster-reply", msg);
            WSS.broadcast(roster.companyId, "notif:message", notif);
        },
    });

    return msg;
});

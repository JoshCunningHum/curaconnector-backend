// Send a message to a certain user

import { z } from "zod";
import { notifications } from "~~/schema/notification";
import { db } from "../../../db";
import { messageTypes } from "../../../schema/message";

const bodySchema = z.object({
    content: z.string().min(1).optional(),
    type: z.enum(messageTypes).optional(),
    noNotif: z.boolean().optional().default(false),
});

export default defineEventHandler(async (event) => {
    const to = parseInt(getRouterParam(event, "id") ?? "0");
    if (!to) {
        throw createError({
            statusCode: 400,
            message: "Recipient ID is required",
        });
    }

    const body = await validateBody(event, bodySchema);
    const user = await UserUtil.from(event);

    // Check if receiver(to) exists
    const receiver = await UserUtil.from(to);
    if (!receiver) {
        throw createError({
            statusCode: 404,
            message: "Message Receiver does not exist!",
        });
    }

    let msgContent: string = body.content || "";
    if (body.type === "gps:invite") {
        msgContent = JSON.stringify({ started: -1, ended: -1 });
    }

    // Send the message
    const { message } = await ConversationUtil.message({
        from: user,
        message: msgContent,
        to: receiver,
        type: body.type,
    });

    // TODO: Don't add notifications when the previous message from the sender has not been read yet

    if (!body.noNotif) {
        const [notif] = await db
            .insert(notifications)
            .values({
                to: receiver.id,
                metadata: {
                    subject: `${user.name} is trying to reach out`,
                    // TODO: Add more cases for different message types
                    description:
                        body.content ??
                        `${user.name} offered a location invite`,
                    refer: to,
                },
            })
            .returning();

        // Try to send a message notification (used in notifications and messenger UI)
        const isOnline = WSS.has(to);

        if (isOnline) {
            console.log("Sending message notification");
            WSS.broadcast(to, "notif:message", notif);
        }
        // If the receiver is a roster provider, send notification to the company
        if (receiver.is("ROLE_ROSTER_PROVIDER")) {
            const companyId = receiver.user.metadata.companyId!;
            const isCompanyOnline = WSS.has(companyId);

            if (isCompanyOnline) {
                console.log("Sending message notification to company");
                WSS.broadcast(companyId, "message:roster-reply", message);
                WSS.broadcast(companyId, "notif:message", notif);
            } else {
                console.log("Company of message receiver not online");
            }
        }
    }

    // Realtime Messaging
    if (WSS.has(to)) {
        console.log("Sending message reply");
        WSS.broadcast(to, "message:reply", message);
    } else {
        console.log("Message receiver is not connected to sockets");
    }

    // If roster, send company message reply
    if (receiver.is("ROLE_ROSTER_PROVIDER")) {
        const companyId = receiver.meta.companyId!;
        if (WSS.has(companyId)) {
            console.log("Sending message reply to company");
            WSS.broadcast(companyId, "message:roster-reply", message);
        } else console.log("Company is not online");
    }

    return message;
});

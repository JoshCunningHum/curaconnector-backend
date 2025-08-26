import { defineWebSocketHandler } from "h3";
import { WebsocketMessageSchema, WSHandler } from "../types/Websocket";
import handlers from "../utils/websockets";

export default defineWebSocketHandler({
    open(peer) {
        console.log("[ws] open", peer.id);
    },

    async message(peer, message) {
        const msg = message.json();
        console.log(`--- WS: MESSAGE ---`);

        const { success, data, error } = WebsocketMessageSchema.safeParse(msg);

        if (!success) {
            console.error(`Invalid Websocket message format:`, error);
            peer.send(
                JSON.stringify({
                    event: "error",
                    data: ["Invalid message format"],
                })
            );
            return;
        }

        const { data: args, event } = data;
        const [handler, err] = safeTry(
            () => (handlers as Record<string, WSHandler<any[]>>)[event]
        );

        if (handler) {
            //@ts-ignore
            await handler(peer, ...args);
        } else {
            console.warn(`No handler found for event: ${event}`);
            peer.send(
                JSON.stringify({
                    event: "error",
                    data: [`No handler for event '${event}'`],
                })
            );
        }
    },

    close(peer, details) {
        WSS.remove(peer.id);
    },

    error(peer, error) {
        console.error("[ws] error", peer.id, error);
    },
});

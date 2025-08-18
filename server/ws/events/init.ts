import { JWT_SECRET } from "~/contants/config";
import { createWSHandler } from "../../types/Websocket";
import { WSS } from "../../utils/websockets";

// Runs when client emits event=init
export default createWSHandler(
    async (peer, id: number, token: string, custodian = false) => {
        // Decode the token
        const [decoded, err] = await safeAwait(decodeToken(token, JWT_SECRET));

        if (err) {
            // Send an error event to the peer
            console.log("Initialization Error: Token invalid");
            peer.send({ event: "error", data: ["Token invalid"] });
            return;
        }

        if (decoded.id !== id) {
            // Send error event due to invalid token
            console.log("Initialization Error: Token invalid");
            peer.send({ event: "error", data: ["Token invalid"] });
            return;
        }

        WSS.add({ peer, id, token, custodian });
        WSS.broadcast(peer, "init:reply", "Initialization Complete");

        console.log(
            `Peer: ${decoded.email} [${decoded.id}] has been initialized`
        );
    }
);

import { createWSHandler } from "~/types/Websocket";

export default createWSHandler(async (peer) => {
    peer.send("pong");
});

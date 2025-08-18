import { locationSharing } from "~/tasks/broadcast/locshare";
import { createWSHandler } from "~/types/Websocket";

export default createWSHandler(async (peer, other: number) => {
    const own = WSS.getId(peer);
    locationSharing.removeSession([own, other]);

    // Notify the other user
    WSS.broadcast(other, "gps:end", own);
});

import { locationSharing } from "~/tasks/broadcast/locshare";
import { createWSHandler } from "~/types/Websocket";

export default createWSHandler(
    async (peer, latitude: number, longitude: number) => {
        const uid = WSS.getId(peer);
        locationSharing.setLocation(uid, [latitude, longitude]);
    }
);

import { UserUtil } from "~/utils/user-utils";

export default defineNitroPlugin(async (nitro) => {
    // Update LastLogin
    WSS.on("close", async (conn) => {
        const peers = WSS.getPeers(conn);

        console.log(
            `[WS-CLOSE] ${conn.id}-${conn.peer.id}${
                peers.length > 1 ? ` <${peers.length - 1}> Connection Left` : ""
            }`
        );

        const user = await UserUtil.from(conn.id);
        await user!.online(true);
    });
});

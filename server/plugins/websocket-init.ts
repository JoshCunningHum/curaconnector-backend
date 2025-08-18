import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { db } from "~~/db";
import { users } from "~~/schema/user";

export default defineNitroPlugin(async (nitro) => {
    // Update LastLogin
    WSS.on("close", async (conn) => {
        const peers = WSS.getPeers(conn);

        console.log(
            `[WS-CLOSE] ${conn.id}-${conn.peer.id}${
                peers.length > 1 ? ` <${peers.length - 1}> Connection Left` : ""
            }`
        );

        await db
            .update(users)
            .set({ lastLogin: dayjs().toISOString() })
            .where(eq(users.id, conn.id));
    });
});

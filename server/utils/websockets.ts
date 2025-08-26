import { User } from "../../schema/user";
import { Peer } from "crossws";
import { isWSConn, WSConn } from "../types/Websocket";

import EventEmitter from "node:events";
import gps_end from "~/ws/events/gps_end";
import gps_send from "~/ws/events/gps_send";
import init from "~/ws/events/init";
import ping from "~/ws/events/ping";
import { WSEmitEvents } from "~/contants/events";

// TODO: Manually import events
export default { ping, init, gps_send, gps_end };

type DeviceConn = Peer["id"] | Peer | WSConn;
type UserConn = DeviceConn | User["id"];

type PeerEvents = "open" | "close";

export class WSS {
    private static cmap: Map<number, Map<string, WSConn>> = new Map();
    private static events: EventEmitter = new EventEmitter();

    private static get conns() {
        return this.cmap
            .values()
            .flatMap((g) => g.values().toArray())
            .toArray();
    }

    static getId(c: UserConn | DeviceConn): number {
        if (typeof c === "number") return c;
        const pid = this.getPeerId(c);
        return this.conns.find((conn) => conn.peer.id === pid)?.id ?? -1;
    }

    static getPeerId(c: DeviceConn): string {
        if (typeof c === "string") return c;
        return isWSConn(c) ? c.peer.id : c.id;
    }

    static getPeer(peer: DeviceConn): WSConn | undefined {
        const uid = this.getId(peer);
        const pid = this.getPeerId(peer);
        const conn = this.cmap.get(uid);
        return conn?.get(pid);
    }

    static getPeers(peer: UserConn): WSConn[] {
        const uid = this.getId(peer);
        return this.cmap.get(uid)?.values().toArray() ?? [];
    }

    static add(c: WSConn) {
        const uid = this.getId(c.id);
        const map = this.cmap.get(uid) ?? new Map();
        if (!this.cmap.has(uid)) this.cmap.set(uid, map);

        map.set(c.peer.id, c);
        this.events.listeners("open").forEach((cb) => cb(c));
    }

    static remove(peer: Peer["id"]) {
        const uid = this.getId(peer);
        const map = this.cmap.get(uid);
        const conn = map?.get(peer);

        // Emit close events
        if (conn) this.events.listeners("close").forEach((cb) => cb(conn));

        // Then perform delete
        map?.delete(peer);
    }

    static broadcast<Event extends keyof WSEmitEvents>(
        uid: UserConn,
        event: Event,
        ...data: WSEmitEvents[Event]
    ) {
        const conns = this.getPeers(uid);
        if (conns.length === 0) {
            console.warn(`Broadcasting to an unexisting peer: ${uid}`);
            return;
        }

        conns.forEach((p) => p.peer.send({ event, data }));
    }

    static send<Event extends keyof WSEmitEvents>(
        id: DeviceConn,
        event: Event,
        ...data: WSEmitEvents[Event]
    ) {
        const conn = this.getPeer(id);
        if (!conn) {
            console.warn(`Sending to an unexisting peer: ${id}`);
            return;
        }

        conn.peer.send({ event, data });
    }

    static has(pId: UserConn) {
        return this.getPeers(pId).length > 0;
    }

    // Peer Events

    static on(type: PeerEvents, cb: (peer: WSConn) => void) {
        return this.events.on(type, cb);
    }

    static off(type: PeerEvents, cb: (peer: WSConn) => void) {
        return this.events.off(type, cb);
    }
}

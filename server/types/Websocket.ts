import { z } from "zod";
import { Peer } from "crossws";

export const WebsocketMessageSchema = z.object({
    event: z.string().min(1, "Event name cannot be empty"),
    data: z.array(z.any()).optional().default([]),
});

export type WebsocketMessage = z.infer<typeof WebsocketMessageSchema>;

export type WSHandler<T extends any[]> = (peer: Peer, ...args: T) => any;
export const createWSHandler = <T extends any[]>(cb: WSHandler<T>) => cb;

export interface WSConn {
    peer: Peer;
    id: number; // User ID
    token: string;
    custodian?: boolean;
}

export function isWSConn(p: unknown): p is WSConn {
    if (typeof p !== "object") return false;
    if (!p) return false;

    return "peer" in p && "id" in p && "token" in p;
}

import { TableConfig } from "drizzle-orm/sqlite-core";
import { SQLiteTableWithColumns } from "drizzle-orm/sqlite-core";
import { UnkObj } from "~/types/Utils";
import { WebsocketMessage } from "~/types/Websocket";

export const isTableMember = <T extends TableConfig>(
    schema: SQLiteTableWithColumns<T>,
    obj: unknown
): obj is SQLiteTableWithColumns<T>["$inferSelect"] => {
    if (!obj) return false;
    if (typeof obj !== "object") return false;

    return Object.entries(schema)
        .filter(([_, v]) => v.notNull)
        .every(([k]) => k in obj);
};

export const isCallable = (fn: unknown): fn is Function => {
    return typeof fn === "function";
};

export const isWSMsg = (obj: unknown): obj is WebsocketMessage => {
    if (!obj) return false;
    if (typeof obj !== "object") return false;
    return "event" in obj && "data" in obj;
};

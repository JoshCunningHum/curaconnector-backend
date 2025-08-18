import { fileURLToPath } from "url";

// https://nitro.unjs.io/config
export default defineNitroConfig({
    compatibilityDate: "2025-07-07",
    inlineDynamicImports: false,
    experimental: {
        database: true,
        tasks: true,
        websocket: true,
    },
    scheduledTasks: {
        "* * * * *": ["broadcast:locshare"],
    },

    srcDir: "server",
    alias: {
        "@ws": fileURLToPath(new URL("./server/ws", import.meta.url)),
    },
});

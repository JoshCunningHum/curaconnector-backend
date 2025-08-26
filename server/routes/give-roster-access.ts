import { z } from "zod";

const _body = z.object({
    recipient: z.number(),
    roster: z.number(),
});

export default eventHandler(async (event) => {});

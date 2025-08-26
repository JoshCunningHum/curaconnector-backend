import { z } from "zod";
import { User } from "~~/schema/user";
import { VisitSession } from "~~/schema/visit-session";

const bodySchema = z.object({
    with: z.array(z.number({ required_error: "" })).optional(),
    offset: z.number().optional(),
});

export default defineEventHandler(async (event) => {});

type VisitSessionFn = (filter: number[], user: User) => Promise<VisitSession[]>;

import type { H3Event } from "h3";
import { z } from "zod";

export const validateBody = async <T extends z.ZodRawShape>(
    event: H3Event,
    schema: z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>>
): Promise<z.infer<z.ZodObject<T>>> => {
    const { data, error } = await readValidatedBody(event, schema.safeParse);
    if (error) {
        console.log("From validate body:", error);
        throw createError({
            status: 400,
            message: error.issues[0].message,
        });
    }
    return data;
};

export const validateQuery = async <T extends z.ZodRawShape>(
    event: H3Event,
    schema: z.ZodObject<T> | z.ZodEffects<z.ZodObject<T>>
): Promise<z.infer<z.ZodObject<T>>> => {
    const { error, data } = await getValidatedQuery(event, schema.safeParse);
    if (error) {
        console.log("From validate body:", error);
        throw createError({
            status: 400,
            message: error.issues[0].message,
        });
    }
    return data;
};

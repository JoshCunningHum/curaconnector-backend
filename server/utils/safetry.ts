export function safeTry<T>(fn: () => T): [T, null] | [null, Error] {
    try {
        return [fn(), null];
    } catch (err) {
        return [null, err as Error];
    }
}

export async function safeAwait<T>(
    fnOrPromise: (() => Promise<T>) | Promise<T>
): Promise<[T, null] | [null, Error]> {
    try {
        const result = typeof fnOrPromise === "function" ? await fnOrPromise() : await fnOrPromise;
        return [result, null];
    } catch (err) {
        return [null, err as Error];
    }
}

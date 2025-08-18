// Used for many 'get' things

// -- MultiPart Data --
type MultiPartList = Awaited<ReturnType<typeof readMultipartFormData>>;
type MultiPart = Exclude<MultiPartList, undefined>[number];

export function get(
    multipart: MultiPartList,
    key: string
): MultiPart | undefined;

export function get(...params: any[]) {
    const [_first, _second, _third] = params;

    if (Array.isArray(_first) && typeof _second === "string") {
        const arr = _first as MultiPartList;
        return arr?.find((e) => e.name === _second);
    }
}

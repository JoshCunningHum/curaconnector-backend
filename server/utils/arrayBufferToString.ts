const decoder = new TextDecoder("utf-8");
export function arrayBufferToString(buffer?: Buffer<ArrayBufferLike>) {
    if (!buffer) return;
    return decoder.decode(new Uint8Array(buffer));
}

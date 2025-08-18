const decoder = new TextDecoder("utf-8");
function arrayBufferToString(buffer) {
  if (!buffer) return;
  return decoder.decode(new Uint8Array(buffer));
}

export { arrayBufferToString as a };
//# sourceMappingURL=arrayBufferToString.mjs.map

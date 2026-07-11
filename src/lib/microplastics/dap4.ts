export function parseDap4Float32Array(buffer: ArrayBuffer): Float32Array {
  const bytes = new Uint8Array(buffer);
  const dataChunks: Uint8Array[] = [];
  let offset = 0;
  let isFirstChunk = true;

  while (offset < bytes.length) {
    const length = (bytes[offset + 1] << 16) | (bytes[offset + 2] << 8) | bytes[offset + 3];
    const payload = bytes.subarray(offset + 4, offset + 4 + length);
    offset += 4 + length;

    if (length === 0) {
      break;
    }

    if (isFirstChunk) {
      isFirstChunk = false;
      continue;
    }

    dataChunks.push(payload);
  }

  const totalLength = dataChunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const data = new Uint8Array(totalLength);
  let writeOffset = 0;

  for (const chunk of dataChunks) {
    data.set(chunk, writeOffset);
    writeOffset += chunk.length;
  }

  const floatBytes = data.subarray(0, data.length - 4);
  const view = new DataView(floatBytes.buffer, floatBytes.byteOffset, floatBytes.byteLength);
  const values = new Float32Array(floatBytes.length / 4);

  for (let i = 0; i < values.length; i++) {
    values[i] = view.getFloat32(i * 4, true);
  }

  return values;
}

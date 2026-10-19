import fs from 'node:fs';
import zlib from 'node:zlib';
import path from 'node:path';

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function generatePng(width, height, isMaskable = false) {
  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw image scanlines
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.38 : 0.45);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // filter None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background is deep dark #09090b
      let r = 9, g = 9, b = 11, a = 255;

      // Inside circle/squircle icon area
      if (dist < radius) {
        // Gradient from Indigo (99, 102, 241) to Purple (168, 85, 247) to Pink
        const factor = (x + y) / (width + height);
        r = Math.round(99 * (1 - factor) + 236 * factor);
        g = Math.round(102 * (1 - factor) + 72 * factor);
        b = Math.round(241 * (1 - factor) + 153 * factor);

        // Center phone frame cutout
        const phoneW = width * 0.32;
        const phoneH = height * 0.52;
        if (Math.abs(dx) < phoneW / 2 && Math.abs(dy) < phoneH / 2) {
          // Inside phone frame
          const screenBorder = width * 0.03;
          if (
            Math.abs(dx) < phoneW / 2 - screenBorder &&
            Math.abs(dy) < phoneH / 2 - screenBorder
          ) {
            // Screen art
            r = 15;
            g = 15;
            b = 25;
            // Sun on screen
            const sunDist = Math.sqrt(Math.pow(x - (cx - phoneW * 0.15), 2) + Math.pow(y - (cy - phoneH * 0.2), 2));
            if (sunDist < width * 0.06) {
              r = 251; g = 146; b = 60; // amber sun
            }
          } else {
            // Phone rim
            r = 30; g = 30; b = 35;
          }
        }
      } else if (!isMaskable && dist > radius + 2) {
        // Outer rounded corners transparent for standard icon
        a = 0;
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressed);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, true));

console.log('Successfully generated PWA icon assets!');

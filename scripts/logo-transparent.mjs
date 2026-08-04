/*
 * One-off script: strip the cream background from public/brand/gor-diamonds-logo.png
 * and emit a transparent PNG at public/brand/gor-diamonds-logo-transparent.png.
 *
 * Uses sharp (a Next.js transitive dep).
 * Run:  node scripts/logo-transparent.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';

const SRC = 'public/brand/gor-diamonds-logo.png';
const OUT = 'public/brand/gor-diamonds-logo-transparent.png';

const img = sharp(SRC).ensureAlpha();
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// Sample the top-left corner as the background color reference.
const bgR = data[0];
const bgG = data[1];
const bgB = data[2];

// Tolerance — how "close" to bg counts as bg. Higher = more aggressive removal.
const TOL = 42;

const out = Buffer.from(data);
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const dr = r - bgR;
  const dg = g - bgG;
  const db = b - bgB;
  const dist = Math.sqrt(dr * dr + dg * dg + db * db);
  if (dist < TOL) {
    // Full transparent
    out[i + 3] = 0;
  } else if (dist < TOL * 2) {
    // Feather the edge for smoother anti-aliasing
    const t = (dist - TOL) / TOL;
    out[i + 3] = Math.round(t * 255);
  }
}

await sharp(out, { raw: { width, height, channels } })
  .trim({ threshold: 5 }) // crop away the transparent margins for a tight bounding box
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const stats = await fs.stat(OUT);
const outMeta = await sharp(OUT).metadata();
console.log(`Wrote ${OUT} — ${(stats.size / 1024).toFixed(1)} KB — ${outMeta.width}x${outMeta.height}`);
console.log(`Background sampled: rgb(${bgR}, ${bgG}, ${bgB}) — hex #${[bgR, bgG, bgB].map((n) => n.toString(16).padStart(2, '0')).join('')}`);

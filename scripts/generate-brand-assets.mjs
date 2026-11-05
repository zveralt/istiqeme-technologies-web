/**
 * Build favicon PNGs, favicon.ico, apple-touch-icon, and OG JPEG from brand sources.
 * Run: node scripts/generate-brand-assets.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const brandDir = path.join(root, "public", "brand");
const ogDir = path.join(root, "public", "og");

const BG = "#0a0a0c";
const NAVY = "#0d1528";
const ACCENT = "#2b63c8";
const ACCENT_LIGHT = "#4a81de";

async function ensureDirs() {
  await fs.mkdir(brandDir, { recursive: true });
  await fs.mkdir(ogDir, { recursive: true });
}

async function rasterizeFavicons() {
  const svgPath = path.join(brandDir, "favicon.svg");
  const svg = await fs.readFile(svgPath);
  const logoPath = path.join(root, "public", "logo.png");

  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  for (const { name, size } of sizes) {
    if (size >= 180) {
      const pad = Math.round(size * 0.1);
      const inner = size - pad * 2;
      const logoBuf = await sharp(logoPath)
        .modulate({ brightness: 1.42, saturation: 1.2 })
        .resize(inner, Math.round(inner * 0.32), { fit: "inside" })
        .png()
        .toBuffer();
      const logoMeta = await sharp(logoBuf).metadata();
      const lw = logoMeta.width ?? inner;
      const lh = logoMeta.height ?? inner;
      const left = Math.round((size - lw) / 2);
      const top = Math.round((size - lh) / 2);
      const bg = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 20, g: 18, b: 15, alpha: 1 },
        },
      })
        .png()
        .toBuffer();
      await sharp(bg)
        .composite([{ input: logoBuf, left, top }])
        .png({ compressionLevel: 9 })
        .toFile(path.join(brandDir, name));
      continue;
    }

    await sharp(svg, { density: 640 })
      .resize(size, size, { kernel: sharp.kernel.lanczos3 })
      .png({ compressionLevel: 9 })
      .toFile(path.join(brandDir, name));
  }
}

function ogBackgroundSvg() {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="55%" stop-color="${NAVY}"/>
      <stop offset="100%" stop-color="#06070a"/>
    </linearGradient>
    <radialGradient id="glow" cx="22%" cy="18%" r="55%">
      <stop offset="0%" stop-color="${ACCENT_LIGHT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="88%" cy="78%" r="45%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="${ACCENT}" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>
  <rect x="72" y="72" width="1056" height="486" rx="28" fill="none" stroke="white" stroke-opacity="0.06"/>
  <text x="96" y="468" fill="${ACCENT_LIGHT}" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" letter-spacing="0.28em">DIGITAL ENGINEERING STUDIO</text>
  <text x="96" y="520" fill="#8b929e" font-family="Arial, Helvetica, sans-serif" font-size="22" letter-spacing="0.04em">Karachi · Websites · Software · AI</text>
  <text x="96" y="560" fill="#5c6370" font-family="Arial, Helvetica, sans-serif" font-size="18">istiqeme.net</text>
</svg>`);
}

async function buildOgHome() {
  const draft = path.join(root, "assets", "istiqeme-home-og-draft.jpg");
  const out = path.join(ogDir, "istiqeme-home.jpg");

  try {
    await fs.access(draft);
    const final = await sharp(draft)
      .resize(1200, 630, { fit: "cover", position: "centre" })
      .jpeg({ quality: 92, mozjpeg: true })
      .toFile(out);
    console.log(`OG image: ${out} (${final.width}x${final.height}) from art draft`);
    return;
  } catch {
    /* fall through to programmatic fallback */
  }

  const logo = path.join(root, "public", "logo.png");
  const bg = await sharp(ogBackgroundSvg()).png().toBuffer();
  const logoBuf = await sharp(logo)
    .resize(640, null, { fit: "inside" })
    .png()
    .toBuffer();
  const logoMeta = await sharp(logoBuf).metadata();
  const logoH = logoMeta.height ?? 160;
  const top = Math.round((630 - logoH) / 2 - 36);
  const final = await sharp(bg)
    .composite([{ input: logoBuf, top, left: 96, blend: "over" }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(out);
  console.log(`OG image: ${out} (${final.width}x${final.height}, fallback composite)`);
}

async function main() {
  await ensureDirs();
  await rasterizeFavicons();
  await buildOgHome();
  console.log("Brand assets generated in public/brand and public/og");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

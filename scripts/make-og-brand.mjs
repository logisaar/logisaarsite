// 1200x630 OG images for the product pages: the official logo, unaltered, centred on the page's own background.
//   node scripts/make-og-brand.mjs            (writes public/og-ikuro.png and, if the SVG exists, public/og-heylane.png)
import sharp from "sharp";
import fs from "node:fs";

const W = 1200, H = 630;
async function make(out, bg, logoPath, targetH) {
  if (!fs.existsSync(logoPath)) { console.log("skip", out, "(missing", logoPath + ")"); return; }
  const logo = await sharp(logoPath, { density: 300 }).resize({ height: targetH, fit: "inside", width: W - 240 }).png().toBuffer();
  const m = await sharp(logo).metadata();
  await sharp({ create: { width: W, height: H, channels: 3, background: bg } })
    .composite([{ input: logo, left: Math.round((W - m.width) / 2), top: Math.round((H - m.height) / 2) }])
    .png({ compressionLevel: 9 }).toFile(out);
  console.log("wrote", out, `${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
}
await make("public/og-ikuro.png", "#FCFAF8", "public/brand/ikuro/ikuro-logo.png", 440);
await make("public/og-heylane.png", "#F4F3EE", "public/brand/heylane/HeyLane-Horizontal.svg", 200);

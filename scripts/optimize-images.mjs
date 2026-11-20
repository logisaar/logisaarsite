// Repeatable image pipeline.  Run: node scripts/optimize-images.mjs
//
// Source images live in src/assets/_originals (first run moves them there from
// their old, space-named locations; nothing is deleted).  Outputs:
//   public/images/{mockups,services,projects}/<name>-{800,1600}.{avif,webp}
//   src/assets/brand-logos/<name>.webp     (trimmed, <=320px wide)
//   src/assets/team/<name>.webp            (<=800px, face-centred crop)
//   src/data/image-manifest.json           (dimensions for width/height attrs)
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const A = (...p) => path.join(ROOT, "src/assets", ...p);
const O = (...p) => A("_originals", ...p);
const P = (...p) => path.join(ROOT, "public", ...p);

const ensure = (d) => fs.mkdirSync(d, { recursive: true });
const kb = (f) => (fs.statSync(f).size / 1024).toFixed(1);
const report = [];

// ── 1. move originals out of the way (idempotent) ──────────────────────────
const MOVES = [
  ["all brand logos", "brand-logos"],
  ["projects", "projects"],
  ["team", "team"],
  ["school erp dashboard.png", "mockups/school-erp.png"],
  ["ai reception.png", "mockups/ai-receptionist.png"],
  ["smart crm.png", "mockups/smart-crm.png"],
  ["hotel managment system.png", "mockups/hotel-management.png"],
  ["chalk to choise center asset.png", "chalk-to-choice-center.png"],
  ["quote-illustration.png", "quote-illustration.png"],
];
for (const [from, to] of MOVES) {
  const src = A(from), dst = O(to);
  if (!fs.existsSync(src) || fs.existsSync(dst)) continue; // already moved
  ensure(path.dirname(dst));
  if (fs.statSync(src).isDirectory()) {
    ensure(dst);
    for (const f of fs.readdirSync(src)) fs.renameSync(path.join(src, f), path.join(dst, f));
    fs.rmdirSync(src); // empty dir only
  } else fs.renameSync(src, dst);
}
// public/images/services + hero bitmaps
const svcSrc = P("images/services");
if (fs.existsSync(svcSrc)) {
  ensure(O("services"));
  for (const f of fs.readdirSync(svcSrc)) if (/\.png$/i.test(f)) fs.renameSync(path.join(svcSrc, f), O("services", f));
}
for (const f of ["hero background.png", "smartphone background.png"]) {
  if (fs.existsSync(P(f))) { ensure(O("hero")); fs.renameSync(P(f), O("hero", f)); }
}
if (!fs.existsSync(O("logo", "logo.png")) && fs.existsSync(P("logo.png"))) {
  ensure(O("logo")); fs.copyFileSync(P("logo.png"), O("logo", "logo.png")); // copy only: public/logo.png stays untouched
}

const kebab = (s) => s.toLowerCase().replace(/\.[a-z]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const manifest = {};

// ── 2. responsive raster set (avif + webp @ 800 / 1600) ────────────────────
async function responsive(group, file, name) {
  const input = sharp(file);
  const meta = await input.metadata();
  const outDir = P("images", group);
  ensure(outDir);
  let total = 0;
  for (const w of [800, 1600]) {
    const width = Math.min(w, meta.width);
    const base = () => sharp(file).resize({ width, withoutEnlargement: true });
    const avif = path.join(outDir, `${name}-${w}.avif`);
    const webp = path.join(outDir, `${name}-${w}.webp`);
    await base().avif({ quality: 55, effort: 6 }).toFile(avif);
    await base().webp({ quality: 78, effort: 6 }).toFile(webp);
    if (w === 800) total += fs.statSync(avif).size;
  }
  manifest[`${group}/${name}`] = {
    base: `/images/${group}/${name}`,
    width: 800,
    height: Math.round((800 * meta.height) / meta.width),
  };
  report.push([`${group}/${name}`, fs.statSync(file).size, total]);
}

for (const f of fs.readdirSync(O("mockups"))) await responsive("mockups", O("mockups", f), kebab(f));
for (const f of fs.readdirSync(O("services"))) await responsive("services", O("services", f), kebab(f));
for (const f of fs.readdirSync(O("projects"))) await responsive("projects", O("projects", f), kebab(f));

// ── 3. client logos: trim, <=320px, webp < 30 KB ───────────────────────────
ensure(A("brand-logos"));
for (const f of fs.readdirSync(O("brand-logos"))) {
  const file = O("brand-logos", f);
  const name = kebab(f).replace(/-logo$/, "");
  const out = A("brand-logos", `${name}.webp`);
  let buf;
  try { buf = await sharp(file).trim({ threshold: 10 }).toBuffer(); } catch { buf = await sharp(file).toBuffer(); }
  let q = 85;
  while (true) {
    await sharp(buf).resize({ width: 320, withoutEnlargement: true }).webp({ quality: q, alphaQuality: 80, effort: 6 }).toFile(out);
    if (fs.statSync(out).size < 30 * 1024 || q <= 15) break;
    q -= 8;
  }
  report.push([`logo/${name}`, fs.statSync(file).size, fs.statSync(out).size]);
}

// ── 4. team photos: 800px max, attention-centred ───────────────────────────
ensure(A("team"));
for (const f of fs.readdirSync(O("team"))) {
  const name = kebab(f).replace(/-jpeg$/, "");
  const out = A("team", `${name}.webp`);
  await sharp(O("team", f)).rotate().resize({ width: 800, height: 800, fit: "cover", position: sharp.strategy.attention, withoutEnlargement: true }).webp({ quality: 80, effort: 6 }).toFile(out);
  report.push([`team/${name}`, fs.statSync(O("team", f)).size, fs.statSync(out).size]);
}

// ── 5. misc single images ──────────────────────────────────────────────────
for (const [src, out, w] of [
  [O("chalk-to-choice-center.png"), A("chalk-to-choice-center.webp"), 1000],
  [O("quote-illustration.png"), A("quote-illustration.webp"), 800],
]) {
  if (!fs.existsSync(src)) continue;
  await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82, effort: 6 }).toFile(out);
  report.push([path.basename(out), fs.statSync(src).size, fs.statSync(out).size]);
}

// ── 6. brand logo (public/brand/*, supplied from the official artwork) ─────
// Old logo files are moved (not deleted) to src/assets/_originals/old-logo/.
ensure(O("old-logo"));
for (const [from, to] of [[P("logo.png"), "logo.png"], [P("logo-2x.png"), "logo-2x.png"], [P("favicon.png"), "favicon.png"], [A("logo.png"), "assets-logo.png"], [path.join(ROOT, "RUID8f3cea3bb7aa4daabc6d2ba95d9c3393.png"), "../logisaar-logo-source.png"]]) {
  if (fs.existsSync(from) && !fs.existsSync(path.join(O("old-logo"), to))) fs.renameSync(from, path.join(O("old-logo"), to));
}
const B = (f) => P("brand", f);
const brandSizes = [["logisaar-logo", 480], ["logisaar-logo-white", 480], ["logisaar-mark", 128]];
for (const [name, w] of brandSizes) {
  const src = B(`${name}.png`);
  for (const [ext, enc] of [["webp", (i) => i.webp({ quality: 90, alphaQuality: 100, effort: 6 })], ["png", (i) => i.png({ compressionLevel: 9, palette: true, quality: 95 })]]) {
    const out = B(`${name}-${w}.${ext}`);
    await enc(sharp(src).resize({ width: w })).toFile(out);
    report.push([`brand/${name}-${w}.${ext}`, fs.statSync(B(`${name}.${ext}`)).size, fs.statSync(out).size]);
  }
}
const lm = await sharp(B("logisaar-logo.png")).metadata();
manifest["logo"] = { base: "/brand/logisaar-logo", width: 480, height: Math.round((480 * lm.height) / lm.width) };

// ── 7. favicons + manifest from brand/logisaar-mark.png ────────────────────
const sq = (n) => sharp(B("logisaar-mark.png")).resize(n, n, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
await sq(180).png().toFile(P("apple-touch-icon.png"));
await sq(192).png().toFile(P("icon-192.png"));
await sq(512).png().toFile(P("icon-512.png"));
await sq(48).png().toFile(P("favicon.png"));
// ICO (16/32/48, PNG-encoded entries)
const icoSizes = [16, 32, 48];
const pngs = await Promise.all(icoSizes.map((n) => sq(n).png().toBuffer()));
const header = Buffer.alloc(6); header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(pngs.length, 4);
let offset = 6 + 16 * pngs.length;
const dir = Buffer.concat(pngs.map((b, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(icoSizes[i], 0); e.writeUInt8(icoSizes[i], 1); e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(b.length, 8); e.writeUInt32LE(offset, 12); offset += b.length; return e;
}));
fs.writeFileSync(P("favicon.ico"), Buffer.concat([header, dir, ...pngs]));
fs.writeFileSync(P("site.webmanifest"), JSON.stringify({
  name: "Logisaar", short_name: "Logisaar", start_url: "/", display: "standalone",
  background_color: "#ffffff", theme_color: "#00d162",
  icons: [{ src: "/icon-192.png", sizes: "192x192", type: "image/png" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }],
}, null, 2));

// ── 8. manifest + report ───────────────────────────────────────────────────
fs.writeFileSync(path.join(ROOT, "src/data/image-manifest.json"), JSON.stringify(manifest, null, 2));
let before = 0, after = 0;
for (const [n, b, a] of report) { before += b; after += a; console.log(`${n.padEnd(34)} ${(b / 1024).toFixed(0).padStart(6)} KB -> ${(a / 1024).toFixed(1).padStart(7)} KB`); }
console.log(`TOTAL (1x set) ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(2)} MB`);

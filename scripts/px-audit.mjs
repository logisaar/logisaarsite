// Responsive-units guard. Lists fixed-px values that are not on the allow-list (round 4, rule 10).
//   TSX: arbitrary Tailwind utilities like w-[170px]       CSS: NNpx declarations
// Allowed: hairlines (1-2px), box-shadow, blur/filter radii, outlines/focus rings, strokes, borders, SVG, image attrs.
// Exit code 1 when the focus pages (home, IKURO, HeyLane, Careers + shared chrome) have any, or when the total exceeds --max.
//   usage: node scripts/px-audit.mjs [--max=N] [--quiet]
import fs from "node:fs";
import path from "node:path";

const SRC = "src";
const max = Number((process.argv.find((a) => a.startsWith("--max=")) || "--max=0").split("=")[1]);
const quiet = process.argv.includes("--quiet");

const FOCUS = [
  /^src\/pages\/(Index|Careers|Ikuro|IkuroPage|HeyLane|HeyLanePage)\.tsx$/,
  /^src\/components\/(home|ikuro|heylane|logi)\//,
  /^src\/components\/(Navbar|TopBar|Footer|Layout|WhatsAppButton|ScrollToTop|BrandLogo|ResponsiveImage)\.tsx$/,
  /^src\/index\.css$/,
];

const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== "_originals") walk(p, out); } else if (/\.(tsx|css)$/.test(e.name)) out.push(p);
  }
  return out;
};

const TSX_ALLOW = /^(?:[\w-]+:)*!?-?(?:blur|backdrop-blur|shadow|drop-shadow|border|ring|outline|stroke|decoration|underline-offset|divide|inset-shadow)\b/;
const CSS_KEEP = /^(box-shadow|filter|backdrop-filter|-webkit-backdrop-filter|outline|outline-offset|border|border-top|border-bottom|border-left|border-right|border-width|text-shadow|stroke-width|-webkit-text-stroke|letter-spacing|clip)$/;

const hits = [];
for (const file of walk(SRC)) {
  const rel = file.split(path.sep).join("/");
  const text = fs.readFileSync(file, "utf8");
  if (file.endsWith(".tsx")) {
    text.split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/(?<![\w\[-])((?:[\w-]+:)*!?-?[a-z][\w-]*-\[[^\]\s]*\d+(?:\.\d+)?px[^\]\s]*\])/g)) {
        if (TSX_ALLOW.test(m[1])) continue;
        hits.push({ rel, line: i + 1, text: m[1] });
      }
    });
  } else {
    text.split("\n").forEach((line, i) => {
      for (const m of line.matchAll(/(?:^|[{;\s])([a-z-]+)\s*:\s*([^;{}]*?px[^;{}]*?)(?=;|}|$)/g)) {
        const [, prop, val] = m;
        if (CSS_KEEP.test(prop) || /^--/.test(prop) && !/size|gap/.test(prop)) continue;
        const nums = [...val.matchAll(/(?<![\w.#])(-?\d+(?:\.\d+)?)px\b/g)].map((x) => Math.abs(+x[1]));
        if (nums.every((n) => n <= 2)) continue;   // hairlines
        hits.push({ rel, line: i + 1, text: `${prop}: ${val.trim()}` });
      }
    });
  }
}

const focus = hits.filter((h) => FOCUS.some((r) => r.test(h.rel)));
const rest = hits.filter((h) => !focus.includes(h));
if (!quiet) {
  for (const [title, list] of [["Focus pages (target 0)", focus], ["Elsewhere", rest]]) {
    console.log(`\n${title}: ${list.length}`);
    const byFile = {};
    for (const h of list) (byFile[h.rel] ||= []).push(h);
    for (const [f, hs] of Object.entries(byFile)) { console.log(`  ${f} (${hs.length})`); hs.slice(0, 5).forEach((h) => console.log(`     ${h.line}: ${h.text.slice(0, 90)}`)); }
  }
}
console.log(`\npx audit: focus ${focus.length}, elsewhere ${rest.length}, total ${hits.length} (allowed: hairlines, shadows, blur, outlines, strokes, borders)`);
process.exit(focus.length > 0 || hits.length > max ? 1 : 0);

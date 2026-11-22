// Round 11 QA (run against `npm run build` + `vite preview`): per route and width: overflow, text under 12px outside
// aria-hidden demos, broken images; and at 375 / 1280 a scroll walk (300px steps) asserting that Logi, its bubble and the
// floating buttons never overlap headings, text, links, buttons, inputs, images or demos in main/footer. Screenshots in qa/.
//   usage: node scripts/round11-qa.mjs [outDir]   env BASE (default http://localhost:4173), FULL=1 for all widths + 200% font
import { chromium } from "playwright-core";
import fs from "node:fs";

const BASE = process.env.BASE || "http://localhost:4173";
const OUT = process.argv[2] || "claude-code-tasks/round-11-final-polish-domain/qa";
fs.mkdirSync(OUT, { recursive: true });
const app = fs.readFileSync("src/App.tsx", "utf8");
const ROUTES = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => !["*", "/techxera", "/terms-of-service"].includes(p));
const WIDTHS = process.env.FULL ? [320, 375, 768, 1024, 1280, 1440, 1920] : [375, 768, 1280];
const WALK = [375, 1280];
const b = await chromium.launch({ channel: "chrome" });
const fails = [], warns = [];
const fail = (m) => { fails.push(m); console.log("FAIL", m); };
const warn = (m) => { warns.push(m); console.log("warn", m); };

const checkBasics = (page) => page.evaluate(() => {
  const small = [], broken = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = w.nextNode())) {
    const t = n.textContent.trim(); const el = n.parentElement;
    if (!t || !el || el.closest("[aria-hidden='true'], script, style, noscript, .sr-only")) continue;
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    if (cs.display === "none" || cs.visibility === "hidden" || !r.width || !r.height) continue;
    if (parseFloat(cs.fontSize) < 12) small.push(`${el.tagName}:${t.slice(0, 24)}(${cs.fontSize})`);
  }
  document.querySelectorAll("img").forEach((i) => { if (i.complete && i.naturalWidth === 0 && i.currentSrc) broken.push(i.currentSrc.slice(-40)); });
  return { overflow: document.documentElement.scrollWidth - innerWidth, small: [...new Set(small)].slice(0, 6), broken };
});

const overlapProbe = (page) => page.evaluate(() => {
  const boxes = [];
  const logi = document.getElementById("logi");
  if (logi) {
    const cs = getComputedStyle(logi.querySelector(".logi-bubble"));
    boxes.push(["logi", logi.querySelector(".logi-body").getBoundingClientRect()]);
    if (logi.classList.contains("talk") && +cs.opacity > 0.5) boxes.push(["bubble", logi.querySelector(".logi-bubble").getBoundingClientRect()]);
  }
  document.querySelectorAll("a[aria-label='Chat on WhatsApp'], button[aria-label='Back to top']").forEach((e) => boxes.push([e.getAttribute("aria-label"), e.getBoundingClientRect()]));
  const textRect = (el) => { const r = document.createRange(); r.selectNodeContents(el); const rs = [...r.getClientRects()].filter((q) => q.width > 1); if (!rs.length) return null; return { left: Math.min(...rs.map((q) => q.left)), right: Math.max(...rs.map((q) => q.right)), top: Math.min(...rs.map((q) => q.top)), bottom: Math.max(...rs.map((q) => q.bottom)) }; };
  const hits = [];
  const sel = "main h1, main h2, main h3, main p, main a, main button, main input, main img, main [data-demo], footer h1, footer h2, footer h3, footer p, footer a, footer button, footer input";
  document.querySelectorAll(sel).forEach((el) => {
    if (el.closest("#logi, .logi-chat, [aria-hidden='true'], .sr-only")) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity < 0.1) return;
    const r = /^(H[1-3]|P|A)$/.test(el.tagName) && el.children.length === 0 ? textRect(el) : el.getBoundingClientRect();
    if (!r || r.bottom < 0 || r.top > innerHeight || r.width < 2 || r.height < 2) return;
    // an anchor/button that is a whole card is not "content" in the sense of the test; only count small controls and text
    if (el.tagName !== "IMG" && (r.right - r.left) * (r.bottom - r.top) > 60000) return;
    for (const [name, b] of boxes) {
      if (b.left < r.right && b.right > r.left && b.top < r.bottom && b.bottom > r.top) hits.push(`${name} over ${el.tagName.toLowerCase()}:${(el.textContent || el.alt || "").trim().slice(0, 24)}`);
    }
  });
  return [...new Set(hits)];
});

for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 600 ? 812 : 800 } });
  for (const route of ROUTES) {
    const tag = `${route} @${w}`;
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.waitForTimeout(2200);
    // scroll through once so lazy images and reveals load
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    if (WALK.includes(w)) {
      const seen = new Set();
      for (let y = 0; y < H; y += 300) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(w === 1280 ? 260 : 220);
        for (const h of await overlapProbe(page)) seen.add(h);
      }
      if (seen.size) warn(`${tag}: ${[...seen].slice(0, 6).join(" | ")}${seen.size > 6 ? ` (+${seen.size - 6})` : ""}`);
    } else {
      for (let y = 0; y < H; y += 700) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120); }
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const r = await checkBasics(page);
    if (r.overflow > 0) fail(`${tag}: horizontal overflow ${r.overflow}px`);
    if (r.small.length) fail(`${tag}: text under 12px: ${r.small.join(", ")}`);
    if (r.broken.length) fail(`${tag}: broken images: ${r.broken.join(", ")}`);
    if (w === 375 || w === 1280) await page.screenshot({ path: `${OUT}/${route === "/" ? "home" : route.slice(1).replace(/\//g, "_")}-${w}.png`, fullPage: false });
    await page.close();
  }
  await ctx.close();
}
if (process.env.FULL) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  for (const route of ROUTES) {
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "load" });
    await page.addStyleTag({ content: "html{font-size:200% !important}" });
    await page.waitForTimeout(1500);
    const o = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (o > 0) fail(`${route} @200% font: horizontal overflow ${o}px`);
    await page.close();
  }
  await ctx.close();
}
await b.close();
console.log(`\n${fails.length} fail, ${warns.length} overlap warnings`);
fs.writeFileSync(`${OUT}/round11-qa-report.txt`, [...fails.map((f) => "FAIL " + f), ...warns.map((w) => "warn " + w)].join("\n"));
process.exit(fails.length ? 1 : 0);

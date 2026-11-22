// Round 10 QA: one footer on every page, no duplicate CTA, one back-to-top, /contact has no CTA zone, no overflow,
// header solid dark over the footer, footer contrast / size / target checks, accordions, reduced motion, screenshots.
//   usage: node scripts/round10-qa.mjs [outDir]   env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:8080";
const OUT = process.argv[2] || "claude-code-tasks/round-10-one-footer/qa";
fs.mkdirSync(OUT, { recursive: true });
const ROUTES = ["/", "/about", "/solutions", "/contact", "/careers", "/ikuro", "/heylane"];
const WIDTHS = [375, 768, 1280, 1920];
const b = await chromium.launch({ channel: "chrome" });
const fails = [];
const warns = [];
const fail = (m) => { fails.push(m); console.log("FAIL", m); };
const warn = (m) => { warns.push(m); console.log("warn", m); };
const ok = (m) => console.log("ok  ", m);
const toEnd = async (page) => {
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(2200);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(800);
};

for (const w of WIDTHS) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 600 ? 812 : 900 } });
  for (const route of ROUTES) {
    const tag = `${route} @${w}`;
    const page = await ctx.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await toEnd(page);
    const r = await page.evaluate(() => {
      const f = document.querySelector("footer");
      const ctaZone = f?.querySelector(".ft-cta");
      const headings = [...document.querySelectorAll("h2")].filter((h) => /Tell us the one task/.test(h.textContent || ""));
      const booking = f ? [...f.querySelectorAll("a")].filter((a) => /Book a free call/.test(a.textContent || "")).length : 0;
      const backToTop = [...document.querySelectorAll("button")].filter((x) => /back to top|scroll to top/i.test(x.getAttribute("aria-label") || "")).length;
      const hdr = document.querySelector("header > div");
      const lum = (c) => { const m = c.match(/[\d.]+/g).map(Number); return (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255; };
      // last visible element block of <main> directly above the footer
      const main = document.querySelector("main");
      const last = main ? [...main.querySelectorAll(":scope > *, :scope > * > *")].filter((e) => e.getBoundingClientRect().height > 80).pop() : null;
      const lastBg = last ? getComputedStyle(last).backgroundColor : null;
      return {
        footers: document.querySelectorAll("footer").length,
        ctaZone: !!ctaZone,
        headings: headings.length,
        booking,
        backToTop,
        overflow: document.documentElement.scrollWidth - window.innerWidth,
        headerDark: !!hdr && /slate-950\/95/.test(hdr.className),
        footerTop: f ? f.getBoundingClientRect().top : 0,
        darkAbove: lastBg && /rgb/.test(lastBg) && lum(lastBg) < 0.2 && !/rgba\(0, 0, 0, 0\)/.test(lastBg),
        lastBg,
      };
    });
    if (r.footers !== 1) fail(`${tag}: ${r.footers} <footer> elements`);
    if (r.overflow > 0) fail(`${tag}: horizontal overflow ${r.overflow}px`);
    if (r.backToTop !== 1) fail(`${tag}: ${r.backToTop} back-to-top controls`);
    if (route === "/contact") {
      if (r.ctaZone || r.headings) fail(`${tag}: CTA zone present on /contact`);
    } else {
      if (!r.ctaZone) fail(`${tag}: CTA zone missing`);
      if (r.headings !== 1) fail(`${tag}: ${r.headings} copies of the CTA headline`);
      if (r.booking !== 1) fail(`${tag}: ${r.booking} "Book a free call" links in the footer`);
    }
    if (r.footerTop > 92) ok(`${tag}: footer starts below the header strip (top ${Math.round(r.footerTop)}), so the header correctly stays light`);
    else if (!r.headerDark) fail(`${tag}: header is not the solid dark capsule over the footer (footer top ${Math.round(r.footerTop)})`);
    if (r.darkAbove) warn(`${tag}: dark band directly above footer (${r.lastBg}); expected only the IKURO / HeyLane product closings`);
    await page.close();
  }
  await ctx.close();
}
ok("per-route checks done");

// footer text: contrast >= 4.5:1 on #060a12, size >= 12px, targets >= 44px (1280 and 375)
for (const w of [1280, 375]) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 600 ? 812 : 900 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  // open every accordion so their links are measured too
  await page.evaluate(() => document.querySelectorAll("footer button[aria-expanded='false']").forEach((x) => x.click()));
  await page.waitForTimeout(300);
  const res = await page.evaluate(() => {
    const bg = [6, 10, 18];
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const L = (c) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    const out = { low: [], small: [], targets: [] };
    const f = document.querySelector("footer");
    const walker = document.createTreeWalker(f, NodeFilter.SHOW_TEXT);
    const seen = new Set();
    while (walker.nextNode()) {
      const n = walker.currentNode;
      if (!n.textContent.trim()) continue;
      const el = n.parentElement;
      if (seen.has(el) || el.closest("[aria-hidden='true']") || el.closest(".sr-only") || el.closest(".ft-btn--pri")) continue; // the green button is checked by its own pair: #04130B on #00D162
      seen.add(el);
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      const m = cs.color.match(/[\d.]+/g).map(Number);
      const a = m[3] ?? 1;
      const c = [0, 1, 2].map((i) => m[i] * a + bg[i] * (1 - a));
      const ratio = (L(c) + 0.05) / (L(bg) + 0.05);
      const bright = ratio;
      if (bright < 4.5) out.low.push(`${el.textContent.trim().slice(0, 30)} ${bright.toFixed(2)}`);
      if (parseFloat(cs.fontSize) < 12) out.small.push(`${el.textContent.trim().slice(0, 30)} ${cs.fontSize}`);
    }
    f.querySelectorAll("a[href], button").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0) return;
      if (r.height < 43.5 || r.width < 43.5) out.targets.push(`${(el.getAttribute("aria-label") || el.textContent).trim().slice(0, 30)} ${Math.round(r.width)}x${Math.round(r.height)}`);
    });
    return out;
  });
  if (res.low.length) fail(`@${w} low contrast: ${res.low.join("; ")}`); else ok(`@${w} footer contrast >= 4.5:1`);
  if (res.small.length) fail(`@${w} text under 12px: ${res.small.join("; ")}`); else ok(`@${w} no footer text under 12px`);
  if (res.targets.length) fail(`@${w} small targets: ${res.targets.join("; ")}`); else ok(`@${w} footer targets >= 44px`);
  await ctx.close();
}

// accordions at 375, no overflow at 320
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 812 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const btns = page.locator("footer button[aria-expanded]");
  const n = await btns.count();
  if (n === 4) ok("4 accordions at 375 (Solutions, Company, Legal, Locations)"); else fail(`${n} accordions at 375`);
  const officeOpen = await page.locator("footer address").isVisible();
  if (officeOpen) ok("Office stays open"); else fail("Office hidden at 375");
  const first = btns.first();
  await first.focus();
  await page.keyboard.press("Enter");
  const ex = await first.getAttribute("aria-expanded");
  if (ex === "true") ok("Enter opens an accordion"); else fail("Enter did not open accordion");
  await page.keyboard.press("Space");
  if ((await first.getAttribute("aria-expanded")) === "false") ok("Space closes it"); else fail("Space did not close accordion");
  await page.addStyleTag({ content: "header, aside, [class*=logi]{visibility:hidden!important}" });
  await page.locator("footer").screenshot({ path: `${OUT}/footer-375.png` });
  await ctx.close();
  const c2 = await b.newContext({ viewport: { width: 320, height: 700 } });
  const p2 = await c2.newPage();
  await p2.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(p2);
  const ov = await p2.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (ov <= 0) ok("no overflow at 320"); else fail(`overflow ${ov}px at 320`);
  await c2.close();
}

// 1280 screenshot, CTA/columns checks, wordmark sweep and hover
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1200 }, timezoneId: "America/New_York" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const txt = await page.locator(".ft-now").innerText();
  const ist = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).replace(/\s?(AM|PM)$/i, (m) => ` ${m.trim().toLowerCase()}`);
  if (txt.includes(ist) && txt.includes("Bhubaneswar")) ok(`IST line: "${txt.replace(/\s+/g, " ")}"`); else fail(`IST line "${txt}" (expected ${ist})`);
  if (/working now|next working day/.test(txt)) fail("status wording shown although OFFICE_HOURS is null"); else ok("no status wording while OFFICE_HOURS is null");
  const bar = await page.locator(".ft-bar").innerText();
  if (/where you are/.test(bar)) ok(`bottom bar: "${bar.replace(/\s+/g, " ")}"`); else fail(`bottom bar "${bar}"`);
  const sweep = await page.evaluate(() => getComputedStyle(document.querySelector(".ft-sweep-rect")).transform);
  if (sweep && sweep !== "none") ok("wordmark sweep ran (scaleX applied)"); else fail("wordmark sweep did not run");
  const fillOpacity = await page.evaluate(() => getComputedStyle(document.querySelector(".ft-sig-fill")).opacity);
  if (Number(fillOpacity) <= 0.13) ok(`wordmark fill opacity ${fillOpacity} (never solid)`); else fail(`wordmark fill opacity ${fillOpacity}`);
  const box = await page.locator(".ft-sig-svg").boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height * 0.5);
  await page.waitForTimeout(400);
  const hlOp = await page.evaluate(() => getComputedStyle(document.querySelector(".ft-sig-hl")).opacity);
  if (Number(hlOp) > 0.9) ok("hover highlight follows the cursor"); else fail(`hover highlight opacity ${hlOp}`);
  await page.mouse.move(5, 5);
  await page.addStyleTag({ content: "header, aside, [class*=logi]{visibility:hidden!important}" });
  await page.locator("footer").screenshot({ path: `${OUT}/footer-1280.png` });
  await ctx.close();
}

// reduced motion: wordmark filled, no pulse, traces static
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const r = await page.evaluate(() => ({
    sweep: getComputedStyle(document.querySelector(".ft-sweep-rect")).transform,
    dot: getComputedStyle(document.querySelector(".ft-dot")).animationName,
    trace: getComputedStyle(document.querySelector(".ft-traces path")).animationName,
  }));
  if (r.sweep === "matrix(1, 0, 0, 1, 0, 0)" || r.sweep === "none") ok("reduced motion: wordmark already filled"); else fail(`reduced motion sweep ${r.sweep}`);
  if (r.dot === "none" && r.trace === "none") ok("reduced motion: no pulse, static traces"); else fail(`reduced motion animations ${JSON.stringify(r)}`);
  await ctx.close();
}

// side by side with the approved reference
{
  const ref = "claude-code-tasks/round-10-one-footer/reference";
  const ctx = await b.newContext({ viewport: { width: 1400, height: 900 } });
  const page = await ctx.newPage();
  for (const w of [1280, 375]) {
    const a = path.resolve(ref, `footer-reference-${w}.png`);
    const c = path.resolve(OUT, `footer-${w}.png`);
    if (!fs.existsSync(a) || !fs.existsSync(c)) continue;
    const uri = (p) => `data:image/png;base64,${fs.readFileSync(p).toString("base64")}`;
    await page.setContent(`<body style="margin:0;background:#fff;font:14px sans-serif"><div style="display:flex;gap:16px;align-items:flex-start;padding:16px"><figure style="margin:0;flex:1"><figcaption>Reference</figcaption><img style="width:100%" src="${uri(a)}"></figure><figure style="margin:0;flex:1"><figcaption>Built</figcaption><img style="width:100%" src="${uri(c)}"></figure></div></body>`);
    await page.screenshot({ path: `${OUT}/compare-${w}.png`, fullPage: true });
  }
  await ctx.close();
}

await b.close();
console.log(`\n${fails.length} failures, ${warns.length} warnings`);
process.exit(fails.length ? 1 : 0);

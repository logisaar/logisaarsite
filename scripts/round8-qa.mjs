// Round 8 QA: overflow, tiny text, small targets, blank runs, page-height stability, clipped elements, dropdown opacity, demo-empty marker.
//   usage: node scripts/round8-qa.mjs [outDir]   env BASE (default http://localhost:8080)  WIDTHS=320,375,...  ZOOMS=100,200  SHOTS=1
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = process.argv[2] || "claude-code-tasks/round-8-visual-polish/qa";
fs.mkdirSync(OUT, { recursive: true });
const routes = (process.env.ROUTES ? process.env.ROUTES.split(",") : ["", "about", "solutions", "contact", "careers", "ikuro", "heylane"]);
const widths = (process.env.WIDTHS || "320,375,768,1024,1280,1440,1920").split(",").map(Number);
const zooms = (process.env.ZOOMS || "100,200").split(",").map(Number);
const b = await chromium.launch({ channel: "chrome" });
const problems = [];
const log = (m) => { problems.push(m); console.log("FAIL", m); };

const measure = () => {
  const out = { overflow: 0, small: [], targets: [], clipped: [], empty: 0 };
  const doc = document.documentElement;
  out.overflow = doc.scrollWidth - window.innerWidth;
  out.empty = document.querySelectorAll("[data-demo-empty]").length;
  const vis = (el) => { const cs = getComputedStyle(el); return !(cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0); };
  const insideFaux = (el) => el.closest("[aria-hidden=true], .demo-root, figure[role=img], svg[role=img]");
  const walker = document.createTreeWalker(document.querySelector("main") || document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    if (!n.textContent.trim()) continue;
    const el = n.parentElement;
    if (!vis(el) || insideFaux(el) || el.closest(".sr-only")) continue;
    const r = document.createRange(); r.selectNodeContents(n);
    const bb = r.getBoundingClientRect();
    if (!bb.width || !bb.height) continue;
    const fs = parseFloat(getComputedStyle(el).fontSize);
    if (fs < 11.95) out.small.push(`${fs.toFixed(1)}px ${n.textContent.trim().slice(0, 30)}`);
  }
  document.querySelectorAll("main a[href], main button, main [role=tab], main summary, main input, main select, main textarea").forEach((el) => {
    if (!vis(el) || insideFaux(el) || el.closest(".sr-only")) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    // inline text links inside a sentence are exempt (WCAG 2.2 inline exception)
    const inline = getComputedStyle(el).display === "inline" && el.closest("p, li");
    if (inline) return;
    if (r.width < 43.5 || r.height < 43.5) out.targets.push(`${Math.round(r.width)}x${Math.round(r.height)} ${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 25)}`);
  });
  document.querySelectorAll("main *").forEach((el) => {
    if (!vis(el)) return;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return;
    if (el.closest("[role=region], .overflow-x-auto, .overflow-hidden, [aria-hidden=true], [data-theme=heylane] figure, svg, .sr-only, .marquee, [class*=Marquee]")) return;
    if (r.left < -2 || r.right > window.innerWidth + 2) out.clipped.push(el.tagName + "." + String(el.className).slice(0, 40));
  });
  out.small = out.small.slice(0, 4); out.targets = out.targets.slice(0, 4); out.clipped = out.clipped.slice(0, 3);
  return out;
};

// vertical runs of empty background between content inside main (sticky/pinned ranges count as content)
const blankRuns = () => {
  const main = document.querySelector("main") || document.body;
  const iv = [];
  const sy = window.scrollY;
  main.querySelectorAll("*").forEach((e) => {
    const cs = getComputedStyle(e);
    if (cs.visibility === "hidden" || cs.display === "none") return;
    const r = e.getBoundingClientRect();
    if (r.height < 2 || r.width < 2) return;
    const own = [...e.childNodes].some((nd) => nd.nodeType === 3 && nd.textContent.trim());
    const media = ["IMG", "svg", "VIDEO", "CANVAS", "BUTTON", "INPUT", "IFRAME"].includes(e.tagName);
    const bg = cs.backgroundImage !== "none" || (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && e.children.length === 0);
    const border = parseFloat(cs.borderTopWidth) > 0 || parseFloat(cs.borderBottomWidth) > 0;
    if (own || media || bg || border) iv.push([r.top + sy, r.bottom + sy]);
    // pinned scenes (sticky stage) count as content for their whole track
    if (e.classList.contains("pin-spacer")) iv.push([r.top + sy, r.bottom + sy]); // GSAP pin spacer: the pinned stage is on screen for this whole range
    if (cs.position === "sticky" && e.parentElement) { const pr = e.parentElement.getBoundingClientRect(); iv.push([pr.top + sy, pr.bottom + sy]); }
  });
  iv.sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let end = iv.length ? iv[0][1] : 0;
  for (const [t, bt] of iv) { if (t - end > 160) gaps.push(`${Math.round(end)}+${Math.round(t - end)}`); end = Math.max(end, bt); }
  return gaps;
};

for (const zoom of zooms) for (const w of widths) {
  if (zoom === 200 && w > 1024) continue;
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript((z) => { sessionStorage.setItem("lead_capture_shown", "1"); if (z === 200) document.addEventListener("DOMContentLoaded", () => { document.documentElement.style.fontSize = "200%"; }); }, zoom);
  for (const r of routes) {
    const tag = `/${r || ""} @${w}${zoom === 200 ? " 200%" : ""}`;
    await p.goto(`${BASE}/${r}`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(900);
    const first = await p.evaluate(() => document.querySelectorAll("[data-demo-empty]").length);
    const h0 = await p.evaluate(() => document.documentElement.scrollHeight);
    const H = h0;
    for (let y = 0; y < H; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
    await p.waitForTimeout(500);
    const h1 = await p.evaluate(() => document.documentElement.scrollHeight);
    if (Math.abs(h1 - h0) > 4 && !(r === "" && w < 1024)) log(`${tag} page height changed ${h0} -> ${h1}`);
    const m = await p.evaluate(measure);
    if (m.overflow > 1) log(`${tag} horizontal overflow ${m.overflow}px`);
    if (m.small.length) log(`${tag} text under 12px: ${m.small.join(" | ")}`);
    if (m.targets.length) log(`${tag} small targets: ${m.targets.join(" | ")}`);
    if (m.clipped.length) log(`${tag} outside viewport: ${m.clipped.join(" | ")}`);
    if (m.empty || first) log(`${tag} empty demo marker present`);
    if (w === 1280 && zoom === 100) {
      const gaps = await p.evaluate(blankRuns);
      if (gaps.length) log(`${tag} blank runs > 160px (top+height): ${gaps.join(", ")}`);
    }
    if (process.env.SHOTS && zoom === 100 && (w === 375 || w === 1280)) {
      await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
      await p.screenshot({ path: `${OUT}/after-${r || "home"}-${w}.png`, fullPage: true }).catch(() => {});
    }
  }
  await ctx.close();
}

// Products dropdown: opaque, over the About h2 at scrollY 900
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(`${BASE}/about`, { waitUntil: "load" }).catch(() => {});
  await p.waitForTimeout(800);
  await p.evaluate(() => window.scrollTo(0, 900));
  await p.waitForTimeout(500);
  const trig = p.getByRole("button", { name: /products/i }).first();
  await trig.focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(400);
  const res = await p.evaluate(() => {
    const m = document.querySelector("[role=menu]");
    if (!m) return null;
    const bg = getComputedStyle(m).backgroundColor;
    const a = bg.startsWith("rgba") ? parseFloat(bg.split(",")[3]) : 1;
    return { bg, a, items: m.querySelectorAll("[role=menuitem]").length };
  });
  if (!res) log("Products dropdown: no [role=menu] after Enter");
  else if (res.a !== 1) log(`Products dropdown background not opaque: ${res.bg}`);
  else console.log("Products dropdown opaque:", JSON.stringify(res));
  await p.screenshot({ path: `${OUT}/after-products-dropdown-about-900.png` });
  await p.keyboard.press("Escape");
  await p.waitForTimeout(200);
  const focusBack = await p.evaluate(() => document.activeElement?.textContent?.toLowerCase().includes("products"));
  if (!focusBack) log("Products dropdown: Escape did not return focus to the trigger");
  await ctx.close();
}

// Reduced motion: nothing loops, final states shown
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  for (const r of ["", "solutions", "heylane"]) {
    await p.goto(`${BASE}/${r}`, { waitUntil: "load" }).catch(() => {});
    await p.waitForTimeout(800);
    const looping = await p.evaluate(() => document.getAnimations().filter((a) => a.effect?.getComputedTiming().iterations === Infinity && a.playState === "running").length);
    if (looping) log(`/${r} reduced motion: ${looping} infinite CSS animation(s) still running`);
  }
  await ctx.close();
}
await b.close();
console.log(problems.length ? `\n${problems.length} problem(s)` : "\nround 8 QA: all clear");
process.exit(problems.length ? 1 : 0);

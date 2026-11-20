// Local accessibility checks that need no external code (stand-in for axe-core until a package is approved).
// Checks: text contrast (WCAG AA), controls without a name, heading order, images without alt, content outside landmarks.
//   usage: node scripts/a11y-lite.mjs [route ...]    env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["", "ikuro", "heylane", "careers", "products"];
const BASE = process.env.BASE || "http://localhost:8080";
const b = await chromium.launch({ channel: "chrome" });
let total = 0;
for (const route of routes) {
  for (const w of [375, 1280]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: w < 500, isMobile: w < 500 });
    const p = await ctx.newPage();
    await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
    await p.goto(`${BASE}/${route}`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(1500);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 600) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(80); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(1800); // let reveal animations finish
    const res = await p.evaluate(() => {
      const skip = (el) => el.closest("[data-agentation-root], [data-feedback-toolbar]");
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
      const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
      const bgOf = (el) => { // composite ancestors' backgrounds; give up (null) on images/gradients
        const stack = []; for (let e = el; e; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.backgroundImage !== "none" && !/^url|gradient/.test("")) { if (/gradient|url/.test(cs.backgroundImage)) return null; } const c = parse(cs.backgroundColor); if (c && c.a > 0) { stack.push(c); if (c.a === 1) break; } }
        let base = { r: 255, g: 255, b: 255, a: 1 }; for (const c of stack.reverse()) base = over(c, base); return base;
      };
      const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); if (!(r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none")) return false; let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity; return op > 0.5; };
      const contrast = [], seen = new Set();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode()); ) {
        const t = n.textContent.trim(); const el = n.parentElement;
        if (!t || !el || skip(el) || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName) || !vis(el) || el.closest("[aria-hidden='true']")) continue;
        const cs = getComputedStyle(el);
        if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || cs.color === "rgba(0, 0, 0, 0)") continue; // gradient/outline text
        let fg = parse(cs.color); const bg = bgOf(el); if (!fg || !bg) continue;
        let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity; fg = { ...fg, a: fg.a * op };
        const f = over(fg, bg), l1 = lum(f), l2 = lum(bg), ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700, large = size >= 24 || (size >= 18.66 && bold);
        const need = large ? 3 : 4.5;
        if (ratio < need) { const key = `${el.tagName}|${t.slice(0, 20)}`; if (!seen.has(key)) { seen.add(key); contrast.push(`${ratio.toFixed(2)}:1 (<${need}) ${el.tagName.toLowerCase()} "${t.slice(0, 32)}" ${size.toFixed(0)}px`); } }
      }
      const unnamed = [];
      for (const el of document.querySelectorAll("button, a[href], [role=button], input:not([type=hidden]), select, textarea")) {
        if (skip(el) || !vis(el)) continue;
        const name = (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("title") || el.textContent || el.getAttribute("alt") || "").trim() || el.querySelector("img[alt]:not([alt=''])") || (el.id && document.querySelector(`label[for='${el.id}']`)) || el.closest("label");
        if (!name) unnamed.push(`${el.tagName.toLowerCase()} ${String(el.className).slice(0, 40)}`);
      }
      const heads = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].filter((e) => !skip(e) && vis(e)); const order = []; let prev = 0;
      for (const hd of heads) { const lv = +hd.tagName[1]; if (prev && lv > prev + 1) order.push(`${hd.tagName.toLowerCase()} after h${prev}: "${hd.textContent.trim().slice(0, 30)}"`); prev = lv; }
      const noAlt = [...document.images].filter((i) => !skip(i) && i.getAttribute("alt") === null).map((i) => (i.currentSrc || i.src).split("/").pop().slice(0, 40));
      const h1s = heads.filter((e) => e.tagName === "H1").length;
      const landmark = "header, nav, main, footer, aside, [role=banner], [role=navigation], [role=main], [role=contentinfo], [role=complementary], [role=region][aria-label], section[aria-label], section[aria-labelledby], form[aria-label]";
      const outside = [...document.body.querySelectorAll("*")].filter((e) => e.children.length === 0 && (e.textContent || "").trim() && !skip(e) && vis(e) && !e.closest(landmark) && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(e.tagName)).map((e) => `${e.tagName.toLowerCase()} "${e.textContent.trim().slice(0, 24)}"`);
      return { contrast, unnamed, order, noAlt, h1s, outside, title: document.title };
    });
    const issues = res.contrast.length + res.unnamed.length + res.order.length + res.noAlt.length + res.outside.length + (res.h1s === 1 ? 0 : 1);
    total += issues;
    console.log(`\n${route || "home"}@${w}: ${issues} issues  (h1 count ${res.h1s})`);
    for (const [k, v] of Object.entries({ contrast: res.contrast, unnamed: res.unnamed, headingOrder: res.order, imgNoAlt: res.noAlt, outsideLandmark: res.outside })) if (v.length) console.log(`  ${k} (${v.length}):\n      ${v.slice(0, 8).join("\n      ")}`);
    await ctx.close();
  }
}
await b.close();
console.log(`\nTOTAL issues: ${total}`);

// Round 5 header check: header must not intersect the first h1 or any visible text in <main> at scrollY 0 and 600.
//   usage: node scripts/header-qa.mjs [outDir]   env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = process.argv[2] || "claude-code-tasks/round-5-header-contact/qa/header";
fs.mkdirSync(OUT, { recursive: true });
const routes = ["", "about", "solutions", "portfolio", "ikuro", "products", "heylane", "contact", "careers", "web-development-odisha",
  "solutions/ai-powered-school-erp", "solutions/hotel-management-system", "solutions/ai-lead-followup", "solutions/ai-receptionist",
  "solutions/proposal-software", "solutions/qr-menu-system", "solutions/travel-website", "solutions/ai-automation", "solutions/custom-crm",
  "privacy-policy", "terms-conditions", "cookie-policy", "refund-policy", "no-such-page"];
const widths = [375, 768, 1024, 1280, 1440, 1920];
const b = await chromium.launch({ channel: "chrome" });
let fails = 0;
for (const zoom of (process.env.ZOOMS || "100,200").split(",").map(Number)) for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript((z) => { sessionStorage.setItem("lead_capture_shown", "1"); if (z === 200) document.addEventListener("DOMContentLoaded", () => { document.documentElement.style.fontSize = "200%"; }); }, zoom);
  for (const r of routes) {
    await p.goto(`${BASE}/${r}`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(700);
    for (const y of [0, 600]) {
      await p.evaluate((y) => window.scrollTo(0, y), y);
      await p.waitForTimeout(500);
      const bad = await p.evaluate(() => {
        const hs = [...document.querySelectorAll("header")].filter((h) => getComputedStyle(h).position === "fixed").map((h) => h.getBoundingClientRect());
        const topbar = document.querySelector("aside[aria-label^='Contact details']")?.getBoundingClientRect();
        const bars = topbar && topbar.height ? [...hs, topbar] : hs;
        const hdr = bars.filter((r) => r.height > 0);
        const hit = (r) => hdr.some((h) => r.bottom > h.top + 1 && r.top < h.bottom - 1 && r.right > h.left && r.left < h.right);
        const out = [];
        const main = document.querySelector("main");
        const h1 = main?.querySelector("h1");
        const scrollY = window.scrollY;
        const check = (el, label) => { const r = el.getBoundingClientRect(); if (r.width && r.height && hit(r)) out.push(label + ": " + (el.textContent || "").trim().slice(0, 40)); };
        if (scrollY < 50 && h1) check(h1, "h1");
        const walker = document.createTreeWalker(main || document.body, NodeFilter.SHOW_TEXT);
        let n;
        while ((n = walker.nextNode())) {
          if (!n.textContent.trim()) continue;
          const el = n.parentElement; const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
          if (el.closest("header, [aria-hidden=true]")) continue;
          const range = document.createRange(); range.selectNodeContents(n);
          const r = range.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          // at scroll 0 text under header is a bug; after scrolling, content legitimately passes under it
          if (scrollY < 50 && hit(r)) out.push("text: " + n.textContent.trim().slice(0, 40));
        }
        return out.slice(0, 3);
      });
      if (bad.length) { fails++; console.log(`FAIL ${zoom}% ${w} /${r} y=${y}`, bad); }
    }
    if (zoom === 100 && (w === 375 || w === 1920) && ["", "contact", "heylane", "about"].includes(r)) {
      await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(500);
      await p.screenshot({ path: `${OUT}/${r || "home"}-${w}.png` });
    }
  }
  await ctx.close();
}
await b.close();
console.log(fails ? `header check: ${fails} failures` : "header check: all routes clear");
process.exit(fails ? 1 : 0);

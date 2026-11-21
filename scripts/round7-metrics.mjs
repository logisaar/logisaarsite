// Round 7 metrics: h1 line count (1280, 375), page height (375) and h1 vs h2 size on inner pages.
//   usage: node scripts/round7-metrics.mjs     env BASE (default http://localhost:4173)
import { chromium } from "playwright-core";
const BASE = process.env.BASE || "http://localhost:4173";
const PAGES = ["/solutions", "/about", "/contact", "/careers", "/products", "/solutions/ai-receptionist"];
const b = await chromium.launch({ channel: "chrome" });
for (const url of PAGES) {
  const row = { url };
  for (const w of [1280, 375]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage();
    await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
    await p.goto(`${BASE}${url}`, { waitUntil: "load", timeout: 90000 });
    await p.waitForTimeout(1500);
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
    await p.waitForTimeout(500);
    const m = await p.evaluate(() => {
      const h1 = document.querySelector("h1");
      if (!h1) return { lines: 0, h1px: 0, h2px: 0, height: document.documentElement.scrollHeight };
      const cs = getComputedStyle(h1);
      const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.1;
      const h2 = [...document.querySelectorAll("main h2")].map((e) => parseFloat(getComputedStyle(e).fontSize));
      return { lines: Math.round(h1.getBoundingClientRect().height / lh), h1px: parseFloat(cs.fontSize), h2px: Math.max(0, ...h2), height: document.documentElement.scrollHeight };
    });
    row[w] = m;
    await ctx.close();
  }
  console.log(`${url.padEnd(30)} h1 lines 1280=${row[1280].lines} 375=${row[375].lines} | h1/h2max px @1280 ${row[1280].h1px.toFixed(0)}/${row[1280].h2px.toFixed(0)} | height@375=${row[375].height}`);
}
await b.close();

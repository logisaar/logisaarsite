// Phase 1.3 matrix: overflow, text < 12px and targets < 44x44 across widths (+ 200% root font size).
//   usage: node scripts/units-qa.mjs [route ...]     (dev server on :8080; default routes: "" ikuro heylane careers products)
//   env QUICK=1 -> 375 and 1280 only (+ zoom).  Screenshots at 375 and 1280 go to the round 4 qa folder.
import { chromium } from "playwright-core";
import fs from "node:fs";
const QA = "claude-code-tasks/round-4-audit-ikuro-heylane-responsive/qa";
fs.mkdirSync(QA, { recursive: true });
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["", "ikuro", "heylane", "careers", "products"];
const widths = process.env.QUICK ? [375, 1280] : [320, 375, 414, 768, 1024, 1280, 1440, 1920];
const runs = [...widths.map((w) => ({ w, zoom: false })), { w: 1280, zoom: true }];
const b = await chromium.launch({ channel: "chrome" });
const report = {};
for (const route of routes) {
  const name = route || "home";
  for (const { w, zoom } of runs) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: w < 500, isMobile: w < 500 });
    const p = await ctx.newPage();
    await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
    const res = await p.goto(`${process.env.BASE || "http://localhost:8080"}/${route}`, { waitUntil: "load", timeout: 90000 }).catch(() => null);
    if (zoom) await p.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    await p.waitForTimeout(1200);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 600) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(90); }
    await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    const r = await p.evaluate(() => {
      const skip = (el) => el.closest("[data-agentation-root], [data-feedback-toolbar], [data-agentation-toolbar]");
      const vis = (el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && +cs.opacity > 0.05; };
      const smallText = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let n; (n = walker.nextNode()); ) {
        const t = n.textContent.trim(); const el = n.parentElement;
        if (!t || !el || skip(el) || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName) || !vis(el) || el.closest("[aria-hidden='true']")) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs < 11.95) smallText.push(`${fs.toFixed(1)}px ${el.tagName.toLowerCase()} "${t.slice(0, 28)}"`);
      }
      const smallTargets = [];
      for (const el of document.querySelectorAll("a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=tab]")) {
        if (skip(el) || !vis(el)) continue;
        const rc = el.getBoundingClientRect();
        if (rc.width < 43.5 || rc.height < 43.5) smallTargets.push(`${Math.round(rc.width)}x${Math.round(rc.height)} ${el.tagName.toLowerCase()} "${(el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 24)}"`);
      }
      return { overflow: document.documentElement.scrollWidth - innerWidth, smallText, smallTargets, height: document.documentElement.scrollHeight, status: document.title };
    });
    const key = `${name}@${w}${zoom ? "-zoom200" : ""}`;
    report[key] = { http: res ? res.status() : "n/a", overflow: r.overflow, smallText: r.smallText.length, smallTargets: r.smallTargets.length, height: r.height, sampleText: [...new Set(r.smallText)].slice(0, 6), sampleTargets: [...new Set(r.smallTargets)].slice(0, 6) };
    if (!zoom && (w === 375 || w === 1280)) await p.screenshot({ path: `${QA}/${name}-${w}.png`, fullPage: true });
    console.log(`${key.padEnd(24)} overflow ${String(r.overflow).padStart(4)}  text<12 ${String(r.smallText.length).padStart(3)}  targets<44 ${String(r.smallTargets.length).padStart(3)}  height ${r.height}`);
    await ctx.close();
  }
}
fs.writeFileSync(`${QA}/units-report.json`, JSON.stringify(report, null, 1));
await b.close();

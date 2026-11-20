// Crawl every route and report broken <img>, failed image requests, unresolved CSS backgrounds, hidden images.
// usage: node scripts/audit-images.mjs   (dev server on :8080)
import { chromium } from "playwright-core";
const routes = ["", "about", "portfolio", "solutions", "solutions/ai-powered-school-erp", "solutions/hotel-management-system", "solutions/ai-lead-followup", "solutions/ai-receptionist", "solutions/proposal-software", "solutions/qr-menu-system", "solutions/travel-website", "solutions/ai-automation", "solutions/custom-crm", "products", "ikuro", "careers", "contact", "web-development-odisha", "privacy-policy", "terms-conditions", "cookie-policy", "refund-policy", "nope-404"];
const b = await chromium.launch({ channel: "chrome" });
const out = [];
for (const r of routes) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  const failed = [];
  p.on("response", (res) => { const u = res.url(); if (res.status() >= 400 && /\.(png|jpe?g|webp|avif|svg|gif|ico)(\?|$)/i.test(u)) failed.push(`${res.status()} ${u.replace(/^https?:\/\/[^/]+/, "")}`); });
  p.on("requestfailed", (q) => { if (/\.(png|jpe?g|webp|avif|svg|gif)(\?|$)/i.test(q.url())) failed.push(`FAILED ${q.url().replace(/^https?:\/\/[^/]+/, "")}`); });
  await p.goto("http://localhost:8080/" + r, { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(1500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 350) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(110); }
  await p.waitForTimeout(1500);
  const res = await p.evaluate(async () => {
    const broken = [], hidden = [], bg = [];
    for (const i of document.images) {
      const src = i.currentSrc || i.src;
      if (i.complete && i.naturalWidth === 0) broken.push(src);
      else {
        let el = i, op = 1; while (el && el !== document.body) { op *= parseFloat(getComputedStyle(el).opacity); el = el.parentElement; }
        const cs = getComputedStyle(i); const rect = i.getBoundingClientRect();
        if (rect.width > 40 && (op < 0.05 || cs.visibility === "hidden")) hidden.push(`${src} (opacity ${op.toFixed(2)})`);
      }
    }
    for (const el of document.querySelectorAll("*")) {
      const m = getComputedStyle(el).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/g);
      if (m) for (const u of m) { const url = u.replace(/url\(["']?|["']?\)$/g, ""); if (url.startsWith("data:")) continue; try { const rs = await fetch(url, { method: "HEAD" }); if (!rs.ok) bg.push(`${rs.status} ${url}`); } catch { bg.push("ERR " + url); } }
    }
    return { total: document.images.length, broken, hidden, bg };
  });
  out.push({ r: "/" + r, ...res, failed: [...new Set(failed)] });
  await p.close();
}
await b.close();
let bad = 0;
for (const o of out) {
  const issues = o.broken.length + o.hidden.length + o.bg.length + o.failed.length;
  bad += issues;
  console.log(`${issues ? "✗" : "✓"} ${o.r}  (${o.total} imgs)`);
  for (const k of ["broken", "hidden", "bg", "failed"]) for (const x of [...new Set(o[k])]) console.log(`    ${k}: ${x}`);
}
console.log(bad ? `\n${bad} issues` : "\nno image issues");

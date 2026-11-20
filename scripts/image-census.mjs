// Lists every rendered image per route so two builds can be compared.
// usage: node scripts/image-census.mjs <baseUrl> <outfile.json> route1 route2 ...
import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, outFile, ...routes] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const res = {};
for (const r of routes) {
  const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(`${base}/${r}`, { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(1500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 350) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(100); }
  await p.waitForTimeout(1200);
  res[r || "/"] = await p.evaluate(() => {
    const items = [];
    for (const i of document.images) {
      const rc = i.getBoundingClientRect();
      const file = decodeURIComponent((i.currentSrc || i.src).split("/").pop().split("?")[0]).replace(/-[A-Za-z0-9_]{8}(\.\w+)$/, "$1");
      items.push({ file, alt: i.alt, w: Math.round(rc.width), h: Math.round(rc.height), ok: i.naturalWidth > 0 });
    }
    const bgs = [...document.querySelectorAll("*")].map((e) => getComputedStyle(e).backgroundImage).filter((v) => v.includes("url(")).map((v) => v.slice(0, 90));
    return { items, bgs: [...new Set(bgs)] };
  });
  await p.close();
}
fs.writeFileSync(outFile, JSON.stringify(res, null, 1));
await b.close();
console.log("done", outFile);

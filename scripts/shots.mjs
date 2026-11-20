// usage: node scripts/shots.mjs <phase> route1 route2 ...   (dev server on :8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const [phase, ...routes] = process.argv.slice(2);
const out = `Claude outputs/screens/${phase}`;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
for (const r of routes) {
  const name = r.replace(/^\//, "").replace(/[/#]/g, "-") || "home";
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    await page.goto("http://localhost:8080/" + r.replace(/^\/+/, ""), { waitUntil: "load", timeout: 30000 });
    await page.waitForTimeout(1200);
    // scroll through so whileInView reveals fire
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 500) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (overflow > 0) console.log(`!! horizontal overflow ${overflow}px at ${r} @${w}`);
    await page.screenshot({ path: `${out}/${name}-${w}.png`, fullPage: true });
    await page.close();
  }
}
await browser.close();

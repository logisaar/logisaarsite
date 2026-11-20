// Measures page transfer on a production preview (npm run build && npx vite preview --port 4173)
import { chromium } from "playwright-core";
import zlib from "node:zlib";
const url = process.argv[2] ?? "http://localhost:4173/";
const browser = await chromium.launch({ channel: "chrome" });
for (const [label, vp] of [["desktop 1440", { width: 1440, height: 900 }], ["mobile 390", { width: 390, height: 844 }]]) {
  const page = await browser.newPage({ viewport: vp });
  let total = 0; const big = [];
  page.on("response", async (r) => {
    try {
      const body = await r.body();
      const t = r.url().match(/\.(js|css|html|svg|json)(\?|$)/) ? zlib.gzipSync(body).length : body.length; // approx what a CDN sends
      total += t; big.push([t, r.url().replace(/^https?:\/\/[^/]+/, "")]);
    } catch { /* ignore */ }
  });
  await page.goto(url, { waitUntil: "networkidle" });
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 400) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(150); }
  await page.waitForTimeout(1500);
  console.log(`${label}: ${(total / 1048576).toFixed(2)} MB (gzip-estimated text, raw binary)`);
  big.sort((a, b) => b[0] - a[0]).slice(0, 6).forEach(([s, u]) => console.log(`   ${(s / 1024).toFixed(0).padStart(6)} KB ${u.slice(0, 80)}`));
  await page.close();
}
await browser.close();

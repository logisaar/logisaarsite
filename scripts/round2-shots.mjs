// Screenshots for the round 2 review. usage: node scripts/round2-shots.mjs   (dev server on :8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const out = "Claude outputs/screens/round2"; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const VP = [[1440, 900], [768, 1024], [390, 844]];
const goto = async (p, path) => { await p.goto("http://localhost:8080/" + path, { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(1200); };
const settle = (p, ms = 3600) => p.waitForTimeout(ms);
const stop = async (p, text) => { await p.evaluate((t) => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi.startsWith(t)).scrollIntoView({ block: "center" }), text); await settle(p, 3400); };
for (const [w, h] of VP) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500, isMobile: w < 500 });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await goto(p, ""); await settle(p, 7000);
  await p.screenshot({ path: `${out}/home-top-${w}.png` });
  await stop(p, "Four ways"); await p.screenshot({ path: `${out}/home-middle-${w}.png` });          // Logi stop 2
  await stop(p, "IKURO is made"); await p.screenshot({ path: `${out}/home-logi-ikuro-${w}.png` });  // Logi stop 3
  await p.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await settle(p, 3400);
  await p.screenshot({ path: `${out}/home-bottom-${w}.png` });
  await goto(p, "careers"); await settle(p, 6000); await p.screenshot({ path: `${out}/careers-${w}.png` });
  await goto(p, "ikuro"); await settle(p, 6000); await p.screenshot({ path: `${out}/ikuro-${w}.png` });
  await ctx.close();
}
await b.close();
console.log("done");

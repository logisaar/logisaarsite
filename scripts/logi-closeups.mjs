// Idle, blink and sleeping close-ups (3x zoom) plus Logi on a dark section. usage: node scripts/logi-closeups.mjs
import { chromium } from "playwright-core";
const out = "Claude outputs/screens/round3";
const b = await chromium.launch({ channel: "chrome" });
for (const [w, h, tag, touch] of [[1440, 900, "1440", false], [390, 844, "390", true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch, deviceScaleFactor: touch ? 2 : 1 });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 });
  const st = () => p.evaluate(() => document.querySelector("#logi").dataset.state);
  // wait until Logi has landed at a stop and the tip bubble is gone
  await p.waitForTimeout(3000);
  await p.evaluate(() => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi.startsWith("Four ways")).scrollIntoView({ block: "center" }));
  await p.waitForTimeout(2500);
  for (let i = 0; i < 80 && (await st()) !== "idle"; i++) await p.waitForTimeout(150);
  console.log(`[${tag}] state for idle shot:`, await st());
  await p.screenshot({ path: `${out}/idle-${tag}.png` });
  const r = await p.locator("#logi").boundingBox();
  const clip = { x: Math.max(0, r.x - 30), y: Math.max(0, r.y - 20), width: r.width + 60, height: r.height + 50 };
  await p.screenshot({ path: `${out}/idle-closeup-${tag}.png`, clip });
  await p.evaluate(() => document.querySelector("#logi").classList.add("blink"));
  await p.screenshot({ path: `${out}/blink-closeup-${tag}.png`, clip });
  await p.evaluate(() => document.querySelector("#logi").classList.remove("blink"));
  // sleeping
  await p.evaluate(() => { const o = performance.now.bind(performance); performance.now = () => o() + 27000; });
  for (let i = 0; i < 20 && (await st()) !== "sleeping"; i++) await p.waitForTimeout(150);
  console.log(`[${tag}] sleeping:`, await st());
  await p.evaluate(() => document.activeElement && document.activeElement.blur());
  await p.screenshot({ path: `${out}/sleeping-${tag}.png` });
  const r2 = await p.locator("#logi").boundingBox();
  await p.screenshot({ path: `${out}/sleeping-closeup-${tag}.png`, clip: { x: Math.max(0, r2.x - 30), y: Math.max(0, r2.y - 30), width: r2.width + 70, height: r2.height + 60 } });
  await ctx.close();
}
// white, green and dark sections at 1440
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(3000);
for (const [t, name] of [["Scroll down", "on-green-hero"], ["Four ways", "on-white"], ["Quotes are free", "on-dark"]]) {
  await p.evaluate((t) => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi.startsWith(t)).scrollIntoView({ block: "center" }), t);
  await p.waitForTimeout(3200); await p.evaluate(() => document.activeElement && document.activeElement.blur());
  await p.screenshot({ path: `${out}/${name}-1440.png` });
}
await b.close(); console.log("done");

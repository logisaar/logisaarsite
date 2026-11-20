// Exercises every Logi state and saves close-up + page screenshots. usage: node scripts/logi-states-test.mjs   (dev server on :8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const out = "Claude outputs/screens/round3"; fs.mkdirSync(out, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const errs = [];
const st = (p) => p.evaluate(() => document.querySelector("#logi").dataset.state);
const box = (p) => p.locator("#logi").boundingBox().then((r) => r && [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]);
const stop = async (p, t) => { await p.evaluate((t) => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi.startsWith(t)).scrollIntoView({ block: "center" }), t); };
const clip = async (p, name, pad = 40) => { const r = await p.locator("#logi").boundingBox(); await p.screenshot({ path: `${out}/${name}.png`, clip: { x: Math.max(0, r.x - pad - 120), y: Math.max(0, r.y - pad - 50), width: r.width + pad * 2 + 240, height: r.height + pad * 2 + 70 } }); };

for (const [w, h, tag, touch] of [[1440, 900, "1440", false], [390, 844, "390", true]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch });
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errs.push(e.message)); p.on("console", (m) => { if (m.type() === "error" && !/ERR_CONNECTION_REFUSED|Failed to load resource/.test(m.text())) errs.push(m.text().slice(0, 160)); });
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 });
  const seen = new Set();
  const watch = setInterval(async () => { try { seen.add(await st(p)); } catch { /* page busy */ } }, 80);
  console.log(`[${tag}] size`, (await box(p)).slice(2), "(expect", w < 640 ? 80 : 104, ")");
  await p.waitForTimeout(3400);                       // entrance + greeting: talking
  console.log(`[${tag}] after greeting`, await st(p)); await p.screenshot({ path: `${out}/talking-${tag}.png` });
  await p.waitForTimeout(4600);                       // bubble gone: idle
  console.log(`[${tag}] idle`, await st(p)); await p.screenshot({ path: `${out}/idle-${tag}.png` });
  await clip(p, `idle-closeup-${tag}`);
  // blink close-up
  for (let i = 0; i < 80; i++) { if (await p.evaluate(() => document.querySelector("#logi").classList.contains("blink"))) { await clip(p, `blink-closeup-${tag}`); break; } await p.waitForTimeout(100); }
  // walking
  await stop(p, "Four ways"); await p.waitForTimeout(700);
  for (let i = 0; i < 10 && (await st(p)) !== "walking"; i++) await p.waitForTimeout(150);
  console.log(`[${tag}] walking`, await st(p)); await p.screenshot({ path: `${out}/walking-${tag}.png` });
  await p.waitForTimeout(2500); console.log(`[${tag}] landed`, await st(p), await box(p));
  // chat: happy then thinking
  await p.locator(".logi-body").click(); await p.waitForTimeout(120); console.log(`[${tag}] on open`, await st(p));
  await p.waitForTimeout(1800); await p.locator(".logi-quick button").first().click(); await p.waitForTimeout(150);
  const s1 = await st(p); await p.waitForTimeout(250); const s2 = await st(p); console.log(`[${tag}] after quick reply`, s1, "->", s2);
  await p.screenshot({ path: `${out}/chat-thinking-${tag}.png` }); await p.waitForTimeout(1500);
  await p.screenshot({ path: `${out}/chat-open-${tag}.png` });
  await p.keyboard.press("Escape"); await p.waitForTimeout(3000);
  // drag (mouse only)
  if (!touch) {
    const r = await p.locator(".logi-body").boundingBox();
    await p.mouse.move(r.x + 50, r.y + 50); await p.mouse.down(); await p.mouse.move(r.x - 150, r.y + 120, { steps: 10 }); await p.waitForTimeout(150);
    console.log(`[${tag}] dragging`, await st(p)); await p.screenshot({ path: `${out}/dragging-${tag}.png` }); await clip(p, `dragging-closeup-${tag}`);
    await p.mouse.up(); await p.waitForTimeout(400);
  }
  // sleeping: fast-forward by patching the clock
  await p.evaluate(() => { const orig = performance.now.bind(performance); const off = 27000; performance.now = () => orig() + off; });
  await p.waitForTimeout(900);
  console.log(`[${tag}] sleeping`, await st(p)); await p.screenshot({ path: `${out}/sleeping-${tag}.png` }); await clip(p, `sleeping-closeup-${tag}`);
  clearInterval(watch); console.log(`[${tag}] states seen:`, [...seen].join(", "));
  // white / green / dark sections
  await ctx.close();
}
await b.close();
console.log("errors:", errs.length ? errs : "none");

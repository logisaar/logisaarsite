// Round 12 QA, Logi: drag to corners and middle (mouse + touch long-press), persistence, double-click home,
// keyboard moves, chat next to Logi, reduced motion.
//   usage: node scripts/round12-logi-qa.mjs [outDir]   env BASE (default http://localhost:4173)
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:4173";
const OUT = process.argv[2] || "claude-code-tasks/round-12-heylane-steps-logi-drag/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const fails = [];
const check = (c, m) => { console.log(c ? "ok  " : "FAIL", m); if (!c) fails.push(m); };

const logiRect = (page) => page.evaluate(() => { const r = document.querySelector("#logi").getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom, w: innerWidth, h: innerHeight }; });
const hdrH = (page) => page.evaluate(() => { const d = document.createElement("div"); d.style.cssText = "position:absolute;height:var(--header-h)"; document.body.appendChild(d); const h = d.getBoundingClientRect().height; d.remove(); return h; });
const inView = (r, hh) => r.l >= 0 && r.r <= r.w && r.t >= hh - 1 && r.b <= r.h;
const ready = async (page, path = "/") => { await page.goto(BASE + path, { waitUntil: "load" }); await page.waitForTimeout(2200); };
const center = (r) => [(r.l + r.r) / 2, (r.t + r.b) / 2];

for (const reduce of [false, true]) {
  const page = await b.newPage({ viewport: { width: 1280, height: 720 }, reducedMotion: reduce ? "reduce" : "no-preference" });
  await ready(page);
  const tag = `1280${reduce ? " reduced-motion" : ""}`;
  const hh = await hdrH(page);
  const btn = page.locator("#logi .logi-body");
  const dock = await logiRect(page);
  const targets = { topleft: [5, 5], topright: [1275, 5], bottomleft: [5, 715], bottomright: [1275, 715], middle: [640, 360] };
  for (const [name, [x, y]] of Object.entries(targets)) {
    const [cx, cy] = center(await logiRect(page));
    await page.mouse.move(cx, cy);
    await page.mouse.down(); await page.mouse.move(x, y, { steps: 8 }); await page.mouse.up();
    await page.waitForTimeout(150);
    const r = await logiRect(page);
    check(inView(r, hh), `${tag}: drop at ${name} is clamped on screen (${Math.round(r.l)},${Math.round(r.t)})`);
    const open = await page.evaluate(() => document.querySelector("#logi").classList.contains("open"));
    check(!open, `${tag}: dragging to ${name} does not open the chat`);
  }
  if (reduce) {
    const tilt = await page.evaluate(() => document.querySelector("#logi").style.getPropertyValue("--tilt"));
    check(!tilt, `${tag}: no tilt`);
  }
  const [mx, my] = center(await logiRect(page));
  await page.mouse.move(mx, my); await page.mouse.down(); await page.mouse.move(640, 360, { steps: 6 }); await page.mouse.up();
  const before = await logiRect(page);
  await page.reload({ waitUntil: "load" }); await page.waitForTimeout(1500);
  const after = await logiRect(page);
  check(Math.abs(before.l - after.l) < 2 && Math.abs(before.t - after.t) < 2, `${tag}: position persists across reload`);
  await page.getByRole("link", { name: "About" }).first().click(); await page.waitForTimeout(1200);
  const onAbout = await logiRect(page);
  check(Math.abs(before.l - onAbout.l) < 2 && Math.abs(before.t - onAbout.t) < 2, `${tag}: position persists across pages`);
  await btn.click(); await page.waitForTimeout(700);
  const chat = await page.evaluate(() => { const r = document.querySelector("#logi-chat").getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; });
  check(chat.l >= 0 && chat.r <= 1280 && chat.t >= 0 && chat.b <= 720, `${tag}: chat panel is inside the viewport`);
  check(chat.r <= onAbout.l || chat.l >= onAbout.r || chat.b <= onAbout.t || chat.t >= onAbout.b, `${tag}: chat panel does not cover Logi`);
  if (!reduce) await page.screenshot({ path: `${OUT}/logi-chat-middle-1280.png` });
  await page.getByRole("button", { name: "Send Logi home" }).click(); await page.waitForTimeout(1000);
  const home = await logiRect(page);
  check(Math.abs(home.r - dock.r) < 3 && Math.abs(home.b - dock.b) < 3, `${tag}: Send Logi home returns to the dock`);
  await page.keyboard.press("Escape"); await page.waitForTimeout(500);
  const [dx, dy] = center(await logiRect(page));
  await page.mouse.move(dx, dy); await page.mouse.down(); await page.mouse.move(300, 300, { steps: 6 }); await page.mouse.up();
  await page.mouse.dblclick(300, 300);
  await page.waitForTimeout(1000);
  const dbl = await logiRect(page);
  check(Math.abs(dbl.r - dock.r) < 3 && Math.abs(dbl.b - dock.b) < 3, `${tag}: double-click returns to the dock`);
  await page.evaluate(() => document.querySelector("#logi").classList.contains("open") && document.querySelector(".logi-x").click());
  await btn.focus();
  const k0 = await logiRect(page);
  await page.keyboard.press("ArrowLeft"); await page.waitForTimeout(100);
  const k1 = await logiRect(page);
  check(Math.abs((k0.l - k1.l) - 24) < 1.5, `${tag}: ArrowLeft moves 1.5rem (${(k0.l - k1.l).toFixed(1)}px)`);
  await page.keyboard.press("Shift+ArrowUp"); await page.waitForTimeout(100);
  const k2 = await logiRect(page);
  check(Math.abs((k1.t - k2.t) - 64) < 1.5, `${tag}: Shift+ArrowUp moves 4rem (${(k1.t - k2.t).toFixed(1)}px)`);
  const note = await page.evaluate(() => document.querySelector('#logi [role="status"]')?.textContent);
  check(note === "Logi moved", `${tag}: aria-live announces "Logi moved"`);
  await page.keyboard.press("Home"); await page.waitForTimeout(1000);
  const k3 = await logiRect(page);
  check(Math.abs(k3.r - dock.r) < 3 && Math.abs(k3.b - dock.b) < 3, `${tag}: Home key sends Logi home`);
  await page.close();
}

// phone: a quick swipe on Logi must not move it; a 250ms+ long-press then drag does
{
  const ctx = await b.newContext({ viewport: { width: 375, height: 760 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await ready(page);
  const cdp = await ctx.newCDPSession(page);
  const touch = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
  const hh = await hdrH(page);
  const c = await logiRect(page);
  const [cx, cy] = center(c);
  await touch("touchStart", cx, cy); await page.waitForTimeout(60); await touch("touchMove", cx - 80, cy - 80); await touch("touchEnd");
  await page.waitForTimeout(200);
  const q = await logiRect(page);
  check(Math.abs(q.l - c.l) < 1, "375 touch: a quick swipe on Logi does not move it");
  await touch("touchStart", cx, cy); await page.waitForTimeout(400);
  const dragState = await page.evaluate(() => document.querySelector("#logi").dataset.state);
  check(dragState === "dragging", `375 touch: long-press shows the dragging pose (${dragState})`);
  for (let i = 1; i <= 8; i++) { await touch("touchMove", cx + (187 - cx) * i / 8, cy + (380 - cy) * i / 8); await page.waitForTimeout(16); }
  await touch("touchEnd"); await page.waitForTimeout(300);
  const m = await logiRect(page);
  const [mcx, mcy] = center(m);
  check(inView(m, hh) && Math.abs(mcx - 187) < 14 && Math.abs(mcy - 380) < 14, `375 touch: dropped in the middle (${Math.round(mcx)},${Math.round(mcy)})`);
  for (const [name, x, y] of [["topleft", 2, 2], ["topright", 373, 2], ["bottomleft", 2, 758], ["bottomright", 373, 758]]) {
    const [sx, sy] = center(await logiRect(page));
    await touch("touchStart", sx, sy); await page.waitForTimeout(400);
    for (let i = 1; i <= 6; i++) { await touch("touchMove", sx + (x - sx) * i / 6, sy + (y - sy) * i / 6); await page.waitForTimeout(16); }
    await touch("touchEnd"); await page.waitForTimeout(200);
    check(inView(await logiRect(page), hh), `375 touch: ${name} drop is clamped on screen`);
  }
  await page.screenshot({ path: `${OUT}/logi-touch-375.png` });
  check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "375: no horizontal overflow with Logi moved");
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/round12-logi-qa-report.txt`, fails.length ? fails.map((f) => "FAIL " + f).join("\n") : "all checks passed");
process.exit(fails.length ? 1 : 0);

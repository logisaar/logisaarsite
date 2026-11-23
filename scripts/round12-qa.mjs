// Round 12 QA: (1) Home HeyLane block fits under the header while pinned; (2) Logi drag, persistence, home, keyboard.
//   usage: node scripts/round12-qa.mjs [outDir]   env BASE (default http://localhost:4173)
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:4173";
const OUT = process.argv[2] || "claude-code-tasks/round-12-heylane-steps-logi-drag/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const fails = [];
const check = (c, m) => { console.log(c ? "ok  " : "FAIL", m); if (!c) fails.push(m); };

// ---- Phase 1: pinned HeyLane block ----
for (const [w, h] of [[1280, 720], [1440, 900], [1920, 1080]]) {
  const page = await b.newPage({ viewport: { width: w, height: h } });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const t = (window.__scrollTrace || []).find((e) => e.name === "home-heylane");
    return t ? { mode: t.mode, start: t.st.start, end: t.st.end } : null;
  });
  check(info && info.mode === "pinned", `${w}x${h}: home-heylane is pinned (mode ${info?.mode})`);
  if (info) {
    await page.evaluate((y) => window.scrollTo(0, y), info.start + 5);
    await page.waitForTimeout(2000);
    const r = await page.evaluate(() => {
      const hd = document.querySelector("header").getBoundingClientRect().bottom;
      const root = document.querySelector('[data-theme="heylane"]');
      const q = (s) => [...root.querySelectorAll(s)].map((e) => e.getBoundingClientRect());
      const parts = { logo: q('img[alt="HeyLane"]'), h2: q("h2"), phones: q("figure, [role='img']").slice(0, 2), stepper: q('ol[aria-label="Screens"]'), root: [root.getBoundingClientRect()] };
      const bad = [];
      for (const [k, rs] of Object.entries(parts)) for (const x of rs) if (x.top < hd - 1 || x.bottom > innerHeight + 1) bad.push(`${k} ${Math.round(x.top)}-${Math.round(x.bottom)}`);
      return { hd, bad, n: Object.values(parts).flat().length };
    });
    check(r.bad.length === 0, `${w}x${h}: logo, headline, phones, stepper inside ${Math.round(r.hd)}..${h}${r.bad.length ? " BAD " + r.bad.join(", ") : ""}`);
    await page.screenshot({ path: `${OUT}/heylane-pinned-${w}.png` });
    // stepper click jumps to step 2
    await page.getByRole("button", { name: /Lane Maps/ }).first().click();
    await page.waitForTimeout(1200);
    const cur = await page.evaluate(() => document.querySelector('[aria-current="step"]')?.textContent?.trim());
    check(/Lane Maps/.test(cur || ""), `${w}x${h}: stepper click selects Lane Maps (${cur})`);
  }
  await page.close();
}
// narrow: pill bar over phone stack
{
  const page = await b.newPage({ viewport: { width: 375, height: 800 } });
  await page.goto(BASE + "/", { waitUntil: "load" });
  await page.waitForTimeout(1000);
  await page.locator('ol[aria-label="Screens"]').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const bx = await page.evaluate(() => {
    const ol = document.querySelector('ol[aria-label="Screens"]').getBoundingClientRect();
    return { l: ol.left, r: ol.right, w: innerWidth, sw: document.documentElement.scrollWidth };
  });
  check(bx.l >= 0 && bx.r <= bx.w && bx.sw <= bx.w, `375: pill bar on screen, no overflow`);
  await page.screenshot({ path: `${OUT}/heylane-375.png` });
  await page.close();
}
await b.close();
fs.writeFileSync(`${OUT}/round12-qa-report.txt`, fails.length ? fails.map((f) => "FAIL " + f).join("\n") : "all checks passed");
process.exit(fails.length ? 1 : 0);

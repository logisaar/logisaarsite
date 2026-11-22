// Round 9 footer QA: IST clock, reduced motion, keyboard reach, accordions, overflow at 320, screenshots.
//   usage: node scripts/round9-footer-qa.mjs [outDir]   env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = process.argv[2] || "claude-code-tasks/round-9-scroll-footer/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const fails = [];
const fail = (m) => { fails.push(m); console.log("FAIL", m); };
const ok = (m) => console.log("ok  ", m);
const toEnd = async (page) => { await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await page.waitForTimeout(2200); };

// 1. clock matches IST (visitor in New York, so both clocks show)
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, timezoneId: "America/New_York" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const txt = await page.locator("[data-ft-now]").innerText();
  const ist = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).replace(/\s?(AM|PM)$/i, (m) => ` ${m.trim().toLowerCase()}`);
  const ny = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "America/New_York" }).replace(/\s?(AM|PM)$/i, (m) => ` ${m.trim().toLowerCase()}`);
  if (txt.includes(ist) && txt.includes(ny) && /where you are/.test(txt)) ok(`clock: "${txt.replace(/\s+/g, " ")}"`); else fail(`clock text "${txt}" (expected ${ist} / ${ny})`);
  if (/working now|next working day/.test(txt)) fail("status shown although office hours are not confirmed"); else ok("no status while OFFICE_HOURS is null");
  await page.screenshot({ path: `${OUT}/footer-1280.png` });
  // keyboard reaches every link and the back-to-top button
  const total = await page.evaluate(() => document.querySelectorAll("footer a[href], footer button").length);
  await page.evaluate(() => document.querySelector("footer a[href]").focus());
  const seen = new Set();
  for (let i = 0; i < total + 2; i++) {
    const id = await page.evaluate(() => { const a = document.activeElement; return a?.closest("footer") ? (a.getAttribute("aria-label") || a.textContent).trim() + "|" + a.getAttribute("href") : null; });
    if (id) seen.add(id);
    await page.keyboard.press("Tab");
  }
  if (seen.size >= total - 1 && [...seen].some((s) => s.startsWith("Back to top"))) ok(`keyboard reached ${seen.size}/${total} footer controls incl. back to top`); else fail(`keyboard reached ${seen.size}/${total}`);
  await page.click("button[aria-label='Back to top']");
  await page.waitForTimeout(1800);
  const y = await page.evaluate(() => window.scrollY);
  if (y < 50) ok("back to top scrolls to 0"); else fail(`back to top left scrollY ${y}`);
  await ctx.close();
}

// 2. reduced motion: wordmark filled, traces static, no loop
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const r = await page.evaluate(() => {
    const f = [...document.querySelectorAll(".ft-letter__fill")].map((e) => getComputedStyle(e).clipPath);
    const t = document.querySelector("[data-ft-traces] path");
    return { fills: f, dash: t ? getComputedStyle(t).strokeDasharray : null };
  });
  if (r.fills.length === 8 && r.fills.every((c) => c === "none")) ok("reduced motion: wordmark fully filled"); else fail(`reduced motion clip-paths ${JSON.stringify(r.fills)}`);
  if (r.dash === "none") ok("reduced motion: traces static and drawn"); else fail(`traces dasharray ${r.dash}`);
  await ctx.close();
}

// 3. normal motion: fills animate; accordions at 375; no overflow at 320
{
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const clips = await page.evaluate(() => [...document.querySelectorAll(".ft-letter__fill")].map((e) => getComputedStyle(e).clipPath));
  if (clips.every((c) => /0%|inset\(0px\)|inset\(0px 0px 0px 0px\)/.test(c) || c === "inset(0px)")) ok("wordmark fills after the footer enters"); else fail(`clip-paths after entering: ${clips[0]}`);
  await ctx.close();
}
for (const w of [320, 375]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 700 } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await toEnd(page);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  if (over <= 0) ok(`${w}: no horizontal overflow`); else fail(`${w}: overflow ${over}px`);
  if (w === 375) {
    const btn = page.locator("footer button[aria-expanded]").first();
    const before = await btn.getAttribute("aria-expanded");
    await btn.focus();
    await page.keyboard.press("Enter");
    const afterEnter = await btn.getAttribute("aria-expanded");
    await page.keyboard.press("Space");
    const afterSpace = await btn.getAttribute("aria-expanded");
    if (before === "false" && afterEnter === "true" && afterSpace === "false") ok("accordion opens with Enter and closes with Space"); else fail(`accordion states ${before}/${afterEnter}/${afterSpace}`);
    const open = await page.locator("footer :text('Registered office')").first().isVisible();
    if (open) ok("contact block always open"); else fail("contact block hidden on phone");
    await page.screenshot({ path: `${OUT}/footer-375.png` });
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/round9-footer-result.json`, JSON.stringify({ fails }, null, 1));
console.log(fails.length ? `\n${fails.length} FAILURES` : "\nALL OK");
process.exit(fails.length ? 1 : 0);

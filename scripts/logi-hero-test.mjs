// Round 4 Logi checks: docked in the hero, never over h1 / hero paragraph / CTAs, right tip after scrolling back, mobile docks.
//   usage: node scripts/logi-hero-test.mjs    env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
const BASE = process.env.BASE || "http://localhost:8080";
const b = await chromium.launch({ channel: "chrome" });
let fails = 0;
const ok = (c, msg) => { console.log(`  ${c ? "ok  " : "FAIL"} ${msg}`); if (!c) fails++; };
const box = (p) => p.locator("#logi").boundingBox();
const bubble = (p) => p.evaluate(() => (document.querySelector("#logi").classList.contains("talk") ? document.querySelector(".logi-bubble").textContent : ""));
const hits = (p) => p.evaluate(() => {
  const l = document.querySelector("#logi").getBoundingClientRect(); const out = [];
  const hero = document.querySelector("[data-logi-dock]");
  const els = [...hero.querySelectorAll("h1, [data-logi-avoid], a[href], button")].filter((e) => !e.closest("#logi, [data-agentation-root]"));
  for (const e of els) {
    let r = e.getBoundingClientRect();
    if (e.tagName === "H1" || e.tagName === "P") { const g = document.createRange(); g.selectNodeContents(e); r = g.getBoundingClientRect(); }
    if (r.width && r.right > l.left + 4 && r.left < l.right - 4 && r.bottom > l.top + 4 && r.top < l.bottom - 4) out.push(e.tagName + ":" + e.textContent.trim().slice(0, 24));
  }
  return out;
});
const ALL = [[320, 640], [375, 812], [414, 896], [768, 1024], [1024, 768], [1280, 800], [1440, 900], [1920, 1080]];
const only = (process.env.WIDTHS || "").split(",").filter(Boolean).map(Number);
for (const [w, h] of ALL.filter(([w]) => !only.length || only.includes(w))) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: w < 500, isMobile: w < 500 });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(BASE + "/", { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(3600);
  console.log(`\n${w}x${h}`);
  const hero = await hits(p);
  ok(hero.length === 0, `hero: Logi clear of h1, hero text and CTAs ${hero.length ? JSON.stringify(hero) : ""}`);
  const a = await box(p);
  ok(a.x > w * 0.5 && a.y > h * 0.5, `hero: docked bottom-right (${Math.round(a.x)}, ${Math.round(a.y)})`);
  // scroll to a later section, wait, then back to the top
  await p.evaluate(() => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi.startsWith("25+")).scrollIntoView({ block: "center" }));
  await p.waitForTimeout(3400);
  const tip = await bubble(p);
  ok(tip.startsWith("25+"), `section 25+: tip is "${tip}"`);
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(3400);
  const back = await bubble(p);
  ok(!/clients|Real words|25\+/.test(back), `back at hero: no stale tip ("${back}")`);
  ok((await hits(p)).length === 0, "back at hero: still clear of hero text and CTAs");
  // every stop: never over the section's h1/h2 text, CTAs or form fields
  const stops = await p.evaluate(() => [...document.querySelectorAll("[data-logi]")].map((e) => e.dataset.logi));
  let bad = 0;
  for (const s of stops) {
    await p.evaluate((s) => [...document.querySelectorAll("[data-logi]")].find((e) => e.dataset.logi === s).scrollIntoView({ block: "center" }), s);
    await p.waitForTimeout(3300);
    const o = await p.evaluate(() => {
      const l = document.querySelector("#logi").getBoundingClientRect(); const out = [];
      const narrow = innerWidth < 768; // single column: only h1, buttons, links and fields are no-go zones (brief); headings too from 768 up
      for (const e of document.querySelectorAll(narrow ? "h1, a[href], button, input, textarea, select" : "h1, h2, a[href], button, input, textarea, select")) {
        if (e.closest("#logi, .logi-chat, nav, header, aside, [data-agentation-root], [data-feedback-toolbar]")) continue;
        let r = e.getBoundingClientRect(); if (/^H[12]$/.test(e.tagName)) { const g = document.createRange(); g.selectNodeContents(e); r = g.getBoundingClientRect(); }
        if (r.width * r.height > 60000 && !/^H/.test(e.tagName)) continue; // whole-card links
        if (r.width && r.bottom > 0 && r.top < innerHeight && r.right > l.left + 6 && r.left < l.right - 6 && r.bottom > l.top + 6 && r.top < l.bottom - 6) out.push(e.tagName + ":" + e.textContent.trim().slice(0, 20));
      }
      return out;
    });
    if (o.length) { bad++; console.log(`      overlap at "${s.slice(0, 28)}": ${JSON.stringify(o)}`); }
  }
  ok(bad === 0, `all ${stops.length} stops clear of headings, buttons and links`);
  await ctx.close();
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : "\nall ok");
process.exit(fails ? 1 : 0);

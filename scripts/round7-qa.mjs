// Round 7 QA: /solutions, /about, /contact, /careers and one solution page.
//   usage: node scripts/round7-qa.mjs     env BASE (default http://localhost:4173, a `vite preview` of the build)
// Checks: h1 line count (<= 3 at 1280, <= 4 at 375), h2 smaller than h1, no overflow at 320..1920 and at 200% root font,
// no text under 12px, targets >= 44px, header never covers the h1, Solutions specifics (hero fit, jump bar, cards,
// chips, demos, scroll-spy, phone floating stack, reduced motion, keyboard).
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:4173";
const OUT = "claude-code-tasks/round-7-solutions-visual/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
let fails = 0;
const ok = (name, pass, info = "") => { if (!pass) fails++; console.log(pass ? "PASS" : "FAIL", name, info); };

const PAGES = ["/solutions", "/about", "/contact", "/careers", "/solutions/ai-receptionist"];
const WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440, 1920];

const newPage = async (w, opts = {}) => {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, ...opts });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  return p;
};
const settle = async (p, url) => {
  await p.goto(`${BASE}${url}`, { waitUntil: "load", timeout: 90000 });
  await p.waitForTimeout(1500);
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(500);
};

const measure = (p) => p.evaluate(() => {
  const vis = (e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width > 0 && r.height > 0 && cs.visibility !== "hidden" && cs.display !== "none" && !e.closest(".sr-only"); };
  const smallText = [];
  const walker = document.createTreeWalker(document.querySelector("main") || document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode; const t = n.textContent.trim(); if (!t) continue;
    const e = n.parentElement; if (!e || !vis(e) || e.closest("svg,script,style")) continue;
    const fs = parseFloat(getComputedStyle(e).fontSize);
    if (fs < 11.95) smallText.push(`${fs.toFixed(1)}px "${t.slice(0, 24)}"`);
  }
  const smallTargets = [...document.querySelectorAll("main a, main button, main [role=button]")].filter((e) => {
    if (!vis(e)) return false;
    if (e.tagName === "A" && e.closest("p, li") && getComputedStyle(e).display === "inline") return false;
    const r = e.getBoundingClientRect();
    return r.height < 43.5 || r.width < 43.5;
  }).map((e) => `${e.tagName}:${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
  const h1 = document.querySelector("h1");
  const header = document.querySelector("header");
  let covered = false;
  if (h1 && header) { const a = h1.getBoundingClientRect(), c = header.getBoundingClientRect(); covered = c.bottom > a.top + 1 && c.top < a.bottom; }
  const h1cs = h1 ? getComputedStyle(h1) : null;
  const lh = h1cs ? parseFloat(h1cs.lineHeight) || parseFloat(h1cs.fontSize) * 1.1 : 1;
  const h1lines = h1 ? Math.round(h1.getBoundingClientRect().height / lh) : 0;
  const h1px = h1cs ? parseFloat(h1cs.fontSize) : 0;
  const h2px = Math.max(0, ...[...document.querySelectorAll("main h2")].filter((e) => !e.classList.contains("sr-only")).map((e) => parseFloat(getComputedStyle(e).fontSize)));
  return { h1lines, h1px, h2px, height: document.documentElement.scrollHeight, overflow: document.documentElement.scrollWidth - innerWidth, smallText: [...new Set(smallText)].slice(0, 6), smallTargets: [...new Set(smallTargets)].slice(0, 8), covered };
});

for (const url of PAGES) {
  for (const w of WIDTHS) {
    const p = await newPage(w);
    await settle(p, url);
    const m = await measure(p);
    ok(`${url} @${w} no overflow`, m.overflow <= 0, String(m.overflow));
    ok(`${url} @${w} header not over h1`, !m.covered);
    if (w === 375 || w === 1280) {
      const max = w === 1280 ? 3 : 4;
      ok(`${url} @${w} h1 <= ${max} lines`, m.h1lines <= max, String(m.h1lines));
      ok(`${url} @${w} h2 smaller than h1`, m.h2px < m.h1px, `${m.h2px} vs ${m.h1px}`);
      if (w === 1280 && url !== "/solutions/ai-receptionist") ok(`${url} @1280 h1 at least 1.3x the largest h2`, m.h1px / m.h2px >= 1.3, (m.h1px / m.h2px).toFixed(2));
      if (url === "/solutions" && w === 375) ok("/solutions @375 page height <= 9000", m.height <= 9000, String(m.height));
      ok(`${url} @${w} no text under 12px`, m.smallText.length === 0, m.smallText.join(" | "));
      ok(`${url} @${w} targets >= 44px`, m.smallTargets.length === 0, m.smallTargets.join(" | "));
      const slug = url.replace(/\//g, "-").slice(1);
      await p.screenshot({ path: `${OUT}/after-${slug}-${w}.png`, fullPage: true });
    }
    await p.context().close();
  }
  const p = await newPage(1280);
  await p.addInitScript(() => { const s = document.createElement("style"); s.textContent = "html{font-size:200% !important}"; document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s)); });
  await settle(p, url);
  const m = await measure(p);
  ok(`${url} @200% font no overflow`, m.overflow <= 0, String(m.overflow));
  await p.context().close();
}

// Solutions specifics
{
  const p = await newPage(1280);
  await settle(p, "/solutions");
  const hero = await p.evaluate(() => { const n = document.querySelector("nav[aria-label='Our four services']"); return n ? Math.round(n.getBoundingClientRect().bottom + scrollY) : 9999; });
  ok("hero and jump bar fit in 800px at 1280", hero <= 800, String(hero));
  ok("four jump-bar links", (await p.locator("nav[aria-label='Our four services'] a").count()) === 4);
  const cards = await p.locator("#ready-made article").count();
  ok("9 solution cards", cards === 9, String(cards));
  const bigGreen = await p.locator("#ready-made article a, #ready-made article button").evaluateAll((els) => els.filter((e) => e.getBoundingClientRect().width > 120 && getComputedStyle(e).backgroundColor === "rgb(0, 209, 98)").length);
  ok("no big green buttons in the grid", bigGreen === 0, String(bigGreen));
  const perCard = await p.locator("#ready-made article").evaluateAll((els) => els.map((a) => a.querySelectorAll("a").length));
  ok("each card has one detail link and one WhatsApp link", perCard.every((n) => n === 2), perCard.join(","));
  const heights = await p.locator("#ready-made article").evaluateAll((els) => [...new Set(els.map((e) => Math.round(e.getBoundingClientRect().height)))]);
  ok("card heights equal", heights.length === 1, heights.join(","));
  const chipRows = await p.locator("#ready-made [role=group] button").evaluateAll((els) => new Set(els.map((e) => Math.round(e.getBoundingClientRect().top))).size);
  ok("filter chips on one row at 1280", chipRows === 1, String(chipRows));
  const frames = await p.locator("#services figure").evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }));
  ok("four demo frames share one size", new Set(frames).size === 1 && frames.length === 4, frames.join(" "));
  await p.evaluate(() => document.getElementById("ai-agents").scrollIntoView());
  await p.waitForTimeout(800);
  const spy = await p.locator("#services a[aria-current=true]").innerText();
  ok("scroll-spy marks AI agent development", /AI agent development/.test(spy), spy);
  await p.context().close();
}
// Phone: WhatsApp stack hidden on the first screen, shown after scrolling
{
  const p = await newPage(375);
  await settle(p, "/solutions");
  const sel = "a[aria-label='Chat on WhatsApp']";
  const top = await p.locator(sel).first().isVisible().catch(() => false);
  await p.evaluate(() => scrollTo(0, innerHeight * 1.5));
  await p.waitForTimeout(500);
  const later = await p.locator(sel).first().isVisible().catch(() => false);
  ok("phone: WhatsApp button hidden on first screen, visible after scrolling", !top && later, `${top}/${later}`);
  await p.context().close();
}
// Reduced motion: demos static at their final state, timeline drawn
{
  const p = await newPage(1280, { reducedMotion: "reduce" });
  await settle(p, "/solutions");
  await p.evaluate(() => document.getElementById("ai-agents").scrollIntoView());
  await p.waitForTimeout(1200);
  const booked = () => p.locator("#services figure").nth(1).getByText("Booked for Friday, 4:00 pm.").evaluate((e) => getComputedStyle(e).opacity);
  ok("reduced motion: agent demo shows Booked at once", (await booked()) === "1");
  await p.waitForTimeout(3500);
  ok("reduced motion: demo does not loop", (await booked()) === "1");
  const draw = await p.evaluate(() => { const l = document.querySelector("#steps-h")?.closest("section")?.querySelector("ol span[style*='--draw']"); return l ? l.style.getPropertyValue("--draw") : "none"; });
  ok("reduced motion: timeline line fully drawn", draw === "1", String(draw));
  await p.context().close();
}
// Keyboard filter and the Monthly support link
{
  const p = await newPage(1280);
  await settle(p, "/solutions");
  await p.getByRole("button", { name: "Education", exact: true }).focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(700);
  ok("keyboard: Enter on chip filters", (await p.locator("#ready-made article").count()) === 1);
  await p.getByRole("link", { name: /See AI agent solutions/ }).click();
  await p.waitForTimeout(800);
  ok("monthly support link shows the 2 monthly-fee solutions", (await p.locator("#ready-made article").count()) === 2);
  await p.context().close();
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : "\nALL PASSED");
process.exit(fails ? 1 : 0);

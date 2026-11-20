// Round 6 QA: /about, /solutions, /portfolio, home and one solution page.
//   usage: node scripts/round6-qa.mjs     env BASE (default http://localhost:8080)
// Checks: no overflow at 320..1920 and at 200% root font, no text under 12px, targets >= 44px,
// header never covers the h1, no link to /portfolio anywhere, reduced-motion timeline list, filter works.
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = "claude-code-tasks/round-6-about-solutions-portfolio/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
let fails = 0;
const ok = (name, pass, info = "") => { if (!pass) fails++; console.log(pass ? "PASS" : "FAIL", name, info); };

const PAGES = ["/", "/about", "/solutions", "/portfolio", "/solutions/ai-receptionist"];
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
  // scroll through once so whileInView content has rendered
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
    // links inside running text are exempt from the 44px rule (WCAG 2.5.8 inline exception)
    if (e.tagName === "A" && e.closest("p, li") && getComputedStyle(e).display === "inline") return false;
    const r = e.getBoundingClientRect();
    return r.height < 43.5 || r.width < 43.5;
  }).map((e) => `${e.tagName}:${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)} ${Math.round(e.getBoundingClientRect().width)}x${Math.round(e.getBoundingClientRect().height)}`);
  const h1 = document.querySelector("h1");
  const header = document.querySelector("header");
  let covered = false;
  if (h1 && header) { const a = h1.getBoundingClientRect(), c = header.getBoundingClientRect(); covered = c.bottom > a.top + 1 && c.top < a.bottom; }
  return { overflow: document.documentElement.scrollWidth - innerWidth, smallText: [...new Set(smallText)].slice(0, 6), smallTargets: [...new Set(smallTargets)].slice(0, 8), covered };
});

for (const url of PAGES) {
  for (const w of WIDTHS) {
    const p = await newPage(w);
    await settle(p, url);
    const m = await measure(p);
    ok(`${url} @${w} no overflow`, m.overflow <= 0, String(m.overflow));
    ok(`${url} @${w} header not over h1`, !m.covered);
    if (w === 375 || w === 1280) {
      ok(`${url} @${w} no text under 12px`, m.smallText.length === 0, m.smallText.join(" | "));
      ok(`${url} @${w} targets >= 44px`, m.smallTargets.length === 0, m.smallTargets.join(" | "));
      const slug = url === "/" ? "home" : url.replace(/\//g, "-").slice(1);
      await p.screenshot({ path: `${OUT}/${slug}-${w}.png`, fullPage: true });
    }
    await p.context().close();
  }
  // 200% root font
  const p = await newPage(1280);
  await p.addInitScript(() => { const s = document.createElement("style"); s.textContent = "html{font-size:200% !important}"; document.addEventListener("DOMContentLoaded", () => document.head.appendChild(s)); });
  await settle(p, url);
  const m = await measure(p);
  ok(`${url} @200% font no overflow`, m.overflow <= 0, String(m.overflow));
  await p.context().close();
}

// Link crawl: no visible link to /portfolio from any routed page
const ROUTES = ["/", "/about", "/solutions", "/portfolio", "/ikuro", "/products", "/heylane", "/contact", "/careers", "/web-development-odisha",
  "/solutions/ai-powered-school-erp", "/solutions/hotel-management-system", "/solutions/ai-lead-followup", "/solutions/ai-receptionist", "/solutions/proposal-software",
  "/solutions/qr-menu-system", "/solutions/travel-website", "/solutions/ai-automation", "/solutions/custom-crm", "/privacy-policy", "/terms-conditions", "/cookie-policy", "/refund-policy", "/no-such-page"];
for (const w of [375, 1280]) {
  for (const r of ROUTES) {
    const p = await newPage(w);
    await p.goto(`${BASE}${r}`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
    await p.waitForTimeout(600);
    const n = await p.evaluate(() => document.querySelectorAll('a[href*="portfolio"]').length);
    if (n) ok(`${r} @${w} no portfolio link`, false, String(n));
    await p.context().close();
  }
}
ok("link crawl finished", true, `${ROUTES.length} routes x 2 widths`);

// Reduced motion: timeline is a static list; filter works
{
  const p = await newPage(1280, { reducedMotion: "reduce" });
  await settle(p, "/about");
  const items = await p.locator("#journey-h ~ ol li").count();
  ok("reduced motion: timeline is a static list with 5 milestones", items === 5, String(items));
  const text = await p.locator("main").innerText();
  ok("timeline facts: TechXera -> IKURO", /TechXera becomes IKURO/i.test(text) && /Nov 2026/i.test(text) && !/globally/i.test(text));
  await settle(p, "/solutions");
  await p.getByRole("button", { name: "Sales", exact: true }).click();
  await p.waitForTimeout(400);
  ok("reduced motion: filter shows 2 sales cards", (await p.locator("#ready-made article").count()) === 2);
  ok("chip is aria-pressed", (await p.getByRole("button", { name: "Sales", exact: true }).getAttribute("aria-pressed")) === "true");
  await p.context().close();
}
// Keyboard: Tab to a chip, press Enter
{
  const p = await newPage(1280);
  await settle(p, "/solutions");
  await p.getByRole("button", { name: "Education", exact: true }).focus();
  await p.keyboard.press("Enter");
  await p.waitForTimeout(700);
  ok("keyboard: Enter on chip filters", (await p.locator("#ready-made article").count()) === 1);
  // anchors from About
  await p.goto(`${BASE}/about`, { waitUntil: "load" });
  await p.waitForTimeout(1000);
  await p.getByRole("link", { name: /AI agent development/ }).first().click();
  await p.waitForTimeout(2500);
  const top = await p.evaluate(() => document.getElementById("ai-agents")?.getBoundingClientRect().top);
  ok("About card scrolls to #ai-agents", top !== undefined && top < 200 && top > -50, String(top));
  await p.context().close();
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : "\nALL PASSED");
process.exit(fails ? 1 : 0);

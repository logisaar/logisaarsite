// Reduced-motion run: with prefers-reduced-motion: reduce, no text may stay hidden and nothing may loop.
//   usage: node scripts/reduced-motion-qa.mjs [route ...]    env BASE (default http://localhost:8080)
// Looping = running CSS/WAAPI animations with infinite iterations, plus anything whose transform keeps changing over 1.5 s.
import { chromium } from "playwright-core";
const routes = process.argv.slice(2).length ? process.argv.slice(2) : ["", "ikuro", "heylane", "careers", "products"];
const BASE = process.env.BASE || "http://localhost:8080";
const b = await chromium.launch({ channel: "chrome" });
let bad = 0;
for (const route of routes) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(`${BASE}/${route}`, { waitUntil: "load", timeout: 90000 }).catch(() => {});
  await p.waitForTimeout(2500);
  const h = await p.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) { await p.evaluate((y) => window.scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(800);
  const res = await p.evaluate(async () => {
    const skip = (el) => el.closest("[data-agentation-root], [data-feedback-toolbar], #logi, .logi-chat, aside[aria-label='Quick actions']"); // Logi's closed chat/idle bubble and the hover tooltip are meant to be hidden
    // 1. hidden text: elements with text whose own or ancestors' opacity is ~0 (not aria-hidden decoration, not sr-only)
    const hidden = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode()); ) {
      const t = n.textContent.trim(); const el = n.parentElement;
      if (!t || !el || skip(el) || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName) || el.closest("[aria-hidden='true'], .sr-only, [hidden]")) continue;
      const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
      let op = 1; for (let e = el; e; e = e.parentElement) op *= +getComputedStyle(e).opacity;
      if (op < 0.3) hidden.push(`${(op).toFixed(2)} ${el.tagName.toLowerCase()} "${t.slice(0, 30)}"`);
    }
    // 2. looping animations
    const loops = document.getAnimations().filter((a) => a.playState === "running" && a.effect && a.effect.getComputedTiming().iterations === Infinity)
      .map((a) => (a.animationName || a.transitionProperty || "anim") + " on " + (a.effect.target?.className?.toString().slice(0, 40) || a.effect.target?.tagName));
    // 3. anything still moving (JS-driven loops): sample transforms of animated-looking nodes twice
    const nodes = [...document.querySelectorAll("[style*='transform']")].filter((e) => !skip(e) && !e.closest("#logi")).slice(0, 400);
    const snap = () => nodes.map((e) => e.style.transform);
    const a = snap(); await new Promise((r) => setTimeout(r, 1500)); const c = snap();
    const moving = nodes.filter((e, i) => a[i] !== c[i]).map((e) => `${e.tagName.toLowerCase()}.${String(e.className).slice(0, 40)}`);
    return { hidden: [...new Set(hidden)].slice(0, 8), loops: [...new Set(loops)].slice(0, 8), moving: [...new Set(moving)].slice(0, 8) };
  });
  const n = res.hidden.length + res.loops.length + res.moving.length; bad += n;
  console.log(`\n${route || "home"}: ${n ? n + " issues" : "ok"}`);
  for (const [k, v] of Object.entries(res)) if (v.length) console.log(`  ${k}:\n      ${v.join("\n      ")}`);
  await ctx.close();
}
await b.close();
console.log(bad ? `\n${bad} issues` : "\nall ok");

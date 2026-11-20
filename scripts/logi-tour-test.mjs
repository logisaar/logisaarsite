import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const errs = [];
const mk = async (opts) => { const c = await b.newContext(opts); const p = await c.newPage(); p.on("pageerror", e => errs.push(e.message)); p.on("console", m => { if (m.type()==="error" && !/ERR_CONNECTION_REFUSED|Failed to load resource/.test(m.text())) errs.push(m.text().slice(0,160)); }); await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown","1")); return p; };
const box = (p) => p.locator("#logi").boundingBox().then(r => r && [Math.round(r.x), Math.round(r.y), Math.round(r.width)]);
const bubble = (p) => p.evaluate(() => { const b = document.querySelector(".logi-bubble"); return document.querySelector("#logi").classList.contains("talk") ? b.textContent : "(none)"; });
const toSection = async (p, text) => { await p.evaluate((t) => { const el = [...document.querySelectorAll("[data-logi]")].find(e => e.dataset.logi.startsWith(t)); el.scrollIntoView({ block: "center" }); }, text); await p.waitForTimeout(3200); };
const overlapWithAvoid = (p) => p.evaluate(() => { const l = document.querySelector("#logi").getBoundingClientRect(); const hits = []; for (const e of document.querySelectorAll("button, a[href], input, textarea, select, h1, h2")) { if (e.closest("#logi, .logi-chat, nav, header")) continue; const r = e.getBoundingClientRect(); if (r.width && r.right > l.left+8 && r.left < l.right-8 && r.bottom > l.top+8 && r.top < l.bottom-8 && r.bottom > 0 && r.top < innerHeight) hits.push(e.tagName + ":" + (e.textContent||"").trim().slice(0,28)); } return hits; });

let p = await mk({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 });
console.log("t=0.8s  logi onscreen?", await box(p));
await p.waitForTimeout(2600);
console.log("t=3.4s  entrance", await box(p), "|", await bubble(p));
const cornerOK = (await box(p));
for (const t of ["Four ways", "Ready-made", "IKURO is made", "We build our own", "25+ businesses"]) {
  await toSection(p, t);
  console.log("stop:", t.padEnd(16), await box(p), "|", await bubble(p), "| overlaps:", JSON.stringify(await overlapWithAvoid(p)));
}
await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(3500);
console.log("back to top:", await box(p), "|", await bubble(p));
// drag
const bb = await p.locator(".logi-body").boundingBox();
await p.mouse.move(bb.x + 48, bb.y + 48); await p.mouse.down(); await p.mouse.move(400, 500, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(600);
console.log("after drag:", await box(p), "chat open?", await p.locator(".logi-chat.on").count());
await p.evaluate(() => window.scrollBy(0, 1400)); await p.waitForTimeout(3200);
console.log("resumes at next stop:", await box(p));
// chat + esc
await p.locator(".logi-body").click(); await p.waitForTimeout(1600);
console.log("chat open:", await p.locator(".logi-chat.on").count(), "docked:", await box(p), "focus:", await p.evaluate(() => document.activeElement?.id));
await p.keyboard.press("Escape"); await p.waitForTimeout(2800);
console.log("after esc:", await p.locator(".logi-chat.on").count(), await box(p));
// no cursor following
await p.mouse.move(100, 400); await p.waitForTimeout(1500); const a1 = await box(p); await p.mouse.move(900, 300); await p.waitForTimeout(1500);
console.log("cursor ignored:", JSON.stringify(a1) === JSON.stringify(await box(p)));
// route change
await p.evaluate(() => document.querySelector('a[href="/careers"]').click()); await p.waitForTimeout(500);
console.log("leaving:", await box(p)); await p.waitForTimeout(3500);
console.log("careers greeting:", await box(p), "|", await bubble(p), "| same Logi element count:", await p.locator("#logi").count());
await p.close();

// mobile
p = await mk({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(3600);
console.log("mobile entrance:", await box(p), "|", await bubble(p));
await toSection(p, "Ready-made");
console.log("mobile stop:", await box(p), "|", await bubble(p), "| overlaps:", JSON.stringify(await overlapWithAvoid(p)));
await p.close();

// reduced motion
p = await mk({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto("http://localhost:8080/", { waitUntil: "load", timeout: 90000 }); await p.waitForTimeout(900);
const r1 = await box(p); await p.evaluate(() => window.scrollBy(0, 1500)); await p.waitForTimeout(2500);
console.log("reduced motion: visible", r1, "static after scroll:", await box(p), "clickable:", await p.locator(".logi-body").click().then(() => p.locator(".logi-chat.on").count()));
await p.close();
console.log("errors:", errs.length ? errs : "none");
await b.close();

import { chromium } from "playwright-core";
const b = await chromium.launch({ channel: "chrome" });
const errs = [];
const mk = async (opts) => { const c = await b.newContext(opts); const p = await c.newPage(); p.on("pageerror", e => errs.push(e.message)); p.on("console", m => { if (m.type()==="error" && !/ERR_CONNECTION_REFUSED|Failed to load resource/.test(m.text())) errs.push(m.text().slice(0,150)); }); await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown","1")); return p; };
const pos = (p) => p.evaluate(() => { const r = document.querySelector("#logi").getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y)]; });

// desktop
let p = await mk({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:8080/", { waitUntil: "load" }); await p.waitForTimeout(2500);
console.log("greeting bubble:", await p.locator(".logi-bubble").innerText());
const p0 = await pos(p);
await p.mouse.move(300, 300); await p.waitForTimeout(1800);
console.log("follows cursor:", p0, "->", await pos(p));
await p.locator(".logi-body").click(); await p.waitForTimeout(1500);
console.log("chat open:", await p.locator(".logi-chat.on").count(), "focus in input:", await p.evaluate(() => document.activeElement?.id));
console.log("first msgs:", (await p.locator(".logi-m").allInnerTexts()).join(" | "));
await p.fill("#logi-in", "what does it cost?"); await p.keyboard.press("Enter"); await p.waitForTimeout(1200);
console.log("cost answer:", (await p.locator(".logi-m.bot").last().innerText()).slice(0,90));
await p.fill("#logi-in", "I want to hire"); await p.keyboard.press("Enter"); await p.waitForTimeout(1200);
console.log("careers link:", await p.locator(".logi-m.bot a").last().getAttribute("href"));
await p.fill("#logi-in", "this is a test"); await p.keyboard.press("Enter"); await p.waitForTimeout(1200);
console.log("fallback has wa link:", (await p.locator(".logi-m.bot a").last().getAttribute("href")).startsWith("https://wa.me/918596072510?text="));
await p.keyboard.press("Escape"); await p.waitForTimeout(500);
console.log("esc closes:", await p.locator(".logi-chat.on").count() === 0, "focus back on Logi:", await p.evaluate(() => document.activeElement?.className));
await p.fill?.call; 
// WhatsApp button no overlap
const wa = await p.locator('a[aria-label="Chat on WhatsApp"]').boundingBox(); const lg = await p.locator("#logi").boundingBox();
console.log("whatsapp box", wa && [Math.round(wa.x), Math.round(wa.y)], "logi box", [Math.round(lg.x), Math.round(lg.y)]);
// sleep (fast-forward not possible) skip; drag/throw
const bb = await p.locator(".logi-body").boundingBox();
await p.mouse.move(bb.x+40, bb.y+40); await p.mouse.down(); await p.mouse.move(bb.x-100, bb.y-200, {steps: 8}); await p.mouse.up(); await p.waitForTimeout(600);
console.log("after throw:", await pos(p), "chat toggled by drag?", await p.locator(".logi-chat.on").count());
await p.screenshot({ path: "Claude outputs/screens/phase-4/home-1440-viewport.png" });
await p.locator(".logi-body").click(); await p.waitForTimeout(1500); await p.screenshot({ path: "Claude outputs/screens/phase-4/chat-1440.png" });
// route change keeps Logi
await p.keyboard.press("Escape"); await p.goto("http://localhost:8080/careers#apply", { waitUntil: "load" }); await p.waitForTimeout(1500);
console.log("logi on careers:", await p.locator("#logi").count());
await p.close();

// touch phone
p = await mk({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
await p.goto("http://localhost:8080/", { waitUntil: "load" }); await p.waitForTimeout(2200);
console.log("touch parked:", await pos(p), "viewport 390x844; greeting:", await p.locator(".logi-bubble").innerText());
await p.locator(".logi-body").tap(); await p.waitForTimeout(1200);
await p.screenshot({ path: "Claude outputs/screens/phase-4/chat-390.png" });
console.log("overflow:", await p.evaluate(() => document.documentElement.scrollWidth - innerWidth));
await p.close();

// reduced motion
p = await mk({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
await p.goto("http://localhost:8080/", { waitUntil: "load" }); await p.waitForTimeout(1500);
const a = await pos(p); await p.mouse.move(300, 300); await p.waitForTimeout(1500);
console.log("reduced motion parked & static:", a, await pos(p));
await p.close();
console.log("errors:", errs.length ? errs : "none");
await b.close();

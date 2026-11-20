// Round 5 Contact form QA: keyboard flow, validation, announcements, failure + success states, screenshots.
//   usage: node scripts/contact-qa.mjs [--live]   env BASE (default http://localhost:8080)
// Without --live the endpoint is intercepted (success/failure simulated). With --live the form posts once to the real endpoint.
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const LIVE = process.argv.includes("--live");
const OUT = "claude-code-tasks/round-5-header-contact/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const res = [];
const ok = (name, pass, info = "") => { res.push({ name, pass, info }); console.log(pass ? "PASS" : "FAIL", name, info); };

for (const w of [375, 1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(`${BASE}/contact`, { waitUntil: "load" });
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `${OUT}/contact-${w}.png`, fullPage: true });

  if (w === 375) {
    ok("one h1", (await p.locator("h1").count()) === 1);
    const unlabeled = await p.evaluate(() => [...document.querySelectorAll("main input:not([type=checkbox]), main textarea")].filter((el) => !document.querySelector(`label[for="${el.id}"]`)).length);
    ok("every input has a label", unlabeled === 0);
    const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    ok("no horizontal overflow", overflow <= 0, String(overflow));
    const small = await p.evaluate(() => [...document.querySelectorAll("main a, main button, main input, main textarea, main label")].filter((e) => { const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); return r.width && r.height && cs.visibility !== "hidden" && !e.classList.contains("sr-only") && (r.height < 43.5) && e.tagName !== "LABEL"; }).map((e) => e.tagName + ":" + (e.textContent || e.id).trim().slice(0, 20)));
    ok("targets at least 44px high", small.length === 0, small.join(", "));
  }

  // validation: blur, clear on edit, focus first invalid on submit
  await p.locator("#name").focus();
  await p.keyboard.press("Tab");
  ok(`[${w}] blur shows name error`, (await p.locator("#name-err").innerText()).length > 0);
  ok(`[${w}] aria-invalid + describedby`, (await p.locator("#name").getAttribute("aria-invalid")) === "true" && (await p.locator("#name").getAttribute("aria-describedby")).includes("name-err"));
  await p.locator("#name").fill("Test");
  ok(`[${w}] error clears while typing`, (await p.locator("#name-err").innerText()) === "");
  await p.locator("#email").fill("bad");
  await p.locator("#email").blur();
  ok(`[${w}] bad email error`, (await p.locator("#email-err").innerText()).length > 0);
  await p.locator("#email").fill("");
  await p.getByRole("button", { name: "Send message" }).click();
  ok(`[${w}] submit focuses first invalid field`, (await p.evaluate(() => document.activeElement?.id)) === "email");

  // chip group with keyboard
  await p.locator("#company").focus();
  await p.keyboard.press("Tab");
  await p.keyboard.press("Space");
  const checked = await p.locator("fieldset input:checked").count();
  ok(`[${w}] chip toggles with Space`, checked === 1);

  await p.locator("#email").fill("qa-test@logisaar.com");
  await p.locator("#message").fill("Round 5 QA test submission, please ignore.");

  // failure path (simulated): keep text, show inline message
  if (!LIVE) {
    await p.route("**/script.google.com/**", (r) => r.abort());
    await p.route("**/script.googleusercontent.com/**", (r) => r.abort());
  }
  if (LIVE && w === 375) { await ctx.close(); continue; }
  await p.getByRole("button", { name: "Send message" }).click();
  await p.waitForTimeout(LIVE ? 4000 : 12000);
  const failed = await p.getByText("Your message wasn’t sent").count();
  const done = await p.getByText("We’ve got your message").count();
  if (!LIVE) ok(`[${w}] failure path shows inline message and keeps text`, failed === 1 && (await p.locator("#message").inputValue()).startsWith("Automated"), `failed=${failed} done=${done}`);
  if (LIVE || done) {
    ok(`[${w}] success card focused`, await p.evaluate(() => document.activeElement?.getAttribute("role") === "status"));
  }
  await p.screenshot({ path: `${OUT}/contact-${w}-after-submit.png` });
  await ctx.close();
}
await b.close();
const failN = res.filter((r) => !r.pass).length;
console.log(failN ? `${failN} failures` : "all contact checks passed");
process.exit(failN ? 1 : 0);

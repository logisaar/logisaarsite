// Records short screen videos of the pinned sequences (Home IKURO and HeyLane blocks, Solutions stage) into qa/videos.
//   usage: node scripts/round9-record.mjs [outDir]   env BASE (default http://localhost:8080)
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = (process.argv[2] || "claude-code-tasks/round-9-scroll-footer/qa") + "/videos";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const jobs = [
  { name: "home-ikuro", route: "", trace: "home-ikuro" },
  { name: "home-heylane", route: "", trace: "home-heylane" },
  { name: "solutions-stage", route: "solutions", trace: "solutions-stage" },
];
for (const j of jobs) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 800 }, recordVideo: { dir: OUT, size: { width: 1280, height: 800 } } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem("lead_capture_shown", "1"));
  await p.goto(`${BASE}/${j.route}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  const range = await p.evaluate((n) => { const e = window.__scrollTrace.find((t) => t.name === n); return e ? [e.st.start, e.st.end] : null; }, j.trace);
  if (range) {
    const [s, e] = range;
    for (let y = Math.max(0, s - 500); y <= e + 300; y += 12) { await p.evaluate((yy) => window.scrollTo(0, yy), y); await p.waitForTimeout(16); }
    await p.waitForTimeout(800);
  }
  await ctx.close();
  const v = fs.readdirSync(OUT).filter((f) => f.endsWith(".webm")).map((f) => ({ f, t: fs.statSync(`${OUT}/${f}`).mtimeMs })).sort((a, c) => c.t - a.t)[0];
  if (v) fs.renameSync(`${OUT}/${v.f}`, `${OUT}/${j.name}.webm`);
  console.log(j.name, range ? "recorded" : "no trace found");
}
await b.close();

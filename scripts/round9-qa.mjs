// Round 9 QA: scroll timing trace for every sequence/reveal, and the Solutions CTA visibility check.
//   usage: node scripts/round9-qa.mjs [outDir]   env BASE (default http://localhost:8080)  SHOTS=1
import { chromium } from "playwright-core";
import fs from "node:fs";
const BASE = process.env.BASE || "http://localhost:8080";
const OUT = process.argv[2] || "claude-code-tasks/round-9-scroll-footer/qa";
fs.mkdirSync(OUT, { recursive: true });
const b = await chromium.launch({ channel: "chrome" });
const fails = [];
const fail = (m) => { fails.push(m); console.log("FAIL", m); };
const ok = (m) => console.log("ok  ", m);

const pages = [
  { route: "", name: "home" },
  { route: "solutions", name: "solutions" },
  { route: "ikuro", name: "ikuro" },
  { route: "heylane", name: "heylane" },
  { route: "about", name: "about" },
];

/** Scroll the page in 100px steps and record what each registered trigger is doing. */
const timing = async (page, name, vh) => {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const rows = [];
  for (let y = 0; y <= total; y += 100) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
    const snap = await page.evaluate(() =>
      (window.__scrollTrace || []).map((e) => ({
        name: e.name, kind: e.kind, mode: e.mode, start: e.st.start, end: e.st.end, sprog: e.st.progress, active: e.st.isActive,
        tl: e.tl ? e.tl.progress() : null,
        pinned: !!e.st.pin && e.st.isActive && e.st.progress > 0 && e.st.progress < 1,
        top: e.st.trigger ? e.st.trigger.getBoundingClientRect().top : null,
      })),
    );
    rows.push({ y, snap });
  }
  return rows;
};

for (const w of [1280]) {
  const ctx = await b.newContext({ viewport: { width: w, height: 800 } });
  const page = await ctx.newPage();
  const trace = {};
  for (const p of pages) {
    await page.goto(`${BASE}/${p.route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.evaluate(() => (window.ScrollTrigger ? window.ScrollTrigger.refresh() : null));
    const rows = await timing(page, p.name, 800);
    // per-entry verdicts
    const names = [...new Set(rows.flatMap((r) => r.snap.map((s) => s.name + "|" + s.kind)))];
    for (const key of names) {
      const [name, kind] = key.split("|");
      const series = rows.map((r) => ({ y: r.y, ...r.snap.find((s) => s.name === name && s.kind === kind) })).filter((s) => s.start !== undefined);
      if (kind === "sequence") {
        const mode = series[0].mode;
        if (mode === "pinned") {
          // progress must hit 1 while the pin is still held (st progress < 1 or exactly at the end), and the hold lasts >= ~15%
          const FIN = 1 / 1.22 - 0.01; // the steps end here; the rest of the timeline is the hold
          const done = series.find((s) => s.tl >= FIN);
          const pinnedRows = series.filter((s) => s.sprog > 0 && s.sprog < 1);
          const holdRows = series.filter((s) => s.tl >= FIN && s.sprog < 1);
          const span = series[0].end - series[0].start;
          const holdPx = holdRows.length * 100;
          if (!done) fail(`${p.name}/${name}: timeline never reached its final step`);
          else if (!pinnedRows.length) fail(`${p.name}/${name}: never pinned`);
          else if (holdPx < span * 0.1) fail(`${p.name}/${name}: final state held ${holdPx}px of ${Math.round(span)}px pinned`);
          else ok(`${p.name}/${name}: pinned ${Math.round(span)}px, final state held ~${Math.round((holdPx / span) * 100)}%`);
        } else {
          ok(`${p.name}/${name}: timed (not pinned at 1280x800)`);
        }
      } else {
        // reveal: its trigger must not have fired before its top reached 70% of the viewport
        const fired = series.find((s) => !s.active && s.sprog >= 1) || series.find((s) => s.sprog >= 1);
        if (!fired) continue;
        if (fired.top !== null && fired.top > 800 * 0.7 + 110) fail(`${p.name}/${name}: reveal fired with top at ${Math.round(fired.top)}px (>70%)`);
      }
    }
    trace[p.name] = rows;
    fs.writeFileSync(`${OUT}/timing-${p.name}.json`, JSON.stringify(rows.map((r) => ({ y: r.y, snap: r.snap })), null, 1));
  }
  await ctx.close();
}

// Phase 2: the Solutions CTA is fully inside the viewport and below the header for each service while pinned
for (const [w, h] of [[1280, 720], [1440, 900], [1920, 1080]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/solutions`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  for (let i = 0; i < 4; i++) {
    const y = await page.evaluate((idx) => {
      const e = window.__scrollTrace.find((t) => t.name === "solutions-stage");
      if (!e || e.mode !== "pinned") return null;
      const total = 4 * 1.22;
      return e.st.start + (idx / total) * (e.st.end - e.st.start) + 4;
    }, i);
    if (y === null) { fail(`solutions ${w}x${h}: stage is not pinned`); break; }
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(1400);
    const r = await page.evaluate(() => {
      const hd = document.querySelector("header").getBoundingClientRect().bottom;
      const links = [...document.querySelectorAll("a")].filter((a) => /Discuss your project/.test(a.textContent) && !a.closest("[inert]"));
      const a = links.find((l) => { const c = getComputedStyle(l.closest("[data-body-in]") || l); return +c.opacity > 0.5 && c.visibility !== "hidden"; }) || links[0];
      const bb = a?.getBoundingClientRect();
      const col = document.querySelector("[data-cur]")?.firstElementChild;
      const cb = col?.getBoundingClientRect();
      return { hd, bb: bb && { top: bb.top, bottom: bb.bottom }, vh: innerHeight, colBottom: cb?.bottom, colTop: cb?.top, title: document.querySelector("[data-name-in]:not([inert] *)")?.textContent };
    });
    if (!r.bb || r.bb.top < r.hd - 0.5 || r.bb.bottom > r.vh + 0.5) fail(`solutions ${w}x${h} service ${i + 1}: CTA ${JSON.stringify(r.bb)} header ${Math.round(r.hd)} vh ${r.vh}`);
    else ok(`solutions ${w}x${h} service ${i + 1}: CTA ${Math.round(r.bb.top)}-${Math.round(r.bb.bottom)} (header ${Math.round(r.hd)}, vh ${r.vh}); column ${Math.round(r.colTop)}-${Math.round(r.colBottom)}`);
    if (process.env.SHOTS) await page.screenshot({ path: `${OUT}/solutions-${w}x${h}-s${i + 1}.png` });
  }
  await ctx.close();
}
await b.close();
fs.writeFileSync(`${OUT}/round9-qa-result.json`, JSON.stringify({ fails }, null, 1));
console.log(fails.length ? `\n${fails.length} FAILURES` : "\nALL OK");
process.exit(fails.length ? 1 : 0);

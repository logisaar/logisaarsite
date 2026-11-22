// Generates public/sitemap.xml from the routes in src/App.tsx. Runs automatically before `npm run build` (prebuild).
// Origin comes from src/lib/site.ts (SITE_URL). lastmod is the build date. No packages needed.
import fs from "node:fs";

const site = fs.readFileSync("src/lib/site.ts", "utf8").match(/SITE_URL\s*=\s*"([^"]+)"/)?.[1];
if (!site) throw new Error("SITE_URL not found in src/lib/site.ts");
const app = fs.readFileSync("src/App.tsx", "utf8");

// Excluded: the catch-all, redirects (/techxera) and duplicate aliases (/terms-of-service). /portfolio stays (hidden page, SEO only).
const EXCLUDE = new Set(["*", "/techxera", "/terms-of-service"]);
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => !EXCLUDE.has(p));

const prio = (p) => (p === "/" ? ["weekly", "1.0"] : p.startsWith("/solutions/") ? ["monthly", "0.7"] : /policy|terms/.test(p) ? ["yearly", "0.3"] : ["monthly", "0.8"]);
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .map((p) => {
    const [freq, pr] = prio(p);
    return `  <url>\n    <loc>${site}${p === "/" ? "/" : p}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pr}</priority>\n  </url>`;
  })
  .join("\n")}\n</urlset>\n`;
fs.writeFileSync("public/sitemap.xml", xml);
console.log(`sitemap: ${routes.length} urls -> public/sitemap.xml (${site})`);

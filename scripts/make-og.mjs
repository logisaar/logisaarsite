// Renders public/og-image.png (1200x630) from scripts/og-template.html
import { chromium } from "playwright-core";
import path from "node:path";
import { pathToFileURL } from "node:url";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto(pathToFileURL(path.resolve("scripts/og-template.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.screenshot({ path: "public/og-image.png" });
await browser.close();

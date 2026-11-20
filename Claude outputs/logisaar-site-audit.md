# Logisaar website — current-state audit (before redesign)

Date: 20 Nov 2026 · Repo: `D:\logisaarsite` · Live: https://www.logisaar.in

## 1. Stack & repo

- Vite 5 + React 18 + TypeScript + Tailwind 3 + shadcn/ui, Framer Motion + GSAP, React Router (SPA), react-helmet-async for SEO, deployed on Vercel.
- Forms post to a Google Apps Script (hidden iframe) — no confirmation the data actually landed.
- ~11.8k lines in pages/components. Biggest files: `TechXera.tsx` (2,252 lines, **uncommitted, +2,185 lines**), `Careers.tsx` (1,205), `Index.tsx` (909).
- AI tooling already in the repo: `.agents/` + `.gemini/` (Impeccable skill for Antigravity), `all skills/` (taste, redesign, minimalist, soft, GSAP skills), `agentation` dev overlay, `site_structure.yaml` (spec — now out of date).
- ~45 shadcn `ui/` components, most unused. `creative/` folder has effects (magnetic buttons, gradient mesh, floating code symbols, noise).

## 2. Sitemap (as coded)

Home · About (+ Portfolio under an About dropdown) · Solutions (+9 solution pages) · TechXera (training + Chalk to Choice) · Products (ScanLoyal) · Careers · Contact · Web-development-Odisha (SEO page) · 4 legal pages · 404. `Pricing.tsx` exists but is not routed.

## 3. Critical issues (fix regardless of redesign)

| # | Issue | Evidence |
|---|---|---|
| 1 | **Main pages 404 on direct visit/refresh** | Live check: `/solutions`, `/products`, `/techxera`, `/careers`, `/solutions/*`, `/privacy-policy`, `/refund-policy` → 404. `vercel.json` only whitelists the old routes (services, pricing…). Google and shared links can't reach them. |
| 2 | **Sitemap is stale** | `sitemap.xml` lists `/services/*` and `/pricing`; none of the new routes. |
| 3 | **Homepage ≈ 31 MB** | Client logos are 1.3–2.6 MB PNGs each (12 of them), hero/phone backgrounds 1.3 MB, solution mockups ~1.2 MB. Should be <2 MB total (WebP/AVIF, sized). |
| 4 | **Contact details inconsistent** | Two phones (78150 14638 ×12, 85960 72510 ×15), two emails (logisaar@gmail.com ×10, contact@logisaar.in ×16), two WhatsApp numbers. Need one source of truth (`config.ts`). |
| 5 | **Positioning mismatch** | H1 says "We build native AI technology"; meta description says "Odisha's leading web development company… Starting ₹2,999". Title/OG/Twitter tags also differ. |
| 6 | **Auto popup on load** | Lead-capture modal opens on a timer over the hero, before the visitor sees anything. On mobile it covers the whole screen. |
| 7 | **Mobile overlap** | Floating WhatsApp button sits on top of the logo (top-left) on mobile. |

## 4. Design / UX observations

- **Identity**: green `#00D166`-ish primary on white, Inter + Space Grotesk. Clean but generic "AI SaaS template" feel — gradient text, glass cards, glows, noise, animated grid, marquee, magnetic buttons all stacked together.
- **Story is split three ways**: AI solutions company + TechXera (student AI training) + Chalk to Choice (Class 11–12 career guidance) + ScanLoyal product — all on the home page with equal weight. A visitor can't tell in 5 seconds who Logisaar is for.
- **Home page is very long** (~10,800 px): hero → marquee → 4 solution cards → Chalk to Choice → ScanLoyal → logos + stats → 12 testimonials (duplicated for marquee) → CTA. Too many sections, repeated stats.
- **Trust signals are weak/unverifiable**: generic testimonials without names/photos, round stats (30+, 25+, 2x, 90%), "500+ students". No case studies (NDA — so we need flow-based case stories instead).
- **Navigation**: About hides Portfolio in a hover dropdown; "TechXera" means nothing to a business visitor; no HeyLane presence at all.
- **Careers page** is long (1,200 lines) — fine as a hiring hub, but needs the application form + QR flow you want for the BDA / content hiring.
- **Solution pages** share one `ServicePageLayout` — good base to keep.
- Dark mode tokens exist but site is light-only; hidden scrollbars site-wide (accessibility issue).
- Analytics: GA4 is commented out — no data on what visitors do.

## 5. What to keep

Routing structure, `ServicePageLayout` pattern, SEO component + JSON-LD, solution pricing ("From ₹20k–45k"), client logo set, Google-Sheet form pipe (until a real backend), legal pages.

## 6. Recommended redesign direction (for discussion)

1. Decide the one-line positioning (AI-native software studio for Indian SMBs?) and give TechXera / Chalk to Choice / ScanLoyal / HeyLane their own clear lanes.
2. New IA: Home · Solutions · Products (ScanLoyal, HeyLane) · Academy (TechXera, Chalk to Choice) · Work · Company (About, Careers) · Contact.
3. Fresh design system (tokens, type scale, 1 accent, restrained motion) written to `DESIGN.md` so Claude Code and Antigravity follow the same rules.
4. Fix §3 items first in a separate "hygiene" PR so the live site stops losing traffic now.

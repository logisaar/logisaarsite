# Logisaar website upgrade — brief for Claude Code

Owner: Chinmay Kumar Panda · Reviewer: Claude (Cowork) · Small fixes: Antigravity
Repo: `D:\logisaarsite` (Vite + React + TS + Tailwind + shadcn, Framer Motion, GSAP) · Deploy: Vercel

## 0. Ground rules

- **Upgrade, don't replace.** Keep the current look: white / off-white backgrounds, current green (`--primary: 148 100% 41%`, #00D162), Space Grotesk + Inter, pill navbar, liquid-glass cards, marquee, GSAP hero timeline, Framer Motion reveals, magnetic buttons, Chalk to Choice asset.
- Work on a new branch `redesign/home-v2`. Commit after each phase. Never commit `.env`.
- Approved reference (exact styling + new copy): `Claude outputs/ref-src.tgz` → this is the current repo with the home page text and hero SVG already changed. Diff it against `src/` and port the changes. Live preview: https://claude.ai/artifact/7KSrT1CW9rsnfCCfDne6WJ
- Use the installed skills: `design-taste-frontend` (taste skill) for audits and polish, GSAP skills for motion. Do not change the brand look to the skill's defaults; brand rules above win.
- Every change must work on desktop 1440, tablet 768 and phone 390, with `prefers-reduced-motion` respected.
- After each phase run `npm run build` and `npm run lint`, then report what changed.

## 1. Phase 1 — Fix what is broken (do first, ships today)

1. **Routes 404 on refresh/direct visit.** `vercel.json` only lists old routes. Replace the `routes` block with a SPA rewrite: `"rewrites": [{ "source": "/((?!.*\\.).*)", "destination": "/index.html" }]` and keep the host redirect + headers. Verify `/careers`, `/solutions`, `/products`, `/techxera`, `/solutions/*`, legal pages all load directly.
2. **Rename TechXera → IKURO.** Add route `/ikuro` (page component stays `TechXera.tsx` for now, rename later), keep `/techxera` → redirect to `/ikuro`. Update nav, footer, links, SEO titles.
3. **Remove ScanLoyal everywhere.** HeyLane includes loyalty. Replace references with HeyLane (https://heylane.in).
4. **One contact set everywhere** (create `src/lib/contact.ts` and import it): email `contact@logisaar.com`, phone `+91 85960 72510`, WhatsApp `https://wa.me/918596072510`, address `Bhubaneswar, Odisha, India`. Remove `logisaar@gmail.com`, `contact@logisaar.in` and `78150 14638` from the UI. (Confirm with Chinmay before changing the IKURO deck number.)
5. **Lead popup:** do not auto-open on load. Open it only from "Get a Quote" buttons or after 60% scroll on the home page, once per session.
6. **Sitemap + robots:** regenerate `public/sitemap.xml` with the real routes (home, about, solutions + 9 solution pages, products, ikuro, careers, contact, portfolio, web-development-odisha, legal pages).
7. **SEO meta:** make `index.html` and `<SEO>` on Home match the new positioning (see copy deck). Add Open Graph image (see assets).
8. Turn on GA4 only if Chinmay gives the Measurement ID; leave the placeholder otherwise.

## 2. Phase 2 — Assets, highest quality

| Asset | Today | Target |
|---|---|---|
| Hero background desktop | `public/hero background.png` 1.3 MB | `public/hero-bg.svg` (already added, ~24 KB gzipped) |
| Hero background mobile | `public/smartphone background.png` 1.3 MB | `public/hero-bg-mobile.svg` (already added) |
| Client logos (`src/assets/all brand logos/`) | 1.3–2.6 MB PNG each | Trim transparent edges, 2x size (max 320 px wide), WebP + PNG fallback, < 30 KB each. Keep original files in `/src/assets/_originals` |
| Solution mockups (`school erp dashboard.png`, `ai reception.png`, `smart crm.png`, `hotel managment system.png`) | ~1.2 MB each | AVIF + WebP at 1x/2x (800 / 1600 px) with `srcset`, lazy-loaded, explicit width/height |
| Service images (`public/images/services/*.png`) | ~650 KB each | Same treatment as mockups |
| Project screenshots (`src/assets/projects/*`) | up to 2 MB | Same treatment |
| Team photos | JPEG up to 1.2 MB | WebP 2x, max 800 px, face-centred crop |
| Logo | `public/logo.png` 272 KB | Keep as is until Chinmay sends the original vector (AI/SVG). Do NOT redraw the logo. Serve a 2x PNG at the displayed size meanwhile |
| Favicon | `favicon.png` 97 KB | Generate 16/32/48 ICO, 180 apple-touch, 192/512 PNG + `site.webmanifest` from `favicon.png` |
| OG image | none | 1200×630 PNG: hero SVG background + headline "Less busywork. More business." + logo |

Use `sharp` (add as devDependency) in a script `scripts/optimize-images.mjs` so it is repeatable. Rename files to kebab-case without spaces. Target: home page total transfer < 2.5 MB (today ~31 MB). Report before/after sizes.

## 3. Phase 3 — Home page copy and new section

Port from the reference (`ref-src.tgz`). Copy deck:

- **Hero tagline:** SOFTWARE · AI AGENTS · AUTOMATION
- **Hero H1:** Less ~~busywork.~~ / More **business.** (busywork struck through and muted; business uses `text-gradient`)
- **Hero sub:** Logisaar builds custom software, AI agents and business automation that take repetitive work off your team, so your people can spend their day on customers and growth.
- **Hero buttons:** Start a Project (→ /contact) · Explore Services (→ /solutions)
- **Hero small links:** Looking for HeyLane or IKURO? (→ /products) · Just want to talk? Contact us
- **Floating cards:** 30+ Projects Delivered — Software, AI agents and automations live in production · 25+ Happy Clients — Schools, hotels, clinics and growing businesses
- **Marquee:** SOFTWARE DEVELOPMENT · AI AGENTS · BUSINESS AUTOMATION · AI SOFTWARE ·
- **New section "What we do"** (before Solutions), H2: Four ways we take work *off your plate*. Sub: Pick one, or let us combine them into one system that fits how your business actually runs. Cards:
  - Software Development — Your business, as an app. — Custom web apps, mobile apps, ERP and CRM systems built around how your team already works. — Web & mobile apps · ERP & CRM systems · E-commerce & portals — *One system instead of five spreadsheets.*
  - AI Agent Development — A teammate that never sleeps. — AI agents that answer calls and chats, qualify leads, book appointments and follow up. — AI receptionist · WhatsApp & web chat agents · Lead follow-up — *Every enquiry answered, day and night.*
  - Business Automation — Repetitive work, gone. — We connect your tools so invoices, reminders, approvals and reports happen on their own. — Invoices & GST bills · Reminders & approvals · Daily reports — *Hours back for your team, every week.*
  - AI Software — Your data, finally useful. — AI tools trained on your own documents and numbers: assistants, document reading and smart search. — Document AI · Team assistants · Insights & reports — *Answers in seconds, not hours.*
- **Solutions:** badge READY SOLUTIONS · H2 Ready-made solutions, *made yours* · Proven systems for schools, hotels, clinics and sales teams, customised to your business so you go live faster and pay less.
- **IKURO section** (was Chalk to Choice; keep layout and asset): badge IKURO · A Logisaar product · H2 IKURO / Decisions today. Growth tomorrow. · Our AI-powered platform that helps students make better course, college, skill and career decisions. It includes Chalk to Choice, our career-clarity programme for Class 11 & 12. · Features: Personalised AI Guidance / Chalk to Choice / For Colleges (pilots begin in 2026) · Button: Visit IKURO (→ /ikuro)
- **HeyLane section** (was ScanLoyal): badge HeyLane · A Logisaar product · H2 We don't just build for clients. *We build our own.* · HeyLane is our hyperlocal super app connecting local businesses with customers nearby: discovery, direct chat, loyalty rewards and automatic GST invoices, all in one place. · Button: Visit HeyLane (https://heylane.in) · Mockup URL heylane.in; tiles: Loyalty card / GST invoice: Auto / Shop chat
- **Work:** H2 25+ businesses already *run on Logisaar* · Schools, hotels, retailers, consultants and builders trust us with the systems they use every day.
- **Closing CTA:** Tell us the one task you hate doing. / *We'll make it disappear.* · A free call. You leave with a clear plan and a fixed quote, whether or not you work with us. · Buttons: WhatsApp Us · Book a Free Call
- **Footer blurb:** Software, AI agents and business automation from Bhubaneswar, Odisha. Makers of HeyLane and IKURO.
- **SEO title:** Logisaar | Software, AI Agents & Business Automation · **Description:** Logisaar builds custom software, AI agents and business automation for growing businesses in India and abroad. Makers of HeyLane and IKURO.

Voice for all other copy: short sentences, concrete outcomes, no buzzwords ("cutting-edge", "seamless", "elite", "leverage"), no em-dashes, numbers only if true. Do not invent stats; keep 30+ projects, 25+ clients, 500+ students (Chalk to Choice) as provided.

## 4. Phase 4 — Logi, the site companion

Port `Claude outputs/logisaar-home-final.zip → logi.js` as a React component `src/components/logi/Logi.tsx` mounted in `Layout`:
roams the page (follows cursor lazily, perches on headings, sleeps after 22 s idle), draggable/throwable, contextual tips via `data-logi` attributes, click-to-chat with quick replies and keyword answers, WhatsApp hand-off with prefilled text, parks bottom-right on touch devices, fully disabled motion under reduced motion, `Esc` closes chat, focus moves into chat on open. Keep the existing WhatsApp floating button but move it so the two never overlap (Logi bottom-right, WhatsApp bottom-left or merge WhatsApp into Logi's menu).

## 5. Phase 5 — Careers page (hiring is live)

Rewrite `src/pages/Careers.tsx` copy in the same voice. Open roles:
- Business Development Associate — 3 openings — Bhubaneswar — freshers welcome
- Content Creator & Graphic Designer — 1 opening — reels, design, video shoot/edit
Process note: one month of target-based training (food and transport provided), full pay from month two for those who hit target, incentives on top. Add a working application form (name, phone, email, role, city, resume link, short note) posting to the existing Google Apps Script (`src/lib/submitForm.ts`, add `source: "careers"`), with success and error states. Make `/careers` and `/careers#apply` load directly (QR codes will point here).

## 6. Later phases (separate briefs)

IKURO page (from the founder deck brief in the Claude project), HeyLane page, service pages for Software Development / AI Agent Development / Business Automation / AI Software.

## 7. Done means

- `npm run build` passes, no console errors, no 404s on any route (direct load + refresh).
- Lighthouse mobile on home: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- All text matches the copy deck; no ScanLoyal, no TechXera in the UI, one contact set.
- Screenshots at 1440 / 768 / 390 for every changed page, saved to `Claude outputs/screens/` for review.

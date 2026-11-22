# Logisaar website: context for Claude Code

Read this first in every session (especially after `/clear`). Then read only the brief for the current round in `claude-code-tasks/`.

## What this is

- Marketing site for **Logisaar Technologies Pvt Ltd** (Bhubaneswar / Cuttack, Odisha). Owner: Chinmay Kumar Panda (Founder & Director).
- Logisaar sells four things: **software development, AI agent development, business automation, AI software**, plus ready-made solutions (school ERP, hotel management, AI receptionist, CRM, etc.).
- Logisaar also makes two products, which have their own pages here:
  - **IKURO** (`/ikuro`, formerly TechXera; Chalk to Choice lives inside it)
  - **HeyLane** (`/heylane`)
- Audience includes **USA/Canada** buyers (virtual offices planned), so the site must read as trustworthy: no inflated or unsourced claims.
- Logisaar works under NDA with clients: never add real client project details beyond what is already public on the site.

## How we work

- **Cowork (Claude)** plans, makes references, audits, and writes the briefs.
- **Claude Code (you)** does the major implementation, one brief at a time.
- **Antigravity** does small fixes.
- Every task brief lives in `claude-code-tasks/round-N-<name>/`. `claude-code-tasks/README.md` indexes them.
- Work phase by phase. After each phase:
  1. Run `npm run lint && npx tsc --noEmit && npm run build`.
  2. Commit as `roundN-phaseM: <summary>`.
- **Ask the owner before:**
  - deleting any file;
  - adding an npm package;
  - changing the Logisaar logo.
- Never commit `.env`.
- If a fact is unknown, write `TODO(owner):` in code and list it in your summary. Don't guess.

## Status

| Round | Folder | State |
|---|---|---|
| 1 | `round-1-redesign` | done (SPA rewrites, /ikuro route, contact lib, image pipeline, home copy, Logi v1, Careers) |
| 2 | `round-2-fixes` | done (new logo everywhere, Logi auto-tour, footer CTA removed, popup only from buttons) |
| 3 | `round-3-logi-redesign` | done (plush OpenDots-style Logi, MIT notice) |
| 4 | `round-4-audit-ikuro-heylane-responsive` | done (responsive units, 27 home fixes, IKURO theme, /heylane) |
| 5 | `round-5-header-contact` | done (header offset/z-index fix, Contact redesign) |
| 6 | `round-6-about-solutions-portfolio` | done (/portfolio hidden, About and Solutions redesigned, shared `src/data/company.ts` and `solutions.ts`, claims in `CLAIMS.md`) |
| 7 | `round-7-solutions-visual` | done (`text-h1-page`/`text-h2-page`, Solutions explorer with live demos, calmer cards, timeline) |
| 8 | `round-8-visual-polish` | done (pinned Solutions stage + tab switcher, home bento with mini demos, IKURO decision path, real HeyLane app phones via `PhoneFrame`, wallet pass cards, About founders story, `scripts/round8-qa.mjs`). Open items: axe-core and Lighthouse are not installed (owner to approve the packages); `ServiceVignette.tsx`, `TeamSection.tsx`, `ChalkToChoiceAsset.tsx`, `HlPhone.tsx`, `MarqueeText.tsx` and the founder photos in `src/assets/team/` are now unused: ask the owner before deleting. |
| 9 | `round-9-scroll-footer` | done (`src/lib/scroll.ts` `reveal`/`sequence`/`loop`; pinned Home IKURO and HeyLane blocks, `/heylane` How it works, `/ikuro` loop and problem, Solutions stage with CTA under the promise; alive footer in `src/components/footer/`; `scripts/round9-qa.mjs`, `round9-footer-qa.mjs`). Open: About journey timeline still uses its own animation; Logi footer wave skipped; `OFFICE_HOURS` in `src/data/company.ts` is `null` until the owner confirms (footer shows clocks only); axe/Lighthouse still need package approval. |
| 10 | `round-10-one-footer` | done (one footer: CTA zone, columns, bottom bar, signature wordmark, one background, `<Footer cta={false}>` on /contact; page-final CTA bands removed; ring back-to-top in `ScrollToTop` only; header turns solid dark over `data-header-tone="dark"` bands; `scripts/round10-qa.mjs`). Open: IKURO and HeyLane keep their product closing bands (different CTAs); footer office city and "serving clients abroad" need owner confirmation. |

Branch: `redesign/home-v2`.

## Stack

- Vite 5, React 18 and TypeScript, with BrowserRouter.
- Styling: Tailwind 3 and shadcn/Radix.
- Animation: Framer Motion, GSAP + ScrollTrigger, and Lenis.
- SEO: react-helmet-async (`src/components/SEO.tsx`).
- Hosting: Vercel with SPA rewrites.
- **Contact details** come only from `src/lib/contact.ts`: `contact@logisaar.com`, `+91 85960 72510`, `wa.me/918596072510`. Never hard-code them.
- **Forms** use `src/lib/submitForm.ts`, which posts to Google Apps Script. Lead sources are typed in `LeadSource`.
- **Images** go through the sharp pipeline: AVIF/WebP at 800w/1600w, served via `getImage(group, name)` and `<ResponsiveImage>`.
- **Logi** (the site mascot):
  - Code: `src/components/logi/` (`Logi.tsx`, `answers.ts`, `logi.css`).
  - Mounted once in `App.tsx`.
  - Tour stops are elements with `data-logi="<line>"`; `data-logi-dock` docks it.
  - Logi never stands in a hero or over h1/paragraph/CTA text. On mobile it stays docked.

## Brand rules

**Logisaar**

- Look: white/off-white background, and the current site green `#00D162` (`--primary: 148 100% 41%`).
  - Green is a **fill** colour. Green **text** uses `--primary-ink` (`#00853E`).
  - Buttons are green with a dark label `#04130B`.
- Hero text is centred.
- Keep the animations (GSAP, Framer, scroll-driven). The owner wants an upgrade of the current site, not a different site.
- Must not resemble the HeyLane or TaxPoint CRM designs.
- Logo files are in `public/brand/` (`logisaar-logo`, `-white`, `-mark`). Use `<BrandLogo>`.

**IKURO** (scoped with `[data-theme="ikuro"]`)

- Colours: orange `#FA482E` (marks, large text, fills) and `#D93A22` (small text, and button fill with a white label); navy `#1E1E2A`; cream background.
- Logo files are in `public/brand/ikuro/`.
- IKURO is **in development**: no user counts.
- Facts: project doc / `claude-code-tasks/round-4.../ROUND4.md` Phase 3.

**HeyLane** (scoped with `[data-theme="heylane"]`)

- Tokens: night `#0b3328`, emerald `#007f5f`, paper `#f4f3ee`, gold `#f5b321`.
- Fonts: Bricolage Grotesque + Geist, from `public/fonts/heylane/`.
- Logo: only the SVGs in `public/brand/heylane/`, unchanged.
- **Facts and prices come only from** `D:\logisaar Projects\Heylane - landing page\docs\01-PRODUCT.md`.
- No ratings, user counts, testimonials or ROI claims.
- Rides, Wallet and SOS are "Coming soon".
- Sample UI is labelled "Sample".
- Never use Google-review or stamp-card language.
- **Never mention ScanLoyal anywhere** (HeyLane includes loyalty).

## Quality rules (all pages)

- **Units:** use `rem`, `clamp()`, `%`, `svh`/`dvh` and `em` breakpoints. Use the fluid tokens in `tailwind.config.ts`:
  - type: `text-label`, `text-body-sm`, `text-body`, `text-lead`, `text-h3`, `text-h2`, `text-h1`, `text-display`;
  - spacing: `py-section`, `py-section-sm`, `px-gutter`.
- **px is allowed only for:** hairline borders, focus rings, shadows, blur radii, SVG/canvas/JS maths, and img width/height attributes.
- `npm run audit:px` must not regress.
- **Text size:** at least 12px for labels and 16px for paragraphs.
- **Targets:** at least 44×44px.
- **Focus:** `:focus-visible` ring is always visible.
- **Contrast:** WCAG 2.1 AA.
- **Reduced motion:** no loops, nothing hidden, final state shown.
- **Faux product UI (`src/components/demos/`):** rendered at native size and scaled with `transform`, `aria-hidden` with a described `figure`, so the 12px text rule does not apply inside it. Demos never paint empty: the first frame is populated, and reduced motion parks the final state.
- **Scroll choreography:** use `reveal`/`sequence`/`loop` from `src/lib/scroll.ts`; scrubbed sequences run only while pinned and fully visible, and everything else is a one-shot reveal at 70% or a loop from 60% visible. Framer `whileInView`/`useInView` use `REVEAL_VIEWPORT`.
- **Blank runs:** at 1280 there is no vertical run of more than 160px of empty background between two pieces of content inside `main` (pinned/sticky stages excepted). `scripts/round8-qa.mjs` checks it.
- **One footer only.** Its CTA zone is the page's final CTA; pages don't add their own final CTA band. `/contact` hides the CTA zone (`<Layout footerCta={false}>`). Dark bands carry `data-header-tone="dark"` so the header turns into a solid dark capsule over them.
- **HeyLane phones:** real app screens live in `public/images/heylane/app/`; never draw a fake HeyLane phone. Use `<PhoneFrame>` (`src/components/heylane/PhoneFrame.tsx`). Proposed V4 screens (chat, pass at the counter) sit behind `SHOW_PROPOSED_SCREENS` in `src/data/heylane.ts`.
- **No AI slop:**
  - no glow blobs (`blur-[80px]`), rainbow or multi-colour gradients, emoji icons, or fake stats/stars;
  - one eyebrow style;
  - one card family;
  - sentence-case headings.
- **Skills available:**
  - `.claude/skills` (taste-skill `design-taste-frontend`, stageshow): use them for faux product UI and QA (`gate.mjs`, `consistency.mjs`, `copy-lint.mjs`).
  - VectorLab UX rules: blur validation, verb-first buttons, visible labels.
- **Inner-page heroes use `text-h1-page`; only the home page uses `text-h1`.** Section titles on inner pages use `text-h2-page`.
- **Hidden page:** `/portfolio` is hidden: indexable and in the sitemap, but never linked.
- **QA before finishing a round:**
  - Playwright at 320/375/414/768/1024/1280/1440/1920 plus 200% root font: no page overflow, no text under 12px, no small targets.
  - axe with 0 serious/critical issues.
  - Screenshots saved in the round's `qa/` folder.

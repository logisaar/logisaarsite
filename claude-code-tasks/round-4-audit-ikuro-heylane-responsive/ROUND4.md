# Round 4: home fixes, IKURO theme, HeyLane theme, responsive units

Branch: `redesign/home-v2` (latest commit `f235bc7`). Work in the phases below. After each phase, run `npm run lint && npx tsc --noEmit && npm run build`, commit as `round4-phaseN: <summary>`, then continue to the next phase. Stop at the end and summarise.

**Standing rules from earlier rounds still apply:**
- Ask the owner before deleting any file or changing the Logisaar logo.
- Never commit `.env`.
- Don't add npm packages without asking. Where this brief marks a package "ask first", stop and ask.
- No client project details beyond what is already public on the site (NDA).
- Write `TODO(owner):` in code for any fact you are unsure about, and list each one in your summary.

**Assets already placed in the repo for this round (do not redraw or recolour any logo):**

| Path | What |
|---|---|
| `public/brand/ikuro/ikuro-logo.{png,webp}` | Full IKURO logo (mark + wordmark + tagline), transparent, 1001×848 |
| `public/brand/ikuro/ikuro-logo-white.{png,webp}` | Same, ink parts white, for navy backgrounds |
| `public/brand/ikuro/ikuro-mark(-white).{png,webp}` | The "iK" path-and-star mark only |
| `public/brand/ikuro/ikuro-wordmark(-white).{png,webp}` | "ikuro" lettering only |
| `public/brand/ikuro/ikuro-lockup-tagline(-white).{png,webp}` | Wordmark + "DECISIONS TODAY. GROWTH TOMORROW." |
| `public/brand/heylane/*.svg` | Official HeyLane logo SVGs, copied unchanged from the HeyLane repo `brand/svg/` |
| `public/fonts/heylane/*.woff2` | Bricolage Grotesque (variable) + Geist Sans 400/500/600, from the HeyLane repo |
| `public/images/heylane/places/*-{640,1280}.{avif,webp}` | HeyLane category photos (cafés, cafés-alt, clinics, grocery-kirana, pharmacies, restaurants, salons-men, salons-unisex, stays-hotel) |

The source HeyLane project lives at `D:\logisaar Projects\Heylane - landing page`. Read its `docs/01-PRODUCT.md` (facts and prices: this wins over everything), `docs/02-COPY.md` (approved copy), `docs/03-DESIGN.md` (tokens and the visual quality bar) and `docs/08-DIRECTION-V2.md` before Phase 4.

---

## Phase 1: Responsive units policy (site-wide foundation)

The owner wants everything responsive using units that scale better than fixed `px`. Today `src` has **176 arbitrary `-[NNpx]` Tailwind values in TSX** (worst: `TechXera.tsx` 42, `Index.tsx` 37, `TestimonialsSection.tsx` 16, `Products.tsx` 11, `HeroProjectCards.tsx` 10), **~158 `px` values in CSS**, **63 text sizes of 9–11px**, and pure-`vw` font sizes (`text-[6vw]`) that do not grow with browser zoom (fails WCAG 1.4.4).

### 1.1 Rules

1. **Never set `html { font-size }` in px.** Leave the root at the browser default so users' font settings work. Everything else is relative to it.
2. **Type uses `rem` + `clamp()`, never pure `vw`.** Add a fluid type scale to `tailwind.config.ts` → `theme.extend.fontSize` and use only these tokens:

   | Token | Value | Use |
   |---|---|---|
   | `text-label` | `clamp(0.75rem, 0.73rem + 0.1vw, 0.8125rem)` | eyebrows, tags, meta (minimum 12px) |
   | `text-body-sm` | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` | card secondary text, list items |
   | `text-body` | `clamp(1rem, 0.96rem + 0.2vw, 1.0625rem)` | all paragraphs |
   | `text-lead` | `clamp(1.0625rem, 1rem + 0.4vw, 1.25rem)` | hero and section intros |
   | `text-h3` | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` | card titles |
   | `text-h2` | `clamp(1.875rem, 1.4rem + 2.2vw, 3.25rem)` | section titles |
   | `text-h1` | `clamp(2.5rem, 1.6rem + 4.6vw, 5.5rem)` | hero headline |
   | `text-display` | `clamp(3rem, 1.5rem + 7.5vw, 9rem)` | marquee / big outline words |

   Each token carries a matching `lineHeight` (1.1 for h1/h2/display, 1.25 for h3, 1.6 for body) and `letterSpacing` (−0.02em on h1/h2).
   Remove every `text-[9px]`, `text-[10px]`, `text-[11px]`, `text-[13px]`, `text-[17px]`, `text-[180px]`, `text-[240px]`, `text-[6vw]`, `md:text-[4vw]`, `text-[8rem]`, `text-[18rem]`, `text-[3.2rem]` and replace them with tokens. **Nothing below 12px. Paragraph text never below 16px.**
3. **Spacing:** Tailwind's default spacing scale is already `rem`. Keep it. Replace arbitrary px spacing with the nearest scale step, or with `clamp()` when it should breathe:
   - Add `spacing: { 'section': 'clamp(4rem, 3rem + 5vw, 8rem)', 'section-sm': 'clamp(3rem, 2.4rem + 3vw, 5rem)', 'gutter': 'clamp(1rem, 0.6rem + 2vw, 2rem)' }`.
   - Every page section uses `py-section` (or `py-section-sm`) instead of fixed `py-20 / py-24 / py-28`. This alone removes a lot of the dead space on mobile (the home page is 13,779px tall at 375 wide).
   - Page side padding uses `px-gutter`.
4. **Widths:** containers use `max-w-[87.5rem]` (was `max-w-[1400px]`) or a `container` token. Fixed boxes like `w-[170px]` become `w-[min(10.625rem,42vw)]`. Prefer `%`, `fr`, `min()`, `max()`, `aspect-ratio`.
5. **Grids:** prefer intrinsic grids that need no breakpoint: `grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))]`. Use breakpoints only when the layout truly changes.
6. **Heights:** replace `h-screen`, `min-h-screen`, `100vh`, `min-h-[90vh]` with `svh`/`dvh` (`min-h-[100svh]` for heroes, `dvh` for full-screen overlays) so mobile browser bars don't cut content. Keep a `vh` fallback in CSS where needed (`min-height: 100vh; min-height: 100svh;`).
7. **Breakpoints:** switch `theme.screens` to `em` (sm `40em`, md `48em`, lg `64em`, xl `80em`, 2xl `96em`) so layouts respond to user font size. At default settings, behaviour is identical.
8. **Container queries:** components that live in different widths (solution cards, product cards, testimonial cards, IKURO/HeyLane feature cards) should respond to their container, not the viewport. That needs `@tailwindcss/container-queries` (**new package: ask first**). Until approved, use the auto-fit grids from rule 5.
9. **Touch targets:** every interactive element is at least `2.75rem` (44px) in both directions. Use padding or an `::after` hit area for inline text links and icon buttons; don't make the visible icon bigger.
10. **Allowed `px` (keep these):** 1px/2px hairline borders and dividers, focus-ring widths and offsets, box-shadow offsets and blurs, `blur()` radii, SVG `viewBox`/stroke values, canvas and Logi's JS pixel maths, image `width`/`height` attributes (intrinsic size for CLS).
11. **CSS files:** convert `src/index.css` and `src/components/logi/logi.css` sizes to `rem`/`clamp()` with the same exceptions. Logi's size becomes `clamp(4.5rem, 3.6rem + 3vw, 6.5rem)` (≈72–104px).

### 1.2 Guard

Add `scripts/px-audit.mjs` (no new dependencies: plain Node `fs` + regex). It prints every arbitrary `-[NNpx]` in `src/**/*.tsx` and every `NNpx` in `src/**/*.css` that is not on the allow-list in rule 10, and exits non-zero above a threshold. Add `"audit:px": "node scripts/px-audit.mjs"` to `package.json`. **Target: 0 non-allowed px on the home, IKURO, HeyLane and Careers pages; report the remaining count elsewhere.**

### 1.3 Check

With Playwright (already installed as a dev dependency, or use the browser you used before), load home, `/ikuro`, `/heylane`, `/careers` at **320, 375, 414, 768, 1024, 1280, 1440, 1920** wide, plus **1280 wide with the root font at 200%** (`document.documentElement.style.fontSize='200%'`). Fail on any page-level horizontal overflow (`scrollWidth > innerWidth`), any visible text below 12px, or any interactive element smaller than 44×44. Save screenshots to `claude-code-tasks/round-4-audit-ikuro-heylane-responsive/qa/`.

---

## Phase 2: Home page fixes (audit findings)

### UX audit (Cowork, 20 Nov 2026)

```text
Scope: home page (/), branch redesign/home-v2 @ f235bc7, plus shared chrome (Navbar, TopBar, Footer, Logi, WhatsApp button)
Profile: missing — catalog defaults (WCAG 2.1 AA) + owner rules from this project
Install root: .claude/skills/ (taste-skill), plugin VectorLab UX skills
Evidence: Playwright screenshots at 375 / 768 / 1280 / 1440, axe-core (wcag2a, wcag2aa, wcag21aa, best-practice) at 375 and 1280, overflow scan, target-size scan, reduced-motion run, keyboard focus check

Hard gate
1 Banned aesthetics ............ FAIL  emoji icons (TechStack), multi-colour gradient quote marks, blur-[80px] glow blobs, 5 different eyebrow styles
2 Modal vs slide-over .......... pass  lead popup only opens from buttons (round 2)
3 Rename reserve ............... n/a
4 Destructive confirm .......... n/a
5 Verb-first copy .............. pass (minor: "See All Work", "View All Success Stories" Title Case)
6 Blur validation .............. n/a on home (check lead form in Phase 2.6)
7 Motion + reduced motion ...... FAIL  29 animations still running with reduced motion on
8 Page pattern ................. pass  marketing landing
9 375 overflow + targets ....... FAIL  no page overflow (scrollWidth 375), but 63 targets <44px at 375 and 74 at 1280; mobile menu button 24×24
10 Visual finish ............... FAIL  Logi covers the hero headline at 375; 34–36 text nodes at 10–11px; unreadable dashboard thumbnails
```

**axe at 375 / 1280 (excluding the dev-only Agentation toolbar):** `color-contrast` 26 nodes (serious), `button-name` 1 (critical, mobile menu), `heading-order` 2–3, `region` 2.

### Issues and fixes

Severity: **P0** = broken / false claim / accessibility blocker, **P1** = visible quality problem, **P2** = polish.

| ID | Sev | Issue (evidence) | Fix |
|---|---|---|---|
| H-01 | P0 | **Logi sits in the hero.** At 375 it covers the end of "business." in the h1; at 1280 it stands beside the headline. The owner said Logi must not be in the hero. | The hero is not a tour stop. While the hero is in view, Logi waits **docked** bottom-right (above the WhatsApp/scroll-top stack, never over hero text or CTAs) with the greeting bubble. The tour starts at the first section after the hero. Treat `h1`, hero `p`, and CTA rects as no-go zones in every section, not only via `AVOID`. |
| H-02 | P0 | **Logi shows the wrong line.** After scrolling down and back, the hero showed "Real words from real clients." (the testimonials line). | On every stop change, set the bubble text from the *current* stop. Clear the bubble when scrolling starts; show the new one only after scroll settles. |
| H-03 | P0 | **Mobile Logi has nowhere safe to stand.** At 375 every section is full-width text, so any tour stop overlaps content. | Under 48em, Logi stays docked in the corner (size from Phase 1 rule 11) and announces each section in its bubble as you scroll. It walks only when tapped, then returns to the dock. Keep page-to-page continuity. |
| H-04 | P0 | **Green text fails contrast.** `#00D162` on white is **2.04:1**; on the mint pill bg `#E6FAEF` it is **1.87:1**. 26 axe nodes: eyebrows, "off your plate", card outcome lines, "Contact us", "HeyLane or IKURO" links, price pills, IKURO headline words, outline marquee. White text on the green buttons is also **2.04:1**. | Keep `#00D162` as the brand **fill** colour. Add `--primary-ink: 148 100% 26%` (`#00853E`, 4.75:1 on white) and use it for all green **text**, links and icons on light backgrounds. Large display words (≥ `text-h2`) may stay `#00D162` only if they are decorative duplicates; otherwise use `--primary-ink`. Buttons: keep the green fill and change the label to near-black `#04130B` (**9.3:1**), or use `--primary-ink` as the fill with white text. Pick the dark label; it keeps the bright green the owner chose. |
| H-05 | P0 | **Unverifiable numbers.** "2x Faster Delivery" and "90% Client Satisfaction" (work strip) have no source. US/Canada buyers will read these as marketing filler. The IKURO block says "500+ Students Guided, 10+ Schools Connected, 15+ Expert Mentors, 100% Career Focused", but IKURO is pre-pilot. | Remove "2x" and "90%" unless the owner gives a source (`TODO(owner)`). Keep "30+ projects" and "25+ clients" only if true (`TODO(owner): confirm`). For IKURO, either attribute the numbers to their real origin ("Through TechXera and Chalk to Choice") or remove them (`TODO(owner)`). Drop "100% Career Focused" (not a metric). |
| H-06 | P0 | **HeyLane block is factually wrong.** The mock shows a stamp card "4 of 5 visits complete / 1 Free Coffee next" and "GST INVOICE Auto"; the copy says "automatic GST invoices". HeyLane uses **business-specific points that the customer exchanges for a member pass**, not stamp cards, and its docs say not to claim GST features. "Kalinga Café" sample data is not labelled. The right panel is mostly empty. | Rebuild the block per Phase 4.4 (home teaser). |
| H-07 | P0 | **`/products` breaks HeyLane's honesty rules.** It says customers "leave positive Google reviews" and the SEO description calls HeyLane a "Google Review growth suite". HeyLane rule: rewards are never conditional on a positive review. "Contactless loyalty SaaS … cardboard stamp cards" is also the old product. | Rewrite the HeyLane entry and its SEO text from Phase 4 copy. Link to `/heylane`. |
| H-08 | P0 | **Mobile menu button has no name** (axe `button-name`, 24×24). | `aria-label="Open menu"` / `"Close menu"`, `aria-expanded`, `aria-controls`; 44×44 hit area. |
| H-09 | P1 | **Tiny text.** 34–36 visible text nodes at 10–11px (solution card descriptions and bullets, hero stat card subs, price pills, footer meta); 18 paragraphs under 16px. | Apply Phase 1 type tokens. Card descriptions → `text-body-sm`, bullets → `text-body-sm`, pills/eyebrows → `text-label`. |
| H-10 | P1 | **Small targets.** Nav links 36px tall; top-bar email/phone 16px tall; top-bar socials 16×16; footer socials 40×40; inline links ("Contact us", "heylane.in", "See All Work") ~17–20px tall. | Phase 1 rule 9. |
| H-11 | P1 | **Dead social links.** Footer GitHub and X fall back to `href="#"`. | Remove socials that have no real URL (`TODO(owner)` to add later). |
| H-12 | P1 | **Hero art behind text on mobile.** At 375 the cubes and glass blocks sit directly behind "Less busywork." and lower legibility. | In `hero-bg-mobile.svg` usage, push the art to the top-left/bottom-right corners (or `mask-image` a soft clear zone behind the text column). Desktop is fine. |
| H-13 | P1 | **Five eyebrow styles** (spaced mono "SOFTWARE · AI AGENTS · AUTOMATION", pill with icon "WHAT WE DO", line-flanked mono "OUR WORK", dot-flanked "TESTIMONIALS", dot pill "TRUSTED BY"). | One eyebrow component: `text-label`, sans, medium, `--primary-ink`, no pill, no letter-spacing above 0.06em. Use it everywhere. |
| H-14 | P1 | **Testimonials look like another site.** Title Case heavy heading "What Our Clients Say" in a different weight, purple/pink/blue gradient quote marks, dotted grid decoration, star ratings with no source. | Sentence case h2 in the same type as other sections. Single green-ink quote glyph. Remove dotted grid. Remove stars (we have no rating source). Keep name, business and sector. `TODO(owner): confirm each quote is real and approved for use`. Rename CTA "Read client stories". |
| H-15 | P1 | **Solution thumbnails are unreadable** (full dashboards scaled to ~330px). | Crop each to one meaningful panel (stat row + chart) with `object-position`/a cropped export, in a browser frame like stageshow does. Keep the full image on the detail page. |
| H-16 | P1 | **Dead space.** Large empty bands between IKURO stats and HeyLane, above "Our work", around the outline marquee. Page height 13,779px at 375. | `py-section` tokens (Phase 1) and remove stacked margins. Target: ≤ 10,000px at 375 without removing content. |
| H-17 | P1 | **Reduced motion.** With `prefers-reduced-motion: reduce`, 29 animations still run (marquees, floating cubes, logo strip, Logi bob). Text is not hidden (good). | Under reduce: stop marquees (show a static row), stop floating/bobbing loops, Logi docks and only fades. Keep opacity fades. |
| H-18 | P1 | **Focus ring** is the browser default 1px. | Global `:focus-visible { outline: 2px solid hsl(var(--primary-ink)); outline-offset: 3px; }` and the white variant on dark sections. |
| H-19 | P1 | **Heading order.** `h4` under `h2` with no `h3` (hero stat cards, HeyLane mock, footer column titles). | Stat-card titles → `p`; footer column titles → `h2` with visual class (or `p` + `aria-labelledby` on the nav lists). |
| H-20 | P2 | **Landmarks.** Floating WhatsApp/scroll-top stack and Logi canvas sit outside landmarks (axe `region`). | Wrap them in `<aside aria-label="Quick actions">`. |
| H-21 | P2 | **Outline marquee** ("SOFTWARE DEVELOPMENT · AI AGENTS · …") is read by screen readers and fails contrast. | `aria-hidden="true"` (the words already appear in the services section). Use `text-display` token. |
| H-22 | P2 | **Emoji as icons** in `TechStack.tsx` (⚛ 🅰 📱 🦋 ☁ 🔥 🐳) and the 🇮🇳 flag in the footer. | Replace with plain text chips or proper brand SVGs placed in `src/assets/tech/` (**no new icon package without asking**). Footer: "Built in Odisha, India". |
| H-23 | P2 | **External runtime requests.** Google Fonts CSS from `fonts.googleapis.com` (render-blocking; blocked on some networks) and devicon SVGs from `cdn.jsdelivr.net` in `FloatingCodeSymbols.tsx`. | Self-host fonts (`@fontsource/*` is a new package: **ask first**, or download the woff2 files into `public/fonts/` and add `@font-face`). Download the few devicon SVGs into `src/assets/tech/` or drop the component. |
| H-24 | P2 | **Console noise.** `motion() is deprecated. Use motion.create()`; React Router v7 future-flag warnings. | Use `motion.create()`; set `future={{ v7_startTransition: true, v7_relativeSplatPath: true }}` on `BrowserRouter`. |
| H-25 | P2 | **Footer "Solutions" list** ("Experience Design", "Motion Design", "Growth Engineering") does not match the four services. | List: Software development, AI agent development, Business automation, AI software, Ready-made solutions. Point each to its page (or `/solutions#…` until the service pages exist in a later round). |
| H-26 | P2 | **IKURO and HeyLane blocks on home** use Logisaar green only, so they don't read as separate brands. | Show the real logo in each block (`ikuro-lockup-tagline.webp`, `HeyLane-Horizontal.svg`) and a thin accent in the product's own colour (IKURO `#FA482E`, HeyLane `#007F5F`). The rest of the block stays in Logisaar style. |
| H-27 | P2 | **Logi chat region** is `role="dialog"` + `aria-hidden` while closed. | When closed, use `hidden` or `inert` so nothing inside is focusable. Focus moves into the chat on open and returns to Logi on close. |

**Re-run the same checks after the fixes** (axe 0 serious/critical outside the dev-only Agentation toolbar; 0 page overflow; 0 targets < 44px; 0 text < 12px; Logi never intersects `h1`, hero `p` or CTAs at any width in the Phase 1.3 list). Agentation is dev-only (`import.meta.env.DEV`), so it doesn't need fixing; just confirm it is absent from `npm run build` output.

---

## Phase 3: IKURO page in IKURO colours (`/ikuro`, `src/pages/TechXera.tsx`)

Rename the file to `src/pages/Ikuro.tsx` (update the import in `App.tsx`; keep the `/techxera` redirect). It is 2,252 lines: split it into `src/components/ikuro/*` sections and move data into `src/data/ikuro.ts`.

### 3.1 Theme scoping (don't fork the design system)

Wrap the page in `<div data-theme="ikuro">`. In `src/index.css` add a scoped override of the shadcn CSS variables, so every `Button`, `Badge`, `Card` etc. inside picks up IKURO colours automatically:

```css
[data-theme="ikuro"] {
  --ikuro-orange: 8 95% 58%;        /* #FA482E  marks, large display words, fills behind navy text */
  --ikuro-orange-ink: 8 73% 49%;    /* #D93A22  4.6:1 on white: small orange text, links, button fill with white label */
  --ikuro-navy: 240 17% 14%;        /* #1E1E2A  ink, dark sections */
  --ikuro-cream: 30 33% 98%;        /* #FCFAF8  page background (warm off-white) */
  --ikuro-sand: 20 40% 95%;         /* #F8EFEA  soft section band, pill backgrounds */

  --primary: var(--ikuro-orange-ink);
  --primary-foreground: 0 0% 100%;
  --primary-ink: var(--ikuro-orange-ink);
  --background: var(--ikuro-cream);
  --foreground: var(--ikuro-navy);
  --secondary: var(--ikuro-sand);
  --ring: var(--ikuro-orange-ink);
  --accent: var(--ikuro-orange);
}
```

- **Contrast:** `#FA482E` on white is 3.48:1, so use it only for large display text (≥ `text-h2`), the logo, icons ≥ 24px, and fills. White on `#FA482E` also fails for normal text: buttons use the `#D93A22` fill with a white label (4.59:1), or the `#FA482E` fill with a navy label (4.73:1).
- **Dark band:** navy `#1E1E2A` with white text and `ikuro-logo-white` / `ikuro-lockup-tagline-white`.
- **No Logisaar green inside the IKURO page**, except the Logisaar logo in the shared header/footer and Logi (Logi is the Logisaar guide and stays green).
- Remove `bg-gradient-primary`, `shadow-glow*`, and every `blur-[80px]` glow blob on this page.
- Fonts: keep the site fonts. Headings may use a rounder weight to echo the wordmark, but don't add a font without asking.
- Motif: the logo's **winding path** and **four-point star**. Use them once each, as real SVG (draw your own simple path that follows the decision loop; do not trace or redraw the logo). Example: a single S-shaped path line that draws on scroll through the "How IKURO thinks" loop and ends at a small 4-point star.

### 3.2 Content (source: project doc `claude/ikuro-brief.md`, from the IKURO Founder Deck v1.0)

IKURO is **in development**. Be honest about stage everywhere: "In development · pilots start with first-year engineering students". No user counts unless the owner confirms them.

Section order:

1. **Hero** (navy text on cream, centred like the home hero): `ikuro-logo.webp` (the full lockup includes the tagline; don't repeat the tagline as text right under it), h1 "Better decisions for every student", lead "IKURO is an AI-powered student decision platform by Logisaar. It understands your goals, reasons through your options and helps you choose your next course, college, skill, internship or career step." Status chip "In development · pilot with first-year engineering students". CTAs: "Join the pilot" (opens the existing lead form with `source: "ikuro-pilot"`), "For colleges" (scrolls to 6).
2. **The problem**: "Students don't lack information. They lack clarity." Short line + a faux UI of 8 scattered tabs (video, chatbot, job board, internship portal, seniors, search, social, coaching) converging into one IKURO card. Use the stageshow skill for the faux UI.
3. **How IKURO thinks** (the loop, the page's one orchestrated scroll moment): Understand → Reason → Recommend → Reflect → Grow. Contrast line: "Most AI answers a question. IKURO starts from your context." The winding path draws through the five steps. Reduced motion: show the full path and all five steps at once.
4. **What it helps you decide**: 6 cards: Course, College, Skills, AI tools, Internships, Career. One sentence each.
5. **Chalk to Choice**: keep the existing Chalk to Choice section and its form/flows, restyled in IKURO colours. Label "Part of IKURO · Class 11 & 12".
6. **For colleges**: dashboards for student insight and placement readiness. "College pilots begin in 2026." CTA "Talk to us about a pilot".
7. **Trust**: "We don't sell student data." One short paragraph. `TODO(owner): link to the IKURO privacy page when it exists`.
8. **Pricing (planned)**: only if the owner confirms. Deck says Free plan + Pro ₹149/month or ₹999/year. Ship this section behind a constant `SHOW_IKURO_PRICING = false` with `TODO(owner): confirm pricing before showing`.
9. **TechXera community programmes**: the existing courses/programmes section ("Pick a program that fits you"), moved here, retitled "TechXera programmes", with a one-line note "TechXera, our student community, is now part of IKURO". `TODO(owner): confirm these programmes are still offered`.
10. **Closing band** (navy): "Every great future begins with one better decision." CTA "Join the pilot".

- Contact on this page: use `src/lib/contact.ts` (the single site contact). Don't use the deck's phone/email.
- SEO: title "IKURO: AI student decision platform by Logisaar", description from section 1 lead. Keep the `/techxera` redirect and add `og:image` = `ikuro-logo.webp` on cream.
- Logi lines on this page: "IKURO helps students decide.", "This loop is how it thinks.", "Chalk to Choice is for Class 11 and 12.", "Colleges can pilot it too."

---

## Phase 4: HeyLane page in HeyLane colours (new route `/heylane`)

Today HeyLane only appears as a block on home and an entry on `/products`, and both describe an old stamp-card product. Build a proper product page that explains HeyLane and sends people to **heylane.in** (customers) and **business.heylane.in** (businesses). This page is Logisaar telling the HeyLane story, so it follows **HeyLane's own rules** (its `CLAUDE.md` and `docs/01-PRODUCT.md`).

### 4.1 HeyLane rules that apply here (non-negotiable)

- **Logo:** only the SVGs in `public/brand/heylane/`, unchanged. `HeyLane-Horizontal.svg` on light, `HeyLane-Horizontal-Reverse.svg` on night green. Never retype, recolour, stretch or redraw it.
- **Honesty:** no ratings, user counts, testimonials, ROI or "100% safe" claims. **Rides, Wallet and SOS are planned** ("Coming soon"). Sample data in any UI is labelled **"Sample"** or **"Illustrative"** as a small tag *inside* the frame. Never show a rupee-to-points formula. Rewards are never conditional on a positive review. Never show a percentage "match" score.
- **Prices:** exactly as in `docs/01-PRODUCT.md` (below). No discounts, no "most popular", no strikethrough.
- **Copy rules:** sentence case, no exclamation marks, no trailing periods on headings/labels/buttons, no hype words.
- **No GST-filing, hardware, KDS, EHR or channel-manager claims.**
- **Visuals:** product-led faux UI (use the **stageshow** skill), real photos only for the categories strip. No gradient blobs, glows, emoji icons or isometric clip-art.

### 4.2 Theme scoping

Wrap the page in `<div data-theme="heylane">` and load the HeyLane fonts only on this route (`@font-face` for `public/fonts/heylane/*.woff2`, `font-display: swap`, preload the Bricolage file on this route only).

```css
[data-theme="heylane"] {
  --hl-night: #0b3328;  --hl-night-2: #0f3e31;
  --hl-emerald: #007f5f; --hl-emerald-deep: #00684e;
  --hl-mint: #ddede4;   --hl-paper: #f4f3ee;  --hl-card: #ffffff;
  --hl-ink: #0d1714;    --hl-ink-2: #4a5651;  --hl-ink-3: #5e6964;
  --hl-line: #dee2dc;   --hl-gold: #f5b321;   --hl-gold-deep: #8f6200;
  --hl-sos: #b53832;
  --hl-radius-control: 0.75rem; --hl-radius-card: 1.5rem; --hl-radius-card-lg: 2rem;
  --hl-ease: cubic-bezier(0.16, 1, 0.3, 1);
  /* map shadcn vars (HSL triplets) so shared components follow */
  --primary: 165 100% 25%;           /* emerald */
  --primary-foreground: 0 0% 100%;
  --background: 51 18% 94%;          /* paper */
  --foreground: 160 26% 7%;          /* ink */
  --ring: 165 100% 25%;
  font-family: "Geist", system-ui, sans-serif;
}
[data-theme="heylane"] :is(h1, h2, h3, .hl-display) { font-family: "Bricolage Grotesque", "Geist", sans-serif; letter-spacing: -0.02em; }
```

- **Contrast pairs (checked):** emerald on white 5.0:1 and on paper 4.5:1 (body text OK); gold on night 7.48:1 (primary CTA on dark: **gold fill with night text**); white on night 13.8:1; ink-2 on paper 6.9:1. **Never** gold text on white/paper (1.66–1.85:1); never emerald text on night (2.77:1); use white or mint there.
- Display tracking never tighter than −0.035em.

### 4.3 Sections (copy is HeyLane's approved copy unless marked)

1. **Hero** (night green band, white text): `HeyLane-Horizontal-Reverse.svg`, chip "Launching in Bhubaneswar", h1 "Your city remembers you", lead (approved): "The cafés, salons, stays and shops you keep going back to, finally treating you like a regular. Points that become member perks, opinions from people you actually know, and a direct line to every place." CTAs: **"Get early access"** (gold, → `https://heylane.in`) and **"For businesses"** (outline white, → `https://business.heylane.in`). Small line: "A Logisaar product". Visual: a phone faux UI (stageshow) showing a place card with a "Sample" tag.
2. **Two sides, one app** (paper): two cards. *For people*: discover places, see what your contacts think first, chat with the place, collect points that turn into member passes. *For businesses*: billing and stock, get found locally, chat with customers, keep regulars coming back. Each card links to its site.
3. **How it works** (approved): "One app for every place you love" with the three steps "Drop a pin. Find your place", "Ask your people, then chat", "Come back. Get rewarded". Pinned phone on desktop, stacked on mobile. One orchestrated ScrollTrigger moment; reduced motion shows all three steps.
4. **Seven kinds of places** (approved title "Seven kinds of places. One app"): Cafés, Restaurants, Stays, Grocery & Kirana, Pharmacies, Clinics, Salons, with the customer lines from `01-PRODUCT.md` and photos from `public/images/heylane/places/` (`<picture>` with avif/webp, 640/1280). Salons must show men's and unisex photos (both exist). Photo hover zoom 1.02–1.03 inside the frame.
5. **Lane Vibes** (approved title "Strangers give stars. Friends give reasons"): faux UI showing "From your contacts" first, then community reviews; tag "Illustrative". No % match.
6. **Points and member passes** (approved title "Collect places, not just points"): points are per business and are not money; the customer chooses to exchange points to start a pass. Show the **Sample** programme exactly: 1,000 points · 12 months · 10% off eligible bills · minimum bill ₹300, tagged "Sample". No rupee-to-points formula.
7. **HeyLane Chat for businesses** (business side): chat, billing and loyalty in one product; on Lane Pro each chat shows the visit count and member badge. Faux chat UI tagged "Sample".
8. **Plans** (business), exact values, "per business, per year, plus applicable taxes":

   | Lane Base | Lane Growth | **Lane Pro** (Best value) | Custom |
   |---|---|---|---|
   | ₹8,500 · about ₹23 a day · Run your counter | ₹10,899 · about ₹30 a day · Start your loyalty programme | ₹12,000 · about ₹33 a day · Turn customers into regulars | Let's talk · Built around you |

   Feature bullets exactly as the `PLANS` block in HeyLane `docs/02-COPY.md`. Pro is the visually dominant card with "Best value", "Only ₹1,101 more than Growth", and the 5×, 4× and 3× tags; on mobile Pro comes first. Say nothing about bill limits. CTA on every card → `https://business.heylane.in` (pricing section). `TODO(owner): tax wording`.
9. **Coming soon** (muted, clearly labelled): Rides (fare shown before you confirm, no added booking fee; drivers pay one fixed monthly platform fee and no per-trip commission; **no amount**), Wallet, Safety (SOS, trip sharing, trusted contacts). Every card carries a "Coming soon" tag. No "100% safe".
10. **Made in Bhubaneswar** (approved "Made in Bhubaneswar. Starting here"): rollout Bhubaneswar now → across Odisha within a year → other states next. **No dates.**
11. **Closing band** (night): HeyLane wordmark (reverse SVG), "Get early access" (gold → heylane.in) and "See plans for business" (→ business.heylane.in). Footer stays the Logisaar footer.

- SEO: title "HeyLane: neighbourhood app for local places and businesses | Logisaar", description from section 1. `og:image` from `HeyLane-Horizontal.svg` rendered on paper (export a 1200×630 PNG with sharp).
- Add `/heylane` to the navbar (Products menu), footer, sitemap and Logi tour. Logi lines here: "HeyLane is made by Logisaar too.", "Points turn into member passes.", "Lane Pro shows visit counts in every chat." (Never imply popularity or usage data.)
- External links open in a new tab with `rel="noopener"` and an "opens in a new tab" visually hidden note.

### 4.4 Fix HeyLane everywhere else

- **Home HeyLane block (H-06):** keep the Logisaar section style, but replace the mock with a small stageshow phone/browser showing a member pass ("Sample" tag): place name, points balance, "Exchange 1,000 points for a 12-month pass". Copy: "We don't just build for clients. We build our own." + "HeyLane is our neighbourhood app for Bhubaneswar: people find local places and hear from their own contacts first; businesses get billing, chat and a loyalty programme in one product." CTAs "Explore HeyLane" (→ `/heylane`) and "heylane.in" (external). Remove every GST mention.
- **`/products` (H-07):** rewrite the HeyLane entry and its SEO with the same facts. No Google-review language.
- Search the whole repo for `stamp`, `Google review`, `GST invoice`, `contactless loyalty`, `ScanLoyal` and fix any HeyLane mention that conflicts with `01-PRODUCT.md`.

---

## Phase 5: QA and summary

1. Run the Phase 1.3 viewport/zoom script on home, `/ikuro`, `/heylane`, `/careers`, `/products`.
2. Run axe on the same pages at 375 and 1280. Target: 0 critical/serious.
3. `npm run audit:px`: report the counts.
4. Reduced-motion run on each page: nothing hidden, no looping animation.
5. Use the taste-skill checker scripts (`gate.mjs`, `consistency.mjs`, `copy-lint.mjs`) on the three pages and report their flags. For `/heylane`, the scroll-linked/pinned flags are expected (HeyLane owner decision).
6. Commit screenshots (375 and 1280 per page) to `claude-code-tasks/round-4-audit-ikuro-heylane-responsive/qa/`.
7. Summary: what changed per phase, every `TODO(owner)`, anything you could not do and why.

# Round 6: hide Portfolio, redesign About, redesign Solutions

Read `CLAUDE.md` first. Branch `redesign/home-v2`.

- Work phase by phase.
- After each phase: lint, typecheck and build, then commit `round6-phaseN: <summary>`.
- Ask before deleting any file or adding a package.
- Write `TODO(owner):` for every fact you can't confirm, and list them all at the end.

Cowork reviewed `/about` and `/solutions` at 375 and 1280 on 20 Nov 2026 (after `b05c619`). The findings are below each phase.

---

## Phase 1: Hide Portfolio (keep it live for SEO only)

**Owner decision:** `/portfolio` stays as a working, indexable page. No visible link to it anywhere on the site.

1. **Keep:**
   - the route in `App.tsx`;
   - `src/pages/Portfolio.tsx`;
   - its `<SEO>` (indexable, no `noindex`, canonical `https://www.logisaar.in/portfolio`);
   - its entry in `public/sitemap.xml`.
   Make sure it is **not** listed in `robots.txt` as disallowed.
2. **Remove every visible link to `/portfolio`.** The current files are `Navbar.tsx` (About dropdown / active state), `Footer.tsx`, `pages/Index.tsx` ("See All Work"), `home/FeaturedProjects.tsx` ("View all projects", "View all"), and `home/TestimonialsSection.tsx`. Grep again for `/portfolio` and `"portfolio"` to catch anything missed: menus, Logi `answers.ts`, the lead modal, the 404 page, the service pages.
   - Replace each CTA with something useful. "See All Work" → "Start a project" (`/contact`) or remove it. Testimonials CTA → remove or "Talk to us".
   - In the Navbar, the About dropdown may become a plain "About" link if only one item is left.
   - Keep the `/portfolio` path in the About active-state check, so the header still highlights correctly if someone lands there from search.
3. **Logi:** not a tour target on other pages, and no line that mentions the portfolio.
4. **Check:**
   - `grep -rn "/portfolio" src` shows only `App.tsx`, `Portfolio.tsx`, and the active-state check.
   - Crawl all routes with Playwright and assert no `a[href*="portfolio"]`.
5. Note in your summary: Google may rank a page that has no internal links lower. That is expected; the owner accepts it.

---

## Phase 2: About page redesign (`/about`)

### What's wrong today

| # | Issue |
|---|---|
| A1 | Hero is left-aligned with a blue/purple gradient wash. The site style is a centred hero, green and white. |
| A2 | The positioning is mixed. "Why Logisaar exists" lists students' skills and developers' problems next to businesses. A US/Canada buyer can't tell what we sell. |
| A3 | **Numbers contradict each other:** home "30+ projects", Solutions "15+ projects deployed globally", About story "15+", About timeline "10+ projects (Nov 2025)". |
| A4 | The timeline says "IKURO launched 2025 in Nalanda as a programming club". **Owner fact:** it launched in 2025 as **TechXera**, a programming club at Nalanda, and **TechXera was renamed IKURO in November 2026**, when it became the AI student decision platform (in development). The timeline must show both steps. "2026: Expanding globally" is unsupported. |
| A5 | "What we build" is eyebrowed "Portfolio" and lists vague items ("AI Research: LLMs, future products"). It also lists "Hyperlocal Community App (Name TBA)" next to HeyLane, which reads like a duplicate. |
| A6 | Founders appear twice (story paragraph + founder cards). The quotes are hype ("integrate AI seamlessly"). Chinmay's title differs across the site ("Managing Director & CEO" here; elsewhere "Founder & Director" / "Founder & CEO"). |
| A7 | Five eyebrow styles (mono "WHO WE ARE", pills "Purpose", "Portfolio", "Our Story", "Our Vision", mono "TIMELINE", "PRINCIPLES"), Title Case headings, and 12–13px card text. |
| A8 | The pinned dark "Our journey" timeline leaves a large blank white band after it in a full-page capture. Check the ScrollTrigger pin spacing and `refresh()` after images and fonts load. |

### New structure (Logisaar style; keep the GSAP/Framer motion, one orchestrated moment per section)

1. **Hero** (centred):
   - Eyebrow "About Logisaar".
   - h1 "Engineers from Odisha, building software that does real work".
   - Lead: "Logisaar Technologies builds custom software, AI agents and business automation for growing businesses, and makes its own products, IKURO and HeyLane. We started in September 2025 and work from Bhubaneswar."
   - Use the home hero background treatment, toned down. No gradient wash.
2. **At a glance** (one quiet strip of 4 facts):
   - Founded September 2025
   - Registered in Cuttack, Odisha
   - Team in Bhubaneswar
   - **Projects delivered:** one number, shared with home and Solutions from a new `src/data/company.ts`. `TODO(owner): confirm the one true number`; use 30+ until confirmed, since it's on home.
   Add the CIN in small text.
3. **Why we exist** (business-first). Copy: "Most small and growing businesses run on spreadsheets, WhatsApp and memory. Enterprise software is too big and too expensive for them, and off-the-shelf apps don't fit how they work. We build the right-sized version and stay around after launch."
   Add one secondary line for education: "We also help students make better decisions through IKURO." Link it to `/ikuro`.
4. **What we do**:
   - Four service cards (Software development, AI agent development, Business automation, AI software). Each card links to its anchor on `/solutions` (Phase 3).
   - **Our products** row: IKURO and HeyLane cards with their real logos and a thin accent in their own colour, linking to `/ikuro` and `/heylane`.
   - Remove "AI Research" and "Hyperlocal Community App (Name TBA)": `TODO(owner): show the community app or not`.
5. **Founders** (merge the story paragraph and cards into one section):
   - Existing photos if they are real; otherwise initials avatars. **Don't generate faces.**
   - Name, title (`TODO(owner): Chinmay's title: "Founder & CEO", "Founder & Director" or "Managing Director & CEO"`; use the same everywhere), two-line focus, LinkedIn link if the owner gives one.
   - Remove the hype quotes.
6. **Our journey** (keep the pinned horizontal timeline animation; fix the facts, and fix the blank band from A8):
   - Sep 2025: Logisaar founded.
   - Late 2025: First client projects delivered. No number unless confirmed.
   - 2025: TechXera launched as a programming club at Nalanda, bridging academics and industry.
   - Nov 2026: TechXera renamed **IKURO** and rebuilt as an AI student decision platform (in development; pilots with first-year engineering students). Chalk to Choice is part of it.
   - 2026: HeyLane launching in Bhubaneswar; hiring.
   - No "expanding globally".
   - **Reduced motion:** show all milestones as a static list.
7. **How we work** (replaces "Values"; 4 short points). Each needs owner confirmation, so add a `TODO(owner)` on each:
   - Fixed quote before we start
   - Weekly demos while we build
   - You own what we build for you
   - Support after launch
8. **Hiring band:** "We're hiring in Bhubaneswar". Link to `/careers`. Then the standard contact CTA.

SEO title: "About Logisaar | Software, AI agents and automation from Odisha". Logi lines per section, short.

---

## Phase 3: Solutions page redesign (`/solutions`)

### What's wrong today

| # | Issue |
|---|---|
| S1 | Hero is left-aligned. The chip "15+ Projects Deployed Globally" is unsupported and conflicts with other pages. |
| S2 | The h1 "Productized software & custom AI models": we don't sell custom-trained models. The four core services (software development, AI agents, business automation, AI software) don't appear on the page at all. |
| S3 | **Unverified outcome claims:** "Reduce staff workload by 60%", "Close clients 3x faster", "Digital e-signature (legally valid in India)", "GPT-4o custom fine-tuning", "Bilingual English + Odia". |
| S4 | The cards are very long (6 bullets, a tech stack, two CTAs). Labels like "Request Details / Order via WhatsApp" and the mono "EXPLORE DIRECT LINK" are hard to scan. The category tags (Education, Hospitality…) are low-contrast text over photos. |
| S5 | Prices live in several places (home cards, Solutions cards, detail pages) and can drift. |
| S6 | Same eyebrow, mono and Title Case problems as the rest of the site. The page is 11,383px tall at 375. |

### New structure

1. **Hero** (centred):
   - Eyebrow "Solutions".
   - h1 "Software, AI agents and automation, built around your business".
   - Lead: "Start from one of our ready-made systems or have us build exactly what you need. Either way you get a clear plan and a fixed quote first."
   - CTAs: "Start a project" (`/contact`) and "See ready-made solutions" (scrolls to section 3).
2. **Four services**, each a section block with an `id` anchor: `#software-development`, `#ai-agents`, `#business-automation`, `#ai-software`.
   - Each block contains:
     - one-line promise (reuse the home "Four ways" copy);
     - what it is;
     - 3–4 typical examples;
     - what you get (deliverables);
     - a faux UI vignette (stageshow skill, Logisaar colours, "Sample" tag if it shows data);
     - CTA "Discuss your project".
   - Update the footer Solutions links (H-25) and the About cards to point to these anchors.
3. **Ready-made solutions** (the "product menu"):
   - **One data source:** move all solution data (name, slug, industry, one-line outcome, starting price, monthly fee, detail route, image) into `src/data/solutions.ts`. Use it on home, `/solutions` and every `src/pages/solutions/*` page.
   - Report any price mismatches you find while merging, and **don't change any price value**. If two values conflict, keep the detail-page value and add a `TODO(owner)`.
   - **Filter chips by industry:** All, Education, Hospitality, Sales, Customer service, Food & beverage, Travel, Agencies & freelancers, Any business. Chips are keyboard-operable and use `aria-pressed`. Filtering animates with Flip/layout only (transform/opacity).
   - **Compact cards (one card family):**
     - cropped product image in a browser frame;
     - an industry tag inside the frame on a solid chip (passes contrast);
     - name;
     - one-line outcome **without numbers we can't prove**;
     - "From ₹X" (+ "₹Y/month" where it exists);
     - two actions: "View details" (detail page) and "Ask on WhatsApp" (prefilled text naming the solution).
   - Move feature bullets and tech stacks to the detail pages.
   - **Claims review on all solution data and the 9 detail pages (don't silently delete):**
     - For every S3 claim, add it to `claude-code-tasks/round-6-about-solutions-portfolio/CLAIMS.md`. Record the claim, the page it is on and a proposed safe wording. Example: "Reduce staff workload by 60%" → "Cuts manual booking and billing work"; "legally valid e-signature" → "Digital e-signatures".
     - On the site, use the safe wording for now behind a constant (`SHOW_PROVEN_CLAIMS = false` in `src/data/solutions.ts`). Keep the original claim text in the data too. When the owner confirms a claim with proof (a client result he can cite, or a provider's documentation), it can be switched back on per claim.
     - list third-party tools only as "works with" integrations, not as our own technology.
4. **How a project works** (4 steps, the page's one scroll-drawn line):
   1. Free call
   2. Clear plan and fixed quote
   3. Build with regular demos
   4. Launch and support
   Keep these consistent with About section 7 and the Contact page's "what happens next".
5. **Ways to work with us** (3 cards, `TODO(owner)` to confirm wording):
   - Ready-made + customised
   - Custom project
   - Monthly support / AI agent subscription (only the monthly fees that already exist in the data)
6. **FAQ** (4 items, `TODO(owner)` each) + the standard contact CTA.

SEO title: "Solutions | Custom software, AI agents and business automation | Logisaar".
Keep the existing solution detail routes unchanged.

---

## Phase 4: QA

- Playwright on `/about`, `/solutions`, `/portfolio` (direct load), home and one solution detail page:
  - widths 320–1920, plus 200% root font;
  - no overflow;
  - header never covers text;
  - no text under 12px;
  - targets at least 44px.
- axe at 375 and 1280: 0 serious/critical.
- Reduced motion: timeline is a static list, filter works without animation.
- `npm run audit:px` does not regress.
- The link crawl from Phase 1.4 passes.
- Run the taste-skill `consistency.mjs` and `copy-lint.mjs` on `/about` and `/solutions`.
- Screenshots (375 and 1280) go in `qa/`.
- Update `CLAUDE.md` → Status table (round 6 done) and add the Portfolio rule under "Quality rules": *"/portfolio is hidden: indexable and in the sitemap, but never linked."*
- Summary: changes per phase, the price-mismatch report, and every `TODO(owner)`.

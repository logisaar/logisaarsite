# Claude Code task files

Each round of work for Claude Code lives in its own folder. Do the rounds in order; each file is self-contained.

- `round-1-redesign/REDESIGN_BRIEF.md` — phases 1–5: fixes, assets, home copy, Logi, Careers (done)
- `round-2-fixes/ROUND2_FIXES.md` — new logo, missing images, Logi auto-tour, footer CTA removal
- `round-3-logi-redesign/ROUND3_LOGI.md` — plush Logi in the OpenDots style (art in `public/logi/`)

New rounds go in `round-3-.../`, `round-4-.../` and so on.

## Round 4: home audit, IKURO theme, HeyLane theme, responsive units
Folder: `round-4-audit-ikuro-heylane-responsive/`
- `ROUND4.md`: five phases. (1) Site-wide responsive units (rem/clamp/svh/em breakpoints, px audit script). (2) The 27 home-page audit fixes, H-01 to H-27. (3) The `/ikuro` page in IKURO colours. (4) A new `/heylane` page in HeyLane colours, following HeyLane's honesty and price rules. (5) QA.
- `audit/`: evidence screenshots from the Cowork audit.
- Assets added for this round: `public/brand/ikuro/`, `public/brand/heylane/`, `public/fonts/heylane/`, `public/images/heylane/places/`.

## Round 5: header overlap fix + Contact redesign
Folder: `round-5-header-contact/`
- `ROUND5.md`:
  1. Fix the fixed header overlapping page content: one `--header-h` variable, Layout reserves the space, solid header bar at the top, z-index scale.
  2. Redesign the Contact page: centred hero, three contact cards, accessible project form with inline success and failure states, "what happens next", office, FAQ.
  3. QA.
- Root `CLAUDE.md` now holds the standing project context for Claude Code (read it after `/clear`).

## Round 6: hide Portfolio, About redesign, Solutions redesign
Folder: `round-6-about-solutions-portfolio/`
- `ROUND6.md`:
  1. Unlink `/portfolio` everywhere. It stays live, indexable and in the sitemap.
  2. Redesign About: one business-first story, fixed facts, a single project count.
  3. Redesign Solutions: four service anchors, ready-made solutions from one data file with filters, an honesty sweep.
  4. QA.

## Round 7: Solutions visual redesign
Folder: `round-7-solutions-visual/`
- `ROUND7.md`:
  1. Inner-page headline scale (`text-h1-page`).
  2. Solutions page: two-line hero with a jump bar, a pinned service explorer with animated demos, a calmer solution grid, and a horizontal process timeline.
  3. QA.
- `evidence/`: screenshots of the current problems.

## Round 8: visual polish site-wide
Folder: `round-8-visual-polish/`
- `ROUND8.md`, seven phases:
  1. Global spacing, pinned-section blank fix, opaque Products dropdown, one alignment system.
  2. Real-looking demo kit.
  3. Solutions GSAP service transitions.
  4. Home redesign items (bento "What we do", IKURO decision-path SVG, real HeyLane phones).
  5. HeyLane page with the real app screens.
  6. About: founders story instead of photos.
  7. QA.
- `evidence/`: screenshots of each problem, including the owner's.
- Assets: `public/images/heylane/app/` (real app screens, icons, pins from the HeyLane design handoff).

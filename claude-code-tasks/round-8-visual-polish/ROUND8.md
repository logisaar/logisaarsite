# Round 8: visual polish across the site (real-looking demos, real HeyLane app, spacing, alignment)

Read `CLAUDE.md` first. Branch `redesign/home-v2`, after `3b703d6`.

**How to work this round:**
- This is a large round. Do it phase by phase.
- After each phase, run `npm run lint && npx tsc --noEmit && npm run build`, then commit `round8-phaseN: <summary>`.
- If context runs low, stop at a phase boundary. Update the round-8 line in the `CLAUDE.md` status table with the last finished phase, so the next session can continue after `/clear`.

**Standing rules from `CLAUDE.md`:**
- Ask before adding a package or deleting a file.
- No copy, price or data changes unless this brief says so.
- `TODO(owner)` for any unknown.

Evidence (Cowork, 21 Nov 2026, 1280 and 375 wide) is in `evidence/`. The files whose names start with `owner-` are the owner's own screenshots.

## Owner's feedback (verbatim intent)

1. The Solutions samples don't look like real software. The SVGs and demos must look and feel real.
2. Switching between Software development, AI agents, Business automation and AI software needs proper GSAP animation, and the four sections must be clearly distinguished.
3. HeyLane must look like the real HeyLane app.
4. Home and About have the same alignment problems as Solutions, with too much blank space.
5. About: no founder photos. Tell the founders' story instead.
6. Home "What we do / Four ways we take work off your plate" must be more visually appealing.
7. Redesign the home IKURO animation/asset (green graduation cap with orbiting cards).
8. Home HeyLane block: the phone must look like the HeyLane app.
9. Find everything on home that makes it unappealing.
10. The Products dropdown in the navbar is not properly visible.
11. Contact and Careers have too much white space between content.

## Assets added for this round

- **`public/images/heylane/app/`**: real HeyLane customer-app screens from the owner's design handoff (`D:\claude outputs folder\HeyLane\HeyLane-App-Design-Handoff`, V4 final).
  - Each screen comes in three versions: `<name>-390.webp` and `<name>-780.webp` are first-screen crops at the phone aspect ratio; `<name>-full-780.webp` is the full scroll.
  - **Screens:**

    | File | Screen |
    |---|---|
    | `01-opening-4-welcome` | Welcome |
    | `07-home-with-booking`, `07b-home-no-booking` | Home |
    | `08-lane-maps-explore`, `08c-lane-maps-place-selected`, `08d-lane-maps-night` | Lane Maps |
    | `09-place-page` | Place page |
    | `10-lane-vibes` | Lane Vibes |
    | `11-rides-coming-soon` | Rides, coming soon |
    | `12-chat-list`, `13-chat-thread` | Chat |
    | `14-passes` | Passes |
    | `15-pass-at-counter` | Pass shown at the counter |

  - Also copied: `icons/` (HeyLane duotone, on-dark and outline SVG icons) and `pins/` (Lane Maps pin SVGs).
- **Read in the handoff folder** (read-only, don't copy everything):
  - `README.md`
  - `docs/01-design-language.md`
  - `docs/07-pass-card-and-points.md`
  - `docs/10-content-and-honesty-rules.md`
  - `01-design-tokens/tokens.css`
  - `03-components-png/` (pass-card and tab-bar references)
- **Honesty (from handoff doc 10):** a few things in these screens are "proposed in V4, needs owner approval": structured chat cards ("Table held"), status tags on chat rows, the live pass at the counter, and points-ring avatars.
  - You may show `12-chat-list`, `13-chat-thread` and `15-pass-at-counter`, but put each behind a flag in `src/data/heylane.ts` (`SHOW_PROPOSED_SCREENS = true`) with `TODO(owner): approve showing proposed V4 features`.
  - Every screen shown on the site carries a small "Sample" chip (sample data) **inside the device frame**.
  - "Rides" always carries "Coming soon".
- **Real Logisaar product screenshots** already in the repo: `public/images/mockups/{school-erp, hotel-management, ai-receptionist, smart-crm}-{800,1600}.{avif,webp}`. These are real dashboards. Use them as the base layer of the Software and AI agent demos (Phase 3).

---

## Phase 1: Global fixes (spacing, dropdown, alignment system)

### 1.1 White space (Home, About, Solutions, Contact, Careers, IKURO, HeyLane)

**Cause:**
- `py-section` is `clamp(4rem, 3rem + 5vw, 8rem)`, which is about 112px top **and** bottom at 1280, so about 224px between sections.
- Many sections add `mb-16`/`mt-16` on their header and `min-h` on wrappers on top of that.
- Several pinned sections leave empty spacer height.

**Fix:**
1. Tokens:
   - `section: clamp(3rem, 2rem + 3.5vw, 5.5rem)`
   - `section-sm: clamp(2.5rem, 2rem + 2vw, 4rem)`
   - New `section-head: clamp(2rem, 1.5rem + 1.5vw, 3rem)`: the gap between a section header and its content. Use it everywhere instead of `mb-12`/`mb-16`/`mb-20`.
2. Remove stacked margins. A section's only vertical spacing is its own `py-section`. Children don't add top/bottom margins at the section edge.
3. Two adjacent sections with the **same background** get `pt-0` on the second (or merge them), so there's never a double gap.
4. Two pages need restructuring:
   - **Contact:** put the three contact cards and the form section on one background, as one section with `gap-section-head`. Put "Our office" and the FAQ in one two-column section on desktop: office on the left, FAQ on the right.
   - **Careers:** the hero → roles gap and the roles → "How it works" gap each drop to one `section` step. The "Apply" form sits directly after "How it works" with no empty band.
5. **QA metric:** at 1280, no vertical run of more than **160px** of empty background between two pieces of content inside `main`, except pinned-scroll sections while pinned. Add this check to the QA script: scan full-page screenshots for blank row runs.

### 1.2 Pinned sections leave blank space (critical)

- `/about`: after "Our journey" there is about **2,800px of empty white page** (`evidence/about-blank-after-journey.png`).
- `/heylane` "One app for every place you love": steps 2 and 3 scroll past with no visual next to them, which leaves large empty bands.
- **Fix:**
  - Every pinned ScrollTrigger uses `pinSpacing: true` with an `end` that matches the real content length, plus `invalidateOnRefresh: true`.
  - Call `ScrollTrigger.refresh()` after fonts (`document.fonts.ready`) and images load, and after route change.
  - Lenis must call `ScrollTrigger.update` on scroll.
  - Kill all triggers on route unmount (`useGSAP` scope).
  - In QA, check page height before and after a full scroll: it must not grow.

### 1.3 Products dropdown is not properly visible (`evidence/products-dropdown-see-through.png`)

**Cause:**
- The panel uses `liquid-glass`, which is `rgba(255,255,255,0.42)` with blur. That overrides `bg-white/95`, so page headlines show through the menu.
- There is a `mt-3` gap between the trigger and the panel, so moving the mouse down closes it (`onMouseLeave`).
- Logi's speech bubble can sit above the panel.

**Fix:**
- Make it a **solid** surface: `bg-white`, a 1px `border-border` hairline, `shadow-xl`, `rounded-2xl`. On the HeyLane page, use the same solid light panel.
- `z-overlay` from the z scale, above Logi and its bubble.
- Add an invisible hover bridge (a `::before` that covers the gap), and a 150ms close delay.
- Full keyboard support:
  - `aria-haspopup="menu"` and `aria-expanded`;
  - Enter/Space/ArrowDown opens and focuses the first item;
  - Arrow keys move between items;
  - Escape closes and returns focus to the trigger;
  - Tab out closes it.
- Same treatment for the About dropdown, if any remains.
- Mobile menu: check it still lists HeyLane and All products.

### 1.4 One alignment system (all pages)

The owner sees "no proper alignment" because each section picks its own container, alignment and width.

- **One container:** `max-w-[75rem] mx-auto px-gutter` for content sections. Full-bleed only for bands and backgrounds.
- **Section header rule:**
  - Overview sections (lists, grids, steps, FAQ, CTA) use a **centred** header (`max-w-[48rem]`).
  - Split sections (text + visual) use a **left-aligned** header inside the text column.
  - Never centre a header over left-aligned content of a different width.
- **Split sections** use a 12-column grid: text in 5 columns, visual in 7 (or 6/6), `items-center`. Text and visual tops or centres line up. No mismatched heights that leave a hole.
- **Grids:** `auto-rows-fr` for equal cards. When the last row isn't full (HeyLane's 7 places, or a stats row with 2 items), **centre the last row**, or change the layout so there's no orphan. No "two stats at opposite ends of an empty bar".
- **Logi** never docks on a hero or over a phone or demo frame. The HeyLane hero currently has Logi standing on the phone mock.

---

## Phase 2: Real-looking product demos (shared `src/components/demos/`)

Build one demo kit and use it on Solutions (large), Home "What we do" (mini), and the solution detail pages. Use the **stageshow** skill. The standard is "a screenshot from a real SaaS launch page", not a wireframe.

### 2.1 Rules for every demo

- **Real app chrome:**
  - browser frame with traffic lights and a URL pill (`app.example.com/…`);
  - an in-app **sidebar** with nav icons and labels;
  - a **top bar** with search, notification bell and avatar initials;
  - page title, breadcrumbs, filters/tabs;
  - realistic density with 8–12 data rows and real-looking names, times and amounts in INR (all sample).
- **Never show an empty or half-built state.**
  - The first painted frame is a complete, populated screen. Animation then changes it: rows arrive, statuses flip, a cursor clicks.
  - Today's screenshots show empty grey boxes and blank frames because the demos start empty (`evidence/solutions-demos-empty.png`).
  - Under reduced motion, show the final populated state.
- **A cursor** (stageshow cursor) performs one or two believable actions per loop: hover a row, click, a slide-over opens, a toast appears.
- **Type inside demos:**
  - Render the demo at its native desktop size (for example 1200×760) and scale the whole frame with a CSS `transform: scale()` to fit the column. That is how real launch pages show product UI.
  - The demo is `aria-hidden="true"` with a sibling visually-hidden description, so the 12px text rule doesn't apply inside it (add this exception to `CLAUDE.md` → Quality rules).
  - On mobile, crop to the most important panel rather than shrinking text below about 9px rendered.
- **Visual quality:**
  - Neutral app palette (white, slate-50 surfaces, slate-200 hairlines) with Logisaar green as the app's primary colour.
  - Real icons (lucide), status pills, avatars with initials, mini sparkline charts and a KPI strip.
  - Subtle shadow and 1px border on the frame. No glows.
- **Sample tag** inside each frame (top-right of the app's title bar).
- **Performance:**
  - Demos mount lazily when within 1 viewport.
  - Loops pause when off-screen (`IntersectionObserver`) and when the tab is hidden.
  - One GSAP timeline per demo.
  - Only `transform`/`opacity` animate.

### 2.2 The four demos

1. **Software development: "Orders & billing" web app.**
   - Base layer: the real `smart-crm` or `hotel-management` screenshot is allowed as the page body. Better is a coded replica with the same layout so it stays crisp.
   - Left sidebar: Dashboard, Orders, Customers, Inventory, Invoices, Reports.
   - Header: a KPI strip (Orders today, Revenue ₹, Pending, Packed) with sparklines.
   - Body: an orders table with columns Order #, Customer, Items, Amount, Status, Updated.
   - **Loop:**
     1. A new row slides in at the top with a highlight.
     2. The cursor clicks it.
     3. A right slide-over opens with order details and an "Invoice" button.
     4. The cursor clicks "Mark packed".
     5. The status pill flips to Packed, the KPI counters tick, and a toast says "Invoice INV-1042 sent".
2. **AI agent development: "AI receptionist" inbox.**
   - Three columns:
     - **Conversations list** with channel icons for phone, chat and web, and unread dots.
     - **Live conversation:** a chat thread in a neutral messaging style, with the business name "Example Clinic · AI assistant". Don't copy WhatsApp's trade dress or logo; a "via WhatsApp" text tag is fine.
     - **A side panel:** caller details, an "AI handled" badge, a booked-slot card and a mini calendar.
   - **Loop:**
     1. The customer message types in.
     2. A typing indicator shows.
     3. The AI replies with two time slots.
     4. The customer picks one.
     5. The calendar slot fills and a "Booked · Fri 4:00 pm" card appears.
     6. Then a second conversation shows a **voice call**: a waveform animates, the transcript lines stream in, and a summary chip appears.
3. **Business automation: workflow canvas (n8n/Make-style, not copying either brand).**
   - A dotted-grid canvas with 5–6 nodes: trigger "New order (form)", "Create invoice", "Send on WhatsApp", "Add row to Google Sheet", "Notify owner".
   - Each node is a card with an icon, a title and a small config line, connected by bezier edges.
   - A right **run-log** panel lists timestamps, ✓, and durations (0.4s…).
   - **Loop:** a "data packet" dot travels along each edge (MotionPathPlugin). Each node lights up and gets a ✓ in turn, and a log line appears. After the run, a "Run #128 · 2.1s · Success" banner shows.
4. **AI software: "Ask your documents".**
   - Left: a document library (PDF and sheet icons, file names, sizes).
   - Centre: a PDF page preview with real-looking paragraphs.
   - Right: a chat panel.
   - **Loop:**
     1. The question types in.
     2. The answer streams in word by word.
     3. A citation chip "Refund policy · p.2" appears.
     4. Hovering it scrolls the PDF preview and highlights the cited paragraph with a soft marker.
     5. A second, shorter Q&A follows: a numbers question answered with a small table/chart.

---

## Phase 3: Solutions: service explorer transitions (GSAP)

The owner wants the four services clearly distinguished, with proper animation between them (`evidence/owner-solutions-demo.png`).

- **Desktop (≥ 64em):** one **pinned stage**. The demo frame stays pinned while the left list scrolls through the services. ScrollTrigger is pinned for 4 × about 100vh, with `scrub` and **snap** to each service.
  - **Distinct identity per service:**
    - a large number "01 / 04" and the service name animate in with SplitText;
    - a tinted backdrop panel behind the frame changes per service, using only shades within the brand: green-50 → emerald-50 → teal-50 → slate-50;
    - the left rail's active bar slides with the progress.
  - **Transitions:** each one is a GSAP timeline, transform/opacity/clip-path only, about 0.6–0.8s, with expo-out easing.
    - **01 → 02:** the browser frame Flip-morphs into the three-column inbox layout, and the old content wipes out with a clip-path.
    - **02 → 03:** the frame zooms out slightly, and the canvas grid fades in with nodes dropping in on a stagger.
    - **03 → 04:** the nodes collapse into the document icon, and the doc/chat layout expands from it.
    - Reverse transitions play when scrolling up.
  - When a service becomes active, its demo loop restarts from its populated first frame.
- **Tablet and mobile:** no pinning. Use a **tab switcher** (segmented control with 4 tabs, swipeable) above one demo frame. Tab changes use the same transitions, but shorter.
- **Reduced motion:** stacked static blocks, each demo showing its final state.
- The hero "service jump bar" scrolls to the right snap point.

---

## Phase 4: Home page (`/`)

### Issues found (`evidence/home-*.png`)

| # | Issue |
|---|---|
| HM1 | Logi still stands at the hero's bottom edge, over the outline marquee. |
| HM2 | The outline marquee ("OFTWARE DEVELOPM…") is huge, cropped mid-word, low contrast, and followed by a big empty gap. |
| HM3 | "Four ways we take work off your plate" is four flat text cards with tiny icons, so it reads like a template. |
| HM4 | The ready-made cards on home differ from the round-7 Solutions cards. The price pill wraps to 3 lines ("From ₹20,000 + ₹4,000/month"), and the dashboard thumbnails are tiny. |
| HM5 | The IKURO block is in Logisaar green with a generic green 3D graduation cap. The orbiting cards are clipped at the right edge (the "Guidance" card is cut). One lone stat ("500+ students guided") sits with an empty area beside it. |
| HM6 | The HeyLane block phone is a flat placeholder, with its lower half empty. It doesn't look like the HeyLane app. |
| HM7 | "Our work" stats bar: two stats pinned to opposite ends of a wide empty bar. |
| HM8 | The hero stat cards ("30+ Projects", "25+ Clients") float over the background art at the far left and right edges, away from the content. |
| HM9 | Testimonials: there is an extra generic "Trusted by businesses / Results that matter…" icon row before the CTA. It adds height and says nothing. |

### Changes

1. **Hero (HM1, HM8):**
   - Move the two stats into one small inline row under the CTAs ("30+ projects delivered · 25+ clients"), centred.
   - Logi docks bottom-right, outside the hero (per `CLAUDE.md`).
2. **Marquee (HM2):** replace it with a slim solid-text ticker (`text-h3`, slate-400, the four service names separated by small green dots, `aria-hidden`), with at most 1 `section-sm` gap. Or remove it if it still looks heavy.
3. **"What we do": a bento grid (HM3).**
   - **Desktop:**
     - 2×2 bento inside the container, with one card spanning wider on each row (7/5 then 5/7 columns) so it doesn't look like four equal boxes.
     - Each card has a **mini live demo** from the Phase 2 kit at the top (about 55% of the card): orders ticking, a chat booking, the workflow packet run, a doc answer. Below it: eyebrow, title (`text-h3`), one line, and 3 check items.
     - The whole card links to the matching Solutions anchor.
   - **Interaction:**
     - a cursor-follow spotlight border on hover (CSS radial-gradient mask on the border only; no glow blob);
     - the card lifts 2px;
     - its mini demo plays on hover and in view, and is paused otherwise.
   - **Entrance:** GSAP stagger. Each card clip-path reveals from the bottom, then the demo fades in.
   - **Mobile:** a horizontal snap carousel of the four cards, with dots.
   - **Reduced motion:** static final states.
4. **Ready-made (HM4):** reuse the Solutions `SolutionCard` component exactly (one card family). Show 4 cards. Prices come from `src/data/solutions.ts`. The "/month" amount goes on its own line in a smaller weight, never inside a pill.
5. **IKURO block (HM5): redesign the asset.**
   - **Remove** the green graduation cap and the orbiting cards.
   - Give the block an IKURO-tinted panel: cream `#FCFAF8` background with a 1px orange-tinted border, inside the Logisaar page. Use the IKURO lockup and IKURO orange/navy accents. Buttons use the IKURO button style (`#D93A22` with a white label).
   - **New visual: "the decision path", an SVG animation**, in IKURO colours, original artwork. **Don't trace or redraw the logo.**
     - One winding path (echoing the logo's road) draws on scroll (`strokeDashoffset` via ScrollTrigger scrub).
     - Five nodes along the path light up in turn, labelled **Understand → Reason → Recommend → Reflect → Grow**.
     - Off the path, faint branch lines lead to choice chips ("B.Tech CSE", "Internship", "Python", "Higher studies") that fade as the path picks one.
     - At the end, a small four-point star appears and sparkles once (scale/opacity only).
     - The SVG has a viewBox, fits its column, and never overflows the container. No element is positioned outside `overflow-visible` bounds.
   - **Layout:** 6/6 split, text left and the path right, vertically centred.
   - **Stat:** "500+ students guided through TechXera and Chalk to Choice" becomes a single line under the text (`text-body-sm`), not a big isolated stat row.
6. **HeyLane block (HM6): real app.**
   - Use a two-phone composition with the real screens:
     - front phone: `07-home-with-booking-780.webp`;
     - back phone, offset and slightly rotated: `14-passes-780.webp` (or `08-lane-maps-explore`).
   - Build the device frame in CSS:
     - rounded 3rem corners;
     - a thin dark bezel;
     - a subtle highlight edge;
     - no fake brand notch: a simple pill island is fine.
   - Put a "Sample" chip inside the screen area.
   - **Motion:**
     - the phones float in with a small parallax on scroll (y ±20px);
     - the front screen cross-fades through Home → Lane Maps → Passes every 3.5s while in view;
     - with reduced motion, it shows a static Home screen.
   - Put the panel on HeyLane paper `#f4f3ee` with the HeyLane logo, so it reads as HeyLane, inside the Logisaar page.
7. **Our work (HM7):** put the two stats inline under the section title ("30+ projects · 25+ clients"). Delete the empty bar.
8. **Testimonials (HM9):** remove the generic icon row. Keep the quotes and one CTA.
9. **Section order and rhythm check:**
   - Hero → ticker → What we do → Ready-made → IKURO → HeyLane → Our work (logos) → Testimonials → CTA band → footer.
   - Alternate white and off-white backgrounds.
   - Follow the Phase 1 spacing rules.

---

## Phase 5: HeyLane page (`/heylane`): look like the real app

The current phones are generic placeholders: a grey image box, plain cards, and Logi standing on the phone (`evidence/heylane-placeholder-phones.png`).

1. **Use the real screens and the CSS device frame from Phase 4.6 everywhere a phone appears.**

   | Section | Screens |
   |---|---|
   | Hero | Front phone `07-home-with-booking`, back phone `08c-lane-maps-place-selected` |
   | How it works, step 1 "Drop a pin. Find your place" | `08-lane-maps-explore` |
   | How it works, step 2 "Ask your people, then chat" | `10-lane-vibes`, then `13-chat-thread` (behind the flag) or `12-chat-list` |
   | How it works, step 3 "Come back. Get rewarded" | `14-passes`, then `15-pass-at-counter` (behind the flag) |
   | Lane Vibes | `10-lane-vibes` (full-scroll version inside the phone, auto-scrolling slowly while in view) |
   | Places | Keep the category photos. Add the HeyLane category **icons** (`icons/duotone`) on each tile. |
   | Passes | `14-passes`. Build the sample pass card to match handoff doc 07 and `03-components-png/pass-card-*.png`: dark green card with the Konark-wheel motif as a **subtle** pattern, "Sample" tag. |
   | Coming soon | `11-rides-coming-soon` in the phone, with a "Coming soon" tag. |
   | Lane Maps night (optional) | `08d-lane-maps-night` on the dark band. |

2. **"How it works"** is a pinned phone on desktop.
   - The phone stays pinned while the three steps scroll on the left.
   - The screen inside the phone changes with each step: a cross-fade plus a slight y-slide, about 0.5s.
   - The three steps have equal heights, so there are no empty bands.
   - **Mobile:** each step shows its own phone above its text.
3. **Places grid:** 7 tiles. Use a layout that leaves no orphan: 4 + 3 with the second row centred, or a horizontal scroller on mobile.
4. **Fonts and colours:** keep the round-4 HeyLane theme, and also pull the radius, shadow and glass values from the handoff `tokens.css` for the device frame and the pass card.
5. **Logi** docks away from the phones on this page.

---

## Phase 6: About page (`/about`)

1. **Fix the blank band** after "Our journey" (Phase 1.2).
2. **Founders: no photos (owner decision).**
   - Remove the photo cards. Keep the image files; **ask before deleting them**.
   - Replace them with a **founders' story section**: a 2-column split. Left: a short narrative in the first person plural. Right: a small "story timeline".
   - Draft from facts already on the site (`TODO(owner): review wording`). Keep it short (3 short paragraphs + the timeline). No invented facts:
     - Chinmay Kumar Panda and Biswanath Prasanna Satyabrata Kar, two Computer Science engineers and full-stack developers from Odisha.
     - They started Logisaar in September 2025 to build properly made software for businesses close to home.
     - Chinmay leads product, AI engineering and growth. Biswanath leads architecture, cloud and engineering operations.
     - Early work: custom web, database and automation projects for local businesses.
     - TechXera began as a programming club at Nalanda. In November 2026 it became IKURO.
     - HeyLane is their neighbourhood app for Bhubaneswar.
   - Each founder's name and role appear in text, with a LinkedIn text link if one exists. **No avatars or initials blocks.**
3. **Alignment:** apply the Phase 1.4 rules.
   - "Four services, and two products": service cards and product cards share the same container width and grid.
   - The "At a glance" strip fits the container (no edge-to-edge spread).
4. **"How we work":** keep the 4 cards, but use the same horizontal step style as the Solutions timeline (one component).

---

## Phase 7: QA

- **Playwright** on `/`, `/about`, `/solutions`, `/contact`, `/careers`, `/ikuro`, `/heylane`, at widths 320, 375, 768, 1024, 1280, 1440, 1920 plus 200% root font:
  - no overflow;
  - header never covers text;
  - **no blank run over 160px** (Phase 1.1);
  - page height stable after a full scroll (Phase 1.2);
  - no clipped elements: every element with a visible bounding box sits inside the viewport horizontally;
  - the Products dropdown is opaque. Screenshot it over the About h2 at scrollY 900, and assert its computed background alpha is 1.
- **Demo check:** capture each demo's first painted frame at 0ms and assert it is populated (no element with the `data-demo-empty` marker; add that marker to empty placeholders during development, and ship none).
- **axe** at 375 and 1280 on all seven pages: 0 serious/critical.
- **Keyboard:** dropdown, Solutions tab switcher, bento cards, the HeyLane pinned section (focusable content still reachable).
- **Reduced motion:** every page shows final states, and nothing loops.
- **Lighthouse mobile** on `/`, `/solutions` and `/heylane`: report the numbers. Performance must not drop more than 5 points from round 7. If it does, lower the demo cost (lazy mount, lower DPR images, fewer simultaneous loops).
- **Screenshots** before and after (375 and 1280) for each page in `qa/`.
- **Update `CLAUDE.md`:**
  - Status: round 8 done.
  - Quality rules:
    - the blank-run rule;
    - the faux-UI `aria-hidden` + scale exception;
    - "real HeyLane app screens live in `public/images/heylane/app/`; never draw a fake HeyLane phone";
    - "demos never paint empty".
- **Summary:** changes per phase, every `TODO(owner)`, and the Lighthouse numbers.

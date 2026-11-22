# Round 9: scroll timing fixes, Solutions CTA visibility, a footer that feels alive

Read `CLAUDE.md` first. Branch `redesign/home-v2`.

- Commit each phase as `round9-phaseN: <summary>`.
- Ask before adding a package or deleting a file.
- No copy, price or data changes unless this brief says so.

## Phase 0: Clean up the previous session first

1. **Stop and remove any sub-session / sub-chat / background agent** you started in round 8 (the "Round 8: phases 3 to 7" session). Nothing else may be editing this checkout while you work. Confirm in your first message that it is closed.
2. **Finish the round 8 work:**
   - Run `git status`. Round 8 Phase 7 left uncommitted edits in `CLAUDE.md`, `HlSections.tsx`, `HeyLaneBlock.tsx`, `ServiceBento.tsx` and `Index.tsx`. Review them, finish them if needed, build, and commit as `round8-phase7: QA fixes`.
   - Report the round 8 QA results that exist: Playwright, blank-run check, height check.
3. Axe and Lighthouse are still pending owner approval of the packages. Ask again in your summary. Don't install them unless the owner approved in chat.

## The scroll-timing problem (owner's report)

- **Home, IKURO block:** the page scrolls the section out of view before the decision-path animation finishes (`DecisionPath.tsx`: scrub from `top 80%` to `bottom 45%`).
- **Home, HeyLane block:** the screens cross-fade on a 3.5s timer (`HeyLaneBlock.tsx`), so most visitors scroll past after seeing one screen.
- **`/heylane`:** the same problem with the phone screens.
- **`/ikuro` page:** animations finish ("arrive at the destination") before the visitor reaches them. Reveals fire as soon as a pixel enters, or run on load, so the section is already in its end state when it comes into view.

Root cause: no shared rule for *when* an animation runs relative to where the visitor is looking.

## Phase 1: A scroll choreography contract (`src/lib/scroll.ts`), used everywhere

Create shared helpers and refactor every GSAP/Framer scroll animation on Home, Solutions, IKURO, HeyLane and About to use them.

1. **`reveal(el, opts)`: one-shot entrance.**
   - Plays (no scrub) when the element's top crosses **70%** of the viewport (`start: "top 70%"`).
   - Duration 0.6–0.8s, expo-out, transform/opacity only. Plays once.
   - Replaces Framer `whileInView` with tiny `amount`, and any "on mount" animation that sits below the fold.
2. **`sequence(section, timeline, { steps })`: multi-step story** (the decision path, the IKURO loop, the HeyLane phone screens, the Solutions stage).
   - **Desktop (≥ 64em):**
     - **Pin the section** while the sequence plays: `pin: true`, `start: "top top+=var(--header-h)"` (or `"center center"` when the section is shorter than the viewport), `end: "+=" + steps * 45 + "%"`, `scrub: 0.5`.
     - `snap` to step boundaries (`snap: { snapTo: 1/(steps), duration: 0.3, ease: "power1.inOut" }`).
     - `anticipatePin: 1`, `invalidateOnRefresh: true`.
     - The sequence reaches its final state **before** the pin releases, and the final state stays on screen for at least about 15% of the pinned distance.
   - **Below 64em:** no pin. The sequence plays as a time-based timeline that starts when the section is **at least 60% visible**, pauses when it leaves, and **restarts from step 1** when it re-enters. Or it becomes a swipeable step control where that fits better (the HeyLane screens).
   - **Rule:** a scrubbed animation must never span the element entering or leaving the viewport. It runs only while the element is fully visible (pinned), or it is a one-shot `reveal`.
3. **`loop(el, timeline)`: ambient loops** (demos, tickers). Start at 60% visible, pause when off-screen or the tab is hidden, restart from the populated first frame.
4. **Reduced motion:** every helper shows the final state immediately and never pins.
5. **Apply to:**

   | Where | What |
   |---|---|
   | Home `DecisionPath` / `IkuroBlock` | `sequence`, 5 steps (Understand → Grow, then the star). The block is pinned until the star appears. |
   | Home `HeyLaneBlock` | `sequence`, 3 steps. The front phone shows Home → Lane Maps → Passes, driven by scroll, with a small step indicator ("1 Home · 2 Lane Maps · 3 Passes") beside the phones. Remove the 3.5s timer on desktop. On mobile, use dots plus swipe, with auto-advance only while 60% visible. |
   | `/heylane` "How it works" pinned phone, Lane Vibes phone | Pinned phone uses `sequence` with 3 steps. The auto-scrolling Lane Vibes screen starts only at 60% visible and restarts on re-entry. |
   | `/ikuro` (`IkuroLoop`, `IkuroProblem`, the hero and every card reveal) | Loop and problem sections: `sequence`. Cards and headings: `reveal`. Nothing animates on page load except the hero. |
   | `/solutions` stage | Keep the pinned stage, but use `sequence` (4 steps) with snap. |
   | Home bento mini demos, Solutions demos | `loop`. |
   | About journey timeline | `sequence`. Check that no blank band returns. |

6. **QA, timing check (Playwright, 1280×800):** for each `sequence`:
   - scroll in 100px steps;
   - record the section's on-screen state and the timeline progress;
   - assert progress reaches 1 while the section is still pinned and fully visible;
   - for each `reveal`, assert that its start fires only after the element's top is at 70% or above.
   Save the trace as JSON in `qa/`.

## Phase 2: Solutions: "Discuss your project" must always be visible

**Owner:** the button only becomes visible by the third service.

**Cause** (owner's screenshot, 1440 wide): the pinned left column is taller than the viewport. The tab row "01 02 03 04", a second giant "01 / 04", a two-line service title, the promise, the chips, the "What you get" list and then the CTA push the button below the fold for services 1 and 2. Logi's bubble also sits on the demo frame.

**Fix:**
1. **The pinned left column must fit in `100svh - var(--header-h)` at 1280×720 and above.**
   - Keep **one** step indicator: either the tabs or the "01 / 04", not both. Keep a compact "01 / 04" with a progress bar.
   - Service title: `text-h2-page`, one line where possible.
   - Promise line, then the **CTA "Discuss your project" directly under the promise**, before the chips and list.
   - Chips: smaller (`text-body-sm`, 2 rows max).
   - "What you get": 4 items in 2 columns, or behind a "What you get" disclosure if it still doesn't fit.
2. **Check:** at 1280×720, 1440×900 and 1920×1080, for each of the 4 services while pinned, the CTA's bounding box is fully inside the viewport and below the header. Add this to the QA script.
3. **Logi** stays docked and silent (no bubble) while the Solutions stage is pinned. The bubble must never overlap a demo frame anywhere on the site.

## Phase 3: A footer that feels alive (`src/components/Footer.tsx`)

The owner wants the footer to "give it a life". Keep it trustworthy and on-brand: dark band, Logisaar green as the accent, no glow blobs, no emoji, no fake data. Everything is subtle, performant and respects reduced motion.

1. **Big wordmark finale (top of the footer).**
   - A full-width "Logisaar" wordmark set in the display font (text, **not** the logo artwork), at `clamp(4rem, 14vw, 13rem)`, as a hairline green outline.
   - As the footer scrolls into view, the outline **fills** with green from left to right, scrubbed **only while the footer is fully visible** (contract rule, or a one-shot `reveal`).
   - Letters lift 2px under the cursor.
   - `aria-hidden`; the real logo stays in the columns.
2. **Live "now" strip** (one line, under the wordmark):
   - "**It's 9:42 pm in Bhubaneswar**", a live IST clock updating each minute.
   - Followed by "· **9:12 am** where you are", using the visitor's time zone (Intl API, nothing sent anywhere). This helps US and Canada buyers.
   - Then a status dot with "**We're working now**" or "**We'll reply next working day**", based on office hours in `src/data/company.ts` (`TODO(owner): office hours and working days in IST`; until confirmed, show only the two clocks, no status).
3. **Living background:** the hero's circuit/line motif, redrawn as a very low-opacity (4–6%) SVG on the dark band. Two or three traces slowly draw and fade, about a 12s loop, transform/opacity/stroke-dashoffset only. It pauses when off-screen and is static under reduced motion.
4. **"Start a project" call-out row:**
   - A single line, "Have a task you'd rather not do every day?", with a green text button "Start a project →" whose arrow slides on hover, plus a WhatsApp icon button.
   - Keep it **one line**. It is not the big "Ready to start?" banner the owner removed in round 2.
5. **Micro-interactions:**
   - Link hover: an underline draws from left to right (`scaleX`) and the text shifts 2px.
   - Social icons: magnetic within 1.5rem (the existing `MagneticButton`), with a green ring on hover.
   - Column headings `reveal` with a small stagger when the footer enters.
   - **Back to top:** a circular button with a scroll-progress ring (SVG stroke) at the right end of the bottom bar. It scrolls smoothly via Lenis.
6. **Logi** optionally waves once from the bottom bar when the footer first appears (an existing Logi state), at most once per session.
7. **Bottom bar:** keep the legal line. Add "Built in Odisha, India · Serving clients in India and abroad" (`TODO(owner)` to confirm "abroad").
8. **Layout check:**
   - The footer stays readable at 320 width.
   - Columns collapse to accordions under 40em (Solutions / Company / Legal / Locations), with the contact block always open.
   - No horizontal overflow from the wordmark: it scales with `vw` but is clipped inside the container.
9. **Performance:** the footer JS loads lazily (dynamic import when within 1 viewport). It adds nothing to the home LCP.

## Phase 4: QA

- **Playwright** on `/`, `/solutions`, `/ikuro`, `/heylane`, `/about` at widths 375 to 1920 plus 200% root font:
  - the Phase 1 timing trace;
  - the Phase 2 CTA check;
  - no blank run over 160px;
  - page height stable after a full scroll;
  - header never covers text;
  - no overflow.
- **Footer checks:**
  - the clock text matches IST;
  - reduced motion shows the filled wordmark and static traces;
  - keyboard reaches every link and the back-to-top button;
  - the accordions work with Enter/Space.
- Before/after screenshots and short screen recordings (Playwright video) of the Home IKURO and HeyLane blocks and the Solutions stage go in `qa/`.
- **Update `CLAUDE.md`:**
  - Status: round 9 done.
  - Under Quality rules, add the scroll choreography contract in two lines: *"use `reveal`/`sequence`/`loop` from `src/lib/scroll.ts`; scrubbed sequences run only while pinned and fully visible"*.
- **Summary:** the changes, the timing results, every `TODO(owner)`, and the package approval question (axe, Lighthouse).

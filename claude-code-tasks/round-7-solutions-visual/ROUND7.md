# Round 7: Solutions page visual redesign (+ inner-page headline scale)

Read `CLAUDE.md` first. Branch `redesign/home-v2` (after `1f01a37`).

- Keep all copy, data, prices, anchors and the claims switch from round 6. **This round is layout, hierarchy and visuals only.**
- Commit each phase as `round7-phaseN: <summary>`.
- Ask before adding a package or deleting a file.

Evidence (Cowork, 21 Nov 2026, 1280 and 375 wide) is in `evidence/`.

## What's wrong (owner: "headline too big, one after another, no proper alignment, make it visually appealing")

| # | Problem |
|---|---|
| V1 | **Hero h1 wraps to 5 lines at 1280** (and 5 at 375). It uses the home `text-h1` (up to 5.5rem) inside a narrow measure (about 12 characters per line). It reads as a wall of giant words. |
| V2 | **Four identical giant blocks in a row.** Each service is the same zig-zag template, with an h2 almost as large as the hero h1 ("Your business, as an app.", "A teammate that never sleeps.", …). So the page is big headline → big headline → big headline with no hierarchy between the page title and the section titles. |
| V3 | **Misalignment in the zig-zag:** the text column is top-aligned but the mock is vertically centred, so their tops never line up. The left/right columns change width between blocks. Each block's eyebrow/h2 starts at a different x than the centred hero above it. |
| V4 | **The faux UIs are flat and low-fidelity** (plain lists in a grey frame, no motion). They don't sell anything. |
| V5 | **The ready-made grid is a wall of green.** Every card has two full-width buttons, which makes 18 big buttons. The filter chips wrap to two centred rows. Images mix photo and screenshot styles. |
| V6 | **Rhythm:** about 300px of empty space before "Ready-made solutions". The "How a project works" list is left-aligned under a centred heading. The FAQ and final CTA share one background with no separation. "Common questions" has no eyebrow while every other section has one. |
| V7 | **Mobile:** the page is 14,697px tall at 375. The floating WhatsApp button sits on the first service eyebrow. |

## Phase 1: Type scale for inner pages (site-wide)

1. Add `text-h1-page: clamp(2.25rem, 1.6rem + 2.6vw, 3.75rem)` (line-height 1.08, tracking −0.025em) to `tailwind.config.ts`.
   - The **home page alone** keeps `text-h1`.
   - Every other page hero uses `text-h1-page`: Solutions, About, Contact, Careers, Products, solution detail pages, legal pages, 404.
   - IKURO and HeyLane can keep their own scale if it already reads well; check them.
2. **Section titles** use `text-h2` capped lower: `clamp(1.75rem, 1.3rem + 1.6vw, 2.75rem)`.
   - Make sure every section h2 on an inner page is visibly smaller than that page's h1: at least a 1.3× step at 1280.
   - Sub-blocks inside a section (like each service) use `text-h3`, **not h2 styling**.
3. **Hero measure:** h1 `max-w-[22ch]`, lead `max-w-[60ch]`, both centred.
4. **Target:** no inner-page h1 wraps to more than **3 lines at 1280** or **4 lines at 375**. Add this to the QA script.

## Phase 2: Solutions page layout

### 2.1 Hero

- **Two-line headline**, with the second line in `--primary-ink` (the home pattern):
  - line 1: "Software, AI agents and automation"
  - line 2: "built around your business"
  If needed, shorten line 1 to "Software, AI agents & automation" only on screens under 48em.
- **Directly under the CTAs, a "service jump bar":** four equal cards in one row on desktop, a horizontally scrollable row on mobile. Each card has:
  - an icon (lucide via `Icon`, 20px);
  - the service name;
  - its one-line promise in `text-body-sm`.
  Each card links to `#software-development`, `#ai-agents`, `#business-automation`, `#ai-software`. This gives an overview before the details, and replaces scrolling past four giant headings.
- Keep the home hero background, but tone it down to about 60% opacity. The hero must fit in one screen at 1280×800 including the jump bar.

### 2.2 Services: one "service explorer" instead of four repeated blocks

- **Desktop (≥ 64em): a pinned two-column explorer.**
  - **Left (5/12):** a sticky list of the four services. The active item gets a green-ink bar and a progress line, with scroll-spy. Under the active name sit its promise, then "Typical examples" shown as **chips**, then "What you get" as a 4-item checklist, then the "Discuss your project" button.
  - **Right (7/12):** one large demo frame per service, scrolling past. All demo frames share **the same size (aspect 16/11)**, the same frame style and the same **top edge alignment** with the left text.
  - This is the page's one orchestrated scroll moment.
- **Tablet and mobile:** stacked cards in this order: demo first (shorter, aspect 4/3), then name and promise, chips, checklist, CTA. Use `text-h3` names. No pinning.
- **Demos** (use the **stageshow** skill, Logisaar colours, a "Sample" tag inside each frame, `transform`/`opacity` motion only, a looped short sequence that plays when in view and pauses out of view):
  - **Software development:** an orders dashboard. Rows arrive and status pills flip from "Waiting" to "Packed". Add a small KPI strip on top (orders today, packed, pending), labelled Sample.
  - **AI agents:** a WhatsApp chat. The customer message types in, the agent shows a typing indicator, then the replies, then a "Booked" confirmation card. The side shows a calendar slot filling in.
  - **Business automation:** a flow of 4 nodes connected by a line that draws. Each node ticks in turn: "New order → Invoice created → Sent on WhatsApp → Added to sheet".
  - **AI software:** an "Ask your documents" panel. The question types, the answer streams in, and the source citation highlights a line in a mini document preview.
  - **Reduced motion:** show each demo's final state and no loop.
- **Alignment:** one 12-column grid with `max-w-[75rem]` for the whole explorer. Text and demo tops line up (`items-start`). No zig-zag.

### 2.3 Ready-made solutions grid

- **Section header** is centred, and its paragraph sits directly under the title. Remove the dead space above it (V6).
- **Filter chips:**
  - **Desktop:** one row, which needs short labels: All · Education · Hospitality · Sales · Service · Food · Travel · Agencies · Any business. Keep the full names in `aria-label`/`title`.
  - **Mobile:** a single horizontally scrollable row with edge fade.
  - Show the result count after the chips as plain text.
- **Card redesign (one card family, calmer):**
  - **Image:** consistent 16/10 crop in the browser frame. The industry tag is a solid chip inside the frame, top-left.
  - **Body:** name (`text-h3`), one-line outcome, then a footer row with "From ₹X" on the left (plus the "/month" note where it exists).
  - **Actions:**
    - The **whole card is the link** to the detail page (stretched link, visible focus ring on the card). The visual cue is "View details →" as a text link.
    - **WhatsApp becomes a 44px round icon button** at the right of the footer row, with `aria-label="Ask about <name> on WhatsApp"` and a tooltip.
    - No full-width green buttons. That's 0 big green buttons in the grid instead of 18.
  - **Hover:** lift 2px, image zoom 1.03 inside the frame, arrow nudges.
  - **Equal heights:** grid rows `auto-rows-fr`, footer pinned to the bottom (`mt-auto`).
- **Filtering:** Flip layout animation; reduced motion swaps instantly.

### 2.4 How a project works

- **Desktop:** a horizontal 4-step timeline, centred under the centred heading. Numbered nodes sit on one line that draws left to right on scroll; each step's title and text sit under its node, aligned to it.
- **Mobile:** a vertical timeline with the line on the left, the same component.
- The steps match the Contact page's "what happens next" and About's "How we work".

### 2.5 Ways to work, FAQ, CTA

- **"Three ways to start":** equal-height cards (`auto-rows-fr`), each with an icon and a text link to the right place:
  - Ready-made → `#ready-made`
  - Custom → `/contact`
  - Monthly support → the AI agent solutions filter
- **FAQ:** add the standard eyebrow ("Questions"). Keep the accordion at `max-w-[48rem]`.
- **Final CTA:** its own band (the dark slate band used on home, or the green-tint band), clearly separate from the FAQ.

### 2.6 Rhythm, alignment and mobile

- **Section order and backgrounds** alternate predictably: hero (tint) → services (white) → ready-made (off-white) → how it works (white) → ways to work (off-white) → FAQ (white) → CTA band.
- **Spacing:** `py-section` everywhere, with no extra margins stacked on top.
- **Alignment rule:**
  - section headers are centred;
  - content inside the explorer is left-aligned to the 12-column grid;
  - never mix both inside one section.
- **Mobile:**
  - the floating WhatsApp/scroll-top stack must not cover content: add bottom padding to `main` equal to the stack height, and keep the stack hidden until the user scrolls past the hero;
  - target page height ≤ 9,000px at 375 without removing content.

## Phase 3: QA

- **Playwright** at 320 to 1920 plus 200% root font, on `/solutions`, `/about`, `/contact`, `/careers` and one solution detail page:
  - h1 line count (≤ 3 at 1280, ≤ 4 at 375);
  - h2 smaller than h1;
  - no overflow;
  - header never covers text;
  - targets at least 44px;
  - no text under 12px.
- **axe** at 375 and 1280: 0 serious/critical. Stretched-link cards need exactly one focusable link plus the WhatsApp button.
- **Reduced motion:** demos are static at their final state; the timeline is drawn.
- `npm run audit:px` does not regress.
- **Performance:** the demos must not drop the Lighthouse mobile performance score below the round-6 value. Report both numbers.
- Before/after screenshots (375 and 1280) in `qa/`.
- Update `CLAUDE.md`:
  - Status: round 7 done.
  - Under "Quality rules": *"Inner-page heroes use `text-h1-page`; only the home page uses `text-h1`."*

# Round 5: header overlap fix (site-wide) + Contact page redesign

Read `CLAUDE.md` first. Branch `redesign/home-v2`.

**Before starting:** the round-4 QA screenshots in `claude-code-tasks/round-4-audit-ikuro-heylane-responsive/qa/` show as modified. Commit them as `chore: round 4 QA screenshots`.

Then work phase by phase. After each phase, lint, typecheck and build, and commit as `round5-phaseN: <summary>`.

## The bug (owner's screenshot, /contact at ~1900px wide)

Evidence: `contact-header-overlap.png` in this folder.

The header is `position: fixed`. At the top of the page it is fully transparent (`bg-transparent`, the non-`capsule` state). Every page fakes the space under it with its own `pt-32` / `pt-36` / `md:pt-44`.

`/contact` has no offset on desktop (`md:py-0` + `items-center`), so on that page:

- the nav links ("Home About Solutions IKURO Products Careers Contact") sit on top of the dark photo and the WhatsApp card;
- "Contact" collides with the "Scoping via WhatsApp" heading;
- the "GET IN TOUCH" eyebrow sits right under the logo;
- grey links on the dark photo are unreadable.

Any page whose hero is taller or shorter than its guess has the same risk.

## Phase 1: Header layout, fixed at the root (all pages)

1. **One source of truth for header height.** In `src/index.css`:
   - `:root { --topbar-h: 0rem; --nav-h: 4.5rem; }`
   - `@media (min-width: 48em) { :root { --topbar-h: 2.75rem; --nav-h: 5rem; } }`
   - `--header-h: calc(var(--topbar-h) + var(--nav-h));`
   - Use `rem` values that match the real rendered heights. Measure them, don't guess.
   - TopBar uses `height: var(--topbar-h)`. Navbar uses `top: var(--topbar-h)` and `min-height: var(--nav-h)`. Replace the `md:top-11` / `top-20` magic numbers, including the mobile menu overlay, which becomes `top: var(--header-h)`.
2. **Layout reserves the space once.** `src/components/Layout.tsx`: `<main style={{ paddingTop: "var(--header-h)" }}>`.
   - Then remove the per-page header offsets: `pt-32`, `pt-36`, `md:pt-44` and similar in About, Careers, Location, NotFound, Portfolio, Pricing, Products, Solutions, Ikuro, HeyLane, Home hero and the solutions/* pages. Replace each with normal section spacing (`pt-section-sm`).
   - For a full-bleed hero that should sit *under* a translucent header, use an explicit opt-in: `<Layout heroUnderHeader>`. It removes the main padding, and that hero adds `padding-top: var(--header-h)` itself. Only home and `/heylane` may use it.
3. **The header is never transparent over content.**
   - At the top of the page it is a full-width bar with a solid background: `bg-background/95` plus a hairline bottom border. Use `backdrop-blur` only if it causes no paint jank.
   - On scroll it still morphs into the capsule.
   - On `heroUnderHeader` pages over a dark band (HeyLane), use the existing light capsule from the start.
   - Text and links in the header always meet 4.5:1.
4. **Anchors:** `html { scroll-padding-top: calc(var(--header-h) + 1rem); }`. Lenis anchor scrolling must use the same offset.
5. **z-index scale:** replace `z-[9999]` / `z-[10000]` with tokens in `tailwind.config.ts`: `header: 50`, `logi: 60`, `overlay: 70`, `modal: 80`, `toast: 90`.
   - Dialogs, the Logi chat and toasts must sit above the header.
   - The open mobile menu sits above Logi.
6. **Check.** Run Playwright on every route in `App.tsx` at 375, 768, 1024, 1280, 1440 and 1920:
   - Assert that the bounding box of `header` does not intersect the first `h1` or any visible text in `main` at scrollY 0.
   - Scroll 600px and assert the same.
   - Do it again with the root font at 200%.
   - Save screenshots in `qa/header/`.

## Phase 2: Contact page redesign (`/contact`, `src/pages/Contact.tsx`)

**Style:** same as the redesigned home. White/off-white background, centred hero, green fill buttons with dark labels, `--primary-ink` for green text, one eyebrow style, one card family, fluid tokens.

- Drop the dark stock-photo half (`contact-bg.jpg`). Stop importing it; **ask before deleting the file**.
- No glow blobs, no mono uppercase labels, no hard-coded `bg-green-500`.

**Problems to fix while rebuilding:**

- Two `<h1>`s (TextReveal used as h1 twice). There should be one.
- Form labels are not tied to inputs (no `htmlFor`/`id`).
- The labels are 12px mono uppercase.
- The WhatsApp URL and `tel:` are hard-coded. Use `src/lib/contact.ts`; add a `whatsappWithText(text)` helper there if needed.
- Success toast "Message sent!" has an exclamation mark.
- The failure copy depends on a toast only.
- The "within hours" reply claim is unverified.

### Sections

1. **Hero** (centred):
   - Eyebrow: "Contact".
   - h1: "Let's talk about your project".
   - Lead: "Tell us what slows your team down. We reply within one working day with a clear next step: a call, a quote or a straight answer." Mark the reply time `TODO(owner): confirm reply time`.
   - Logi docks on this page (`data-logi-dock`). Line: "WhatsApp is the fastest way to reach us."
2. **Three ways to reach us** (one card family, equal height, auto-fit grid):
   - **WhatsApp** (marked "Fastest"): number, button "Chat on WhatsApp" (prefilled text).
   - **Email**: address, button "Email us".
   - **Call**: number, button "Call us".
   - Optional line under the grid: working hours, `TODO(owner)`.
   - Each button is at least 44px tall, verb-first, and opens with the right scheme (`wa.me`, `mailto:`, `tel:`).
3. **Project form** (left, about 60%) + **What happens next** (right, about 40%; stacked on mobile with the form first).
   - **Fields, each with a visible label tied to its input:**
     - Name
     - Work email
     - Phone or WhatsApp (optional)
     - Company (optional)
     - **What do you need?** Chips used as a checkbox group: Software development, AI agent, Business automation, AI software, Ready-made solution, IKURO, HeyLane, Something else.
     - Message, with helper text "A few lines on the problem is enough."
   - Send the extra fields through `submitForm(..., "contact_page")` using `extra`.
   - **Validation:** fires on blur and clears as the user edits. Errors sit under the field, never blame the user, and are announced with `aria-describedby` + `aria-live="polite"`.
   - **Submit:** "Send message". While sending: "Sending…" (disabled, no layout shift).
   - **Success:** replace the form with an inline confirmation card: "Thanks, {name}. We've got your message and will reply to {email}." Add a secondary "Send another message" button. A toast is optional and has no exclamation mark.
   - **Failure:** inline message "Your message wasn't sent. Please try again, or reach us on WhatsApp." Include a WhatsApp button. Keep the user's typed text.
   - **What happens next**, as 3 numbered steps matching the home CTA promise:
     1. We read your message
     2. We reply with questions or a call slot
     3. You get a clear plan and a fixed quote
     Add the small note "Need an NDA first? We're happy to sign one before you share details." with `TODO(owner): confirm`.
4. **Office**:
   - Registered office: Logisaar Technologies Private Limited, Cuttack, Odisha, India, plus the CIN. The CIN uses normal digits, not mono-styled art.
   - "We work with clients across India and abroad" with `TODO(owner): confirm wording; don't mention USA/Canada offices until they exist`.
   - **No embedded Google Map** (performance and privacy). Use a plain "Open in Google Maps" link instead: `TODO(owner): exact address/maps URL`.
5. **Short FAQ** (accordion, 4 items max, each `TODO(owner)` to confirm):
   - How do quotes work?
   - Do you work with clients outside India?
   - Can you work with our existing software?
   - Are you hiring? (links to `/careers`)

**SEO:**

- Title: "Contact Logisaar | Software, AI agents and automation".
- Description: write from the hero lead.
- Keep the canonical URL.
- Add `ContactPage` + `Organization` JSON-LD using `src/lib/contact.ts`.

**Responsive:** fluid tokens only, no new px values (`npm run audit:px` must not regress), no overflow at 320.

## Phase 3: QA

- Phase 1.6 header check across all routes.
- axe on `/contact` at 375 and 1280: 0 serious/critical.
- **Keyboard test of the form:** tab order, chip group with Space, error announcement, focus on the first invalid field on submit, focus on the confirmation card after success.
- Reduced motion: final state shown.
- Submit the form once against the real endpoint. Check that the row lands in the Google Sheet with `source: contact_page` and the extra fields.
- Screenshots at 375 and 1280 in `qa/`.
- **Summary:** the changes, every `TODO(owner)`, and anything not done.

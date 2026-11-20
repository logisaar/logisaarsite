# Round 2 fixes (from Chinmay's review) — branch `redesign/home-v2`

## 1. New Logisaar logo (use everywhere)
Files are ready in `public/brand/` (transparent, high-res, made from the official logo):
- `logisaar-logo.webp|png` — full lockup (LS mark + LogiSaar + TECHNOLOGIES PVT. LTD.), for light backgrounds
- `logisaar-logo-white.webp|png` — same lockup for dark backgrounds
- `logisaar-mark.webp|png` — LS square only (favicon, Logi chat header, small spaces)

Tasks:
- Navbar, footer, TopBar/mobile menu, lead popup, 404, legal layout, Careers, IKURO page, OG image: replace `logo.png` / `assets/logo.png` with the new files. Use `<picture>` (webp + png fallback), explicit width/height, `alt="Logisaar Technologies Pvt. Ltd."`.
- Size: navbar logo height 44px desktop / 36px mobile (scrolled capsule 38px); footer 56px. The subtitle line must stay readable; if it is too small in the navbar, still use the full lockup (do not crop it).
- Regenerate favicons (`favicon.ico` 16/32/48, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `og-image.png` from `logisaar-mark.png` / `logisaar-logo.png` with the existing sharp script.
- Delete nothing yet; move old logo files to `src/assets/_originals/`.
- Also remove the stray `RUID8f3cea3bb7aa4daabc6d2ba95d9c3393.png` from the repo root after copying it to `src/assets/_originals/logisaar-logo-source.png`.

## 2. "Old images are not visible" on Chinmay's machine
In a clean Linux build they load, so check his Windows setup and the image pipeline:
1. Run `npm run dev` on Windows, open every page (/, /about, /portfolio, /solutions, all 9 /solutions/*, /products, /ikuro, /careers, /contact, legal) and list every `<img>` with naturalWidth 0, every 404 in the network tab, and every CSS `background-image` that does not resolve.
2. Compare against commit `8c71c48` (before redesign): list every image that was visible there and confirm it is still shown now (team photos, project screenshots, Chalk to Choice asset, contact/impact backgrounds, service images, solution mockups, client logos). Anything removed by accident: restore it with the optimized version.
3. Check case-sensitivity and spaces in paths (Windows vs Vercel Linux), the `public/images/*` files are committed (not git-ignored), and `image-manifest.json` paths match the files exactly.
4. Make sure `ResponsiveImage` has a working `<img>` fallback when AVIF fails, and that no reveal animation leaves images at `opacity: 0` (e.g. elements that start hidden and only animate when a ScrollTrigger fires).
Report the list of fixed images.

## 3. Logi: visible, and it travels the page by itself (no cursor following)
Remove all cursor-following logic. New behaviour:
- **Always visible.** 96px, solid white circular backing with a soft shadow and a 2px green ring so it stands out on any section (white, green, dark). z-index above page content but below modals/navbar dropdowns. Make sure it renders under `prefers-reduced-motion` too (static, parked bottom-right, still clickable).
- **Entrance:** 1.5 s after first load it pops up from the bottom-right with a small bounce and says "Hi! I'm Logi. I'll walk you through Logisaar."
- **Travels section by section on its own:** each section that has a `data-logi` attribute is a stop. When a section becomes the main section in view (IntersectionObserver, ~50% visible), Logi walks (smooth GSAP tween, 0.9–1.4 s, slight hop arc, squash on landing) to a perch spot beside that section's heading (right side of the heading on desktop; bottom-right corner on mobile), then shows that section's tip for ~4 s. Scrolling back up makes it walk back.
- **Between stops** it idles in place: breathing, blinking, looking toward the section content (not the cursor), occasional small hop. After 25 s without scrolling it falls asleep (z animation) and wakes on scroll.
- **Page to page:** on route change it stays mounted (already in App.tsx), walks off the edge and walks back in on the new page, then greets with a page-specific line (Careers: "We're hiring! Want help applying?", IKURO: "IKURO helps students decide better.", Solutions: "Pick a solution and I'll explain it.", Contact: "WhatsApp is the fastest way to reach the team.").
- Keep: click to open chat, quick replies, typed questions, WhatsApp hand-off, drag to move (after a drag it resumes its tour from the next section), Esc closes chat.
- Never cover the hero headline, primary buttons, form fields or the chat panel: if the perch spot overlaps an interactive element, shift it.
- Add `data-logi` stops on: hero, What we do, Ready solutions, IKURO, HeyLane, Work/testimonials, closing CTA; and on the main sections of Careers, IKURO, Solutions, Contact.

## 4. Footer: remove the CTA banner
Delete the "Ready to start? / Let's Talk" block at the top of `src/components/Footer.tsx` (and its spacing). The closing CTA section on the home page already does this job.

## 5. Also noticed in review
- The lead popup still appears when scrolling the home page. Change: open only from "Get a Quote" / quote buttons, never automatically.
- Radix warning: `DialogContent` needs a `DialogTitle` (lead popup) — add a visually hidden title.
- Three floating buttons now sit in the corners (WhatsApp, scroll-to-top, Logi). Keep WhatsApp + scroll-to-top stacked bottom-left with 12px gap; Logi owns bottom-right.

## Done means
`npm run build` + `npm run lint` pass; screenshots at 1440 / 768 / 390 of home (top, middle, bottom), Careers and IKURO saved to `Claude outputs/screens/round2/`, including Logi at three different stops; list of fixed images; commit "fix: round 2 review".

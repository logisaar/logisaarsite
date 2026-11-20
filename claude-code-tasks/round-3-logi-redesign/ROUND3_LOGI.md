# Round 3 — Redesign Logi in the OpenDots plush style

Reference: https://www.copilotkit.ai/opendots · repo https://github.com/CopilotKit/OpenDots (MIT).
OpenDots uses soft, felt/plush 3D characters ("Dots") as static PNGs, brought to life with small CSS motions (bob, tilt, desaturate) and status text. Logi should feel the same: a cute plush mascot, not a canvas of dots.

## Files ready for you
- `public/logi/logi.png` (512×512, transparent) and `logi.webp` — Logi, the OpenDots "mint" character recoloured to Logisaar green (#00D162 family).
- `public/logi/logi-256.webp|png` — small size for chat header / mobile.
- `claude-code-tasks/round-3-logi-redesign/reference/` — the four original OpenDots characters and their MIT `LICENSE`.

**Licence:** the base art is from OpenDots (MIT, © Atai Barkai). Add `THIRD_PARTY_NOTICES.md` at the repo root with the full MIT licence text and "Logi character art adapted from CopilotKit/OpenDots". Do not use the other three characters or the OpenDots / CopilotKit names anywhere on the site.

## Replace the canvas Logi
Rewrite `src/components/logi/Logi.tsx` + `logi.css` to render the plush image instead of drawing dots on a canvas. Keep everything that already works: mounted once in `App.tsx`, auto-tour section by section (round 2), page-to-page entrance, tips, click-to-chat, quick replies, keyword answers, WhatsApp hand-off, drag, Esc, reduced-motion handling, bottom-left WhatsApp + scroll-to-top.

### Look
- Size: 104px desktop, 80px mobile. `<picture>` webp + png, `draggable={false}`, `alt="Logi, the Logisaar assistant"`.
- Soft contact shadow under the feet (blurred ellipse, 20% black) that shrinks when Logi hops.
- No white circle backing any more (the plush art stands out on its own); add a subtle drop-shadow `0 10px 18px rgba(6,60,30,.18)`.
- Speech bubble and chat panel restyled to match: white, 18px radius, soft shadow, Inter 14px, small Logi avatar (logi-256) + "Logi · Logisaar assistant" in the chat header, a green "online" dot.

### States (CSS classes on the wrapper, like OpenDots' `.mascot.working` etc.)
| State | When | Motion |
|---|---|---|
| `idle` | between stops | gentle breathing: scaleY 1 → 1.03 → 1, 3.2 s loop, transform-origin bottom |
| `walking` | travelling to the next section | GSAP tween along a small arc, body tilts 6° toward the direction, quick 0.25 s bob steps, squash 0.94/1.06 on landing |
| `talking` | while a tip bubble is shown | small bounce every 0.6 s (translateY −4px), bubble pops in with scale 0.9 → 1 |
| `thinking` | while the chat bot is "typing" | rotate −6° and bob slowly (like OpenDots `working`) |
| `happy` | after the user clicks a quick reply or opens chat | one hop (−14px) + rotate 4° and back |
| `sleeping` | 25 s without scroll | rotate 8°, `filter: saturate(.6)`, floating "z z" text, slow breathing |
| `dragging` | while dragged | scale 1.08, tilt with drag velocity, shadow grows |

- **Blink:** overlay two small ellipses (eyelids) on the eyes every 3–6 s for 120 ms. Eye centres in the 512×512 art are roughly (192, 258) and (318, 258), eye size ~44×52 px; eyelid colour sampled from the surrounding fur (`#3DCB7D` ≈). Scale the overlay with the image. If it looks fake, drop the blink rather than ship it.
- **Look direction:** instead of following the cursor, Logi flips horizontally (`scaleX(-1)`) to face the direction it walks and faces the page content when perched.
- Reduced motion: no tour movement, no loops; Logi parked bottom-right, static, still clickable.

### Later (optional, needs new art)
For a fully original Logi with poses (wave, walk, sleep, think), generate matching images with an image tool using this prompt, then drop them into `public/logi/` as `logi-wave.png`, `logi-sleep.png`, `logi-think.png` and switch images per state:
> "Cute plush felt toy mascot, soft fuzzy texture, green (#00D162) pear-shaped body with two small leaf sprouts on top, small round black shiny eyes with white highlights, small open smile with pink tongue, stubby arms and feet, studio product photo, soft even lighting, centred, full body, transparent background, 1024×1024, same character in pose: [waving with right arm | sleeping with eyes closed | thinking with arm on chin | walking mid-step]."

## Done means
- No canvas left in Logi; plush Logi visible on every page, on white, green and dark sections.
- All states above visible; screenshots of idle, walking, talking, sleeping and chat open at 1440 and 390 saved to `Claude outputs/screens/round3/`.
- `THIRD_PARTY_NOTICES.md` added. `npm run build` + `npm run lint` pass. Commit "feat: round 3 - plush Logi".

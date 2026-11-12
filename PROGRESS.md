# PROGRESS.md — Anniversary Surprise Project

> Purpose: Single-source status file for AI agents. Read this **before** touching code. Pair with `new_requirements.md` for change requests.

---

## 1. Project Summary

A static, single-page **anniversary surprise web app** for a couple. Password-gated, animated, storytelling experience with a live "time-together" counter, cake-cutting interaction, a playful proposal, and a magazine-style timeline of the couple's real-life milestones (2016 → 2026).

- **Type:** Static site (HTML + CSS + vanilla TS/JS). No backend, no framework.
- **Entry:** `src/surprise/index.html`
- **Runs:** Open `index.html` directly in a browser. No build step required at runtime (browser loads pre-compiled `app.js`).
- **Language of source of truth:** TypeScript (`app.ts`). `app.js` is the hand/compiled JS that the browser actually loads.

---

## 2. File Structure (canonical)

```
surprise/
├── PROGRESS.md              # <— this file (status + architecture)
├── README.md
├── pyproject.toml           # (unused for the web app; project scaffold)
├── .python-version
└── src/surprise/
    ├── index.html           # Main app UI (all sections)
    ├── surprise.html        # (legacy/alt page — verify before editing)
    ├── new_requirements.md  # <— user writes new asks here
    ├── styles/
    │   └── main.css         # All styling (glassmorphism, animations, responsive)
    └── scripts/
        ├── app.ts           # TypeScript source (edit this)
        └── app.js           # Compiled JS actually loaded by index.html
```

**Rule for agents:** When editing behavior, edit **both** `app.ts` (source of truth) **and** `app.js` (what the browser runs). They must stay in sync.

---

## 3. Implemented Features

| # | Feature | Location (JS/TS section) | DOM ids / classes |
|---|---------|--------------------------|-------------------|
| 0 | **Login Gate** — password overlay, error/success emoji feedback, fades out on success. Decorated with a heart-shaped couple-bears frame (R3). Wrong password triggers a "Bubu peeks from his house" animation with a Try-Again button (R2). Password: `Jyoshi@123`. | `0. LOGIN GATE` | `#login-overlay`, `#login-form`, `#password-input`, `#login-feedback`, `#login-message`, `#login-emoji-state`, `.couple-heart-frame`, `#bubu-scene`, `#bubu-try-again-btn` |
| 0b | **Welcome Page** — congratulatory greeting overlay right after login. | `0. WELCOME / HAPPY ANNIVERSARY PAGE` | `#welcome-overlay`, `#welcome-anniversary-title`, `#welcome-go-btn`, `.celebration-emoji-container`, `.emoji-bounce` |
| 0c | **Wish Popup** — celebratory "I hope all your wishes come true" overlay right after submitting a wish. | `0. WELCOME / HAPPY ANNIVERSARY PAGE & WISH POPUP LOGIC` | `#wish-popup-overlay`, `#wish-popup-go-btn` |
| 1 | **Live Counter** — anniversary timer appears from the cake-cutting stage onward; on the top timer, the actual values are initially hidden behind 5 balloons that must be popped in order (1→5) to reveal the magic. After unlocking, a beautiful detailed text row below the main tiles also shows years, months, weeks, days, hours, minutes, and seconds. The duplicate bottom timer remains hidden until Proposal is accepted and the timeline is shown. | `1. LIVE COUNTER LOGIC` | `#timer-header`, `#timer-subtitle`, `#timer-pop-warning`, `#balloon-years`, `#balloon-days`, `#balloon-hours`, `#balloon-minutes`, `#balloon-seconds`, `#years`, `#days`, `#hours`, `#minutes`, `#seconds`, `#detail-years`, `#detail-months`, `#detail-weeks`, `#detail-days`, `#detail-hours`, `#detail-minutes`, `#detail-seconds`, `#timer-detail-line`, `#timer-bottom` |
| 2 | **Wish + Gift → Cake Cutting** — user writes a wish → submits → wish popup → balloons mini-game → opens a gift box → cake builds layer by layer → user cuts cake → reveals a bride-and-groom Bubu/Dudu image → proposal. | `2. WISH & CAKE CUTTING LOGIC` | `#wish-section`, `#wish-input`, `#save-wish-btn`, `#wish-warning`, `#cake-section`, `#gift-box-wrap`, `#cake-emoji`, `#cake-heading`, `#cake-instruction`, `#couple-section`, `#couple-image-card`, `.couple-cut-image` |
| 2b | **Fixed Celebration Banner** — curved hanging bunting spelling “HAPPY ANNIVERSARY” pinned near the top of the main app while scrolling. | `layout / main app frame` | `#anniversary-bunting`, `.bunting-letters`, `.flag`, `.bunting-rope-left`, `.bunting-rope-right` |
| 3 | **Proposal** — "Yes" reveals both the Live Counter and the Timeline. | `3. PROPOSAL INTERACTIVE LOGIC` | `#btn-yes`, `#btn-no`, `#response-msg`, `#proposal-section`, `#timeline-section` |
| 4 | **Magazine Timeline** — 10 pages (2016 → 2026), prev/next buttons, clickable page-dots, 3D flip transition. | `4. MAGAZINE TIMELINE CONTROLS` | `.magazine-page`, `#prev-btn`, `#next-btn`, `#page-dots`, `.dot`, `.year-badge` |
| 5 | **Particle Background + Confetti** — canvas-based floating heart particles, confetti bursts on cake-cut and "Yes". | `5. PARTICLE BACKGROUND & CONFETTI SYSTEM` | `#bg-canvas`, class `Particle`, `triggerConfetti()` |

---

## 4. Styling System (main.css)

- **Theme vars** on `:root`: `--primary #ff4d6d`, `--secondary #c77dff`, `--accent #ffb703`, `--bg-dark #0f0c1b`, `--card-bg`, `--card-border`, `--text-gold #f7d070`.
- **Glassmorphism cards** via `.glass-card` (backdrop-filter blur + border + shadow).
- **Fonts (Google):** `Great Vibes` (script), `Playfair Display` (serif), `Montserrat` (body).
- **Responsive:** `@media (max-width: 600px)` scales titles, padding.
- **Animations (keyframes):** `bob`, `shake`, `pop` (used by login feedback emoji).
- **Vendor prefixes:** `-webkit-backdrop-filter` included wherever `backdrop-filter` is used.

---

## 5. Timeline Content (Pages 1–10)

Real chronological events already written into `index.html`:
1. **2016** — Relationship begins (Jan 11, MP, school classroom).
2. **2017** — 10th class, classroom proposal, dad's first acceptance, FB Messenger LDR.
3. **2017–2018** — Intermediate LDR, secret hostel-phone night call.
4. **2019** — JEE Mains surprise, B.Tech reunion at railway station, first date at Oxygen Park.
5. **2020** — Bhongir Fort trip, Bawarchi lunch, COVID lockdown virtual LDR.
6. **2021** — Anniversary gift (golden rose + 100-language "I love you" locket) and sweet video-call memories that deepened the bond.
7. **2022** — Vikarabad surprise trip, weekly weekend meets.
8. **2023** — ECIL weekends, many outings, and the rainy Birla Mandir memory.
9. **2024** — Future-planning year, her US journey becoming real, visa-stress phase, and Waffle Cafe instant-song memory.
10. **2025** — US long-distance and the emotional tripod + letters surprise.
11. **2026** — Reunion in India, two months of family outings and birthday memories, her mother accepting the story, airport goodbye, and another long-distance phase.

---

## 6. Recent Changes / Bug-Fix Log

| Date | Change |
|------|--------|
| 2026-08-12 | Implemented the refined 5-step interactive game-like flow: Login → Welcome Overlay → Wish Screen → Wish Popup Overlay → Cake Cutting → Proposal → Revealed Timer & Timeline. |
| 2026-08-12 | Implemented R1: Added inline warning if wish is empty before cake cutting. Removed browser alert. |
| 2026-08-12 | Implemented R2: Created cute "Welcome / Happy Anniversary" page overlay shown immediately after correct password entry, calculating the correct ordinal anniversary year dynamically. |
| 2026-08-12 | Fixed CSS lint warning: added `-webkit-backdrop-filter` on `.login-overlay`. |
| 2026-08-12 | Fixed TS "possibly null" errors on `ctx` inside `Particle.draw()` and `animateParticles()` by asserting `canvas.getContext('2d') as CanvasRenderingContext2D`. |
| 2026-08-12 | Regenerated `app.js` to sync with `app.ts` (login gate was missing from compiled JS). |
| 2026-08-13 | Implemented R3: Added "Happy Nth Anniversary my qtπ 🫶💖" line to the welcome overlay with heart-hands emoji, dynamically calculated ordinal year. |
| 2026-08-13 | Implemented R4: Clear password input on wrong entry, track and display wrong attempt count, reveal a hint button after 3 wrong attempts that shows "You + me + year 💌". |
| 2026-08-13 | Implemented R5: Updated `startDate` proposed date/time to `2016-01-11T11:45:00` so the live counter counts from Jan 11 2016 11:45. |
| 2026-08-13 | Implemented R6: Replaced the single 🎂 emoji with a multi-tier animated cake (3 tiers, candle with flickering flame, sparkles, floating animation, drip decoration). Added a knife-emoji cursor while hovering the cake. Cake cut animation now slices the tiers on click. |
| 2026-08-13 | Implemented R7: "No" button now teleports far across the viewport (fixed position, samples random points, guarantees minimum ~45% viewport distance from cursor, falls back to opposite corner) so it cannot land on the cursor. |
| 2026-08-13 | Note: `app.ts` was not present in the repo; changes applied directly to `app.js`. If `app.ts` is added later, port these changes over. |
| 2026-08-13 | Follow-up: `startDate` now uses explicit IST offset `2016-01-11T11:45:00+05:30` — a fixed UTC instant; each viewer's browser applies their local time zone automatically so the "Time Together" counter is correct worldwide. |
| 2026-08-13 | Follow-up (cake cut): The right half of each cake tier no longer disappears. Each tier now has a `::before` slice piece that slides/rotates aside on cut, so the "cut slice" stays visible next to the cake. |
| 2026-11-12 | Implemented R1 (cake assembly): Added `.assembling` class to `#cake-emoji` that staggers plate → bottom → mid → top tier → candle → flame drop-in via new `cakeDropIn`, `candleDropIn`, `flameLightUp` keyframes. Triggered from the wish-popup "Go Ahead" handler and auto-removed after ~3.8s so ambient float/flicker resume. |
| 2026-11-12 | Implemented R2 (wrong-password Bubu scene): Added `#bubu-scene` with a CSS house (roof, chimney, windows, grass, flowers), a swinging door (`bubuDoorOpen`), Bubu's bear head peeking up (`bubuPeekUp`) and shaking "no" (`bubuShakeNo`), plus a "Try Again 💌" button. `setLoginState(false)` now hides the form/feedback and shows the scene; "Try Again" restores the password form. Node is cloned on each show to restart the CSS animations. |
| 2026-11-12 | Implemented R3 (login decoration): Added `.couple-heart-frame` above the login title — a heart (`clip-path: path(...)`) containing two 🐻 bears facing each other with party hats, 💞 between them, cartoon buildings (🏙️🏘️🏢🏡) as background, and a 🎀 ribbon bow on the top-right corner of the frame. |
| 2026-11-12 | Follow-up (R2+R3 characters): Replaced the plain 🐻 emoji with pure-CSS chibi `Bubu` (brown bear) and `Dudu` (white panda) couple characters — reusable `.chibi` component with `--chibi-fur`, `--chibi-inner-ear`, `--chibi-muzzle` CSS vars, ear/eye/cheek/muzzle/nose/mouth parts, panda eye-patches on Dudu, and CSS cone `.party-hat-cone` hats. Heart frame now shows Bubu + 💞 + Dudu with party hats; the door-peek scene shows a smaller Bubu via `.chibi-peek-size` overrides. |
| 2026-11-12 | Fixed R2 retry bug: Previous `showBubuScene()` cloned the scene node on every wrong attempt, which detached the original node that `const bubuScene` still referenced, so the 2nd+ wrong attempts never re-showed the scene or Try Again button. Replaced cloning with an animation-restart trick (set `animation: 'none'` on inner elements → force reflow via `offsetWidth` → clear inline style) so the same DOM node is reused on every attempt. |
| 2026-11-12 | Switched Bubu/Dudu characters to real images (pure CSS chibi was not cute enough). New `.couple-img` / `.angry-img` CSS replaces the previous `.chibi.*` markup inside both scenes; the heart frame, scalloped border, red bow, and the door-open + slide-out + shake-no animations are all preserved. An `onerror` handler adds a dashed placeholder box with instructions if a file isn't present. |
| 2026-11-12 | Wired up the user-provided images from `src/surprise/images/`: `bubu_dudu_heart_image.webp` → heart frame (latest swap from `bubu_dudu_happy.jpg`, using the same centered-inside-heart `object-fit: contain` behavior because the user provided a heart-oriented image meant specifically for this slot); `angry_dudu.jpg` → wrong-password door scene (160×auto, pink border + white bg + shadow for a polaroid look). Widened `.dudu-door-stage` to 320×220 so the image fits beside the door without overlap. |
| 2026-11-12 | Replaced the post-cake small bride/groom emoji portrait cards with the user-provided `images/bubu_dudu_bride_groom_image.jpeg`. `#couple-section` now reveals a single `.couple-image-card` / `.couple-cut-image` after cake cutting instead of two separate emoji avatar cards, while preserving the same reveal timing and animation. |
| 2026-11-12 | Added a fixed celebration bunting banner above the main app content: “HAPPY ANNIVERSARY” appears as individual ribbon flags hanging from curved threads tied to both sides, staying visible while the user scrolls. Positioned with `z-index: 5` so it sits above the main frame (cake-cut / anniversary area) but below modal overlays like login and welcome. |
| 2026-11-12 | Rewrote timeline pages 2022–2026 in a more personal, conversational “I’m remembering our story with you” voice instead of detached summary wording. Added Bachupally quality time (2022), ECIL weekends + rainy Birla Mandir memory (2023), split 2024 into its own page with visa-stress + Waffle Cafe instant-song memory, added the 2025 tripod/letters surprise, and expanded 2026 with India reunion, family outings, birthday at home, her mother hearing the story, airport tears, and returning to long-distance. |
| 2026-11-12 | Expanded earlier timeline years too: 2016 now includes the temple-mountain walk, weekend calls, and a sweet cheek-kiss memory; the 2017 proposal point now reflects stopping her after interval on the way to the biology lab and proposing with a chocolate; 2021 now includes sweet video-call memories and how that year felt like the beginning of many deeper, beautiful things between them. |
| 2026-11-12 | Improved timeline readability so each year page shows all text at once without internal scrolling. Increased `.magazine-wrapper` height from 520px to 760px, removed `.magazine-page` internal `overflow-y: auto`, and tightened title/list/quote typography so the year badge, title, points, and quote all remain visible together on-screen. |
| 2026-11-12 | Enhanced the “Make a Secret Anniversary Wish” section to feel much more energetic and celebratory: added decorative sparkles/hearts, a romantic kicker + intro copy, richer gradient/glow styling on `#wish-card`, a taller premium-looking textarea with stronger focus glow, and a brighter gradient CTA button for “Blow Candles & Cut Cake 🎂”. Functionality remained the same; this was a pure UI polish pass. |
| 2026-11-12 | Follow-up polish on the wish section: fixed textbox alignment by centering `#wish-section` as a whole while keeping the textarea content left-aligned, normalizing `.wish-input-group` to `width: min(100%, 650px)` with `align-items: stretch`, and forcing `#wish-warning` to align with the textbox width instead of drifting due to inline margins. |
| 2026-11-12 | Global theme refresh — switched the whole project from dark purple-black to a bright retro party palette (hot pink + sunshine yellow + bright lavender + cream backdrop). Added a two-part override block at the end of `main.css` that updates `:root` theme vars, body background, `.glass-card`, buttons, login/welcome overlays, inputs, textarea, timer boxes, magazine timeline pages (including year badge, title, points, quote), couple image card, bunting flags, proposal buttons, and the wish card so the whole app now feels aesthetic, colorful, and celebratory without touching earlier structural CSS. |
| 2026-11-12 | Theme v2 — Replaced the previous bright theme with a stronger retro party theme (hot pink + mustard + lavender + mint). Added a confetti-dot background on `body::before`, explicit text color fixes for login card, welcome card, counter, magazine pages, Bubu caption, wish-section, warnings, and response message so no text becomes unreadable against the lighter card backgrounds, and brighter per-flag gradient variants so the HAPPY ANNIVERSARY bunting now looks like real party bunting. |
| 2026-11-12 | Added global font size bump (body 17px, bigger timer/timeline/wish/login/welcome typography) and redesigned the “Make a Wish” popup: new kicker, bigger script title, italic Playfair line, soft sub-line, and 5 bouncing celebration emojis. Also added a mobile variant. |
| 2026-11-12 | Rolled back all four appended “RETRO PARTY THEME v2” override blocks from `main.css` (parts 1/2/3 + fonts/popup part 4). The user reported the piled overrides were breaking the layout. `main.css` is now back at 2152 lines ending at `@keyframes flameLightUp` with balanced braces (open=close=387). The original dark theme styling is restored. Note that the `.wish-popup-card` / `.wish-popup-kicker` / `.wish-popup-title` / `.wish-popup-line` / `.wish-popup-sub` class names referenced from the new wish-popup HTML no longer have matching CSS — they fall back to the existing `.welcome-card` / `.script-title` styling, which is fine functionally. The secret-wish download logic in `app.js` is kept as-is since the user asked for that separately. |
| 2026-11-12 | Re-applied a single, unified bright party theme at the end of `main.css` (two clearly-labeled blocks: 1/2 and 2/2). Hot pink + mustard yellow + lavender + mint palette, white cards with pink glow, bright backgrounds, readable deep-plum text everywhere (login, welcome, wish, counter, timeline, response message, bubu caption, wrong-passcode title). Bigger base font (17px). No piled overrides this time — easy to remove or tweak as one unit. |
| 2026-11-12 | Removed the secret-wish persistence + auto-download. Browsers cannot append to a disk file from a static page, and the download-on-every-submit flow was annoying. Dropped `SECRET_WISH_LOG_KEY`, `SECRET_WISH_SEPARATOR`, `formatWishTimestamp`, `appendWishToLog`, `downloadWishLog` helpers (~65 lines) from `app.js` and simplified the save-wish handler to just show the celebratory popup. The wish is now treated as a private, in-the-moment thing and is not saved anywhere. |
| 2026-11-12 | Adjusted the post-wish popup copy so it no longer repeats “Make a Wish” after the wish has already been made. The kicker now says “Your Wish Is Safe In Our Hearts”, the large highlighted line is now the hopeful blessing itself (“I Hope Every Single One Of Your Beautiful Wishes Comes True 💖”), and the supporting line invites the celebration to continue. |
| 2026-11-12 | Updated the timer reveal flow: `#timer-header` is now shown starting from the cake-cutting stage (when the wish popup Go Ahead button reveals `#cake-section`) instead of only after Proposal = Yes. The duplicate bottom timer `#timer-bottom` still appears only after Yes along with the timeline. |
| 2026-11-12 | Fine-tuned the cake/timer reveal timing so they visually appear together. `wishPopupGoBtn` now sets `#wish-section` to `display:none` and turns on both `#timer-header` and `#cake-section` **before** the wish popup overlay finishes fading out; the overlay is then hidden after 450ms and the cake assembly animation starts. This removes the perceived lag where the timer seemed to show later than the cake. |
| 2026-11-12 | Added an ordered balloon mini-game to the top anniversary timer. The subtitle now starts as “Pop the balloons in order to see the magic ✨”, five numbered balloons (1–5 for Years/Days/Hours/Minutes/Seconds) sit on the timer boxes, and clicking out of order shows an inline warning. Each correct pop blurs/fades that balloon; after the 5th pop, the real time values reveal and the subtitle changes back to “Years of Magic, Resilient Growth & Togetherness”. |
| 2026-11-12 | Refined the balloon mini-game: while locked, both `.timer-number` and `.timer-label` are now fully hidden (`opacity: 0` + `visibility: hidden`) so no timer text peeks through behind the balloons. Balloons were enlarged to 78×96 with a glossier, cuter look, and the `.popped` state now looks like a deflated balloon with no air (squashed/flattened near the bottom) instead of using blur. |
| 2026-11-12 | Balloon polish pass: added gentle floating/sway animation with staggered delays per balloon, replaced the plain straight string with curlier ribbon-like party threads, and made the popped state feel more realistic — smaller, wrinkled, and empty rather than looking like a flat board falling down. |
| 2026-11-12 | Inserted a gift-box gate in front of the cake. The cake section now first shows `#gift-box-wrap` with heading “Open the Gift to Reveal Something special 🎁🎂” and instruction “Pop all the balloons first, then open the gift to see the magic ✨”. The gift stays locked until `timerUnlocked === true`; clicking early shows a warning. After all balloons are popped, the gift becomes openable; clicking it animates the lid away, reveals `.cake-stage` via `.gift-revealed`, and then plays the existing layer-by-layer cake assembly animation there before normal cake-cutting continues. |
| 2026-11-12 | Fixed the broken gift/cake structure: restored the missing `<div class="cake-container" id="cake-section">` wrapper around the gift + cake area, removed the accidental duplicate `id="cake-heading"`, and added the missing closing brace on `.cake-container` in `main.css`. This stopped the cake from leaking into the make-a-wish view and fixed the wish-popup Go Ahead flow. |
| 2026-11-12 | Follow-up fix: removed an orphaned `user-select: none; }` fragment left behind after `@keyframes giftLidOpen` in `main.css`. That stray block was corrupting the stylesheet after the gift-box section and contributing to the “project is messed up” behavior. Verified CSS braces are now balanced again. |
| 2026-11-12 | Added a secondary elegant text-based elapsed-time line below the top anniversary timer tiles. It now shows `years / months / weeks / days / hours / minutes / seconds` in smaller decorative pills once the balloon mini-game is unlocked. The top big tiles remain as before; this new line is just a beautiful detailed summary below them. |
| 2026-11-12 | Follow-up timer/cake polish: (1) added `cakeReadyToCut` so the cake cannot be cut while it is still building after the gift opens — the click handler now returns until the 3.8s assembly animation finishes; (2) mirrored the detailed `years / months / weeks / days / hours / minutes / seconds` pill line into `#timer-bottom` as well, including the same singular/plural label logic. |
| 2026-11-12 | Bug fix: the first pass of the “don’t cut while building” logic forgot to declare `cakeReadyToCut` near `let cakeCut` / `let giftOpened`, so the guard was incomplete. Added `let cakeReadyToCut = false;` and ensured `cakeEmoji` returns early when `!cakeReadyToCut`. This makes the cake truly uncuttable until the 3.8s build animation finishes after the gift opens. |
| 2026-11-12 | Refined the wrong-password scene CTA: replaced the immediate plain red “TRY AGAIN” button with a delayed cute speech-bubble prompt (`#try-again-prompt`). Now the Dudu/Bubu door animation plays first, then after ~1.5s a thought-bubble style note (“dudu is telling you to try again 🥺💌”) and a candy-gradient pulse CTA appear. `showBubuScene()` and `hideBubuScene()` now manage `tryAgainRevealTimer` so the prompt cleanly resets on every wrong attempt. |
| 2026-11-12 | Added secret-wish persistence + export: every wish is now appended to a running log kept in `localStorage` under `anniversary_secret_wish_log`, with `============================================================` separators between entries, and a header line `Date/Time: DD-MM-YYYY HH:MM:SS   (ISO: ...)` followed by `Wish:` and the wish body. On every submit the full updated log is auto-downloaded as `secret_wish.txt` (matching the user’s existing `src/surprise/assets/secret_wish.txt` filename) so the user can save it back as the master file. Direct disk writes are not possible from a static browser page, which is why we combine localStorage + download. |



---

## 7. Known Constraints / Conventions for Agents

1. **No build tools installed.** Do not add webpack/vite unless requested. Keep `app.js` hand-synced with `app.ts`.
2. **No external JS libraries.** Confetti/particles are custom canvas. Don't pull in confetti.js/anime.js unless asked.
3. **`getElement(id)` throws if missing.** Any new DOM id in JS must exist in `index.html`, or wrap in try/catch.
4. **All sections are pre-rendered in HTML**, then `display:none / block / flex` toggled via JS. Follow the same pattern for new sections.
5. **Password is hardcoded** in `app.ts` (`LOGIN_PASSWORD`). Not secure — client-side only. Do not treat as real auth.
6. **Anniversary date** is hardcoded: `new Date('2016-01-11T11:45:00')` (proposed date/time).

7. **Keep the tone** — romantic, celebratory, warm. Colors: pink / gold / purple gradient.

---

## 8. How to Use This With `new_requirements.md`

1. User adds new asks to `src/surprise/new_requirements.md` (see that file's template).
2. Agent reads **PROGRESS.md first** (this file) → understands current state in ~1 read.
3. Agent reads `new_requirements.md` → applies only the listed changes.
4. Agent updates the **Recent Changes / Bug-Fix Log** (section 6) and, if a feature is added, the **Implemented Features** table (section 3).
5. Agent clears / archives completed items from `new_requirements.md`.

---

## 9. Quick Run

```bash
# From project root — just open in browser
xdg-open src/surprise/index.html   # Linux
# or drag index.html into a browser tab
```

Password to enter: `Jyoshi@123`

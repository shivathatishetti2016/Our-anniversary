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
| 0 | **Login Gate** — password overlay, error/success emoji feedback, fades out on success. Password: `Jyoshi@123`. | `0. LOGIN GATE` | `#login-overlay`, `#login-form`, `#password-input`, `#login-feedback`, `#login-message`, `#login-emoji-state` |
| 0b | **Welcome Page** — congratulatory greeting overlay right after login. | `0. WELCOME / HAPPY ANNIVERSARY PAGE` | `#welcome-overlay`, `#welcome-anniversary-title`, `#welcome-go-btn`, `.celebration-emoji-container`, `.emoji-bounce` |
| 0c | **Wish Popup** — celebratory "I hope all your wishes come true" overlay right after submitting a wish. | `0. WELCOME / HAPPY ANNIVERSARY PAGE & WISH POPUP LOGIC` | `#wish-popup-overlay`, `#wish-popup-go-btn` |
| 1 | **Live Counter** — anniversary timer; hidden until Proposal is accepted. | `1. LIVE COUNTER LOGIC` | `#timer-header`, `#years`, `#days`, `#hours`, `#minutes`, `#seconds` |
| 2 | **Wish + Cake Cutting** — user writes a wish → submits → wish popup → cake cutting interaction → reveals portraits → proposal. | `2. WISH & CAKE CUTTING LOGIC` | `#wish-section`, `#wish-input`, `#save-wish-btn`, `#wish-warning`, `#cake-section`, `#cake-emoji`, `#cake-heading`, `#cake-instruction`, `#couple-section`, `#bride-card`, `#groom-card` |
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
6. **2021** — Anniversary gift (golden rose + 100-language "I love you" locket).
7. **2022** — Vikarabad surprise trip, weekly weekend meets.
8. **2023–2024** — Internship, dad's full approval, her US MS visa.
9. **2025** — US long-distance, mom's acceptance.
10. **2026** — Reunion in India, her parents' acceptance.

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

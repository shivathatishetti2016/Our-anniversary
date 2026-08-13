# new_requirements.md

---

## 🤖 INSTRUCTIONS FOR THE AI AGENT (read this first)

You are being handed **only this file**. Follow this workflow — do not skip steps:

1. **Read `PROGRESS.md`** at the project root **before writing any code**. It contains:
   - Project summary, file structure, and file locations.
   - The list of already-implemented features + their DOM ids / sections.
   - Styling system (theme vars, fonts, animations).
   - Conventions and constraints (e.g. keep `app.ts` and `app.js` in sync, no new libraries, section toggling pattern).
2. **Read the "Active Requirements" section below.** The user writes only the *WHAT* (plain English). **You** decide the *WHERE* (which files, which sections, which selectors) using what you learned from `PROGRESS.md`.
3. **Implement each active requirement.** For every requirement:
   - Touch as few files as needed.
   - Follow the existing code style and theme.
   - If you change JS behavior, update **both** `src/surprise/scripts/app.ts` **and** `src/surprise/scripts/app.js` so they stay in sync.
   - Do not add external libraries or a build system unless the requirement explicitly asks for it.
   - Keep it mobile-friendly (there's already a `@media (max-width: 600px)` block).
4. **After shipping, update `PROGRESS.md`:**
   - Add / edit rows in §3 *Implemented Features* if a new feature was added or an existing one materially changed.
   - Add a dated entry in §6 *Recent Changes / Bug-Fix Log* summarizing what you did.
5. **Update this file:** move completed items from *Active Requirements* into *Done / Archived* with today's date.
6. If a requirement is ambiguous, make a reasonable choice consistent with the existing romantic pink/gold/purple theme and note the assumption in the changelog — don't block.

> TL;DR — Agent workflow: **read PROGRESS.md → read Active Requirements → implement → update PROGRESS.md → archive requirement**.

---

## ✍️ How the user writes a requirement (WHAT only, no code paths needed)

```
### R<n>: <short title>
- **What:** describe the change / feature in plain English
- **Why:** (optional) reason / motivation
- **Looks like / feels like:** (optional) any visual or behavior detail
```

The user does **not** need to specify files, selectors, or code locations. The agent figures those out from `PROGRESS.md`.

---

## Active Requirements

<!-- Newest at the top. -->

_(No active requirements — add new ones here.)_

---

## Done / Archived

### R7: "No" button runs far away (Shipped: 2026-08-13)
- **What:** The "No" proposal button now teleports to a spot at least ~45% of the viewport away from the cursor (or the opposite corner) so it can never land under the pointer.

### R6: New animated multi-tier cake with knife cursor (Shipped: 2026-08-13)
- **What:** Replaced the single 🎂 emoji with a CSS-animated 3-tier cake (candle + flickering flame + sparkles + floating motion). Cursor becomes a knife emoji while over the cake, and the cake visibly "cuts" on click.

### R5: Proposed date/time updated (Shipped: 2026-08-13)
- **What:** Live counter now counts from Jan 11 2016 11:45 (`startDate = new Date('2016-01-11T11:45:00')`).

### R4: Clear password + wrong-attempt counter + hint (Shipped: 2026-08-13)
- **What:** Wrong password now clears the input, shows a running wrong-attempts count, and after 3 wrong attempts reveals a "💡 Show Hint" button that displays "You + me + year 💌".

### R3: "Happy Nth Anniversary my qtπ" line (Shipped: 2026-08-13)
- **What:** The post-login welcome overlay now shows a sweet second line "Happy Nth Anniversary my qtπ 🫶💖" (heart-hands emoji), with N auto-calculated.


<!-- Completed items will be moved here (with date) once shipped. -->

### R1: Don't allow cake cutting without a wish (Shipped: 2026-08-12)
- **What:** The "Blow Candles & Cut Cake" button should only work after the user actually writes something in the wish box. If the box is empty and they click the button, show a friendly warning like *"Please make a wish before cutting the cake ❤️"* — do not proceed to the cake step yet.
- **Looks like / feels like:** The warning appears inline near the wish box, matches the pink/gold romantic theme, and disappears once they start typing.

### R2: Show a "Welcome / Happy Anniversary" page right after login (Shipped: 2026-08-12)
- **What:** After entering the correct password, don't jump straight to the counter. First show a cute celebration page with:
  - A message: "Congratulations! You successfully logged in to my heart 💖".
  - A big "Happy 11th Anniversary" heading — auto-calculated from the anniversary date.
  - A line like: "I hope all your wishes come true ✨".
  - Cute animations / imagery (floating hearts, sparkles, bobbing cake, etc.).
  - A **"Go Ahead →"** button. When clicked, hide this welcome page and reveal the rest of the app.

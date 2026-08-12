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

### R1: Don't allow cake cutting without a wish
- **What:** The "Blow Candles & Cut Cake" button should only work after the user actually writes something in the wish box. If the box is empty and they click the button, show a friendly warning like *"Please make a wish before cutting the cake ❤️"* — do not proceed to the cake step yet.
- **Why:** Making a wish is the whole point; skipping it feels wrong.
- **Looks like / feels like:** The warning should appear inline near the wish box (not a browser `alert()` popup), match the pink/gold romantic theme, and disappear once they start typing.

---

### R2: Show a "Welcome / Happy Anniversary" page right after login
- **What:** After entering the correct password, don't jump straight to the counter. First show a cute celebration page with:
  - A message: "Congratulations! You successfully logged in to my heart 💖".
  - A big "Happy 11th Anniversary" heading — **auto-calculate the year number** from the anniversary date so it becomes 12th next year, and so on.
  - A line like: "I hope all your wishes come true ✨".
  - Cute animations / imagery (floating hearts, sparkles, bobbing cake, etc. — whatever feels celebratory).
  - A **"Go Ahead →"** button. When clicked, hide this welcome page and reveal the rest of the app (counter, wish, cake, proposal, timeline).
- **Why:** Feels warmer and more special than dropping straight into the timer.
- **Looks like / feels like:** Same romantic pink/gold/purple theme as the rest of the app. Must look great on mobile too.

---

### R3: _(placeholder — add your next requirement here)_
- **What:**
<!-- delete this whole R3 block if you don't have a third item yet -->

---

## Done / Archived

<!-- Completed items will be moved here (with date) once shipped. -->

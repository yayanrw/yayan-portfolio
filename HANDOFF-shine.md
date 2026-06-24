# Handoff: UI shine refinements

**Goal**: Apply 6 visual polish changes — shining gradient nav underline + hover borders, left-aligned 60%-width sections, serif about title.

**Done**: Nav active shining-gradient underline; all sections left-aligned at max-width 60% (full width ≤767px); skills/certs/domains shining gradient border on hover; cert cards switched to subtle divider border; about title now Instrument Serif (type-h1-display); tsc + build pass.

**Next**: Run `npm run dev` to eyeball the shimmer, then update or delete `docs/ui-refinements.md` (it still describes the old pill/background approach).

**Watch out**: One `@keyframes shine` + masked `::after` drives the nav underline AND all three border hovers via grouped selectors in `app/globals.css` — edit there, not per-component. `prefers-reduced-motion` freezes the sweep.

# Task 3 Report: Navigation Component

**Status:** Complete

## Files Changed

- `components/Nav.tsx` — created (Client Component, no props)
- `app/globals.css` — Nav CSS block appended after reduced-motion media query
- `app/layout.tsx` — `<Nav />` imported and rendered above `{children}`

## Implementation Notes

### Nav.tsx
- `'use client'` directive; `useEffect` + `useState` for scroll, menu, and active section state
- Passive scroll listener (`{ passive: true }`) on `window` — clears on unmount
- `IntersectionObserver` threshold 0.3, observes all 5 section elements by ID; disconnects on unmount
- Mobile toggle flips between `[ MENU ]` / `[ CLOSE ]` text with `aria-expanded` + `aria-controls` for screenreader semantics
- Mobile menu links use `tabIndex={menuOpen ? 0 : -1}` so they're only focusable when visible
- Template literal pattern `nav${scrolled ? ' scrolled' : ''}` (no stray spaces in class names)

### globals.css
- Colors use Tailwind v4 CSS variable names (`--color-data`, `--color-purple`, `--color-white`) matching the existing `@theme` block
- `padding` transition added to `.nav-menu` / `.nav-menu.open` so menu doesn't clip content during open animation — padding is 0 when closed, `var(--space-4)` when open
- `.nav-link:focus-visible` and `.nav-toggle:focus-visible` both use `--color-purple` outline with `outline-offset: 4px`, consistent with the global `:focus-visible` rule

### layout.tsx
- `Nav` rendered after skip-link, before `{children}` — correct stacking order

## TypeScript
`npx tsc --noEmit` — no errors.

## Deviations from Brief
- Brief CSS used bare `var(--data)` / `var(--purple)` / `var(--white)` — changed to `var(--color-data)` etc. to match the existing `@theme` token names in `globals.css` (Tailwind v4 prefixes color tokens with `--color-`)
- Added `padding` to `.nav-menu` transition so the content doesn't jump when `max-height` collapses; padding is zeroed when closed to prevent ghost spacing
- `aria-hidden`, `aria-expanded`, `aria-controls`, and `tabIndex` management added beyond brief spec for full keyboard/screenreader accessibility

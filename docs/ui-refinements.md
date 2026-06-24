# UI/UX Refinements

**Status:** Planning  
**Date:** 2026-06-24

A series of focused visual and interaction improvements to enhance readability, hierarchy, and engagement across the portfolio. All changes use existing design tokens (purple gradient, spacing, fonts).

---

## 1. Section Title Typography Enhancement

**Goal:** Make section titles (Work, Skills, Certs, About, Contact) more prominent and visually distinct. Apply display-style serif typography scaled down from `.type-display` (hero name).

**Changes:**

- Create new `.type-h1-display` utility class in `app/globals.css`
- Basis: `.type-display` but smaller
  - Font: Instrument Serif (same as hero)
  - Size: `clamp(32px, 6vw, 48px)` (smaller than hero's `56px–104px`)
  - Weight: 400
  - Line height: 0.95
  - Letter spacing: -0.02em
- Apply `.type-h1-display` to all section title elements (`.section h2`)

**Files to modify:**
- `app/globals.css` — add `.type-h1-display` class
- `app/page.tsx` — update section titles to use new class

**Testing:**
- Desktop: section titles should feel heroic but not compete with hero name
- Tablet/mobile: titles should scale smoothly and remain readable
- Verify: titles are consistently sized across all sections

---

## 2. Work Section Table Width & Readability

**Goal:** Constrain work section width for better readability. Table currently spans full viewport and is uncomfortable to scan.

**Changes:**

- Add max-width constraint to work section container
  - Max-width: `60rem` (960px) — comfortable reading width
  - Center horizontally: `mx-auto`
  - Maintain padding: `px-clamp(24px, 5vw, 80px)` for edge breathing room
- Reduce/adjust table cell padding for mobile (`md` breakpoint and below)
  - Compress project row padding: `py-3 md:py-4` instead of full padding
- Ensure project cards/rows don't force horizontal scroll on mobile

**Files to modify:**
- `app/page.tsx` — wrap work section content in max-width container
- `app/globals.css` — add `.work-section-container` with max-width and centering

**Testing:**
- Desktop (1440px+): content sits at 60rem, centered, plenty of whitespace
- Tablet (768–1024px): content still readable, doesn't compress
- Mobile (< 768px): rows adjust gracefully, no horizontal scroll
- Typography: project titles and dates are legible at all sizes

---

## 3. Navigation Active Indicator — Gradient One-Shot Animation

**Goal:** Replace solid purple active nav indicator with animated gradient on transition (deep purple → light purple). One-shot animation plays when section becomes active, then holds steady.

**Changes:**

- Update active nav link styling (when scroll position matches section or link clicked)
- Animation: gradient fade-in one-shot when active state is applied
  - Animates from deep purple (`#7B2FBE`) to light purple gradient (`#9D5FFF`)
  - Duration: 300ms
  - Easing: `ease-in-out`
  - Fill mode: `forwards` (holds final state after animation completes)
  - Trigger: when nav link receives active class (scroll position matches section or user clicks)
- After animation completes: gradient stays in light purple state for the duration of active

**Implementation example:**
```css
@keyframes activeGradientFadeIn {
  0% {
    background: #7B2FBE;
    box-shadow: none;
  }
  100% {
    background: linear-gradient(90deg, #7B2FBE, #9D5FFF);
    box-shadow: 0 0 8px rgba(157, 95, 255, 0.3);
  }
}

.nav-link {
  transition: all 150ms ease-in-out;
  background: transparent;
}

.nav-link.active {
  animation: activeGradientFadeIn 300ms ease-in-out forwards;
}
```

**Files to modify:**
- `app/components/Nav.tsx` — ensure active nav links get `.active` class based on scroll position
- `app/globals.css` — add gradient animation keyframes and `.nav-link.active` styling

**Testing:**
- Scroll through sections: nav indicator animates once when section becomes active, stays gradient
- Click nav links: indicator animates to new section with one-shot
- Switch between sections: animation runs each transition
- Mobile menu: indicator behaves consistently
- Verify: animation respects `prefers-reduced-motion` (may need `prefers-reduced-motion` rule to skip animation)

---

## 4. Skills Section — Hover Gradient Animation

**Goal:** Add interactive gradient color animation on skill tag hover. Deep purple → light purple transition on enter, reverse on exit.

**Changes:**

- Skill tags (language, framework, tool tags): currently static background
- On hover:
  - Background animates from deep purple (`#7B2FBE`) through light purple (`#9D5FFF`) and back
  - Animation duration: 300ms
  - Easing: `ease-in-out`
  - Trigger: `:hover` pseudo-class
- Implementation: CSS keyframes with background-position shifting

**Implementation example:**
```css
@keyframes skillHoverGradient {
  0% {
    background: linear-gradient(90deg, #7B2FBE, #7B2FBE);
  }
  50% {
    background: linear-gradient(90deg, #7B2FBE, #9D5FFF);
  }
  100% {
    background: linear-gradient(90deg, #7B2FBE, #7B2FBE);
  }
}

.skill-tag:hover {
  animation: skillHoverGradient 300ms ease-in-out;
}
```

**Files to modify:**
- `app/page.tsx` (Skills section) — ensure skill tags have hover classes
- `app/globals.css` — add `.skill-tag:hover` animation

**Testing:**
- Desktop: hover over any skill tag, gradient animates smoothly
- Mobile: animation doesn't trigger on tap (consider `:active` or remove on touch)
- Accessibility: animation respects `prefers-reduced-motion`
- Performance: animation is smooth (60fps), no lag

---

## 5. Certificate Cards — Deep Purple Border + Hover Light Purple Animation

**Goal:** Update certificate card borders and add animated light purple glow on hover for enhanced interactivity.

**Changes:**

- Default certificate card border: solid deep purple (`#7B2FBE`), ~2px width
- On hover:
  - Border animates in light purple (`#9D5FFF`)
  - Glow/shadow effect: soft light purple shadow
  - Animation: 300ms fade-in/fade-out on hover
  - Trigger: `:hover` pseudo-class

**Implementation example:**
```css
.cert-card {
  border: 2px solid #7B2FBE;
  transition: box-shadow 300ms ease-in-out;
}

.cert-card:hover {
  box-shadow: 0 0 12px rgba(157, 95, 255, 0.5);
  border-color: #9D5FFF;
}
```

**Files to modify:**
- `app/page.tsx` (Certificates section) — ensure cert cards have hover classes
- `app/globals.css` — add `.cert-card:hover` border and shadow animation

**Testing:**
- Desktop: hover cert cards, border color and glow animate smoothly
- Mobile: hover equivalent (`:active` or focus state) triggers animation
- All cards: consistent border color and glow intensity
- Accessibility: animation respects `prefers-reduced-motion`

---

## Implementation Order

Recommended sequence (dependencies from top to bottom):

1. **Section Title Typography** (no dependencies) → quick win, visual foundation
2. **Work Section Width** (no dependencies) → improves readability immediately
3. **Nav Active Indicator Gradient** (uses existing nav logic) → builds on current interaction
4. **Skills Hover Gradient** (isolated to skills section) → localized enhancement
5. **Cert Hover Animation** (isolated to certs section) → final polish

---

## Verification Checklist

- [ ] All animations respect `prefers-reduced-motion`
- [ ] Typography hierarchy is clear: Hero > Section Titles > Body > Labels
- [ ] Work section content fits comfortably at 60rem max-width
- [ ] Nav active indicator animates smoothly when scrolling/clicking
- [ ] Skill tags respond to hover with gradient animation
- [ ] Certificate cards show border and glow on hover
- [ ] Mobile responsiveness: no horizontal scroll, text legible
- [ ] Performance: animations run at 60fps, no jank
- [ ] Color palette: only using `#7B2FBE` (deep) and `#9D5FFF` (light) for gradients

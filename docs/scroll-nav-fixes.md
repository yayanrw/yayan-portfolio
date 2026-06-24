# Scroll & Nav Fixes

## Issue
Section titles were being covered by the fixed navigation bar when scrolling or clicking nav links. Additionally, multiple scroll stop points were occurring, creating a jarring user experience.

## Changes Made to `app/globals.css`

### 1. Removed Mandatory Scroll Snapping
**Before:**
```css
html {
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
}
```

**After:**
```css
html {
  scroll-behavior: smooth;
  overflow-y: scroll;
}
```

**Why:** The `scroll-snap-type: y mandatory` was forcing the browser to snap/stop at each section, creating multiple stop points during scroll. This was causing two distinct stops when scrolling down.

---

### 2. Removed Snap Alignment from Sections
**Before:**
```css
.section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding: 0 clamp(24px, 5vw, 80px);
}
```

**After:**
```css
.section {
  min-height: 100vh;
  padding: 0 clamp(24px, 5vw, 80px);
  scroll-margin-top: 80px;
}
```

**Why:** 
- Removed `scroll-snap-align: start` since we disabled scroll snapping on the html element
- Removed `scroll-snap-stop: always` which was forcing mandatory stops
- Added `scroll-margin-top: 80px` to ensure sections scroll with 80px offset from the top, preventing the fixed nav (≈60px height) from covering section titles

---

## Result
- **Smooth scrolling** without forced snap stops
- **Proper spacing** between fixed nav and section titles
- **Single, fluid scroll motion** when clicking nav links or scrolling manually
- Nav clears section dividers by ~80px buffer

## Testing
1. Open the app and scroll down through sections
2. Click nav links (`Work`, `Skills`, `Certs`, `About`, `Contact`)
3. Verify: sections scroll smoothly without multiple stops and titles are visible below nav

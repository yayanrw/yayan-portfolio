# Style Guide — Yayan Rahmat Wijaya Portfolio

**Direction:** The Athlete-Engineer  
**Premise:** The same discipline that tracks HRV at 5am builds the systems that run in production. This portfolio doesn't sell you — it documents you. Precision over decoration. Every element earns its place.

---

## 1. Color

### Palette

```
--night:    #0A1628   Background. Deep navy — pre-dawn training session.
--surface:  #111D30   Cards, elevated sections. Slightly lighter than night, same temperature.
--purple:   #7B2FBE   The single accent. Deep cinematic purple — editorial weight, not neon, not violet.
--data:     #A8C5DA   Labels, secondary text, dividers. Muted blue-grey. Cool against the purple.
--white:    #F2F4F5   Primary text. Off-white with a blue lean, not pure #FFF.
```

### Why deep purple

Purple sits further from the "AI dev portfolio" amber/green/vermilion cluster. On dark navy it reads as cinematic and editorial — the same color language as film photography, darkroom work, analog grain. It connects the code side with the film photo in About without forcing a theme. Not violet (too electric), not magenta (too fashion), not dark enough to disappear — `#7B2FBE` holds its weight.

### Usage rules

Purple is the loudest thing on the page. It appears in exactly three places:
1. The readiness ring arc (hero only)
2. The left-border reveal on project row hover
3. Active nav indicator (underline, 2px)

Nowhere else. Not in buttons, not in headings, not as a background. Its impact comes from restraint.

```
--night     ~70% of all pixels
--surface   ~15%
--white     ~10%
--data      ~4%
--purple    ~1%
```

### Color tokens (CSS)

```css
:root {
  --night:   #0A1628;
  --surface: #111D30;
  --purple:  #7B2FBE;
  --data:    #A8C5DA;
  --white:   #F2F4F5;

  /* Derived */
  --divider:      rgba(168, 197, 218, 0.18);   /* --data at 18% */
  --surface-hover: rgba(17, 29, 48, 0.7);
  --purple-dim:   rgba(123, 47, 190, 0.15);    /* purple glow, use sparingly */
}
```

---

## 2. Typography

Three tiers. Each maps to a content type. Never use one tier where another belongs.

### Typefaces

| Tier | Face | Role |
|---|---|---|
| Display | `Instrument Serif` | Name, section eyebrows. Characterful. Used at large size only. |
| Body | `Geist` | All prose, project descriptions, nav links. Neutral and fast to read. |
| Data | `JetBrains Mono` | Stats, labels, tags, years, stack names, ALL CAPS metadata. |

**Import — Next.js (`next/font`):**

Use `next/font` — it self-hosts, eliminates FOUT, and requires no `<link>` tag.

```ts
// app/fonts.ts
import { Instrument_Serif, Geist, JetBrains_Mono } from 'next/font/google'

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: '400',
  variable: '--font-serif',
})

export const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
})

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
})
```

```tsx
// app/layout.tsx
import { instrumentSerif, geist, jetbrainsMono } from './fonts'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

Font variables (`--font-serif`, `--font-sans`, `--font-mono`) are then consumed in `globals.css` and via Tailwind's `fontFamily` config.

### Type scale

```css
/* Display — hero name only */
.type-display {
  font-family: 'Instrument Serif', Georgia, serif;
  font-size: clamp(56px, 10vw, 104px);
  font-weight: 400;          /* Light weight at large size — don't bold it */
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: var(--white);
}

/* H1 — section titles */
.type-h1 {
  font-family: 'Geist', system-ui, sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--white);
}

/* Body — prose, project descriptions */
.type-body {
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
  color: var(--white);
}

/* Body small — secondary prose */
.type-body-sm {
  font-family: 'Geist', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--data);
}

/* Label — ALL CAPS metadata, tags, categories */
.type-label {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--data);
}

/* Data — stats numbers, years */
.type-data {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  line-height: 1;
  color: var(--white);
}

/* Caption — smallest, supporting detail */
.type-caption {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 11px;
  font-weight: 400;
  color: var(--data);
  opacity: 0.7;
}
```

### Typography rules

- Instrument Serif appears in **at most 2 places per screen**: the hero name and one large eyebrow. Never for body text.
- Never set JetBrains Mono in a serif size (20px+) unless it's a stat number.
- Italic in Instrument Serif can be used for one-word emphasis in the about section. Not for decoration.
- No bold on Instrument Serif. The face is expressive at 400 weight — bolding it makes it heavy and ordinary.

---

## 3. Spacing

8px grid. Always multiples of 8 (or 4 for fine adjustments).

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-7:  48px;
  --space-8:  64px;
  --space-9:  96px;
  --space-10: 128px;
}
```

### Page rhythm

```
Max content width:  1100px
Side padding:       clamp(24px, 5vw, 80px)
Section gap:        96–128px (--space-9 to --space-10)
Component gap:      32–48px (--space-6 to --space-7)
Inline gap:         8–16px (--space-2 to --space-4)
```

Section gaps are intentionally large. White (dark) space is not waste — it creates the sense that each section is a contained thought, like intervals in a training session.

---

## 4. Components

### 4.1 Navigation

```
┌──────────────────────────────────────────────────────────────────┐
│  YRW          WORK  SKILLS  CERTS  ABOUT  CONTACT                │
└──────────────────────────────────────────────────────────────────┘
```

- Logo: `YRW` in JetBrains Mono, 13px, --data color. Not the full name.
- Nav links: JetBrains Mono, 11px, uppercase, letter-spacing 0.12em, --data color. Five links: WORK · SKILLS · CERTS · ABOUT · CONTACT.
- Active link: 2px purple underline offset 4px below. No color change on the text.
- Hover: text shifts to --white in 150ms. No background, no border.
- On scroll: `backdrop-filter: blur(12px)` + `background: rgba(10, 22, 40, 0.85)`. No solid bar.
- Mobile: links collapse to `[ MENU ]` toggle in mono. Menu slides down, not from side. All five links appear in the dropdown — no abbreviation.
- No sticky shadow. No border-bottom on the nav bar.

```css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  padding: var(--space-4) clamp(24px, 5vw, 80px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  transition: background 200ms ease, backdrop-filter 200ms ease;
}
.nav.scrolled {
  background: rgba(10, 22, 40, 0.85);
  backdrop-filter: blur(12px);
}
.nav-link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--data);
  text-decoration: none;
  padding-bottom: 4px;
  transition: color 150ms ease;
}
.nav-link:hover { color: var(--white); }
.nav-link.active {
  color: var(--white);
  border-bottom: 2px solid var(--purple);
}
```

---

### 4.2 Hero + Readiness Ring

The signature element. The ring draws on page load, settles, then the name fades in. One orchestrated sequence, not scattered animation.

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         ┌──────────────────────────────────┐        │
│         │          ╭───────╮               │        │
│         │        ╭─╯  94%  ╰─╮             │        │  ← Readiness ring, purple stroke
│         │        │  BUILDER  │             │        │
│         │        ╰─╮       ╭─╯             │        │
│         │          ╰───────╯               │        │
│         └──────────────────────────────────┘        │
│                                                     │
│  Yayan Rahmat Wijaya                                │  ← Instrument Serif, display size
│  Full-stack engineer. Builder. Athlete.             │  ← Geist 14px, --data color
│                                                     │
│  12 PROJECTS  ·  4 LANGUAGES  ·  847 DAYS           │  ← JetBrains Mono stats row
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Ring implementation:**
```html
<svg class="readiness-ring" viewBox="0 0 120 120" width="160" height="160">
  <!-- Track -->
  <circle cx="60" cy="60" r="52"
    fill="none"
    stroke="rgba(168, 197, 218, 0.12)"
    stroke-width="4" />
  <!-- Arc — amber, animated -->
  <circle cx="60" cy="60" r="52"
    fill="none"
    stroke="#7B2FBE"
    stroke-width="4"
    stroke-linecap="round"
    stroke-dasharray="326.7"
    stroke-dashoffset="326.7"
    transform="rotate(-90 60 60)"
    class="ring-arc" />
  <!-- Center label -->
  <text x="60" y="55" text-anchor="middle"
    font-family="JetBrains Mono" font-size="18" fill="#F2F4F5">94%</text>
  <text x="60" y="70" text-anchor="middle"
    font-family="JetBrains Mono" font-size="8" fill="#A8C5DA" letter-spacing="2">BUILDER</text>
</svg>
```

```css
/* stroke-dasharray = 2π × 52 ≈ 326.7 */
/* Target 94% fill: offset = 326.7 × (1 - 0.94) ≈ 19.6 */

.ring-arc {
  transition: stroke-dashoffset 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.ring-arc.animate {
  stroke-dashoffset: 19.6;
}

@media (prefers-reduced-motion: reduce) {
  .ring-arc { transition: none; }
  .ring-arc.animate { stroke-dashoffset: 19.6; }
}
```

```js
// Trigger on load, short delay for page settle
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.ring-arc').classList.add('animate');
  }, 300);
});
```

**Hero sequence:**
1. `0ms` — page paints, ring track visible (dim circle)
2. `300ms` — ring arc begins drawing (900ms)
3. `800ms` — name fades in (`opacity: 0 → 1`, 400ms)
4. `1000ms` — descriptor and stats fade in (300ms, staggered 100ms apart)

Total sequence: ~1.4s. One breath. Done.

---

### 4.3 Project Row

No cards. No screenshots. No hover glow. Projects listed as log entries — like a git log, a training log, a run record.

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  msglowformen           Skincare · Laravel · Next.js    2024 →  │
│ ─────────────────────────────────────────────────────── │
│  TitanChessEngine        Chess Engine · Go              2024    │
│ ─────────────────────────────────────────────────────── │
│  HeyWatchFace            Wearable · Connect IQ          2023    │
│ ─────────────────────────────────────────────────────── │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

On hover: 2px amber left border appears, name shifts 4px right. No scale, no card lift, no shadow.

```html
<article class="project-row">
  <a href="/work/msglowformen" class="project-row__link">
    <span class="project-row__name type-body">msglowformen</span>
    <span class="project-row__tags type-label">Skincare · Laravel · Next.js</span>
    <span class="project-row__year type-caption">2024 →</span>
  </a>
</article>
```

```css
.project-row {
  border-bottom: 1px solid var(--divider);
}
.project-row__link {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5) 0;
  text-decoration: none;
  border-left: 2px solid transparent;
  padding-left: var(--space-4);
  transition: border-color 150ms ease;
}
.project-row__link:hover {
  border-left-color: var(--purple);
}
.project-row__link:hover .project-row__name {
  transform: translateX(4px);
}
.project-row__name {
  color: var(--white);
  transition: transform 150ms ease;
}
.project-row__tags {
  color: var(--data);
}
.project-row__year {
  color: var(--data);
  opacity: 0.6;
  text-align: right;
}
```

On mobile (`< 640px`): tags move below name, year disappears or collapses to end of tag line.

---

### 4.4 Stats Block

Used below the ring in the hero. Four plain numbers in mono, no decoration.

```
   12            4            3           847
PROJECTS     LANGUAGES     DOMAINS       DAYS
```

```css
.stats-block {
  display: flex;
  gap: clamp(var(--space-7), 6vw, var(--space-9));
  align-items: flex-end;
}
.stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.stat__number {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 400;
  color: var(--white);
  line-height: 1;
}
.stat__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--data);
  opacity: 0.7;
}
```

No animated count-up on the stats (beyond the hero sequence). The ring is the animation. Everything else is still.

---

### 4.5 Section Divider

A single hairline with a floating mono label. Encodes which section you're entering — not decoration.

```
─────────────────────────────────────── WORK ──
```

```css
.section-divider {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}
.section-divider::before {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--divider);
}
.section-divider__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--data);
  opacity: 0.6;
  white-space: nowrap;
}
```

```html
<div class="section-divider">
  <span class="section-divider__label">WORK</span>
</div>
```

Label floats right. Line extends left. The section name is navigation, not a heading.

---

### 4.6 About Section

Photo left, text right on desktop. Photo stacks above text on mobile. The photo carries the human element — the text stays spare.

```
┌───────────────────────────────────────────────────────┐
│                                                       │
│   ┌──────────────┐   Yayan Rahmat Wijaya              │
│   │              │                                    │
│   │  [photo]     │   I build systems that run —       │
│   │              │   web apps, data tools, embedded   │
│   │  film grain  │   wearables, and a chess engine    │
│   │  overlay     │   that beat me last Thursday.      │
│   │              │   Based in Indonesia.              │
│   └──────────────┘                                    │
│                    DOMAINS ──────────────────         │
│                    Web · Wearable · IoT · Data        │
│                                                       │
└───────────────────────────────────────────────────────┘
```

**Photo treatment — film style:**

```css
.about-photo {
  position: relative;
  width: 280px;
  flex-shrink: 0;
  border-radius: 2px;         /* near-zero radius — film print edge, not a card */
  overflow: hidden;
}

.about-photo img {
  width: 100%;
  display: block;
  filter:
    contrast(1.08)
    saturate(0.72)             /* desaturate — analog film pulls color back */
    brightness(0.92);
}

/* Grain overlay */
.about-photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
  background-size: 180px 180px;
  opacity: 0.35;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Purple tint on hover — subtle, references the accent */
.about-photo:hover img {
  filter:
    contrast(1.08)
    saturate(0.72)
    brightness(0.92)
    hue-rotate(10deg);
  transition: filter 400ms ease;
}
```

**Layout:**

```css
.about-inner {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--space-9);
  align-items: start;
}

@media (max-width: 767px) {
  .about-inner {
    grid-template-columns: 1fr;
  }
  .about-photo {
    width: 160px;   /* smaller on mobile, still present */
  }
}
```

**Photo spec for the actual image:**
- Shoot or grade with: slightly underexposed, warm shadows (not orange — more sepia-lean), desaturated highlights
- Avoid: pure white backgrounds, studio-clean lighting, heavy retouching
- Works best: natural light, outdoor or window-lit, candid or near-candid
- Orientation: portrait, minimum 600×800px, subject roughly centered

---

### 4.7 Contact

Plain. One line. No "Let's connect!" energy.

```
yayanraw@gmail.com
GitHub  ·  LinkedIn  ·  Resume
```

No contact form. No button styled like a CTA. Links in body text, mono for the domain labels. Resume link opens the CV file directly (PDF in new tab) — no download prompt, no prominent button.

---

### 4.8 Skills

Three groups: Languages, Frameworks, Tools. Each group has a mono eyebrow label and a flex-wrap tag cloud. No icons, no bars, no percentages — text only, per §7.

```
LANGUAGES ────────────────────────────

  PHP · EXPERT       JS · EXPERT        TS · ADVANCED
  DART · INTER       KOTLIN · INTER     GO · INTER

FRAMEWORKS ───────────────────────────

  Laravel            Next.js            React
  Express.js         Flutter            Tailwind CSS

TOOLS ────────────────────────────────

  Git / GitHub       Docker             MySQL / PostgreSQL
```

**Languages** carry a level badge (EXPERT / ADVANCED / INTERMEDIATE / BEGINNER) inline after the dot separator. Frameworks and Tools carry no level — presence is the signal.

```html
<section id="skills" class="section reveal">
  <div class="section-divider"><span class="section-divider__label">Skills</span></div>

  <div class="skills-group">
    <span class="skills-group__label type-label">Languages</span>
    <div class="skills-tags">
      <span class="skill-tag skill-tag--leveled">
        <span class="skill-tag__name">PHP</span>
        <span class="skill-tag__level">Expert</span>
      </span>
      <!-- repeat -->
    </div>
  </div>

  <div class="skills-group">
    <span class="skills-group__label type-label">Frameworks</span>
    <div class="skills-tags">
      <span class="skill-tag">Laravel</span>
      <!-- repeat -->
    </div>
  </div>
</section>
```

```css
.skills-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-7);
}

.skills-group__label {
  color: var(--data);
  opacity: 0.6;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--surface);
  border: 1px solid var(--divider);
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--white);
}

.skill-tag__level {
  color: var(--data);
  opacity: 0.7;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Dot separator between name and level */
.skill-tag--leveled .skill-tag__name::after {
  content: '·';
  margin-left: var(--space-2);
  color: var(--data);
  opacity: 0.4;
}
```

No hover state on skill tags — they are not interactive. No color-coding by level (that's a progress bar in disguise).

**Memorable moment for Skills:** each group eyebrow shows a faint item count to the right — `×8`, `×8`, `×7`. Rendered in `type-caption` at `opacity: 0.35`. It turns a label into a data point without adding decoration. Implemented as a flex row: eyebrow label `flex: 1`, count right-aligned.

```
LANGUAGES ──────────────────────────── ×8
FRAMEWORKS ─────────────────────────── ×8
TOOLS ──────────────────────────────── ×7
```

---

### 4.9 Certificates

Flex-wrap card grid. Cards wrap to next row at the edge — no horizontal scroll. Click opens a modal with the certificate file (PDF or image). This is the only place where interactive cards appear in the layout.

```
┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Android          │  │ React JS         │  │ Back-End Node.js │
│ Programming      │  │                  │  │                  │
│                  │  │                  │  │                  │
│ Dicoding         │  │ Dicoding         │  │ Dicoding         │
│ VALID · 08/2026  │  │ VALID · 09/2028  │  │ VALID · 07/2027  │
└──────────────────┘  └──────────────────┘  └──────────────────┘
```

**Valid-until pill color:**
- Green (`--cert-active`) — valid > 6 months from today
- Yellow (`--cert-expiring`) — valid ≤ 6 months from today
- Dim (`--data`) — expired (show anyway, greyed card)

```css
:root {
  --cert-active:   rgba(74, 222, 128, 0.9);   /* text color */
  --cert-active-bg: rgba(74, 222, 128, 0.08);
  --cert-expiring:  rgba(251, 191, 36, 0.9);
  --cert-expiring-bg: rgba(251, 191, 36, 0.08);
}
```

```html
<section id="certificates" class="section reveal">
  <div class="section-divider"><span class="section-divider__label">Certificates</span></div>

  <div class="cert-grid">
    <button class="cert-card" data-cert-file="/certs/android-programming.pdf" aria-label="Open Android Programming certificate">
      <span class="cert-card__title type-body">Android Programming</span>
      <span class="cert-card__issuer type-label">Dicoding Indonesia</span>
      <span class="cert-card__validity cert-card__validity--active type-label">Valid · 08/2026</span>
    </button>
    <!-- repeat -->
  </div>
</section>
```

```css
.cert-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-5);
}

.cert-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-6);
  background: var(--surface);
  border: 1px solid var(--divider);
  width: 220px;
  text-align: left;
  cursor: pointer;
  transition: border-color 150ms ease;
}

.cert-card:hover {
  border-color: rgba(168, 197, 218, 0.4);
}

.cert-card__title {
  color: var(--white);
  font-size: 15px;
  line-height: 1.4;
}

.cert-card__issuer {
  color: var(--data);
  opacity: 0.7;
  margin-top: auto;  /* push to bottom */
}

.cert-card__validity {
  display: inline-block;
  padding: 2px var(--space-2);
  font-size: 10px;
  letter-spacing: 0.1em;
}

.cert-card__validity--active {
  color: var(--cert-active);
  background: var(--cert-active-bg);
}

.cert-card__validity--expiring {
  color: var(--cert-expiring);
  background: var(--cert-expiring-bg);
}

.cert-card__validity--expired {
  color: var(--data);
  opacity: 0.5;
}
```

**Modal:**

```html
<div class="cert-modal" id="cert-modal" role="dialog" aria-modal="true" aria-label="Certificate" hidden>
  <div class="cert-modal__backdrop"></div>
  <div class="cert-modal__container">
    <button class="cert-modal__close type-label" aria-label="Close">ESC</button>
    <iframe class="cert-modal__frame" src="" title="Certificate"></iframe>
  </div>
</div>
```

```css
.cert-modal {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cert-modal[hidden] { display: none; }

.cert-modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(10, 22, 40, 0.92);
}

.cert-modal__container {
  position: relative;
  width: min(860px, 90vw);
  height: min(640px, 85vh);
  background: var(--surface);
  border: 1px solid var(--divider);
  display: flex;
  flex-direction: column;
}

.cert-modal__close {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  color: var(--data);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 10px;
  letter-spacing: 0.12em;
  opacity: 0.6;
  transition: opacity 150ms ease;
}
.cert-modal__close:hover { opacity: 1; }

.cert-modal__frame {
  flex: 1;
  width: 100%;
  border: none;
}
```

```js
// ponytail: minimal — no framework, plain DOM
const modal = document.getElementById('cert-modal');
const frame = modal.querySelector('.cert-modal__frame');

document.querySelectorAll('.cert-card').forEach(card => {
  card.addEventListener('click', () => {
    frame.src = card.dataset.certFile;
    modal.hidden = false;
  });
});

modal.querySelector('.cert-modal__backdrop').addEventListener('click', close);
modal.querySelector('.cert-modal__close').addEventListener('click', close);
document.addEventListener('keydown', e => e.key === 'Escape' && close());

function close() {
  modal.hidden = true;
  frame.src = '';
}
```

**Motion:** Modal fades in at `opacity 0 → 1` over 150ms — consistent with §5 hover transitions. No slide-up, no scale entrance.

```css
.cert-modal:not([hidden]) {
  animation: modal-in 150ms ease forwards;
}
@keyframes modal-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .cert-modal { animation: none; }
}
```

---

## 5. Motion

### Principles

One orchestrated sequence on load. Everything else is instant or 150ms hover transitions. Animation is not atmosphere — it's information about state or sequence.

### Permitted animations

| What | Duration | Easing | When |
|---|---|---|---|
| Ring arc draw | 900ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Page load |
| Hero text fade-in | 400ms | `ease` | After ring starts |
| Nav text hover | 150ms | `ease` | On hover |
| Project row border reveal | 150ms | `ease` | On hover |
| Project name shift | 150ms | `ease` | On hover |
| Nav background blur | 200ms | `ease` | On scroll |
| Scroll reveal (sections) | 300ms | `ease-out` | On enter viewport |
| Cert modal open | 150ms | `ease` | On card click |

### Forbidden

- Parallax of any kind
- Cursor followers or custom cursors
- Continuous ambient animation (floating particles, pulsing glows)
- 3D transforms / perspective on hover
- Page transitions between routes (adds complexity, rarely improves UX)
- Stagger animations with more than 4 elements

### Scroll reveal

Minimal. Sections enter from opacity 0, translate-y 16px → 0. Not every element — only section-level containers.

```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 300ms ease-out, transform 300ms ease-out;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

```js
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

---

## 6. Copy Voice

### Register

Technical. Spare. First-person but not confessional. The tone of a good README — direct, specific, no filler.

### Rules

- No "passionate about", "innovative", "leverage", "synergy", "results-driven"
- No exclamation points anywhere in the UI
- Project names are proper nouns — capitalize exactly as the project does
- Domain tags use `·` separator, not `/` or `,`
- Dates: `2024 →` for ongoing, `2023` for completed. No "present", no "current"
- CTA copy: action verbs only. "View work" not "See my amazing projects"
- Error states: what happened + what to do. Never apologize.

### Examples

```
✗  "I'm a passionate full-stack developer who loves building things!"
✓  "I build systems that run."

✗  "Check out my amazing projects below"
✓  "Work"

✗  "Let's connect and create something amazing together!"
✓  "yayanraw@gmail.com"

✗  "msglowformen — A skincare platform leveraging modern tech to deliver results"
✓  "msglowformen — men's skincare platform. Admin panel, customer app, service layer."
```

---

## 7. What Not to Do

These are not suggestions. Each one produces a portfolio that reads as templated.

**Layout**
- No numbered sections (01 / 02 / 03) — projects aren't a sequence
- No card grid for projects — kills the log-entry effect
- No project screenshots or mockup frames
- No hero section with a laptop image
- No split hero (text left, big image right)

**Color**
- No gradients — not on cards, not on text, not on backgrounds
- No purple outside the three designated uses (ring, project hover, active nav)
- No glass-morphism cards
- No `#000` or `#111111` for the background — it's `#0A1628` specifically

**Typography**
- No bolded Instrument Serif
- No JetBrains Mono for body copy
- No type sizes below 11px
- No centered body text (center-align display text only)

**Components**
- No skill bars / progress bars (meaningless, templated)
- No testimonials section
- No "download CV" button more prominent than the work
- No tech stack icon grid (use text tags instead)
- No social proof numbers that aren't real

**Animation**
- No particle.js or canvas background effects
- No cursor-following elements
- No loading spinner on page entry
- No continuous loop animations (breathing glows, floating elements)

**Copy**
- No emoji in the UI
- No "Hi, I'm Yayan" opener
- No "Let's work together!" section header

---

## 8. Responsive Behavior

### Breakpoints

```css
/* Mobile first */
/* sm */ @media (min-width: 640px)  { }
/* md */ @media (min-width: 768px)  { }
/* lg */ @media (min-width: 1024px) { }
/* xl */ @media (min-width: 1280px) { }
```

### Key adaptations

| Component | Mobile | Desktop |
|---|---|---|
| Display type | `clamp(48px, 12vw, 104px)` | Full size |
| Hero ring | 120px diameter | 160px |
| Stats block | 2×2 grid | Single row |
| Project row | Name + tags stacked, year hidden | Full 3-col grid |
| Side padding | 24px | `clamp(24px, 5vw, 80px)` |
| Nav | `[ MENU ]` toggle (all 5 links in dropdown) | Inline links |
| Skill tags | Full-width tags (`width: 100%`) | Flex-wrap, natural width |
| Cert cards | Full-width (`width: 100%`) | Fixed 220px, flex-wrap |
| Cert modal | 95vw wide, 90vh tall | `min(860px, 90vw)` × `min(640px, 85vh)` |

---

## 9. Accessibility

Non-negotiable floor — not mentioned as an afterthought.

- All interactive elements have visible `:focus-visible` outline: `2px solid var(--purple)` offset 2px
- Color contrast: --white on --night = 12.8:1 (exceeds AA), --data on --night = 4.7:1 (passes AA for large text)
- `prefers-reduced-motion` handled on every animation (see §5)
- Project row links use `<article>` + `<a>` with descriptive accessible name
- Ring SVG includes `aria-label="Builder readiness: 94%"` and `role="img"`
- Skip-to-content link at top of page (visually hidden until focused)

**Certificate modal focus management:**
- On open: move focus to the modal container (`focus()` the `.cert-modal__container`)
- While open: trap focus inside — Tab and Shift+Tab cycle only between focusable elements within the modal (close button + iframe)
- On close: return focus to the cert card that triggered the modal
- `aria-modal="true"` and `role="dialog"` already in markup (see §4.9); also set `aria-labelledby` pointing to the cert title

```js
// Minimal focus trap — no library needed for two focusable elements
function openModal(card) {
  lastFocused = card;
  modal.hidden = false;
  container.focus();
}

function closeModal() {
  modal.hidden = true;
  frame.src = '';
  lastFocused?.focus();
}

container.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault();
    // only two focusable targets: closeBtn and frame — toggle between them
    document.activeElement === closeBtn ? frame.focus() : closeBtn.focus();
  }
});
```

---

## 10. Page Structure

### Single-page, scroll-snap per section

Four sections in fixed order. Scroll snaps to the start of each section.

```
┌─────────────┐
│   #hero     │  100vh — ring, name, stats
├─────────────┤
│   #work     │  min-height 100vh — project log (may overflow on many projects)
├─────────────┤
│   #skills   │  min-height auto — language tags, framework tags, tools
├─────────────┤
│   #certs    │  min-height auto — certificate card grid + modal
├─────────────┤
│   #about    │  100vh — bio paragraph + domains
├─────────────┤
│   #contact  │  100vh — email + links
└─────────────┘
```

### Scroll-snap CSS

```css
html {
  scroll-snap-type: y proximity;  /* proximity, not mandatory — lets #work overflow naturally */
  overflow-y: scroll;
}

.section {
  min-height: 100vh;
  scroll-snap-align: start;
  scroll-snap-stop: normal;
}

#hero    { height: 100vh; }   /* Hero is exactly full viewport */
#contact { min-height: auto; padding-bottom: var(--space-10); }  /* Contact can be shorter */

/* Skills and Certs are content-height sections — override the 100vh default */
#skills,
#certs {
  min-height: auto;
  padding-top: var(--space-9);
  padding-bottom: var(--space-9);
}
```

`proximity` over `mandatory` — mandatory traps the user inside `#work` if it's taller than the viewport. Proximity snaps when close to a boundary but allows free scrolling through longer sections.

### Nav link behavior

Nav links use `scroll-behavior: smooth` via CSS and `href="#section-id"` anchors. No JS router needed for a single-page scroll.

```css
html { scroll-behavior: smooth; }
```

On mobile, after tapping a nav link in the `[ MENU ]` dropdown, close the menu and scroll to the section.

### Section order

| ID | Label | Snap |
|---|---|---|
| `#hero` | — (no label, it's the entry) | start |
| `#work` | WORK | start |
| `#skills` | SKILLS | start |
| `#certs` | CERTIFICATES | start |
| `#about` | ABOUT | start |
| `#contact` | CONTACT | start |

No sub-sections within a section snap independently.

---

## 11. Stack

**Next.js** (App Router) + **Tailwind CSS v4**.

Tailwind v4 drops `tailwind.config.ts` — tokens live in `globals.css` via `@theme`. No config file needed.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors — available as bg-night, text-purple, border-data, etc. */
  --color-night:   #0A1628;
  --color-surface: #111D30;
  --color-purple:  #7B2FBE;
  --color-data:    #A8C5DA;
  --color-white:   #F2F4F5;

  /* Fonts — consumed from next/font CSS variables set in layout.tsx */
  --font-serif: var(--font-serif);
  --font-sans:  var(--font-sans);
  --font-mono:  var(--font-mono);
}

/* Derived tokens — not in @theme because they use rgba(), Tailwind can't generate opacity variants */
:root {
  --divider:          rgba(168, 197, 218, 0.18);
  --surface-hover:    rgba(17, 29, 48, 0.7);
  --purple-dim:       rgba(123, 47, 190, 0.15);
  --cert-active:      rgba(74, 222, 128, 0.9);
  --cert-active-bg:   rgba(74, 222, 128, 0.08);
  --cert-expiring:    rgba(251, 191, 36, 0.9);
  --cert-expiring-bg: rgba(251, 191, 36, 0.08);
}
```

CSS snippets in this guide are reference — implement as Tailwind utilities where equivalent classes exist (e.g. `bg-surface`, `text-data`, `font-mono`). Use arbitrary values for one-offs (`[letter-spacing:0.12em]`). Use `@apply` only for multi-property patterns reused across ≥3 components (`.type-label`, `.skill-tag`, etc.). Scroll-snap, `backdrop-filter`, and SVG animation have no direct Tailwind v4 utility — keep those as plain CSS in `globals.css`.

---

## 12. File / Token Reference

Quick copy-paste summary for implementation:

```css
/* paste into :root */
--night: #0A1628; --surface: #111D30; --purple: #7B2FBE;
--data: #A8C5DA; --white: #F2F4F5;
--divider: rgba(168, 197, 218, 0.18);

/* Fonts */
/* Display  → Instrument Serif 400 */
/* Body     → Geist 300/400/500 */
/* Data/UI  → JetBrains Mono 400 */

/* Ring math */
/* r=52, circumference = 2π×52 ≈ 326.7 */
/* 94% fill → stroke-dashoffset = 326.7 × 0.06 ≈ 19.6 */
```

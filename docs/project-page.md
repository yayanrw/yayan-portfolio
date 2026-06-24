# Project Detail Page Spec — `/work/[slug]`

Same design system as the main portfolio. Sparse. No screenshots.

---

## Layout

```
┌──────────────────────────────────────────────────────────┐
│  YRW                                   [nav — no active]  │
├──────────────────────────────────────────────────────────┤
│                                                           │
│  ← WORK                                                   │  ← back link, mono 11px
│                                                           │
│  msglowformen                                   2024 →    │  ← type-h1 + year right-aligned
│  ──────────────────────────────────────────────────────   │  ← divider
│  Skincare · Laravel · Next.js                             │  ← type-label (tags)
│                                                           │
│  Men's skincare platform with admin panel, customer       │
│  app, and service layer. Built for a real client,         │
│  handles product catalog, orders, and staff roles.        │  ← type-body, max 65ch
│                                                           │
│  STACK ──────────────────────────────────────────         │  ← section-divider style
│                                                           │
│  PHP · Laravel · Next.js · MySQL · Docker · Redis         │  ← skill-tag style, no level badges
│                                                           │
│  LINKS ──────────────────────────────────────────         │
│                                                           │
│  GitHub →          Live →                                 │  ← mono links, only if they exist
│                                                           │
└──────────────────────────────────────────────────────────┘
```

Max content width: **680px** (narrower than the 1100px main page — reading width for prose).

---

## Markup

```tsx
<main className="min-h-screen bg-night px-[clamp(24px,5vw,80px)] py-[var(--space-9)]">
  <div className="max-w-[680px] mx-auto">

    {/* Back link */}
    <a href="/#work" className="type-label text-data opacity-60 hover:opacity-100 transition-opacity mb-[var(--space-8)] inline-block">
      ← WORK
    </a>

    {/* Title row */}
    <div className="flex justify-between items-baseline gap-[var(--space-4)] mb-[var(--space-3)]">
      <h1 className="type-h1">{project.name}</h1>
      <span className="type-caption opacity-60 shrink-0">{project.year}</span>
    </div>

    {/* Divider */}
    <div className="h-px bg-[var(--divider)] mb-[var(--space-5)]" />

    {/* Tags */}
    <p className="type-label text-data mb-[var(--space-7)]">
      {project.tags.join(' · ')}
    </p>

    {/* Description */}
    <p className="type-body mb-[var(--space-9)]">{project.longDescription}</p>

    {/* Stack */}
    {project.stack.length > 0 && (
      <div className="mb-[var(--space-7)]">
        <div className="section-divider mb-[var(--space-5)]">
          <span className="section-divider__label">Stack</span>
        </div>
        <div className="flex flex-wrap gap-[var(--space-3)]">
          {project.stack.map(item => (
            <span key={item} className="skill-tag">{item}</span>
          ))}
        </div>
      </div>
    )}

    {/* Links — only render if data exists */}
    {(project.github || project.live) && (
      <div>
        <div className="section-divider mb-[var(--space-5)]">
          <span className="section-divider__label">Links</span>
        </div>
        <div className="flex gap-[var(--space-6)]">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
               className="type-label text-data hover:text-white transition-colors">
              GitHub →
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
               className="type-label text-data hover:text-white transition-colors">
              Live →
            </a>
          )}
        </div>
      </div>
    )}

  </div>
</main>
```

---

## Data requirements

Add these fields to `Project` in `lib/data.ts`:

```ts
interface Project {
  slug: string
  name: string
  description: string       // one-liner for the work list row
  longDescription: string   // 2–4 sentences for the detail page
  tags: string[]
  year: string
  stack: string[]           // full tech list (more granular than tags)
  github?: string
  live?: string
}
```

`description` stays short for the list row. `longDescription` is what goes on this page — specific, no fluff. Follow the copy voice in the style guide: what it does, for whom, what was technically interesting.

---

## Content to fill in per project

| Slug | longDescription | stack | github | live |
|---|---|---|---|---|
| msglowformen | Men's skincare platform for a real client. Admin panel manages products, orders, and staff roles. Customer storefront built in Next.js against a Laravel API. | PHP, Laravel, Next.js, MySQL, Docker | — | — |
| titanchessengine | Chess engine built in Go with custom move generation, bitboard representation, and alpha-beta pruning. Beats me consistently now. | Go | — | — |
| heywatchface | Garmin watch face displaying HRV, training load, and recovery score. Built with Connect IQ SDK in Monkey C. | Connect IQ, Monkey C | — | — |
| sellershop | Multi-tenant seller dashboard. Vendors manage their own product catalog, orders, and inventory from a shared platform. | PHP, Laravel, MySQL | — | — |
| smart-home | Home automation dashboard with real-time device control and time-based scheduling. Communicates with hardware via MQTT. | PHP, Laravel, MQTT, MySQL | — | — |
| bts100-dashboard | Analytics dashboard for BTS100 sensor data. Live charts update as readings come in, with historical export. | PHP, Laravel, MySQL, Chart.js | — | — |

Replace `—` with real URLs before launch.

---

## Navigation behavior

- Nav is present (same fixed bar, no active section highlighted — the user is off the main page)
- `← WORK` back link uses `href="/#work"` — returns to the work section with smooth scroll
- No prev/next project navigation — the list is the index

---

## Motion

No scroll reveal on this page. No hero sequence. The page renders instantly — one static block of content.

One exception: `← WORK` link hover follows the same 150ms `ease` transition as nav links.

---

## Responsive

| Element | Mobile | Desktop |
|---|---|---|
| Title + year | Stack vertically | Side by side, year right-aligned |
| Content width | Full width, 24px padding | 680px centered |
| Stack tags | Flex-wrap, full width | Same |
| Links | Stacked | Inline row |

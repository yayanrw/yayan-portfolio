# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Yayan Rahmat Wijaya's personal portfolio — Next.js (App Router) + Tailwind CSS v4. Single-page scroll with static project detail routes. No database, no API, no CMS. All content is typed static data.

## Commands

```bash
# After scaffolding the Next.js app:
npm run dev       # dev server (Laravel Herd serves at herd domain)
npm run build     # static build — runs generateStaticParams for all /work/[slug]
npx tsc --noEmit  # type-check only
```

## Architecture

All content lives in `lib/data.ts` as typed constants — single source of truth for both the main page and static project detail pages.

```
app/
  layout.tsx          # Root shell: fonts wired to <html>, skip-link
  page.tsx            # All portfolio sections (Server Component)
  work/[slug]/page.tsx  # Static project pages via generateStaticParams
  globals.css         # @theme tokens (Tailwind v4), @apply utility classes, scroll-snap, SVG animation
  fonts.ts            # next/font: Instrument Serif, Geist, JetBrains Mono → CSS variables

lib/
  data.ts             # Project[], Certificate[], Skill[] — consumed by page.tsx and work/[slug]

public/
  certs/              # Certificate PDFs — referenced by cert card data-cert-file
  photo/              # About portrait (≥600×800px)
```

**Component split rule:** Default Server Components. Use `"use client"` only for: `Nav` (scroll listener, mobile menu), `HeroRing` (load animation), `CertSection` (modal state + focus trap), `RevealSection` (IntersectionObserver). All other sections are Server.

**Build order** (each layer depends on the one above): tokens → fonts/layout → Nav → Hero → Work → Skills → Certs → About → Contact → `/work/[slug]` → scroll reveal wrapper.

## Design system

All tokens, component markup, CSS, motion rules, and responsive breakpoints are fully specified in `docs/style-guide.md`. Implement from there. Key points:

- **No `tailwind.config.ts`** — tokens in `globals.css` via `@theme`
- **Colors:** `--night #0A1628` (bg), `--surface #111D30` (cards), `--purple #7B2FBE` (accent — 3 uses only: ring arc, project row hover border, active nav indicator), `--data #A8C5DA` (labels), `--white #F2F4F5` (text)
- **Fonts:** Instrument Serif (display/name only), Geist (body/prose), JetBrains Mono (all labels, stats, tags, uppercase metadata)
- **Purple appears in exactly 3 places** — nowhere else. Not in buttons, headings, or backgrounds.
- Use Tailwind utility classes where they exist; plain CSS in `globals.css` for scroll-snap, `backdrop-filter`, and SVG animation.

## Docs

Full specs for every component, interaction, and layout decision:

| File | Contains |
|---|---|
| `docs/style-guide.md` | Color, typography, spacing, all component markup + CSS, motion spec, responsive, a11y |
| `docs/architecture.md` | File structure, data types, component split table, static generation pattern |
| `docs/content.md` | All copy, project list, skills, certificates, contact |
| `docs/project-page.md` | `/work/[slug]` layout, markup, data requirements, per-project `longDescription` |

## Content placeholders (fill before launch)

- `content.md` → GitHub, LinkedIn, and Resume/CV URLs are `[your-username]` placeholders
- `public/photo/` — about portrait not yet added
- `public/certs/` — certificate PDFs not yet added
- `lib/data.ts` → `github` and `live` fields on projects are all `—` (undefined)

# Architecture — Yayan Rahmat Wijaya Portfolio

## Decision: Single-page + project detail routes

The portfolio is one scrollable page (`/`). Project rows link to `/work/[slug]` — separate route pages, not anchors. This keeps the main page fast and gives each project room to breathe without cramming detail into a modal.

---

## App Router File Structure

```
app/
  layout.tsx            # Root layout: font variables, globals, skip-link
  page.tsx              # Single-page portfolio (all sections)
  work/
    [slug]/
      page.tsx          # Project detail page, statically generated
  globals.css
  fonts.ts

lib/
  data.ts               # All typed static data — single source of truth

public/
  certs/                # Certificate PDFs (referenced in cert cards)
  photo/                # About photo (portrait, ≥600×800px)
```

No `api/` directory. No database. No fetching. Everything is static constants.

---

## Data Strategy

All content lives in `lib/data.ts` as typed constants. `generateStaticParams` reads from the same file for `work/[slug]`.

```ts
// lib/data.ts

export interface Project {
  slug: string
  name: string
  description: string       // one-liner for the work list row
  longDescription: string   // 2–4 sentences for the detail page
  tags: string[]            // ["Skincare", "Laravel", "Next.js"]
  year: string              // "2024 →" | "2023"
  stack: string[]           // full tech list for detail page
  github?: string
  live?: string
}

export interface Certificate {
  title: string
  issuer: string
  validUntil: string      // "08/2026" — MM/YYYY
  file: string            // "/certs/android-programming.pdf"
}

export interface Skill {
  name: string
  level?: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'  // only for languages
}

export const projects: Project[] = [ /* see content.md */ ]
export const certificates: Certificate[] = [ /* see content.md */ ]
export const languages: Skill[] = [ /* see content.md */ ]
export const frameworks: Skill[] = [ /* see content.md */ ]
export const tools: Skill[] = [ /* see content.md */ ]
```

---

## Client vs Server Component Split

Default to Server Components. Only reach for `"use client"` when browser APIs are required.

| Component | Type | Reason |
|---|---|---|
| `app/layout.tsx` | Server | Static shell |
| `app/page.tsx` | Server | Renders all static sections |
| `app/work/[slug]/page.tsx` | Server | Static, `generateStaticParams` |
| `components/Nav.tsx` | **Client** | Scroll listener, mobile menu toggle |
| `components/HeroRing.tsx` | **Client** | `window.addEventListener('load', ...)` animation |
| `components/CertSection.tsx` | **Client** | Modal state, focus trap |
| `components/RevealSection.tsx` | **Client** | `IntersectionObserver` wrapper — see below |
| All other section components | Server | Pure render, no state |

Wrap only what needs it — pass static data as props from Server into Client components.

### RevealSection

A thin Client Component wrapper that adds the `.visible` class when the element enters the viewport. Wrap each section (except Hero) in it as the final build step.

```tsx
// components/RevealSection.tsx
'use client'
import { useEffect, useRef, ReactNode } from 'react'

export default function RevealSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && el.classList.add('visible'),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${className ?? ''}`}>{children}</div>
}
```

Usage in `app/page.tsx`:

```tsx
<RevealSection><WorkSection /></RevealSection>
<RevealSection><SkillsSection /></RevealSection>
// etc.
```

The `.reveal` / `.reveal.visible` CSS lives in `globals.css` (see style-guide §5).

---

## Component Breakdown (build order)

Build in this order — each layer depends on the one above.

1. **Tokens** — `globals.css` with `@theme`, CSS custom properties, `@apply` classes for `.type-label`, `.type-caption`, `.skill-tag`, `.section-divider`
2. **Fonts** — `fonts.ts` + root `layout.tsx` with font variables wired to `<html>`
3. **Nav** — fixed, scroll-blur, mobile menu (Client)
4. **Hero** — ring SVG + animation, name, descriptor, stats block (ring = Client, rest = Server)
5. **Work section** — project rows, static list from `lib/data.ts`
6. **Skills section** — three groups, tag cloud
7. **Certs section** — card grid + modal (Client)
8. **About section** — photo + bio, film filter CSS
9. **Contact section** — email + links
10. **Project detail page** — `/work/[slug]`, `generateStaticParams`
11. **Scroll reveal** — wrap sections in `RevealSection` last, after layout is verified

---

## Static Generation

```ts
// app/work/[slug]/page.tsx
import { projects } from '@/lib/data'

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug)
  if (!project) notFound()
  // ...
}
```

`next build` pre-renders all project pages. Zero runtime cost.

---

## Tailwind v4 Config

No `tailwind.config.ts`. Tokens in `globals.css` via `@theme`. Arbitrary values for one-offs. `@apply` only for patterns used in ≥3 places.

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-night:   #0A1628;
  --color-surface: #111D30;
  --color-purple:  #7B2FBE;
  --color-data:    #A8C5DA;
  --color-white:   #F2F4F5;
  --font-serif: var(--font-serif);
  --font-sans:  var(--font-sans);
  --font-mono:  var(--font-mono);
}
```

---

## Deployment

Vercel. `next build` → static export where possible. No environment variables needed (all data is static). Image optimization via `next/image` for the about photo only.

```json
// No vercel.json needed — default Next.js preset covers it
```

---

## What Is NOT in this codebase

- No CMS, no headless API
- No database, no auth
- No analytics (add later if needed)
- No i18n
- No testing framework (portfolio, not a product)
- No Storybook

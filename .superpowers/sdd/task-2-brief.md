# Task 2: Create lib/data.ts with All Static Content

**Files:**
- Create: `lib/data.ts`

**Interfaces:**
- Consumes: None
- Produces:
  - `Project[]` exported as `projects`
  - `Certificate[]` exported as `certificates`
  - `Skill[]` exported as `languages`, `frameworks`, `tools`
  - Used by page.tsx and work/[slug]/page.tsx

**Steps:**

- [ ] **Step 1: Create `lib/data.ts` with interfaces and content**

```typescript
// lib/data.ts

export interface Project {
  slug: string
  name: string
  description: string       // one-liner for work list row
  longDescription: string   // 2-4 sentences for detail page
  tags: string[]
  year: string              // "2024 →" or "2023"
  stack: string[]           // granular tech list
  github?: string
  live?: string
}

export interface Certificate {
  title: string
  issuer: string
  validUntil: string        // MM/YYYY format
  file: string              // path to PDF/image in public/certs/
}

export interface Skill {
  name: string
  level?: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner'
}

export const projects: Project[] = [
  {
    slug: 'msglowformen',
    name: 'msglowformen',
    description: 'Men's skincare platform — admin panel, customer app, service layer.',
    longDescription:
      'Men\'s skincare platform for a real client. Admin panel manages products, orders, and staff roles. Customer storefront built in Next.js against a Laravel API.',
    tags: ['Skincare', 'Laravel', 'Next.js'],
    year: '2024 →',
    stack: ['PHP', 'Laravel', 'Next.js', 'MySQL', 'Docker', 'Redis'],
    github: 'https://github.com/yayanrw',
    live: undefined,
  },
  {
    slug: 'titanchessengine',
    name: 'TitanChessEngine',
    description: 'Chess engine with custom move generation and position evaluation.',
    longDescription:
      'Chess engine built in Go with custom move generation, bitboard representation, and alpha-beta pruning. Beats me consistently now.',
    tags: ['Chess', 'Go'],
    year: '2024',
    stack: ['Go'],
    github: 'https://github.com/yayanrw',
    live: undefined,
  },
  {
    slug: 'heywatchface',
    name: 'HeyWatchFace',
    description: 'Garmin watch face displaying HRV, training load, and recovery status.',
    longDescription:
      'Garmin watch face displaying HRV, training load, and recovery score. Built with Connect IQ SDK in Monkey C.',
    tags: ['Wearable', 'Connect IQ'],
    year: '2023',
    stack: ['Connect IQ', 'Monkey C'],
    github: undefined,
    live: undefined,
  },
  {
    slug: 'sellershop',
    name: 'sellershop',
    description: 'Multi-tenant seller dashboard with order management and inventory tracking.',
    longDescription:
      'Multi-tenant seller dashboard. Vendors manage their own product catalog, orders, and inventory from a shared platform.',
    tags: ['E-commerce', 'Laravel'],
    year: '2023',
    stack: ['PHP', 'Laravel', 'MySQL'],
    github: undefined,
    live: undefined,
  },
  {
    slug: 'smart-home',
    name: 'smart-home',
    description: 'Home automation dashboard with real-time device control and scheduling.',
    longDescription:
      'Home automation dashboard with real-time device control and time-based scheduling. Communicates with hardware via MQTT.',
    tags: ['IoT', 'Laravel'],
    year: '2023',
    stack: ['PHP', 'Laravel', 'MQTT', 'MySQL'],
    github: undefined,
    live: undefined,
  },
  {
    slug: 'bts100-dashboard',
    name: 'bts100-dashboard',
    description: 'Analytics dashboard for BTS100 sensor data with live charts.',
    longDescription:
      'Analytics dashboard for BTS100 sensor data. Live charts update as readings come in, with historical export.',
    tags: ['Dashboard', 'Laravel'],
    year: '2022',
    stack: ['PHP', 'Laravel', 'MySQL', 'Chart.js'],
    github: undefined,
    live: undefined,
  },
]

export const certificates: Certificate[] = [
  {
    title: 'Android Programming',
    issuer: 'Dicoding Indonesia',
    validUntil: '08/2026',
    file: '/certs/android-programming.pdf',
  },
  {
    title: 'React JS',
    issuer: 'Dicoding Indonesia',
    validUntil: '09/2028',
    file: '/certs/react-js.pdf',
  },
  {
    title: 'Back-End Development with Node.js',
    issuer: 'Dicoding Indonesia',
    validUntil: '07/2027',
    file: '/certs/backend-nodejs.pdf',
  },
  {
    title: 'Cloud Practitioner Essentials',
    issuer: 'Dicoding Indonesia',
    validUntil: '11/2026',
    file: '/certs/cloud-practitioner.pdf',
  },
  {
    title: 'Web Programming Fundamentals',
    issuer: 'Dicoding Indonesia',
    validUntil: '03/2027',
    file: '/certs/web-programming.pdf',
  },
  {
    title: 'Git & GitHub Basics',
    issuer: 'Dicoding Indonesia',
    validUntil: '06/2026',
    file: '/certs/git-github.pdf',
  },
]

export const languages: Skill[] = [
  { name: 'PHP', level: 'Expert' },
  { name: 'JavaScript', level: 'Expert' },
  { name: 'TypeScript', level: 'Advanced' },
  { name: 'Dart', level: 'Intermediate' },
  { name: 'Kotlin', level: 'Intermediate' },
  { name: 'Go', level: 'Intermediate' },
  { name: 'Python', level: 'Intermediate' },
  { name: 'C', level: 'Beginner' },
]

export const frameworks: Skill[] = [
  { name: 'Laravel' },
  { name: 'Next.js' },
  { name: 'React' },
  { name: 'Express.js' },
  { name: 'Flutter' },
  { name: 'Tailwind CSS' },
  { name: 'Livewire' },
  { name: 'Connect IQ' },
]

export const tools: Skill[] = [
  { name: 'Git / GitHub' },
  { name: 'Docker' },
  { name: 'MySQL / PostgreSQL' },
  { name: 'Redis' },
  { name: 'Postman' },
  { name: 'Figma' },
  { name: 'Linux / Ubuntu' },
]
```

- [ ] **Step 2: Type-check**

Run:
```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add lib/data.ts with all project, cert, and skill data"
```

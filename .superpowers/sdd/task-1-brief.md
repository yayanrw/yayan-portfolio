# Task 1: Init Next.js + Tailwind v4 + Root Layout

**Files:**
- Create: `app/layout.tsx`
- Create: `app/fonts.ts`
- Create: `app/globals.css`
- Create: `package.json` (via next create-app or manual)
- Modify: `tsconfig.json` (if needed)

**Interfaces:**
- Consumes: None (this is the base)
- Produces: Root layout with font variables (`--font-serif`, `--font-sans`, `--font-mono`) set on `<html>` tag; globals.css with @theme tokens and base @apply utilities

**Steps:**

- [ ] **Step 1: Create Next.js app**

Run (in `.worktrees/scaffold`):
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint --no-git
```

When prompted:
- TypeScript: Yes
- Tailwind: Yes (this will create a basic setup; we'll replace globals.css)
- App Router: Yes
- ESLint: Yes

- [ ] **Step 2: Update `package.json` to use Tailwind v4**

Edit `package.json` to ensure Tailwind is v4+:

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "tailwindcss": "^4.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0"
  }
}
```

Run:
```bash
npm install
```

- [ ] **Step 3: Create `app/fonts.ts`**

```typescript
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

- [ ] **Step 4: Create `app/layout.tsx`**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { instrumentSerif, geist, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yayan Rahmat Wijaya — Full-stack Engineer',
  description: 'Portfolio of Yayan Rahmat Wijaya, full-stack engineer and builder.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-night text-white">
        {/* Skip-to-content link for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 5: Create `app/globals.css` with Tailwind v4 @theme and base utilities**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-night: #0A1628;
  --color-surface: #111D30;
  --color-purple: #7B2FBE;
  --color-data: #A8C5DA;
  --color-white: #F2F4F5;

  --font-serif: var(--font-serif);
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
}

:root {
  --divider: rgba(168, 197, 218, 0.18);
  --surface-hover: rgba(17, 29, 48, 0.7);
  --purple-dim: rgba(123, 47, 190, 0.15);
  --cert-active: rgba(74, 222, 128, 0.9);
  --cert-active-bg: rgba(74, 222, 128, 0.08);
  --cert-expiring: rgba(251, 191, 36, 0.9);
  --cert-expiring-bg: rgba(251, 191, 36, 0.08);

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  overflow-y: scroll;
}

body {
  background-color: var(--night);
  color: var(--white);
  font-family: var(--font-sans), system-ui, sans-serif;
}

/* Typography utilities */
.type-display {
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(56px, 10vw, 104px);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.02em;
}

.type-h1 {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.type-body {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.65;
}

.type-body-sm {
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
  color: var(--data);
}

.type-label {
  font-family: var(--font-mono), 'Courier New', monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--data);
}

.type-data {
  font-family: var(--font-mono), 'Courier New', monospace;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  line-height: 1;
}

.type-caption {
  font-family: var(--font-mono), 'Courier New', monospace;
  font-size: 11px;
  font-weight: 400;
  color: var(--data);
  opacity: 0.7;
}

/* Accessibility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only:focus,
.sr-only:focus-visible {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}

:focus-visible {
  outline: 2px solid var(--purple);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 6: Verify setup**

Run:
```bash
npm run dev
```

Visit `http://localhost:3000` — should see Next.js default page. No errors in terminal.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: init Next.js 14 with Tailwind v4 and fonts setup"
```

# Task 3: Build Navigation Component (Client)

**Files:**
- Create: `components/Nav.tsx` (Client Component)
- Modify: `app/globals.css` (add Nav styles)
- Modify: `app/layout.tsx` (import and render `<Nav />`)

**Interfaces:**
- Consumes: None (static section IDs: hero, work, skills, certs, about, contact)
- Produces: `<Nav />` component exported as default; accepts no props

**Component behavior:**
- Fixed position, top: 0
- Logo "YRW" in mono, 13px, --data color
- Desktop: 5 nav links inline (WORK, SKILLS, CERTS, ABOUT, CONTACT) in mono, 11px, uppercase
- Mobile (<640px): links collapse to `[ MENU ]` toggle button, dropdown menu appears
- Scroll behavior: on scroll > 0, add blur background (backdrop-filter: blur(12px)) + semi-transparent background
- Active link indicator: 2px purple underline, offset 4px below text
- Link hover: text color to --white, 150ms transition
- Menu toggle: mono, uppercase, no border, cursor pointer

**Steps:**

- [ ] **Step 1: Add Nav CSS to globals.css**

Append to `app/globals.css`:

```css
/* Navigation */
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

.nav-logo {
  font-family: var(--font-mono), monospace;
  font-size: 13px;
  color: var(--data);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-6);
  list-style: none;
}

@media (max-width: 639px) {
  .nav-links {
    display: none;
  }
}

.nav-link {
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--data);
  text-decoration: none;
  padding-bottom: 4px;
  border-bottom: 2px solid transparent;
  transition: color 150ms ease, border-color 150ms ease;
}

.nav-link:hover {
  color: var(--white);
}

.nav-link.active {
  color: var(--white);
  border-bottom-color: var(--purple);
}

/* Mobile menu toggle */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-family: var(--font-mono), monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--data);
  cursor: pointer;
  padding: 0;
}

@media (max-width: 639px) {
  .nav-toggle {
    display: block;
  }
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: rgba(10, 22, 40, 0.95);
  backdrop-filter: blur(12px);
  padding: var(--space-4) clamp(24px, 5vw, 80px);
  border-bottom: 1px solid var(--divider);
  max-height: 0;
  overflow: hidden;
  transition: max-height 200ms ease;
}

.nav-menu.open {
  max-height: 500px;
}

.nav-menu .nav-link {
  display: block;
  padding-bottom: 0;
  border-bottom: none;
}
```

- [ ] **Step 2: Create `components/Nav.tsx`**

```typescript
// components/Nav.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certs' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.href.slice(1))
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleMenuClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        YRW
      </a>

      {/* Desktop menu */}
      <ul className="nav-links">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile menu toggle */}
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        [ MENU ]
      </button>

      {/* Mobile menu dropdown */}
      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={handleMenuClick}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
```

- [ ] **Step 3: Update `app/layout.tsx` to include Nav**

Add import and render in the layout:

```typescript
import Nav from '@/components/Nav'

// ... in RootLayout component body:
<Nav />
```

- [ ] **Step 4: Dev test**

Run:
```bash
npm run dev
```

Manual testing:
- Nav bar visible at top with "YRW" logo, 5 links visible on desktop
- Scroll: background blurs and darkens
- Hover on link: text turns white, 150ms smooth
- Mobile (<640px): toggle button visible, links hidden until clicked
- Click toggle: menu slides down with all 5 links
- IntersectionObserver: active section indicator (underline) tracks as you scroll

- [ ] **Step 5: Commit**

```bash
git add components/Nav.tsx app/layout.tsx app/globals.css
git commit -m "feat: add fixed Nav with scroll blur and mobile menu"
```

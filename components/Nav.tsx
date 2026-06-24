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
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        YRW
      </a>

      {/* Desktop links */}
      <ul className="nav-links" role="list">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`nav-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile toggle */}
      <button
        className="nav-toggle"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        [ {menuOpen ? 'CLOSE' : 'MENU'} ]
      </button>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        className={`nav-menu${menuOpen ? ' open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={handleMenuClick}
            tabIndex={menuOpen ? 0 : -1}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

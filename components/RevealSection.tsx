'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface RevealSectionProps {
  children: ReactNode
  className?: string
}

export default function RevealSection({ children, className }: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className ?? ''}`}>
      {children}
    </div>
  )
}

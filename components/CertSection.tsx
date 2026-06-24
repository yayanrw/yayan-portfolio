'use client'
import { useState, useRef, useEffect } from 'react'
import { certificates } from '@/lib/data'

function getCertStatus(validUntil: string) {
  const [month, year] = validUntil.split('/').map(Number)
  const expireDate = new Date(year, month - 1)
  const today = new Date()
  const sixMonthsFromNow = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate())

  if (expireDate < today) return 'expired'
  if (expireDate <= sixMonthsFromNow) return 'expiring'
  return 'active'
}

export default function CertSection() {
  const [openCert, setOpenCert] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const lastFocusedRef = useRef<HTMLButtonElement | null>(null)

  const openModal = (file: string, button: HTMLButtonElement) => {
    lastFocusedRef.current = button
    setOpenCert(file)
    setTimeout(() => {
      closeButtonRef.current?.focus()
    }, 0)
  }

  const closeModal = () => {
    setOpenCert(null)
    lastFocusedRef.current?.focus()
  }

  useEffect(() => {
    if (!openCert) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        if (document.activeElement === closeButtonRef.current) {
          iframeRef.current?.focus()
        } else {
          closeButtonRef.current?.focus()
        }
      }
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === modalRef.current?.querySelector('.cert-modal__backdrop')) {
        closeModal()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    modalRef.current?.addEventListener('click', handleBackdropClick)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      modalRef.current?.removeEventListener('click', handleBackdropClick)
    }
  }, [openCert])

  return (
    <>
      <div className="cert-grid">
        {certificates.map((cert) => {
          const status = getCertStatus(cert.validUntil)
          return (
            <button
              key={cert.file}
              className="cert-card"
              onClick={(e) => openModal(cert.file, e.currentTarget)}
              aria-label={`Open ${cert.title} certificate`}
            >
              <span className="cert-card__title">{cert.title}</span>
              <span className="cert-card__issuer type-label">{cert.issuer}</span>
              <span className={`cert-card__validity type-label cert-card__validity--${status}`}>
                Valid · {cert.validUntil}
              </span>
            </button>
          )
        })}
      </div>

      <div
        ref={modalRef}
        className="cert-modal"
        hidden={!openCert}
        role="dialog"
        aria-modal={!!openCert}
        aria-label="Certificate"
      >
        <div className="cert-modal__backdrop" />
        <div className="cert-modal__container">
          <button
            ref={closeButtonRef}
            className="cert-modal__close"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ESC
          </button>
          <iframe
            ref={iframeRef}
            className="cert-modal__frame"
            src={openCert || ''}
            title="Certificate"
          />
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import linkedinLogo from '@/assets/logos/linkedin.svg'
import { profile } from '@/data/profile'
import { assetUrl } from '@/lib/assetUrl'

const GREEN = '68C17A'

const localLogos = {
  linkedin: assetUrl(linkedinLogo),
}

function toWhatsAppHref(phone) {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

function socialIcon(social) {
  return (
    <img
      src={localLogos[social.id] || `https://cdn.simpleicons.org/${social.slug}/${GREEN}`}
      alt=""
      aria-hidden="true"
      data-rain-ignore
      className="h-4 w-4 object-contain opacity-90"
      loading="lazy"
      decoding="async"
    />
  )
}

export default function SocialLinks({ className = '' }) {
  const phones = (profile.phones || [profile.phone]).filter(Boolean)

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {profile.socials.map((social) =>
        social.id === 'whatsapp' && phones.length > 1 ? (
          <WhatsAppChooser key={social.id} social={social} phones={phones} />
        ) : (
          <a
            key={social.id}
            href={
              social.id === 'whatsapp' && phones[0]
                ? toWhatsAppHref(phones[0])
                : social.href
            }
            target="_blank"
            rel="noreferrer"
            className="icon-button"
            aria-label={social.label}
            title={social.label}
          >
            {socialIcon(social)}
          </a>
        ),
      )}
    </div>
  )
}

function WhatsAppChooser({ social, phones }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`${social.label} — choose a number`}
        title={`${social.label} — choose a number`}
        className="icon-button"
      >
        {socialIcon(social)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute bottom-full left-0 z-30 mb-2 min-w-[14rem] overflow-hidden rounded-xl border border-line bg-panel shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          >
            {phones.map((phone, index) => (
              <li key={phone} role="option">
                <a
                  href={toWhatsAppHref(phone)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 border-b border-line/70 px-3 py-2.5 font-mono text-[11px] text-heading transition-colors last:border-b-0 hover:bg-accent/10 hover:text-accent"
                >
                  <span className="text-[9px] uppercase tracking-[.16em] text-muted">
                    Option {index + 1}
                  </span>
                  <span className="ml-auto whitespace-nowrap">{phone}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

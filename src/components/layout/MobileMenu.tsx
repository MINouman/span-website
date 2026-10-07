'use client'

// Full-screen mobile menu sheet (spec §3.1). Traps focus, closes on Escape or link tap,
// locks page scroll while open. One of two elements allowed a shadow (spec §2).
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { Container } from '@/components/layout/Container'
import { isActive, primaryNav } from '@/components/layout/nav'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Wordmark } from '@/components/ui/Wordmark'
import { telHref, whatsappHref } from '@/lib/contact-links'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'
import type { SiteContact } from '@/lib/site'

type MobileMenuProps = {
  id: string
  open: boolean
  onClose: () => void
  locale: Locale
  dict: Dictionary
  contact: SiteContact
  current: string
}

export function MobileMenu({ id, open, onClose, locale, dict, contact, current }: MobileMenuProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab' || !sheetRef.current) return
      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <div
      id={id}
      ref={sheetRef}
      role="dialog"
      aria-modal="true"
      aria-label={dict.header.mainNav}
      inert={!open}
      className={`fixed inset-0 z-50 flex flex-col overflow-y-auto bg-canvas pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] text-ink shadow-[0_8px_32px_rgb(31_41_51/0.18)] transition-[opacity,visibility] duration-200 lg:hidden ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <Container className="flex h-[var(--header-height)] shrink-0 items-center justify-between border-b border-stone">
        <Wordmark href={localePath(locale, '/')} />
        <button
          ref={closeRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-control"
          aria-label={dict.header.closeMenu}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
      </Container>

      <Container as="nav" aria-label={dict.header.mainNav} className="flex-1 pt-8">
        <ul className="flex flex-col">
          {primaryNav.map((item) => {
            const active = isActive(current, item.path)
            return (
              <li key={item.key} className="border-b border-stone">
                <Link
                  href={localePath(locale, item.path)}
                  aria-current={active ? 'page' : undefined}
                  className={`flex min-h-16 items-center text-h2 transition-colors hover:text-amber-text ${active ? 'text-amber-text' : ''}`}
                  onClick={onClose}
                >
                  {dict.nav[item.key]}
                </Link>
              </li>
            )
          })}
        </ul>
      </Container>

      <Container className="flex shrink-0 flex-col gap-3 py-8">
        <a href={telHref(contact.phone)} className={buttonClasses('primary')}>
          <Icon name="phone" size={20} />
          {dict.header.call} {contact.phoneDisplay}
        </a>
        <a href={whatsappHref(contact.whatsapp)} className={buttonClasses('secondary')}>
          <Icon name="whatsapp" size={20} />
          {dict.footer.whatsapp}
        </a>
      </Container>
    </div>
  )
}

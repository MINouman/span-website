'use client'

// Header (spec §3.1).
// A floating white rounded bar on every page (client-chosen design): wordmark left, links centred
// with an amber underline that draws in on hover, phone as a dark button right. On Home it floats
// inside the inset hero panel; inner pages get a spacer of the same height.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import { MobileMenu } from '@/components/layout/MobileMenu'
import { isActive, primaryNav } from '@/components/layout/nav'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Icon } from '@/components/ui/Icon'
import { Wordmark } from '@/components/ui/Wordmark'
import { telHref } from '@/lib/contact-links'
import { localePath, stripLocale, type Dictionary, type Locale } from '@/lib/i18n'
import type { SiteContact } from '@/lib/site'

type HeaderProps = {
  locale: Locale
  dict: Dictionary
  contact: SiteContact
}

const SCROLL_THRESHOLD = 40

export function Header({ locale, dict, contact }: HeaderProps) {
  const current = stripLocale(usePathname())
  const isHome = current === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > SCROLL_THRESHOLD)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Stable identity, so the menu's focus and key handling effect does not rerun on every scroll update.
  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [setMenuOpen])

  const nav = (
    <nav aria-label={dict.header.mainNav} className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {primaryNav.map((item) => {
          const active = isActive(current, item.path)
          return (
            <li key={item.key}>
              <Link
                href={localePath(locale, item.path)}
                aria-current={active ? 'page' : undefined}
                className="group inline-flex min-h-11 items-center"
              >
                <span
                  className="link-underline text-body font-medium"
                  data-active={active ? '' : undefined}
                >
                  {dict.nav[item.key]}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  const menuButton = (
    <button
      ref={menuButtonRef}
      type="button"
      className="press inline-flex size-11 items-center justify-center rounded-control lg:hidden"
      aria-expanded={menuOpen}
      aria-controls="mobile-menu"
      aria-label={dict.header.openMenu}
      onClick={() => setMenuOpen(true)}
    >
      <Icon name="menu" />
    </button>
  )

  return (
    <>
      {/* One floating white bar on every page: wordmark left, links centred, phone right. It keeps
          its place while the page scrolls and gains a stronger shadow once scrolled. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-[var(--nav-offset)] pt-[calc(env(safe-area-inset-top)+var(--nav-offset))]">
        <div
          className={`drop-in pointer-events-auto mx-auto grid h-[var(--nav-bar)] max-w-[calc(var(--container-max)+2*var(--gutter))] grid-cols-[1fr_auto] items-center gap-6 rounded-[16px] bg-surface pr-2 pl-4 text-ink transition-shadow duration-300 lg:grid-cols-[1fr_auto_1fr] lg:pr-3 lg:pl-6 ${
            scrolled || !isHome
              ? 'shadow-[0_8px_30px_rgb(31_41_51/0.12)]'
              : 'shadow-[0_4px_20px_rgb(31_41_51/0.10)]'
          } ${isHome ? '' : 'border border-stone'}`}
        >
          <Wordmark href={localePath(locale, '/')} />
          {nav}
          <div className="flex items-center justify-end">
            <ArrowButton
              href={telHref(contact.phone)}
              icon="phone"
              size="sm"
              onLight
              className="tabular max-lg:hidden"
            >
              {contact.phoneDisplay}
            </ArrowButton>
            {menuButton}
          </div>
        </div>
      </header>

      {/* Inner pages: reserve the space the floating bar covers. The Home hero sits under it. */}
      {!isHome ? <div aria-hidden="true" className="h-[var(--nav-clearance)]" /> : null}

      <MobileMenu
        id="mobile-menu"
        open={menuOpen}
        onClose={closeMenu}
        locale={locale}
        dict={dict}
        contact={contact}
        current={current}
      />
    </>
  )
}

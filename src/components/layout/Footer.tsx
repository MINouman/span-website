// Footer (spec §3.11, client-requested illustrated style): a skyline scene (FooterScene) that sets into
// the ink footer, then a compact block: headline and office address, links marked with short amber
// bars, a "Contact us" button, a hairline, and the wordmark, copyright and contact icons.
// Kept short on purpose: the scene is 120px tall on phones and 180px on desktop.
// No bank-logo walls.
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { FooterScene } from '@/components/layout/FooterScene'
import { primaryNav } from '@/components/layout/nav'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Icon } from '@/components/ui/Icon'
import { Wordmark } from '@/components/ui/Wordmark'
import { mailtoHref, telHref, whatsappHref } from '@/lib/contact-links'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'
import { companyLegalName, type SiteContact } from '@/lib/site'

type FooterProps = {
  locale: Locale
  dict: Dictionary
  contact: SiteContact
}

// Short amber bar before each link (from the reference); it grows a little on hover.
const barLink =
  'relative inline-flex min-h-11 items-center pl-3.5 text-body text-canvas/85 transition-colors before:absolute before:top-1/2 before:left-0 before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-amber before:transition-[height] before:duration-300 hover:text-canvas hover:before:h-6 lg:min-h-10'

const iconButton =
  'press inline-flex size-11 items-center justify-center rounded-full border border-canvas/20 text-canvas/85 hover:-translate-y-px hover:border-amber hover:text-amber'

export function Footer({ locale, dict, contact }: FooterProps) {
  const t = dict.footer
  const socials = [
    { label: 'Facebook', href: contact.facebookUrl },
    { label: 'YouTube', href: contact.youtubeUrl },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  return (
    <footer className="text-canvas">
      <FooterScene className="h-[120px] sm:h-[150px] lg:h-[180px]" />

      <div className="bg-ink pb-[env(safe-area-inset-bottom)]">
        <Container className="grid grid-cols-1 gap-x-6 gap-y-5 pt-4 sm:grid-cols-[1fr_auto] sm:gap-y-6 lg:grid-cols-12 lg:pt-2">
          {/* Headline and office */}
          <div className="lg:col-span-4">
            <p className="max-w-[16ch] text-h3 font-bold tracking-[calc(-0.02em*var(--tracking-scale))] lg:text-[1.75rem] lg:leading-tight">
              {t.headline}
            </p>
            <address className="mt-3 text-small text-canvas/70 not-italic">
              {contact.addressLines.join(', ')}
              {contact.mapUrl ? (
                <>
                  {' · '}
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-canvas underline decoration-canvas/40 underline-offset-4 hover:decoration-amber"
                  >
                    {t.viewMap}
                  </a>
                </>
              ) : null}
            </address>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:col-span-2 sm:grid-cols-3 lg:col-span-6 lg:pt-1">
            <nav aria-label={dict.header.mainNav} className="col-span-2">
              <h2 className="sr-only">{t.explore}</h2>
              <ul className="grid grid-cols-2 gap-x-6">
                {primaryNav.map((item) => (
                  <li key={item.key}>
                    <Link href={localePath(locale, item.path)} className={barLink}>
                      {dict.nav[item.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Phones reach phone and WhatsApp through the icon buttons below. */}
            <div className="hidden sm:block">
              <h2 className="sr-only">{t.contact}</h2>
              <ul>
                <li>
                  <a href={telHref(contact.phone)} className={`${barLink} tabular`}>
                    {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref(contact.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={barLink}
                  >
                    {t.whatsapp}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Call to action: beside the headline on tablets, at the end of the row on desktop. */}
          <div className="sm:col-start-2 sm:row-start-1 lg:col-span-2 lg:col-start-auto lg:row-start-auto lg:flex lg:justify-end lg:pt-1">
            <ArrowButton href={localePath(locale, '/contact')} block className="sm:w-auto">
              {t.cta}
            </ArrowButton>
          </div>
        </Container>

        <Container className="mt-6 sm:mt-8 lg:mt-10">
          {/* Phones: wordmark and icons share a row, copyright below. Wider: one row. */}
          <div className="grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-2 border-t border-canvas/15 py-4 sm:grid-cols-[auto_1fr_auto] sm:py-5">
            <Wordmark href={localePath(locale, '/')} />
            <p className="order-last col-span-2 text-small text-canvas/60 sm:order-none sm:col-span-1">
              © {new Date().getFullYear()} {companyLegalName} {t.rights}
            </p>

            <ul className="flex items-center gap-2">
              <li>
                <a href={telHref(contact.phone)} aria-label={t.phone} className={iconButton}>
                  <Icon name="phone" size={18} />
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(contact.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.whatsapp}
                  className={iconButton}
                >
                  <Icon name="whatsapp" size={18} />
                </a>
              </li>
              <li>
                <a href={mailtoHref(contact.email)} aria-label={t.email} className={iconButton}>
                  <Icon name="mail" size={18} />
                </a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center px-2 text-small font-semibold text-canvas/85 hover:text-amber"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </footer>
  )
}

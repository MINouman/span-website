// Dark ink footer (spec §3.11): office address, phone, WhatsApp, email, map link, socials, copyright.
// No bank-logo walls.
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { primaryNav } from '@/components/layout/nav'
import { Wordmark } from '@/components/ui/Wordmark'
import { mailtoHref, telHref, whatsappHref } from '@/lib/contact-links'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'
import { companyLegalName, type SiteContact } from '@/lib/site'

type FooterProps = {
  locale: Locale
  dict: Dictionary
  contact: SiteContact
}

const linkClass = 'group inline-flex min-h-11 items-center'

export function Footer({ locale, dict, contact }: FooterProps) {
  const socials = [
    { label: 'Facebook', href: contact.facebookUrl },
    { label: 'YouTube', href: contact.youtubeUrl },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href))

  return (
    <footer className="bg-ink pb-[calc(env(safe-area-inset-bottom)+2rem)] text-canvas">
      <Container className="grid grid-cols-4 gap-x-5 gap-y-12 pt-18 lg:grid-cols-12 lg:gap-x-6 lg:pt-28">
        <div className="col-span-4 lg:col-span-4">
          <Wordmark href={localePath(locale, '/')} descriptor={dict.footer.descriptor} />
          <nav aria-label={dict.header.mainNav} className="mt-8">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.key}>
                  <Link href={localePath(locale, item.path)} className={linkClass}>
                    <span className="link-underline">{dict.nav[item.key]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="col-span-4 lg:col-span-3">
          <h2 className="text-small text-canvas/70">{dict.footer.office}</h2>
          <address className="mt-3 not-italic">
            {contact.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          {contact.mapUrl ? (
            <a
              href={contact.mapUrl}
              className={`${linkClass} mt-2`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="link-underline">{dict.footer.viewMap}</span>
            </a>
          ) : null}
        </div>

        <div className="col-span-4 lg:col-span-3">
          <h2 className="text-small text-canvas/70">{dict.footer.contact}</h2>
          <ul className="mt-2 flex flex-col">
            <li>
              <a href={telHref(contact.phone)} className={`${linkClass} tabular`}>
                <span className="link-underline">
                  {dict.footer.phone}: {contact.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(contact.whatsapp)}
                className={linkClass}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="link-underline">{dict.footer.whatsapp}</span>
              </a>
            </li>
            <li>
              <a href={mailtoHref(contact.email)} className={linkClass}>
                <span className="link-underline">{contact.email}</span>
              </a>
            </li>
          </ul>
        </div>

        {socials.length > 0 ? (
          <div className="col-span-4 lg:col-span-2">
            <h2 className="text-small text-canvas/70">{dict.footer.follow}</h2>
            <ul className="mt-2 flex flex-col">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className={linkClass} target="_blank" rel="noopener noreferrer">
                    <span className="link-underline">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <Container className="mt-16 lg:mt-24">
        <p className="border-t border-canvas/20 pt-6 text-small text-canvas/70">
          © {new Date().getFullYear()} {companyLegalName}
        </p>
      </Container>
    </footer>
  )
}

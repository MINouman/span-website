// Contact (spec §4), in the client-chosen layout: centred heading, then the enquiry form on the left
// (open fields, consent, full-width button, then direct channels) and what you can ask about plus the
// office address and hours on the right. The office map follows.
import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { MapBlock } from '@/components/sections/MapBlock'
import { Icon, type IconName } from '@/components/ui/Icon'
import { mailtoHref, telHref, whatsappHref } from '@/lib/contact-links'
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n'
import { placeholderContact } from '@/lib/site'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(isLocale(locale) ? locale : 'en').contactPage
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const t = dict.contactPage
  const contact = placeholderContact

  const channels: {
    icon: IconName
    label: string
    value: string
    href: string
    external?: boolean
  }[] = [
    { icon: 'phone', label: t.call, value: contact.phoneDisplay, href: telHref(contact.phone) },
    {
      icon: 'whatsapp',
      label: t.whatsapp,
      value: t.whatsappAction,
      href: whatsappHref(contact.whatsapp),
      external: true,
    },
    { icon: 'mail', label: t.email, value: contact.email, href: mailtoHref(contact.email) },
  ]

  return (
    <>
      <Container className="pt-12 pb-16 lg:pt-20 lg:pb-24">
        {/* Centred heading */}
        <div className="mx-auto max-w-[40rem] text-center">
          <p className="text-small font-semibold text-amber-text">{t.eyebrow}</p>
          <h1 className="mt-3 text-h1">{t.heading}</h1>
          <p className="mt-4 text-body-lg text-muted">{t.intro}</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-6">
          {/* Form and direct channels */}
          <div className="lg:col-span-6">
            <EnquiryForm
              labels={dict.enquiry}
              type="general"
              variant="plain"
              requireConsent
              privacyHref={localePath(locale, '/privacy')}
            />

            <h2 className="mt-12 text-body font-semibold">{t.alsoVia}</h2>
            <ul className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
              {channels.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex min-h-11 items-center gap-3"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-stone bg-surface transition-colors group-hover:border-ink">
                      <Icon name={c.icon} size={20} />
                    </span>
                    <span>
                      <span className="sr-only">{c.label}: </span>
                      <span className="text-small font-medium tabular decoration-2 underline-offset-4 group-hover:underline group-hover:decoration-amber">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* What you can ask about, office and hours */}
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="text-h3">{t.benefitsTitle}</h2>
            <ul className="mt-6 flex flex-col gap-4">
              {t.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-body">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-ink">
                    <Icon name="check" size={14} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-stone pt-10 sm:grid-cols-2">
              <div>
                <p className="flex items-center gap-2 text-body font-semibold">
                  <Icon name="pin" size={20} />
                  {t.headOffice}
                </p>
                <address className="mt-3 text-small text-muted not-italic">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div>
                <p className="flex items-center gap-2 text-body font-semibold">
                  <Icon name="calendar" size={20} />
                  {t.hours}
                </p>
                <p className="mt-3 text-small text-muted">{contact.officeHours}</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {contact.coordinates ? (
        <Section id="map" title={t.mapTitle} lead={contact.addressLines.join(', ')}>
          <MapBlock lat={contact.coordinates.lat} lng={contact.coordinates.lng} labels={dict.map} />
        </Section>
      ) : null}
    </>
  )
}

// Home section 6 (spec §4): one centred headline (the only centred text the spec allows), call /
// WhatsApp / enquire, then the office map beside the office details. The dark footer follows.
import { Container } from '@/components/layout/Container'
import { MapBlock } from '@/components/sections/MapBlock'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SpanLine } from '@/components/ui/SpanLine'
import { mailtoHref, telHref, whatsappHref } from '@/lib/contact-links'
import type { Dictionary } from '@/lib/i18n'
import type { SiteContact } from '@/lib/site'

type ClosingCtaProps = {
  contact: SiteContact
  labels: Dictionary['closing']
  mapLabels: Dictionary['map']
  contactHref: string
}

export function ClosingCta({ contact, labels, mapLabels, contactHref }: ClosingCtaProps) {
  return (
    <section aria-labelledby="closing-title" className="bg-deco-light section-y">
      <Container>
        <SpanLine />
        <div className="mx-auto mt-8 max-w-[40rem] text-center lg:mt-10">
          <h2 id="closing-title" className="text-h1">
            {labels.title}
          </h2>
          <p className="mx-auto mt-5 max-w-[34rem] text-body-lg text-muted">{labels.lead}</p>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a href={telHref(contact.phone)} className={buttonClasses('primary')}>
              <Icon name="phone" size={20} />
              {labels.call}
            </a>
            <a
              href={whatsappHref(contact.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses('secondary')}
            >
              <Icon name="whatsapp" size={20} />
              {labels.whatsapp}
            </a>
            <a href={contactHref} className={`${buttonClasses('text')} sm:ml-3`}>
              {labels.enquire}
            </a>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-12">
          {contact.coordinates ? (
            <MapBlock
              lat={contact.coordinates.lat}
              lng={contact.coordinates.lng}
              labels={mapLabels}
              aspectClass="aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[22rem]"
              className="flex flex-col lg:col-span-8 [&>div:first-child]:flex-1"
            />
          ) : null}

          <div className="rounded-card border border-stone bg-surface p-6 lg:col-span-4 lg:p-8">
            <h3 className="text-h3">{labels.officeTitle}</h3>
            <dl className="mt-6 flex flex-col gap-5">
              <div className="flex gap-3">
                <dt className="sr-only">{labels.officeTitle}</dt>
                <Icon name="pin" size={20} className="mt-0.5 text-muted" />
                <dd>
                  <address className="not-italic">
                    {contact.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{labels.hours}</dt>
                <Icon name="calendar" size={20} className="mt-0.5 text-muted" />
                <dd>{contact.officeHours}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{labels.phone}</dt>
                <Icon name="phone" size={20} className="mt-0.5 text-muted" />
                <dd>
                  <a
                    href={telHref(contact.phone)}
                    className="tabular underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
                  >
                    {contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">{labels.email}</dt>
                <Icon name="mail" size={20} className="mt-0.5 text-muted" />
                <dd>
                  <a
                    href={mailtoHref(contact.email)}
                    className="underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}

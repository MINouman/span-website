// Dark enquiry section: heading, short lead, direct phone and WhatsApp links, and a form on the right.
// Used on the project page and the landowner page. Counts as one of the page's two dark sections.
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'
import { telHref, whatsappHref } from '@/lib/contact-links'
import type { SiteContact } from '@/lib/site'

type EnquirySectionProps = {
  id: string
  title: string
  lead: string
  contact: SiteContact
  whatsappLabel: string
  whatsappMessage?: string
  /** The form. */
  children: ReactNode
}

const linkClass =
  'inline-flex min-h-11 items-center gap-3 text-body font-semibold hover:underline hover:decoration-amber hover:decoration-2 hover:underline-offset-4'

export function EnquirySection({
  id,
  title,
  lead,
  contact,
  whatsappLabel,
  whatsappMessage,
  children,
}: EnquirySectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="bg-deco-dark scroll-mt-[var(--nav-clearance)] bg-ink py-16 text-canvas lg:py-24"
    >
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <h2 id={`${id}-title`} className="text-h2">
            {title}
          </h2>
          <p className="measure mt-4 text-body-lg text-canvas/85">{lead}</p>
          <ul className="mt-8 flex flex-col gap-1">
            <li>
              <a href={telHref(contact.phone)} className={`${linkClass} tabular`}>
                <Icon name="phone" size={20} />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(contact.whatsapp, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <Icon name="whatsapp" size={20} />
                {whatsappLabel}
              </a>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">{children}</div>
      </Container>
    </section>
  )
}

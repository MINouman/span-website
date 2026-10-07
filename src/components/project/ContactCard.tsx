// Project page sidebar card (in place of the reference's agent card): SPAN, a one-line offer, then
// Call and WhatsApp as outlined buttons and "Send an enquiry" as the amber primary. Brochure if any.
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { telHref, whatsappHref } from '@/lib/contact-links'
import type { Dictionary } from '@/lib/i18n'
import type { SiteContact } from '@/lib/site'

type ContactCardProps = {
  contact: SiteContact
  labels: Dictionary['project']
  whatsappMessage: string
  brochureUrl?: string | null
}

export function ContactCard({ contact, labels, whatsappMessage, brochureUrl }: ContactCardProps) {
  return (
    <aside className="rounded-card border border-stone bg-surface p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-[0.6875rem] font-extrabold tracking-[-0.03em] text-canvas"
        >
          SPAN
        </span>
        <div>
          <p className="text-body font-semibold">{labels.contactTitle}</p>
          <p className="text-small text-muted tabular">{contact.phoneDisplay}</p>
        </div>
      </div>
      <p className="mt-4 text-small text-muted">{labels.contactLead}</p>

      <div className="mt-5 flex flex-col gap-2.5">
        <a href={telHref(contact.phone)} className={`${buttonClasses('secondary')} w-full`}>
          <Icon name="phone" size={18} />
          {labels.call}
        </a>
        <a
          href={whatsappHref(contact.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${buttonClasses('secondary')} w-full`}
        >
          <Icon name="whatsapp" size={18} />
          {labels.whatsapp}
        </a>
        <a href="#enquire" className={`${buttonClasses('primary')} w-full`}>
          {labels.contactEnquire}
        </a>
      </div>

      {brochureUrl ? (
        <a
          href={brochureUrl}
          download
          className="group mt-4 inline-flex min-h-11 items-center gap-2 text-small font-semibold"
        >
          <Icon name="download" size={18} />
          <span className="link-underline">{labels.brochure}</span>
        </a>
      ) : null}
    </aside>
  )
}

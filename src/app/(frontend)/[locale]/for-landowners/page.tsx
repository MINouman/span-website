// For landowners (spec §4): what SPAN offers, how a joint venture works (4 steps), documents and
// legal clarity, timeline to handover, FAQs, partner list, landowner enquiry form.
// No profit-sharing ratios unless the client supplies them.
import type { Metadata } from 'next'

import { PageIntro } from '@/components/layout/PageIntro'
import { Section } from '@/components/layout/Section'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { EnquirySection } from '@/components/sections/EnquirySection'
import { PartnersList } from '@/components/sections/PartnersList'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Accordion } from '@/components/ui/Accordion'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { telHref } from '@/lib/contact-links'
import { getDictionary, isLocale, type Locale } from '@/lib/i18n'
import { placeholderLandownerSteps } from '@/lib/placeholder-home'
import {
  placeholderLandownerDocuments,
  placeholderLandownerFaqs,
  placeholderLegalNote,
  placeholderTimeline,
} from '@/lib/placeholder-pages'
import { getPermittedPartners } from '@/lib/queries'
import { placeholderContact } from '@/lib/site'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(isLocale(locale) ? locale : 'en').landownerPage
  return { title: t.metaTitle, description: t.metaDescription }
}

export default async function LandownersPage({ params }: PageProps) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const t = dict.landownerPage
  const contact = placeholderContact

  return (
    <>
      <PageIntro title={t.title} lead={t.lead}>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#enquire" className={buttonClasses('primary')}>
            {t.cta}
          </a>
          <a href={telHref(contact.phone)} className={buttonClasses('secondary')}>
            <Icon name="phone" size={20} />
            {t.call} <span className="tabular">{contact.phoneDisplay}</span>
          </a>
        </div>
      </PageIntro>

      <Section id="how-it-works" title={t.stepsTitle} lead={t.stepsLead} className="pt-0 lg:pt-0">
        <ProcessSteps steps={placeholderLandownerSteps} label={t.stepsTitle} />
      </Section>

      <Section id="documents" title={t.documentsTitle} lead={t.documentsLead}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-8">
            {placeholderLandownerDocuments.map((doc) => (
              <li
                key={doc.title}
                className="flex gap-3 rounded-[12px] border border-stone bg-surface p-4"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-tint text-amber-text">
                  <Icon name="check" size={18} />
                </span>
                <span>
                  <span className="block text-body font-semibold">{doc.title}</span>
                  {doc.note ? (
                    <span className="mt-0.5 block text-small text-muted">{doc.note}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
          <p className="measure text-body-lg lg:col-span-4">{placeholderLegalNote}</p>
        </div>
      </Section>

      <Section id="timeline" title={t.timelineTitle}>
        <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {placeholderTimeline.map((phase, i) => (
            <li
              key={phase.title}
              className="relative rounded-card border border-stone bg-surface p-5"
            >
              <span className="text-small font-semibold text-amber-text tabular">{i + 1}</span>
              <h3 className="mt-2 text-h3">{phase.title}</h3>
              <p className="mt-1 text-small font-semibold">{phase.duration}</p>
              <p className="mt-3 text-small text-muted">{phase.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="faq" title={t.faqTitle}>
        <div className="max-w-[52rem]">
          <Accordion items={placeholderLandownerFaqs} />
        </div>
      </Section>

      <PartnersList
        partners={await getPermittedPartners()}
        labels={dict.partners}
        locale={locale}
      />

      <EnquirySection
        id="enquire"
        title={t.enquireTitle}
        lead={t.enquireLead}
        contact={contact}
        whatsappLabel={dict.project.whatsapp}
        whatsappMessage={t.whatsappMessage}
      >
        <EnquiryForm labels={dict.enquiry} type="landowner" />
      </EnquirySection>
    </>
  )
}

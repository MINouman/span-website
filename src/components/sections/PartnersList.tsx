// Home section 5 (spec §4): landowner partners, only those who gave permission.
// Renders nothing when the list is empty, so the section disappears.
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { SpanLine } from '@/components/ui/SpanLine'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'
import type { PartnerListing } from '@/lib/queries'

type PartnersListProps = {
  partners: PartnerListing[]
  labels: Dictionary['partners']
  locale: Locale
}

/** Up to two initials, skipping bracketed placeholder text. */
function initials(name: string): string {
  const words = name
    .replace(/\[[^\]]*\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function PartnersList({ partners, labels, locale }: PartnersListProps) {
  if (partners.length === 0) return null
  // "Landowner, {project}": text around the project name, so the name can be a link in any language.
  const [before, after = ''] = labels.landownerOf.split('{project}')

  return (
    <section aria-labelledby="partners-title" className="section-y">
      <Container>
        <SpanLine />
        <div className="mt-8 lg:mt-10">
          <h2 id="partners-title" className="text-h2">
            {labels.title}
          </h2>
          <p className="measure mt-3 text-body text-muted">{labels.lead}</p>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {partners.map((partner, i) => (
            <li
              key={`${partner.projectSlug}-${i}`}
              data-tilt=""
              className="relative flex gap-4 rounded-card border border-stone bg-surface p-5 shadow-card hover:shadow-card-hover lg:p-6"
            >
              <span className="relative inline-flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-tint text-body font-semibold text-amber-text">
                {partner.photo ? (
                  <Image src={partner.photo} alt="" fill sizes="56px" className="object-cover" />
                ) : (
                  <span aria-hidden="true">{initials(partner.landownerName) || '·'}</span>
                )}
              </span>
              <div className="min-w-0">
                <p className="text-body font-semibold">{partner.landownerName}</p>
                <p className="mt-0.5 text-small text-muted">
                  {before}
                  <Link
                    href={localePath(locale, `/projects/${partner.projectSlug}`)}
                    className="font-semibold text-ink underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
                  >
                    {partner.projectTitle}
                  </Link>
                  {after}
                </p>
                {partner.note ? <p className="mt-3 text-small">{partner.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

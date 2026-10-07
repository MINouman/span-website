// About (spec §4): company story and founding year, key numbers, what quality means at SPAN,
// leadership, approvals and memberships (only if actually held), a short Aftabnagar note.
import type { Metadata } from 'next'
import Image from 'next/image'

import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/layout/PageIntro'
import { Section } from '@/components/layout/Section'
import { ClosingCta } from '@/components/sections/ClosingCta'
import { KeyNumbers } from '@/components/sections/KeyNumbers'
import { QualityPromise } from '@/components/sections/QualityPromise'
import { Button } from '@/components/ui/Button'
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n'
import { placeholderQualityPillars } from '@/lib/placeholder-home'
import {
  placeholderAftabnagarNote,
  placeholderKeyNumbers,
  placeholderLeadership,
  placeholderMemberships,
  placeholderQualityStatement,
  placeholderStory,
} from '@/lib/placeholder-pages'
import { placeholderContact } from '@/lib/site'

import aftabnagarPhoto from '../../../../../assets/images/home/hero3.jpg'

type PageProps = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const t = getDictionary(isLocale(locale) ? locale : 'en').about
  return { title: t.metaTitle, description: t.metaDescription }
}

function initials(name: string): string {
  return name
    .replace(/\[[^\]]*\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const t = dict.about

  return (
    <>
      <PageIntro title={t.title} lead={placeholderStory[0]} />

      <Container className="pb-16 lg:pb-24">
        <KeyNumbers items={placeholderKeyNumbers} label={t.numbersLabel} />
      </Container>

      <Section id="story" title={t.storyTitle}>
        <div className="flex max-w-[44rem] flex-col gap-5">
          {placeholderStory.slice(1).map((para) => (
            <p key={para} className="text-body-lg">
              {para}
            </p>
          ))}
        </div>
      </Section>

      <QualityPromise
        pillars={placeholderQualityPillars}
        labels={{ ...dict.quality, title: t.qualityTitle, lead: placeholderQualityStatement }}
      />

      <Section id="leadership" title={t.leadershipTitle}>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderLeadership.map((leader, i) => (
            <li key={`${leader.role}-${i}`}>
              {/* Photo placeholder: 4:5 frame with initials until a portrait is supplied. */}
              <div className="flex aspect-[4/5] items-center justify-center rounded-card bg-render-ground">
                <span className="text-display text-muted/60">{initials(leader.name) || '·'}</span>
              </div>
              <h3 className="mt-5 text-h3">{leader.name}</h3>
              <p className="mt-1 text-small font-semibold text-amber-text">{leader.role}</p>
              {leader.note ? (
                <p className="measure mt-3 text-body text-muted">{leader.note}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      {placeholderMemberships.length > 0 ? (
        <Section id="approvals" title={t.approvalsTitle} lead={t.approvalsLead}>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {placeholderMemberships.map((m) => (
              <li key={m.name} className="rounded-[12px] border border-stone bg-surface p-5">
                <p className="text-body font-semibold">{m.name}</p>
                {m.reference ? (
                  <p className="mt-1 text-small text-muted tabular">{m.reference}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section id="aftabnagar" title={t.aftabnagarTitle}>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-image bg-stone lg:col-span-7">
            <Image
              src={aftabnagarPhoto}
              alt="[CLIENT] Placeholder photo: residential towers in Aftabnagar"
              fill
              sizes="(min-width: 1024px) 720px, 100vw"
              placeholder="blur"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="measure text-body-lg">{placeholderAftabnagarNote}</p>
            <Button href={localePath(locale, '/projects')} variant="secondary" className="mt-8">
              {t.viewProjects}
            </Button>
          </div>
        </div>
      </Section>

      <ClosingCta
        contact={placeholderContact}
        labels={dict.closing}
        mapLabels={dict.map}
        contactHref={localePath(locale, '/contact')}
      />
    </>
  )
}

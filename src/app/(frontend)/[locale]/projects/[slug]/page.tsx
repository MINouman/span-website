// Project detail (spec §4 Project detail). Opening overview modelled on the client's reference card:
// 3D main image with photo thumbnails, then status, name, location, summary, key facts, location tile
// and actions. Below: about + key facts list, apartment types, facilities, gallery, quality and
// approvals, construction updates (ongoing only), location map, enquiry form, next project.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { Gallery } from '@/components/gallery/Gallery'
import { ConstructionUpdates } from '@/components/project/ConstructionUpdates'
import { Facilities } from '@/components/project/Facilities'
import { KeyFacts, type KeyFact } from '@/components/project/KeyFacts'
import { NextProject } from '@/components/project/NextProject'
import { OverviewMedia } from '@/components/project/OverviewMedia'
import { QualityDetails } from '@/components/project/QualityDetails'
import { SpecList, type SpecRow } from '@/components/project/SpecList'
import { UnitTypes } from '@/components/project/UnitTypes'
import { EnquirySection } from '@/components/sections/EnquirySection'
import { MapBlock } from '@/components/sections/MapBlock'
import { buttonClasses } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import { telHref, whatsappHref } from '@/lib/contact-links'
import { fillTemplate, formatRange } from '@/lib/format'
import { getDictionary, isLocale, localePath, locales, type Locale } from '@/lib/i18n'
import { placeholderProjects } from '@/lib/placeholder-projects'
import { toSummary, unitRange } from '@/lib/projects'
import { getNextProject, getProjectBySlug } from '@/lib/queries'
import { placeholderContact } from '@/lib/site'

type PageProps = { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return locales.flatMap((locale) => placeholderProjects.map((p) => ({ locale, slug: p.slug })))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return {}
  return {
    // Spec §7: "Project name — apartments in Aftabnagar, Dhaka"
    title: { absolute: `${project.title} — apartments in Aftabnagar, Dhaka` },
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale: raw, slug } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const project = await getProjectBySlug(slug)
  if (!project) notFound()

  const dict = getDictionary(locale)
  const p = dict.project
  const next = await getNextProject(slug)
  const contact = placeholderContact
  const completed = project.status === 'completed'

  // Opening key facts: ranges across apartment types, then building facts.
  const beds = unitRange(project.unitTypes, 'bedrooms')
  const baths = unitRange(project.unitTypes, 'bathrooms')
  const size = unitRange(project.unitTypes, 'sizeSqft')
  const keyFacts: KeyFact[] = [
    ...(beds
      ? [
          {
            icon: 'bed' as const,
            label: fillTemplate(dict.facts.beds, { range: formatRange(beds) }),
          },
        ]
      : []),
    ...(baths
      ? [
          {
            icon: 'bath' as const,
            label: fillTemplate(dict.facts.baths, { range: formatRange(baths) }),
          },
        ]
      : []),
    ...(size
      ? [
          {
            icon: 'area' as const,
            label: fillTemplate(dict.facts.sqft, { range: formatRange(size) }),
          },
        ]
      : []),
    ...(project.floors
      ? [{ icon: 'layers' as const, label: fillTemplate(dict.facts.floors, { n: project.floors }) }]
      : []),
    ...(project.handoverYear
      ? [
          {
            icon: 'calendar' as const,
            label: fillTemplate(completed ? dict.facts.handover : dict.facts.expectedHandover, {
              year: project.handoverYear,
            }),
          },
        ]
      : []),
  ]

  // Key facts list beside the description. Only fields that are set.
  const specRows: SpecRow[] = [
    { label: p.status, value: dict.status[project.status] },
    { label: p.address, value: project.addressLine },
    ...(project.landAreaKatha
      ? [{ label: p.landArea, value: fillTemplate(p.katha, { n: project.landAreaKatha }) }]
      : []),
    ...(project.floors ? [{ label: p.floors, value: String(project.floors) }] : []),
    ...(project.basements ? [{ label: p.basements, value: String(project.basements) }] : []),
    ...(project.totalUnits ? [{ label: p.apartments, value: String(project.totalUnits) }] : []),
    ...(project.unitTypes.length
      ? [{ label: p.apartmentTypes, value: project.unitTypes.map((u) => u.label).join(', ') }]
      : []),
    ...(project.handoverYear
      ? [
          {
            label: completed ? p.handover : p.expectedHandover,
            value: String(project.handoverYear),
          },
        ]
      : []),
  ]

  const whatsappMessage = fillTemplate(dict.card.whatsappMessage, { name: project.title })

  return (
    <>
      {/* Overview */}
      <Container className="pt-6 pb-16 lg:pt-10 lg:pb-24">
        <nav aria-label="Breadcrumb">
          <Link
            href={localePath(locale, '/projects')}
            className="inline-flex min-h-11 items-center gap-2 text-small font-semibold text-muted hover:text-ink"
          >
            <Icon name="arrowLeft" size={18} />
            {p.breadcrumb}
          </Link>
        </nav>

        <div className="mt-4 grid grid-cols-1 gap-10 lg:mt-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <OverviewMedia
              image={project.image}
              imageAlt={project.imageAlt}
              gallery={project.gallery}
              labels={dict.gallery}
            />
          </div>

          <div className="flex flex-col lg:col-span-5">
            <StatusChip status={project.status} labels={dict.status} className="self-start" />
            <h1 className="mt-4 text-h1">{project.title}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-body text-muted">
              <Icon name="pin" size={18} />
              {project.location}
            </p>
            <p className="measure mt-6 text-body-lg">{project.summary}</p>

            <div className="mt-6">
              <KeyFacts facts={keyFacts} />
            </div>

            {project.availabilityNote ? (
              <p className="mt-6 rounded-[12px] bg-amber-tint px-4 py-3 text-small text-ink">
                {project.availabilityNote}
              </p>
            ) : null}

            {project.coordinates ? (
              <a
                href="#location"
                className="group mt-6 flex items-center gap-4 rounded-[14px] border border-stone bg-surface p-2 pr-4"
              >
                <span
                  aria-hidden="true"
                  className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-[10px] bg-[#eef0ee]"
                >
                  <span className="absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 bg-white" />
                  <span className="absolute inset-y-0 left-1/3 w-2 bg-white" />
                  <span className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-ink" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-small text-muted">
                    {project.addressLine}
                  </span>
                  <span className="mt-0.5 block text-small font-semibold underline-offset-4 group-hover:underline group-hover:decoration-amber group-hover:decoration-2">
                    {p.seeLocation}
                  </span>
                </span>
              </a>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#enquire"
                className={`${buttonClasses('primary')} flex-1 basis-full sm:basis-auto`}
              >
                {p.enquire}
              </a>
              <a href={telHref(contact.phone)} className={`${buttonClasses('secondary')} flex-1`}>
                <Icon name="phone" size={20} />
                {p.call}
              </a>
              <a
                href={whatsappHref(contact.whatsapp, whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClasses('secondary')} flex-1`}
              >
                <Icon name="whatsapp" size={20} />
                {p.whatsapp}
              </a>
            </div>

            {project.brochureUrl ? (
              <a
                href={project.brochureUrl}
                className={`${buttonClasses('text')} mt-4 self-start`}
                download
              >
                <Icon name="download" size={20} />
                {p.brochure}
              </a>
            ) : null}
          </div>
        </div>
      </Container>

      <Section id="about" title={p.aboutTitle}>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-5 lg:col-span-6">
            {project.description.map((para, i) => (
              <p key={i} className="measure text-body-lg">
                {para}
              </p>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="mb-4 text-h3">{p.specTitle}</h3>
            <SpecList rows={specRows} />
          </div>
        </div>
      </Section>

      {project.unitTypes.length > 0 ? (
        <Section id="apartments" title={p.unitsTitle} lead={p.unitsLead}>
          <UnitTypes unitTypes={project.unitTypes} labels={p} galleryLabels={dict.gallery} />
        </Section>
      ) : null}

      {project.facilities.length > 0 ? (
        <Section id="facilities" title={p.facilitiesTitle}>
          <Facilities items={project.facilities} />
        </Section>
      ) : null}

      {project.gallery.length > 0 ? (
        <Section id="gallery" title={p.galleryTitle}>
          <Gallery items={project.gallery} labels={dict.gallery} />
        </Section>
      ) : null}

      {project.qualityDetails.length > 0 || project.approvals.length > 0 ? (
        <Section id="quality" title={p.qualityTitle} lead={p.qualityLead}>
          <QualityDetails
            details={project.qualityDetails}
            approvals={project.approvals}
            labels={p}
          />
        </Section>
      ) : null}

      {project.status === 'ongoing' && project.constructionUpdates.length > 0 ? (
        <Section id="updates" title={p.updatesTitle}>
          <ConstructionUpdates updates={project.constructionUpdates} locale={locale} />
        </Section>
      ) : null}

      {project.coordinates ? (
        <Section id="location" title={p.locationTitle} lead={project.addressLine}>
          <MapBlock lat={project.coordinates.lat} lng={project.coordinates.lng} labels={dict.map} />
        </Section>
      ) : null}

      {/* Enquiry: one of the page's two dark sections (the footer is the other). */}
      <EnquirySection
        id="enquire"
        title={p.enquireTitle}
        lead={p.enquireLead}
        contact={contact}
        whatsappLabel={p.whatsapp}
        whatsappMessage={whatsappMessage}
      >
        <EnquiryForm labels={dict.enquiry} project={{ slug: project.slug, title: project.title }} />
      </EnquirySection>

      {next ? (
        <NextProject
          project={toSummary(next)}
          href={localePath(locale, `/projects/${next.slug}`)}
          labels={dict}
        />
      ) : null}
    </>
  )
}

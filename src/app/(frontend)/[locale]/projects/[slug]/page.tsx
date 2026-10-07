// Project detail (spec §4 Project detail), in the client-chosen property-page layout:
// breadcrumb, title and location with Share; a photo grid (3D main image large, two photos, "Map view"
// and "Show all photos"); a sticky contact card on the right; then compact blocks in the main column:
// summary and fact pills, key numbers, about (Show more) and key facts, facilities checklist,
// apartment types, gallery, construction updates (ongoing only), quality and approvals, location.
// Full width after: the enquiry form, then a "More projects" row.
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Container } from '@/components/layout/Container'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { Gallery } from '@/components/gallery/Gallery'
import { ConstructionUpdates } from '@/components/project/ConstructionUpdates'
import { ContactCard } from '@/components/project/ContactCard'
import { DetailBlock } from '@/components/project/DetailBlock'
import { Facilities } from '@/components/project/Facilities'
import { KeyFacts, type KeyFact } from '@/components/project/KeyFacts'
import { MoreProjects } from '@/components/project/MoreProjects'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectMediaGrid } from '@/components/project/ProjectMediaGrid'
import { QualityDetails } from '@/components/project/QualityDetails'
import { SpecList, type SpecRow } from '@/components/project/SpecList'
import { UnitTypes } from '@/components/project/UnitTypes'
import { EnquirySection } from '@/components/sections/EnquirySection'
import { MapBlock } from '@/components/sections/MapBlock'
import { Icon, type IconName } from '@/components/ui/Icon'
import { ReadMore } from '@/components/ui/ReadMore'
import { ShareButton } from '@/components/ui/ShareButton'
import { StatusChip } from '@/components/ui/StatusChip'
import { fillTemplate, formatRange } from '@/lib/format'
import { getDictionary, isLocale, localePath, locales, type Locale } from '@/lib/i18n'
import { placeholderProjects } from '@/lib/placeholder-projects'
import { toSummary, unitRange } from '@/lib/projects'
import { getAllProjects, getProjectBySlug } from '@/lib/queries'
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
  const contact = placeholderContact
  const completed = project.status === 'completed'
  const others = (await getAllProjects()).filter((o) => o.slug !== project.slug)
  const whatsappMessage = fillTemplate(dict.card.whatsappMessage, { name: project.title })

  // Fact pills: ranges across apartment types, then building facts.
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
  ]

  // Key numbers cards (reference: "Property score"). Only numbers that are set.
  const numbers: { icon: IconName; value: string; label: string }[] = [
    ...(project.floors
      ? [{ icon: 'layers' as const, value: String(project.floors), label: p.floors }]
      : []),
    ...(project.totalUnits
      ? [{ icon: 'building' as const, value: String(project.totalUnits), label: p.apartments }]
      : []),
    ...(project.landAreaKatha
      ? [
          {
            icon: 'land' as const,
            value: fillTemplate(p.katha, { n: project.landAreaKatha }),
            label: p.landArea,
          },
        ]
      : []),
    ...(project.handoverYear
      ? [
          {
            icon: 'calendar' as const,
            value: String(project.handoverYear),
            label: completed ? p.handover : p.expectedHandover,
          },
        ]
      : []),
  ]

  // Key facts list. Only fields that are set.
  const specRows: SpecRow[] = [
    { label: p.status, value: dict.status[project.status] },
    { label: p.address, value: project.addressLine },
    ...(project.basements ? [{ label: p.basements, value: String(project.basements) }] : []),
    ...(project.unitTypes.length
      ? [{ label: p.apartmentTypes, value: project.unitTypes.map((u) => u.label).join(', ') }]
      : []),
  ]

  return (
    <>
      <Container className="pt-2 pb-12 lg:pt-4 lg:pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-small text-muted">
            <li>
              <Link
                href={localePath(locale, '/projects')}
                className="group inline-flex min-h-11 items-center"
              >
                <span className="link-underline">{p.breadcrumb}</span>
              </Link>
            </li>
            <li aria-hidden="true">
              <Icon name="chevronRight" size={14} />
            </li>
            <li aria-current="page" className="font-semibold text-ink">
              {project.title}
            </li>
          </ol>
        </nav>

        {/* Title row */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="text-h2">{project.title}</h1>
            <p className="mt-1.5 flex items-center gap-1.5 text-small text-muted">
              <Icon name="pin" size={16} />
              {project.location}
            </p>
          </div>
          <div className="flex items-center gap-5">
            <ShareButton title={project.title} label={p.share} copiedLabel={p.shareCopied} />
            {project.coordinates ? (
              <a
                href="#location"
                className="group inline-flex min-h-11 items-center gap-2 text-small font-semibold"
              >
                <Icon name="pin" size={18} />
                <span className="link-underline">{p.seeLocation}</span>
              </a>
            ) : null}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-12">
          {/* Photos, summary and numbers */}
          <div className="flex flex-col gap-6 lg:col-span-8 lg:row-start-1">
            <ProjectMediaGrid
              image={project.image}
              imageAlt={project.imageAlt}
              gallery={project.gallery}
              labels={dict.gallery}
              projectLabels={p}
              mapHref={project.coordinates ? '#location' : null}
            />

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <StatusChip status={project.status} labels={dict.status} />
                {project.unitTypes.length > 0 ? (
                  <span className="inline-flex h-7 items-center rounded-chip border border-stone px-3 text-small">
                    {project.unitTypes.length === 1
                      ? dict.facts.oneType
                      : fillTemplate(dict.facts.types, { n: project.unitTypes.length })}
                  </span>
                ) : null}
              </div>
              <p className="measure mt-3 text-body-lg">{project.summary}</p>
              <div className="mt-4">
                <KeyFacts facts={keyFacts} />
              </div>
              {project.availabilityNote ? (
                <p className="mt-4 rounded-[12px] bg-amber-tint px-4 py-3 text-small text-ink">
                  {project.availabilityNote}
                </p>
              ) : null}
            </div>

            {numbers.length > 0 ? (
              <dl aria-label={p.numbersLabel} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {numbers.map((n) => (
                  // Label first in the markup (as a description list requires), shown under the number.
                  <div
                    key={n.label}
                    className="flex flex-col rounded-[14px] border border-stone bg-surface p-4"
                  >
                    <Icon name={n.icon} size={20} className="order-1 text-muted" />
                    <dt className="order-3 mt-0.5 text-small text-muted">{n.label}</dt>
                    <dd className="order-2 mt-3 text-h3 tabular">{n.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>

          {/* Contact card: after the summary on phones, a sticky sidebar on desktop */}
          <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-[var(--nav-clearance)]">
              <ContactCard
                contact={contact}
                labels={p}
                whatsappMessage={whatsappMessage}
                brochureUrl={project.brochureUrl}
              />
            </div>
          </div>

          {/* Detail blocks */}
          <div className="flex flex-col gap-8 lg:col-span-8 lg:row-start-2 lg:gap-10">
            <DetailBlock id="about" title={p.aboutTitle}>
              <ReadMore
                paragraphs={project.description}
                moreLabel={p.showMore}
                lessLabel={p.showLess}
              />
              <div className="mt-6">
                <SpecList rows={specRows} />
              </div>
            </DetailBlock>

            {project.facilities.length > 0 ? (
              <DetailBlock id="facilities" title={p.facilitiesTitle}>
                <Facilities items={project.facilities} />
              </DetailBlock>
            ) : null}

            {project.unitTypes.length > 0 ? (
              <DetailBlock id="apartments" title={p.unitsTitle} lead={p.unitsLead}>
                <UnitTypes unitTypes={project.unitTypes} labels={p} galleryLabels={dict.gallery} />
              </DetailBlock>
            ) : null}

            {project.gallery.length > 0 ? (
              <DetailBlock id="gallery" title={p.galleryTitle}>
                <Gallery items={project.gallery} labels={dict.gallery} />
              </DetailBlock>
            ) : null}

            {project.status === 'ongoing' && project.constructionUpdates.length > 0 ? (
              <DetailBlock id="updates" title={p.updatesTitle}>
                <ConstructionUpdates updates={project.constructionUpdates} locale={locale} />
              </DetailBlock>
            ) : null}

            {project.qualityDetails.length > 0 || project.approvals.length > 0 ? (
              <DetailBlock id="quality" title={p.qualityTitle} lead={p.qualityLead}>
                <QualityDetails
                  details={project.qualityDetails}
                  approvals={project.approvals}
                  labels={p}
                />
              </DetailBlock>
            ) : null}

            {project.coordinates ? (
              <DetailBlock id="location" title={p.locationTitle} lead={project.addressLine}>
                <MapBlock
                  lat={project.coordinates.lat}
                  lng={project.coordinates.lng}
                  labels={dict.map}
                  aspectClass="aspect-[4/3] md:aspect-[16/9]"
                />
              </DetailBlock>
            ) : null}
          </div>
        </div>
      </Container>

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

      <MoreProjects
        title={p.moreProjects}
        previousLabel={p.morePrevious}
        nextLabel={p.moreNext}
        cards={others.map((o) => ({
          key: o.slug,
          card: (
            <ProjectCard
              project={toSummary(o)}
              href={localePath(locale, `/projects/${o.slug}`)}
              dict={dict}
              whatsapp={contact.whatsapp}
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 46vw, 85vw"
            />
          ),
        }))}
      />
    </>
  )
}

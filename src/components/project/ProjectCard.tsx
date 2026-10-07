// Project card. Rounded white card: main image (a 3D render with a transparent background) on a soft
// ground, status chip, name, location, apartment-type summary pills, "View details" and a WhatsApp button.
// No pricing. The "View details" link stretches over the whole card, so the card is one click target;
// the WhatsApp button sits above it. Image zooms to 1.02 on hover (spec §5).
// Note: the client chose this boxed design over the spec's open "no box, no shadow" card (spec §3.3).
import Image from 'next/image'
import Link from 'next/link'

import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import { fillTemplate, projectFacts, unitPills } from '@/lib/format'
import { whatsappHref } from '@/lib/contact-links'
import type { Dictionary } from '@/lib/i18n'
import type { ProjectSummary } from '@/lib/projects'

type ProjectCardProps = {
  project: ProjectSummary
  href: string
  dict: Pick<Dictionary, 'status' | 'facts' | 'card'>
  /** WhatsApp number for the "ask about this project" button. */
  whatsapp: string
  /** next/image `sizes` for the grid this card sits in. */
  sizes?: string
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({
  project,
  href,
  dict,
  whatsapp,
  sizes = '(min-width: 1320px) 400px, (min-width: 768px) 33vw, 100vw',
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  const facts = projectFacts(project, dict.facts)
  const pills = unitPills(project.unitTypes, dict.facts)
  const whatsappMessage = fillTemplate(dict.card.whatsappMessage, { name: project.title })

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-stone bg-surface p-3 shadow-card transition-[box-shadow,translate] duration-300 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative aspect-square overflow-hidden rounded-card-inner bg-render-ground">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={sizes}
          className="object-contain object-bottom px-[8%] pt-[7%] pb-[4%] transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.02]"
        />
        <StatusChip
          status={project.status}
          labels={dict.status}
          className="absolute top-3 left-3"
        />
      </div>

      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <Heading className="text-h3 decoration-2 underline-offset-4 group-hover:underline group-hover:decoration-amber">
          {project.title}
        </Heading>
        <p className="mt-1.5 flex items-center gap-1.5 text-small text-muted">
          <Icon name="pin" size={16} />
          {project.location}
        </p>

        {facts.length > 0 ? (
          <p className="mt-3 text-small text-ink tabular">
            {facts.map((fact, i) => (
              <span key={fact}>
                {i > 0 ? <span className="text-muted"> · </span> : null}
                <span className="whitespace-nowrap">{fact}</span>
              </span>
            ))}
          </p>
        ) : null}

        {pills.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {pills.map((pill) => (
              <li
                key={pill.icon}
                className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-canvas px-3 text-small text-ink tabular"
              >
                <Icon name={pill.icon} size={18} className="text-muted" />
                {pill.label}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto flex items-center gap-3 pt-6">
          <Link
            href={href}
            className="press inline-flex h-12 flex-1 items-center justify-center rounded-full bg-ink px-6 text-body font-semibold text-canvas transition-colors after:absolute after:inset-0 after:rounded-card hover:bg-ink/90"
          >
            {dict.card.viewDetails}
            <span className="sr-only">: {project.title}</span>
          </Link>
          <a
            href={whatsappHref(whatsapp, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fillTemplate(dict.card.askWhatsApp, { name: project.title })}
            className="press relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-stone bg-surface text-ink transition-colors hover:border-ink"
          >
            <Icon name="whatsapp" size={22} />
          </a>
        </div>
      </div>
    </article>
  )
}

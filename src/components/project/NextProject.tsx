// Link to the next project, at the bottom of the project page.
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'
import { StatusChip } from '@/components/ui/StatusChip'
import type { Dictionary } from '@/lib/i18n'
import type { ProjectSummary } from '@/lib/projects'

type NextProjectProps = {
  project: ProjectSummary
  href: string
  labels: Pick<Dictionary, 'project' | 'status'>
}

export function NextProject({ project, href, labels }: NextProjectProps) {
  return (
    <Container className="py-16 lg:py-24">
      <Link
        href={href}
        className="group flex items-center gap-5 rounded-card border border-stone bg-surface p-3 pr-6 shadow-card transition-[box-shadow,translate] duration-300 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-card-hover lg:gap-8 lg:pr-10"
      >
        <span className="relative block aspect-square w-24 shrink-0 overflow-hidden rounded-card-inner bg-render-ground md:w-36">
          <Image
            src={project.image}
            alt=""
            fill
            sizes="144px"
            className="object-contain object-bottom p-2"
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-small text-muted">{labels.project.nextProject}</span>
          <span className="mt-1 block text-h3 decoration-2 underline-offset-4 group-hover:underline group-hover:decoration-amber md:text-h2">
            {project.title}
          </span>
          <StatusChip status={project.status} labels={labels.status} className="mt-3" />
        </span>
        <Icon
          name="arrowRight"
          size={28}
          className="hidden transition-transform group-hover:translate-x-1 sm:block"
        />
      </Link>
    </Container>
  )
}

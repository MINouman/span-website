// Home section 2 (spec §4): three featured projects, ongoing first, and a link to all projects.
// Phones and tablets: a swipeable row of cards. Desktop: three columns.
import { Container } from '@/components/layout/Container'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { SpanLine } from '@/components/ui/SpanLine'
import { localePath, type Dictionary, type Locale } from '@/lib/i18n'
import type { ProjectSummary } from '@/lib/projects'

type FeaturedProjectsProps = {
  projects: ProjectSummary[]
  locale: Locale
  dict: Pick<Dictionary, 'featured' | 'status' | 'facts' | 'card'>
  whatsapp: string
}

export function FeaturedProjects({ projects, locale, dict, whatsapp }: FeaturedProjectsProps) {
  if (projects.length === 0) return null
  const allProjectsHref = localePath(locale, '/projects')

  return (
    <section aria-labelledby="featured-projects-title" className="section-y">
      <Container>
        <SpanLine />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4 lg:mt-10">
          <h2 id="featured-projects-title" className="text-h2">
            {dict.featured.title}
          </h2>
          {/* Wrapper carries the visibility: the button's own inline-flex would override `hidden`. */}
          <div className="hidden md:block">
            <ArrowButton href={allProjectsHref} onLight>
              {dict.featured.viewAll}
            </ArrowButton>
          </div>
        </div>

        {/* Below lg the list scrolls sideways edge to edge; vertical padding keeps card shadows unclipped. */}
        <ul className="-mx-[var(--gutter)] mt-6 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] py-4 [scrollbar-width:none] lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="w-[85%] max-w-[420px] shrink-0 snap-start sm:w-[46%] lg:w-auto lg:max-w-none"
            >
              <ProjectCard
                project={project}
                href={localePath(locale, `/projects/${project.slug}`)}
                dict={dict}
                whatsapp={whatsapp}
                sizes="(min-width: 1320px) 400px, (min-width: 1024px) 33vw, (min-width: 640px) 46vw, 85vw"
              />
            </li>
          ))}
        </ul>

        {/* Phones: the same button, centred under the cards. */}
        <div className="mt-8 flex justify-center md:hidden">
          <ArrowButton href={allProjectsHref} onLight>
            {dict.featured.viewAll}
          </ArrowButton>
        </div>
      </Container>
    </section>
  )
}

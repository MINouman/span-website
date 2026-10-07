// Projects list (spec §4 Projects): status tabs, then cards. 1 column on phones, 2 on tablets,
// 3 on desktop. Sorted ongoing first, then newest completed.
import type { Metadata } from 'next'

import { Container } from '@/components/layout/Container'
import { PageIntro } from '@/components/layout/PageIntro'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectTabs } from '@/components/project/ProjectTabs'
import { getDictionary, isLocale, localePath, type Locale } from '@/lib/i18n'
import { toSummary } from '@/lib/projects'
import { getAllProjects } from '@/lib/queries'
import { placeholderContact } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Residential buildings by SPAN in Aftabnagar, Dhaka: ongoing, completed and upcoming.',
}

type PageProps = { params: Promise<{ locale: string }> }

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : 'en'
  const dict = getDictionary(locale)
  const projects = await getAllProjects()

  const items = projects.map((project) => ({
    slug: project.slug,
    status: project.status,
    card: (
      <ProjectCard
        project={toSummary(project)}
        href={localePath(locale, `/projects/${project.slug}`)}
        dict={dict}
        whatsapp={placeholderContact.whatsapp}
        headingLevel="h2"
        sizes="(min-width: 1320px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
    ),
  }))

  return (
    <>
      <PageIntro title={dict.projects.title} lead={dict.projects.lead} />
      <Container className="pb-24 lg:pb-32">
        <ProjectTabs items={items} labels={dict} />
      </Container>
    </>
  )
}

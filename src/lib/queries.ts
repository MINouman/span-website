// Data fetchers for pages. They read placeholder data now; step 2 swaps the bodies for Payload
// queries (published projects only) without changing these signatures.
import { placeholderPartners, type Partner } from './placeholder-partners'
import { placeholderProjects } from './placeholder-projects'
import { sortProjects, type ProjectDetail } from './projects'

export async function getAllProjects(): Promise<ProjectDetail[]> {
  return sortProjects(placeholderProjects)
}

export async function getFeaturedProjects(count = 3): Promise<ProjectDetail[]> {
  return sortProjects(placeholderProjects.filter((p) => p.featured)).slice(0, count)
}

export async function getProjectBySlug(slug: string): Promise<ProjectDetail | null> {
  return placeholderProjects.find((p) => p.slug === slug) ?? null
}

/** The project after this one in list order, wrapping around to the first. */
export async function getNextProject(slug: string): Promise<ProjectDetail | null> {
  const all = await getAllProjects()
  if (all.length < 2) return null
  const index = all.findIndex((p) => p.slug === slug)
  return all[(index + 1) % all.length]
}

/** A partner listing with its project's title, ready to render. */
export type PartnerListing = Partner & { projectTitle: string }

/** Landowner partners who gave permission, joined to their project. Others are never returned. */
export async function getPermittedPartners(): Promise<PartnerListing[]> {
  return placeholderPartners
    .filter((partner) => partner.permissionGranted === true)
    .flatMap((partner) => {
      const project = placeholderProjects.find((p) => p.slug === partner.projectSlug)
      return project ? [{ ...partner, projectTitle: project.title }] : []
    })
}

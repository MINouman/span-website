// Project types and helpers shared by cards, lists and the project page.
// Data comes from src/lib/queries.ts (placeholder data now, the Payload Projects collection in step 2).
import type { StaticImageData } from 'next/image'

export type ProjectStatus = 'ongoing' | 'completed' | 'upcoming'

export type ImageSource =
  StaticImageData | { src: string; width: number; height: number; blurDataURL?: string }

/** One apartment type in a building, e.g. "Type A", set when the project is created. */
export type UnitType = {
  label: string
  sizeSqft: number
  bedrooms: number
  bathrooms: number
  balconies?: number
  /** How many apartments of this type the building has. */
  count?: number
  floorPlan?: ImageSource | null
}

/** The fields a project card needs. */
export type ProjectSummary = {
  slug: string
  title: string
  status: ProjectStatus
  /** Short address for cards, e.g. "Block C, Aftabnagar, Dhaka". */
  location: string
  handoverYear?: number | null
  totalUnits?: number | null
  floors?: number | null
  unitTypes: UnitType[]
  /** Main image: a 3D render with a transparent background (PNG or WebP with alpha). */
  image: ImageSource
  imageAlt: string
  featured?: boolean
  sortOrder?: number
}

export type GalleryCategory = 'exterior' | 'interior' | 'construction' | 'handover'
export const galleryCategories: GalleryCategory[] = [
  'exterior',
  'interior',
  'construction',
  'handover',
]

export type GalleryImage = {
  image: ImageSource
  alt: string
  caption?: string
  category: GalleryCategory
}

/** Icons available for facilities in the CMS. Each must exist in components/ui/Icon. */
export type FacilityIcon =
  'lift' | 'bolt' | 'car' | 'camera' | 'flame' | 'sun' | 'shield' | 'droplet' | 'building'

/** Everything the project page shows (spec §6 Projects collection). */
export type ProjectDetail = ProjectSummary & {
  addressLine: string
  coordinates?: { lat: number; lng: number } | null
  landAreaKatha?: number | null
  basements?: number | null
  /** Max 200 characters. */
  summary: string
  /** Paragraphs. Rich text in the CMS. */
  description: string[]
  facilities: { label: string; icon: FacilityIcon }[]
  gallery: GalleryImage[]
  /** e.g. structural engineer, rod brand, cement brand. */
  qualityDetails: { label: string; value: string }[]
  approvals: { name: string; reference?: string }[]
  /** Shown only for ongoing projects. `date` is ISO "YYYY-MM-DD". */
  constructionUpdates: { date: string; image?: ImageSource | null; note: string }[]
  brochureUrl?: string | null
  availabilityNote?: string | null
}

const statusRank: Record<ProjectStatus, number> = { ongoing: 0, completed: 1, upcoming: 2 }

/** Ongoing first, then newest completed, then upcoming (spec §4 Projects). */
export function sortProjects<
  T extends Pick<ProjectSummary, 'status' | 'handoverYear' | 'sortOrder'>,
>(projects: T[]): T[] {
  return [...projects].sort(
    (a, b) =>
      statusRank[a.status] - statusRank[b.status] ||
      (a.sortOrder ?? 0) - (b.sortOrder ?? 0) ||
      (b.handoverYear ?? 0) - (a.handoverYear ?? 0),
  )
}

/** Smallest and largest value across the apartment types, or null when there are none. */
export function unitRange(
  unitTypes: UnitType[],
  key: 'sizeSqft' | 'bedrooms' | 'bathrooms',
): { min: number; max: number } | null {
  if (unitTypes.length === 0) return null
  const values = unitTypes.map((u) => u[key])
  return { min: Math.min(...values), max: Math.max(...values) }
}

/** Card-sized subset of a project, so client components only receive what they render. */
export function toSummary(p: ProjectDetail): ProjectSummary {
  return {
    slug: p.slug,
    title: p.title,
    status: p.status,
    location: p.location,
    handoverYear: p.handoverYear,
    totalUnits: p.totalUnits,
    floors: p.floors,
    unitTypes: p.unitTypes,
    image: p.image,
    imageAlt: p.imageAlt,
    featured: p.featured,
    sortOrder: p.sortOrder,
  }
}

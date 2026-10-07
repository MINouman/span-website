// Project facts and apartment-type summaries for cards, with tabular-friendly number formatting.
import type { Dictionary } from '@/lib/i18n'
import { unitRange, type ProjectStatus, type UnitType } from '@/lib/projects'

type FactsInput = {
  status: ProjectStatus
  handoverYear?: number | null
  totalUnits?: number | null
  floors?: number | null
  unitTypes?: UnitType[]
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''))

/** "1,250" */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-US')
}

/** "3" when equal, "3–4" otherwise. */
export function formatRange(range: { min: number; max: number }): string {
  return range.min === range.max
    ? formatNumber(range.min)
    : `${formatNumber(range.min)}–${formatNumber(range.max)}`
}

/**
 * "3 apartment types · 10 floors · Expected handover 2027", built only from fields that are set.
 * Ongoing and upcoming projects say "Expected handover", since the date is not yet a fact.
 */
export function projectFacts(project: FactsInput, facts: Dictionary['facts']): string[] {
  const parts: string[] = []
  const types = project.unitTypes?.length ?? 0
  if (types === 1) parts.push(facts.oneType)
  else if (types > 1) parts.push(fill(facts.types, { n: types }))
  else if (project.totalUnits) parts.push(fill(facts.apartments, { n: project.totalUnits }))
  if (project.floors) parts.push(fill(facts.floors, { n: project.floors }))
  if (project.handoverYear) {
    const template = project.status === 'completed' ? facts.handover : facts.expectedHandover
    parts.push(fill(template, { year: project.handoverYear }))
  }
  return parts
}

export type UnitPill = { icon: 'bed' | 'bath' | 'area'; label: string }

/** Bedrooms, bathrooms and size across all apartment types, e.g. "3–4 Beds". */
export function unitPills(unitTypes: UnitType[], facts: Dictionary['facts']): UnitPill[] {
  const pills: UnitPill[] = []
  const beds = unitRange(unitTypes, 'bedrooms')
  const baths = unitRange(unitTypes, 'bathrooms')
  const size = unitRange(unitTypes, 'sizeSqft')
  if (beds) pills.push({ icon: 'bed', label: fill(facts.beds, { range: formatRange(beds) }) })
  if (baths) pills.push({ icon: 'bath', label: fill(facts.baths, { range: formatRange(baths) }) })
  if (size) pills.push({ icon: 'area', label: fill(facts.sqft, { range: formatRange(size) }) })
  return pills
}

export { fill as fillTemplate }

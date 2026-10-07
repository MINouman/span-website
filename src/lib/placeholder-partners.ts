// PLACEHOLDER landowner partners, used until the Partners collection exists (step 2).
// Spec §6: an entry may only appear when permissionGranted is true. Names here are stand-ins.
import type { ImageSource } from './projects'

export type Partner = {
  landownerName: string
  /** Slug of the project built on their land. */
  projectSlug: string
  photo?: ImageSource | null
  permissionGranted: boolean
  /** Optional factual one-liner. Not a testimonial. */
  note?: string | null
}

export const placeholderPartners: Partner[] = [
  {
    landownerName: '[CLIENT] Landowner name',
    projectSlug: 'sample-project-2',
    permissionGranted: true,
    note: '[CLIENT] Placeholder: plot of 6 katha, joint venture signed in 2021.',
  },
  {
    landownerName: '[CLIENT] Landowner name',
    projectSlug: 'sample-project-3',
    permissionGranted: true,
    note: '[CLIENT] Placeholder: family plot of 12 katha, handed over in 2022.',
  },
  {
    landownerName: '[CLIENT] Landowner name',
    projectSlug: 'sample-project-5',
    permissionGranted: true,
    note: null,
  },
  {
    // No permission: must never appear on the site. Kept to prove the filter works.
    landownerName: 'Hidden landowner (no permission)',
    projectSlug: 'sample-project-1',
    permissionGranted: false,
  },
]

// PLACEHOLDER business partners (suppliers and consultants) for the Home "Our partners" grid.
// [CLIENT] to supply real partner names and logos, with permission to show each logo.
// Logos: SVG or transparent PNG. Any colour works; the grid shows them in white on the dark section.
import type { ImageSource } from './projects'

export type Supplier = {
  name: string
  logo?: ImageSource | null
  /** Partner's website, opened in a new tab. */
  url?: string | null
}

export const placeholderSuppliers: Supplier[] = [
  { name: '[CLIENT] Steel supplier' },
  { name: '[CLIENT] Cement supplier' },
  { name: '[CLIENT] Lift supplier' },
  { name: '[CLIENT] Generator supplier' },
  { name: '[CLIENT] Tiles supplier' },
  { name: '[CLIENT] Sanitary fittings' },
  { name: '[CLIENT] Paint supplier' },
  { name: '[CLIENT] Electrical supplier' },
  { name: '[CLIENT] Architect' },
  { name: '[CLIENT] Structural consultant' },
]

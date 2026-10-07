// Media: required localized alt text. Step 2 adds focal point sizes, AVIF/WebP, 15 MB limit and R2 (spec §6).
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Describe what the photo shows, for people who cannot see it.' },
    },
  ],
  upload: true,
}

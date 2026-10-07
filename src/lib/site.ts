// PLACEHOLDER contact details used by the layout shell until the SiteSettings global exists (step 2).
// Every value here is fake and marked [CLIENT]. Do not ship any of it.

export type SiteContact = {
  phone: string
  phoneDisplay: string
  whatsapp: string
  email: string
  addressLines: string[]
  /** Office location for the map. */
  coordinates: { lat: number; lng: number } | null
  /** e.g. "Saturday to Thursday, 10am to 6pm". */
  officeHours: string
  mapUrl: string | null
  facebookUrl: string | null
  youtubeUrl: string | null
}

export const placeholderContact: SiteContact = {
  phone: '+8800000000000',
  phoneDisplay: '+880 [CLIENT] phone',
  whatsapp: '+8800000000000',
  email: 'hello@example.com',
  addressLines: ['[CLIENT] Office address line 1', 'Aftabnagar, Dhaka'],
  // [CLIENT] Approximate Aftabnagar centre until the real office pin is supplied.
  coordinates: { lat: 23.7685, lng: 90.4365 },
  officeHours: '[CLIENT] Office hours',
  mapUrl: null,
  facebookUrl: null,
  youtubeUrl: null,
}

export const companyName = 'SPAN'
export const companyLegalName = 'SPAN Engineering and Construction Ltd.'

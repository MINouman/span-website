// PLACEHOLDER Home content, used until the HomePage global exists (step 2).
// Spec §4: each quality pillar must be backed by real specifics from the client (named engineer,
// material brands, tests done). Everything marked [CLIENT] is a stand-in. Do not ship it.
import type { IconName } from '@/components/ui/Icon'

export type QualityPillarData = {
  icon: IconName
  title: string
  /** Two short lines of proof. */
  proof: string
}

export const placeholderQualityPillars: QualityPillarData[] = [
  {
    icon: 'columns',
    title: 'Structure',
    proof:
      '[CLIENT] Designed by [engineer name, registration no.] to [BNBC 2020]. Soil test on every plot before design starts.',
  },
  {
    icon: 'bricks',
    title: 'Materials',
    proof:
      '[CLIENT] [Rod brand and grade] and [cement brand] only. Concrete samples tested at [lab name] for every slab.',
  },
  {
    icon: 'shieldCheck',
    title: 'Safety and approvals',
    proof:
      '[CLIENT] Building plan approved by [authority] before work begins. Fire exits and [safety features] in every building.',
  },
  {
    icon: 'key',
    title: 'Timely handover',
    proof:
      '[CLIENT] [N] of our [N] projects handed over on or before the agreed date. Handover date written into every contract.',
  },
]

export type ProcessStep = { title: string; text: string }

// Joint-venture process for the Home landowner section and the landowner page.
// [CLIENT] to confirm the wording. No profit-sharing ratios or timelines unless the client supplies them.
export const placeholderLandownerSteps: ProcessStep[] = [
  {
    title: 'Talk to us',
    text: 'Tell us where your land is. We visit the plot and look at the ownership documents with you.',
  },
  {
    title: 'Agree the terms',
    text: 'Your share of the apartments and the handover date are written into a registered agreement.',
  },
  {
    title: 'We build',
    text: 'We handle design, approvals and construction, and keep you updated as each floor goes up.',
  },
  {
    title: 'Handover',
    text: 'You receive your apartments, finished and ready to live in or sell.',
  },
]

// ---------- Company introduction (after the hero) ----------

// [CLIENT] One or two sentences introducing the company. No hype words (spec §1).
export const placeholderIntroLead =
  '[CLIENT] SPAN Engineering and Construction Ltd. has built homes in Aftabnagar, Dhaka, since [YYYY]. Every project is designed, approved and built by our own team.'

export type Founder = {
  name: string
  role: string
  photo?: import('./projects').ImageSource | null
  /** Transparent PNG or SVG of the signature, dark ink on transparent. */
  signature?: import('./projects').ImageSource | null
}

export const placeholderFounder: Founder = {
  name: '[CLIENT] Founder name',
  role: '[CLIENT] Founder and Managing Director',
  photo: null,
  signature: null,
}

export type Belief = { title: string; text: string }

// [CLIENT] to confirm these are SPAN's own principles in SPAN's own words before launch.
export const placeholderBeliefs: Belief[] = [
  {
    title: 'A handover date is a promise.',
    text: 'We set dates we can keep and write them into every agreement. Buyers and landowners plan their lives around them, so we plan our work around them.',
  },
  {
    title: 'Build it as if we were moving in.',
    text: 'Every structural decision is checked by an engineer and made for the decades the building will stand, not for the brochure.',
  },
  {
    title: 'Landowners are partners.',
    text: 'People who trust us with their land get clear terms, regular updates and apartments finished to the same standard as every other home in the building.',
  },
]

// PLACEHOLDER content for the For landowners and About pages, used until the LandownerPage and
// AboutPage globals exist (step 2). Everything marked [CLIENT] must come from the client.
// Spec: never invent numbers, names, approvals or testimonials; no profit-sharing ratios.

// ---------- For landowners ----------

export type DocumentItem = { title: string; note?: string }

// Common land documents in Bangladesh. [CLIENT] to confirm the exact list SPAN asks for.
export const placeholderLandownerDocuments: DocumentItem[] = [
  { title: 'Title deed (dolil)', note: 'The registered deed showing your ownership.' },
  { title: 'Mutation (namjari) and DCR', note: 'Shows the land is recorded in your name.' },
  { title: 'Khatian records', note: 'CS, SA, RS and city survey records, as available.' },
  { title: 'Land tax receipts', note: 'Recent receipts showing tax is paid.' },
  { title: 'Plot map or layout', note: 'Any sketch or approved layout of the plot.' },
  { title: 'National ID of each owner', note: 'For every co-owner or heir.' },
]

export const placeholderLegalNote =
  '[CLIENT] Placeholder: how SPAN checks title, who prepares the agreement, and that the agreement is registered before work begins.'

export type TimelinePhase = { title: string; duration: string; text: string }

// [CLIENT] durations. Do not publish timelines the client has not confirmed.
export const placeholderTimeline: TimelinePhase[] = [
  {
    title: 'Agreement',
    duration: '[CLIENT] weeks',
    text: 'Document check and registered agreement.',
  },
  {
    title: 'Design and approvals',
    duration: '[CLIENT] months',
    text: 'Soil test, design and building plan approval.',
  },
  {
    title: 'Construction',
    duration: '[CLIENT] months',
    text: 'Foundation to finishing, with regular updates.',
  },
  {
    title: 'Handover',
    duration: '[CLIENT] date in agreement',
    text: 'Your apartments handed over with all papers.',
  },
]

export type Faq = { question: string; answer: string }

export const placeholderLandownerFaqs: Faq[] = [
  {
    question: 'What share of the apartments will I receive?',
    answer:
      '[CLIENT] Placeholder answer. The share depends on the plot and is agreed with you before signing. It is written into the registered agreement.',
  },
  {
    question: 'Who pays for design, approvals and construction?',
    answer: '[CLIENT] Placeholder answer.',
  },
  {
    question: 'Do I get a place to stay during construction?',
    answer: '[CLIENT] Placeholder answer.',
  },
  {
    question: 'What happens if handover is late?',
    answer: '[CLIENT] Placeholder answer.',
  },
  {
    question: 'Can I choose which apartments are mine?',
    answer: '[CLIENT] Placeholder answer.',
  },
]

// ---------- About ----------

export const placeholderStory = [
  '[CLIENT] Placeholder story. When and why SPAN started, and who started it.',
  '[CLIENT] How the company has grown: the first project, the projects since, all in Aftabnagar.',
  '[CLIENT] What the company plans next, including working outside Bangladesh, in plain words.',
]

export type KeyNumber = { value: string; label: string }

// SiteSettings.keyNumbers in step 2. All real, all editable. Placeholders until supplied.
export const placeholderKeyNumbers: KeyNumber[] = [
  { value: '[N]', label: 'Projects delivered' },
  { value: '[YYYY]', label: 'Building since' },
  { value: '[N]', label: 'Families housed' },
  { value: '[N]', label: 'Square feet built' },
]

export const placeholderQualityStatement =
  '[CLIENT] Placeholder quality statement: one or two sentences on what SPAN will not compromise on.'

export type Leader = { name: string; role: string; note?: string; photo?: null }

export const placeholderLeadership: Leader[] = [
  {
    name: '[CLIENT] Name',
    role: 'Managing Director',
    note: '[CLIENT] One or two lines of background.',
  },
  {
    name: '[CLIENT] Name',
    role: 'Director, Engineering',
    note: '[CLIENT] One or two lines of background.',
  },
  {
    name: '[CLIENT] Name',
    role: 'Director, Operations',
    note: '[CLIENT] One or two lines of background.',
  },
]

export type Membership = { name: string; reference?: string }

// Only list what the company actually holds (spec §4 About). Leave empty to hide the section.
export const placeholderMemberships: Membership[] = [
  { name: '[CLIENT] Trade licence', reference: '[CLIENT] Number' },
  { name: '[CLIENT] Industry association membership', reference: '[CLIENT] Member no.' },
]

export const placeholderAftabnagarNote =
  '[CLIENT] Placeholder: a short note on why SPAN builds only in Aftabnagar. Knowing the soil, the blocks, the roads and the neighbours means fewer surprises on site.'

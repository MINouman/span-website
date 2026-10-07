// PLACEHOLDER project data, used until the Projects collection exists (step 2).
// Every name, number, image and text below is fake or marked [CLIENT]. Do not ship any of it.
import exterior1 from '../../assets/images/home/hero.jpg'
import exterior2 from '../../assets/images/home/hero1.jpg'
import exterior3 from '../../assets/images/home/hero2.jpg'
import exterior4 from '../../assets/images/home/hero3.jpg'
import floorPlan from '../../assets/images/projects/_placeholders/floor-plan.png'
import sample1 from '../../assets/images/projects/sample-project-1/main.png'
import sample2 from '../../assets/images/projects/sample-project-2/main.png'
import sample3 from '../../assets/images/projects/sample-project-3/main.png'
import sample4 from '../../assets/images/projects/sample-project-4/main.png'
import sample5 from '../../assets/images/projects/sample-project-5/main.png'

import type { GalleryImage, ProjectDetail, UnitType } from './projects'

// Aftabnagar, Dhaka (approximate area centre).
const AFTABNAGAR = { lat: 23.7685, lng: 90.4365 }

const description = [
  '[CLIENT] Placeholder description. A short paragraph about the building: where it stands, who it is for and what makes it practical to live in.',
  '[CLIENT] A second paragraph about construction: the structural system, the engineer responsible, the materials used and the tests carried out.',
  '[CLIENT] A third paragraph about the neighbourhood: schools, markets, mosques and transport within walking distance of the site.',
]

const facilities: ProjectDetail['facilities'] = [
  { label: 'Passenger lift', icon: 'lift' },
  { label: 'Standby generator', icon: 'bolt' },
  { label: 'Car parking', icon: 'car' },
  { label: 'CCTV', icon: 'camera' },
  { label: 'Gas connection', icon: 'flame' },
  { label: 'Rooftop garden', icon: 'sun' },
  { label: '24-hour security', icon: 'shield' },
  { label: 'Water reservoir', icon: 'droplet' },
]

const gallery: GalleryImage[] = [
  {
    image: exterior1,
    alt: 'Placeholder photo: tower with white fins',
    caption: 'Placeholder exterior photo',
    category: 'exterior',
  },
  {
    image: exterior2,
    alt: 'Placeholder photo: brick building with balconies',
    caption: 'Placeholder exterior photo',
    category: 'exterior',
  },
  {
    image: exterior3,
    alt: 'Placeholder photo: cream and terracotta block',
    caption: 'Placeholder construction photo',
    category: 'construction',
  },
  {
    image: exterior4,
    alt: 'Placeholder photo: two towers at sunset',
    caption: 'Placeholder handover photo',
    category: 'handover',
  },
  {
    image: exterior2,
    alt: 'Placeholder photo: brick building detail',
    caption: 'Placeholder exterior photo',
    category: 'exterior',
  },
  {
    image: exterior1,
    alt: 'Placeholder photo: tower facade detail',
    caption: 'Placeholder construction photo',
    category: 'construction',
  },
]

const qualityDetails: ProjectDetail['qualityDetails'] = [
  { label: 'Structural engineer', value: '[CLIENT] Name and registration number' },
  { label: 'Design code', value: '[CLIENT] e.g. BNBC 2020' },
  { label: 'Steel (rod)', value: '[CLIENT] Brand and grade' },
  { label: 'Cement', value: '[CLIENT] Brand and type' },
  { label: 'Soil test', value: '[CLIENT] Done by, date' },
]

const approvals: ProjectDetail['approvals'] = [
  { name: '[CLIENT] Building plan approval', reference: '[CLIENT] Reference no.' },
]

const types = (list: Omit<UnitType, 'floorPlan'>[]): UnitType[] =>
  list.map((t) => ({ ...t, floorPlan }))

export const placeholderProjects: ProjectDetail[] = [
  {
    slug: 'sample-project-1',
    title: 'Sample project 1',
    status: 'ongoing',
    location: 'Block C, Aftabnagar, Dhaka',
    addressLine: '[CLIENT] House, Road, Block C, Aftabnagar, Dhaka',
    coordinates: AFTABNAGAR,
    handoverYear: 2027,
    totalUnits: 27,
    floors: 10,
    basements: 1,
    landAreaKatha: 10,
    unitTypes: types([
      { label: 'Type A', sizeSqft: 1250, bedrooms: 3, bathrooms: 2, balconies: 2, count: 9 },
      { label: 'Type B', sizeSqft: 1450, bedrooms: 3, bathrooms: 3, balconies: 2, count: 9 },
      { label: 'Type C', sizeSqft: 1650, bedrooms: 4, bathrooms: 3, balconies: 3, count: 9 },
    ]),
    image: sample1,
    imageAlt: 'Placeholder 3D view of a ten-storey residential building',
    featured: true,
    summary:
      '[CLIENT] Placeholder summary. A ten-storey residential building with three apartment types, on a ten-katha plot in Block C.',
    description,
    facilities,
    gallery,
    qualityDetails,
    approvals,
    constructionUpdates: [
      {
        date: '2026-08-15',
        image: exterior3,
        note: '[CLIENT] Placeholder update: roof slab of the eighth floor cast.',
      },
      {
        date: '2026-05-10',
        image: exterior1,
        note: '[CLIENT] Placeholder update: brickwork complete up to the fifth floor.',
      },
      {
        date: '2026-02-01',
        image: null,
        note: '[CLIENT] Placeholder update: foundation and basement complete.',
      },
    ],
    availabilityNote: '[CLIENT] Placeholder: a few Type B apartments are still available.',
  },
  {
    slug: 'sample-project-2',
    title: 'Sample project 2',
    status: 'completed',
    location: 'Block F, Aftabnagar, Dhaka',
    addressLine: '[CLIENT] House, Road, Block F, Aftabnagar, Dhaka',
    coordinates: { lat: 23.7702, lng: 90.4398 },
    handoverYear: 2024,
    totalUnits: 16,
    floors: 9,
    basements: 0,
    landAreaKatha: 6,
    unitTypes: types([
      { label: 'Type A', sizeSqft: 1100, bedrooms: 2, bathrooms: 2, balconies: 1, count: 8 },
      { label: 'Type B', sizeSqft: 1320, bedrooms: 3, bathrooms: 2, balconies: 2, count: 8 },
    ]),
    image: sample2,
    imageAlt: 'Placeholder 3D view of a nine-storey brick residential building',
    featured: true,
    summary:
      '[CLIENT] Placeholder summary. A nine-storey building with two apartment types, handed over in 2024.',
    description,
    facilities: facilities.slice(0, 6),
    gallery,
    qualityDetails,
    approvals,
    constructionUpdates: [],
  },
  {
    slug: 'sample-project-3',
    title: 'Sample project 3',
    status: 'completed',
    location: 'Block A, Aftabnagar, Dhaka',
    addressLine: '[CLIENT] House, Road, Block A, Aftabnagar, Dhaka',
    coordinates: { lat: 23.7668, lng: 90.4331 },
    handoverYear: 2022,
    totalUnits: 28,
    floors: 8,
    basements: 1,
    landAreaKatha: 12,
    unitTypes: types([
      { label: 'Type A', sizeSqft: 1200, bedrooms: 3, bathrooms: 2, balconies: 2, count: 7 },
      { label: 'Type B', sizeSqft: 1380, bedrooms: 3, bathrooms: 3, balconies: 2, count: 7 },
      { label: 'Type C', sizeSqft: 1550, bedrooms: 4, bathrooms: 3, balconies: 3, count: 7 },
      { label: 'Type D', sizeSqft: 1800, bedrooms: 4, bathrooms: 4, balconies: 3, count: 7 },
    ]),
    image: sample3,
    imageAlt: 'Placeholder 3D view of an eight-storey residential building',
    featured: true,
    summary:
      '[CLIENT] Placeholder summary. An eight-storey building with four apartment types, handed over in 2022.',
    description,
    facilities,
    gallery,
    qualityDetails,
    approvals,
    constructionUpdates: [],
  },
  {
    slug: 'sample-project-4',
    title: 'Sample project 4',
    status: 'upcoming',
    location: 'Block D, Aftabnagar, Dhaka',
    addressLine: '[CLIENT] House, Road, Block D, Aftabnagar, Dhaka',
    coordinates: { lat: 23.7721, lng: 90.4352 },
    handoverYear: 2029,
    totalUnits: 22,
    floors: 12,
    basements: 2,
    landAreaKatha: 8,
    unitTypes: types([
      { label: 'Type A', sizeSqft: 1350, bedrooms: 3, bathrooms: 3, balconies: 2, count: 11 },
      { label: 'Type B', sizeSqft: 1700, bedrooms: 4, bathrooms: 3, balconies: 3, count: 11 },
    ]),
    image: sample4,
    imageAlt: 'Placeholder 3D view of a twelve-storey residential building',
    summary:
      '[CLIENT] Placeholder summary. A twelve-storey building planned for Block D. Design and approvals in progress.',
    description,
    facilities,
    gallery: gallery.filter((g) => g.category === 'exterior'),
    qualityDetails,
    approvals: [],
    constructionUpdates: [],
  },
  {
    slug: 'sample-project-5',
    title: 'Sample project 5',
    status: 'completed',
    location: 'Block B, Aftabnagar, Dhaka',
    addressLine: '[CLIENT] House, Road, Block B, Aftabnagar, Dhaka',
    coordinates: { lat: 23.7659, lng: 90.4384 },
    handoverYear: 2020,
    totalUnits: 12,
    floors: 7,
    basements: 0,
    landAreaKatha: 5,
    unitTypes: types([
      { label: 'Type A', sizeSqft: 1150, bedrooms: 3, bathrooms: 2, balconies: 2, count: 12 },
    ]),
    image: sample5,
    imageAlt: 'Placeholder 3D view of a seven-storey residential building',
    summary:
      '[CLIENT] Placeholder summary. A seven-storey building with one apartment type, handed over in 2020.',
    description,
    facilities: facilities.slice(0, 5),
    gallery,
    qualityDetails,
    approvals,
    constructionUpdates: [],
  },
]

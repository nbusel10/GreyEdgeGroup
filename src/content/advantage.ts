import { site } from './images'

/**
 * "The Collaborative Advantage", reworked per the Aug 5 review.
 *
 * The section has to sell the end-to-end engagement while still showing newcomers the
 * full depth. It leads with lessons rather than services: a menu invites piecemeal
 * shopping, a body of hard-won knowledge invites trust. Each lesson carries the
 * capability that answers it, so a reader can place GreyEdge in their own org chart
 * without the page reading as an a-la-carte list.
 */

/** The line Matt keeps coming back to. Opens the section. */
export const anchorQuote =
  'We paid our dues in the field years ago, and our clients benefit from that hard-earned wisdom on every project.'

export const partnerBriefBody =
  'We bring together the expertise required to move Thermal Energy Networks from vision to reality. Through strategic planning, technical leadership, funding support, stakeholder coordination, and project execution, we provide the continuity needed to advance projects efficiently from early concept through long-term operation.'

export interface Lesson {
  /** Short picker label. */
  short: string
  lesson: string
  detail: string
  /** The role GreyEdge plays when this comes up. */
  capability: string
  image: string
  imageAlt: string
}

export const lessons: Lesson[] = [
  {
    short: 'The seams',
    lesson: 'Projects rarely fail in engineering. They fail in the gaps between the people doing it.',
    detail:
      'A design team, a drilling contractor, and a mechanical contractor can each do competent work and still hand you a system that underperforms. Someone has to own the seams.',
    capability: 'Master planning and owner’s representation',
    image: site['approach-planning-session'].src,
    imageAlt: site['approach-planning-session'].alt,
  },
  {
    short: 'Early decisions',
    lesson: 'The most expensive decisions get made before anyone opens a drawing.',
    detail:
      'Ownership structure, phasing, and which resources you plan around are set early and quietly. By the time they show up in construction cost, they are no longer decisions.',
    capability: 'Feasibility and resource studies',
    image: site.blueprints.src,
    imageAlt: site.blueprints.alt,
  },
  {
    short: 'Right-sizing',
    lesson: 'A system sized for today’s load becomes tomorrow’s bottleneck.',
    detail:
      'Right-sizing is not the same as building small. Loop architecture and borefield capacity can leave room for phase two without paying for phase two now.',
    capability: 'Thermal engineering and energy modeling',
    image: site['campus-build'].src,
    imageAlt: site['campus-build'].alt,
  },
  {
    short: 'Verification',
    lesson: 'What gets built matches what got designed only when someone stays to verify it.',
    detail:
      'Sequences get value-engineered, setpoints get changed during startup, and controls get left in hand-off mode. Verification is where design intent either survives or quietly disappears.',
    capability: 'Commissioning and performance validation',
    image: site['thermal-plant-inspection'].src,
    imageAlt: site['thermal-plant-inspection'].alt,
  },
  {
    short: 'Existing assets',
    lesson: 'Existing infrastructure is usually an asset that was written off too early.',
    detail:
      'Cooling towers, boilers, and utility tunnels are often treated as things to remove. Frequently they are the cheapest capacity on the site.',
    capability: 'Third-party review and forensic analysis',
    image: site['approach-existing-assets'].src,
    imageAlt: site['approach-existing-assets'].alt,
  },
]

export interface ServiceGroup {
  short: string
  title: string
  image: string
  imageAlt: string
  items: string[]
}

/** Services grouped for the Approach photo-card layout. */
export const serviceGroups: ServiceGroup[] = [
  {
    short: 'Planning',
    title: 'Planning & studies',
    image: site['service-planning'].src,
    imageAlt: site['service-planning'].alt,
    items: [
      'Thermal utility master planning',
      'Feasibility and resource studies',
      'Building and portfolio energy modeling',
    ],
  },
  {
    short: 'Resources',
    title: 'Ground & resources',
    image: site['service-ground'].src,
    imageAlt: site['service-ground'].alt,
    items: ['Hydrogeology and subsurface analysis', 'Drilling and geoexchange design'],
  },
  {
    short: 'Networks',
    title: 'Network design',
    image: site['service-network'].src,
    imageAlt: site['service-network'].alt,
    items: ['Thermal network engineering', 'Ambient temperature loop design'],
  },
  {
    short: 'Delivery',
    title: 'Delivery & verification',
    image: site['service-delivery'].src,
    imageAlt: site['service-delivery'].alt,
    items: ['Construction and constructability coordination', 'Commissioning and performance validation'],
  },
  {
    short: 'Advisory',
    title: 'Advisory & stewardship',
    image: site['service-advisory'].src,
    imageAlt: site['service-advisory'].alt,
    items: [
      'Third-party and peer review',
      'Owner’s representation',
      'Subject-matter expertise and expert testimony',
      'Long-term optimization and expansion planning',
    ],
  },
]

/** Flat capability list, derived from the grouped services. */
export const capabilities: string[] = serviceGroups.flatMap((g) => g.items)

export const capabilityNote =
  'Every project is different. We can lead from concept through completion or provide focused expertise where it\u2019s needed most, helping you overcome obstacles and maintain momentum.'

export interface Stat {
  value: number
  /** Rendered after the counted number, e.g. "+" or "K". */
  suffix?: string
  prefix?: string
  label: string
  /** Shown when the raw number needs context. */
  note?: string
}

export const stats: Stat[] = [
  { value: 1000, suffix: '+', label: 'Geothermal projects' },
  { value: 15, label: 'Thermal network specialists' },
  { value: 300, suffix: '+', label: 'Years of combined experience' },
  { value: 80000, label: 'Tons of installed capacity' },
]

/**
 * Megan's two doors: education alongside consultation, at equal weight. Education gets
 * a foot in the door with readers who are not ready to be sold to.
 */
export const doors = {
  intro: 'Not sure yet whether this applies to your project?',
  education: {
    label: 'Learn how these systems work',
    detail: 'Start with the fundamentals. No meeting required.',
    cta: 'Read Geothermal 101',
    to: '/geothermal-101',
  },
  consultation: {
    label: 'Talk through your project',
    detail: 'Bring what you have and we will tell you what we see.',
    cta: 'Get in touch',
    to: '/contact',
  },
}

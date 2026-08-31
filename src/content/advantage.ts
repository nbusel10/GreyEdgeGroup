import { site } from './images'

/**
 * "The Advantage of Experience", reworked per the Aug 5 review.
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
  'We bring together the expertise required to move Thermal Energy Networks from vision to reality. Through strategic planning, technical leadership, governance facilitation, stakeholder coordination, and project execution, we provide the continuity needed to advance projects efficiently from early concept through long-term operation.'

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
    short: 'Risk mitigation',
    lesson: 'Technical viability is not enough if governance is unsettled.',
    detail:
      'Projects risk non-performance, overruns, over-complication, and weak stakeholder and offtaker integration. We gather, refine, and vet the facts to describe technical potential and cut risk. Then we convene the right people around the three pillars—who pays, who owns, who operates—and help choose the fit. Many projects stall after they prove technically viable because those three stay undefined.',
    capability: 'Phases 01–02 Feasibility Study—concept through design, engineering, and procurement',
    image: site.blueprints.src,
    imageAlt: site.blueprints.alt,
  },
  {
    short: 'Leverage existing assets',
    lesson: 'Existing infrastructure is usually an asset that was written off too early.',
    detail:
      'Cooling towers, boilers, and utility tunnels are often treated as things to remove. Frequently they are the cheapest capacity on the site.',
    capability: 'Third-party review and forensic analysis',
    image: site['approach-existing-assets'].src,
    imageAlt: site['approach-existing-assets'].alt,
  },
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
    short: 'Right-sizing',
    lesson: 'Over-engineered safety factors make systems too expensive—and impractical to build.',
    detail:
      'Right-sizing is a design-execution risk under real-world budget constraints. We design systems that perform without stacking engineering safety factors until the project can no longer be built or funded. Work within the budget, make it work, and do not over-engineer—if you know the rules that hold the system up, and when safety factors are actually needed.',
    capability: 'Lean design and engineering—Phase 02 Design',
    image: site['campus-build'].src,
    imageAlt: site['campus-build'].alt,
  },
  {
    short: 'Performance realized',
    lesson: 'Verification is the difference between a good idea and a system that delivers.',
    detail:
      'When the rubber meets the road, verification, commissioning, and performance validation turn design promises into operating results. Without them, a strong design stays an idea. With them, the system delivers what was promised.',
    capability: 'Retro-commissioning and resource integration',
    image: site['thermal-plant-inspection'].src,
    imageAlt: site['thermal-plant-inspection'].alt,
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
    short: 'Assess',
    title: 'Phase 1 Feasibility Study',
    image: site['service-planning'].src,
    imageAlt: site['service-planning'].alt,
    items: [
      'Overall Program Planning',
      'Hydrogeologic Assessments',
      'Energy Modeling',
    ],
  },
  {
    short: 'Define',
    title: 'Phase 2 Feasibility Study',
    image: site['service-ground'].src,
    imageAlt: site['service-ground'].alt,
    items: [
      'Governance Structure Facilitations',
      'Best Technology Assessment',
      'Identifying and Optimizing Sink / Source / Storage Opportunities',
      'Risk Reduction Management',
    ],
  },
  {
    short: 'Refine',
    title: 'Retro-Commissioning',
    image: site['service-delivery'].src,
    imageAlt: site['service-delivery'].alt,
    items: [
      'System Commissioning',
      'System Performance Optimization',
      'System Control Optimization',
      'System Emissions Reduction',
    ],
  },
  {
    short: 'Design',
    title: 'Design',
    image: site['service-network'].src,
    imageAlt: site['service-network'].alt,
    items: [
      'Ambient Temperature Loop System Design',
      'HVAC System Design',
      'Best Value Design Trade-Offs',
    ],
  },
  {
    short: 'Guide',
    title: 'Ongoing Partnership',
    image: site['service-advisory'].src,
    imageAlt: site['service-advisory'].alt,
    items: ['Technology Upgrade Planning', 'System Technical Training'],
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

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

export interface Lesson {
  lesson: string
  detail: string
  /** The role GreyEdge plays when this comes up. */
  capability: string
}

export const lessons: Lesson[] = [
  {
    lesson: 'Projects rarely fail in engineering. They fail in the gaps between the people doing it.',
    detail:
      'A design team, a drilling contractor, and a mechanical contractor can each do competent work and still hand you a system that underperforms. Someone has to own the seams.',
    capability: 'Master planning and owner’s representation',
  },
  {
    lesson: 'The most expensive decisions get made before anyone opens a drawing.',
    detail:
      'Ownership structure, phasing, and which resources you plan around are set early and quietly. By the time they show up in construction cost, they are no longer decisions.',
    capability: 'Feasibility and resource studies',
  },
  {
    lesson: 'A system sized for today’s load becomes tomorrow’s bottleneck.',
    detail:
      'Right-sizing is not the same as building small. Loop architecture and borefield capacity can leave room for phase two without paying for phase two now.',
    capability: 'Thermal engineering and energy modeling',
  },
  {
    lesson: 'What gets built matches what got designed only when someone stays to verify it.',
    detail:
      'Sequences get value-engineered, setpoints get changed during startup, and controls get left in hand-off mode. Verification is where design intent either survives or quietly disappears.',
    capability: 'Commissioning and performance validation',
  },
  {
    lesson: 'Existing infrastructure is usually an asset that was written off too early.',
    detail:
      'Cooling towers, boilers, and utility tunnels are often treated as things to remove. Frequently they are the cheapest capacity on the site.',
    capability: 'Third-party review and forensic analysis',
  },
]

/**
 * The full capability set, deliberately presented as one continuous list rather than a
 * grid of service cards. Joe was explicit in the review that he did not want these
 * "chopped up into little blocks."
 */
export const capabilities: string[] = [
  'Thermal utility master planning',
  'Feasibility and resource studies',
  'Building and portfolio energy modeling',
  'Hydrogeology and subsurface analysis',
  'Thermal network engineering',
  'Ambient temperature loop design',
  'Drilling and geoexchange design',
  'Construction and constructability coordination',
  'Commissioning and performance validation',
  'Third-party and peer review',
  'Owner’s representation',
  'Subject-matter expertise and expert testimony',
  'Long-term optimization and expansion planning',
]

export const capabilityNote =
  'One team, one accountability. Engage us across the whole arc, or bring us in where the gap is.'

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
  { value: 22, label: 'Thermal network specialists' },
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
    detail: 'Start with the fundamentals — no meeting required.',
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

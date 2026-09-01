/**
 * "The Process" — five phases from feasibility through ongoing partnership.
 *
 * Every phase is a valid place to start, with a line on what we do with work
 * already completed by others so prospects do not assume they must begin over.
 */

export interface Phase {
  /** Anchor id for in-page links from Built on Experience. */
  id: string
  /** Matching service card in Our Services. */
  serviceId: string
  num: string
  title: string
  subtitle: string
  description: string
  /** What we do when a client arrives at this phase with work already in hand. */
  entry: string
}

export const intro =
  'Every Thermal Energy Network project follows a different path, but successful outcomes are built on the same foundation: thoughtful planning, informed decision-making, and experienced execution. Our process brings these elements together, helping clients move from vision to implementation with clarity and confidence.'

export const phases: Phase[] = [
  {
    id: 'phase-1-feasibility-study',
    serviceId: 'service-assess',
    num: '01',
    title: 'Phase 1 Feasibility Study',
    subtitle: 'Assess',
    description:
      'Every project begins with understanding the opportunity. During this phase, we identify thermal resources, evaluate site conditions, perform energy modeling, and establish the technical foundation needed to determine whether a Thermal Energy Network is viable. The focus is on feasibility, resource evaluation, and reducing risk before significant investments are made.',
    entry:
      'Already have preliminary studies or site data? We will review and build upon existing information rather than repeat work. Incorporating previous investigations is often the fastest and most cost-effective way to move a project forward.',
  },
  {
    id: 'phase-2-feasibility-study',
    serviceId: 'service-define',
    num: '02',
    title: 'Phase 2 Feasibility Study',
    subtitle: 'Define',
    description:
      'Once the opportunity is understood, the focus shifts to refinement and validation. This phase includes deeper technical investigation, stakeholder engagement, governance discussions, technology assessment, and additional data collection to verify assumptions and define the most promising path forward.',
    entry:
      "Already have a feasibility study? We will validate it and build from it rather than start over. A second set of eyes on someone else's analysis is often some of the most valuable and cost-effective work performed on a project.",
  },
  {
    id: 'retro-commissioning',
    serviceId: 'service-refine',
    num: '03',
    title: 'Retro-Commissioning',
    subtitle: 'Refine',
    description:
      'Many projects already have infrastructure, equipment, or thermal assets in place that can create value. This phase focuses on evaluating existing systems, verifying performance, identifying operational improvements, and uncovering opportunities to leverage existing investments within a future Thermal Energy Network strategy.',
    entry:
      'Already operating geothermal equipment or district energy infrastructure? We can assess what is working, identify what can be improved, and determine how existing assets can support future network development.',
  },
  {
    id: 'design',
    serviceId: 'service-design',
    num: '04',
    title: 'Design',
    subtitle: 'Design',
    description:
      'By the time a project reaches design, major decisions should already be supported by technical analysis, stakeholder alignment, and validated data. This phase transforms those findings into right-sized system designs that integrate geothermal resources, building systems, controls, and district infrastructure into a coordinated solution.',
    entry:
      'Already have engineers or designers on your team? We regularly collaborate with existing project teams, providing geothermal and Thermal Energy Network expertise where it adds the most value without disrupting project momentum.',
  },
  {
    id: 'ongoing-partnership',
    serviceId: 'service-guide',
    num: '05',
    title: 'Ongoing Partnership',
    subtitle: 'Guide',
    description:
      'Thermal Energy Networks are long-term infrastructure investments. After implementation, our role often shifts toward commissioning, performance validation, owner\'s representation, operational support, technology planning, and ongoing optimization to ensure the system continues delivering value over time.',
    entry:
      'Already have a functioning network? We can serve as a long-term advisor, helping operators optimize performance, evaluate expansion opportunities, and adapt to changing technologies while protecting the original investment.',
  },
]

/**
 * Megan's request: they can pull us in at any step; earlier is better.
 * Footnote under the Process intro — not a separate callout.
 */
export const anyPhaseNote =
  'While many clients engage us at the beginning, we can add value at any stage of the journey. Whether you’re exploring an opportunity, pursuing funding, navigating permitting, or building on work already completed, we’ll meet you where you are and help move your project forward.'

/**
 * "The Process", reworked per the Aug 5 review.
 *
 * The four phases stay — they carry the end-to-end story Matt wants to own. What changed
 * is that the section previously read as a mandatory four-step gate, which is the thing
 * Joe warned about: a prospect holding a feasibility study from another firm concludes
 * they would have to start over, and leaves. Every phase is now labeled as a valid place
 * to start, with a line on what we do with work already completed by others.
 */

export interface Phase {
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
    num: '01',
    title: 'Evaluate',
    subtitle: 'Building and resource value analysis',
    description:
      'We evaluate site conditions, utility interconnection, load requirements, available thermal resources, and financial viability, establishing a clear foundation before a single dollar is committed to design.',
    entry:
      'Already have a feasibility study? We will validate it and build from it rather than start over. A second set of eyes on someone else’s analysis is often the cheapest work on a project.',
  },
  {
    num: '02',
    title: 'Design',
    subtitle: 'Lean and scalable engineering',
    description:
      'Our engineers develop right-sized systems built for performance today and expansion tomorrow: loop architecture, borefield layout, and hydronic design sized to close, not to impress.',
    entry:
      'Design already underway? We review what exists, flag the decisions that will be expensive to reverse, and work alongside your current team rather than replacing it.',
  },
  {
    num: '03',
    title: 'Execution',
    subtitle: 'Promise and delivery',
    description:
      'We work alongside contractors to verify that every technical component is present, properly implemented, and functioning as intended, validating that real-world controls and performance match the design intent before final handoff.',
    entry:
      'Mid-construction and something feels wrong? This is the most common point at which we are called in, and it is still early enough to protect the outcome.',
  },
  {
    num: '04',
    title: 'Evolve',
    subtitle: 'Long-term partnership and expansion',
    description:
      'The relationship does not end at ribbon-cutting. We monitor, optimize, and plan your next expansion, adapting the system as your operations and the energy landscape change.',
    entry:
      'Inherited a system that underperforms? We diagnose what it is actually doing, then map what it would take to fix or extend it.',
  },
]

/**
 * Megan's request: they can pull us in at any step; earlier is better.
 * Footnote under the Process intro — not a separate callout.
 */
export const anyPhaseNote =
  'While many clients engage us at the beginning, we can add value at any stage of the journey. Whether you’re exploring an opportunity, pursuing funding, navigating permitting, or building on work already completed, we’ll meet you where you are and help move your project forward.'

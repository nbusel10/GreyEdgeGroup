import { site } from './images'

export interface InsightSection {
  heading?: string
  paragraphs: string[]
}

export interface Insight {
  slug: string
  category: 'Technical Education' | 'Case Study' | 'Industry and Policy'
  level: 'Foundational' | 'Applied' | 'Strategic'
  title: string
  summary: string
  image: string
  imageAlt: string
  /** Card destination — article route when `body` exists, otherwise an existing page. */
  to: string
  /** Honest label: "N min read" only when `body` exists; else Primer / Approach. */
  readTime: string
  /** Long-form article body. Omit for cards that deep-link elsewhere. */
  body?: InsightSection[]
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export const insightCategories = ['All', 'Technical Education', 'Case Study', 'Industry and Policy'] as const
export type InsightCategoryFilter = (typeof insightCategories)[number]

/**
 * Insights with a `body` open at /insights/:slug. Others deep-link to existing pages
 * (e.g. G101 primer) until long-form is written. Do not retell G101 sections here.
 * Case Study is reserved for narrative writeups — none published yet (projects live under /projects).
 */
export const insights: Insight[] = [
  {
    slug: 'thermal-highway',
    category: 'Technical Education',
    level: 'Foundational',
    title: 'Understanding the Thermal Highway©',
    summary:
      'How a district-scale network moves usable energy between buildings, sources, and storage, and why sharing a loop beats sizing every building on its own.',
    image: site['network-diagram'].src,
    imageAlt: site['network-diagram'].alt,
    to: '/geothermal-101#thermal-highway',
    readTime: 'Primer',
  },
  {
    slug: 'peak-demand',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Why electrification doesn’t have to mean a grid upgrade',
    summary:
      'Load diversity, thermal storage, and ambient loops can flatten peak electrical demand enough to avoid the utility upgrade entirely.',
    image: site.electrification.src,
    imageAlt: site.electrification.alt,
    to: '/insights/peak-demand',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Electrifying heating and cooling can significantly increase peak electrical demand, straining utility infrastructure and creating costly capacity upgrades. Organizations must balance electrification goals against grid limitations, reliability requirements, and compliance mandates.',
          'The usual assumption is that every ton of heating you remove from gas shows up as a new kilowatt on the electrical service. That is true when each building is sized for its own worst hour. It is not true when buildings share a thermal network.',
        ],
      },
      {
        heading: 'Peaks rarely align',
        paragraphs: [
          'An office rejecting heat in the afternoon and residences needing heat in the evening are, on a shared loop, solving each other’s problem. Loads across a campus or district rarely peak at the same moment. That diversity means the network installs far less total capacity than the sum of the individual buildings would need standing alone, and peak electrical demand can be far lower than a building-by-building conversion would require.',
          'The outcome we design toward is lower peak demand, a smaller utility interconnection, and grid upgrades deferred or avoided altogether.',
        ],
      },
      {
        heading: 'How the demand curve flattens',
        paragraphs: [
          'We design high-efficiency thermal energy systems that reduce peak electrical demand while supporting long-term electrification goals. Through load diversity, thermal storage, ambient-temperature loops, and multiple thermal energy sources, clients can electrify at a pace that aligns with their site, budget, and growth plans.',
          'Thermal storage acts as a balancing account: heat rejected when it is abundant is available when it is scarce. Multiple sources (ground, wastewater, process heat, and more) keep the network from leaning on electric resistance or oversized plant at the worst hour.',
          'For the shared vocabulary behind how those loops move energy, start with Geothermal 101. This piece is about the electrical consequence: electrification without treating a utility upgrade as inevitable.',
        ],
      },
      {
        heading: 'What to ask before you size the service',
        paragraphs: [
          'Before you accept a feeder upgrade as the price of decarbonization, ask whether buildings can share a thermal backbone, whether diversity and storage have been modelled against the true coincident peak, and whether existing thermal resources on site have been counted at all.',
          'Those questions change the interconnection conversation. They are also where most projects either lock in unnecessary capital, or free it.',
        ],
      },
    ],
  },
  {
    slug: 'governance-first',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'Why projects fail before construction starts',
    summary:
      'The gap between engineering competence and project execution is rarely technical. It’s ownership, phasing, and who is accountable when the disciplines disagree.',
    image: site.blueprints.src,
    imageAlt: site.blueprints.alt,
    to: '/insights/governance-first',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Most thermal energy network projects that stall never reach a mechanical room. They stall in the months when ownership is fuzzy, phasing is deferred, and each discipline assumes someone else owns the seams.',
          'A design team, a drilling contractor, and a mechanical contractor can each do competent work and still hand you a system that underperforms. The failure is not usually a missing calculation. It is the gap between the people doing the work.',
        ],
      },
      {
        heading: 'The expensive decisions happen before drawings',
        paragraphs: [
          'Ownership structure, who pays for shared infrastructure, which thermal resources you plan around, and how phases hand off to one another are set early and quietly. By the time they show up as line items in a construction budget, they are no longer decisions. They are constraints.',
          'Teams that treat those questions as “later” issues discover that later means redesign, change orders, or a network that cannot expand without starting over. Governance is not bureaucracy layered on engineering. It is the condition that makes engineering land.',
        ],
      },
      {
        heading: 'Accountability beats a perfect org chart',
        paragraphs: [
          'Campus and district projects often assemble a relay race: planner to designer to contractor to commissioning agent, each optimized for their own scope. When loads, loop temperatures, or constructability disagree, there is no single party obligated to resolve the conflict against performance, only against schedule and fee.',
          'What works is one accountable partner for the seams: master planning that sets the rules, owner’s representation that keeps design intent intact through procurement, and verification that confirms what got built still matches what was modelled. Without that, competent pieces still produce an underperforming whole.',
        ],
      },
      {
        heading: 'What to settle before you hire the next consultant',
        paragraphs: [
          'Before the next RFP goes out, ask who owns the thermal backbone across phases, who decides when disciplines disagree, how expansion capacity is reserved without overbuilding phase one, and who stays through startup to defend setpoints and sequences.',
          'Those answers determine whether the project fails in the conference room, or survives long enough to fail, or succeed, in the field. Most of the damage we see was locked in before anyone poured a foundation.',
        ],
      },
    ],
  },
  {
    slug: 'lifecycle-cost',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'First cost is the wrong question',
    summary:
      'Why lifecycle modelling changes which system you choose, and how to build a business case a capital committee will actually approve.',
    image: site['lifecycle-cost'].src,
    imageAlt: site['lifecycle-cost'].alt,
    to: '/insights/lifecycle-cost',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Capital committees are trained to compare bid prices. Thermal infrastructure is trained to outlast the people who approve it. When those two frames collide, the low first-cost option often wins, and then spends decades collecting operating cost, maintenance, and premature replacement.',
          'The right question is not “what is cheapest to build?” It is “what delivers the greatest long-term value under the loads, rates, and growth we actually expect?”',
        ],
      },
      {
        heading: 'What first cost hides',
        paragraphs: [
          'A conventional plant can look inexpensive until you count peak electrical demand charges, boiler and chiller replacements, cooling-tower water and chemicals, and the utility upgrade that electrification without diversity eventually triggers. A shared thermal network can look expensive until you count avoided capacity, reused existing assets, and the ability to add buildings without rebuilding the backbone.',
          'Without a long-term strategy, organizations risk overbuilding, funding unnecessary utility upgrades, or locking in low first-cost solutions that become expensive to operate. The spreadsheet that only shows year-zero capital is not conservative. It is incomplete.',
        ],
      },
      {
        heading: 'One financial strategy, not three budgets',
        paragraphs: [
          'We evaluate first cost, operating performance, maintenance requirements, phasing, and future capacity as one integrated financial strategy. Right-sized, scalable design directs capital toward the pieces that move the lifecycle number, not toward the pieces that look cheapest in isolation.',
          'Phasing matters as much as equipment. Paying for phase-two borefield capacity you do not need yet is waste. Leaving no room in the loop architecture for phase two is a larger waste deferred. Lifecycle modelling makes those tradeoffs visible before the capital vote, not after the change order.',
        ],
      },
      {
        heading: 'What a capital committee needs to see',
        paragraphs: [
          'A business case that survives scrutiny shows coincident peaks rather than summed peaks, operating cost under realistic rates, maintenance and replacement over the asset life, and a clear path to add load or sources without stranding what you build now.',
          'When those pieces sit in one model, the “expensive” network often pencils, and the cheap plant stops looking cheap. That is the conversation capital allocators can actually approve: thermal infrastructure designed to perform for decades, not to win a bid day.',
        ],
      },
    ],
  },
]

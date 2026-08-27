import { site } from './images'

export interface Challenge {
  label: string
  short: string
  problem: string
  approach: string
  outcome: string
  image: string
  imageAlt: string
}

/**
 * "The Barriers" from the current site. Problem and approach copy is carried over
 * close to verbatim; the outcome line is new, so each pressure resolves rather than
 * just being described.
 */
export const challenges: Challenge[] = [
  {
    label: 'Decarbonization and Compliance',
    short: 'Decarbonization',
    problem:
      'Organizations face growing pressure to reduce emissions, meet evolving energy codes, and comply with ambitious climate mandates, often while working within aging infrastructure, limited electrical capacity, and strict capital budgets.',
    approach:
      'We develop practical, phased decarbonization strategies that align regulatory requirements with long-term operational and financial goals. By evaluating existing infrastructure, available thermal resources, future growth, and utility constraints, we design scalable thermal energy solutions that reduce emissions and avoid unnecessary overbuilding.',
    outcome: 'A clear, phased path to compliance with defined decision points and cost clarity before construction begins.',
    image: site.decarbonization.src,
    imageAlt: site.decarbonization.alt,
  },
  {
    label: 'Electrification & Infrastructure Constraints',
    short: 'Electrification',
    problem:
      'Electrifying heating and cooling can significantly increase peak electrical demand, straining utility infrastructure and driving costly capacity upgrades. At the same time, aging mechanical systems, limited utility capacity, congested sites, and outdated distribution infrastructure restrict expansion and make modernization expensive. Organizations must balance electrification goals against grid limits, reliability needs, and the real constraints of the sites they already operate.',
    approach:
      'We design high-efficiency thermal energy systems that reduce peak electrical demand while supporting long-term electrification goals. Through load diversity, thermal storage, ambient temperature loops, and multiple thermal energy sources, we help clients electrify at a pace that fits their site, budget, and growth plans. We also evaluate the full energy ecosystem to reuse, optimize, or expand existing infrastructure, connecting buildings and adding capacity where it delivers the greatest value.',
    outcome: 'Lower peak demand, deferred grid upgrades, and projects that move forward by reusing constrained infrastructure.',
    image: site.electrification.src,
    imageAlt: site.electrification.alt,
  },
  {
    label: 'Infrastructure Resiliency',
    short: 'Resiliency',
    problem:
      'When heating or cooling your space is not an option, systems that depend on remote supply, exposed plant, or climate-sensitive resources leave you vulnerable. Comfort and operations cannot hinge on fragile delivery chains or infrastructure that is easy to disrupt.',
    approach:
      'Thermal Energy Networks use less energy overall, draw on local resources, and keep critical infrastructure buried. We design TENs that are locally resourced, not subject to the whims of the climate, and safer from tampering, so heating and cooling stay available when conventional systems cannot.',
    outcome: 'Locally rooted thermal service that stays online when conventional systems fail.',
    image: site.infrastructure.src,
    imageAlt:
      'Urban district streetscape with buried utility corridors beneath patterned stone paving between commercial buildings, representing locally rooted, protected thermal infrastructure.',
  },
  {
    label: 'Capital and Lifecycle Cost Control',
    short: 'Cost Control',
    problem:
      'Energy infrastructure decisions must balance immediate capital constraints against decades of operating, maintenance, and replacement costs. Without a long-term strategy, organizations risk overbuilding, investing in unnecessary utility upgrades, or choosing low first-cost solutions that become expensive to operate.',
    approach:
      'We evaluate first cost, operating performance, maintenance requirements, phasing, and future capacity as one integrated financial strategy. Through detailed modeling and right-sized, scalable design, we direct capital toward the solutions that deliver the greatest long-term value.',
    outcome: 'Thermal infrastructure designed to pencil, with a business case capital allocators can actually approve.',
    image: site['lifecycle-cost'].src,
    imageAlt: site['lifecycle-cost'].alt,
  },
  {
    label: 'Long-Term Growth and Flexibility',
    short: 'Growth',
    problem:
      'Energy systems are often designed around today’s needs, making future expansion costly or technically difficult. As campuses grow, change ownership, add buildings, or adopt new energy sources, inflexible infrastructure limits options and forces premature replacement.',
    approach:
      'We plan thermal infrastructure as a scalable platform rather than a fixed one-time solution. Through phased development, modular capacity, interconnected systems, and the ability to add thermal sources over time, we help clients expand at their own pace.',
    outcome: 'Infrastructure that grows with you: adding buildings, resources, and load without starting over.',
    image: site['growth-flexibility'].src,
    imageAlt: site['growth-flexibility'].alt,
  },
]

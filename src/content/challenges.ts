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
    label: 'Electrification Without Grid Overload',
    short: 'Electrification',
    problem:
      'Electrifying heating and cooling can significantly increase peak electrical demand, straining utility infrastructure and creating costly capacity upgrades. Organizations must balance electrification goals against grid limitations, reliability requirements, and compliance mandates.',
    approach:
      'We design high-efficiency thermal energy systems that reduce peak electrical demand while supporting long-term electrification goals. Through load diversity, thermal storage, ambient-temperature loops, and multiple thermal energy sources, we help clients electrify at a pace that aligns with their site, budget, and growth plans.',
    outcome: 'Lower peak demand, a smaller utility interconnection, and grid upgrades deferred or avoided altogether.',
    image: site.electrification.src,
    imageAlt: site.electrification.alt,
  },
  {
    label: 'Infrastructure and Grid Constraints',
    short: 'Infrastructure',
    problem:
      'Aging mechanical systems, limited utility capacity, congested sites, and outdated distribution infrastructure can restrict expansion and make modernization costly. Campuses must often support new buildings and higher energy demands without the capacity to accommodate them.',
    approach:
      'We evaluate the entire energy ecosystem to identify where existing infrastructure can be reused, optimized, or expanded. We develop phased thermal utility strategies that connect buildings, diversify energy sources, and add capacity where it delivers the greatest value.',
    outcome: 'Projects that move forward despite real constraints, reusing assets that were written off too early.',
    image: site.infrastructure.src,
    imageAlt: site.infrastructure.alt,
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

import { site } from './images'

export interface Insight {
  slug: string
  category: 'Technical Education' | 'Case Study' | 'Industry and Policy'
  level: 'Foundational' | 'Applied' | 'Strategic'
  title: string
  summary: string
  image: string
  imageAlt: string
  /** Internal destination while long-form articles are still being written. */
  to: string
  readTime: string
}

/**
 * Insights currently point at existing pages rather than long-form articles. Megan noted
 * in the review that there are more articles in her spreadsheet to fold in; those become
 * entries here as they're written.
 */
export const insights: Insight[] = [
  {
    slug: 'thermal-highway',
    category: 'Technical Education',
    level: 'Foundational',
    title: 'Understanding the Thermal Highway',
    summary:
      'How a district-scale network moves usable energy between buildings, sources, and storage — and why sharing a loop beats sizing every building on its own.',
    image: site['network-diagram'].src,
    imageAlt: site['network-diagram'].alt,
    to: '/geothermal-101#thermal-highway',
    readTime: '6 min read',
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
    to: '/geothermal-101#ambient-loops',
    readTime: '5 min read',
  },
  {
    slug: 'weber-state',
    category: 'Case Study',
    level: 'Applied',
    title: 'Weber State University: campus-scale geothermal',
    summary:
      'Converting a traditional campus district energy system into a multi-source Thermal Energy Network across 31 buildings and 3.2 million square feet.',
    image: site['campus-build'].src,
    imageAlt: site['campus-build'].alt,
    to: '/projects/weber-state-university',
    readTime: 'Project',
  },
  {
    slug: 'governance-first',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'Why projects fail before construction starts',
    summary:
      'The gap between engineering competence and project execution is rarely technical. It’s ownership, phasing, and who is accountable when the disciplines disagree.',
    image: site['panel-discussion'].src,
    imageAlt: site['panel-discussion'].alt,
    to: '/approach',
    readTime: '7 min read',
  },
  {
    slug: 'colorado-mesa',
    category: 'Case Study',
    level: 'Applied',
    title: 'Colorado Mesa University: 19 buildings, one network',
    summary:
      'A master-scale transformation using the patented Thermal Highway© architecture to integrate a whole campus into a single cohesive network.',
    image: site['global-projects'].src,
    imageAlt: site['global-projects'].alt,
    to: '/projects/colorado-mesa',
    readTime: 'Project',
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
    to: '/approach#capabilities',
    readTime: '6 min read',
  },
]

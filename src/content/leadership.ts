/**
 * Industry Leadership.
 *
 * Home uses Matt’s preferred line as a teaser. About uses a distinct headline
 * so the full credits block doesn’t clone the homepage.
 *
 * The advisory credits are the ones Megan named in the review. They are attributed as
 * member-led work because several were contracted to individual members rather than to
 * GreyEdge — Megan and Joe both confirmed that framing is accurate, since GreyEdge is
 * its members. These also counter the perception that the firm only works in Colorado
 * and Utah, which Joe raised.
 */

/** Home teaser — Matt’s preferred line. */
export const teaserHeadline = {
  lead: 'We don’t just work in this industry.',
  accent: 'Many members of our team helped build it.',
}

/** Stable anchor ids for Industry Leadership rows (Home teaser links deep-link here). */
export const industryIds = {
  nyserda: 'industry-nyserda',
  heet: 'industry-heet',
  igshpa: 'industry-igshpa',
  ashrae: 'industry-ashrae',
  certification: 'industry-certification',
  atl: 'industry-atl',
  research: 'industry-research',
} as const

/** Short org labels for the Home teaser proof strip (from real credits). */
export const teaserProof = [
  { id: industryIds.ashrae, label: 'ASHRAE' },
  { id: industryIds.igshpa, label: 'IGSHPA' },
  { id: industryIds.nyserda, label: 'NYSERDA' },
  { id: industryIds.heet, label: 'Heet' },
]

/** About full section — restates leadership without repeating the Home line. */
export const aboutHeadline = {
  lead: 'The people who wrote the playbook',
  accent: 'still show up on the project.',
}

export const intro =
  "We don't just work in thermal energy, we've helped shape the industry. Our team has contributed to the development of modern geothermal standards, authored training programs behind leading certifications, and continues to educate the next generation of professionals. When communities, utilities, and policymakers need trusted expertise, they turn to the people who helped build the foundation."
export interface Credit {
  id: string
  title: string
  detail: string
  /** Who or what the work was for. */
  org: string
}

export const credits: Credit[] = [
  {
    id: industryIds.nyserda,
    title: 'Resource-efficient decarbonization framework',
    org: 'NYSERDA, New York',
    detail:
      'Our members shaped the framework New York uses to evaluate resource-efficient decarbonization at scale.',
  },
  {
    id: industryIds.heet,
    title: 'Heet',
    org: 'Massachusetts',
    detail:
      'Selected as one of twelve firms supporting the Commonwealth’s thermal energy network kickstart program.',
  },
  {
    id: industryIds.igshpa,
    title: 'Geothermal design standard',
    org: 'IGSHPA',
    detail:
      'Our members contributed to the geothermal design standard and certification programs IGSHPA maintains for the industry, including work on CSA/ANSI C448 and the training behind Certified Geo Designer and related credentials.',
  },
  {
    id: industryIds.ashrae,
    title: 'Geothermal heat pump standards leadership',
    org: 'ASHRAE',
    detail:
      'Cary Smith and Stephen Hamstra have served as chairs of ASHRAE Technical Committee 6.8, Geothermal Heat Pumps and Energy Recovery Applications, the committee that guides geothermal heat pump and energy recovery standards practice.',
  },
  {
    id: industryIds.certification,
    title: 'Certification and training programs',
    org: 'Industry-wide',
    detail:
      'Authored the training programs behind key industry certifications, and still teach them.',
  },
  {
    id: industryIds.atl,
    title: 'Ambient temperature loop practice',
    org: 'Thermal Highway©',
    detail:
      'Developed and proved the one-pipe ambient loop approach, with more than fifteen years of operating data behind it.',
  },
  {
    id: industryIds.research,
    title: 'Applied geothermal research',
    org: 'University partnerships',
    detail:
      'Ongoing thermal conductivity and diffusivity testing innovation, in partnership with university research programs.',
  },
]

/** Countering the regional perception, stated plainly. */
export const reach =
  'Our work reaches well beyond Colorado and Utah, including thermal energy network advisory work on the East Coast, and feasibility studies that are driving state-level policy decisions.'

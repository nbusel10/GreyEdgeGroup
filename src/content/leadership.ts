/**
 * Industry Leadership.
 *
 * Headline is the second sentence Matt likes, moved up from the team page.
 *
 * The advisory credits are the ones Megan named in the review. They are attributed as
 * member-led work because several were contracted to individual members rather than to
 * GreyEdge — Megan and Joe both confirmed that framing is accurate, since GreyEdge is
 * its members. These also counter the perception that the firm only works in Colorado
 * and Utah, which Joe raised.
 */

export const headline = 'We don’t just work in this industry. Many members of our team helped build it.'

export const intro =
  "We don't just work in thermal energy, we've helped shape the industry. Our team has contributed to the development of modern geothermal standards, authored training programs behind leading certifications, and continues to educate the next generation of professionals. When communities, utilities, and policymakers need trusted expertise, they turn to the people who helped build the foundation."
export interface Credit {
  title: string
  detail: string
  /** Who or what the work was for. */
  org: string
}

export const credits: Credit[] = [
  {
    title: 'Resource-efficient decarbonization framework',
    org: 'NYSERDA, New York',
    detail:
      'Our members shaped the framework New York uses to evaluate resource-efficient decarbonization at scale.',
  },
  {
    title: 'Heet',
    org: 'Massachusetts',
    detail:
      'Selected as one of twelve firms supporting the Commonwealth’s thermal energy network kickstart program.',
  },
  {
    title: 'Geothermal design standards',
    org: 'ASHRAE and IGSHPA',
    detail:
      'Contributions to every major geothermal design standard in use in North America today.',
  },
  {
    title: 'Certification and training programs',
    org: 'Industry-wide',
    detail:
      'Authored the training programs behind key industry certifications, and still teach them.',
  },
  {
    title: 'Ambient temperature loop practice',
    org: 'Thermal Highway©',
    detail:
      'Developed and proved the one-pipe ambient loop approach, with more than fifteen years of operating data behind it.',
  },
  {
    title: 'Applied geothermal research',
    org: 'University partnerships',
    detail:
      'Ongoing thermal conductivity and diffusivity testing innovation, in partnership with university research programs.',
  },
]

/** Countering the regional perception, stated plainly. */
export const reach =
  'Our work reaches well beyond Colorado and Utah, including thermal energy network advisory work on the East Coast, and feasibility studies that are driving state-level policy decisions.'

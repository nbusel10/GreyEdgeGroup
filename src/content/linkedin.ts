import { site } from './images'

/**
 * Curated LinkedIn posts for the homepage carousel.
 *
 * Update this list when you publish on the company page:
 * 1. Open the post → “…” → Copy link to post
 * 2. Paste url, a short title, excerpt, and optional image below
 * 3. Keep newest first
 *
 * Later: swap `linkedInPosts` for a Netlify function that calls LinkedIn’s
 * Community Management API (`r_organization_social`). See docs/linkedin-api-setup.md.
 */
export interface LinkedInPost {
  id: string
  /** ISO date or datetime for sorting and card date */
  publishedAt: string
  title: string
  excerpt: string
  /** Full LinkedIn post permalink */
  url: string
  image: string
  imageAlt: string
}

export const linkedInPosts: LinkedInPost[] = [
  {
    id: 'activity-7503586165325795328',
    publishedAt: '2026-09-09T22:52:31.701Z',
    title: "Aspen School District sees 'groundbreaking' success with 1,000 foot geo bore",
    excerpt:
      "We're looking forward to the next phase of work in Aspen, Colorado, in partnership with the Aspen School District. Our team will conduct an Advanced Thermal Response Test to gather the data needed to right-size the geothermal field. We're excited to keep this important project moving forward.",
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7503586165325795328',
    image: '/images/projects/aspen.webp',
    imageAlt:
      'Vibrant summer landscape of the Maroon Bells mountains near Aspen, Colorado, featuring snow-capped peaks, a clear turquoise alpine lake, a lush green meadow filled with yellow wildflowers, and a bright blue sky with fluffy white clouds.',
  },
  {
    id: 'activity-7503584430788141056',
    publishedAt: '2026-09-09T22:45:38.155Z',
    title: 'Ambition, affordability and the nexus of climate change politics',
    excerpt:
      'CEO Matt Garlick on balancing clean, sustainable environments with town budgets and voter priorities — ambition, affordability, and climate politics in one frame.',
    url: 'https://www.linkedin.com/feed/update/urn:li:activity:7503584430788141056',
    image: site['insight-finance'].src,
    imageAlt: site['insight-finance'].alt,
  },
  {
    id: 'activity-7490893623400529920',
    publishedAt: '2026-08-05',
    title: 'Park City test borehole completed in Rocky Mountain geology',
    excerpt:
      'Another successful test borehole completed in the challenging drilling conditions of the Rocky Mountains. Our study for Park City Municipal Corporation is showing that local resources, including geoexchange, can be the basis for cost-effective district heating and cooling.',
    url: 'https://www.linkedin.com/posts/matt-garlick-ccp-cem-bemp-585a2833_another-successful-test-borehole-completed-activity-7490893623400529920-xwGd',
    image: '/images/projects/park-city/gallery/drill-rig-side.jpg',
    imageAlt:
      'Drill crew and a red truck-mounted drilling rig at a Park City work site, with green mountain slopes and a clear blue sky behind a roadside fence.',
  },
  {
    id: 'activity-7450652859827765248',
    publishedAt: '2026-04-16',
    title: 'GreyEdge work with Colorado GETCO grant awardees',
    excerpt:
      'The GreyEdge Group is excited to be working with several awardees of the Colorado Energy Office Geothermal Energy Tax Credit Offering (GETCO) grants. If we can do it at 9,000\' and in mountain geology we can do this anywhere. Congrats Town of Vail, Aspen School District, Town of Hayden, and our partners at McKinstry.',
    url: 'https://www.linkedin.com/posts/matt-garlick-ccp-cem-bemp-585a2833_polis-administration-awards-124-million-activity-7450652859827765248-WM9d',
    image: site['insight-colorado-policy'].src,
    imageAlt: site['insight-colorado-policy'].alt,
  },
  {
    id: 'activity-7447331999729750016',
    publishedAt: '2026-04-07',
    title: 'Breckenridge is drilling a test borehole',
    excerpt:
      'Breckenridge is drilling a test borehole. With the Advanced Thermal Response Test by Garen Ewbank and Rick Clemenzi, that gives us the thermal properties of the ground and the drilling conditions onsite — the two pieces needed to right-size the geoexchange system.',
    url: 'https://www.linkedin.com/posts/matt-garlick-ccp-cem-bemp-585a2833_breckenridge-is-drilling-a-test-borehole-activity-7447331999729750016-_sCZ',
    image: '/images/projects/breckenridge.jpeg',
    imageAlt:
      'Aerial autumn view of Breckenridge, Colorado, with the town nestled in a valley among yellow aspens and evergreen forests, lodge-style buildings and a parking lot in the midground, and layered mountain peaks under a bright sky.',
  },
  {
    id: 'activity-7440104242889199616',
    publishedAt: '2026-03-18',
    title: 'TENs as a value proposition for mountain towns',
    excerpt:
      'TENs offer a special value proposition for mountain towns. Isolated communities are more at risk for utility disruptions; local thermal resources and higher efficiency deliver resilience that is both cost-effective and carbon-reducing.',
    url: 'https://www.linkedin.com/posts/matt-garlick-ccp-cem-bemp-585a2833_harnessing-the-heat-beneath-our-feet-how-activity-7440104242889199616-QJix',
    image: site['insight-mountain-town'].src,
    imageAlt: site['insight-mountain-town'].alt,
  },
]

/** Homepage carousel shows curated posts newest first. */
export function getLatestLinkedInPosts(count?: number): LinkedInPost[] {
  const sorted = [...linkedInPosts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  return count ? sorted.slice(0, count) : sorted
}

export function formatLinkedInDate(isoDate: string): string {
  const d = isoDate.includes('T') ? new Date(isoDate) : new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

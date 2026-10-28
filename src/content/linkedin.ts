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
    id: 'activity-7517887428989227009',
    publishedAt: '2026-10-19T10:00:38.664Z',
    title: 'Lexington evaluated geothermal and an Ambient Temperature Loop',
    excerpt:
      'See how Lexington evaluated geothermal infrastructure and Ambient Temperature Loop technology as a pathway for long-term community decarbonization.',
    url: 'https://www.linkedin.com/posts/grey-edge_see-how-lexington-evaluated-geothermal-infrastructure-activity-7517887428989227009-3K2u',
    image: '/images/projects/lexington.jpg',
    imageAlt:
      'Aerial autumn view of Lexington Battle Green in Lexington, Massachusetts, showing the historic common, white First Parish steeple, surrounding New England homes, and vibrant fall foliage under a clear blue sky.',
  },
  {
    id: 'activity-7517223346367787008',
    publishedAt: '2026-10-17T14:01:49.029Z',
    title: 'Steamboat Springs is planning a renewable district energy network',
    excerpt:
      'Explore how renewable energy resources and innovative district planning could help power the future of one of Colorado’s premier mountain destinations.',
    url: 'https://www.linkedin.com/posts/grey-edge_explore-how-renewable-energy-resources-and-activity-7517223346367787008-op6Z',
    image: '/images/projects/steamboat-springs.webp',
    imageAlt:
      'A mountain town at the base of snow‑covered ski slopes in Steamboat Springs, Colorado, showing residential and resort buildings surrounded by green hills and peaks.',
  },
  {
    id: 'activity-7516845689604071424',
    publishedAt: '2026-10-16T13:01:08.640Z',
    title: 'Carbondale is building a replicable zero-energy district',
    excerpt:
      'Learn how a small mountain community is creating a replicable model for sustainable district energy and community-scale decarbonization.',
    url: 'https://www.linkedin.com/posts/grey-edge_learn-how-a-small-mountain-community-is-creating-activity-7516845689604071424-YYRG',
    image: '/images/projects/32-zed-zero-energy-district.webp',
    imageAlt: '32 ZED Project Site Picture',
  },
  {
    id: 'activity-7516452880082534400',
    publishedAt: '2026-10-15T11:00:15.552Z',
    title: 'Vail is reimagining one of the nation’s largest snowmelt systems',
    excerpt:
      'Discover how Vail is reimagining one of the nation’s largest snowmelt systems through innovative district energy planning that reduces emissions, improves resilience, and creates a roadmap for future growth.',
    url: 'https://www.linkedin.com/posts/grey-edge_discover-how-vail-is-reimagining-one-of-the-activity-7516452880082534400-l31s',
    image: '/images/projects/vail.webp',
    imageAlt:
      'Aerial view of Vail, Colorado, showing alpine‑style buildings, pedestrian areas, and surrounding forested mountains in a green summer landscape.',
  },
  {
    id: 'activity-7516181115259256832',
    publishedAt: '2026-10-14T17:00:21.769Z',
    title: 'Weber State is moving to a multi-source Thermal Energy Network',
    excerpt:
      'Explore how Weber State University is transforming a traditional campus district energy system into a multi-source Thermal Energy Network, leveraging geothermal resources, electrification, and infrastructure to improve efficiency, resilience, sustainability.',
    url: 'https://www.linkedin.com/posts/grey-edge_explore-how-weber-state-university-is-transforming-activity-7516181115259256832-6gAI',
    image: '/images/projects/weber-state-university.webp',
    imageAlt: 'Weber State University Campus Project Picture',
  },
  {
    id: 'activity-7516090749629681664',
    publishedAt: '2026-10-14T11:01:16.924Z',
    title: 'Colorado Mesa University’s phased geothermal campus',
    excerpt:
      'See how Colorado Mesa University became a leading example of campus energy innovation through a phased geothermal and thermal network strategy.',
    url: 'https://www.linkedin.com/posts/grey-edge_see-how-colorado-mesa-university-became-a-activity-7516090749629681664-oRGf',
    image: '/images/projects/colorado-mesa.webp',
    imageAlt: 'Colorado Mesa Project Site Picture',
  },
  {
    id: 'activity-7515728246462697472',
    publishedAt: '2026-10-13T11:00:49.434Z',
    title: 'Telluride is combining housing and clean energy planning',
    excerpt:
      'Discover how the Town of Telluride is combining housing, infrastructure, and clean energy planning to support long-term community goals and environmental leadership.',
    url: 'https://www.linkedin.com/posts/grey-edge_discover-how-the-town-of-telluride-is-combining-activity-7515728246462697472-APr1',
    image: '/images/projects/telluride.webp',
    imageAlt:
      'Looking down historic Colorado Avenue in downtown Telluride, Colorado, lined with historic brick and wooden buildings flying Colorado and US flags, leading the eye toward a massive mountain box canyon with green slopes, rocky cliffs, and a waterfall under a bright sky.',
  },
  {
    id: 'activity-7514686576694702080',
    publishedAt: '2026-10-10T14:01:36.008Z',
    title: 'Hayden Center is replacing conventional heating with geothermal',
    excerpt:
      'See how the Hayden Center is replacing conventional heating with an integrated geothermal HVAC system that supports town sustainability goals and long-term facility performance.',
    url: 'https://www.linkedin.com/posts/grey-edge_see-how-the-hayden-center-is-replacing-conventional-activity-7514686576694702080-hKRU',
    image: '/images/projects/hayden.jpg',
    imageAlt:
      'Dirt road winding through golden aspens and snow-dusted evergreens toward rugged, snow-capped peaks under a clear blue sky near Hayden, Colorado.',
  },
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

import { site } from './images'

export const org = {
  name: 'The GreyEdge Group',
  shortName: 'GreyEdge',
  tagline: 'Thermal Utility Master Planners',
  region: 'North America',
  email: 'info@greyedgegroup.com',
  social: {
    linkedin: 'https://www.linkedin.com/company/grey-edge',
    facebook: 'https://www.facebook.com/thegreyedgegroup/',
    twitter: 'https://twitter.com/greyedgegroup',
  },
}

export const hero = {
  eyebrow: 'Thermal Utility Master Planners',
  words: ['Local.', 'Resilient.', 'Reliable.'],
  headline: 'Build the thermal infrastructure your future requires.',
  body: 'With over 300 years of combined experience shaping the geothermal industry, we work with developers, campuses, and communities to build Thermal Energy Networks that deliver resilient, reliable, efficient heating and cooling.',
  image: site['hero-ski-town'].src,
  imageAlt: site['hero-ski-town'].alt,
  promises: [
    'Reduce risk',
    'Maximize energy efficiency',
    'Minimize capital and operating costs',
    'Scale at your pace and budget',
  ],
}

export const barriers = {
  eyebrow: 'The Barriers',
  heading: 'The challenge ahead',
  words: ['Constraints.', 'Obstacles.', 'Pressure.'],
  body: 'Modern developments aren’t failing because of one big problem. They’re straining under the weight of multiple simultaneous constraints that have become impossible to ignore.',
  closing: 'These aren’t problems we’ve read about. They’re problems we’ve solved.',
}

export const finalCta = {
  eyebrow: 'Start Planning',
  heading: 'Let’s engineer what’s next.',
  body: 'Whether you’re advancing a master-planned development, evaluating district-scale infrastructure, or navigating grid constraints, we bring the strategy and technical depth to move forward with confidence.',
  image: site['design-session'].src,
  imageAlt: site['design-session'].alt,
}

export const nav = [
  { label: 'Approach', to: '/approach' },
  { label: 'Projects', to: '/projects' },
  { label: 'Geothermal 101', to: '/geothermal-101' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
]

import { site } from './images'

export const whoWeAre = {
  eyebrow: 'Who we are',
  heading: 'Our Story',
  lead: 'We possess unparalleled experience in leveraging the heat beneath our feet, with members who have spent the last fifty years actively building the geothermal industry. As a team of professional engineers, energy modelers, hydrogeologists and academic researchers, we pioneered the standards and practices that define the field today.',
  image: site['team-photo'].src,
  imageAlt: site['team-photo'].alt,
  pillars: [
    {
      title: 'Industry standards and education',
      body: 'We contributed to every major geothermal standard and authored the training programs behind key industry certifications. We still teach the courses for Certified Geo Designer, Certified Geo Inspector and Accredited Installer.',
    },
    {
      title: 'Technical innovation',
      body: [
        'Garen Ewbank developed the industry-standard methods for characterizing ground conductivity and diffusivity, later patenting advanced methodologies to improve them.',
        'Cary Smith, Mark Smith and Bill O’Donnell brought the ambient one-pipe temperature loop into the modern era through their work at Colorado Mesa University.',
      ],
    },
    {
      title: 'Global project experience',
      body: 'Our members have spent decades installing and managing complex geothermal projects worldwide, from Saudi Arabia to South Korea, and Canada to Mexico.',
    },
  ],
}

export const story = {
  eyebrow: 'The Foundation',
  heading: 'Shaping the future',
  year: '2016',
  title: 'The GreyEdge Group founded',
  body: [
    'The GreyEdge Group was founded as something intentionally different: a collective of the Thermal Energy Networks industry’s most accomplished individual practitioners, brought together around a shared conviction that TENs represented the future of district-scale decarbonization.',
    'Our founding members include the engineer who pioneered in-situ thermal conductivity testing in 1994, the hydronics specialist who brought the one-pipe ambient loop into the modern era, and a team that contributed significantly to every major geothermal standard and created the industry’s certification curricula.',
    'What began as a network of collaborating specialists has been forged into a focused, aligned team, one whose collective experience designing, building and operating real ambient loop systems is unmatched anywhere in North America.',
  ],
  /** The longer form of the line Matt likes, from the current About page. */
  pullQuote:
    'We paid our dues years ago to learn the lessons many of our competitors are only getting to now. Every one of our projects benefits from that hard-earned wisdom.',
  image: site['shaping-the-future'].src,
  imageAlt: site['shaping-the-future'].alt,
}

export const whyUs = {
  eyebrow: 'The Mission',
  heading: 'Why choose us',
  lead: 'Clients choose The GreyEdge Group because successful thermal infrastructure takes more than good engineering. It takes practical solutions that balance performance, constructability, cost and long-term operational success.',
  body: [
    'Using a deep understanding of heat pump optimization, we blend geothermal with a diverse array of localized energy sources: solar thermal, wastewater, industrial waste heat, thermal storage and mine water.',
    'By connecting these multi-source thermal districts across large geographic areas, we deliver predictable performance at higher efficiency, with lower capital and reduced operating costs compared to legacy systems.',
  ],
  closing: 'We bring the full picture: technical depth, creative problem solving, and real-world experience.',
  pillars: ['Industry pioneers', 'Proven results', 'Client-focused approach'],
  image: site['design-session'].src,
  imageAlt: site['design-session'].alt,
}

export const teamIntro = {
  eyebrow: 'The People',
  heading: 'Engineers. Strategists. Pioneers.',
  lead: 'A collective of North America’s most accomplished thermal energy network specialists.',
}

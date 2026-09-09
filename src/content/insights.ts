import { site } from './images'

export interface InsightSection {
  heading?: string
  paragraphs: string[]
}

export interface InsightLink {
  label: string
  to: string
}

export interface Insight {
  slug: string
  category: 'Technical Education' | 'Case Studies' | 'Industry and Policy'
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
  /** Cross-references rendered as real links in the article footer, never as body prose. */
  relatedLinks?: InsightLink[]
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug)
}

export const insightCategories = ['All', 'Technical Education', 'Case Studies', 'Industry and Policy'] as const
export type InsightCategoryFilter = (typeof insightCategories)[number]

/**
 * Insights with a `body` open at /insights/:slug. Others deep-link to existing pages
 * (e.g. G101 primer) until long-form is written. Do not retell G101 sections here.
 * Case studies are narrative writeups grounded in field presentations; projects still live under /projects.
 *
 * Voice rules, from the client review of every article:
 * - Customer-facing, never inward-facing. Never cite "GreyEdge briefings", "briefing
 *   material", or "practice decks" as a source. State the fact, or name the public
 *   source (DOE, the Colorado PUC, campus reporting).
 * - One idea per paragraph, led by a topic sentence. Split any sentence carrying more
 *   than two ideas rather than stacking them with parentheses and semicolons.
 * - Define jargon on first use: electric resistance (not bare "resistance"), source (a
 *   place to absorb energy from), sink (a place to reject energy to), load diversity
 *   (simultaneous heating and cooling loads across a building or campus).
 * - The 50/90 rule: roughly 90% of annual hours sit under 50% of peak load, while true
 *   peak occupies on the order of hours in a year. Keep that phrasing consistent.
 * - Cross-references to other articles belong in `relatedLinks`, not in body prose.
 */
export const insights: Insight[] = [
  {
    slug: 'colorado-mesa-university',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Colorado Mesa University: what a campus ATL actually delivers',
    summary:
      'One of the first campus ambient loops in the country, and one of the most efficient: demand, gas, water, and CapEx results across more than 1.6 million square feet of campus.',
    image: site['insight-cmu'].src,
    imageAlt: site['insight-cmu'].alt,
    to: '/insights/colorado-mesa-university',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Colorado Mesa University did not set out to build a district energy system. It started with a campus master plan in 2006, a first geothermal installation at Dominguez Hall in 2008, and one standing rule: every new building would be evaluated for connection to the loop.',
          'An ambient temperature loop, or ATL, delivers heating and cooling through a shared network of underground pipes. Buildings connect to that loop, and the loop connects to whatever energy sources and sinks a site can offer. By 2012 CMU’s loop was carrying campus heating.',
          'Today roughly 79% of a campus exceeding 1.6 million square feet is connected across five micro districts, and expansion aims to roughly double the served area by 2030. The results of CMU’s ATL are not from a pilot. They come from one of the first and most efficient ATLs in the country, a system that grew alongside the campus and learned to treat load diversity, storage, and peaking plant as one machine.',
        ],
      },
      {
        heading: 'Hybrid by design: the 50/90 rule',
        paragraphs: [
          'CMU is not all geothermal and no boilers. It is a hybrid system sized for how a campus actually runs. Roughly 90% of annual hours sit under 50% of peak load, while true peak occupies on the order of hours in a year.',
          'Sizing the system for 90% of the operational hours, instead of stacking every building’s worst hour, allows renewable and more efficient resources to source around 90% of the energy needs. Geo-exchange, irrigation heat exchange, and cooling towers carry the ordinary day while boilers wait for the extremes. The boilers are the tell, because across long stretches of operation they are reportedly rarely needed.',
          'Against a conventional chiller-and-boiler plant, published evaluations of the community ground-source system show 650 kW of demand reduction, 1.3 GWh of annual energy savings, about 58,000 Dth of natural gas avoided, and roughly 10 million gallons of cooling-tower water saved each year.',
        ],
      },
      {
        heading: 'Borefield CapEx collapses when the network shares load',
        paragraphs: [
          'The most expensive part of geo-exchange systems is drilling the boreholes. The more linear feet of geo-exchange, the more expensive. A standalone geo-exchange design for the same campus-scale cooling would have required on the order of 217 vertical feet of borehole per installed ton. The ATL configuration lands near 84 feet per ton. That is roughly a 62% reduction in field capital intensity.',
          'The 50/90 rule allows the geo-exchange systems to be smaller than traditional, but this is not the only reason CMU’s ATL is so effective. Load diversity—simultaneous heating and cooling loads across a system, one building rejecting heat while another calls for it—allows load sharing and peak load reduction. Multi-source assets then carry work the ground would otherwise do alone.',
          'Electric load tells the same story, falling from roughly 784 kW without the district approach to about 185 kW with it. Soft costs move too. Campus square footage roughly tripled while HVAC technician headcount barely grew, because shared infrastructure replaces building-by-building plant sprawl.',
        ],
      },
      {
        heading: 'What the operating ledger shows',
        paragraphs: [
          'Annual energy savings reached approximately $1.5 to $2 million in recent years, with cumulative savings above $16 million since 2008. Displacing that much natural gas avoids roughly 18,000 metric tons of CO₂e per year.',
          'Efficiency also shows up building by building. Energy use intensities for dormitories, classrooms, labs, and food service all sit well below national averages for those property types.',
          'The lesson for other campuses is not to copy CMU’s pipe diameters. It is that an ambient loop earns its keep when you size for part load, keep peaking resources honest, and let diversity compound as each new building joins the network.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'The 50/90 rule', to: '/insights/multisource-networks' },
      { label: 'CMU project page', to: '/projects/colorado-mesa' },
    ],
  },
  {
    slug: 'mountain-town-decarbonization',
    category: 'Case Studies',
    level: 'Strategic',
    title: 'Mountain towns, snowmelt, and the last 10%',
    summary:
      'Snowmelt is most of Vail’s municipal gas use. Electric resistance can melt snow, but a thermal energy network is how a town finishes decarbonization without breaking the grid.',
    image: site['insight-mountain-town'].src,
    imageAlt: site['insight-mountain-town'].alt,
    to: '/insights/mountain-town-decarbonization',
    readTime: '8 min read',
    body: [
      {
        paragraphs: [
          'Mountain towns face a brutal version of beneficial electrification. Climate goals, often 50% emission reductions by 2030 and deeper by 2050, collide with snowmelt systems that can dominate municipal natural gas use, guest expectations that forbid unreliable heat, and a distribution grid already absorbing building electrification and EV charging.',
          'Vail makes the scale plain. Snowmelt accounts for roughly 80% of municipal gas use and on the order of 6,500 metric tons of CO₂e per year, with a gas-equivalent peak in the multi-megawatt range.',
          'Electric resistance snowmelt systems can do the job, at roughly three times the energy cost of a heat-pump path. The bigger problem with the electric resistance route is timing. Peak electric resistance snowmelt usage coincides with other peaking events such as storms, cold snaps, and public gatherings, which can dramatically increase utility costs at exactly the hours the feeder is least forgiving.',
        ],
      },
      {
        heading: 'The Falcon Curve and efficient electrification',
        paragraphs: [
          'The Falcon Curve describes what happens to a winter grid that electrifies the wrong way. As outdoor temperatures fall, air-source heat pumps lose capacity and hand more of the work to electric resistance backup, so electric demand climbs steeply at the coldest hours. Plotted against temperature, or seasons, that electric demand line dives upward and peaks when the distribution system has the least room to give. When plotted annually this graph resembles the shape of a falcon.',
          'Water-source heat pumps do not follow that curve. Because they exchange heat with a loop held near ground temperature rather than with outdoor air, their efficiency stays relatively independent of the weather. A cold snap that cripples an air-source fleet barely registers on a water-source system.',
          'This is where a thermal energy network becomes transformative. Ambient loops, shared diversity, and thermal storage turn snowmelt plants, hotels, ice arenas, wastewater treatment, and civic buildings into a portfolio of sources, meaning places to absorb energy from, and sinks, meaning places to reject energy to.',
        ],
      },
      {
        heading: 'Vail’s path from study to civic district',
        paragraphs: [
          'Vail’s journey to an ATL followed a structured path: high-level feasibility, 50/90 hybrid framing, hydrogeology and test boreholes, and a map of thermal assets across town.',
          'Phase two, funded by the Colorado Energy Office, developed a Civic Area geothermal heating district concept. The wastewater treatment plant, hotels, the library, the ice arena, Lionshead snowmelt, and geothermal wells all enter one planning frame instead of queueing up as separate projects.',
        ],
      },
      {
        heading: 'The implementation layer',
        paragraphs: [
          'The Vail geo-snowmelt project demonstrates that identifying thermal resources is only part of the challenge. Turning a thermal energy network from a concept into operating infrastructure requires solving technical, organizational, and economic questions at the same time. Four lessons from Vail stand out.',
          'Efficiency comes before expansion. The cleanest and least expensive energy is the energy that never has to be produced. Before adding new geothermal assets, the project examined opportunities to improve controls, optimize setpoints, and better utilize existing distribution systems. Reducing unnecessary load first lowers the amount of infrastructure the network must ultimately build and finance.',
          'Hybrid systems outperform all-or-nothing solutions. The project applied the same 50/90 philosophy used throughout thermal energy network planning. Renewable thermal resources are sized for the long middle of the year—roughly 90% of annual hours under 50% of peak—while existing equipment remains available for infrequent peak events. This approach captures most of the carbon and operating-cost benefits while avoiding the expense of building for the coldest few hours of the year.',
          'Governance matters as much as engineering. One of the most important decisions is often deferred until late in development: who owns and operates the network. Utility Thermal Energy Network (UTEN) models continue to evolve across North America, but the core questions remain the same. Who owns the assets? Who bills customers? Who funds expansion? Establishing those answers early helps prevent promising projects from stalling after the technical work is complete.',
        ],
      },
      {
        heading: 'What other ski towns should take',
        paragraphs: [
          'Vail’s experience highlights a broader lesson: snowmelt, hotels, wastewater systems, ice arenas, and civic buildings do not have to be treated as isolated energy loads. When connected through a thermal energy network, they become shared resources that can absorb, move, store, and reuse energy across the community.',
          'Success depends on more than just the technology. Stakeholder alignment, load reduction, hybrid design, and clear ownership structures are often just as important as the geothermal wells and heat pumps themselves.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Avoiding the grid upgrade', to: '/insights/peak-demand' },
      { label: 'Vail project page', to: '/projects/vail' },
    ],
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
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Beneficial electrification is the challenge of the decade, and the fastest way to do it poorly is to swap existing central plants for air-source heat pumps with electric resistance backup sized for every building’s worst hour.',
          'Capacity markets already show what unconstrained winter and summer peaks cost, and the DOE puts the national stakes clearly: at scale, summer and winter peak reductions measured in gigawatts translate into tens of billions of dollars in avoided grid-system cost.',
          'An ATL can be the solution, not part of the problem. Geothermal heat pumps and networked systems see far smaller electric spikes, because they never lose capacity to defrost cycles the way air-source units do. A campus or district sharing an ambient loop installs far less coincident electric load than the sum of standalone conversions.',
        ],
      },
      {
        heading: 'Diversity, hybrid design, and storage',
        paragraphs: [
          'Load diversity is balanced heating and cooling thermal profiles within a building or campus. This applies to hourly, daily, weekly, or even annual timescales. The sum of what buildings need at the same moment is almost always lower than the sum of their individual peaks, and an ambient temperature loop is what lets an owner capture the difference. Offices rejecting heat while residences call for heat are solving each other’s problem on the same pipe.',
          'At Colorado Mesa University, a district system in place of isolated plant delivers roughly 650 kW of demand reduction, with electric service needs falling from about 784 kW to roughly 185 kW.',
          'Part-load reality sharpens the point. Most of the year sits well below peak, and pump affinity laws mean running lower flows for thousands of hours cuts friction and power dramatically. Designing for the peak hour alone oversizes pipe, pumps, and interconnection for hours that barely exist.',
          'Hybrid peaking covers what diversity cannot. Under the 50/90 rule, roughly 90% of annual hours sit under 50% of peak load while true peak occupies on the order of hours in a year, so boilers or towers can handle those rare extremes, and the electric plant never has to be sized for them.',
          'On a thermal energy network, the borefield’s job shifts from being purely a source and sink toward being storage. Heat rejected into the ground can be recovered later when buildings call for heat. This allows for not only daily or weekly energy storage, but monthly and seasonal storage. Storage opens up the ability to capture diversity on the annual timescale.',
        ],
      },
      {
        heading: 'Demand response',
        paragraphs: [
          'One reason electrification can demand a grid upgrade is increased peak demand itself. Electrifying with air-source heat pumps and electric resistance heaters can dramatically increase electrical demand. An ATL offers not only reduced peak demands compared to alternative electrification strategies, but an ability to respond to utility demand events.',
          'Operationally, networked campuses can and have shed loads with a single control action during a peak event. That is demand response without asking every building to invent its own curtailment plan.',
        ],
      },
      {
        heading: 'What to ask before you size the service',
        paragraphs: [
          'Before accepting a utility upgrade as the price of decarbonization, ask three questions. Can these buildings share a thermal backbone? Have diversity and storage been modelled against the true coincident peak rather than the summed peak? And have existing thermal resources, including wastewater, process heat, snowmelt return, and irrigation, been considered at all?',
          'Those questions change the interconnection conversation. They are also where most projects either lock in unnecessary capital, or free it.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Multisource networks', to: '/insights/multisource-networks' },
    ],
  },
  {
    slug: 'weber-state-four-pipes',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Four pipes to two: Weber State’s TEN retrofit',
    summary:
      'A revolving green fund, a chilled-water loop turned into a thermal highway, and phased ground source cut fuel cost and EUI so far that the campus moved its carbon-neutral date from 2050 to 2040.',
    image: site['insight-weber-state'].src,
    imageAlt: site['insight-weber-state'].alt,
    to: '/insights/weber-state-four-pipes',
    readTime: '7 min read',
    body: [
      {
        paragraphs: [
          'Weber State University’s climate commitment originally set carbon neutrality for 2050. Their TEN retrofit has performed so well, and the resulting system is efficient enough, that the university has since moved the carbon neutral target forward to 2040.',
          'The practical plan was efficiency first, then renewables, using savings recycled through a revolving green fund. The fund began as an internal loan on the order of $5 million at low interest, repaid using utility savings. That financing spine matters as much as the mechanical story, because every dollar of avoided utility spend becomes the funding for the next retrofit.',
        ],
      },
      {
        heading: 'Why water-source heat pumps won',
        paragraphs: [
          'The mechanical roadblock was familiar. Efficient VAV reheat still leans on steam or building boilers, so no amount of tuning let a building leave the fuel behind.',
          'Air-source heat pumps decoupled buildings from the campus traditional four-pipe system, but lost efficiency at temperature extremes and shortened equipment life. In a climate with real winters, that is the wrong trade.',
          'Water-source heat pumps offered a third path. They could reuse the chilled-water loop already buried across campus, provided the university was willing to treat that loop as a thermal energy network instead of a one-way cooling pipe. This strategy decreases capital cost and utilizes equipment with a longer life.',
        ],
      },
      {
        heading: 'Turning a chilled-water loop into a source and a sink',
        paragraphs: [
          'A source is a place to absorb energy from. A sink is a place to reject energy to. A conventional chilled-water loop is only ever a sink, because buildings do nothing but dump heat into it. Retrofitting buildings with water-source heat pumps lets them both reject energy to the loop and absorb energy from it, so the chilled-water loop becomes both a source and a sink. In summer the loop still absorbs; in winter it supplies. Buildings begin trading heat with each other through distribution that was already in the ground.',
          'Slow and sequential implementation is what allows steady progress. Driver buildings are isolated or converted in turn, and the campus never has to take the whole system down to move forward.',
        ],
      },
      {
        heading: 'Adding ground source over time',
        paragraphs: [
          'Geothermal came later, and it came incrementally. Ground-source fields precondition the loop and eventually dominate its conditioning, so the central plant can recede into a backup role rather than run as the primary source of heat.',
          'That sequence is why the timeline for carbon neutrality compressed. Once the thermal backbone is in the ground, adding capacity is cheap and carbon-neutrality dates move left.',
        ],
      },
      {
        heading: 'Outcomes you can take to a board',
        paragraphs: [
          'Since 2010, $30 million has been saved in avoided utility costs, including roughly $3.5 million in a single recent year.',
          'The plant-level numbers are just as stark. January central-plant fuel costs fell from on the order of $12,800 per month before the heat pumps and central loop to about $2,700 after startup.',
          'Campus-wide, average energy use intensity fell from roughly 125 kBtu/sf/yr to below 60. University data also shows significant reductions in electricity consumption, natural gas use, energy costs, and greenhouse gas emissions, while the campus continued to expand by hundreds of thousands of square feet.',
        ],
      },
      {
        heading: 'A repeatable process',
        paragraphs: [
          'Weber State University offers a path forward to more efficient, resilient, and economically feasible systems. This process is repeatable. Using avoided utility savings to fund projects, repurposing existing infrastructure, and slow and strategic implementation can provide an engine which drives toward a better future.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'First cost is the wrong question', to: '/insights/lifecycle-cost' },
      { label: 'Implementing TENs', to: '/insights/implementing-tens' },
      { label: 'Weber State project page', to: '/projects/weber-state-university' },
    ],
  },
  {
    slug: 'multisource-networks',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Multisource networks and the 50/90 rule',
    summary:
      'Traditional geo-exchange is efficient, expensive, and land-hungry. The Thermal Highway© cuts both cost and footprint by letting wastewater, mine water, diversity, and hybrid peaking share the work.',
    image: site['insight-50-90'].src,
    imageAlt: site['insight-50-90'].alt,
    to: '/insights/multisource-networks',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Traditional geo-exchange works, and it works well. Compared with air-source heat pumps it delivers higher efficiency, lower electrical demand, and longer equipment life, because it exchanges heat with stable ground temperatures rather than swinging outdoor air.',
          'However, its limits trace back to a single design choice: capital cost. Traditional geo relies on the ground alone. Every ton of peak capacity has to be drilled for, which means high upfront cost, large land area, and strong dependence on local ground properties. On a constrained downtown block, those limits end the conversation before it starts.',
          'Ambient Temperature Loops improve upon traditional geo. On the Thermal Highway©, buildings, sources, and thermal storage trade usable energy across a shared ambient loop instead of each site drilling for its own peak. The ground stays in the picture as a thermal battery, but it becomes one asset among several rather than the whole system.',
          'Two design strategies bring capital cost and land requirements down: diversity and the 50/90 rule.',
        ],
      },
      {
        heading: 'Diversity is a resource',
        paragraphs: [
          'Load diversity, or balanced heating and cooling, becomes a resource across coincidence hours, days, and seasons. The network’s first job is to harvest, move, and reuse the energy a site already produces before it produces more.',
          'High diversity and favorable ground properties mean the ground can be more effectively utilized as a thermal battery. The ground can store energy on the scale of days, weeks, and seasons.',
        ],
      },
      {
        heading: 'Hybrid systems: hours under 50% are most of the year',
        paragraphs: [
          'The 50/90 rule is the design discipline behind hybrid thermal energy networks: roughly 90% of annual hours sit under 50% of peak load, while true peak occupies on the order of hours in a year. So size geo-exchange and multi-source assets for the long middle of the year, and let boilers, towers, or other peaking plant cover the rare extreme. That is how district systems cut borehole footage without pretending peaks never happen.',
          'Which sources are available is entirely site-specific. Wastewater, mine water, geo-exchange, snowmelt as a solar collector, surface water, and drinking water are all examples of creative sources and sinks of energy.',
        ],
      },
      {
        heading: 'Why multisource beats “more geo” alone',
        paragraphs: [
          'Multi-building, multi-source networks consistently show higher performance and lower first cost than isolated geo fields sized for peak capacity. Capital intensity falls when the loop carries diversity and is sized for the majority of energy use. Additionally, peak electric demand falls when the network, rather than electric resistance, handles the coldest and hottest hours.',
          'The paradigm shift fits in one sentence. Stop asking the ground to do every hour’s work alone.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Implementing TENs', to: '/insights/implementing-tens' },
    ],
  },
  {
    slug: 'lifecycle-cost',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'First cost is the wrong question',
    summary:
      'Comparing bid prices does not just miss lifecycle cost, it raises it. Borehole feet per ton, ITC stacking, and decades of avoided utility spend change which system actually wins.',
    image: site['insight-first-cost'].src,
    imageAlt: site['insight-first-cost'].alt,
    to: '/insights/lifecycle-cost',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Capital committees are trained to compare bid prices. Thermal networks are built to outlast the people who approve them. When those two frames collide, the low first-cost plant usually wins the meeting.',
          'Then it spends decades collecting the costs the bid never showed: demand charges, cooling-tower water, boiler replacements, rising maintenance, and eventually the feeder upgrade that electrification without diversity makes inevitable. Comparing capital cost alone does not simply overlook lifecycle cost. It raises it.',
          'Field economics from operating networks make the gap visible. A campus comparison showing 217 borehole feet per installed ton for standalone geo-exchange versus about 84 feet per ton on an ambient loop is not just a curiosity. It is roughly a 62% reduction in field capital intensity for the same connected load class.',
        ],
      },
      {
        heading: 'What the operating ledger already proved',
        paragraphs: [
          'Colorado Mesa University’s cumulative energy savings above $16 million since 2008, and Weber State’s $30 million in avoided utility costs since 2010, are lifecycle arguments written in cash.',
          'Water savings measured in millions of gallons per year and electric demand cuts measured in hundreds of kilowatts show up twice: once as operating cost, and once as infrastructure a utility never had to build.',
          'Incentives move year-zero math as well. When a project already qualifies for a substantial federal investment tax credit, borehole cost can be substantially offset. That can make the geothermal path the lowest first-cost option in addition to the lowest lifecycle option.',
        ],
      },
      {
        heading: 'Cost stacks that fool a spreadsheet',
        paragraphs: [
          'Thermal energy networks are not a single investment. Costs are distributed across five major categories: geo-fields, network distribution, network mechanical systems, interior heat pumps, and behind-the-meter building retrofits. Because the cost of each category can vary dramatically, the decisions made early in design often have a greater impact on project economics than the technology itself.',
          'The most expensive mistake is focusing in the wrong place. Ignoring load diversity can lead to oversized geo-fields and unnecessary drilling costs. Undersizing the distribution network can create bottlenecks that limit future expansion. In either case, the option that appeared least expensive during procurement can become the most expensive asset over its lifecycle.',
          'The same principle applies at the residential scale. In coal-impacted communities, stacked incentives, including Energy Community bonus credits, can significantly reduce a homeowner’s upfront investment. Evaluating only sticker price, without accounting for incentives or realistic operating conditions, often makes conventional systems appear more economical than they actually are.',
        ],
      },
      {
        heading: 'What a capital committee needs to see',
        paragraphs: [
          'A business case that withstands scrutiny is built on four foundations: coincident rather than summed peak loads, operating costs based on realistic utility rates, lifecycle maintenance and replacement costs, and the ability to expand capacity over time without stranding existing investments.',
          'With those in one model, the expensive network usually pencils, and the cheap plant may not look like the most logical solution. A properly implemented network can carry a lower capital cost and still save millions of dollars over the life of the system.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Multisource networks', to: '/insights/multisource-networks' },
      { label: 'Who owns the network', to: '/insights/governance-first' },
    ],
  },
  {
    slug: 'implementing-tens',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Implementing TENs: from why to commissioning',
    summary:
      'Feasibility, hydrogeology, design, drilling, and commissioning practices that separate networks that expand from networks that stall.',
    image: site['insight-implementing-tens'].src,
    imageAlt: site['insight-implementing-tens'].alt,
    to: '/insights/implementing-tens',
    readTime: '7 min read',
    body: [
      {
        heading: 'Start with why, then build the sequence',
        paragraphs: [
          'Starting with why is not just a slogan. Avoiding the hard conversation about peak loads, gas dependency, water resources, and the shortcomings of one-building-at-a-time electrification often leads to a collection of equipment purchases rather than a resilient energy network.',
          'Technology is rarely the hardest part. Ambient loops, heat pumps, load diversity, building-to-building heat sharing, and hybrid 50/90 sizing are all well-established technologies and concepts. What separates successful projects from expensive studies is the implementation pathway. Each step informs the next, from understanding existing conditions and available thermal resources to designing, constructing, and commissioning a system that performs as intended. The value of a thermal energy network is realized not through any single piece of equipment, but through the steps that bring the entire system together.',
          'Successful thermal energy networks are built through a deliberate sequence. The process begins with feasibility and a clear understanding of the existing buildings and infrastructure. From there, retro-commissioning, hydrogeologic investigation, and thermal resource mapping reveal both opportunities and constraints, informing an integrated design that leverages the site’s available assets. Construction must then be carried out by experienced drilling and installation teams, while commissioning ensures the system performs in operation the way it was intended in design.',
        ],
      },
      {
        heading: 'Evaluate the place, not a generic tonnage',
        paragraphs: [
          'Park City’s evaluation work provides a useful model for how thermal energy networks should be planned. Rather than treating an entire community as a single system, the study evaluated three distinct districts, each with its own building stock, HVAC characteristics, and energy profile. From there, available thermal resources including wastewater, mine water, geo-exchange, and source-protection constraints were evaluated to understand which opportunities were realistic and which were not.',
          'The resulting recommendation was not based on a single technology, but on a comprehensive understanding of both the site’s assets and its limitations. Effective planning happens when thermal resources, infrastructure constraints, building needs, and regulatory considerations are viewed together rather than in isolation.',
          'Retro-commissioning plays a critical role early in that process. Improving controls, optimizing setpoints, and addressing building performance issues reduces the load the network ultimately needs to serve. Designing around avoidable energy waste often leads to oversized infrastructure, higher capital costs, and lower-than-expected savings. The most cost-effective thermal energy is frequently the demand that is eliminated before new infrastructure is installed.',
        ],
      },
      {
        heading: 'Design, drill, and commission as one chain',
        paragraphs: [
          'Once the opportunity has been defined, the focus shifts to execution. Design should be grounded in experience, informed by thermal response testing, and guided by an understanding of the site’s buildings, resources, and efficiency opportunities. Every available source and sink should be evaluated to determine how it can contribute to the network.',
          'Construction is equally dependent on site-specific conditions. Drilling methods, rig selection, and installation strategies must align with the local geology, and success is best supported by teams with experience delivering comparable projects.',
          'Commissioning then connects design intent to operational reality. Through design reviews, installation verification, and functional testing, controls, sequences, and setpoints are validated to ensure the system performs as modeled.',
          'The process is only as strong as its weakest link. A well-designed network can still underperform if any stage of implementation falls short. When the entire chain remains aligned, the result is infrastructure that can expand over time without requiring the backbone to be redesigned or rebuilt.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Multisource networks', to: '/insights/multisource-networks' },
      { label: 'Who owns the network', to: '/insights/governance-first' },
    ],
  },
  {
    slug: 'governance-first',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'Who finances, owns, and operates the thermal network?',
    summary:
      'Public entity, utility, or third party: three ownership models, three sets of incentives, and the questions about billing, expansion, and performance each one has to answer.',
    image: site['insight-finance'].src,
    imageAlt: site['insight-finance'].alt,
    to: '/insights/governance-first',
    readTime: '8 min read',
    body: [
      {
        paragraphs: [
          'Every serious thermal network conversation eventually reaches the same three questions: who finances it, who owns it, and who operates it? Public entities, utilities, and third parties can each play those roles, and mixing them without a clear model is often how projects stall after the engineering looks finished.',
          'Utility thermal energy network, or UTEN, discussions are evolving nationally for a reason. A shared ambient loop is infrastructure, not equipment. It needs a durable owner, a rate or cost-recovery path, and an operator accountable for loop temperatures, expansion, and customer participation. A one-off construction contract supplies none of those.',
          'For the UTEN platform to grow, someone must own the backbone, recover costs, manage operations, and make decisions as the network evolves.',
          'The specific answer varies by community, campus, or district, but most projects ultimately align around one of three approaches: public ownership, utility ownership, or third-party ownership. Each can succeed, but each brings different strengths and responsibilities.',
        ],
      },
      {
        heading: 'The public or municipal owner',
        paragraphs: [
          'For many communities, public ownership feels like a natural fit because many of the most valuable thermal assets are already publicly owned. Wastewater treatment plants, recreation centers, libraries, snowmelt systems, and municipal buildings often provide the sources and sinks that make a network possible in the first place.',
          'A municipal model also allows a community to align network development directly with its broader goals. Emissions reductions, economic development, resilience, and long-term energy affordability can all be considered alongside traditional infrastructure planning.',
          'The challenge is that ownership transfers long-term responsibility to the municipality. Capital costs, operations, maintenance, customer relationships, and future expansion all become public obligations. Unlike traditional utilities, municipalities often lack an established rate structure or operating organization dedicated to thermal energy, requiring new capabilities to be developed internally or contracted from outside providers.',
        ],
      },
      {
        heading: 'Utility ownership',
        paragraphs: [
          'As thermal energy networks become more integrated into energy planning, utilities are increasingly being asked to evaluate whether these systems belong alongside more traditional infrastructure investments.',
          'The appeal of utility ownership is straightforward. Utilities already manage customer relationships, billing systems, metering, field operations, and long-term infrastructure planning. They are also accustomed to making investments with operating horizons measured in decades rather than years. Where regulatory frameworks support thermal networks, utilities can provide a clear path for financing, operation, and future expansion.',
          'The tradeoff is that utilities move at the pace of regulation. New tariffs, cost-recovery mechanisms, and service structures need to be established before the first customer connects. Building that framework takes time, but where it exists, utility ownership can provide the stability needed for a network to grow steadily over multiple phases and generations of equipment.',
        ],
      },
      {
        heading: 'Third-party ownership',
        paragraphs: [
          'A third approach places ownership in the hands of a dedicated private entity. In this model, building owners purchase heating and cooling as a service while the network owner assumes responsibility for developing, operating, and maintaining the infrastructure.',
          'This approach can appeal to campuses, private districts, and institutional owners that want the benefits of a thermal network without becoming utility operators themselves. It also allows performance risk and capital investment to be carried by an organization specifically focused on energy infrastructure.',
          'The advantage is flexibility and speed. The challenge is complexity. Questions surrounding customer agreements, cost allocation, future expansion, and long-term ownership must be clearly resolved through contracts. Unlike regulated utility systems, these arrangements rely heavily on the strength of the commercial framework established at the outset of the project.',
        ],
      },
      {
        heading: 'Settle governance before the design is finished',
        paragraphs: [
          'Too often, ownership discussions begin after the engineering is complete. By then, difficult questions about growth, cost recovery, and operational responsibility can become barriers rather than design inputs.',
          'Successful projects address these issues early. They define who owns the thermal backbone, how future phases will be financed, how operating decisions will be made, and who remains accountable for system performance after construction is complete. They also establish policies for customer participation, ensuring that early adopters are not disadvantaged as additional buildings join the network over time.',
          'These decisions may seem administrative compared to borefields, heat pumps, and distribution piping, but they are what determine whether a network remains a collection of assets or becomes lasting infrastructure.',
          'In the end, thermal energy networks are not just engineering projects. They are systems that must be financed, operated, expanded, and maintained over decades. The communities and organizations that resolve those questions early are often the ones that move from feasibility studies to functioning networks.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'What other states should copy from Colorado', to: '/insights/colorado-policy-in-practice' },
      { label: 'First cost is the wrong question', to: '/insights/lifecycle-cost' },
    ],
  },
  {
    slug: 'colorado-policy-in-practice',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'What other states should copy from Colorado’s geothermal policy',
    summary:
      'Colorado paired statutes, PUC orders, equipment standards, and stacked incentives, and thermal energy networks moved from campus innovation to utility infrastructure. Here is the part that transfers.',
    image: site['insight-colorado-policy'].src,
    imageAlt: site['insight-colorado-policy'].alt,
    to: '/insights/colorado-policy-in-practice',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Colorado is the closest thing the United States has to a controlled experiment in geothermal policy. In a few years the state moved from treating geothermal as interesting to writing it into statutes, commission orders, equipment standards, and stacked incentives. The market responded.',
          'The most visible result is that thermal energy networks are no longer only a campus innovation story. Utility thermal energy networks are now something large gas utilities are expected to plan for.',
          'For legislators, regulators, and policymakers elsewhere, the real lesson is not the individual statutes or program names. It is understanding which policy levers moved thermal energy networks from isolated demonstration projects to infrastructure that utilities are expected to evaluate and plan for. Four levers, or actions, were particularly influential.',
        ],
      },
      {
        heading: 'Lever one: put thermal networks inside utility planning',
        paragraphs: [
          'Heat Beneath Our Feet, community geothermal garden authorization, and Clean Heat planning requirements did the foundational work by giving thermal energy a defined place in the regulatory structure. Before that, a thermal network had no natural home in a utility’s plan.',
          'On December 1, 2025, the Colorado Public Utilities Commission’s Clean Heat direction went further, pressing large gas utilities toward thermal solutions as part of meeting state energy policy and opening rate-recovery mechanisms that can fund network development.',
          'This is the structural move other states most need to replicate. It shifts the burden so utilities are asked to lean in, not only customers, and it turns a network from a one-off project into an asset with a recovery path.',
        ],
      },
      {
        heading: 'Lever two: make the replacement cycle a real decision point',
        paragraphs: [
          'As of January 1, 2026, Colorado enforced ultra-low NOx emission standards under House Bill 23-1161. The new requirements increased the cost of many gas-fired replacement options and reduced the number of compliant equipment choices available to building owners, creating a more meaningful comparison between conventional systems and electrified alternatives.',
          'The effect is subtle and powerful. Every boiler and furnace replacement becomes a genuine comparison between gas and a heat pump rather than an automatic like-for-like swap. Air-quality rules and decarbonization goals end up pulling in the same direction without either one mandating a technology.',
          'Local authority, interoperability standards, and workforce transition expectations all sit alongside equipment regulations in shaping the market. Policy is not just a collection of incentives. It establishes the rules, constraints, and opportunities that influence what a replacement project can ultimately become.',
        ],
      },
      {
        heading: 'Lever three: stack incentives so year zero pencils',
        paragraphs: [
          'Colorado’s incentive programs are designed to reduce one of the largest barriers to adoption: upfront cost. Through grants, tax credits, and other funding mechanisms, the Colorado Energy Office provides support for both residential and commercial projects. In the ground-source market, that support has ranged from direct consumer incentives to large-scale funding programs capable of supporting community and nonresidential projects.',
          'The larger advantage comes from how those programs interact with federal incentives. State support can often be layered with federal geothermal incentives, including the Investment Tax Credit (ITC) and Production Tax Credit (PTC), along with additional provisions related to prevailing wage, apprenticeship, and energy-community eligibility. Together, these programs can materially improve project economics and reduce the cost gap that often prevents geothermal and thermal energy network projects from moving forward.',
          'The key takeaway is that incentive design matters as much as incentive size. A state program that builds on federal credits can generate more value, more projects, and greater adoption than a larger rebate that stands alone.',
        ],
      },
      {
        heading: 'Lever four: settle ownership alongside the incentives',
        paragraphs: [
          'Colorado’s proceedings treat ownership as a policy question rather than leaving it to each project to improvise. Whether a network is owned by a public entity, a utility, or a third party determines who bills customers, who funds expansion, and who is accountable for performance.',
          'Answering the question of who owns the network early can help avoid a familiar failure mode, where a technically sound network stalls because nobody has authority to own it.',
        ],
      },
      {
        heading: 'What this adds up to for other states',
        paragraphs: [
          'The lesson is not that Colorado’s specific statutes are right for every state. It is that thermal energy networks scale when statutes, utility regulation, equipment standards, and incentives all point the same direction as the engineering. Any single lever produces pilots. All four together produce infrastructure.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Who owns the network', to: '/insights/governance-first' },
      { label: 'First cost is the wrong question', to: '/insights/lifecycle-cost' },
    ],
  },
  {
    slug: 'geo-power-and-tens',
    category: 'Technical Education',
    level: 'Strategic',
    title: 'When geo power and thermal networks share a site',
    summary:
      'Geothermal spans deep resources that generate electricity and shallow loops that condition buildings. Blend the two and one site can deliver heating, cooling, and power at once.',
    image: site['insight-share-a-site'].src,
    imageAlt: site['insight-share-a-site'].alt,
    to: '/insights/geo-power-and-tens',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Geothermal is not one technology. It is a spectrum defined by depth and temperature, and the two ends of it do entirely different jobs.',
          'At the deep end, conventional hydrothermal resources, enhanced geothermal systems (EGS), and advanced closed-loop concepts reach hot rock to generate electricity. At the shallow end, building geo-exchange and thermal energy networks use the near-surface ground as a source and a sink for heating and cooling buildings.',
          'The interesting engineering is at the seam. Blend deep geothermal with shallow geothermal and a single site can produce heating, cooling, and electricity, with each system making the other cheaper.',
        ],
      },
      {
        heading: 'Why the deep end is suddenly relevant',
        paragraphs: [
          'EGS methods, illustrated by research sites such as Utah FORGE and by commercial developers, target hot rock where natural permeability is lacking. Advanced closed-loop concepts chase the same heat with less dependence on reservoir conditions.',
          'Both technologies generate electricity, and both reject a great deal of heat in the process. That thermal exhaust is an invaluable resource when seen through the lens of a thermal energy network.',
        ],
      },
      {
        heading: 'Why coupling power and thermal works',
        paragraphs: [
          'The two systems want opposite things, which is exactly why they pair well. A geothermal power plant wants stable baseload output. A thermal energy network wants clean, flexible thermal conditioning.',
          'Waste heat from power production can cover a large share of a district’s heating need, which lowers the network’s first cost and shrinks the borefield it would otherwise require. But the benefit runs in both directions. For geothermal power generation, heat is a liability, so reducing the cooling burden at the power plant lowers operating cost and improves electric output.',
          'Geology and climate decide where the pairing is attractive. Communities with strong heating demand and access to usable geothermal resources stand to benefit the most. Mountain towns are often compelling candidates because they already contain large thermal loads, such as snowmelt systems, wastewater infrastructure, hotels, civic buildings, and recreation facilities. In these environments, a deep geothermal resource can become another thermal asset within the network, significantly changing the economics and design of the overall system.',
        ],
      },
      {
        heading: 'Precedents, not science fiction',
        paragraphs: [
          'The idea of pairing geothermal power production with district heating is not new. Projects such as Iceland’s Svartsengi plant and Austria’s Altheim facility demonstrated decades ago that geothermal resources can generate electricity while simultaneously providing useful thermal energy to surrounding communities. The same concept continues to evolve today. Research efforts such as Cornell’s low-temperature deep geothermal work and Delft’s exploration of deep direct-use systems paired with shallow thermal storage are pursuing the same goal: extracting more value from a single geothermal resource by treating heat and power as complementary products rather than separate systems.',
          'The remaining question is where these systems make sense together. Communities that have both a viable deep geothermal resource and substantial heating demand are the strongest candidates. In those locations, integrating power production with a thermal energy network can unlock value that neither system could capture alone.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Multisource networks', to: '/insights/multisource-networks' },
    ],
  },
  {
    slug: 'thermal-highway',
    category: 'Technical Education',
    level: 'Foundational',
    title: 'Understanding the Thermal Highway©',
    summary:
      'Where the magic happens in a TEN: how a district-scale network moves usable energy between buildings, sources, and storage.',
    image: site['network-diagram'].src,
    imageAlt: site['network-diagram'].alt,
    to: '/geothermal-101#thermal-highway',
    readTime: 'Primer',
  },
  {
    slug: 'tens-basics',
    category: 'Technical Education',
    level: 'Foundational',
    title: 'Thermal energy networks: what and why',
    summary:
      'Ambient loops, heat trading, and hybrid peaking: the short path into why TENs beat building-by-building electrification.',
    image: site['training-classroom'].src,
    imageAlt: site['training-classroom'].alt,
    to: '/geothermal-101',
    readTime: 'Primer',
  },
]

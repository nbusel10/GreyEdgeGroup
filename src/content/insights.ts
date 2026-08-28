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
          'Today roughly 79% of a campus exceeding 1.6 million square feet is connected across five microdistricts, and expansion aims to roughly double the served area by 2030. The results below are worth reading closely because none of them come from a pilot. They come from one of the first and most efficient ATLs in the country, a system that grew alongside the campus and learned to treat load diversity, storage, and peaking plant as one machine.',
        ],
      },
      {
        heading: 'Hybrid by design: the 50/90 rule',
        paragraphs: [
          'CMU is not all geothermal and no boilers. It is a hybrid system sized for how a campus actually runs. Roughly 90% of annual hours sit under 50% of peak load, while true peak occupies on the order of hours in a year.',
          'Sizing for that long middle of the year, instead of stacking every building’s worst hour, gives each asset a defined job. Geo-exchange, irrigation heat exchange, and cooling towers carry the ordinary day; boilers wait for the extremes. The boilers are the tell, because across long stretches of operation they are reportedly needed almost never.',
          'Against a conventional chiller-and-boiler plant, published evaluations of the community ground-source system show on the order of 650 kW of demand reduction, 1.3 GWh of annual energy savings, about 58,000 Dth of natural gas avoided, and roughly 10 million gallons of cooling-tower water saved each year.',
        ],
      },
      {
        heading: 'Borefield CapEx collapses when the network shares load',
        paragraphs: [
          'The clearest measure of what a network buys an owner is how much less drilling it needs. A standalone geo-exchange design for the same campus-scale cooling would have required on the order of 217 vertical feet of borehole per installed ton. The ATL configuration lands near 84 feet per ton.',
          'That is roughly a 62% reduction in field capital intensity, and load diversity is the reason. Diversity means the simultaneous heating and cooling loads across a campus: one building rejecting heat while another calls for it. Multi-source assets then carry work the ground would otherwise do alone.',
          'Electric load tells the same story, falling from roughly 784 kW without the district approach to about 185 kW with it. Soft costs move too. Campus square footage roughly tripled while HVAC technician headcount barely grew, because shared infrastructure replaces building-by-building plant sprawl.',
        ],
      },
      {
        heading: 'What the operating ledger shows',
        paragraphs: [
          'Annual energy savings reached approximately $2 million in 2024, with cumulative savings above $16 million since 2008. Displacing that much natural gas avoids roughly 18,000 metric tons of CO₂e per year.',
          'Efficiency also shows up building by building. Energy use intensities for dormitories, classrooms, labs, and food service all sit well below national averages for those property types.',
          'The lesson for other campuses is not to copy CMU’s pipe diameters. It is that an ambient loop earns its keep when you size for part load, keep peaking plant honest, and let diversity compound as each new building joins the network.',
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
    readTime: '7 min read',
    body: [
      {
        paragraphs: [
          'Mountain towns face a brutal version of beneficial electrification. Climate goals, often 50% reductions by 2030 and deeper by 2050, collide with snowmelt systems that can dominate municipal natural gas use, guest expectations that forbid unreliable heat, and a distribution grid already absorbing building electrification and EV charging.',
          'Vail makes the scale plain. Snowmelt accounts for roughly 80% of municipal gas use and on the order of 6,500 metric tons of CO₂ per year, with a gas-equivalent peak in the multi-megawatt range.',
          'Electric resistance snowmelt systems can do the job, at roughly three times the energy cost of a heat-pump path. The bigger problem is timing. Peak electric resistance snowmelt usage coincides with other peaking events such as storms, cold snaps, and public gatherings, which can dramatically increase utility costs at exactly the hours the feeder is least forgiving.',
        ],
      },
      {
        heading: 'The Falcon Curve and efficient electrification',
        paragraphs: [
          'The Falcon Curve describes what happens to a winter grid that electrifies the wrong way. As outdoor temperatures fall, air-source heat pumps lose capacity and hand more of the work to electric resistance backup, so electric demand climbs steeply at the coldest hours. Plotted against temperature, that demand line dives upward like a falcon, and it peaks when the distribution system has the least room to give.',
          'Water-source heat pumps do not follow that curve. Because they exchange heat with a loop held near ground temperature rather than with outdoor air, their efficiency stays relatively independent of the weather. A cold snap that cripples an air-source fleet barely registers on a water-source one.',
          'That is what a thermal energy network changes for the built environment. Ambient loops, shared diversity, and thermal storage turn snowmelt plants, hotels, ice arenas, wastewater treatment, and civic buildings into a portfolio of sources, meaning places to absorb energy from, and sinks, meaning places to reject energy to. Isolated electric loads become a system.',
        ],
      },
      {
        heading: 'Vail’s path from study to civic district',
        paragraphs: [
          'Phase one followed a familiar sequence: high-level feasibility, 50/90 hybrid framing, hydrogeology and test boreholes, and a map of thermal assets across town.',
          'Phase two, funded by the Colorado Energy Office, developed a Civic Area geothermal heating district concept. Wastewater treatment, hotels, the library, the ice arena, Lionshead snowmelt, and geothermal wells all enter one planning frame instead of queueing up as separate projects.',
        ],
      },
      {
        heading: 'What Lionshead adds: the implementation layer',
        paragraphs: [
          'The Lionshead Village geo-snowmelt work is where planning meets practice, and it breaks into four distinct pieces worth naming separately.',
          'Coalition building comes first. A snowmelt district crosses property lines, so the town, lodging owners, and the utility have to agree on scope and benefit before anyone sizes a pump.',
          'Retro-commissioning comes before new plant. Tuning controls, setpoints, and existing distribution reduces the load the network has to carry. Skipping that step is how districts end up paying for capacity they never needed.',
          'Hybrid design keeps the rare extreme hours off the electric plant, following the same 50/90 discipline that lets a campus loop stay small.',
          'Ownership is the fourth piece and the one most often deferred. Utility thermal energy network, or UTEN, models are evolving nationally, and deciding early who owns the loop, who bills for it, and who expands it keeps a project from stalling once the engineering is finished.',
        ],
      },
      {
        heading: 'What other ski towns should take',
        paragraphs: [
          'A thermal energy network is not only a heating plant. It is a demand-response and power-factor tool for the local grid, and it is usually the highest-efficiency path available when heating and cooling happen at the same time.',
          'Towns that treat snowmelt as an isolated electrification project will keep buying peaks. Towns that put snowmelt on a shared thermal highway can harvest, move, and reuse the energy their buildings and process loads already create.',
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
          'Beneficial electrification is the challenge of the decade, and the fastest way to do it badly is to swap gas plant for air-source heat pumps with electric resistance backup sized for every building’s worst hour.',
          'Capacity markets already show what unconstrained winter and summer peaks cost. Geothermal heat pumps and networked systems see far smaller electric spikes, because they never lose capacity to defrost cycles the way air-source units do.',
          'The DOE puts the national stakes clearly: at scale, summer and winter peak reductions measured in gigawatts translate into tens of billions of dollars in avoided grid-system cost. The local version is simpler. A campus or district sharing an ambient loop installs far less coincident electric capacity than the sum of standalone conversions.',
        ],
      },
      {
        heading: 'Diversity is a capacity resource',
        paragraphs: [
          'Load diversity means the coincident, or simultaneous, heating and cooling loads within a building or campus. The sum of what buildings need at the same moment is always lower than the sum of their individual peaks, and an ambient temperature loop is what lets an owner capture the difference.',
          'Offices rejecting heat while residences call for heat are solving each other’s problem on the same pipe. At Colorado Mesa University, a district system in place of isolated plant delivers roughly 650 kW of demand reduction, with electric service needs falling from about 784 kW to roughly 185 kW.',
          'Part-load reality sharpens the point. Most of the year sits well below peak, and pump affinity laws mean running lower flows for thousands of hours cuts friction and power dramatically. Designing for the peak hour alone oversizes pipe, pumps, and interconnection for hours that barely exist.',
        ],
      },
      {
        heading: 'Storage, hybrids, and demand response',
        paragraphs: [
          'On a thermal energy network, the borefield’s job shifts from being purely a source and sink toward being storage. Heat rejected into the ground can be recovered later.',
          'Hybrid peaking covers what storage and diversity cannot. Under the 50/90 rule, roughly 90% of annual hours sit under 50% of peak load while true peak occupies on the order of hours in a year, so boilers or towers can handle those rare extremes and the electric plant never has to be sized for them.',
          'Operationally, networked campuses have shed load campus-wide with a single control action during a peak event. That is demand response without asking every building to invent its own curtailment plan.',
        ],
      },
      {
        heading: 'What to ask before you size the service',
        paragraphs: [
          'Before accepting a utility upgrade as the price of decarbonization, ask three questions. Can these buildings share a thermal backbone? Have diversity and storage been modelled against the true coincident peak rather than the summed peak? And have existing thermal resources, including wastewater, process heat, snowmelt return, and irrigation, been counted at all?',
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
          'Weber State University’s climate commitment originally set carbon neutrality for 2050. The retrofit has performed so well, and the resulting system is efficient enough, that the university has since moved that target forward to 2040.',
          'The practical plan was efficiency first, then renewables, with savings recycled through a revolving green fund. The fund began as an internal loan on the order of $5 million at low interest, repaid against a fixed annual utility budget. That financing spine matters as much as the mechanical story, because every dollar of avoided utility spend becomes the funding for the next retrofit.',
        ],
      },
      {
        heading: 'Why water-source heat pumps won',
        paragraphs: [
          'The mechanical roadblock was familiar. Efficient VAV reheat still leaned on steam or building boilers, so no amount of tuning let a building leave the fuel behind.',
          'Air-source heat pumps decoupled buildings from steam but lost efficiency at temperature extremes and shortened equipment life. In a climate with real winters, that is the wrong trade.',
          'Water-source heat pumps offered a third path. They could reuse the chilled-water loop already buried across campus, provided the university was willing to treat that loop as a thermal energy network instead of a one-way cooling pipe.',
        ],
      },
      {
        heading: 'Turning a chilled-water loop into a source and a sink',
        paragraphs: [
          'Two terms make the rest of this legible. A source is a place to absorb energy from. A sink is a place to reject energy to.',
          'A conventional chilled-water loop is only ever a sink, because buildings do nothing but dump heat into it. Retrofitting buildings with water-source heat pumps lets them both reject energy to the loop and absorb energy from it, so the chilled-water loop becomes a source and a sink at once. In summer it still absorbs; in winter it supplies. Buildings begin trading heat with each other through distribution that was already in the ground.',
          'Doing this slowly and sequentially is what allows steady progress. Retrofits tie into the return, driver buildings are isolated or converted in turn, and the campus never has to take the whole system down to move forward.',
        ],
      },
      {
        heading: 'Adding ground source over time',
        paragraphs: [
          'Geothermal came later, and it came incrementally. Ground-source fields precondition the loop and eventually dominate its conditioning, so the central plant can recede into a backup role rather than run as the primary source of heat.',
          'That sequence is why the timeline compressed. Once the thermal backbone is in the ground, adding capacity is cheap and carbon-neutrality dates move left.',
        ],
      },
      {
        heading: 'Outcomes you can take to a board',
        paragraphs: [
          'Since 2010, $30 million has been saved in avoided utility costs, including roughly $3.5 million in a single recent year.',
          'The plant-level numbers are just as stark. January central-plant fuel costs fell from on the order of $12,800 per month before the heat pumps and central loop to about $2,700 after startup.',
          'Campus-wide, average energy use intensity dropped from roughly 125 kBtu/sf/yr to under 60. Electricity use, natural gas use, and overall energy consumption and cost have each fallen by more than 50%, and the campus achieved that while adding hundreds of thousands of square feet.',
          'The living-laboratory framing is deliberate. Students watch the technology operate on their own campus before they design the next one.',
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
          'Its limits all trace back to a single design choice: relying on the ground alone. Every ton of peak capacity has to be drilled for, which means high upfront cost, large land area, and strong dependence on local ground properties. On a constrained downtown block, those limits end the conversation before it starts.',
          'District-scale work needs a different frame. On the Thermal Highway©, buildings, sources, and storage trade usable energy across a shared ambient loop instead of each site drilling for its own peak. The ground stays in the picture as a thermal battery, but it becomes one asset among several rather than the whole system.',
          'That shift is what brings capital cost and land requirements down. Diversity becomes a resource across coincident hours, across days, and across seasons, and the network’s first job is to harvest, move, and reuse the energy a site already produces before it buys new plant.',
        ],
      },
      {
        heading: 'Hybrid systems: hours under 50% are most of the year',
        paragraphs: [
          'The 50/90 rule is the design discipline behind hybrid thermal energy networks: roughly 90% of annual hours sit under 50% of peak load, while true peak occupies on the order of hours in a year.',
          'So size geo-exchange and multi-source assets for the long middle of the year, and let boilers, towers, or other peaking plant cover the rare extreme. That is how campuses cut borehole footage per ton without pretending peaks never happen.',
          'Which sources are available is entirely site-specific. Park City evaluations map downtown, Bonanza Park, and Quinns against wastewater, mine water, geo-exchange, and drinking-water source-protection constraints. Vail and Carbondale show the same pattern: inventory every thermal liability that could become an asset before defaulting to more holes in the ground.',
        ],
      },
      {
        heading: 'Why multisource beats “more geo” alone',
        paragraphs: [
          'Multi-building, multi-source networks consistently show higher performance and lower first cost than isolated geo fields sized for every ton. Capital intensity falls when the loop carries diversity and waste heat, and peak electric demand falls when the network, rather than electric resistance, handles the coldest and hottest hours.',
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
          'Field economics from operating networks make the gap visible. A campus comparison showing 217 borehole feet per installed ton for standalone geo-exchange versus about 84 feet per ton on an ambient loop is not a curiosity. It is roughly a 62% reduction in field capital intensity for the same connected load class.',
        ],
      },
      {
        heading: 'What the operating ledger already proved',
        paragraphs: [
          'Colorado Mesa University’s cumulative energy savings above $16 million since 2008, and Weber State’s $30 million in avoided utility costs since 2010, are lifecycle arguments written in cash.',
          'Water savings measured in millions of gallons per year and electric demand cuts measured in hundreds of kilowatts show up twice: once as operating cost, and once as infrastructure a utility never had to build.',
          'Incentives move year-zero math as well. When a project already qualifies for a substantial federal investment tax credit, borehole cost can be partially or fully offset. That sometimes makes the geothermal path the lowest first-cost option in addition to the lowest lifecycle option.',
        ],
      },
      {
        heading: 'Cost stacks that fool a spreadsheet',
        paragraphs: [
          'Network spending breaks into five stacks with unit costs that differ by an order of magnitude: geo-fields, network distribution, network mechanicals, interior heat pumps, and behind-the-meter building retrofits.',
          'The expensive mistake is funding the wrong stack. Overbuild the fields because diversity was ignored, or underbuild the loop so phase two strands phase one, and the option that looked cheapest on bid day becomes the most expensive asset on the campus.',
          'The same logic scales down to a single house. In coal-impacted communities, stacked incentives including energy-community bonuses can drop a homeowner’s out-of-pocket cost far below sticker. Incomplete incentives and incomplete peaks are what make conventional plant look cheap.',
        ],
      },
      {
        heading: 'What a capital committee needs to see',
        paragraphs: [
          'A business case that survives scrutiny shows four things: coincident peaks rather than summed peaks, operating cost under realistic utility rates, maintenance and replacement across the full asset life, and a clear path to add load or sources later without stranding what gets built now.',
          'With those in one model, the expensive network usually pencils and the cheap plant stops looking cheap. A properly implemented network can carry a higher capital cost and still save millions of dollars over the life of the system.',
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
    readTime: '5 min read',
    body: [
      {
        heading: 'Start with why, then build the sequence',
        paragraphs: [
          'Starting with why is not a slogan. Owners who skip the challenge framing, meaning peak electric demand, gas dependency, water use, and the limits of building-by-building electrification, end up buying equipment instead of building a network.',
          'The concepts are the straightforward part: ambient loops, heat pumps, building-level heat trading, hybrid 50/90 sizing, and load diversity. Implementation is the sequence that makes them real.',
          'A workable path runs in order. High-level feasibility, then characterization of the existing built environment, then hydrogeology and resource mapping, then design with multi-source assets in mind, then drilling by teams who have done it before, then commissioning that defends design intent through startup.',
        ],
      },
      {
        heading: 'Evaluate the place, not a generic tonnage',
        paragraphs: [
          'Park City’s evaluation work is a useful pattern. Treat districts separately, in that case downtown, Bonanza Park, and Quinns. Then map building stock and HVAC compatibility. Then rank the available resources: wastewater, mine water, geo-exchange, and the source-protection zones that rule some options out entirely.',
          'A recommendation only lands once a site’s liabilities and its assets sit on the same map.',
          'Retro-commissioning belongs early in that sequence. Cleaning up controls, setpoints, and envelope performance reduces the tons the network has to carry. Designing a network around existing waste is how projects oversize fields and underdeliver savings.',
        ],
      },
      {
        heading: 'Design, drill, and commission as one chain',
        paragraphs: [
          'Design starts with designer experience, thermal response testing, building efficiency first, and explicit consideration of every source and sink a site can offer.',
          'Drilling demands rig size and technology matched to the geology, and drillers who have completed comparable fields.',
          'Commissioning closes the chain with design reviews, installation reviews, and system testing, so the sequences and setpoints actually running the buildings match the ones that were modelled.',
          'Skip any link and the result is a competent drawing set that underperforms in the field. Keep the chain intact and the network can expand building by building without ever restarting the backbone.',
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
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Every serious thermal network conversation eventually reaches the same three questions: who finances it, who owns it, and who operates it. Public entities, utilities, and third parties can each play those roles, and mixing them without a clear model is how projects stall after the engineering looks finished.',
          'Utility thermal energy network, or UTEN, discussions are evolving nationally for a reason. A shared ambient loop is infrastructure, not equipment. It needs a durable owner, a rate or cost-recovery path, and an operator accountable for loop temperatures, expansion, and customer participation. A one-off construction contract supplies none of those.',
          'Three models dominate. Each one trades a different advantage for a different risk.',
        ],
      },
      {
        heading: 'The public or municipal owner',
        paragraphs: [
          'A public owner can align the network with goals and assets a community already holds. Snowmelt plants, wastewater treatment, libraries, and recreation centers are precisely the thermal sources and sinks a loop wants, and they are already on the public books.',
          'The trade is balance-sheet exposure. The municipality answers for capital and for long-term operations and maintenance, usually with no rate base to spread it across. Billing, expansion, and performance decisions land with staff who may never have run a utility before, so operating capability has to be built or contracted deliberately.',
        ],
      },
      {
        heading: 'The utility owner',
        paragraphs: [
          'A utility owner can fold thermal networks into integrated energy planning and rate design, which is why Clean Heat and related proceedings in states like Colorado matter well beyond their borders. Cost recovery through rates is the most durable funding path available, and utilities already run metering, billing, and around-the-clock operations.',
          'The trade is pace and precedent. Regulated capital moves on regulatory timelines, and a tariff for a thermal service that did not exist five years ago has to be built before the first customer connects. Where that work is already underway, the utility model is usually the fastest route to a network that can keep expanding for decades.',
        ],
      },
      {
        heading: 'The third-party owner',
        paragraphs: [
          'A third-party owner moves fastest on development and carries performance risk on its own balance sheet. That suits a campus or private district that would rather buy heating and cooling as a service than operate a plant.',
          'The trade is interface complexity. Billing, interconnection, expansion cost allocation, and end-of-term ownership all have to be contractually explicit, because no regulator is backstopping the relationship when a phase costs more than the model predicted.',
        ],
      },
      {
        heading: 'Settle the model before the next RFP',
        paragraphs: [
          'Whichever model fits, the answers belong on paper before the next consultant or EPC solicitation. Write down who owns the thermal backbone across every phase, how costs are recovered, who decides when disciplines disagree about loop temperatures or peaking strategy, and who stays through startup to defend the sequences.',
          'Customer participation rules belong in the same document: who can connect, on what terms, and how the buildings that join first avoid stranding the ones that join last.',
          'None of that is bureaucracy layered onto engineering. It is the condition that lets a multisource network actually get built, billed, and expanded.',
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
          'For legislators, regulators, and staff working elsewhere, that is the useful part. Not the bill numbers, but which levers produced the shift and in what order. Four of them did most of the work.',
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
          'As of January 1, 2026, Colorado enforces ultra-low NOx emission standards under House Bill 23-1161. Compliant gas equipment can cost on the order of 40% to 80% more than what it replaces, with fewer models available.',
          'The effect is subtle and powerful. Every boiler and furnace replacement becomes a genuine comparison between gas and a heat pump rather than an automatic like-for-like swap. Air-quality rules and decarbonization goals end up pulling in the same direction without either one mandating a technology.',
          'Local and municipal authority, technical interoperability, and worker-transition expectations sit alongside those equipment rules. Policy is not only a rebate sheet. It is a constraint set on what a replacement is even allowed to be.',
        ],
      },
      {
        heading: 'Lever three: stack incentives so year zero pencils',
        paragraphs: [
          'The Colorado Energy Office administers grant programs and state heat-pump tax credits worth hundreds to a couple thousand dollars per unit or per ton, with contractor pass-through requirements so the money reaches the customer. Nonresidential ground-source support has included substantial per-project caps and annual program funding measured in tens of millions of dollars.',
          'Those state dollars layer on top of federal commercial geothermal credits under the ITC and PTC framework, which carry base rates plus bonus adders for prevailing wage, apprenticeship, and energy communities. In coal-impacted communities, the full stack can cut out-of-pocket cost by tens of thousands of dollars on a single residential system.',
          'Stackability is the design principle worth exporting. A state incentive built to layer cleanly onto federal credits does considerably more per dollar than a larger standalone rebate.',
        ],
      },
      {
        heading: 'Lever four: settle ownership alongside the incentives',
        paragraphs: [
          'Colorado’s proceedings treat ownership as a policy question rather than leaving it to each project to improvise. Whether a network is owned by a public entity, a utility, or a third party determines who bills customers, who funds expansion, and who is accountable for performance.',
          'States that answer that question early avoid a familiar failure mode, where a technically sound network stalls because nobody has authority to own it.',
        ],
      },
      {
        heading: 'What this adds up to for other states',
        paragraphs: [
          'The lesson is not that Colorado’s specific statutes are right for every state. It is that thermal energy networks scale when statutes, utility regulation, equipment standards, and incentives all point the same direction as the engineering. Any single lever produces pilots. All four together produce infrastructure.',
          'For practitioners already working in states that are moving, treat policy as part of schematic design. Map utility participation early, price emissions-compliant gas replacements honestly, and model state plus federal incentives before comparing capital costs.',
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
          'At the deep end, conventional hydrothermal resources, enhanced geothermal systems (EGS), and advanced closed-loop concepts reach hot rock to generate electricity. At the shallow end, building geo-exchange and thermal energy networks use the near-surface ground as a source and a sink for heating and cooling buildings. Campus central plants sit between them.',
          'The interesting engineering is at the seam. Blend deep geothermal with shallow geothermal and a single site can produce heating, cooling, and electricity, with each system making the other cheaper.',
        ],
      },
      {
        heading: 'Why the deep end is suddenly relevant',
        paragraphs: [
          'EGS methods, illustrated by research sites such as Utah FORGE and by commercial developers working fractured or geopressured reservoirs, target hot rock where natural permeability is lacking. Advanced closed-loop concepts chase the same heat with less dependence on reservoir conditions.',
          'All of them generate electricity, and all of them reject a great deal of heat in the process. That thermal exhaust is the part worth capturing.',
        ],
      },
      {
        heading: 'Why coupling power and thermal works',
        paragraphs: [
          'The two systems want opposite things, which is exactly why they pair well. A geothermal power plant wants stable baseload output. A thermal energy network wants clean, flexible thermal conditioning.',
          'Waste heat from power production can cover a large share of a district’s heating need, which lowers the network’s first cost and shrinks the borefield it would otherwise require. The benefit runs both directions, because reducing the cooling burden at the power plant improves its electric output.',
          'Geology and climate decide where the pairing is attractive. Cold districts with heating-dominated loads are the natural candidates, which is why mountain-town studies that already inventory snowmelt, wastewater, and civic loads are where adding a deep resource most changes the optimization.',
        ],
      },
      {
        heading: 'Precedents, not science fiction',
        paragraphs: [
          'Combined power and district heating is decades old. Iceland’s Svartsengi plant paired tens of megawatts electric with hundreds of megawatts thermal for district heat. Austria’s Altheim project paired roughly 1 MW electric with about 9 MW thermal of district heating, with documented CO₂ reductions and strong project economics.',
          'Newer work points the same direction. Cornell’s low-temperature deep EGS research and Delft’s deep direct-use doublet paired with shallow storage both pursue the same integration.',
          'The open question for districts in the United States is when geology, electricity offtake, and thermal load together justify shared infrastructure. Where they do, treating power and thermal as separate silos leaves both money and megawatts on the table.',
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

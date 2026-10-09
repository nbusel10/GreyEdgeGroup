import { site } from './images'

export interface InsightSection {
  heading?: string
  paragraphs: string[]
}

export interface InsightLink {
  label: string
  to: string
}

export interface InsightSource {
  /** Citation text. The article page numbers these in order. */
  citation: string
  href?: string
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
  /** Numbered sources. Mark call sites in body prose as [1], [2]. */
  sources?: InsightSource[]
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
 * - The 50/90 rule: approximately 50% of peak heating or cooling capacity can serve
 *   approximately 90% of annual operating hours. Peaking equipment covers the hours
 *   above that. Keep that phrasing consistent.
 * - Cross-references to other articles belong in `relatedLinks`, not in body prose.
 */
export const insights: Insight[] = [
  {
    slug: 'colorado-mesa-university',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Colorado Mesa University: what a campus ATL delivers',
    summary:
      'One of the first campus ambient loops in the country, CMU’s network shows how load diversity and hybrid system design can reduce utility demand across approximately 1.6 million square feet of connected campus buildings.',
    image: site['insight-cmu'].src,
    imageAlt: site['insight-cmu'].alt,
    to: '/insights/colorado-mesa-university',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Colorado Mesa University did not set out to build a campus thermal energy network. The system began with Dominguez Hall, which the university started planning in 2007 and equipped with a geothermal heat-pump system in 2008. Following the success of that installation, the university committed to connecting newly constructed campus buildings to the growing network.',
          'An ambient temperature loop, or ATL, delivers heating and cooling through a shared network of underground pipes. Buildings connect to that loop, and the loop connects to energy sources and sinks. A source is a place to absorb energy from. A sink is a place to reject energy to. At CMU those assets include solar thermal systems, wastewater heat exchangers, and other thermal resources.',
          'By 2012 the ATL was carrying campus heating to primary structures. Today roughly 79% of the campus, exceeding 1.6 million square feet, is connected across five micro districts. Expansion plans aim to roughly double the area served by the ATL by 2030.',
        ],
      },
      {
        heading: 'Hybrid by design: the 50/90 rule',
        paragraphs: [
          'Geothermal systems do not meet CMU’s heating and cooling demand on their own. Thermal resources, load shifting, and existing infrastructure share the work in a hybrid system sized to how the campus actually runs. Roughly 90% of annual hours sit under 50% of peak load, while true peak occupies on the order of hours in a year.',
          'Sizing for those ordinary hours, instead of stacking every peak the equipment might see, lets renewable and more efficient resources cover around 90% of energy needs. Geo-exchange, hydronic heat exchangers, and load shifting meet the primary thermal demand during approximately 90% of operating hours. Boilers, chillers, and other dispatchable resources supplement the system during higher-load periods.',
          'Those boilers and chillers run infrequently. Keeping them lets more costly assets, such as borefields, be sized down, and it leaves overhead for demands the campus has not yet placed on the system.',
          'Against an appropriately sized conventional chiller-and-boiler plant for this campus, the ATL shows 650 kW of demand reduction, 1.3 GWh of annual energy savings, about 58,000 Dth of natural gas avoided, and roughly 10 million gallons of cooling-tower water saved each year.',
        ],
      },
      {
        heading: 'CapEx reductions through load shifting',
        paragraphs: [
          'The largest capital cost in a geo-exchange system is drilling and placing the borefield. That cost varies substantially with ground conditions and design requirements. For the same campus-scale cooling load, a standalone geo-exchange system would have required approximately 217 vertical feet of borehole per installed ton. CMU’s ATL reduced that requirement to approximately 84 feet per ton, a 62% reduction in borehole length per unit of capacity.',
          'Electric demand moved in the same direction, from 784 kW under conventional operation to about 185 kW on the ATL. The reduction at CMU depends on system boundaries and operating conditions, so these values should not be treated as universal.',
          'They do show how an ATL lowers the electrical burden of heating and cooling. Connected loads share thermal energy, and heat pumps run against moderate loop temperatures. Pumping capacity is matched to actual demand, which lowers peak demand and, when that pattern holds, electricity use.',
        ],
      },
      {
        heading: 'What the operating ledger shows',
        paragraphs: [
          'Annual energy savings reached approximately $1.5 to $2 million in recent years, with cumulative savings above $16 million since 2008. Electricity is part of that reduction. Most of the savings come from the steep cut in natural gas use, which also avoids roughly 18,000 metric tons of CO₂e each year.',
          'The lesson for other campuses is not to copy CMU’s pipe design and borefield layout. It is to build a system that keeps paying off as new buildings and assets join the network. Size renewable resources around the loads that occur most of the year, and reserve peaking equipment for the few hours that matter. Load diversity—simultaneous heating and cooling loads across the campus—multiplies the value of each new connection.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
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
      'For mountain communities, snowmelt can be one of the largest and most difficult municipal heating loads to decarbonize. Vail, Colorado’s thermal energy network study shows how heat pumps, shared thermal resources, and existing peaking equipment can reduce natural gas use while limiting the electrical demand created by electrification.',
    image: site['insight-mountain-town'].src,
    imageAlt: site['insight-mountain-town'].alt,
    to: '/insights/mountain-town-decarbonization',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Mountain communities rely on large snowmelt systems for pedestrian access, public operations, and winter mobility. Those systems can dominate municipal fuel demand. In Vail, Colorado, snowmelt accounts for about 80% of the town’s municipal natural gas consumption, and it is the largest emissions source inside the municipal boundary.',
          'Replacing that load directly with an electric resistance snowmelt system would end on-site combustion. Electric resistance heating turns electricity straight into heat, so the full thermal demand would move onto the electrical grid. That shift is impractical, because the town would have to pay to dramatically increase electrical service capacity and distribution.',
          'A more practical path starts with the load itself. Snowmelt systems can use less energy through improved zoning, slab-temperature controls, setpoint optimization, and targeted improvements to heated surfaces.',
          'Peak thermal capacity and annual thermal energy should be evaluated separately. Equipment has to be sized for a demanding combination of snowfall, outdoor temperature, wind, and surface conditions. Annual energy use depends on how often and how long the system is melting or idling.',
          'Cutting unnecessary load before adding generation or distribution capacity lowers energy use. It also shrinks the infrastructure required to serve the remaining peak.',
        ],
      },
      {
        heading: 'Winter peak demand and efficient electrification',
        paragraphs: [
          'Winter electrification also depends on the equipment chosen. Heating demand rises as outdoor temperatures fall. An air-source heat pump, a common electrification choice, loses efficiency quickly under those same cold, high-demand conditions.',
          'Ground-source equipment uses stable temperatures deep in the earth, but it can be costly to build on its own. Heat recovery changes the economics. A wastewater heat exchanger, solar thermal, and moving thermal loads between buildings greatly reduce the energy required to meet demand. They reduce capital cost as well.',
          'A hybrid of ground-source equipment and those recovery systems restricts dispatchable resources, such as boilers and heaters, to peak conditions.',
          'That matters in a mountain community. Fully replacing existing equipment is not always the most economical choice, and it is not always the choice that treats the grid most carefully. Water-source heat pumps and recovered thermal energy can serve the loads that recur. Existing boilers and other dispatchable equipment stay available for short peaks, unusual weather, or an equipment outage.',
          'Thermal storage, typically a vertical borefield, can further reduce the peak equipment the network needs. The field supplies heat to the network or rejects heat from it. Depending on the geology, it can act as a thermal battery, storing energy across seasons until the town needs it.',
        ],
      },
      {
        heading: 'What Vail’s study shows',
        paragraphs: [
          'Vail’s experience shows that no single thermal resource has to carry the full system load. Load reductions, water-source heat pumps, waste-heat recovery, and thermal storage can meet routine demand, while existing equipment remains available for peak conditions and backup.',
          'This approach can reduce natural gas consumption without simply replacing a large thermal peak with an equally large electrical peak.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
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
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Diversity and the 50/90 rule', to: '/insights/multisource-networks' },
      { label: 'Pumping energy', to: '/insights/pumping-energy' },
    ],
  },
  {
    slug: 'weber-state-four-pipes',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Four pipes to two: Weber State University’s thermal energy network retrofit',
    summary:
      'Weber State converted a four-pipe campus system to a two-pipe loop over time, funded by a revolving green fund. Efficiency, electrification, and geo-exchange moved the carbon-neutrality target from 2050 to 2040.',
    image: site['insight-weber-state'].src,
    imageAlt: site['insight-weber-state'].alt,
    to: '/insights/weber-state-four-pipes',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Weber State University shows how an existing campus energy system can be converted over time, rather than in a single full-scale replacement. The university originally set a goal of carbon neutrality by 2050. The plan focused on emissions from the traditional four-pipe district system, and the path was a retrofit.',
          'The university did not start by replacing the central plant and the distribution system. It reduced building energy use first, then electrified the buildings, and then added renewable resources to support the campus network. As those projects progressed, the carbon-neutrality target moved forward to 2040.',
        ],
      },
      {
        heading: 'Four pipes to two',
        paragraphs: [
          'A traditional four-pipe campus system uses a chilled-water loop for cooling and a steam system for heating. Weber State converted that arrangement, over time, into a two-pipe system. The chilled-water loop and water-source heat pumps now provide both heating and cooling.',
          'Campus operations continued while individual buildings were retrofitted onto the chilled-water loop.',
        ],
      },
      {
        heading: 'A revolving green fund',
        paragraphs: [
          'A revolving green fund carried a major part of the strategy. The retrofit began with an internal loan of approximately $5 million at a low interest rate. Energy-efficiency projects funded by that loan reduced annual utility costs. The avoided cost was returned to the fund and used to pay for the next projects.',
          'The university could therefore improve buildings and infrastructure in phases. The full cost of campus decarbonization did not have to be raised at once. As later projects produced savings, those savings supported the next phase of work.',
        ],
      },
      {
        heading: 'Geo-exchange added over time',
        paragraphs: [
          'Geo-exchange was added as more buildings were converted. Ground heat exchangers give the campus loop another way to add or remove energy, and they reduce dependence on the central boilers and chillers. As that capacity grows, the central plant runs less often and serves more as backup and peaking.',
          'That shift drove the carbon reduction. The phased approach let the university add renewable thermal capacity as funding and construction opportunities appeared, rather than installing the final configuration at the start.',
        ],
      },
      {
        heading: 'What the results show',
        paragraphs: [
          'The results are cumulative. Since 2010, Weber State has reported more than $30 million in avoided utility costs, including approximately $3.5 million in 2024 alone.',
          'Winter central-plant fuel costs fell from approximately $12,800 per month to approximately $2,700 per month after startup. Campus-wide energy use intensity fell from approximately 125 kBtu/sf/yr to below 60, while the campus continued to add building area.',
          'Natural gas consumption, electricity use, energy costs, and greenhouse-gas emissions have also fallen as the retrofit has progressed.',
        ],
      },
      {
        heading: 'A practical path',
        paragraphs: [
          'Weber State’s experience shows that converting an existing district system can proceed without replacing the whole system in one project. Improving building efficiency, recycling utility savings, reusing distribution pipe already in the ground, converting buildings in phases, and adding geo-exchange over time is a practical path from a traditional four-pipe system to a lower-temperature thermal energy network.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'From first cost to long-term value', to: '/insights/lifecycle-cost' },
      { label: 'Implementing TENs', to: '/insights/implementing-tens' },
      { label: 'Weber State project page', to: '/projects/weber-state-university' },
    ],
  },
  {
    slug: 'multisource-networks',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Diversity and the 50/90 rule',
    summary:
      'The coldest or hottest hour can size an entire heating and cooling system, even when it lasts only a small part of the year. Diversity and the 50/90 rule size a thermal network for how buildings actually run across all 8,760 hours.',
    image: site['insight-50-90'].src,
    imageAlt: site['insight-50-90'].alt,
    to: '/insights/multisource-networks',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'The coldest or hottest hour of the year can set the size and cost of an entire heating and cooling system, even when that condition lasts only a small part of the year. Traditional HVAC and geo-exchange systems are often designed around that peak so capacity is there when it is needed most.',
          'That approach is reliable, and it can also produce oversized, overpriced equipment and infrastructure that run well below full capacity for most of the year.',
          'Diversity and the 50/90 rule are two design principles that follow how buildings and thermal systems actually run across all 8,760 hours of the year.',
        ],
      },
      {
        heading: 'Diversity',
        paragraphs: [
          'Heating and cooling are often needed in the same hour. That overlap is load diversity: simultaneous heating and cooling across a building or a group of buildings. A home, an office, a restaurant, a laboratory, and a recreation facility each follow a different schedule and call for different amounts of heat or cooling.',
          'Connected through an ambient temperature loop, or ATL, those differences become useful. A building that is rejecting heat can supply usable energy to a building that needs it.',
          'Serving both loads together reduces the new energy the network must add or remove. It also lowers the peak thermal load. That is one of the primary benefits of diversity.',
        ],
      },
      {
        heading: 'The 50/90 rule',
        paragraphs: [
          'The 50/90 rule asks how often a system actually runs near its maximum capacity. The power needed to heat or cool a building is its thermal load. Any given building rarely sits at its peak thermal load.',
          'As a general rule, approximately 50% of peak heating or cooling capacity can serve approximately 90% of annual operating hours. An ATL or thermal energy network can be sized around that 50% and still cover the bulk of operating hours and energy demand.',
          'Boilers, chillers, and other traditional equipment run when the whole system is above 50% of maximum load. Peak conditions are served by a combination of resources, so each part of the system is sized for the share of the load it is meant to carry.',
        ],
      },
      {
        heading: 'Why the borefield can be smaller',
        paragraphs: [
          'Together, these principles can sharply reduce the capital cost of a thermal energy network. In a traditional ground-source system, the borefield is commonly sized to supply or reject the energy required at peak. Drilling is often one of the largest project costs, so designing the field around a condition that lasts relatively few hours drives both capital cost and land area.',
          'A hybrid ATL that uses diversity and the 50/90 rule can reduce that requirement. Geo-exchange is combined with heat recovery, thermal storage, and conventional peaking equipment.',
          'The ground stays in the system. The borefield no longer has to do every job alone, and it can be used more as thermal storage.',
        ],
      },
      {
        heading: 'How capacity gets evaluated',
        paragraphs: [
          'Diversity and the 50/90 rule change how system capacity is evaluated. Design can follow how the system actually operates across the year, with peak equipment kept for the hours that need it.',
          'For ambient loops, thermal energy networks, and conventional geothermal systems, that approach can cut unnecessary infrastructure while keeping the equipment required to serve peak conditions reliably.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Multi-source ambient loops', to: '/insights/multi-source-ambient-loops' },
      { label: 'Pumping energy', to: '/insights/pumping-energy' },
      { label: 'Implementing TENs', to: '/insights/implementing-tens' },
    ],
  },
  {
    slug: 'pumping-energy',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Pumping energy in ambient temperature loops',
    summary:
      'Moving water through an ambient temperature loop can matter as much as producing the heat. Pipe size, pump selection, and part-load control decide whether the network’s efficiency shows up on the electric bill.',
    image: site['mechanical-room'].src,
    imageAlt: site['mechanical-room'].alt,
    to: '/insights/pumping-energy',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'A thermal energy network, or TEN, uses a circulating fluid to move energy between buildings and thermal resources. An ambient temperature loop, or ATL, is that kind of network. Producing heat efficiently is only half the job. Moving it efficiently matters just as much.',
          'Heat pumps and renewable thermal resources can raise efficiency compared with other heating and cooling systems. The network still depends on pumps to circulate water between buildings and those resources. If the pumps are oversized, or if they run at a higher flow than the load requires, the extra electricity can consume the gains those resources were meant to deliver.',
          'Pipe sizing, pump selection, system configuration, and control strategy therefore have a direct effect on the efficiency of an ATL.',
        ],
      },
      {
        heading: 'Flow only where it is needed',
        paragraphs: [
          'An ATL is typically arranged so each building, or a small group of buildings, can circulate water through its own heating and cooling equipment. The whole network does not have to run at one common flow rate.',
          'When a building can meet much of its heating and cooling internally, only a small flow has to pass between that building and the larger loop. When it needs more heating or cooling, more water is exchanged with the network.',
          'Pumps can then move water where it is needed, rather than pushing the maximum design flow through every part of the system. As demand shifts from building to building and across the year, the amount of water circulating in the network can change with it.',
        ],
      },
      {
        heading: 'Variable frequency drives',
        paragraphs: [
          'Variable frequency drives, or VFDs, are the main way to make that adjustment. A VFD changes the speed of a pump motor so the pump delivers more or less flow as conditions change.',
          'Slowing a pump cuts its electrical use faster than it cuts the amount of water moved. The pump affinity laws describe that relationship. The power a pump requires has a cubic relationship to pump speed.',
          'Under ideal conditions, operating a pump at about half speed can provide roughly half the flow while using only about one-eighth of the power.',
        ],
      },
      {
        heading: 'Part-load is most of the year',
        paragraphs: [
          'An ATL normally operates below its maximum heating or cooling requirement for most of the year. Slowing the pumps to the flow the system actually needs can sharply cut energy use.',
          'Full design flow may be required at peak. Those conditions are a limited share of annual operation. The relationship between variable flow and pumping power is why part-load control belongs in the design of an ATL.',
        ],
      },
      {
        heading: 'Move only the water the system needs',
        paragraphs: [
          'The aim is to avoid moving more water than the system requires. A well-designed ATL coordinates building pumps, microdistrict pumps, central-loop pumps, and the pumps on connected thermal resources so flow rises only when more energy has to move.',
          'Pumping energy is a fundamental design consideration. It can materially change the annual performance and operating cost of a thermal energy network.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Diversity and the 50/90 rule', to: '/insights/multisource-networks' },
      { label: 'Avoiding the grid upgrade', to: '/insights/peak-demand' },
    ],
  },
  {
    slug: 'multi-source-ambient-loops',
    category: 'Technical Education',
    level: 'Applied',
    title:
      'Multi-source ambient temperature loops: improving thermal network performance through resource diversity',
    summary:
      'An ambient temperature loop lets buildings and thermal resources exchange heat on one shared pipe. Geo-exchange, wastewater, surface water, solar thermal, and storage can serve the same network, and the loop can draw on whichever resource is available.',
    image: site['growth-flexibility'].src,
    imageAlt: site['growth-flexibility'].alt,
    to: '/insights/multi-source-ambient-loops',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'An ambient temperature loop, or ATL, is a thermal energy network that lets connected buildings and energy resources exchange heat through one shared water pipe. A conventional district system distributes steam, hot water, or chilled water. An ATL uses one water loop held near ambient temperature, and heat pumps at each building draw heat from that loop or reject heat to it.',
          'That architecture suits a multi-source system. Geo-exchange, wastewater, surface water, solar thermal, heat rejected by buildings in cooling, process waste heat, thermal storage, and other resources can all feed the same network.',
          'One engineering advantage is resilience. The loop can recover heat internally and call on different external resources as they are available, rather than depending on a single source [1], [2].',
        ],
      },
      {
        heading: 'System architecture and thermodynamic rationale',
        paragraphs: [
          'A defining feature of an ATL is heat moving between connected buildings. A building in cooling rejects heat into the loop. A building that needs heat can take it back out. That exchange reduces the external heating and cooling capacity the network has to provide [1], [2].',
          'Mixed-use districts are a strong fit. Offices, homes, hotels, retail, and data centers often heat and cool on different schedules.',
          'Load diversity—simultaneous heating and cooling across the district—turns that difference into a resource. The more those loads coincide in a useful way, the more heat the network can recover internally.',
          'Geo-exchange fits the same architecture. A source is a place to absorb energy from. A sink is a place to reject energy to. A borefield can be a source in the heating season and a sink in the cooling season. It can also store heat across seasons, shifting summer heat the network does not need into winter [1], [3].',
        ],
      },
      {
        heading: 'Performance drivers and integration constraints',
        paragraphs: [
          'Not every available thermal resource is equally useful. The value of a source or sink depends on its temperature, flow, availability, timing, reliability, pumping energy, and installation cost.',
          'Source temperature affects how the heat pumps and heat exchangers perform. A warmer source is easier to use for heating, often without extra equipment between the resource and the loop. Temperature does not set capacity by itself. Enough flow has to be available for the heat to move.',
          'That distinction matters for wastewater and surface water. A stream or a sewer may hold substantial thermal energy across a year and still offer limited capacity in the hours it is needed most [4].',
          'The ATL is the shared hydraulic and thermal platform that combines these resources. The network can select the resource that fits the operating condition, rather than asking one resource to meet every load.',
        ],
      },
      {
        heading: 'Design implications and limitations',
        paragraphs: [
          'A multi-source ATL succeeds or fails on controls and sequencing. A system sized for a specific set of needs can miss its intent if the controls do not monitor and regulate those resources.',
          'The controls are more complex than a single-source plant. They are also what keeps the network flexible. If one resource becomes unavailable, the others can hold the loop in an acceptable range.',
          'A borefield can carry the base exchange while another resource corrects a seasonal imbalance. Storage can move energy from one period to another. Peaking equipment can stay reserved for short-duration conditions, rather than supplying a large share of annual energy. Assigning those roles is how an ATL raises efficiency and keeps its resilience.',
          'Each added resource should earn its place with a clear thermal job. A useful one may shrink the borefield, improve the ground’s annual thermal balance, cut cooling-tower runtime, limit combustion-based peaking, or reduce electrical demand in critical hours.',
          'Taken together, buildings and external resources operate as one system. Recovering heat inside the network, and choosing resources by temperature, flow, timing, and availability, lowers the external capacity required. Those same choices improve thermal balance and leave peaking equipment for short-duration loads.',
        ],
      },
    ],
    sources: [
      {
        citation:
          'H. Oh and K. Beckers, Cost and Performance Analysis for Five Existing Geothermal Heat Pump-Based District Energy Systems in the United States, NREL/TP-5700-86678, National Renewable Energy Laboratory, July 2023, Executive Summary and secs. 1–5.',
        href: 'https://www.nrel.gov/docs/fy23osti/86678.pdf',
      },
      {
        citation:
          'E. Zanetti, D. Blum, and M. Wetter, “Control Development and Sizing Analysis for a 5th Generation District Heating and Cooling Network Using Modelica,” Lawrence Berkeley National Laboratory, 2024, secs. 2.1.7, 3.3, and 4.',
      },
      {
        citation:
          'Trane, Central Geothermal Systems, Application Manual SYS-APM009D-EN, Apr. 8, 2026, pp. 10–35 and 46–117.',
      },
      {
        citation:
          'H. Nagpal, J. Spriet, M. K. Murali, and A. McNabola, “Heat Recovery from Wastewater—A Review of Available Resource,” Water, vol. 13, no. 9, art. 1274, Apr. 29, 2021.',
        href: 'https://doi.org/10.3390/w13091274',
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Diversity and the 50/90 rule', to: '/insights/multisource-networks' },
    ],
  },
  {
    slug: 'lifecycle-cost',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'From first cost to long-term value',
    summary:
      'A low bid can become an expensive asset when the comparison stops at first cost. Energy, demand, water, maintenance, incentives, and electrical infrastructure decide which system is cheaper to own.',
    image: site['insight-first-cost'].src,
    imageAlt: site['insight-first-cost'].alt,
    to: '/insights/lifecycle-cost',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'A low bid can become an expensive asset when the comparison stops at first cost and leaves out the cost of owning the system.',
          'Capital committees are trained to compare first costs. An ambient temperature loop, or ATL, is built to operate for decades. When those two perspectives meet, the lowest bid can look like the obvious choice even when it is not the lowest-cost system to own.',
          'A complete comparison takes in the full lifecycle. Energy and demand charges, water use, maintenance, equipment replacement, financial incentives, and electrical infrastructure all belong in that account.',
          'For an ATL, that broader view matters because project economics depend as much on how the system is designed and sized as on the equipment selected.',
        ],
      },
      {
        heading: 'Diversity changes what must be built',
        paragraphs: [
          'An ATL connects buildings through a shared water loop. Heat pumps at each building add or remove heat to meet the load. The network can also move thermal energy among buildings and with external resources such as geo-exchange fields and wastewater heat exchangers.',
          'Sizing a separate system around each building’s peak can miss a primary advantage of a thermal energy network. Load diversity is simultaneous heating and cooling across the connected buildings. Those buildings do not all reach peak heating or peak cooling at the same time. In a mixed-use network, one building often rejects heat while another needs it.',
          'A properly modeled ATL uses the coincident network load and the long-term thermal balance. That is a different number from the sum of every building’s peak capacity.',
        ],
      },
      {
        heading: 'Operating evidence',
        paragraphs: [
          'Colorado Mesa University shows how these principles can perform at campus scale.',
          'A 2024 Department of Energy case study reported that the university’s geo-exchange system served approximately 1.2 million square feet, produced approximately $1.5 million in annual utility savings, and had accumulated approximately $15.9 million in savings since 2008.',
          'Xcel Energy estimated approximately 650 kW of demand reduction, 1.3 GWh of annual electricity savings, and 58,000 decatherms of annual natural gas savings relative to a modeled conventional system.',
          'These results should not be treated as universal performance factors. Utility rates, climate, building mix, thermal demand, controls, and ground conditions all change both the savings and the capital required.',
        ],
      },
      {
        heading: 'Incentives can change first cost',
        paragraphs: [
          'As of October 2026, qualifying commercial geothermal heat-pump projects remain eligible for the federal investment tax credit. Depending on project structure and compliance, state and local incentives may apply as well.',
          'Tax credits generally apply to a qualified tax basis. They do not attach automatically to every dollar spent on the thermal energy network. Ownership structure, which property is eligible, construction timing, labor requirements, domestic-content rules, and site qualification can all change the credit a project actually receives.',
          'The useful question is which project costs qualify, which incentives apply, and what the net capital requirement becomes.',
          'For now, tax credits can greatly reduce the up-front capital cost of an ATL. The larger financial case is the system’s longevity, its ability to expand as demand grows, and its resilience to climate uncertainty and rising utility costs.',
        ],
      },
      {
        heading: 'Beyond the construction bid',
        paragraphs: [
          'Evaluating an ATL means looking past the initial construction bid. Load diversity and coordinated design can reduce the infrastructure needed to serve the connected buildings. Operating savings and available incentives strengthen the long-term financial case.',
          'The comparison that holds up is the total cost, flexibility, and risk of owning the system over its useful life.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Colorado Mesa University', to: '/insights/colorado-mesa-university' },
      { label: 'Diversity and the 50/90 rule', to: '/insights/multisource-networks' },
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
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Drilling and thermal testing', to: '/insights/advanced-thermal-response-testing' },
      { label: 'Diversity and the 50/90 rule', to: '/insights/multisource-networks' },
      { label: 'Who owns the network', to: '/insights/governance-first' },
    ],
  },
  {
    slug: 'advanced-thermal-response-testing',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Understanding the ground: drilling and advanced thermal response testing',
    summary:
      'Two sites in the same region can hide different rock, groundwater, and thermal properties. Test drilling and an advanced thermal response test replace those assumptions with the measurements a borefield design needs.',
    image: site['service-ground'].src,
    imageAlt: site['service-ground'].alt,
    to: '/insights/advanced-thermal-response-testing',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'The performance and cost of a geo-exchange system depend on conditions hundreds of feet below the surface. Maps and surface observation cannot fully describe that ground. Two sites in the same region can meet different rock, groundwater movement, drilling conditions, and thermal properties.',
          'Test drilling and thermal response testing are therefore important steps for larger geo-exchange systems. They replace assumptions about the ground with site-specific information that can go straight into the design.',
        ],
      },
      {
        heading: 'What a test borehole tells you',
        paragraphs: [
          'A geothermal test borehole does two jobs. It shows how the site actually drills: the materials encountered, groundwater conditions, drilling rates, casing requirements, and the equipment or techniques construction is likely to need.',
          'A closed-loop ground heat exchanger can then be installed in the completed borehole and used to measure how the earth responds thermally.',
          'The drilling record also shapes the borefield layout. Where some intervals drill easily and others do not, fewer deeper boreholes, or a larger number of shallower ones, may be the more economical way to place the same length of pipe in the ground.',
        ],
      },
      {
        heading: 'Conductivity, diffusivity, and how the ground is used',
        paragraphs: [
          'Ground properties decide how the earth is used. Thermal storage uses the earth to hold energy for days, months, or seasons. Infinite draw treats the earth as a pure source or sink. A source is a place to absorb energy from. A sink is a place to reject energy to.',
          'Two properties matter most in geothermal design. Thermal conductivity describes the earth’s ability to move heat. Thermal diffusivity describes how quickly a temperature change propagates through the ground, which is especially important when the ground is used for storage.',
          'Those properties affect the number, depth, and spacing of boreholes, so they affect cost and long-term performance. Generic values can produce a borefield that is larger than necessary, or one that cannot hold acceptable operating temperatures over time.',
        ],
      },
      {
        heading: 'From a thermal response test to an advanced test',
        paragraphs: [
          'A thermal response test, or TRT, measures these properties in the field. Water is circulated through the installed ground loop while flow, entering and leaving water temperatures, and the heat added to the system are recorded. The test calculates thermal conductivity. A drill log is then used to estimate diffusivity.',
          'An advanced thermal response test, or A-TRT, extends that method with a computer model of the test borehole, a digital twin. The analysis can calculate thermal conductivity and diffusivity directly, rather than relying on an estimated diffusivity alone.',
          'The same model can describe the installed borehole, including grout characteristics and indications of groundwater movement. Those results inform how a geo-exchange system should be used.',
        ],
      },
      {
        heading: 'What this means on a network',
        paragraphs: [
          'The measurements matter most when geo-exchange joins an ambient temperature loop or a multi-source thermal energy network. On an ATL, the borefield can work with wastewater heat recovery, surface water, solar thermal, building heat recovery, and other resources. Depending on the ground, its role may be a heating and cooling resource or thermal storage.',
          'Test drilling and A-TRT data let that resource be designed around the site’s actual geology and thermal behavior. The result is a more defensible borefield, less risk of oversizing or undersizing, and a clearer picture of how the ground should be used in the larger thermal system.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Implementing TENs', to: '/insights/implementing-tens' },
      { label: 'Multi-source ambient loops', to: '/insights/multi-source-ambient-loops' },
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
      { label: 'From first cost to long-term value', to: '/insights/lifecycle-cost' },
    ],
  },
  {
    slug: 'colorado-policy-in-practice',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'What other states should copy from Colorado’s geothermal policy',
    summary:
      'Colorado shows how geothermal policy can grow from individual programs into a framework for energy planning. Other states can copy the principles behind utility planning, equipment replacement, project economics, and ownership.',
    image: site['insight-colorado-policy'].src,
    imageAlt: site['insight-colorado-policy'].alt,
    to: '/insights/colorado-policy-in-practice',
    readTime: '7 min read',
    body: [
      {
        paragraphs: [
          'Colorado shows how geothermal policy can grow from individual programs into a broader framework for energy planning. Over a relatively short period, the state wrote geothermal into statutes, utility proceedings, equipment standards, and incentive programs.',
          'Thermal energy networks, once associated mainly with campus and demonstration projects, now sit inside Colorado’s utility planning framework. State law lets large regulated gas utilities propose these networks. In certain cases it also requires them to propose pilot projects for review by the Colorado Public Utilities Commission.',
          'That framework can expand thermal energy networks, reduce reliance on natural gas and the emissions that come with it, and lessen the need for expensive electrical upgrades. Other states should look past any single Colorado program and take the principles behind its approach to planning, equipment replacement, project economics, and ownership.',
          'These tools act at different stages of a project. Used together, they give thermal energy networks a path from individual projects to long-term infrastructure.',
        ],
      },
      {
        heading: 'Utility planning',
        paragraphs: [
          'One of Colorado’s first steps was to give geothermal and thermal energy networks a defined place in utility planning. The Heat Beneath Our Feet initiative, authorization of community geothermal gardens, and the state’s Clean Heat requirements established geothermal as a resource that could be considered alongside more traditional utility investments.',
          'Colorado law now recognizes thermal energy as an eligible clean-heat resource and allows regulated gas utilities to seek approval for thermal energy network service. Large gas utilities must also propose pilot thermal energy network projects for Commission review.',
          'On December 1, 2025, the Colorado Public Utilities Commission issued further direction under the Clean Heat framework. That direction builds on the structure that already lets thermal energy networks be evaluated as utility investments, including pathways for project funding and rate recovery.',
          'The significance is where a project can start. Thermal networks no longer depend only on an individual building owner or community to initiate them. They can also be considered as part of utility planning.',
        ],
      },
      {
        heading: 'Equipment replacement',
        paragraphs: [
          'Colorado has also used equipment standards to influence the decision that arrives when a heating system reaches the end of its useful life. House Bill 23-1161 set new emissions requirements for certain gas-fired heating and water-heating equipment beginning January 1, 2026.',
          'Those requirements can change the cost and availability of compliant replacement equipment. They give building owners an additional reason to compare a conventional replacement with heat pumps and other electrified alternatives. The policy does not mandate a technology. It makes replacement a real decision, rather than an assumption that gas-fired equipment will be swapped for more of the same.',
          'Equipment standards are only one part of that environment. Local authority, interoperability requirements, and workforce considerations also shape how thermal energy systems get built. Together, these policies set the conditions under which owners, utilities, and communities choose future heating and cooling infrastructure.',
        ],
      },
      {
        heading: 'Incentives and first cost',
        paragraphs: [
          'Upfront cost remains one of the main barriers to geothermal and thermal energy network projects. Colorado has used grants, tax credits, and other programs to support residential, commercial, and community-scale geothermal development. Those programs include incentives for heat-pump installations and thermal energy networks, plus larger funding opportunities for geothermal projects.',
          'The value rises when state incentives can be combined with federal geothermal incentives. Federal provisions include investment and production tax credits, along with additional provisions tied to prevailing wage, apprenticeship, and energy-community eligibility.',
          'Layering eligible state and federal programs can improve project economics and reduce the upfront cost that often stops a geothermal project. The structure of an incentive program matters along with the amount of funding available.',
        ],
      },
      {
        heading: 'Ownership',
        paragraphs: [
          'A thermal energy network also needs a clear owner. A public entity, a utility, or a third party can hold that role. In every case, someone has to finance the infrastructure, bill customers, operate the system, and fund future expansion.',
          'Colorado’s policy discussions increasingly treat those questions as part of developing the network, rather than leaving ownership until after the technical design is finished.',
          'Settling ownership early matters because a feasible design still needs an organization with the authority and the financial structure to build and operate it. Without that structure, a project can finish the engineering and still have no path to construction.',
        ],
      },
      {
        heading: 'A broader policy framework',
        paragraphs: [
          'Colorado’s geothermal policy shows how several mechanisms can support thermal energy networks. Utility planning gives the technology a place in regulated infrastructure decisions. Equipment standards shape replacement choices. Incentives change project economics. Ownership policy assigns responsibility for building and operating the system.',
          'The specific statutes and programs used in Colorado will not fit every state. The broader approach still transfers. Thermal energy networks are shaped by more than engineering. When planning, regulation, incentives, and ownership are addressed together, these systems have a clearer path from individual projects to long-term infrastructure.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Who owns the network', to: '/insights/governance-first' },
      { label: 'From first cost to long-term value', to: '/insights/lifecycle-cost' },
    ],
  },
  {
    slug: 'geo-power-and-tens',
    category: 'Technical Education',
    level: 'Strategic',
    title: 'Geo Tri-Gen: geothermal power, heating, and cooling',
    summary:
      'Shallow geothermal heats and cools buildings. Deep geothermal generates electricity. Used together, the heat left after power generation can supply a thermal network with heating and cooling as well.',
    image: site['insight-share-a-site'].src,
    imageAlt: site['insight-share-a-site'].alt,
    to: '/insights/geo-power-and-tens',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Geothermal is a name for several technologies that use the same resource. Shallow geothermal, roughly 100 to 1,000 feet, uses the steady temperature of the earth to heat and cool buildings with water and heat pumps. Deep geothermal, roughly 1,000 to 20,000 feet, generates electricity from hot geology at depth.',
          'Combining the two uses more of the available geothermal energy than either technology can use on its own.',
        ],
      },
      {
        heading: 'Heat left after the power cycle',
        paragraphs: [
          'Geothermal power systems are built to produce electricity. Not all of the heat brought to the surface is consumed in that step. After electricity is produced, the geothermal water still holds a significant amount of usable heat, and that heat is often treated as a liability.',
          'Before the fluid can return underground and the power cycle can repeat, much of the remaining heat has to be removed. That can require cooling equipment whose main job is to reject heat to the environment. A sink is a place to reject energy to.',
          'From the power plant’s point of view, this heat is no longer needed to make electricity. From the point of view of a nearby heating system, it can still be a useful resource.',
        ],
      },
      {
        heading: 'One resource, three outputs',
        paragraphs: [
          'Ambient temperature loops, or ATLs, and other thermal energy networks give that heat somewhere to go. They circulate water between buildings and thermal resources, including geo-exchange, so heat can be moved to where it is useful.',
          'Geothermal power generation can then become a source for the network. A source is a place to absorb energy from. Instead of rejecting all of the remaining heat through cooling equipment, a portion can be transferred into an ATL and used for heating and for cooling.',
          'An absorption chiller produces chilled water from heat, rather than from an electric compressor. With that machine on the network, one geothermal resource can supply electricity, heating, and cooling. We call that combination Geo Tri-Gen.',
        ],
      },
      {
        heading: 'Following the energy cascade',
        paragraphs: [
          'Follow the temperature down. High-temperature geothermal energy is used first to generate electricity. The remaining heat can move into the thermal network for higher-temperature uses, including industrial processes and absorption chillers.',
          'After those uses, lower-temperature heat may still be useful elsewhere in the network. The power system rejects less energy through its cooling equipment, and the thermal network gains a valuable source of heat.',
          'Geothermal power generation and thermal energy networks complement each other. One system’s rejected energy becomes the other system’s useful resource.',
        ],
      },
    ],
    relatedLinks: [
      { label: 'Thermal Energy Networks 101', to: '/geothermal-101' },
      { label: 'Multi-source ambient loops', to: '/insights/multi-source-ambient-loops' },
    ],
  },
  {
    slug: 'thermal-highway',
    category: 'Technical Education',
    level: 'Foundational',
    title: 'Understanding the Thermal Highway®',
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

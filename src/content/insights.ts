import { site } from './images'

export interface InsightSection {
  heading?: string
  paragraphs: string[]
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
 */
export const insights: Insight[] = [
  {
    slug: 'colorado-mesa-university',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Colorado Mesa University: what a campus ATL actually delivers',
    summary:
      'From Dominguez Hall in 2008 to roughly 1.5 million square feet on ambient loops—demand, gas, water, and CapEx results from a hybrid multi-source network.',
    image: site['campus-build'].src,
    imageAlt: site['campus-build'].alt,
    to: '/insights/colorado-mesa-university',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Colorado Mesa University did not start with a finished district. It started with a master plan in 2006, geothermal deployment in 2008, and a rule that new buildings would be evaluated for connection. By 2012 the ambient temperature loop was carrying campus heating needs. Today on the order of 79% of campus—about 20 buildings and 1.5 million square feet—is connected across five microdistricts, with expansion aimed at roughly doubling served area by 2030.',
          'That timeline matters because the results people cite are not from a pilot. They are from a hybrid thermal energy network that grew with the campus and learned to treat diversity, storage, and peaking plant as one system.',
        ],
      },
      {
        heading: 'Hybrid by design: the 50/90 rule',
        paragraphs: [
          'CMU is not “all geothermal, no boilers.” It is a hybrid system sized for part-load reality. Hours under 50% of peak make up about 90% of the year; peak hours are rare. Designing for balanced loads instead of stacking every building’s worst hour lets geoexchange, irrigation heat exchange, cooling towers, and boilers play defined roles—with boilers reportedly needed almost never over long stretches of operation.',
          'Compared with a conventional chiller-and-boiler plant, published evaluations of the community ground-source system show on the order of 650 kW of demand reduction, 1.3 GWh of annual energy savings, about 58,000 Dth of natural gas avoided, and roughly 10 million gallons of cooling-tower water saved each year.',
        ],
      },
      {
        heading: 'Borefield CapEx collapses when the network shares load',
        paragraphs: [
          'A standalone geoexchange design for the same campus-scale cooling would have needed on the order of 217 vertical feet of borehole per installed ton. The ATL configuration lands near 84 feet per ton—about a 62% reduction in field CapEx intensity—because coincident diversity and multi-source assets carry work the ground would otherwise do alone.',
          'Electric load tells the same story: roughly 784 kW without the district approach versus on the order of 185 kW with it in the comparative framing used across GreyEdge briefings. Soft costs move too: campus square footage roughly tripled while HVAC technician headcount barely grew, because shared infrastructure and load shedding replace building-by-building plant sprawl.',
        ],
      },
      {
        heading: 'What the operating ledger shows',
        paragraphs: [
          'Annual energy savings on the order of $1.6 million and cumulative savings above $16 million since 2008 are the figures that travel with this case. Carbon reductions measured in thousands of metric tons per year follow the gas displacement. Building EUIs for dormitories, classrooms, labs, and food service sit well below national averages for those property types in Energy Star comparisons cited in campus presentations.',
          'The lesson for other campuses is not “copy CMU’s pipe diameter.” It is that an ambient loop becomes valuable when you size for part load, keep peaking plant honest, and let diversity compound as each new building joins the network.',
        ],
      },
    ],
  },
  {
    slug: 'mountain-town-decarbonization',
    category: 'Case Studies',
    level: 'Strategic',
    title: 'Mountain towns, snowmelt, and the last 10%',
    summary:
      'Vail’s snowmelt is most of municipal gas use. Electric resistance works—but a thermal energy network is how you finish decarbonization without breaking the grid.',
    image: site['hero-ski-town'].src,
    imageAlt: site['hero-ski-town'].alt,
    to: '/insights/mountain-town-decarbonization',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Mountain towns face a brutal version of beneficial electrification. Climate goals (often 50% by 2030 and deeper by 2050) collide with snowmelt systems that can dominate municipal natural gas, guest-experience constraints that forbid unreliable heat, and a grid already absorbing building electrification and EV load. In Vail, snowmelt has been framed as roughly 80% of municipal gas use and on the order of 6,500 metric tons of CO₂ per year—with a gas-equivalent peak in the multi-megawatt range.',
          'Electric resistance can melt snow. The question is at what cost. Briefings put resistance in the neighborhood of three times the energy cost of a heat-pump path, while peak events arrive late afternoon or with storms—exactly when the feeder is least forgiving.',
        ],
      },
      {
        heading: 'The Falcon Curve and efficient electrification',
        paragraphs: [
          'The “last 10%” of mountain-town decarbonization is where air-source heat pumps, resistance backup, and unmanaged peaks stack onto a constrained distribution system. The Falcon Curve is the warning: as outdoor temperatures fall, inefficient electric heating climbs just as the grid is stressed.',
          'Thermal energy networks invert that curve for the built environment. Ambient loops, shared diversity, and thermal storage turn snowmelt plants, hotels, ice arenas, wastewater, and civic buildings into a portfolio of sources and sinks instead of isolated electric loads.',
        ],
      },
      {
        heading: 'Vail’s path from study to civic district',
        paragraphs: [
          'Phase one work for Vail has followed a familiar GreyEdge sequence: high-level feasibility, the 50/90 hybrid framing, hydrogeology and test boreholes, and a map of thermal assets. Phase two support from the Colorado Energy Office has funded development of a Civic Area geothermal heating district concept—tying wastewater treatment, hotels, library, ice arena, Lionshead snowmelt, and geothermal wells into one planning frame.',
          'Lionshead Village geo-snowmelt work adds the implementation layer: coalition building, retrocommissioning before overbuilding plant, hybrid design, and explicit planning for utility thermal energy network (UTEN) ownership conversations that are evolving nationally.',
        ],
      },
      {
        heading: 'What other ski towns should take',
        paragraphs: [
          'A TEN is not only a heating plant. It is a demand-response and power-factor tool for the local grid, and it is often the highest-COP path available for simultaneous heating and cooling. Mountain towns that treat snowmelt as an isolated electrification project will keep buying peaks. Towns that put snowmelt on a shared thermal highway can harvest, move, and reuse energy the buildings and process loads already create.',
        ],
      },
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
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Beneficial electrification is the challenge of the decade—and the fastest way to do it badly is to replace gas plant with air-source heat pumps and resistance backup sized for every building’s worst hour. Capacity markets already show what unconstrained winter and summer peaks cost; geothermal heat pumps and networked systems see far smaller electric spikes because they do not lose capacity to defrost the way air-source units do.',
          'DOE Pathways to Commercial Liftoff framing used across GreyEdge briefings puts the national stakes clearly: at scale, summer and winter peak reductions measured in gigawatts can translate into tens of billions in avoided grid-system cost. The local version of that story is simpler. A campus or district that shares an ambient loop installs far less coincident electric capacity than the sum of standalone conversions.',
        ],
      },
      {
        heading: 'Diversity is a capacity resource',
        paragraphs: [
          'An ambient temperature loop captures diversity: the sum of simultaneous building loads is lower than the sum of each building’s peak. Offices rejecting heat while residences call for heat are solving each other’s problem on the same pipe. At Colorado Mesa University, comparative framing shows roughly 650 kW of demand reduction and electric service needs falling from the high hundreds of kilowatts toward the low hundreds when a district system replaces isolated plant.',
          'Part-load reality sharpens the point. Most of the year sits well below peak. Pumping affinity laws mean that running lower flows for thousands of hours cuts friction and power dramatically. Peak-hour design without part-load analysis oversizes pipe, pumps, and interconnection for hours that barely exist.',
        ],
      },
      {
        heading: 'Storage, hybrids, and demand response',
        paragraphs: [
          'On a TEN, the borefield’s job shifts from pure source/sink toward thermal storage. Heat rejected into the ground or near-field can be recovered later; circulation lag and volumetric heat capacity buy time for the system to respond. Hybrid peaking—the 50/90 rule—covers the rare extreme hours with boilers or towers so the electric plant does not have to.',
          'Operationally, networked campuses have demonstrated campus-wide load shedding with a single control action during peak events. That is demand response without asking every building to invent its own curtailment plan. For the vocabulary of how loops move energy, start with Geothermal 101. This piece is about the electrical consequence: electrification without treating a feeder upgrade as inevitable.',
        ],
      },
      {
        heading: 'What to ask before you size the service',
        paragraphs: [
          'Before you accept a utility upgrade as the price of decarbonization, ask whether buildings can share a thermal backbone, whether diversity and storage have been modelled against the true coincident peak, and whether existing thermal resources—wastewater, process heat, snowmelt return, irrigation—have been counted at all.',
          'Those questions change the interconnection conversation. They are also where most projects either lock in unnecessary capital, or free it.',
        ],
      },
    ],
  },
  {
    slug: 'weber-state-four-pipes',
    category: 'Case Studies',
    level: 'Applied',
    title: 'Four pipes to two: Weber State’s TEN retrofit',
    summary:
      'How Weber State used a revolving green fund, a chilled-water loop as a thermal highway, and phased ground source to cut fuel cost and EUI without waiting for a greenfield campus.',
    image: site['planning-ten'].src,
    imageAlt: site['planning-ten'].alt,
    to: '/insights/weber-state-four-pipes',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Weber State University’s climate commitment set carbon neutrality by 2050. The practical plan was efficiency first, then renewables, with savings recycled through a revolving green fund—an internal loan on the order of $5 million at low interest against a fixed annual utility budget. That financing spine matters as much as the mechanical story: every dollar of avoided utility spend could fund the next retrofit.',
          'The mechanical roadblock was familiar. Efficient VAV reheat still leaned on steam or building boilers. Air-source heat pumps decoupled buildings from steam but lost efficiency at extremes and shortened equipment life. Water-source heat pumps could reuse the chilled-water loop—if the campus was willing to treat that loop as a thermal energy network instead of a one-way cooling pipe.',
        ],
      },
      {
        heading: 'Repurposing the chilled-water loop',
        paragraphs: [
          'In summer the loop remains a sink; in winter it becomes a source. Buildings on water-source heat pumps share load across campus through the existing distribution. Mixed inventories—WSHP buildings needing warmer return water and legacy VAV reheat needing cooler supply—forced careful connection strategy: tie retrofits into the return, isolate or retrofit driver buildings, and keep one pipe serving two temperature regimes without fighting itself.',
          'Ground-source fields then precondition and eventually dominate conditioning of the loop so the central plant can recede into backup. The five-step retrofit plan stretches across a decade of goals compression: carbon neutrality timelines move left when the thermal backbone is already in the ground.',
        ],
      },
      {
        heading: 'Outcomes you can take to a board',
        paragraphs: [
          'Since 2010, avoided utility costs above $30 million—with about $3.5 million in a single recent year—frame the financial case. January central-plant fuel costs in briefing material fall from on the order of $12,800 per month before heat pumps and the central loop to about $2,700 after startup. Average campus EUI drops from roughly 125 kBtu/sf/yr toward under 60, with natural gas use cut by about half; section-level profiles show midday energy concentration collapsing after retrofit.',
          'Broader campus reporting tied to the program cites direct GHG emissions down about 31% since a 2007 baseline even with hundreds of thousands of square feet added, with electricity and gas consumption each down on the order of 30% and energy cost down roughly 40%. The living-laboratory framing is deliberate: students see the technology operating before they design the next one.',
        ],
      },
    ],
  },
  {
    slug: 'multisource-networks',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Multisource networks and the 50/90 rule',
    summary:
      'Standalone geoexchange is efficient—and often too expensive and land-hungry. The Thermal Highway© wins when wastewater, mine water, diversity, and hybrid peaking share the work.',
    image: site['network-diagram'].src,
    imageAlt: site['network-diagram'].alt,
    to: '/insights/multisource-networks',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Traditional geoexchange delivers higher efficiency than air-source heat pumps, lower electrical demand, and longer equipment life. It also hits hard limits: high upfront cost, large land area, and strong dependence on ground properties. District-scale work needs a different frame—the Thermal Highway©—where buildings, sources, and storage trade usable energy on a shared ambient loop instead of each site drilling for its own peak.',
          'The ground remains a thermal battery. Diversity becomes a resource across coincident hours and across days and seasons. The network’s job is to harvest, move, and reuse energy before it buys new plant.',
        ],
      },
      {
        heading: 'Hybrid systems: hours under 50% are most of the year',
        paragraphs: [
          'The 50/90 rule is the design discipline behind hybrid TENs: roughly 90% of annual hours sit under 50% of peak load, while true peak may occupy on the order of an hour. Size geoexchange and multisource assets for the long middle of the year; let boilers, towers, or other peaking cover the rare extreme. That is how campuses cut borehole footage per ton without pretending peaks never happen.',
          'Source flexibility is site-specific. Park City evaluations map downtown, Bonanza Park, and Quinns against wastewater, mine water, geoexchange, and source-protection constraints. Vail and Carbondale briefings show the same pattern: inventory every thermal liability that can become an asset before you default to more holes in the ground.',
        ],
      },
      {
        heading: 'Why multisource beats “more geo” alone',
        paragraphs: [
          'Multi-building, multi-source networks consistently show higher performance and lower first cost than isolated geo fields sized for every ton. CapEx intensity falls when the loop carries diversity and waste heat. Peak electric demand falls when the network—not resistance—handles the coldest and hottest hours.',
          'For the shared vocabulary of ambient loops and heat pumps, use Geothermal 101. For how to stage feasibility through commissioning, see Implementing TENs. This piece is the paradigm shift in one sentence: stop asking the ground to do every hour’s work alone.',
        ],
      },
    ],
  },
  {
    slug: 'lifecycle-cost',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'First cost is the wrong question',
    summary:
      'Borehole feet per ton, ITC stacking, and decades of avoided utility spend change which system wins—if you model lifecycle, not bid day.',
    image: site['lifecycle-cost'].src,
    imageAlt: site['lifecycle-cost'].alt,
    to: '/insights/lifecycle-cost',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Capital committees are trained to compare bid prices. Thermal networks are trained to outlast the people who approve them. When those frames collide, the low first-cost plant often wins—and then spends decades collecting demand charges, tower water, boiler replacements, and the feeder upgrade electrification without diversity eventually triggers.',
          'Field economics from operating TENs make the incompleteness visible. A campus comparison that shows 217 borehole feet per ton for standalone geo versus about 84 feet per ton on an ambient loop is not a curiosity. It is roughly a 62% reduction in field CapEx intensity for the same connected load class.',
        ],
      },
      {
        heading: 'What the operating ledger already proved',
        paragraphs: [
          'Colorado Mesa University’s cumulative energy savings above $16 million since 2008, and Weber State’s more than $30 million in avoided utility costs since 2010, are lifecycle arguments written in cash. Water savings measured in millions of gallons per year and electric demand cuts measured in hundreds of kilowatts show up as both operating cost and deferred infrastructure.',
          'Federal investment tax credits and state heat-pump incentives further move year-zero math. DOE Pathways language used in Colorado practice briefings notes that when a project already qualifies for substantial ITC, borehole cost can be partially or fully offset—sometimes making the geothermal path the lowest first-cost option as well as the lowest lifecycle option.',
        ],
      },
      {
        heading: 'Cost stacks that fool a spreadsheet',
        paragraphs: [
          'GreyEdge cost discussions break TEN spend into geo-fields, network distribution, TEN mechanicals, interior heat pumps, and behind-the-meter retrofits—with unit costs that differ by an order of magnitude. The expensive mistake is funding the wrong stack: overbuilding fields because diversity was ignored, or underbuilding the loop so phase two strands phase one.',
          'Residential examples in coal-impacted communities show how incentive stacking (including energy-community bonuses) can drop homeowner out-of-pocket far below sticker. The principle is the same at campus scale: incomplete incentives and incomplete peaks make “cheap” plant look cheap.',
        ],
      },
      {
        heading: 'What a capital committee needs to see',
        paragraphs: [
          'A business case that survives scrutiny shows coincident peaks rather than summed peaks, operating cost under realistic rates, maintenance and replacement over the asset life, and a clear path to add load or sources without stranding what you build now.',
          'When those pieces sit in one model, the “expensive” network often pencils, and the cheap plant stops looking cheap. That is the conversation capital allocators can actually approve.',
        ],
      },
    ],
  },
  {
    slug: 'implementing-tens',
    category: 'Technical Education',
    level: 'Applied',
    title: 'Implementing TENs: from why to commissioning',
    summary:
      'Feasibility, hydrogeology, design, drilling, and commissioning practices that separate networks that expand from networks that stall.',
    image: site['district-scale-site-planning'].src,
    imageAlt: site['district-scale-site-planning'].alt,
    to: '/insights/implementing-tens',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Starting with why is not a slogan. Owners who skip the challenge framing—peak demand, gas dependency, water, and the limits of building-by-building electrification—buy equipment instead of a network. Thermal energy networks, heat pumps, building-level heat trading, ambient loops, microgrids, hybrid 50/90 sizing, and load diversity are the concepts; implementation is the sequence that makes them real.',
          'A workable path looks like this: high-level feasibility, characterization of the built environment, hydrogeology and resource mapping, design with multi-source assets in mind, drilling executed by teams who have done it, and commissioning that defends design intent through startup.',
        ],
      },
      {
        heading: 'Evaluate the place, not a generic tonnage',
        paragraphs: [
          'Park City’s evaluation work is a useful pattern: separate districts (downtown, Bonanza Park, Quinns), map building stock and HVAC compatibility, then rank resources—wastewater, mine water, geoexchange, and source-protection zones—before recommending a preferred thermal strategy. The recommendation only lands after the site’s liabilities and assets are on the same map.',
          'Retrocommissioning belongs early. Cleaning controls, setpoints, and envelope performance reduces the tons the network must carry. Designing a TEN around waste is how projects oversize fields and underdeliver savings.',
        ],
      },
      {
        heading: 'Design, drill, and commission as one chain',
        paragraphs: [
          'Design best practices start with designer experience, thermal response testing, building efficiency first, and explicit multi-source asset considerations. Drilling best practices demand rig size and technology matched to the geology—and drillers who have completed comparable fields. Commissioning closes the loop with design reviews, installation reviews, and system testing so sequences and setpoints match the model.',
          'Skip any link and you get a competent drawing set that underperforms in the field. Keep the chain intact and the network can expand building by building without restarting the backbone.',
        ],
      },
    ],
  },
  {
    slug: 'governance-first',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'Who finances, owns, and operates the thermal network?',
    summary:
      'Utility thermal energy networks force a governance choice early: public entity, utility, or third party—and who bills, who expands, and who stands behind performance.',
    image: site.blueprints.src,
    imageAlt: site.blueprints.alt,
    to: '/insights/governance-first',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          'Every serious TEN conversation eventually hits the same grid: who finances, who owns, and who operates. Public entities, utilities, and third parties can each play those roles—and mixing them without a clear model is how projects stall after the engineering looks “done.”',
          'Utility thermal energy network (UTEN) discussions are evolving nationally for a reason. A shared ambient loop is infrastructure. It needs a durable owner, a rate or recovery path, and an operator accountable for temperatures, expansion, and customer participation—not a one-off construction contract.',
        ],
      },
      {
        heading: 'Three models, different incentives',
        paragraphs: [
          'A public or municipal owner can align the network with climate goals and civic assets—snowmelt, wastewater plants, libraries—but must still answer for capital and long-term O&M. A utility owner can fold TENs into integrated energy planning and rate design, which is why Clean Heat and related proceedings matter in states like Colorado. A third-party owner can move faster on development, then needs crystal-clear interfaces for billing, interconnection, and who pays when a phase expands.',
          'Design, commissioning, and controls support often sit beside the ownership choice. So do customer participation rules: who can connect, on what terms, and how stranded assets are avoided when the first buildings join before the last.',
        ],
      },
      {
        heading: 'Settle the model before the next RFP',
        paragraphs: [
          'Before the next consultant or EPC solicitation, write down who owns the thermal backbone across phases, how costs are recovered, who decides when disciplines disagree on loop temperatures or peaking strategy, and who remains through startup to defend sequences.',
          'Those answers are governance—not bureaucracy layered on engineering. They are the condition that lets a multisource network actually get built, billed, and expanded.',
        ],
      },
    ],
  },
  {
    slug: 'colorado-policy-in-practice',
    category: 'Industry and Policy',
    level: 'Strategic',
    title: 'Colorado policy is reshaping the geo marketplace',
    summary:
      'Clean Heat, ultra-low NOx rules, heat-pump credits, and ITC stacking are changing what owners can finance—and what gas utilities must plan for.',
    image: site['panel-discussion'].src,
    imageAlt: site['panel-discussion'].alt,
    to: '/insights/colorado-policy-in-practice',
    readTime: '6 min read',
    body: [
      {
        paragraphs: [
          'Colorado has moved past “geothermal is interesting” into statutes, PUC orders, equipment standards, and stacked incentives that change project math. Heat Beneath Our Feet, community geothermal garden concepts, Clean Heat planning, and related bills created a marketplace where TENs are no longer only a campus innovation story.',
          'On December 1, 2025, the Colorado PUC’s Clean Heat direction further pressed large gas utilities toward thermal solutions as part of meeting state energy policy—including rate-recovery mechanisms that can support TEN development. That is a structural shift: utilities are being asked to lean in, not only customers.',
        ],
      },
      {
        heading: 'Standards that raise the cost of staying on gas',
        paragraphs: [
          'As of January 1, 2026, Colorado began enforcing ultra-low NOx emission standards under House Bill 23-1161. Briefings used in practitioner sessions note that compliant gas equipment can cost on the order of 40% to 80% more, with fewer replacement options. The replacement cycle itself becomes a decision point for heat pumps and networked systems.',
          'Local and municipal authority, technical interoperability, and worker-transition expectations sit alongside those equipment rules. Policy is not only a rebate sheet; it is a constraint set on what “like-for-like” replacement still means.',
        ],
      },
      {
        heading: 'Incentives and tax credit stacking',
        paragraphs: [
          'The Colorado Energy Office administers grant programs and state heat-pump tax credits (on the order of hundreds to a couple thousand dollars per unit or per ton, with contractor-pass-through requirements). Nonresidential ground-source support under related legislation has included substantial per-project caps and annual program funding measured in tens of millions.',
          'Federal commercial geothermal credits under the ITC/PTC framework remain available for qualifying systems, with base rates and bonus adders for prevailing wage, apprenticeship, energy communities, and related criteria. In coal-impacted communities, stacked bonuses can cut homeowner or developer out-of-pocket dramatically—examples cited in practice decks show sticker versus net cost gaps of tens of thousands of dollars on residential geo.',
        ],
      },
      {
        heading: 'What practitioners should do with the policy stack',
        paragraphs: [
          'Treat policy as part of schematic design: map Clean Heat and utility participation early, price ultra-low NOx replacements honestly, and model state plus federal incentives before CapEx comparisons. Ownership questions—public, utility, or third party—belong in the same conversation; see who finances, owns, and operates the thermal network.',
          'Colorado’s lesson for other states is that TENs scale faster when statutes, rates, and incentives point the same direction as engineering.',
        ],
      },
    ],
  },
  {
    slug: 'geo-power-and-tens',
    category: 'Technical Education',
    level: 'Strategic',
    title: 'When geo power and thermal networks share a site',
    summary:
      'EGS and advanced geothermal can deliver baseload electricity—and their waste heat can feed a TEN, cutting field size and improving both systems.',
    image: site['thermal-plant-inspection'].src,
    imageAlt: site['thermal-plant-inspection'].alt,
    to: '/insights/geo-power-and-tens',
    readTime: '5 min read',
    body: [
      {
        paragraphs: [
          '“Geothermal” is not one technology. Conventional hydrothermal, enhanced geothermal systems (EGS), advanced closed-loop concepts, campus central plants, building geoexchange, and thermal energy networks sit on different parts of the temperature and depth spectrum. GreyEdge’s cogen briefings focus on the seam between deep geo power and ambient-loop TENs.',
          'EGS methods—illustrated by research sites such as Utah FORGE and commercial approaches from developers working fractured or geopressured reservoirs—target hot rock where natural permeability is lacking. Advanced closed-loop concepts pursue heat without the same reservoir dependence. All of them produce electricity with a thermal exhaust story worth capturing.',
        ],
      },
      {
        heading: 'Why couple power and thermal',
        paragraphs: [
          'EGS and similar plants want stable baseload power. TENs want clean, flexible thermal conditioning. Waste heat from power production can cover a large share of a district’s heating need, reducing TEN first cost and borefield size. Lowering cooling burden at the power plant can improve electric output. Geology and climate decide where the pairing is attractive; cold districts with heating-dominated loads are natural candidates.',
          'Mountain-town studies that already map snowmelt, wastewater, and civic loads—Vail’s decarbonization work among them—are exactly where adding a deep resource to the thermal asset register changes the optimization.',
        ],
      },
      {
        heading: 'Precedents, not science fiction',
        paragraphs: [
          'Combined power and district heating is not new. Iceland’s Svartsengi plant paired tens of megawatts electric with hundreds of megawatts thermal for district heat decades ago. Austria’s Altheim project paired roughly 1 MW electric with about 9 MWth of district heating with documented CO₂ cuts and strong project economics. Cornell’s low-temperature deep EGS work and Delft’s deep direct-use doublet with shallow storage show academic and European paths toward the same integration idea.',
          'The design question for U.S. districts is when the geology, offtake, and TEN load justify shared infrastructure. Where they do, treating power and thermal as separate silos leaves money—and megawatts—on the table.',
        ],
      },
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
      'Ambient loops, heat trading, and hybrid peaking—the short path into why TENs beat building-by-building electrification.',
    image: site['training-classroom'].src,
    imageAlt: site['training-classroom'].alt,
    to: '/geothermal-101',
    readTime: 'Primer',
  },
]

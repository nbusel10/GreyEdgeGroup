import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../content/images'
import { doors } from '../content/advantage'
import PageHero from '../components/PageHero'
import AtlExplainer from '../components/sections/AtlExplainer'
import FinalCta from '../components/sections/FinalCta'
import MoreInfo from '../components/MoreInfo'
import { gaLabel } from '../lib/gaLabel'
import { Btn, Container, Eyebrow, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable preview of Megan's September review of the how-it-works page.
 * Not linked in nav. Live `/geothermal-101` is unchanged until this is approved.
 */

const schematic = {
  src: '/images/site/atl-schematic-nextemp.png',
  alt: 'Schematic of an ambient temperature loop connecting buildings and thermal resources, including geoexchange, surface water, solar thermal and storage.',
}

const sources = [
  { name: 'The ground', detail: 'A stable thermal reservoir available year-round in virtually every climate.' },
  { name: 'Wastewater', detail: 'Municipal sewer mains carry a remarkably consistent thermal load.' },
  { name: 'Industrial waste heat', detail: 'Data centers, laundries, manufacturing and other processes can reject large amounts of usable heat.' },
  { name: 'Solar thermal', detail: 'Solar energy captured as heat and stored in the ground for later use.' },
  { name: 'Mine water', detail: 'Flooded workings hold enormous stable thermal mass near former mining towns.' },
  { name: 'Surface water', detail: 'Lakes, rivers and reservoirs, where permitting allows.' },
  { name: 'Piped water', detail: 'Drinking-water and other piped networks can exchange heat where the system allows it.' },
]

const components = [
  {
    t: 'Building loads',
    b: 'Each building has its own water-source heat pump and can both produce and consume heat, so one building’s extra heat can serve another and the whole system needs less capacity.',
  },
  {
    t: 'Ambient loop',
    b: 'A closed loop, usually one or two pipes, carries 45–95°F water between those heat pumps and the thermal assets.',
  },
  {
    t: 'Energy sources, sinks, and storage',
    b: 'Waste heat, including diversity between buildings, plus geothermal boreholes, lakes and rivers, piped water, wastewater, and other local assets.',
  },
]

const cards = [
  {
    t: 'Expandable by Design',
    b: 'Buildings can join over time, including existing buildings being retrofit, so the network grows with the community.',
  },
  {
    t: 'Energy Sharing Network',
    b: 'The heat pumps are what make each building a producer and a consumer. A standard HVAC technician can maintain them.',
  },
  {
    t: 'Low-Loss Distribution',
    b: 'Losses stay low because the water is in that 45–95°F band and because the heat pumps sit at the buildings, so energy does not travel as far as it does from a central plant.',
  },
]

const faqs = [
  {
    q: 'Is this the same as geothermal power?',
    a: 'No. Geothermal power taps very high temperature resources, about 250°F and up, to spin a turbine, and only works in a few places on earth. A Thermal Energy Network is for heating and cooling efficiency, not electricity. It uses the stable temperature of the shallow ground, about 45°F to 65°F, as a place to put heat in summer and take heat from in winter. That shallow exchange can be built in ordinary ground. The question on a given site is whether it is cost-effective. The types of geothermal above show the difference in depth and temperature. The water in the loop itself, about 45°F to 95°F, is explained in the ambient section.',
  },
  {
    q: 'How is a Thermal Energy Network different from conventional district heating and cooling?',
    a: 'Conventional district systems send hot water and chilled water from a central plant as two separate systems, often in four pipes. They are the usual alternative to gas heating and a central heating and cooling plant. A Thermal Energy Network is an ambient temperature loop: buildings and thermal resources trade usable heat on a shared circuit, usually one or two pipes, and each building’s heat pumps make the final temperature lift. When a network is added, existing central-plant equipment can be smaller or held as backup, because building and resource diversity does work the plant used to do alone.',
  },
  {
    q: 'Does every Thermal Energy Network need a geothermal borefield?',
    a: 'No. Geoexchange is not a requirement for every network, but it is currently the most common resource and it is available almost anywhere. It is rare for a network to have no boreholes at all. Boreholes are often the most expensive option, so wastewater, process heat, surface water, mine water, and building-to-building sharing are used to share the load and reduce how many are drilled. Some networks have run on wastewater alone. In a multi-source network, the boreholes’ main job shifts from being the source and the sink toward storage. When you do drill, the bores are vertical and use little surface area. They commonly sit under parking, fields, or the building footprint.',
  },
  {
    q: 'Does it work in cold climates?',
    a: 'Absolutely. Below about six meters, ground temperature stays near the local annual average all year, so a system in Steamboat Springs is drawing from roughly 45°F ground while the air outside is below zero. The colder the air, the bigger the advantage over an air-source system.',
  },
  {
    q: 'Can an existing building connect to a Thermal Energy Network?',
    a: 'Yes, often with minimal interventions necessary. Depending on the type of system the existing building has, a heat pump system can replace boilers and chillers directly and serve as the connection between the building system and the central loop. In this case few or minimal changes are necessary out in the building itself and the connection becomes a mechanical room retrofit.',
  },
  {
    q: 'What is possible if the development is still growing?',
    a: 'Districts are usually built in phases, and a Thermal Energy Network can flex as the building plans change. You can start with one cluster, a micro-district, and connect later clusters as the development grows, the way building blocks lock together. Design the first backbone for known phase-one loads, and leave connection points and reserved capacity so later buildings or thermal resources can join without rebuilding the pipe.',
  },
  {
    q: 'What happens when heating and cooling loads don’t balance?',
    a: 'The loop uses thermal resources as a balancing account. Buildings rarely offset one another every hour of the year. When the network has more heat than it can use, that surplus goes into the ground, wastewater, or another sink, where it can be stored. When the network needs more heat than the buildings are sharing, that shortfall is drawn back from those same places. Geoexchange, process heat, and storage sit on the loop so far less heat has to be rejected or produced from scratch.',
  },
  {
    q: 'How long do these systems last?',
    a: 'The ground loop is the long-lived part. The polyethylene piping is typically warranted for 50 years and expected to last longer. Heat pumps are replaced on a normal mechanical cycle of roughly 20 to 25 years, and a standard HVAC technician can maintain them.',
  },
  {
    q: 'What does a Thermal Energy Network cost, and when does it make financial sense?',
    a: (
      <>
        The answer to this question is nuanced and needs to be developed for each application. Financial viability
        often pivots on three questions: How large a load can you connect within a small geographic circle? What{' '}
        <a href="#thermal-resources" className={proseLinkClass}>
          thermal resources
        </a>{' '}
        are nearby? And what existing building systems are currently operating in the buildings being considered? State
        and federal tax credits and incentives can go a long way toward making a{' '}
        <a href="#networks" className={proseLinkClass}>
          Thermal Energy Network
        </a>{' '}
        financially viable.
      </>
    ),
  },
  {
    q: 'Who owns and operates the network, and what happens if the development changes?',
    a: 'Ownership can sit with a public entity, a utility, or a third party. Settle early who finances, operates, meters, and decides when the network expands. Those questions, taken up alongside the technical work, keep projects from stalling. Load diversity modeling and reserved capacity are how you plan for buildings joining, leaving, or changing use without treating every lease change as a redesign.',
  },
  {
    q: 'Will a Thermal Energy Network require an electrical service upgrade?',
    a: 'Often, the electrical service upgrade for a Thermal Energy Network is smaller than building-by-building electrification. Sometimes an upgrade is avoided, because building diversity and thermal storage flatten the coincident electrical peaks. Those peaks usually fall in the coldest and hottest months, when heating and cooling are needed most. What is required is site-specific. It depends on whether the network’s coincident load fits the feeder, the utility line that serves the site.',
  },
  {
    q: 'What else should a community consider?',
    a: 'Besides energy efficiency, cost, and resilience, a Thermal Energy Network can lower carbon emissions, supply both heating and cooling from one system, improve air quality, and invest in energy produced locally.',
  },
]

const loopCaptions: Record<string, string> = {
  'load-sharing':
    'Heat moves from the civic building to campus while cooling moves from housing to the hospital. Buildings need heat and cooling at different times: in summer, housing calls for cooling in the evening and offices during the workday, while grocery stores, gyms, restaurants, rinks, labs, and data centers reject heat year-round. Side by side, an unconnected pair can be heating and cooling at once, so more energy has to be supplied. Sharing cuts that total. System design and controls are how the exchange is tuned.',
  'ground-battery':
    'Summer heat leaves the campus and is stored in the ground, then comes back out to warm housing in winter. Cooling repeats the pattern. The steps in the ground show it filling and emptying, across a day, a week, or a season. What the diagram draws as stored cooling is heat rejected into the ground, which is what later lets the loop serve cooling. The ground works as a thermal battery through geoexchange boreholes. How well it does that depends on understanding the ground and on shifting loads.',
  'process-energy':
    'Heat collected at the data center is redirected along the loop to the hospital, housing, campus, and the civic building. A large share of the energy a community uses is rejected as heat. On the loop, that heat can be captured and reused instead of thrown away.',
  'multi-source':
    'The data center is rejecting heat. The borefield and the wastewater exchanger can supply heat or take it, depending on the season and on what the community already has. An ambient loop can tie those assets into one circuit. The next section explains each resource.',
}

function Building({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y - h} width={w} height={h} fill="#5a6168" />
}

export function GeoTypesFigure({ brief = false }: { brief?: boolean } = {}) {
  return (
    <figure id="geo-types" className="mt-12 border border-ge-light bg-white">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 960 460"
          role="img"
          aria-labelledby="geo-types-title geo-types-desc"
          className="min-w-[720px] w-full"
        >
          <title id="geo-types-title">Different types of geothermal energy</title>
          <desc id="geo-types-desc">
            Four columns. Geo power and geo district are deep, high-temperature wells. A single-building
            loop and a thermal energy network stay in the shallow, low-temperature ground.
          </desc>
          <rect x="0" y="168" width="960" height="250" fill="#f3f1ef" />
          <rect x="0" y="168" width="480" height="250" fill="#c0392b" opacity="0.08" />
          <rect x="480" y="168" width="480" height="250" fill="#426255" opacity="0.1" />
          <line x1="0" y1="168" x2="960" y2="168" stroke="#14171a" strokeWidth="2" />
          <line x1="480" y1="72" x2="480" y2="418" stroke="#14171a" strokeOpacity="0.15" strokeDasharray="3 4" />

          <text x="120" y="28" textAnchor="middle" fill="#14171a" fontSize="16" fontWeight="700" className="font-display">
            GEO POWER
          </text>
          <text x="120" y="48" textAnchor="middle" fill="#5a6168" fontSize="12" className="font-body">
            Electricity
          </text>
          <Building x={78} y={168} w={84} h={46} />
          <rect x="92" y="96" width="8" height="26" fill="#2e3338" />
          <rect x="112" y="104" width="8" height="18" fill="#2e3338" />
          <line x1="120" y1="168" x2="120" y2="360" stroke="#c0392b" strokeWidth="4" />
          <text x="120" y="392" textAnchor="middle" fill="#14171a" fontSize="13" fontWeight="600" className="font-body">
            ~250°F and up
          </text>

          <text x="360" y="28" textAnchor="middle" fill="#14171a" fontSize="16" fontWeight="700" className="font-display">
            GEO DISTRICT
          </text>
          <text x="360" y="48" textAnchor="middle" fill="#5a6168" fontSize="12" className="font-body">
            Direct-use heating
          </text>
          <Building x={292} y={168} w={34} h={40} />
          <Building x={332} y={168} w={28} h={62} />
          <Building x={366} y={168} w={42} h={32} />
          <line x1="328" y1="168" x2="328" y2="300" stroke="#c0392b" strokeWidth="3.5" />
          <line x1="392" y1="168" x2="392" y2="300" stroke="#1a5fd0" strokeWidth="3.5" />
          <text x="360" y="392" textAnchor="middle" fill="#14171a" fontSize="13" fontWeight="600" className="font-body">
            ~80–200°F
          </text>

          <text x="600" y="28" textAnchor="middle" fill="#14171a" fontSize="16" fontWeight="700" className="font-display">
            GEO BUILDING
          </text>
          <text x="600" y="48" textAnchor="middle" fill="#5a6168" fontSize="12" className="font-body">
            Heating and cooling
          </text>
          <polygon points="556,168 600,128 644,168" fill="#2e3338" />
          <Building x={568} y={168} w={64} h={36} />
          <path d="M576 168 V230 H624 V168" fill="none" stroke="#426255" strokeWidth="3.5" />
          <text x="600" y="392" textAnchor="middle" fill="#14171a" fontSize="13" fontWeight="600" className="font-body">
            ~45–60°F
          </text>

          <text x="840" y="28" textAnchor="middle" fill="#14171a" fontSize="16" fontWeight="700" className="font-display">
            THERMAL ENERGY NETWORK
          </text>
          <text x="840" y="48" textAnchor="middle" fill="#5a6168" fontSize="12" className="font-body">
            Heating and cooling
          </text>
          <Building x={748} y={168} w={26} h={36} />
          <Building x={780} y={168} w={22} h={54} />
          <Building x={808} y={168} w={30} h={28} />
          <Building x={844} y={168} w={24} h={46} />
          <Building x={874} y={168} w={36} h={34} />
          <line x1="748" y1="198" x2="920" y2="198" stroke="#426255" strokeWidth="4" />
          <line x1="761" y1="168" x2="761" y2="198" stroke="#426255" strokeWidth="2.5" />
          <line x1="791" y1="168" x2="791" y2="198" stroke="#426255" strokeWidth="2.5" />
          <line x1="823" y1="168" x2="823" y2="198" stroke="#426255" strokeWidth="2.5" />
          <line x1="856" y1="168" x2="856" y2="198" stroke="#426255" strokeWidth="2.5" />
          <line x1="892" y1="168" x2="892" y2="198" stroke="#426255" strokeWidth="2.5" />
          <line x1="770" y1="198" x2="770" y2="268" stroke="#426255" strokeWidth="3" />
          <line x1="834" y1="198" x2="834" y2="268" stroke="#426255" strokeWidth="3" />
          <line x1="900" y1="198" x2="900" y2="268" stroke="#426255" strokeWidth="3" />
          <text x="840" y="392" textAnchor="middle" fill="#14171a" fontSize="13" fontWeight="600" className="font-body">
            Ground ~45–65°F
          </text>

          <text x="240" y="436" textAnchor="middle" fill="#14171a" fontSize="12" fontWeight="700" letterSpacing="0.16em" className="font-display">
            HIGH TEMPERATURE
          </text>
          <text x="720" y="436" textAnchor="middle" fill="#14171a" fontSize="12" fontWeight="700" letterSpacing="0.16em" className="font-display">
            LOW TEMPERATURE
          </text>
        </svg>
      </div>
      <figcaption className="border-t border-ge-light px-6 py-5 sm:px-8">
        {brief ? (
          <>
            <p className="font-body text-sm leading-relaxed text-ge-graphite">
              Geothermal here means shallow heating and cooling, and a network is the shared version.
            </p>
            <MoreInfo>
              <p>
                Shallow systems can be built in ordinary ground. Deep power wells cannot. Whether a shallow system is
                worth building is a cost question. The 45–65°F label is the ground beside the network. The water in the
                loop, about 45–95°F, is in the next section. Done right, a larger and more diverse network is more
                affordable, efficient, and resilient.
              </p>
            </MoreInfo>
            <p className="mt-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Credit: HEET
            </p>
          </>
        ) : (
          <>
            <p className="font-body text-sm leading-relaxed text-ge-graphite">
              Geothermal here means heating and cooling. A Thermal Energy Network is a heat-pump system, and geoexchange
              is its most common thermal asset. Shallow systems can be built in ordinary ground. Deep power wells cannot.
              Whether a shallow system is worth building is a cost question. The 45–95°F range of the water in the loop is
              in the next section.
            </p>
            <p className="mt-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Credit: HEET
            </p>
          </>
        )}
      </figcaption>
    </figure>
  )
}

const generations = [
  {
    name: '1st generation',
    year: '1890',
    kind: 'Pressurized steam',
    temp: 210,
    efficiency: 32,
    sources: ['Steam storage', 'Coal waste'],
  },
  {
    name: '2nd generation',
    year: '1930',
    kind: 'Pressurized hot water',
    temp: 155,
    efficiency: 92,
    sources: ['Heat storage', 'Fossil-fuel combined heat and power', 'Coal waste'],
  },
  {
    name: '3rd generation',
    year: '1980',
    kind: 'Hot water',
    temp: 102,
    efficiency: 142,
    sources: ['Fossil and biomass combined heat and power', 'Industrial waste heat', 'Coal waste'],
  },
  {
    name: '4th generation',
    year: '2010',
    kind: 'Hot water, improved controls',
    temp: 70,
    efficiency: 176,
    sources: [
      'Combined heat and power',
      'Industrial waste heat',
      'Thermal storage',
      'High-temperature ground-source heat pumps',
      'Solar thermal',
    ],
  },
  {
    name: '5th generation',
    year: '2020',
    kind: 'Ambient-temperature heating and cooling',
    temp: 30,
    efficiency: 208,
    sources: [
      'Distributed ground-source heat pumps',
      'Low-grade heat recovery',
      'Low-grade thermal storage',
      'Renewable sources',
    ],
  },
] as const

function curvePath(values: readonly number[], yOf: (n: number) => number) {
  const pts = values.map((value, i) => ({ x: 108 + i * 148, y: yOf(value) }))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`
  }
  return d
}

export function EfficiencyChart({ brief = false }: { brief?: boolean } = {}) {
  const yOf = (c: number) => 36 + ((225 - c) / 200) * 196
  const tempPath = curvePath(
    generations.map((g) => g.temp),
    yOf,
  )
  const effPath = curvePath(
    generations.map((g) => g.efficiency),
    yOf,
  )
  const ticks = [225, 175, 125, 75, 25]

  return (
    <figure className="mt-12 border border-ge-light bg-white">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 860 280"
          role="img"
          aria-labelledby="eff-title eff-desc"
          className="min-w-[680px] w-full"
        >
          <title id="eff-title">Efficiency versus temperature</title>
          <desc id="eff-desc">
            Distribution temperature falls from about 210 degrees Celsius in 1890 to about 30 degrees Celsius in 2020,
            while efficiency rises. The fifth generation is ambient-temperature heating and cooling.
          </desc>
          {generations.map((g, i) => (
            <rect
              key={g.year}
              x={70 + i * 148}
              y="28"
              width="148"
              height="210"
              fill={i % 2 === 0 ? '#f7f7f8' : '#ffffff'}
            />
          ))}
          <rect x={70 + 4 * 148} y="28" width="148" height="210" fill="#426255" opacity="0.08" />
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1="70" y1={yOf(tick)} x2="810" y2={yOf(tick)} stroke="#e4e6e8" strokeWidth="1" />
              <text x="62" y={yOf(tick) + 4} textAnchor="end" fill="#5a6168" fontSize="11" className="font-body">
                {tick}
              </text>
            </g>
          ))}
          <text
            x="18"
            y="150"
            fill="#5a6168"
            fontSize="11"
            textAnchor="middle"
            transform="rotate(-90 18 150)"
            className="font-body"
          >
            Temperature in distribution piping (°C)
          </text>
          <path d={tempPath} fill="none" stroke="#c0392b" strokeWidth="3" />
          <path d={effPath} fill="none" stroke="#426255" strokeWidth="3" />
          <text x="250" y={yOf(155) - 10} fill="#c0392b" fontSize="12" fontWeight="700" className="font-display">
            TEMPERATURE
          </text>
          <text x="430" y={yOf(142) + 18} fill="#426255" fontSize="12" fontWeight="700" className="font-display">
            EFFICIENCY
          </text>
          {generations.map((g, i) => (
            <text
              key={g.year}
              x={144 + i * 148}
              y="268"
              textAnchor="middle"
              fill="#14171a"
              fontSize="12"
              fontWeight="600"
              className="font-body"
            >
              {g.year}
            </text>
          ))}
        </svg>
      </div>
      {!brief && (
        <ol className="grid gap-px border-t border-ge-light bg-ge-light sm:grid-cols-2 lg:grid-cols-5">
          {generations.map((g) => (
            <li key={g.year} className="bg-white p-4">
              <p className="font-display text-sm font-bold uppercase tracking-wide text-ge-black">{g.name}</p>
              <p className="mt-1 font-body text-[11px] uppercase tracking-[0.12em] text-ge-graphite">
                {g.year} · {g.kind}
              </p>
              <ul className="mt-3 space-y-1">
                {g.sources.map((source) => (
                  <li key={source} className="font-body text-xs leading-relaxed text-ge-graphite">
                    {source}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      )}
      <figcaption className="border-t border-ge-light px-6 py-5 sm:px-8">
        {brief ? (
          <>
            <p className="font-body text-sm leading-relaxed text-ge-graphite">
              Lower distribution temperature goes with higher efficiency. The highlighted band is fifth-generation
              ambient heating and cooling.
            </p>
            <MoreInfo>
              <ul className="space-y-3">
                {generations.map((g) => (
                  <li key={g.year}>
                    <span className="font-display font-bold uppercase tracking-wide text-ge-black">{g.name}</span>
                    <span>
                      {' '}
                      · {g.year} · {g.kind}
                    </span>
                    <span className="mt-1 block">{g.sources.join('. ')}.</span>
                  </li>
                ))}
              </ul>
              <p>
                The right-hand end, about 30°C (roughly 85°F), sits inside the 45–95°F loop. The first three
                generations span about two centuries. The fourth and fifth arrived within the last 30 years and
                overlap, which is why the names get mixed up. A community can move from an older hot-water system
                straight to an ambient loop. Whether a fourth- or fifth-generation system fits depends on the site.
              </p>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
                Credit: Connor Dacquay
              </p>
            </MoreInfo>
          </>
        ) : (
          <>
            <p className="font-body text-sm leading-relaxed text-ge-graphite">
              Lower distribution temperature goes with higher efficiency, because the heat pump bridges a smaller gap. The
              right-hand end, about 30°C (roughly 85°F), sits inside the 45–95°F loop. The first three generations span
              about two centuries. The fourth and fifth arrived within the last 30 years and overlap, which is why the
              names get mixed up. A community can move from an older hot-water system straight to an ambient loop. Whether
              a fourth- or fifth-generation system fits depends on the site.
            </p>
            <p className="mt-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Credit: Connor Dacquay
            </p>
          </>
        )}
      </figcaption>
    </figure>
  )
}

export default function PreviewTens101() {
  usePageMeta({
    title: 'Preview — Thermal Energy Networks 101 — The GreyEdge Group',
    description: 'Draft of Megan’s review of the how-it-works page. Not the live site.',
    image: site['network-diagram'].src,
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [schematicOpen, setSchematicOpen] = useState(false)
  const schematicBtnRef = useRef<HTMLButtonElement>(null)
  const schematicCloseRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!schematicOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    schematicCloseRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSchematicOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
      schematicBtnRef.current?.focus()
    }
  }, [schematicOpen])

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 text-center font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · Megan’s TEN 101 review ·{' '}
          <Link to="/geothermal-101" className="underline underline-offset-2 hover:text-white/80">
            Back to live page
          </Link>
        </p>
      </div>

      <PageHero
        eyebrow="How it works"
        title="Thermal Energy Networks 101"
        lead="Built from decades of industry experience, this guide explains what thermal energy networks are, why they work, and how they help solve the energy, cost, and infrastructure challenges facing communities today."
      />

      <Section id="networks" className="bg-white">
        <Container>
          <Reveal>
            <div className="max-lg:grid max-lg:grid-cols-1 max-lg:gap-8 lg:flow-root">
              <button
                ref={schematicBtnRef}
                type="button"
                data-ga-label="preview_tens_schematic_open"
                onClick={() => setSchematicOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={schematicOpen}
                title="View schematic"
                className="group relative w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-ge-accent focus-visible:outline-offset-2 max-lg:order-2 lg:float-right lg:mb-6 lg:ml-16 lg:w-[52.5%]"
              >
                <img src={schematic.src} alt={schematic.alt} className="img-cut w-full" loading="lazy" />
                <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ge-black/25 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-3">
                  <span className="inline-flex items-center gap-2 bg-ge-black px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    View schematic
                  </span>
                </span>
              </button>
              <div className="max-lg:order-1">
                <Eyebrow>The Concept</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                  Thermal Energy Networks
                </h2>
                <div className="mt-6 border-l-2 border-ge-accent pl-6">
                  <p className="font-body text-lg leading-relaxed text-ge-charcoal">
                    A Thermal Energy Network connects buildings and thermal resources in a shared water loop, so heat
                    moves through the system to the buildings that need it, instead of each building generating,
                    rejecting, and replacing that heat on its own.
                  </p>
                </div>
              </div>
              <div className="max-lg:order-3">
                <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite lg:mt-5">
                  The power of the system comes from its ability to leverage diversity. Offices, apartments, schools,
                  hospitals, and other building types use heating and cooling on different schedules. By sharing energy
                  across the network, one building&rsquo;s cooling can become another&rsquo;s heat, improving overall
                  system efficiency and reducing wasted energy.
                </p>
                <p className="mt-5 clear-both font-body text-base leading-relaxed text-ge-graphite">
                  A Thermal Energy Network is not a geothermal technology. It is a heat pump system that seeks to use
                  the most cost-effective source, sink, and storage option, or a mix of them, to satisfy the heating
                  and cooling needs of its buildings. Geoexchange is a common and extremely valuable resource that TENs
                  tap into, but it is one of many potential{' '}
                  <a href="#thermal-resources" className={proseLinkClass}>
                    thermal resources
                  </a>{' '}
                  that can be connected to the network.
                </p>
              </div>
            </div>
          </Reveal>
          <GeoTypesFigure />
          <p className="mt-8 font-body text-base leading-relaxed text-ge-graphite">
            As communities work to reduce emissions, manage electrical demand, and plan for future growth, Thermal
            Energy Networks offer a practical framework for delivering heating and cooling at scale. They require less
            installed capacity, lower peak demand, improve system resilience, and become more effective as additional
            buildings are connected. Done right, the larger and more diverse the network, the more affordable,
            efficient, and resilient it becomes.
          </p>
        </Container>
      </Section>

      <Section id="ambient-loops" className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>The Mechanism</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Ambient temperature loops
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              An Ambient Temperature Loop is the backbone of a modern Thermal Energy Network. The water in the loop
              circulates at about 45°F to 95°F, near the temperature of the shallow ground, rather than as
              high-temperature and chilled water sent out from a central plant. That band sits well below
              high-temperature direct use, about 80°F to 200°F, and far below the 250°F and up of a power well.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              Each building uses heat pumps to provide the precise heating or cooling it needs, while the network moves
              thermal energy along the least-cost path: the most useful heat for the least energy and cost. Because the
              loop stays in that 45–95°F band, distribution losses drop, efficiency rises, and buildings can exchange
              energy with far less infrastructure than a traditional district system.
            </p>
          </Reveal>

          <EfficiencyChart />

          <div className="mt-14">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Adapted from HEET and MIT D-Lab
            </p>
            <div className="mt-4 grid gap-px bg-ge-light md:grid-cols-3">
              {components.map((c, i) => (
                <Reveal key={c.t} delay={i * 0.06} className="bg-white">
                  <div className="group flex h-full flex-col p-8">
                    <span className="rule-grow mb-5" />
                    <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-accent">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                      {c.t}
                    </h3>
                    <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{c.b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-px grid gap-px bg-ge-light md:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06} className="bg-white">
                <div className="group flex h-full flex-col p-8">
                  <span className="rule-grow mb-5" />
                  <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                    {c.t}
                  </h3>
                  <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <AtlExplainer
        panelNoun="concept"
        captions={loopCaptions}
        intro={
          <>
            <p>
              The Thermal Highway® is GreyEdge’s approach to connecting buildings and{' '}
              <a href="#thermal-resources" className={proseLinkClass}>
                thermal resources
              </a>{' '}
              across a district through one shared ambient circuit. That circuit is usually one or two pipes, carrying
              water at about 45°F to 95°F, and it can take the place of separate hot and chilled distribution.
            </p>
            <p>
              As energy moves through the network, it can be exchanged between buildings, stored for later use,
              recovered from sources like wastewater or data centers, or supplied by several thermal resources working
              together. The four concepts below show how the same loop balances, moves, and delivers energy along the
              least-cost path.
            </p>
          </>
        }
      />

      <Section id="thermal-resources" className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <Eyebrow>The Resources</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                Unlocking Local Energy Resources
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite">
                Thermal resources are the places a network can draw heat from, store heat, or reject excess heat. Many
                communities already have valuable thermal assets hidden in plain sight, including geoexchange,
                wastewater systems, data centers, and industrial processes. The mix is unique to each site and network
                — not a generic template. Together, these resources help balance the network, improve efficiency, and
                reduce the need for new energy inputs year-round.
              </p>
              <blockquote className="my-8 border-l-2 border-ge-accent pl-7">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black">
                  The energy your network needs may already be flowing through your community.
                </p>
              </blockquote>
              <p className="font-body text-base leading-relaxed text-ge-graphite">Part of our evaluation work is finding it.</p>
              <Btn to="/contact" track="preview_tens_evaluate_resources" variant="outline" className="mt-8">
                Evaluate your resources
              </Btn>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="border-t border-ge-light">
                {sources.map((s) => (
                  <li key={s.name} className="flex gap-4 border-b border-ge-light py-5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                    <div>
                      <div className="font-display text-lg font-bold uppercase tracking-wide text-ge-black">{s.name}</div>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ge-graphite">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              The questions we get asked most
            </h2>
          </Reveal>

          <dl className="mt-12 border-t border-ge-light">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-ge-light">
                <dt>
                  <button
                    data-ga-label={gaLabel('preview_tens_faq', f.q)}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                      {f.q}
                    </span>
                    <svg
                      className={`mt-1.5 h-4 w-4 shrink-0 text-ge-accent transition-transform ${openFaq === i ? 'rotate-45' : ''}`}
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </dt>
                {openFaq === i && (
                  <dd className="fade-slide-up max-w-3xl pb-7 font-body text-base leading-relaxed text-ge-graphite">{f.a}</dd>
                )}
              </div>
            ))}
          </dl>

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 border border-ge-light bg-ge-offwhite p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">Still have a question?</h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ge-graphite">
                  Bring us what you have: a site, a study, a constraint, or just a hunch. We&rsquo;ll tell you what we
                  see.
                </p>
              </div>
              <Btn to={doors.consultation.to} track="preview_tens_talk_through_project" className="shrink-0">
                Talk through your project
              </Btn>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />

      {schematicOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ge-black/85 p-4 md:p-10"
          onClick={() => setSchematicOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="schematic-dialog-title"
            className="relative max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="schematic-dialog-title" className="sr-only">
              Ambient temperature loop schematic
            </h2>
            <button
              ref={schematicCloseRef}
              type="button"
              data-ga-label="preview_tens_schematic_close"
              onClick={() => setSchematicOpen(false)}
              aria-label="Close schematic"
              className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center bg-ge-black text-white transition-colors hover:text-ge-accent-bright"
            >
              <svg className="h-4 w-4 rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <img src={schematic.src} alt={schematic.alt} className="max-h-[90vh] w-auto max-w-full" />
          </div>
        </div>
      )}
    </>
  )
}

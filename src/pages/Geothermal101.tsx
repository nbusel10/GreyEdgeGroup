import { useEffect, useRef, useState, type ReactNode } from 'react'
import { site } from '../content/images'
import { loopConceptMore } from '../content/loopConceptNotes'
import { doors } from '../content/advantage'
import GeoTypeArt from '../components/GeoTypeArt'
import PageHero from '../components/PageHero'
import AtlExplainer from '../components/sections/AtlExplainer'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

const schematic = {
  src: '/images/site/atl-schematic-nextemp.png',
  alt: 'Schematic of an ambient temperature loop connecting buildings and thermal resources, including geoexchange, surface water, solar thermal and storage.',
}

const geoTypes = [
  {
    id: 'power',
    t: 'Geo power',
    b: 'Electricity from deep wells, about 250°F and up. High temperature. Only in a few places.',
  },
  {
    id: 'district',
    t: 'Geo district',
    b: 'Direct-use heating from deep wells, about 80°F to 200°F. High temperature.',
  },
  {
    id: 'building',
    t: 'Geo building',
    b: 'Heating and cooling for one building from a shallow loop, about 45°F to 60°F. Low temperature.',
  },
  {
    id: 'network',
    t: 'Thermal energy network',
    b: 'Heating and cooling shared across buildings. The shallow ground beside it is about 45°F to 65°F. Low temperature.',
  },
] as const

const sources = [
  { name: 'The ground', detail: 'A stable thermal reservoir available year-round in virtually every climate.' },
  { name: 'Wastewater', detail: 'Municipal sewer mains carry a remarkably consistent thermal load.' },
  { name: 'Industrial waste heat', detail: 'Data centers, laundries, manufacturing and other processes can reject large amounts of usable heat.' },
  { name: 'Solar thermal', detail: 'Solar energy captured as heat and stored in the ground for later use.' },
  { name: 'Mine water', detail: 'Flooded workings hold enormous stable thermal mass near former mining towns.' },
  { name: 'Surface water', detail: 'Lakes, rivers and reservoirs, where permitting allows.' },
]

const FAQ_LEAD = 4

type FaqItem = { q: string; a: ReactNode; find?: string }

const faqs: FaqItem[] = [
  {
    q: 'What does a Thermal Energy Network cost, and when does it make financial sense?',
    find: 'The answer to this question is nuanced and needs to be developed for each application. Financial viability often pivots on three questions: How large a load can you connect within a small geographic circle? What thermal resources are nearby? And what existing building systems are currently operating in the buildings being considered? State and federal tax credits and incentives can go a long way toward making a Thermal Energy Network financially viable.',
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
    q: 'Is this the same as geothermal power?',
    a: 'No. Geothermal power generation taps very high temperature resources to spin a turbine, and only works in a few places on earth. What we do is ground-source heat exchange: we use the stable moderate temperature of the shallow ground as a place to put heat in summer and take heat from in winter. It works essentially anywhere.',
  },
  {
    q: 'How is a Thermal Energy Network different from conventional district heating and cooling?',
    a: 'Conventional district systems push hot or chilled water from a central plant to every building. A Thermal Energy Network is an ambient temperature loop: buildings and thermal resources trade usable heat within a shared pipe, and each building’s heat pumps make the final temperature lift. Thermal resources are distributed around the loop, which increases the system’s resiliency and efficiency.',
  },
  {
    q: 'Does every Thermal Energy Network need a geothermal borefield?',
    a: 'No. Geoexchange is one common source, sink, and storage option, not a requirement for every network. Wastewater, process heat, surface water, mine water, and building-to-building diversity can share the load, which often shrinks how much field you need. When you do drill, bores commonly sit under parking, fields, or the building footprint.',
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
    q: 'Can the network be built in phases as a development grows?',
    a: 'Yes, and that is usually how districts get built. Design the backbone for known phase-one loads, then leave connection points and reserved capacity so later buildings or thermal resources can join without rebuilding the pipe. The goal is expandable infrastructure, not a one-shot plant sized only for today’s tenants.',
  },
  {
    q: 'What happens when heating and cooling loads don’t balance?',
    a: 'The loop uses thermal resources as a balancing account. When buildings cannot offset one another directly, surplus heat goes into the ground, wastewater, or another sink on the network, and a shortfall is drawn from the same places. That is why geoexchange, process heat and storage sit on the loop: they absorb the difference so far less heat has to be rejected or produced from scratch.',
  },
  {
    q: 'How long do these systems last?',
    a: 'The ground loop is the long-lived part. The polyethylene piping is typically warranted for 50 years and expected to last longer. Heat pumps are replaced on a normal mechanical cycle of roughly 20 to 25 years.',
  },
  {
    q: 'Who owns and operates the network, and what happens if the development changes?',
    a: 'Ownership can sit with a public entity, a utility, or a third party. Settle early who finances, operates, meters, and decides when the network expands. Load diversity modeling and reserved capacity are how you plan for buildings joining, leaving, or changing use without treating every lease change as a redesign.',
  },
  {
    q: 'Will a Thermal Energy Network require an electrical service upgrade?',
    a: 'Often the upgrade is smaller than building-by-building electrification, and sometimes it is avoided, because diversity and thermal storage flatten coincident peaks. It is still site-specific: the right question is whether the network’s coincident load fits the feeder, not a promise that no upgrade is ever required.',
  },
]

function faqSearchText(f: FaqItem) {
  const body = f.find ?? (typeof f.a === 'string' ? f.a : '')
  return `${f.q} ${body}`.toLowerCase()
}

function FaqPlus({ open, className = 'mt-1.5' }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-ge-accent transition-transform ${open ? 'rotate-45' : ''} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function FaqList({
  items,
  open,
  onToggle,
}: {
  items: FaqItem[]
  open: number | null
  onToggle: (i: number) => void
}) {
  return (
    <dl className="border-t border-ge-light">
      {items.map((f, i) => (
        <div key={f.q} className="border-b border-ge-light">
          <dt>
            <button
              type="button"
              onClick={() => onToggle(i)}
              aria-expanded={open === i}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                {f.q}
              </span>
              <FaqPlus open={open === i} />
            </button>
          </dt>
          {open === i && (
            <dd className="fade-slide-up max-w-3xl pb-7 font-body text-base leading-relaxed text-ge-graphite">{f.a}</dd>
          )}
        </div>
      ))}
    </dl>
  )
}

export default function Geothermal101() {
  usePageMeta({
    title: 'Thermal Energy Networks 101 — The GreyEdge Group',
    description:
      'How Thermal Energy Networks, ambient temperature loops and district-scale geothermal actually work, explained without the jargon.',
    image: site['network-diagram'].src,
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [openMoreFaq, setOpenMoreFaq] = useState<number | null>(null)
  const [moreFaqs, setMoreFaqs] = useState(false)
  const [faqQuery, setFaqQuery] = useState('')
  const faqQueryText = faqQuery.trim().toLowerCase()
  const faqMatches = faqQueryText ? faqs.filter((f) => faqSearchText(f).includes(faqQueryText)) : []
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
      <PageHero
        eyebrow="How it works"
        title="Thermal Energy Networks 101"
        lead="Built from decades of industry experience, this guide explains what thermal energy networks are, why they work, and how they help solve the energy, cost, and infrastructure challenges facing communities today."
      />

      <AtlExplainer panelNoun="concept" more={loopConceptMore()} moreFullWidth borderTop={false} />

      <Section id="geo-types" className="border-y border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>The types</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Geothermal Energy
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              Geothermal covers several very different things, and they get lumped under one name. Some of it is deep
              and hot: wells hot enough to make electricity, or hot water brought straight up for heat. Those resources
              are uncommon, and they depend on unusually hot geology. Most of what matters for buildings is shallow
              heating and cooling. In the shallow ground, the temperature stays mild all year in almost any climate. One
              building can use that steady temperature on its own, and a group of buildings can share it.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ge-light sm:grid-cols-2 xl:grid-cols-4">
            {geoTypes.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06} className="bg-white">
                <div className="group flex h-full flex-col">
                  <GeoTypeArt variant={c.id} />
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <span className="rule-grow mb-5" />
                    <h3 className="font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                      {c.t}
                    </h3>
                    <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{c.b}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 font-body text-base leading-relaxed text-ge-graphite">
            The shallow ground is a useful resource, and a network can use it. The GreyEdge Group brings buildings
            onto one shared heating and cooling system, a{' '}
            <a href="#networks" className={proseLinkClass}>Thermal Energy Network</a>.
          </p>
        </Container>
      </Section>

      {/* What is a TEN */}
      <Section id="networks" className="bg-white">
        <Container>
          <Reveal>
            <div className="max-lg:grid max-lg:grid-cols-1 max-lg:gap-8 lg:flow-root">
              <button
                ref={schematicBtnRef}
                type="button"
                onClick={() => setSchematicOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={schematicOpen}
                title="View schematic"
                className="group relative w-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-ge-accent focus-visible:outline-offset-2 max-lg:order-2 lg:float-right lg:mb-6 lg:ml-16 lg:w-[52.5%]"
              >
                <img src={schematic.src} alt={schematic.alt} className="img-cut w-full" loading="lazy" />
                <span className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ge-black/25 via-transparent to-transparent p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:p-3">
                  <span className="inline-flex items-center gap-2 bg-ge-black px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
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
                    A Thermal Energy Network connects buildings and thermal resources in a shared water loop, allowing heat to
                    move where it is needed in a system instead of being generated, rejected, and replaced by each
                    building independently.
                  </p>
                </div>
              </div>
              <div className="max-lg:order-3">
                <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite lg:mt-5">
                  The power of the system comes from its ability to leverage diversity. Offices, apartments, schools, hospitals, and other
                  building types use heating and cooling on different schedules. By sharing energy across the network,
                  one building&rsquo;s cooling can become another&rsquo;s heat, improving overall system
                  efficiency and reducing wasted energy.
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
                <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                  As communities work to reduce emissions, manage electrical demand, and plan for future growth, Thermal
                  Energy Networks offer a practical framework for delivering heating and cooling at scale. They require
                  less installed capacity, lower peak demand, improve system resilience, and become more effective as
                  additional buildings are connected. Simply put, the larger and more diverse the network, the stronger
                  the performance and economics become.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Ambient temperature loops */}
      <Section id="ambient-loops" className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>The Mechanism</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Ambient temperature loops
            </h2>
            <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              An Ambient Temperature Loop is the backbone of a modern Thermal Energy Network. Rather than
              distributing high-temperature and chilled water throughout a district, the loop operates near the natural
              temperature (about 45°F to 65°F) of the surrounding ground, creating a shared thermal highway that all
              connected buildings can access.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              Each building uses heat pumps to provide the precise heating or cooling it needs, while the network
              continuously moves thermal energy and prioritizes the most cost effective energy path. Because the loop is maintained
              close to ambient ground temperatures, distribution losses are significantly reduced, efficiency is
              improved, and buildings can exchange energy across the network with far less infrastructure than
              traditional district energy systems.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ge-light md:grid-cols-3">
            {[
              {
                t: 'Expandable by Design',
                b: 'New buildings and retrofitted buildings can connect to the loop over time, allowing the network to grow as community needs evolve.',
              },
              {
                t: 'Energy Sharing Network',
                b: 'Buildings can exchange thermal energy with one another, reducing wasted heat and improving overall system efficiency.',
              },
              {
                t: 'Low-Loss Distribution',
                b: 'Because the loop operates near ground temperature, energy can move through the network with minimal distribution losses.',
              },
            ].map((c, i) => (
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

      {/* Sources */}
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
                wastewater systems, data centers, and industrial processes. Sources, sinks, and storage are unique to
                each site and network — not a generic template. Together, these resources help balance the network,
                improve efficiency, and reduce the need for new energy inputs year-round.
              </p>
              <blockquote className="my-8 border-l-2 border-ge-accent pl-7">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black">
                  The energy your network needs may already be flowing through your community.
                </p>
              </blockquote>
              <p className="font-body text-base leading-relaxed text-ge-graphite">
                Part of our evaluation work is finding it.
              </p>
              <Btn to="/contact" variant="outline" className="mt-8">
                Evaluate your resources
              </Btn>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="border-t border-ge-light">
                {sources.map((s) => (
                  <li key={s.name} className="flex gap-4 border-b border-ge-light py-5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                    <div>
                      <div className="font-display text-lg font-bold uppercase tracking-wide text-ge-black">
                        {s.name}
                      </div>
                      <p className="mt-1 font-body text-sm leading-relaxed text-ge-graphite">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <Eyebrow>Common Questions</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              The questions we get asked most
            </h2>
          </Reveal>

          <label className="mt-10 block max-w-xl">
            <span className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Search questions
            </span>
            <input
              value={faqQuery}
              onChange={(e) => {
                setFaqQuery(e.target.value)
                setOpenFaq(null)
                setOpenMoreFaq(null)
              }}
              placeholder="Cold climates, ownership, financial…"
              className="mt-2 w-full border border-ge-light bg-white px-4 py-3 font-body text-sm text-ge-black placeholder:text-ge-steel focus:border-ge-accent focus:outline-none"
            />
          </label>

          <div className="mt-8">
            {faqQuery.trim() ? (
              faqMatches.length > 0 ? (
                <FaqList
                  items={faqMatches}
                  open={openFaq}
                  onToggle={(i) => setOpenFaq(openFaq === i ? null : i)}
                />
              ) : (
                <p className="border-y border-ge-light py-6 font-body text-base text-ge-graphite">No questions match.</p>
              )
            ) : (
              <>
                <FaqList
                  items={faqs.slice(0, FAQ_LEAD)}
                  open={openFaq}
                  onToggle={(i) => setOpenFaq(openFaq === i ? null : i)}
                />
                <button
                  type="button"
                  onClick={() => {
                    setMoreFaqs((open) => !open)
                    if (moreFaqs) setOpenMoreFaq(null)
                  }}
                  aria-expanded={moreFaqs}
                  className="flex w-full items-center justify-between gap-6 border-b border-ge-light py-6 text-left"
                >
                  <span className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                    More questions
                  </span>
                  <FaqPlus open={moreFaqs} className="" />
                </button>
                {moreFaqs && (
                  <FaqList
                    items={faqs.slice(FAQ_LEAD)}
                    open={openMoreFaq}
                    onToggle={(i) => setOpenMoreFaq(openMoreFaq === i ? null : i)}
                  />
                )}
              </>
            )}
          </div>

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 border border-ge-light bg-ge-offwhite p-8 md:flex-row md:items-center md:p-10">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">
                  Still have a question?
                </h3>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ge-graphite">
                  Bring us what you have: a site, a study, a constraint, or just a hunch. We&rsquo;ll tell you what we
                  see.
                </p>
              </div>
              <Btn to={doors.consultation.to} className="shrink-0">
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
              onClick={() => setSchematicOpen(false)}
              aria-label="Close schematic"
              className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center bg-ge-black text-white transition-colors hover:text-ge-accent-bright"
            >
              <svg className="h-4 w-4 rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <img
              src={schematic.src}
              alt={schematic.alt}
              className="max-h-[90vh] w-auto max-w-full"
            />
          </div>
        </div>
      )}
    </>
  )
}

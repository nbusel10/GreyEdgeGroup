import { useEffect, useRef, useState } from 'react'
import { site } from '../content/images'
import { doors } from '../content/advantage'
import PageHero from '../components/PageHero'
import AtlExplainer from '../components/sections/AtlExplainer'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

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
  {
    name: 'A unique mix',
    detail: 'Sources, sinks, and storage are unique to each site and network—not a generic template.',
  },
]

const faqs = [
  {
    q: 'Is this the same as geothermal power?',
    a: 'No. Geothermal power generation taps very high temperature resources to spin a turbine, and only works in a few places on earth. What we do is ground-source heat exchange: we use the stable moderate temperature of the shallow ground as a place to put heat in summer and take heat from in winter. It works essentially anywhere.',
  },
  {
    q: 'How is a Thermal Energy Network different from conventional district heating and cooling?',
    a: 'Conventional district systems push hot or chilled water from a central plant to every building. A Thermal Energy Network is an ambient temperature loop: buildings and thermal resources trade usable heat on a shared pipe, and each building’s heat pumps make the final temperature lift. Central plant can be smaller, hybrid, or eventually backup, because diversity does work the plant used to do alone.',
  },
  {
    q: 'Does every Thermal Energy Network need a geothermal borefield?',
    a: 'No. Geoexchange is one common source, sink, and storage option, not a requirement for every network. Wastewater, process heat, surface water, mine water, and building-to-building diversity can share the load, which often shrinks how much field you need. When you do drill, bores go down rather than out and commonly sit under parking, fields, or the building footprint.',
  },
  {
    q: 'Does it work in cold climates?',
    a: 'Particularly well. Below about six metres, ground temperature stays near the local annual average all year, so a system in Steamboat Springs is drawing from roughly 45°F ground while the air outside is below zero. The colder the air, the bigger the advantage over an air-source system.',
  },
  {
    q: 'Can an existing building connect to a Thermal Energy Network?',
    a: 'Often, yes. The building ties into the shared loop through a heat pump, or hydronics already able to work at those temperatures, so it can take heat from the network and give heat back. That is a connection, not a promise that the existing plant plugs in unchanged. Buildings still do the final lift locally; they no longer have to source or reject every unit of heat on their own.',
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
    a: 'The ground loop is the long-lived part. The polyethylene piping is typically warranted for 50 years and expected to last longer. Heat pumps are replaced on a normal mechanical cycle of roughly 20 to 25 years. We maintain operating relationships with systems that have run continuously for 15 to 18 years.',
  },
  {
    q: 'What does a Thermal Energy Network cost, and when does it make financial sense?',
    a: 'Compare lifecycle cost and avoided capacity, not bid-day HVAC alone. First cost can be higher or, with diversity and incentives, competitive; operating cost is usually where networks win. Sharing a loop across different load profiles means less coincident plant, less electrical peak, and often less field than sizing every building independently.',
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

export default function Geothermal101() {
  usePageMeta({
    title: 'Geothermal 101 — The GreyEdge Group',
    description:
      'How Thermal Energy Networks, ambient temperature loops and district-scale geothermal actually work, explained without the jargon.',
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
      <PageHero
        eyebrow="How it works"
        title="Geothermal 101"
        lead="Built from decades of industry experience, this guide explains what thermal energy networks are, why they work, and how they help solve the energy, cost, and infrastructure challenges facing communities today."
      />

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
                    move where it is needed instead of being generated, rejected, and replaced by each building
                    independently.
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
              temperature of the surrounding ground, creating a shared thermal highway that all connected
              buildings can access.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              Each building uses heat pumps to provide the precise heating or cooling it needs, while the network
              continuously moves thermal energy where it creates the most value. Because the loop is maintained
              close to ambient ground temperatures, distribution losses are significantly reduced, efficiency is
              improved, and buildings can exchange energy across the network with far less infrastructure than
              traditional district energy systems.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ge-light md:grid-cols-3">
            {[
              {
                t: 'Expandable by Design',
                b: 'New buildings can connect to the loop over time, allowing the network to grow as community needs evolve.',
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

      <AtlExplainer />

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
                wastewater systems, data centers, and industrial processes. Together, these resources help balance the
                network, improve efficiency, and reduce the need for new energy inputs year-round.
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

          <dl className="mt-12 border-t border-ge-light">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-ge-light">
                <dt>
                  <button
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
                  <dd className="fade-slide-up max-w-3xl pb-7 font-body text-base leading-relaxed text-ge-graphite">
                    {f.a}
                  </dd>
                )}
              </div>
            ))}
          </dl>

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

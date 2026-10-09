import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { doors } from '../content/advantage'
import PageHero from '../components/PageHero'
import MoreInfo from '../components/MoreInfo'
import AtlExplainer from '../components/sections/AtlExplainer'
import FinalCta from '../components/sections/FinalCta'
import { gaLabel } from '../lib/gaLabel'
import { Btn, Container, Eyebrow, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'
import { EfficiencyChart, GeoTypesFigure } from './PreviewTens101'

/**
 * Shorter draft of Megan's TEN 101 review. The fuller draft stays at /preview-tens-101.
 * Live /geothermal-101 is unchanged.
 */

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
    b: 'A heat pump at every building lets that building produce heat and use it.',
  },
  {
    t: 'Ambient loop',
    b: 'A closed loop, usually one or two pipes, carries 45–95°F water between the heat pumps and the thermal assets.',
  },
  {
    t: 'Energy sources, sinks, and storage',
    b: 'Waste heat, boreholes, surface water, piped water, wastewater, and whatever else the community already has.',
  },
]

const cards = [
  {
    t: 'Expandable by Design',
    b: 'New and retrofit buildings can join over time.',
  },
  {
    t: 'Energy Sharing Network',
    b: 'Each building produces heat and uses it.',
  },
  {
    t: 'Low-Loss Distribution',
    b: 'Losses stay low because the water is cool and the heat pumps sit at the buildings.',
  },
]

const faqs: { q: string; a: ReactNode; more?: string }[] = [
  {
    q: 'Is this the same as geothermal power?',
    a: 'No. Power generation uses deep, very hot wells to make electricity. A Thermal Energy Network is shallow heating and cooling, shared across buildings.',
    more: 'Power needs about 250°F and up. Shallow ground for heating and cooling is about 45°F to 65°F and can be used in ordinary ground. The question is whether it is cost-effective. The types figure above shows the difference. Loop water at 45–95°F is in the ambient section.',
  },
  {
    q: 'How is a Thermal Energy Network different from conventional district heating and cooling?',
    a: 'A conventional district sends hot water and chilled water from a central plant. A Thermal Energy Network trades heat on one ambient circuit, and each building’s heat pump makes the final temperature change.',
    more: 'Those conventional systems are often four pipes, and they are the usual alternative to gas heating plus a central heating and cooling plant. When a network is added, the existing plant can be smaller or held as backup, because diversity does work the plant used to do alone.',
  },
  {
    q: 'Does every Thermal Energy Network need a geothermal borefield?',
    a: 'No. Geoexchange is the most common resource, and it is rare to have none, but other sources can share the load so fewer boreholes are needed.',
    more: 'Boreholes are often the most expensive option. Wastewater, process heat, surface water, mine water, and building-to-building sharing shrink how many you drill. Some networks have run on wastewater alone. In a multi-source network, the boreholes’ main job shifts toward storage. The bores are vertical and use little surface area.',
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
    a: 'Start with one cluster and connect later clusters as the development grows, without rebuilding the pipe.',
    more: 'These clusters are micro-districts. They lock together the way building blocks do. Design the first backbone for known phase-one loads, and leave connection points and reserved capacity for what comes later.',
  },
  {
    q: 'What happens when heating and cooling loads don’t balance?',
    a: 'Surplus heat goes into the ground, wastewater, or another sink. When the network needs heat, it draws that stored heat back out.',
    more: 'Buildings rarely offset one another every hour of the year. Geoexchange, process heat, and storage sit on the loop so far less heat has to be rejected or produced from scratch.',
  },
  {
    q: 'How long do these systems last?',
    a: 'The piping is the long-lived part, typically warranted for 50 years. Heat pumps are replaced on a normal cycle of about 20 to 25 years.',
    more: 'A standard HVAC technician can maintain the heat pumps.',
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
    a: 'Ownership can sit with a public entity, a utility, or a third party. Settle early who finances, operates, meters, and decides when the network expands.',
    more: 'Taking those questions up alongside the technical work keeps projects from stalling. Load diversity modeling and reserved capacity are how you plan for buildings joining, leaving, or changing use.',
  },
  {
    q: 'Will a Thermal Energy Network require an electrical service upgrade?',
    a: 'Often the electrical upgrade is smaller than electrifying each building on its own, and sometimes it is avoided.',
    more: 'Diversity and thermal storage flatten coincident peaks, which usually fall in the coldest and hottest months. What is required depends on whether the network’s coincident load fits the feeder, the utility line that serves the site.',
  },
  {
    q: 'What else should a community consider?',
    a: 'A network can also lower carbon emissions, supply heating and cooling from one system, improve air quality, and invest in energy produced locally.',
  },
]

const conceptMore = {
  'load-sharing':
    'Buildings need heat and cooling at different times. In summer, housing calls for cooling in the evening and offices during the workday. Grocery stores and data centers reject heat year-round. Side by side, an unconnected pair can be heating and cooling at once, so more energy has to be supplied. Sharing cuts that total. System design and controls are how the exchange is tuned.',
  'ground-battery':
    'Summer heat goes into the ground and winter heat comes back out, over a day, a week, or a season. The steps show the ground filling and emptying. What the diagram draws as stored cooling is heat rejected into the ground, which is what later lets the loop serve cooling. How well that works depends on understanding the ground and on shifting loads.',
  'process-energy':
    'A large share of the energy a community uses is rejected as heat. On the loop, that heat is collected and reused. The buildings are destinations along the circuit, not a required sequence.',
  'multi-source':
    'The data center is rejecting heat. The borefield and the wastewater exchanger can supply heat or take it, depending on the season and on what the community already has.',
}

export default function PreviewTens101Short() {
  usePageMeta({
    title: 'Preview — Thermal Energy Networks 101, short — The GreyEdge Group',
    description: 'Shorter draft of the how-it-works page. Not the live site.',
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <div className="bg-ge-accent px-5 py-3 text-center">
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Preview only · shorter TEN 101 ·{' '}
          <Link to="/preview-tens-101" className="underline underline-offset-2 hover:text-white/80">
            Fuller draft
          </Link>
          {' · '}
          <Link to="/geothermal-101" className="underline underline-offset-2 hover:text-white/80">
            Live page
          </Link>
        </p>
      </div>

      <PageHero
        eyebrow="How it works"
        title="Thermal Energy Networks 101"
        lead="What thermal energy networks are, why a cooler shared loop works, and the questions communities ask first."
      />

      <Section id="networks" className="bg-white">
        <Container>
          <Reveal>
            <Eyebrow>The Concept</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Thermal Energy Networks
            </h2>
            <div className="mt-6 max-w-3xl border-l-2 border-ge-accent pl-6">
              <p className="font-body text-lg leading-relaxed text-ge-charcoal">
                Buildings and thermal resources share a water loop, so heat moves to the building that needs it instead
                of each building making and rejecting its own.
              </p>
            </div>
          </Reveal>
          <GeoTypesFigure brief />
        </Container>
      </Section>

      <Section id="ambient-loops" className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>The Mechanism</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Ambient temperature loops
            </h2>
            <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              The water in the loop circulates at about 45°F to 95°F. A lower distribution temperature goes with higher
              efficiency, because the heat pump bridges a smaller gap.
            </p>
          </Reveal>

          <EfficiencyChart brief />

          <div className="mt-14">
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
              Adapted from HEET and MIT D-Lab
            </p>
            <div className="mt-4 grid gap-px bg-ge-light md:grid-cols-3">
              {components.map((c, i) => (
                <Reveal key={c.t} delay={i * 0.06} className="bg-white">
                  <div className="flex h-full flex-col p-8">
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
                <div className="flex h-full flex-col p-8">
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
        more={conceptMore}
        intro={
          <p>
            The Thermal Highway® is GreyEdge’s approach to connecting buildings and{' '}
            <a href="#thermal-resources" className={proseLinkClass}>
              thermal resources
            </a>{' '}
            through one shared circuit, usually one or two pipes, at about 45°F to 95°F. The four concepts below show
            how that same loop moves energy.
          </p>
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
                Thermal resources are where a network draws heat, stores it, or rejects what it cannot use. The mix
                belongs to the site.
              </p>
              <blockquote className="my-8 border-l-2 border-ge-accent pl-7">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black">
                  The energy your network needs may already be flowing through your community.
                </p>
              </blockquote>
              <Btn to="/contact" track="preview_tens_short_evaluate_resources" variant="outline" className="mt-8">
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
                    data-ga-label={gaLabel('preview_tens_short_faq', f.q)}
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
                    {f.more ? <MoreInfo><p>{f.more}</p></MoreInfo> : null}
                  </dd>
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
              <Btn to={doors.consultation.to} track="preview_tens_short_talk_through_project" className="shrink-0">
                Talk through your project
              </Btn>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

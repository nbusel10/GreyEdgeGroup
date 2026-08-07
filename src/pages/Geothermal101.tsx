import { useState } from 'react'
import { site } from '../content/images'
import { doors } from '../content/advantage'
import GMark, { GBullet } from '../components/GMark'
import PageHero from '../components/PageHero'
import ThermalHighway from '../components/ThermalHighway'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

const sources = [
  { name: 'The ground', detail: 'Stable year-round temperature a few hundred feet down, in every climate.' },
  { name: 'Wastewater', detail: 'Municipal sewer mains carry a remarkably consistent thermal load.' },
  { name: 'Industrial waste heat', detail: 'Data centres, laundries and process plants reject heat continuously.' },
  { name: 'Solar thermal', detail: 'Direct collection, typically used to recharge a borefield in summer.' },
  { name: 'Mine water', detail: 'Flooded workings hold enormous stable thermal mass near former mining towns.' },
  { name: 'Surface water', detail: 'Lakes, rivers and reservoirs, where permitting allows.' },
]

const faqs = [
  {
    q: 'Is this the same as geothermal power?',
    a: 'No. Geothermal power generation taps very high temperature resources to spin a turbine, and only works in a few places on earth. What we do is ground-source heat exchange: we use the stable moderate temperature of the shallow ground as a place to put heat in summer and take heat from in winter. It works essentially anywhere.',
  },
  {
    q: 'Does it work in cold climates?',
    a: 'Particularly well. Below about six metres, ground temperature stays near the local annual average all year, so a system in Steamboat Springs is drawing from roughly 45°F ground while the air outside is below zero. The colder the air, the bigger the advantage over an air-source system.',
  },
  {
    q: 'How much does it cost compared with conventional systems?',
    a: 'First cost is usually higher and operating cost is substantially lower, so the comparison only makes sense over the life of the asset. At district scale the maths changes again: sharing a loop across buildings with different load profiles means you install far less total capacity than the sum of the individual buildings would need.',
  },
  {
    q: 'How long do these systems last?',
    a: 'The ground loop is the long-lived part — the polyethylene piping is typically warranted for 50 years and expected to last longer. Heat pumps are replaced on a normal mechanical cycle of roughly 20 to 25 years. We maintain operating relationships with systems that have run continuously for 15 to 18 years.',
  },
  {
    q: 'How much land does a borefield need?',
    a: 'Less than people expect. Bores go down rather than out, typically 400 to 1,000 feet, and are commonly placed under parking lots, playing fields or the building footprint itself. On constrained urban sites, angled drilling from a small staging area is often viable.',
  },
]

export default function Geothermal101() {
  usePageMeta({
    title: 'Geothermal 101 — The GreyEdge Group',
    description:
      'How Thermal Energy Networks, ambient temperature loops and district-scale geothermal actually work — explained without the jargon.',
    image: site['network-diagram'].src,
  })

  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <>
      <PageHero
        eyebrow="Geothermal 101"
        title="How this actually works"
        lead="No pitch, no meeting required. This is the shared vocabulary our clients wish they'd had at the start of their first project."
      />

      {/* What is a TEN */}
      <Section id="networks" className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>The Concept</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                Thermal Energy Networks
              </h2>
              <p className="mt-6 font-body text-lg leading-relaxed text-ge-charcoal">
                A Thermal Energy Network connects multiple buildings to a shared loop of water, so heat can move
                between them instead of being made and thrown away separately in each one.
              </p>
              <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                It is a simple idea with a large consequence. An office rejecting heat in the afternoon and apartments
                needing heat in the evening are, on a shared loop, solving each other&rsquo;s problem. Every building
                you add makes the network more efficient rather than less, because loads rarely peak at the same
                moment.
              </p>
              <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                That diversity is why a district system installs far less total capacity than the same buildings would
                need standing alone — and why the electrical service can often stay as it is.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <img
                src={site['network-diagram'].src}
                alt={site['network-diagram'].alt}
                className="w-full object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ambient temperature loops */}
      <Section id="ambient-loops" className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <Eyebrow>The Mechanism</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              Ambient temperature loops
            </h2>
            <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              Traditional district energy pushes hot water out at 180°F and loses heat every foot of the way. An
              ambient loop runs close to ground temperature — roughly 50 to 80°F — and lets a heat pump in each
              building do the final lift. Because the loop is near the temperature of the earth around it, the
              distribution losses that plague hot-water districts largely disappear.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ge-light md:grid-cols-3">
            {[
              {
                t: 'Low temperature, low loss',
                b: 'A loop near ambient ground temperature barely exchanges heat with the soil it passes through, so the pipe can run for miles without meaningful loss.',
              },
              {
                t: 'Two-way by design',
                b: 'Every connection both takes and gives. A building in cooling mode is a heat source for its neighbours, not a nuisance to be exhausted to the sky.',
              },
              {
                t: 'Grows by connection',
                b: 'Adding a building means a tap into the existing main, not a new central plant. Phase two costs a fraction of phase one.',
              },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 0.06} className="bg-white">
                <div className="h-full p-8">
                  <GMark className="h-5 w-5 text-ge-accent" />
                  <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                    {c.t}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-ge-graphite">{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Thermal Highway diagram */}
      <Section id="thermal-highway" className="bg-ge-black">
        <Container>
          <Reveal>
            <Eyebrow tone="light">The Thermal Highway©</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              One loop, many sources, no waste
            </h2>
            <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-silver sm:text-lg">
              The Thermal Highway is our architecture for connecting a whole district to a single ambient loop, with
              multiple thermal sources feeding it and a borefield acting as the balancing account. Heat rejected here
              is heat delivered there; whatever is left over goes into the ground until the season turns.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <ThermalHighway />
          </Reveal>
        </Container>
      </Section>

      {/* Sources */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <Reveal>
              <Eyebrow>The Inputs</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                Where the heat comes from
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite">
                Most districts have more usable thermal energy on site than anyone has counted. Part of our evaluation
                work is finding it.
              </p>
              <Btn to="/contact" variant="outline" className="mt-8">
                What&rsquo;s on your site?
              </Btn>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="border-t border-ge-light">
                {sources.map((s) => (
                  <li key={s.name} className="flex gap-4 border-b border-ge-light py-5">
                    <GBullet className="mt-1.5 text-ge-accent" />
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
                  Bring us what you have — a site, a study, a constraint, or just a hunch. We&rsquo;ll tell you what we
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
    </>
  )
}

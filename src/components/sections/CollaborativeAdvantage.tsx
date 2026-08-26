import { useState } from 'react'
import { lessons } from '../../content/advantage'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * Approach-page depth for "Built on Experience".
 *
 * The black partnership claim (with CTAs) lives on home/preview via PartnerBrief.
 * This section leads with lessons rather than services: a service menu invites
 * piecemeal shopping, while hard-won knowledge invites trust. Process and Services
 * follow on the Approach page.
 */
export default function CollaborativeAdvantage() {
  const [active, setActive] = useState(0)
  const current = lessons[active]

  return (
    <Section id="advantage" className="bg-ge-offwhite">
      <Container>
        <Reveal>
          <Eyebrow>What We&rsquo;ve Learned</Eyebrow>
          <h3 className="mt-5 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
            Built on Experience
          </h3>
          <p className="mt-6 max-w-none font-body text-base leading-relaxed text-ge-graphite">
            With more than 300 years of combined experience helping shape the geothermal industry, we bring a
            perspective that only comes from decades of firsthand involvement. We understand the technologies,
            stakeholders, funding opportunities, permitting, and policies that influence long-term success. We leverage
            that knowledge to help clients make informed decisions, secure critical resources, and maximize the impact
            of their investment.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden border border-ge-light lg:grid-cols-[minmax(260px,34%)_minmax(0,1fr)]">
            <div className="img-cut relative aspect-[3/4] max-h-[28rem] bg-ge-light sm:max-h-[32rem] lg:aspect-auto lg:max-h-none lg:min-h-full">
              <img
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            </div>
            <div className="bg-ge-offwhite">
              {lessons.map((item, i) => {
                const selected = active === i
                return (
                  <button
                    key={item.short}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(i)}
                    className={`group w-full border-b border-ge-light px-6 py-5 text-left transition-colors last:border-b-0 lg:px-8 ${
                      selected ? 'bg-white' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-display text-xl font-bold leading-none ${
                          selected ? 'text-ge-accent' : 'text-ge-steel'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-lg font-bold uppercase leading-snug tracking-wide transition-colors ${
                          selected ? 'text-ge-black' : 'text-ge-steel group-hover:text-ge-graphite'
                        }`}
                      >
                        {item.short}
                      </span>
                    </div>
                    {selected && (
                      <div className="mt-4 pl-11">
                        <p className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                          {item.lesson}
                        </p>
                        <p className="mt-3 font-body text-sm leading-relaxed text-ge-graphite">{item.detail}</p>
                        <div className="mt-4">
                          <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ge-steel">
                            Where we come in
                          </div>
                          <div className="mt-2 flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                            <span className="font-body text-sm leading-snug text-ge-charcoal">{item.capability}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

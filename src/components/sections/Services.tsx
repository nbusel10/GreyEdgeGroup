import { capabilityNote, serviceGroups } from '../../content/advantage'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/** Our Services — Option A: five category photo cards. */
export default function Services() {
  return (
    <Section id="services" className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Reveal>
          <Eyebrow>Total Capability</Eyebrow>
          <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
            Our Services
          </h3>
          <p className="mt-6 max-w-none font-body text-base leading-relaxed text-ge-graphite">
            {capabilityNote}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {serviceGroups.map((g, i) => (
              <article
                key={g.title}
                className="group flex flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent"
              >
                <div className="img-cut h-40 overflow-hidden bg-ge-light xl:h-36">
                  <img
                    src={g.image}
                    alt={g.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 xl:p-4">
                  <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h4 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black xl:text-base">
                    {g.title}
                  </h4>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {g.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                        <span className="font-body text-sm leading-snug text-ge-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="rule-grow mt-5" />
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

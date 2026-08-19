import { Link } from 'react-router-dom'
import { doors } from '../../content/advantage'
import { insights } from '../../content/insights'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * Combined education beat for the shortened home spine:
 * Geothermal 101 door + featured insights in one section.
 */
export default function Educate() {
  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow>Learn</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl md:text-6xl">
                From education to execution.
              </h2>
              <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">
                Build the shared vocabulary first, or dig into how we&rsquo;ve solved the same constraints on real
                projects.
              </p>
            </div>
            <Btn to="/insights" variant="outline" className="shrink-0 self-start">
              All insights
            </Btn>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {insights.slice(0, 3).map((item, i) => (
            <Reveal key={item.slug} delay={0.06 + i * 0.07}>
              <Link
                to={item.to}
                className="group flex h-full flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent"
              >
                <div className="img-cut h-44 overflow-hidden bg-ge-light">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">
                      {item.category}
                    </span>
                    <span className="font-body text-[10px] text-ge-steel">{item.readTime}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{item.summary}</p>
                  <span className="rule-grow mt-5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 border-t border-ge-light pt-16 md:mt-20 md:pt-20">
            <p className="text-center font-display text-2xl font-bold uppercase tracking-tight text-ge-black sm:text-3xl">
              {doors.intro}
            </p>
            <div className="mx-auto mt-10 grid max-w-4xl gap-px overflow-hidden border border-ge-light bg-ge-light sm:grid-cols-2">
              {[doors.education, doors.consultation].map((d) => (
                <div key={d.label} className="flex flex-col bg-white p-8">
                  <div className="flex-1">
                    <div className="font-display text-xl font-bold uppercase tracking-wide text-ge-black">
                      {d.label}
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{d.detail}</p>
                  </div>
                  <Btn to={d.to} variant="outline" className="mt-7 self-start">
                    {d.cta}
                  </Btn>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

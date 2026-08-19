import { credits, headline, intro } from '../../content/leadership'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * Industry Leadership — two-column rule list.
 *
 * Headline stays with all six credits: hairline rows split across two columns
 * so the full picture reads without a long scroll past the claim.
 */
export default function Leadership() {
  return (
    <Section id="leadership" className="border-t border-ge-light bg-white">
      <Container>
        <Reveal>
          <Eyebrow>Industry Leadership</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
            We don&rsquo;t just work in this industry.{' '}
            <span className="text-ge-accent">Many members of our team helped build it.</span>
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">{intro}</p>
          <span className="sr-only">{headline}</span>
        </Reveal>

        <Reveal delay={0.06}>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {credits.map((c) => (
              <li key={c.title} className="border-b border-ge-light py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-ge-black">
                    {c.title}
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-[0.16em] text-ge-accent">
                    {c.org}
                  </span>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{c.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}

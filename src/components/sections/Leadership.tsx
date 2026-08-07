import { credits, headline, intro, reach } from '../../content/leadership'
import { site } from '../../content/images'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * Industry Leadership.
 *
 * Headline is the sentence Matt likes, promoted from the team page. The credits are
 * attributed as member-led because several were contracted to individuals rather than
 * to the firm — Megan and Joe both confirmed that framing is accurate.
 */
export default function Leadership() {
  return (
    <Section id="leadership" className="border-t border-ge-light bg-white">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative">
                <img
                  src={site['panel-discussion'].src}
                  alt={site['panel-discussion'].alt}
                  className="aspect-[4/5] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-ge-black/85 p-6 backdrop-blur-sm">
                  <p className="font-body text-sm leading-relaxed text-ge-light">{reach}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow>Industry Leadership</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-[2.85rem]">
                We don&rsquo;t just work in this industry.{' '}
                <span className="text-ge-accent">Many members of our team helped build it.</span>
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite">{intro}</p>
              <span className="sr-only">{headline}</span>
            </Reveal>

            <ul className="mt-10 border-t border-ge-light">
              {credits.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.05}>
                  <li className="border-b border-ge-light py-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-ge-black">
                        {c.title}
                      </h3>
                      <span className="font-body text-[11px] uppercase tracking-[0.16em] text-ge-accent">{c.org}</span>
                    </div>
                    <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ge-graphite">{c.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  )
}

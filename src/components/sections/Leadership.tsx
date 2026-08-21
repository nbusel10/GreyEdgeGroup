import { aboutHeadline, credits, intro, teaserHeadline, teaserProof } from '../../content/leadership'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

type LeadershipVariant = 'full' | 'teaser'

/**
 * Industry Leadership — full credits on About; Home uses a dark-band teaser
 * with a proof strip that deep-links to /about#leadership.
 */
export default function Leadership({ variant = 'full' }: { variant?: LeadershipVariant }) {
  if (variant === 'teaser') {
    return (
      <Section className="border-t border-ge-charcoal bg-ge-black">
        <Container>
          <Reveal>
            <Eyebrow tone="light">Industry Leadership</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {teaserHeadline.lead}{' '}
              <span className="text-ge-accent">{teaserHeadline.accent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-0 gap-y-3">
              {teaserProof.map((label, i) => (
                <li key={label} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-4 h-3 w-px bg-white/25 sm:mx-5" aria-hidden="true" />
                  )}
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-light">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
            <Btn to="/about#leadership" variant="light" className="mt-8">
              See industry leadership
            </Btn>
          </Reveal>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="leadership" className="border-t border-ge-light bg-white">
      <Container>
        <Reveal>
          <Eyebrow>Industry Leadership</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
            {aboutHeadline.lead}{' '}
            <span className="text-ge-accent">{aboutHeadline.accent}</span>
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">{intro}</p>
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

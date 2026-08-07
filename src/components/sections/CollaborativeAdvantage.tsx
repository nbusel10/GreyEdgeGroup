import { anchorQuote, capabilities, capabilityNote, doors, lessons, stats } from '../../content/advantage'
import { site } from '../../content/images'
import GMark, { GBullet, GWatermark } from '../GMark'
import { Btn, Container, Eyebrow, Reveal, Section, StatBlock } from '../ui'

/**
 * "The Collaborative Advantage", reworked per the Aug 5 review.
 *
 * Order matters here. The section leads with lessons rather than services: a service
 * menu invites piecemeal shopping, which Matt doesn't want, while a body of hard-won
 * knowledge invites trust and still shows a newcomer the full depth. Capabilities appear
 * only after the lessons, and as one continuous list rather than a grid of cards —
 * Joe was explicit that he didn't want them "chopped up into little blocks."
 */
export default function CollaborativeAdvantage() {
  return (
    <section id="advantage" className="scroll-mt-20">
      {/* 1. The claim, and the line Matt keeps coming back to. */}
      <div className="relative overflow-hidden bg-ge-black py-20 md:py-28">
        <GWatermark className="text-white/[0.03]" side="right" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Eyebrow tone="light">The Partnership</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
                District-scale systems,
                <br />
                <span className="text-ge-accent">one accountable partner.</span>
              </h2>
              <blockquote className="mt-9 border-l-2 border-ge-accent pl-6">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-white sm:text-3xl">
                  {anchorQuote}
                </p>
              </blockquote>
              <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-ge-silver">
                We support every phase, from first design through final delivery. Whether we execute the work directly
                or coordinate alongside other specialist teams, we stay accountable to your outcome.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <img
                  src={site['design-session'].src}
                  alt={site['design-session'].alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute -bottom-px -right-px bg-ge-black px-6 py-4">
                  <div className="font-display text-3xl font-bold leading-none text-ge-accent">300+</div>
                  <div className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-ge-silver">
                    Years in the field
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* 2. What we've learned — the trust-building spine of the section. */}
      <Section className="bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>What We&rsquo;ve Learned</Eyebrow>
            <h3 className="mt-5 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
              What we know to be true about how a project actually goes
            </h3>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">
              Three hundred years of combined experience mostly teaches you where things go wrong. Here is what we look
              for, and the role we play when it comes up.
            </p>
          </Reveal>

          <ol className="mt-14 border-t border-ge-light">
            {lessons.map((l, i) => (
              <Reveal key={l.lesson} delay={i * 0.05}>
                <li className="grid gap-5 border-b border-ge-light py-9 md:grid-cols-[auto_1fr_minmax(180px,240px)] md:gap-10">
                  <div className="font-display text-2xl font-bold leading-none text-ge-light md:text-3xl">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                      {l.lesson}
                    </p>
                    <p className="mt-3 max-w-2xl font-body text-[15px] leading-relaxed text-ge-graphite">{l.detail}</p>
                  </div>
                  <div className="md:pt-1">
                    <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ge-steel">
                      Where we come in
                    </div>
                    <div className="mt-2 flex items-start gap-2">
                      <GBullet className="mt-1 text-ge-accent" />
                      <span className="font-body text-sm leading-snug text-ge-charcoal">{l.capability}</span>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 3. Total capabilities — deliberately one continuous list, not a card grid. */}
      <Section id="capabilities" className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>Total Capability</Eyebrow>
                <h3 className="mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl">
                  Everything a thermal utility needs, under one roof
                </h3>
              </div>
              <p className="max-w-sm font-body text-sm leading-relaxed text-ge-graphite">{capabilityNote}</p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-y-2 border-ge-black py-9">
              {capabilities.map((c) => (
                <li key={c} className="flex items-center gap-2.5">
                  <GMark className="h-3 w-3 shrink-0 text-ge-accent" />
                  <span className="font-display text-lg font-semibold uppercase tracking-wide text-ge-charcoal sm:text-xl">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* 4. The proof numbers. */}
          <Reveal delay={0.12}>
            <div className="mt-16 grid grid-cols-2 gap-y-12 md:grid-cols-4">
              {stats.map((s) => (
                <StatBlock key={s.label} value={s.value} label={s.label} prefix={s.prefix} suffix={s.suffix} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 5. Megan's two doors: education and consultation, at equal weight. */}
      <div className="border-t border-ge-light bg-ge-offwhite py-16 md:py-20">
        <Container>
          <Reveal>
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
          </Reveal>
        </Container>
      </div>
    </section>
  )
}

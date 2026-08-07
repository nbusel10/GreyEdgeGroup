import { anyPhaseNote, closing, intro, phases } from '../../content/process'
import { doors } from '../../content/advantage'
import GMark from '../GMark'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * "The Process", reworked per the Aug 5 review.
 *
 * Every phase is labelled as a valid place to start. The old version read as a
 * mandatory four-step gate, which risked losing prospects who already had a feasibility
 * study from another firm — Joe's concern. The "Start here" marker and the note beneath
 * the steps are Megan's request: they can pull us in at any step, earlier is better.
 */
export default function Process() {
  return (
    <Section id="process" className="border-t border-ge-charcoal bg-ge-black">
      <Container>
        <Reveal>
          <Eyebrow tone="light">The Process</Eyebrow>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-4">
            {['Alignment.', 'Support.', 'Results.'].map((w, i) => (
              <span
                key={w}
                className={`font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl ${
                  i === 2 ? 'text-ge-accent' : 'text-white'
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-7 max-w-3xl font-body text-base leading-relaxed text-ge-silver sm:text-lg">{intro}</p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-ge-charcoal md:grid-cols-2 xl:grid-cols-4">
          {phases.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.06} className="bg-ge-black">
              <article className="flex h-full flex-col p-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-5xl font-bold leading-none text-ge-charcoal">{p.num}</span>
                  <GMark className="h-3 w-3 text-ge-accent" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-bold uppercase tracking-wide text-white">{p.title}</h3>
                <div className="mt-2 font-body text-[11px] uppercase tracking-[0.16em] text-ge-steel">{p.subtitle}</div>
                <p className="mt-5 flex-1 font-body text-sm leading-relaxed text-ge-silver">{p.description}</p>

                {/* Every phase is a legitimate entry point, stated explicitly. */}
                <div className="mt-7 border-t border-ge-charcoal pt-5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                    <span className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-accent">
                      You can start here
                    </span>
                  </div>
                  <p className="mt-3 font-body text-[13px] leading-relaxed text-ge-steel">{p.entry}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Megan's note, stated rather than implied. */}
        <Reveal delay={0.1}>
          <div className="mt-12 border border-ge-charcoal bg-ge-ink p-8 md:p-10">
            <div className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
              <GMark className="h-10 w-10 shrink-0 text-ge-accent" />
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white sm:text-3xl">
                  {anyPhaseNote.heading}
                </h3>
                <p className="mt-4 max-w-3xl font-body text-[15px] leading-relaxed text-ge-silver">
                  {anyPhaseNote.body}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-14 flex flex-col gap-8 border-t border-ge-charcoal pt-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl font-body text-base leading-relaxed text-ge-silver">{closing}</p>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Btn to={doors.education.to} variant="ghost">
                Learn how it works
              </Btn>
              <Btn to={doors.consultation.to} variant="light">
                Talk through your project
              </Btn>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

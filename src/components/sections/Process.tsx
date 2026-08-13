import { useState } from 'react'
import { anyPhaseNote, intro, phases } from '../../content/process'
import { doors } from '../../content/advantage'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * "The Process", reworked per the Aug 5 review.
 *
 * Every phase is labelled as a valid place to start. Light surface so it does not
 * read as the footer; a drawing connector plus staggered cards mark progression.
 */
export default function Process() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <Section id="process" className="border-t border-ge-light bg-white">
      <Container>
        <Reveal>
          <Eyebrow>Alignment. Support. Results.</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight text-ge-black sm:text-5xl md:text-6xl">
            The <span className="text-ge-accent">Process</span>
          </h2>
          <p className="mt-7 max-w-none font-body text-base leading-relaxed text-ge-graphite sm:text-lg">{intro}</p>
          <p className="mt-4 max-w-none font-body text-sm italic leading-relaxed text-ge-steel">{anyPhaseNote}</p>
        </Reveal>

        <div
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-[auto_auto_auto_minmax(0,1fr)_auto_auto]"
          onMouseLeave={() => setHovered(null)}
        >
            {phases.map((p, i) => (
              <Reveal
                key={p.num}
                delay={0.08 + i * 0.1}
                className="relative h-full xl:row-span-6 xl:grid xl:grid-rows-subgrid"
              >
                {i < phases.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-full top-12 z-10 hidden h-0.5 w-5 bg-ge-light xl:block"
                  >
                    <span
                      className={`process-seg process-seg-${i} block h-full origin-left bg-ge-accent ${
                        hovered !== null && i <= hovered ? 'is-on' : ''
                      }`}
                    />
                  </div>
                )}
                <article
                  onMouseEnter={() => setHovered(i)}
                  className="group flex h-full flex-col border border-ge-light bg-ge-offwhite p-6 transition-colors duration-200 hover:border-ge-accent hover:bg-white xl:row-span-6 xl:grid xl:grid-rows-subgrid"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-5xl font-bold leading-none text-ge-light transition-colors duration-200 group-hover:text-ge-accent">
                      {p.num}
                    </span>
                    <span className="text-ge-accent" aria-hidden="true">
                      //
                    </span>
                  </div>
                  <h3 className="mt-0.5 font-display text-3xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                    {p.title}
                  </h3>
                  <div className="mt-0.5 font-body text-[11px] uppercase tracking-[0.16em] text-ge-steel">{p.subtitle}</div>
                  <p className="mt-1 flex-1 font-body text-[15px] leading-relaxed text-ge-graphite xl:flex-none">
                    {p.description}
                  </p>

                  <div className="process-rule shrink-0 py-4" aria-hidden="true" />

                  <p className="min-h-[5.75rem] font-body text-[13px] leading-relaxed text-ge-graphite xl:min-h-0">
                    {p.entry}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

        <Reveal delay={0.12}>
          <div className="mt-14 flex flex-col items-center gap-3 border-t border-ge-light pt-10 sm:flex-row sm:justify-center">
            <Btn to={doors.education.to} variant="outline">
              How these systems work
            </Btn>
            <Btn to={doors.consultation.to} variant="solid">
              Evaluate your project
            </Btn>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

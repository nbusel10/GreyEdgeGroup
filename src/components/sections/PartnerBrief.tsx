import { anchorQuote, partnerBriefBody, stats } from '../../content/advantage'
import { site } from '../../content/images'
import { GWatermark } from '../GMark'
import { Btn, Container, Eyebrow, Reveal, StatBlock } from '../ui'

/**
 * Home-spine partner claim: quote + stats + deep-link to Approach.
 * Full lessons / capabilities / process stay on /approach.
 */
export default function PartnerBrief() {
  return (
    <section id="partnership" className="scroll-mt-20">
      <div className="relative overflow-hidden bg-ge-black py-20 md:py-28">
        <GWatermark className="text-white/[0.04]" side="right" mark="ge" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Eyebrow tone="light">Partnership</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
                The Advantage of
                <br />
                <span className="text-ge-accent">Experience</span>
              </h2>
              <blockquote className="mt-9 border-l-2 border-ge-accent pl-6">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-white sm:text-3xl">
                  {anchorQuote}
                </p>
              </blockquote>
              <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-ge-light sm:text-lg">
                {partnerBriefBody}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Btn to="/approach" variant="light">
                  Our approach
                </Btn>
                <Btn to="/contact" variant="ghost">
                  Start planning
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative">
                <div className="img-cut">
                  <img
                    src={site['district-scale-site-planning'].src}
                    alt={site['district-scale-site-planning'].alt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-8 right-8 bg-ge-accent px-6 py-4">
                  <div className="font-display text-3xl font-bold leading-none text-white">300+</div>
                  <div className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-white/75">
                    Years in the field
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <div className="border-t border-ge-light bg-ge-offwhite py-14 md:py-16">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} className="relative px-6 py-1">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-14 w-px -translate-y-1/2 bg-ge-light md:h-16 ${
                        i % 2 === 0 ? 'hidden md:block' : ''
                      }`}
                    />
                  )}
                  <StatBlock value={s.value} label={s.label} prefix={s.prefix} suffix={s.suffix} />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}

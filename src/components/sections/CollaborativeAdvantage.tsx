import { capabilities, capabilityNote, doors, lessons } from '../../content/advantage'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * Approach-page depth for "The Collaborative Advantage".
 *
 * The black partnership claim (with CTAs) lives on home/preview via PartnerBrief.
 * This section leads with lessons rather than services: a service menu invites
 * piecemeal shopping, while hard-won knowledge invites trust. Capabilities follow
 * as a numbered grid; Megan's two doors close the section.
 */
export default function CollaborativeAdvantage() {
  return (
    <section id="advantage" className="scroll-mt-20">
      {/* What we've learned — the trust-building spine of the section. */}
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
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                      <span className="font-body text-sm leading-snug text-ge-charcoal">{l.capability}</span>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Total capabilities — numbered grid, header + note side by side. */}
      <Section id="capabilities" className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-14 lg:gap-20">
              <div>
                <Eyebrow>Total Capability</Eyebrow>
                <h3 className="mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
                  Everything a thermal utility needs, through one trusted partner
                </h3>
              </div>
              <p className="max-w-md font-body text-base leading-relaxed text-ge-graphite md:justify-self-end md:text-[15px]">
                {capabilityNote}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-12 grid grid-cols-1 border-l border-t border-ge-light sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c, i) => (
                <li
                  key={c}
                  className="group border-b border-r border-ge-light bg-ge-offwhite px-6 py-8 transition-colors duration-200 hover:bg-white"
                >
                  <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel transition-colors duration-200 group-hover:text-ge-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-3 block font-display text-base font-bold uppercase leading-snug tracking-wide text-ge-black transition-colors duration-200 group-hover:text-ge-accent sm:text-lg">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Megan's two doors: education and consultation, at equal weight. */}
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

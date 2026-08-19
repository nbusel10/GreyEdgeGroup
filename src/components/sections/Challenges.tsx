import { useState } from 'react'
import { challenges } from '../../content/challenges'
import { barriers } from '../../content/site'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/**
 * "The Barriers" — five simultaneous pressures, each with the GreyEdge response.
 * Header on top; horizontal tabs + detail panel on desktop; accordion on mobile.
 */
export default function Challenges() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const active = challenges[activeIdx]

  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Reveal>
          <Eyebrow>{barriers.eyebrow}</Eyebrow>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-4">
            {barriers.words.map((w, i) => (
              <span
                key={w}
                className={`font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl md:text-6xl ${
                  i === barriers.words.length - 1 ? 'text-ge-accent' : 'text-ge-black'
                }`}
              >
                {w}
              </span>
            ))}
          </div>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
            {barriers.body}
          </p>
        </Reveal>

        {/* Desktop: horizontal tabs + detail panel */}
        <Reveal className="mt-12 hidden md:block">
          <div className="border border-ge-light">
            <div
              role="tablist"
              aria-label="Project pressures"
              className="grid grid-cols-5 border-b border-ge-light bg-ge-offwhite"
            >
              {challenges.map((c, i) => {
                const selected = activeIdx === i
                return (
                  <button
                    key={c.label}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveIdx(i)}
                    className={`group relative flex flex-col items-start gap-2 border-r border-ge-light px-3 py-5 text-left transition-colors last:border-r-0 lg:px-5 lg:py-6 ${
                      selected ? 'bg-white' : 'hover:bg-white/60'
                    }`}
                  >
                    <span
                      className={`font-body text-[10px] tracking-[0.18em] ${
                        selected ? 'text-ge-accent' : 'text-ge-steel'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-[13px] font-bold uppercase leading-snug tracking-wide transition-colors lg:text-base ${
                        selected ? 'text-ge-black' : 'text-ge-steel group-hover:text-ge-graphite'
                      }`}
                    >
                      <span className="lg:hidden">{c.short}</span>
                      <span className="hidden lg:inline">{c.label}</span>
                    </span>
                    <span
                      className={`absolute inset-x-0 bottom-0 h-0.5 transition-colors ${
                        selected ? 'bg-ge-black' : 'bg-transparent'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>

            <div key={activeIdx} className="fade-slide-up grid bg-white lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div className="img-cut relative min-h-56 overflow-hidden bg-ge-light lg:min-h-full">
                <img
                  src={active.image}
                  alt={active.imageAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(20,23,26,0.45), transparent 65%)' }}
                />
              </div>
              <div className="space-y-7 p-8 lg:space-y-8 lg:p-10">
                <div>
                  <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-steel">The challenge</div>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ge-graphite">{active.problem}</p>
                </div>
                <div>
                  <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-accent">
                    The GreyEdge approach
                  </div>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ge-graphite">{active.approach}</p>
                </div>
                <div className="border-l-2 border-ge-accent py-1 pl-6">
                  <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-steel">Outcome</div>
                  <p className="mt-2 font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                    {active.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Mobile: accordion */}
        <div className="mt-10 border border-ge-light bg-white md:hidden">
          {challenges.map((c, i) => (
            <div key={c.label} className="border-b border-ge-light last:border-b-0">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
              >
                <span>
                  <span className="font-body text-[10px] tracking-[0.18em] text-ge-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mt-1 block font-display text-lg font-bold uppercase leading-tight text-ge-black">
                    {c.label}
                  </span>
                </span>
                <svg
                  className={`mt-1 h-4 w-4 shrink-0 text-ge-steel transition-transform ${openIdx === i ? 'rotate-180' : ''}`}
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {openIdx === i && (
                <div className="fade-slide-up space-y-5 px-5 pb-6">
                  <img src={c.image} alt={c.imageAlt} className="img-cut h-36 w-full object-cover" loading="lazy" />
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-steel">The challenge</div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{c.problem}</p>
                  </div>
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-accent">
                      The GreyEdge approach
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{c.approach}</p>
                  </div>
                  <div className="border-l-2 border-ge-accent pl-4">
                    <div className="font-body text-[10px] uppercase tracking-[0.24em] text-ge-steel">Outcome</div>
                    <p className="mt-2 font-display text-base font-bold uppercase tracking-wide text-ge-black">
                      {c.outcome}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <Reveal className="mt-16 border-t border-ge-light pt-12 md:mt-20">
          <p className="font-display text-3xl font-bold uppercase tracking-tight text-ge-black sm:text-4xl md:text-5xl">
            {barriers.closing}
            <br />
            {barriers.closingLead}{' '}
            <span className="text-ge-accent">{barriers.closingAccent}</span>
          </p>
          <p className="mt-4 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            Navigating this complexity takes more than a consultant. It takes a partner with decades of proven
            experience who stays alongside you from first design through final delivery.
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}

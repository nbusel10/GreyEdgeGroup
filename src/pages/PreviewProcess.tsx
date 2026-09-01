import { useState } from 'react'
import { Link } from 'react-router-dom'
import { anyPhaseNote, intro, phases, type Phase } from '../content/process'
import { org } from '../content/site'
import { Container, Eyebrow, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable comparison of "The Process" layouts.
 * Not linked in nav. Live `/approach` is unchanged until a direction is chosen.
 */

const variants = [
  { id: 'option-a', letter: 'A', title: '3 + 2 grid', note: 'Wider cards · all copy visible · no clicks' },
  { id: 'option-b', letter: 'B', title: 'Scan rows', note: 'Full-width bands · vertical read · no clicks' },
  { id: 'option-c', letter: 'C', title: 'Compact strip + panel', note: 'Centered timeline · hover sync · click for detail' },
  { id: 'option-d', letter: 'D', title: 'Verb-led cards', note: 'Assess → Guide anchors · expand entry per card' },
  { id: 'option-e', letter: 'E', title: 'Path + excerpt cards', note: 'Centered timeline · hover sync · short blurbs' },
  { id: 'option-f', letter: 'F', title: 'Path + green hover', note: 'Same as E · card fills green on hover' },
]

function Intro() {
  return (
    <>
      <Eyebrow>Alignment. Support. Results.</Eyebrow>
      <h2 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight text-ge-black sm:text-5xl md:text-6xl">
        The <span className="text-ge-accent">Process</span>
      </h2>
      <p className="mt-7 max-w-none font-body text-base leading-relaxed text-ge-graphite sm:text-lg">{intro}</p>
      <p className="mt-4 max-w-none font-body text-sm italic leading-relaxed text-ge-steel">{anyPhaseNote}</p>
    </>
  )
}

function VariantBar({ letter, title, note }: { letter: string; title: string; note: string }) {
  return (
    <div className="border-b border-ge-charcoal bg-ge-black py-4">
      <Container>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-xl font-bold uppercase tracking-wide text-ge-accent">Option {letter}</span>
          <span className="font-display text-xl font-bold uppercase tracking-wide text-white">{title}</span>
          <span className="font-body text-[11px] uppercase tracking-[0.16em] text-ge-steel">{note}</span>
        </div>
      </Container>
    </div>
  )
}

function EntryLabel() {
  return (
    <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ge-steel">Starting at this phase</div>
  )
}

function PhaseMeta({ phase }: { phase: Phase }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="font-display text-4xl font-bold leading-none text-ge-light">{phase.num}</span>
      <span className="text-ge-accent" aria-hidden="true">
        //
      </span>
      <span className="font-body text-[11px] uppercase tracking-[0.16em] text-ge-steel">{phase.subtitle}</span>
    </div>
  )
}

/** A — three on top, two centered below; room for full text without five skinny columns. */
function OptionA() {
  const top = phases.slice(0, 3)
  const bottom = phases.slice(3)

  function Card({ phase }: { phase: Phase }) {
    return (
      <article className="flex h-full flex-col border border-ge-light bg-ge-offwhite p-6 transition-colors duration-200 hover:border-ge-accent hover:bg-white lg:p-7">
        <PhaseMeta phase={phase} />
        <h3 className="mt-3 font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
          {phase.title}
        </h3>
        <p className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-ge-graphite">{phase.description}</p>
        <div className="my-5 h-px bg-ge-light" aria-hidden="true" />
        <EntryLabel />
        <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{phase.entry}</p>
      </article>
    )
  }

  return (
    <Section className="border-t border-ge-light bg-white">
      <Container>
        <Intro />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {top.map((p) => (
            <Card key={p.num} phase={p} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:mx-auto lg:max-w-[68%] lg:grid-cols-2">
          {bottom.map((p) => (
            <Card key={p.num} phase={p} />
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** B — full-width horizontal bands; scan top-to-bottom without column cramming. */
function OptionB() {
  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-14 divide-y divide-ge-light border-y border-ge-light bg-white">
          {phases.map((p, i) => (
            <article
              key={p.num}
              className="grid gap-6 px-6 py-8 transition-colors duration-200 hover:bg-ge-offwhite/50 lg:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-10 lg:px-8 lg:py-9"
            >
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-5xl font-bold leading-none text-ge-light">{p.num}</span>
                  {i < phases.length - 1 && (
                    <span className="hidden font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel lg:inline">
                      →
                    </span>
                  )}
                </div>
                <div className="mt-2 font-body text-[11px] uppercase tracking-[0.16em] text-ge-accent">{p.subtitle}</div>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ge-graphite">{p.description}</p>
              </div>
              <div className="border-t border-ge-light pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <EntryLabel />
                <p className="mt-3 font-body text-sm leading-relaxed text-ge-graphite">{p.entry}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** C — all five headers always visible; one detail panel for the full story. */
function OptionC() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const phase = phases[active]
  const lit = hovered

  return (
    <Section className="border-t border-ge-light bg-white">
      <Container>
        <Intro />
        <div className="mt-14">
          {/* Centered timeline row — full section width */}
          <div className="relative mb-8 w-full" onMouseLeave={() => setHovered(null)}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[10%] right-[10%] top-6 h-0.5 bg-ge-light"
            />
            {phases.map((_, i) => {
              if (i >= phases.length - 1) return null
              const segLit = lit !== null && i < lit
              return (
                <div
                  key={`seg-${i}`}
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-6 h-0.5 origin-left transition-transform duration-300 ease-out ${
                    segLit ? 'scale-x-100 bg-ge-accent' : 'scale-x-0 bg-ge-accent'
                  }`}
                  style={{
                    left: `${10 + (i / (phases.length - 1)) * 80}%`,
                    width: `${80 / (phases.length - 1)}%`,
                  }}
                />
              )
            })}
            <div className="relative flex justify-between gap-2">
              {phases.map((p, i) => {
                const nodeLit = lit === i
                return (
                  <button
                    key={`node-${p.num}`}
                    type="button"
                    onMouseEnter={() => setHovered(i)}
                    onClick={() => setActive(i)}
                    className="group flex min-w-0 flex-1 flex-col items-center border-0 bg-transparent p-0 text-center"
                    aria-label={`${p.subtitle}: ${p.title}`}
                    aria-current={active === i ? 'step' : undefined}
                  >
                    <span
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white font-display text-lg font-bold leading-none transition-colors duration-200 ${
                        nodeLit || active === i
                          ? 'border-ge-accent text-ge-accent'
                          : 'border-ge-light text-ge-steel group-hover:border-ge-accent group-hover:text-ge-accent'
                      }`}
                    >
                      {p.num}
                    </span>
                    <span
                      className={`mt-2 font-body text-[10px] uppercase leading-tight tracking-[0.14em] transition-colors duration-200 ${
                        nodeLit || active === i ? 'text-ge-accent' : 'text-ge-steel group-hover:text-ge-accent'
                      }`}
                    >
                      {p.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Phase boxes — full width, hover syncs to timeline row above */}
          <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5" onMouseLeave={() => setHovered(null)}>
            {phases.map((p, i) => {
              const selected = active === i
              const boxLit = lit === i
              return (
                <button
                  key={p.num}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setHovered(i)}
                  className={`flex flex-col border p-4 text-left transition-colors duration-200 sm:p-5 ${
                    selected || boxLit
                      ? 'border-ge-accent bg-ge-offwhite'
                      : 'border-ge-light bg-white hover:border-ge-accent/60 hover:bg-ge-offwhite/60'
                  }`}
                >
                  <span
                    className={`font-display text-3xl font-bold leading-none transition-colors duration-200 ${
                      selected || boxLit ? 'text-ge-accent' : 'text-ge-light'
                    }`}
                  >
                    {p.num}
                  </span>
                  <span
                    className={`mt-2 font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
                      boxLit ? 'text-ge-accent' : 'text-ge-steel'
                    }`}
                  >
                    {p.subtitle}
                  </span>
                  <span className="mt-2 font-display text-sm font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-[15px]">
                    {p.title.replace(/^Phase \d+ /, '')}
                  </span>
                </button>
              )
            })}
          </div>

          <article className="mt-5 w-full border border-ge-light bg-ge-offwhite p-6 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-display text-4xl font-bold leading-none text-ge-accent">{phase.num}</span>
              <h3 className="font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
                {phase.title}
              </h3>
            </div>
            <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-ge-graphite sm:text-[17px]">
              {phase.description}
            </p>
            <div className="mt-8 border-t border-ge-light pt-6">
              <EntryLabel />
              <p className="mt-3 max-w-3xl font-body text-[15px] leading-relaxed text-ge-graphite">{phase.entry}</p>
            </div>
          </article>
        </div>
      </Container>
    </Section>
  )
}

/** D — subtitle as the visual hook; description visible; entry expands on demand. */
function OptionD() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
          {phases.map((p, i) => {
            const wide = i < 3
            const expanded = open === i
            return (
              <article
                key={p.num}
                className={`flex flex-col border border-ge-light bg-white p-6 transition-colors duration-200 hover:border-ge-accent lg:p-7 ${
                  wide ? 'xl:col-span-2' : 'xl:col-span-3'
                }`}
              >
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="font-display text-6xl font-bold uppercase leading-none tracking-tight text-ge-accent sm:text-7xl">
                      {p.subtitle}
                    </span>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">{p.num}</span>
                      <span className="text-ge-light" aria-hidden="true">
                        //
                      </span>
                    </div>
                  </div>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 font-body text-[15px] leading-relaxed text-ge-graphite">{p.description}</p>
                <div className="mt-5 border-t border-ge-light pt-4">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : i)}
                    className="font-body text-[11px] font-medium uppercase tracking-[0.16em] text-ge-accent underline-offset-4 hover:underline"
                    aria-expanded={expanded}
                  >
                    {expanded ? 'Hide entry point' : 'Already at this phase?'}
                  </button>
                  {expanded && (
                    <p className="mt-3 font-body text-sm leading-relaxed text-ge-graphite">{p.entry}</p>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/** E — connected step line up top; five excerpt cards below (3 + 2). */
function OptionE() {
  const [hovered, setHovered] = useState<number | null>(null)
  const top = phases.slice(0, 3)
  const bottom = phases.slice(3)

  function excerpt(text: string, max = 148) {
    if (text.length <= max) return text
    const cut = text.slice(0, max)
    return `${cut.replace(/\s+\S*$/, '')}…`
  }

  function Card({ phase, index }: { phase: Phase; index: number }) {
    const lit = hovered === index
    return (
      <article
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={`flex h-full flex-col border bg-white p-5 transition-colors duration-200 lg:p-6 ${
          lit ? 'border-ge-accent bg-ge-offwhite' : 'border-ge-light hover:border-ge-accent/50'
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`font-display text-3xl font-bold leading-none transition-colors duration-200 ${
              lit ? 'text-ge-accent' : 'text-ge-light'
            }`}
          >
            {phase.num}
          </span>
          <span
            className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              lit ? 'text-ge-accent' : 'text-ge-steel'
            }`}
          >
            {phase.subtitle}
          </span>
        </div>
        <h3 className="mt-2 font-display text-base font-bold uppercase leading-snug tracking-wide text-ge-black lg:text-lg">
          {phase.title}
        </h3>
        <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{excerpt(phase.description)}</p>
        <p className="mt-4 border-t border-ge-light pt-3 font-body text-xs italic leading-relaxed text-ge-steel">
          {excerpt(phase.entry, 120)}
        </p>
      </article>
    )
  }

  return (
    <Section className="border-t border-ge-light bg-white">
      <Container>
        <Intro />
        <div className="relative mt-14 w-full" onMouseLeave={() => setHovered(null)}>
          {/* Continuous baseline — spans first node center to last node center */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-6 h-0.5 bg-ge-light"
          />
          {phases.map((_, i) => {
            if (i >= phases.length - 1) return null
            const lit = hovered !== null && i < hovered
            return (
              <div
                key={`seg-${i}`}
                aria-hidden="true"
                className={`pointer-events-none absolute top-6 h-0.5 origin-left transition-transform duration-300 ease-out ${
                  lit ? 'scale-x-100 bg-ge-accent' : 'scale-x-0 bg-ge-accent'
                }`}
                style={{
                  left: `${10 + (i / (phases.length - 1)) * 80}%`,
                  width: `${80 / (phases.length - 1)}%`,
                }}
              />
            )
          })}

          <div className="relative flex justify-between gap-2">
            {phases.map((p, i) => {
              const lit = hovered === i
              return (
                <button
                  key={p.num}
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  className="group flex min-w-0 flex-1 flex-col items-center border-0 bg-transparent p-0 text-center"
                  aria-label={`${p.subtitle}: ${p.title}`}
                >
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 bg-white font-display text-lg font-bold leading-none transition-colors duration-200 ${
                      lit
                        ? 'border-ge-accent text-ge-accent'
                        : 'border-ge-light text-ge-steel group-hover:border-ge-accent group-hover:text-ge-accent'
                    }`}
                  >
                    {p.num}
                  </span>
                  <span
                    className={`mt-2 font-body text-[10px] uppercase leading-tight tracking-[0.14em] transition-colors duration-200 ${
                      lit ? 'text-ge-accent' : 'text-ge-steel group-hover:text-ge-accent'
                    }`}
                  >
                    {p.subtitle}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="grid gap-5 lg:grid-cols-3">
            {top.map((p, i) => (
              <Card key={p.num} phase={p} index={i} />
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {bottom.map((p, i) => (
              <Card key={p.num} phase={p} index={i + 3} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** F — Option E duplicate; card background fills green on hover. */
function OptionF() {
  const [hovered, setHovered] = useState<number | null>(null)
  const top = phases.slice(0, 3)
  const bottom = phases.slice(3)

  function excerpt(text: string, max = 148) {
    if (text.length <= max) return text
    const cut = text.slice(0, max)
    return `${cut.replace(/\s+\S*$/, '')}…`
  }

  function Card({ phase, index }: { phase: Phase; index: number }) {
    const lit = hovered === index
    return (
      <article
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={`flex h-full flex-col border p-5 transition-colors duration-200 lg:p-6 ${
          lit
            ? 'border-ge-accent bg-ge-accent text-white'
            : 'border-ge-light bg-white hover:border-ge-accent'
        }`}
      >
        <div className="flex items-baseline gap-2">
          <span
            className={`font-display text-3xl font-bold leading-none transition-colors duration-200 ${
              lit ? 'text-white/90' : 'text-ge-light'
            }`}
          >
            {phase.num}
          </span>
          <span
            className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors duration-200 ${
              lit ? 'text-white/80' : 'text-ge-steel'
            }`}
          >
            {phase.subtitle}
          </span>
        </div>
        <h3
          className={`mt-2 font-display text-base font-bold uppercase leading-snug tracking-wide lg:text-lg ${
            lit ? 'text-white' : 'text-ge-black'
          }`}
        >
          {phase.title}
        </h3>
        <p className={`mt-3 flex-1 font-body text-sm leading-relaxed ${lit ? 'text-white/90' : 'text-ge-graphite'}`}>
          {excerpt(phase.description)}
        </p>
        <p
          className={`mt-4 border-t pt-3 font-body text-[12px] italic leading-relaxed ${
            lit ? 'border-white/25 text-white/85' : 'border-ge-light text-ge-graphite'
          }`}
        >
          {phase.entry}
        </p>
      </article>
    )
  }

  return (
    <Section className="border-t border-ge-light bg-white">
      <Container>
        <Intro />
        <div className="relative mt-14 w-full" onMouseLeave={() => setHovered(null)}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[10%] right-[10%] top-6 h-0.5 bg-ge-light"
          />
          {phases.map((_, i) => {
            if (i >= phases.length - 1) return null
            const lit = hovered !== null && i < hovered
            return (
              <div
                key={`seg-${i}`}
                aria-hidden="true"
                className={`pointer-events-none absolute top-6 h-0.5 origin-left transition-transform duration-300 ease-out ${
                  lit ? 'scale-x-100 bg-ge-accent' : 'scale-x-0 bg-ge-accent'
                }`}
                style={{
                  left: `${10 + (i / (phases.length - 1)) * 80}%`,
                  width: `${80 / (phases.length - 1)}%`,
                }}
              />
            )
          })}

          <div className="relative flex justify-between gap-2">
            {phases.map((p, i) => {
              const lit = hovered === i
              return (
                <button
                  key={p.num}
                  type="button"
                  onMouseEnter={() => setHovered(i)}
                  className="group flex min-w-0 flex-1 flex-col items-center border-0 bg-transparent p-0 text-center"
                  aria-label={`${p.subtitle}: ${p.title}`}
                >
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold leading-none transition-colors duration-200 ${
                      lit
                        ? 'border-ge-accent bg-ge-accent text-white'
                        : 'border-ge-light bg-white text-ge-steel group-hover:border-ge-accent group-hover:bg-ge-accent group-hover:text-white'
                    }`}
                  >
                    {p.num}
                  </span>
                  <span
                    className={`mt-2 font-body text-[10px] uppercase leading-tight tracking-[0.14em] transition-colors duration-200 ${
                      lit ? 'text-ge-accent' : 'text-ge-steel group-hover:text-ge-accent'
                    }`}
                  >
                    {p.subtitle}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 w-full">
          <div className="grid gap-5 lg:grid-cols-3">
            {top.map((p, i) => (
              <Card key={p.num} phase={p} index={i} />
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {bottom.map((p, i) => (
              <Card key={p.num} phase={p} index={i + 3} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default function PreviewProcess() {
  usePageMeta({
    title: `Preview — The Process — ${org.name}`,
    description: 'Draft layouts for The Process section. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · The Process layouts ·{' '}
          <Link to="/preview-lessons" className="underline underline-offset-2 hover:text-white/80">
            Lessons
          </Link>
          {' · '}
          <Link to="/preview-services" className="underline underline-offset-2 hover:text-white/80">
            Services
          </Link>
          {' · '}
          <Link to="/approach" className="underline underline-offset-2 hover:text-white/80">
            Approach
          </Link>
        </p>
      </div>

      <div className="sticky top-16 z-40 border-b border-ge-light bg-ge-offwhite/95 backdrop-blur-md lg:top-[72px]">
        <Container>
          <nav className="flex gap-1 overflow-x-auto py-3" aria-label="Layout options">
            {variants.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="shrink-0 px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite hover:text-ge-black"
              >
                {v.letter} · {v.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {variants.map((v) => (
        <div key={v.id} id={v.id} className="scroll-mt-36">
          <VariantBar letter={v.letter} title={v.title} note={v.note} />
          {v.letter === 'A' && <OptionA />}
          {v.letter === 'B' && <OptionB />}
          {v.letter === 'C' && <OptionC />}
          {v.letter === 'D' && <OptionD />}
          {v.letter === 'E' && <OptionE />}
          {v.letter === 'F' && <OptionF />}
        </div>
      ))}
    </>
  )
}

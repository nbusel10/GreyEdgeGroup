import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { anyPhaseNote, intro, phases, type Phase } from '../../content/process'
import { doors } from '../../content/advantage'
import { linkProcessServicePhrases } from '../../lib/linkProcessServicePhrases'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

function phaseIndexFromHash(hash: string): number | null {
  const id = hash.slice(1)
  if (!id) return null
  const index = phases.findIndex((p) => p.id === id)
  return index >= 0 ? index : null
}

/**
 * "The Process" — five phases on a centered timeline with detail cards.
 * Hover syncs timeline nodes and fills each card green; hash links pin a card until the user moves the mouse.
 */
export default function Process() {
  const { hash } = useLocation()
  const [pinned, setPinned] = useState<number | null>(() => phaseIndexFromHash(hash))
  const [hovered, setHovered] = useState<number | null>(null)
  const [hoverLocked, setHoverLocked] = useState(() => phaseIndexFromHash(hash) !== null)
  const [pulseIndex, setPulseIndex] = useState<number | null>(null)
  const active = hoverLocked ? pinned : (hovered ?? pinned)
  const top = phases.slice(0, 3)
  const bottom = phases.slice(3)

  const setHover = useCallback(
    (index: number | null) => {
      if (hoverLocked) return
      setHovered(index)
    },
    [hoverLocked],
  )

  useEffect(() => {
    const index = phaseIndexFromHash(hash)
    setPinned(index)
    setHovered(null)

    if (index === null) {
      setHoverLocked(false)
      setPulseIndex(null)
      return
    }

    setHoverLocked(true)
    setPulseIndex(null)

    const startTimer = window.setTimeout(() => setPulseIndex(index), 750)
    const endTimer = window.setTimeout(() => setPulseIndex(null), 750 + 2800)

    const unlock = () => setHoverLocked(false)
    window.addEventListener('mousemove', unlock, { once: true })
    window.addEventListener('pointerdown', unlock, { once: true })

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(endTimer)
      window.removeEventListener('mousemove', unlock)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [hash])

  function Card({ phase, index }: { phase: Phase; index: number }) {
    const lit = active === index
    const pulsing = pulseIndex === index
    return (
      <article
        id={index >= 3 ? phase.id : undefined}
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(null)}
        className={`relative flex h-full flex-col border p-5 transition-colors duration-200 lg:p-6 ${
          index >= 3 ? 'scroll-mt-20' : ''
        } ${
          lit
            ? 'border-ge-accent bg-ge-accent text-white'
            : 'border-ge-light bg-white hover:border-ge-accent'
        } ${pulsing ? 'process-pin-glow' : ''}`}
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
          <Link
            to={`#${phase.serviceId}`}
            className={`transition-colors hover:underline ${
              lit ? 'text-white hover:text-white/90' : 'text-ge-black hover:text-ge-accent'
            }`}
          >
            {phase.title}
          </Link>
        </h3>
        <p className={`mt-3 flex-1 font-body text-sm leading-relaxed ${lit ? 'text-white/90' : 'text-ge-graphite'}`}>
          {linkProcessServicePhrases(
            phase.description,
            lit
              ? 'underline decoration-white/50 underline-offset-2 transition-colors hover:text-white hover:decoration-white'
              : 'text-ge-accent underline decoration-ge-accent/40 underline-offset-2 transition-colors hover:decoration-ge-accent',
          )}
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

        <Reveal delay={0.08}>
          <div
            id="process-timeline"
            className="relative mt-14 scroll-mt-32 w-full overflow-visible pt-6"
            onMouseLeave={() => setHover(null)}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[10%] right-[10%] top-12 h-0.5 bg-ge-light"
            />
            {phases.map((_, i) => {
              if (i >= phases.length - 1) return null
              const segLit = active !== null && i < active
              return (
                <div
                  key={`seg-${i}`}
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-12 h-0.5 origin-left transition-transform duration-300 ease-out ${
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
                const lit = active === i
                const pulsing = pulseIndex === i
                return (
                  <Link
                    key={p.num}
                    to={`#${p.id}`}
                    onMouseEnter={() => setHover(i)}
                    className="group flex min-w-0 flex-1 flex-col items-center p-0 text-center no-underline"
                    aria-label={`${p.subtitle}: ${p.title}`}
                  >
                    <span
                      className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-lg font-bold leading-none transition-colors duration-200 ${
                        lit
                          ? 'border-ge-accent bg-ge-accent text-white'
                          : 'border-ge-light bg-white text-ge-steel group-hover:border-ge-accent group-hover:bg-ge-accent group-hover:text-white'
                      } ${pulsing ? 'process-pin-glow process-pin-glow-node' : ''}`}
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
                  </Link>
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
        </Reveal>

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

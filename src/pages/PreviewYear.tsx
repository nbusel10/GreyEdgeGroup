import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { story } from '../content/about'
import { org } from '../content/site'
import { Container, Eyebrow, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'
import { usePrefersReducedMotion, useReveal } from '../lib/hooks'

/**
 * TEMPORARY review route for the About founding-year title, at /preview-year.
 *
 * Live About page is unchanged until a treatment is signed off. Delete this
 * page, its route, and the `.ge-year-*` styles in index.css once chosen.
 */

type YearProps = {
  reduced: boolean
  /** True once the option has entered the viewport (or Replay forced a re-run). */
  active: boolean
  playKey: number
}

type Option = {
  id: string
  n: number
  title: string
  kind: 'Entrance' | 'Ongoing'
  note: string
  Year: (props: YearProps) => ReactNode
}

function YearShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-baseline gap-5 ${className}`}>
      {children}
      <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">{story.title}</h3>
    </div>
  )
}

function yearState(active: boolean, reduced: boolean) {
  if (reduced) return 'is-static'
  if (active) return 'is-active'
  return 'is-idle'
}

/** Current live treatment — baseline for comparison. */
function YearCurrent() {
  return (
    <YearShell>
      <span className="font-display text-6xl font-bold leading-none text-ge-accent">{story.year}</span>
    </YearShell>
  )
}

/** 1 — Digits count up and land on 2016. */
function YearCountUp({ reduced, active, playKey }: YearProps) {
  const [value, setValue] = useState(reduced ? 2016 : 0)

  useEffect(() => {
    if (reduced) {
      setValue(2016)
      return
    }
    if (!active) {
      setValue(0)
      return
    }
    setValue(0)
    let frame = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      setValue(Math.round(2016 * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduced, active, playKey])

  return (
    <YearShell>
      <span className="font-display text-6xl font-bold leading-none tabular-nums text-ge-accent">
        {String(value).padStart(4, '0')}
      </span>
    </YearShell>
  )
}

/** 2 — Each digit rises in with a short stagger. */
function YearStagger({ reduced, active, playKey }: YearProps) {
  return (
    <YearShell>
      <span
        key={playKey}
        className={`ge-year-stagger inline-flex font-display text-6xl font-bold leading-none text-ge-accent ${yearState(active, reduced)}`}
        aria-label={story.year}
      >
        {story.year.split('').map((d, i) => (
          <span key={`${d}-${i}`} style={{ ['--i' as string]: i }}>
            {d}
          </span>
        ))}
      </span>
    </YearShell>
  )
}

/** 3 — Accent rule draws under the year on entrance. */
function YearUnderline({ reduced, active, playKey }: YearProps) {
  return (
    <YearShell>
      <span
        key={playKey}
        className={`ge-year-underline relative inline-block font-display text-6xl font-bold leading-none text-ge-accent ${yearState(active, reduced)}`}
      >
        {story.year}
      </span>
    </YearShell>
  )
}

/** 4 — Outline year fills with accent, then a soft hold. */
function YearStrokeFill({ reduced, active, playKey }: YearProps) {
  return (
    <YearShell>
      <span
        key={playKey}
        className={`ge-year-stroke font-display text-6xl font-bold leading-none ${yearState(active, reduced)}`}
      >
        {story.year}
      </span>
    </YearShell>
  )
}

/** 5 — Horizontal clip wipe reveals the year. */
function YearClipWipe({ reduced, active, playKey }: YearProps) {
  return (
    <YearShell>
      <span
        key={playKey}
        className={`ge-year-wipe inline-block overflow-hidden font-display text-6xl font-bold leading-none text-ge-accent ${yearState(active, reduced)}`}
      >
        <span className="ge-year-wipe-inner inline-block">{story.year}</span>
      </span>
    </YearShell>
  )
}

/** 6 — Soft breathing scale / opacity pulse (ongoing after viewport). */
function YearBreath({ reduced, active }: YearProps) {
  return (
    <YearShell>
      <span
        className={`ge-year-breath inline-block font-display text-6xl font-bold leading-none text-ge-accent ${yearState(active, reduced)}`}
      >
        {story.year}
      </span>
    </YearShell>
  )
}

/** 7 — Ghost duplicate drifts behind the solid year. */
function YearGhost({ reduced, active, playKey }: YearProps) {
  return (
    <YearShell>
      <span
        key={playKey}
        className={`ge-year-ghost relative inline-block font-display text-6xl font-bold leading-none text-ge-accent ${yearState(active, reduced)}`}
        aria-label={story.year}
      >
        <span className="ge-year-ghost-echo" aria-hidden="true">
          {story.year}
        </span>
        <span className="relative">{story.year}</span>
      </span>
    </YearShell>
  )
}

/** 8 — Display year with glyph strokes drawn like pen ink. */
function YearHandwritten({ reduced, active, playKey }: YearProps) {
  const textRef = useRef<SVGTextElement>(null)
  const [pathLen, setPathLen] = useState(0)
  const [box, setBox] = useState({ w: 140, h: 72 })
  const state = yearState(active, reduced)

  useLayoutEffect(() => {
    let cancelled = false
    const measure = () => {
      const el = textRef.current
      if (!el || cancelled) return
      const advance = el.getComputedTextLength()
      // Condensed glyph outlines are longer than the advance width.
      setPathLen(Math.ceil(Math.max(advance * 3.2, 900)))
      // Hug the glyphs so the founded title sits next to the year (same as text-6xl spans).
      const padX = 6
      const padY = 8
      setBox({
        w: Math.ceil(advance + padX * 2),
        h: Math.ceil(72 + padY),
      })
    }
    measure()
    void document.fonts.ready.then(measure)
    return () => {
      cancelled = true
    }
  }, [playKey])

  // Drive dash offset in JS so the draw length is accurate after measure.
  useEffect(() => {
    const el = textRef.current
    if (!el || pathLen <= 0) return

    el.style.strokeDasharray = String(pathLen)
    el.style.transition = 'none'

    if (reduced) {
      el.style.strokeDashoffset = '0'
      el.style.fill = 'var(--color-ge-accent)'
      el.style.strokeWidth = '0'
      el.style.strokeOpacity = '1'
      return
    }

    el.style.fill = 'transparent'
    el.style.strokeWidth = '2'
    el.style.strokeDashoffset = String(pathLen)

    if (!active) {
      el.style.strokeOpacity = '0'
      return
    }

    // Reflow, then draw the outlines, then fill.
    void el.getBoundingClientRect()
    el.style.strokeOpacity = '1'
    el.style.transition = 'stroke-dashoffset 1.85s cubic-bezier(0.4, 0, 0.2, 1)'
    el.style.strokeDashoffset = '0'

    const fillTimer = window.setTimeout(() => {
      el.style.transition = 'fill 0.4s ease, stroke-width 0.4s ease'
      el.style.fill = 'var(--color-ge-accent)'
      el.style.strokeWidth = '0.35'
    }, 1750)

    return () => window.clearTimeout(fillTimer)
  }, [active, reduced, pathLen, playKey])

  return (
    <YearShell>
      <svg
        className={`ge-year-hand-svg ${state}`}
        viewBox={`0 0 ${box.w} ${box.h}`}
        aria-label={story.year}
      >
        <text ref={textRef} x="4" y="58">
          {story.year}
        </text>
      </svg>
    </YearShell>
  )
}

const options: Option[] = [
  {
    id: 'count-up',
    n: 1,
    title: 'Count-up',
    kind: 'Entrance',
    note: 'Digits race from 0000 to 2016 with an ease-out settle. Familiar pattern from the site’s stats — reads as “history landing.”',
    Year: YearCountUp,
  },
  {
    id: 'stagger',
    n: 2,
    title: 'Digit stagger',
    kind: 'Entrance',
    note: 'Each digit slides up and fades in, 70ms apart. Light motion, still editorial — closest to the current Reveal language.',
    Year: YearStagger,
  },
  {
    id: 'underline',
    n: 3,
    title: 'Underline draw',
    kind: 'Entrance',
    note: 'Year fades in while a thin accent rule draws left-to-right beneath it. Quiet flare that ties to the border-left body copy.',
    Year: YearUnderline,
  },
  {
    id: 'stroke-fill',
    n: 4,
    title: 'Stroke to fill',
    kind: 'Entrance',
    note: 'Year starts as an outlined glyph, then fills solid accent. More graphic punch without leaving the brand palette.',
    Year: YearStrokeFill,
  },
  {
    id: 'clip-wipe',
    n: 5,
    title: 'Clip wipe',
    kind: 'Entrance',
    note: 'A horizontal mask reveals the year as if a curtain opens. Architectural, one clean gesture.',
    Year: YearClipWipe,
  },
  {
    id: 'breath',
    n: 6,
    title: 'Breath pulse',
    kind: 'Ongoing',
    note: 'Very soft scale + opacity loop after the year enters the viewport. Continuous presence without competing with the headline.',
    Year: YearBreath,
  },
  {
    id: 'ghost',
    n: 7,
    title: 'Ghost echo',
    kind: 'Ongoing',
    note: 'A faint duplicate drifts behind the solid year, then settles. Flare on entrance, a little lingering motion after.',
    Year: YearGhost,
  },
  {
    id: 'handwritten',
    n: 8,
    title: 'Stroke draw',
    kind: 'Entrance',
    note: 'Barlow Condensed, same as the rest of the site. SVG stroke draws the glyph outlines like pen lines, then fills solid.',
    Year: YearHandwritten,
  },
]

function StorySnippet({ year }: { year: ReactNode }) {
  return (
    <div className="border border-ge-light bg-white p-8 sm:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-x-16">
        <div>
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
            {story.heading}
          </h2>
          <div className="mt-8 img-cut overflow-hidden">
            <img
              src={story.image}
              alt=""
              className="aspect-[16/10] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div>
          {year}
          <div className="mt-6 space-y-4 border-l border-ge-light pl-7">
            <p className="font-body text-base leading-relaxed text-ge-graphite">{story.body[0]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OptionBlock({
  option,
  reduced,
}: {
  option: Option
  reduced: boolean
}) {
  const [playKey, setPlayKey] = useState(0)
  const [forcePlay, setForcePlay] = useState(false)
  const { ref, visible } = useReveal<HTMLDivElement>(0.35)
  const labelId = useId()
  const Year = option.Year
  const active = reduced || visible || forcePlay

  const replay = () => {
    setForcePlay(false)
    requestAnimationFrame(() => {
      setPlayKey((k) => k + 1)
      setForcePlay(true)
    })
  }

  return (
    <section id={option.id} className="scroll-mt-24 border-t border-ge-light" aria-labelledby={labelId}>
      <div className="bg-ge-offwhite py-8">
        <Container>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p id={labelId} className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
                {option.n} — {option.title}
                <span className="ml-3 text-ge-accent">{option.kind}</span>
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-ge-steel">{option.note}</p>
            </div>
            <button
              type="button"
              onClick={replay}
              className="inline-flex items-center justify-center border border-ge-light bg-white px-5 py-2.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
            >
              Replay
            </button>
          </div>
        </Container>
      </div>
      <div className="bg-white py-10">
        <Container>
          <div ref={ref}>
            <StorySnippet
              year={<Year key={playKey} reduced={reduced} active={active} playKey={playKey} />}
            />
          </div>
        </Container>
      </div>
    </section>
  )
}

export default function PreviewYear() {
  const [forceReducedMotion, setForceReducedMotion] = useState(false)
  const osReduced = usePrefersReducedMotion()
  const reduced = forceReducedMotion || osReduced

  usePageMeta({
    title: `Preview — 2016 year title — ${org.name}`,
    description: 'Draft About founding-year treatments. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · About year title ·{' '}
          <Link to="/about" className="underline underline-offset-2 hover:text-white/80">
            Live About
          </Link>
        </p>
      </div>

      <Section className="bg-white">
        <Container>
          <Eyebrow>Temporary review page</Eyebrow>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl">
            2016 year title
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            Every option below waits for the viewport, then plays. Scroll down to trigger each one — or use
            Replay. Production About is unchanged.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              aria-pressed={forceReducedMotion}
              onClick={() => setForceReducedMotion((v) => !v)}
              className="inline-flex items-center justify-center border border-ge-light px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
            >
              {forceReducedMotion ? 'Show motion' : 'Preview reduced motion'}
            </button>
            {osReduced ? (
              <p className="font-body text-sm text-ge-steel">
                This browser already requests reduced motion — every option is static.
              </p>
            ) : forceReducedMotion ? (
              <p className="font-body text-sm text-ge-steel">Forcing static finals on every option below.</p>
            ) : null}
          </div>

          <nav className="mt-12 flex flex-wrap gap-2">
            <a
              href="#current"
              className="border border-ge-light px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
            >
              0. Current
            </a>
            {options.map((o) => (
              <a
                key={o.id}
                href={`#${o.id}`}
                className="border border-ge-light px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
              >
                {o.n}. {o.title}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      <section id="current" className="scroll-mt-24 border-t border-ge-light">
        <div className="bg-ge-offwhite py-8">
          <Container>
            <p className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
              0 — Current live
              <span className="ml-3 text-ge-steel">Baseline</span>
            </p>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ge-steel">
              What About shows today: solid accent year, no dedicated year motion beyond the section Reveal.
            </p>
          </Container>
        </div>
        <div className="bg-white py-10">
          <Container>
            <StorySnippet year={<YearCurrent />} />
          </Container>
        </div>
      </section>

      {options.map((option) => (
        <OptionBlock key={option.id} option={option} reduced={reduced} />
      ))}
    </>
  )
}

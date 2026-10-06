import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import AtlDiagram from '../AtlDiagram'
import { atlModes } from '../../content/atlModes'
import { usePrefersReducedMotion } from '../../lib/hooks'
import MoreInfo from '../MoreInfo'
import { Container, Reveal, Section, SectionHeading, proseLinkClass } from '../ui'

/**
 * The ambient temperature loop explainer: four thermal modes on one shared diagram,
 * auto-advancing until a tab is clicked, pausing when the section leaves the viewport
 * or the document is hidden.
 */
export default function AtlExplainer({
  intro,
  captions,
  more,
  moreFullWidth = false,
  panelNoun = 'mode',
}: {
  /** Replaces the intro paragraph. The live page leaves this unset. */
  intro?: ReactNode
  /** Caption overrides keyed by mode id. The live page leaves this unset. */
  captions?: Partial<Record<string, string>>
  /** Longer notes under each concept. The live page leaves this unset. */
  more?: Partial<Record<string, ReactNode>>
  /** Let those notes use the full panel width. */
  moreFullWidth?: boolean
  /** Name used for the four panels in labels and the screen reader. */
  panelNoun?: 'mode' | 'concept'
} = {}) {
  const uid = useId()
  const tablistId = `${uid}-modes`
  const panelId = `${uid}-panel`
  const liveId = `${uid}-live`

  const [index, setIndex] = useState(0)
  const [locked, setLocked] = useState(false)
  const [inView, setInView] = useState(true)
  const [hidden, setHidden] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const mode = atlModes[index]
  const paused = !inView || hidden
  const panelLabel = panelNoun === 'concept' ? 'Concept' : 'Mode'
  const caption = captions?.[mode.id] ?? mode.caption
  const extra = more?.[mode.id]

  const select = (next: number, fromUser: boolean) => {
    const wrapped = (next + atlModes.length) % atlModes.length
    setIndex(wrapped)
    if (fromUser) {
      setLocked(true)
      tabRefs.current[wrapped]?.focus()
    }
  }

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    onVis()
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  useEffect(() => {
    if (locked || reduceMotion || paused) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % atlModes.length), mode.cycleMs)
    return () => window.clearTimeout(t)
  }, [index, locked, reduceMotion, paused, mode.cycleMs])

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = atlModes.length - 1
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      select(i + 1, true)
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      select(i - 1, true)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0, true)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(last, true)
    }
  }

  return (
    <Section id="thermal-highway" className="border-t border-ge-light bg-white">
      <div ref={sectionRef}>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Exchange"
              heading={
                <>
                  How <span className="text-ge-accent">One Loop</span> Does It All.
                </>
              }
            />
            <div className="mt-6 space-y-5 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              {intro ?? (
                <p>
                  The Thermal Highway® is GreyEdge’s approach to connecting buildings and{' '}
                  <a href="#thermal-resources" className={proseLinkClass}>
                    thermal resources
                  </a>{' '}
                  across a network through a single ambient temperature loop. Heat pumps are the devices that move
                  thermal energy between the loop and each building. They can draw heat from the loop for heating or
                  remove heat from a building and return it to the loop for cooling. As energy moves through the
                  network, it can be exchanged between buildings, stored for later use, recovered from sources like
                  wastewater or data centers, or supplied by multiple thermal resources working together. The four graphics
                  below show different concepts of how the same loop continuously balances, moves, and delivers energy
                  and prioritizes the most cost effective energy path.
                </p>
              )}
            </div>
          </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div
            role="tablist"
            aria-label={panelNoun === 'concept' ? 'Thermal concepts' : 'Thermal modes'}
            id={tablistId}
            className="grid grid-cols-2 border border-ge-light sm:grid-cols-4"
          >
            {atlModes.map((m, i) => {
              const selected = i === index
              return (
                <button
                  key={m.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`${uid}-tab-${m.id}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i, true)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className={`group relative px-1.5 py-3 text-center transition-colors sm:px-3 sm:py-4 ${
                    selected ? 'bg-ge-accent' : 'bg-ge-offwhite hover:bg-white/70'
                  } ${i % 2 === 0 ? 'border-r border-ge-light' : ''} ${
                    i < 2 ? 'border-b border-ge-light sm:border-b-0' : ''
                  } ${i === 1 ? 'sm:border-r sm:border-ge-light' : ''}`}
                >
                  <span
                    className={`block font-display text-[18px] font-bold uppercase leading-snug tracking-wide ${
                      selected ? 'text-white' : 'text-ge-accent group-hover:text-ge-accent-deep'
                    }`}
                  >
                    {m.tab}
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 ${selected ? 'bg-ge-black' : 'bg-transparent'}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>

          <figure
            role="tabpanel"
            id={panelId}
            aria-labelledby={`${uid}-tab-${mode.id}`}
            className={`border border-t-0 border-ge-light bg-white px-3 py-6 sm:px-8 sm:py-8 ${paused ? 'atl-is-paused' : ''}`}
          >
            <p id={liveId} className="sr-only" aria-live="polite">
              {panelLabel} {index + 1} of {atlModes.length}, {mode.title.toLowerCase()}
            </p>

            <figcaption>
              <p className="font-body text-sm leading-relaxed text-ge-graphite">{caption}</p>
              {extra ? (
                <MoreInfo key={mode.id} fullWidth={moreFullWidth}>
                  {extra}
                </MoreInfo>
              ) : null}
            </figcaption>

            <AtlDiagram modeId={mode.id} className="mx-auto mt-8 max-w-[360px] md:max-w-none" />

            <div className="mt-8">
              <ul className="flex flex-wrap gap-x-8 gap-y-3">
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-6 shrink-0 bg-atl-heat" aria-hidden="true" />
                  <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">
                    Heat
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="h-1.5 w-6 shrink-0 bg-atl-cool" aria-hidden="true" />
                  <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">
                    Cool
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="flex w-6 shrink-0 gap-1" aria-hidden="true">
                    <span className="h-1.5 flex-1 bg-atl-flow" />
                    <span className="h-1.5 flex-1 bg-atl-flow" />
                    <span className="h-1.5 flex-1 bg-atl-flow" />
                  </span>
                  <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">
                    Circulation
                  </span>
                </li>
              </ul>
            </div>
          </figure>
        </Reveal>
        </Container>
      </div>
    </Section>
  )
}

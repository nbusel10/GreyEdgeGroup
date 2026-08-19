import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import AtlDiagram from '../AtlDiagram'
import { atlModes } from '../../content/atlModes'
import { usePrefersReducedMotion } from '../../lib/hooks'
import { Container, Reveal, Section, SectionHeading, proseLinkClass } from '../ui'

/**
 * The ambient temperature loop explainer: four thermal modes on one shared diagram,
 * auto-advancing until a tab is clicked, pausing when the section leaves the viewport
 * or the document is hidden.
 */
export default function AtlExplainer() {
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
    <Section id="atl-explainer" className="border-t border-ge-light bg-white">
      <div ref={sectionRef}>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Exchange"
              heading={
                <>
                  Four modes, <span className="text-ge-accent">one loop</span>
                </>
              }
            />
            <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              The Thermal Highway© is our architecture for connecting an entire district on a single ambient loop.
              Buildings and{' '}
              <a href="#thermal-resources" className={proseLinkClass}>
                thermal resources
              </a>{' '}
              (places that can give or take heat) are distributed along the network, including geoexchange, wastewater,
              data centers and a borefield that acts as a balancing resource. Heat rejected by one building can be
              used by another, stored in the ground until it is needed, recovered from a process that would
              otherwise release it, or supplied from more than one source at once. The four modes below are not
              separate systems&mdash;they&rsquo;re different jobs performed by the same loop.
            </p>
          </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div
            role="tablist"
            aria-label="Thermal modes"
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
                    selected ? 'bg-ge-accent-bright' : 'bg-ge-offwhite hover:bg-white/70'
                  } ${i % 2 === 0 ? 'border-r border-ge-light' : ''} ${
                    i < 2 ? 'border-b border-ge-light sm:border-b-0' : ''
                  } ${i === 1 ? 'sm:border-r sm:border-ge-light' : ''}`}
                >
                  <span
                    className={`block font-body text-[10px] tracking-[0.18em] ${
                      selected ? 'text-white/80' : 'text-ge-accent'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-1 block font-display text-[11px] font-bold uppercase leading-snug tracking-wide sm:text-[13px] ${
                      selected ? 'text-white' : 'text-ge-accent/80 group-hover:text-ge-accent'
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
              Mode {index + 1} of {atlModes.length}, {mode.title.toLowerCase()}
            </p>

            <figcaption>
              <p className="font-body text-sm leading-relaxed text-ge-graphite">{mode.caption}</p>
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

import { useEffect, useState } from 'react'
import HeroScrollCue from '../HeroScrollCue'
import { Btn, Eyebrow } from '../ui'
import {
  HERO_SECTION_CLASS,
  HeroHeading,
  HeroMedia,
  useHeroReducedMotion,
  type HeroVariantProps,
} from './heroShared'

/**
 * A2 — Definition hero.
 *
 * Leads with the category, then answers "what is that?" in the first viewport:
 * a rotating mechanism line and a row of proof numbers. Aimed at visitors who
 * have heard the term but cannot yet picture the system.
 */

const copy = {
  eyebrow: 'Thermal Utility Master Planners',
  category: 'Thermal Energy Networks',
  lines: ['Shared ambient loops.', 'Recovered heat.', 'District scale.'],
  /** Read aloud in place of the rotation, and shown outright on reduced motion. */
  linesStatic: 'Shared ambient loops. Recovered heat. District scale.',
  body: 'We plan, design and deliver the shared water loops that let campuses, districts and mountain towns trade heat between buildings instead of generating it building by building.',
  stats: [
    { value: '300+', label: 'Years combined experience' },
    { value: '15', label: 'Thermal energy specialists' },
    { value: '10', label: 'District-scale projects' },
  ],
}

const DWELL_MS = 1900
const TRANSITION_MS = 380

/**
 * Darker through the middle than the live hero: the rotating accent line sits
 * where bright video frames would otherwise wash it out.
 */
const OVERLAY =
  'linear-gradient(to bottom, rgba(20,23,26,0.82) 0%, rgba(20,23,26,0.62) 30%, rgba(20,23,26,0.72) 62%, rgba(20,23,26,0.94) 100%)'

/** Holds each line, fades it out, swaps, fades the next in. Pauses when inactive. */
function useLineCycle(count: number, active: boolean) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!active) return
    let swap = 0
    const hold = window.setTimeout(() => {
      setVisible(false)
      swap = window.setTimeout(() => {
        setIndex((v) => (v + 1) % count)
        setVisible(true)
      }, TRANSITION_MS)
    }, DWELL_MS)
    return () => {
      window.clearTimeout(hold)
      window.clearTimeout(swap)
    }
  }, [index, active, count])

  return { index, visible }
}

export default function HeroDefinition({ headingLevel = 1, forceReducedMotion = false }: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)
  const { index, visible } = useLineCycle(copy.lines.length, !reducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-end`}>
      <HeroMedia reducedMotion={reducedMotion} overlay={OVERLAY} />

      <div className="relative mx-auto w-full max-w-[1280px] pb-28 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-32 lg:pl-6">
        <div className="fade-slide-up max-w-5xl">
          <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>

          <HeroHeading
            level={headingLevel}
            className="mt-6 font-display text-[clamp(2.1rem,6.4vw,5.75rem)] font-bold uppercase leading-[0.98] tracking-tight text-white"
          >
            {copy.category}
          </HeroHeading>

          <p className="mt-5 font-body text-lg font-semibold text-ge-accent-bright sm:text-xl md:text-2xl">
            {reducedMotion ? (
              copy.linesStatic
            ) : (
              <>
                <span className="sr-only">{copy.linesStatic}</span>
                <span className="grid" aria-hidden="true">
                  {copy.lines.map((line, i) => (
                    <span
                      key={line}
                      className={`[grid-area:1/1] transition-all duration-300 ease-out ${
                        i === index && visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </span>
              </>
            )}
          </p>

          <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
            {copy.body}
          </p>

          <div className="mt-9 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/15 pt-6">
            {copy.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl font-bold leading-none tracking-tight text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-2 font-body text-[10px] uppercase tracking-[0.2em] text-ge-silver">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
            <Btn to="/contact" variant="light">
              Start planning
            </Btn>
            <Btn to="/geothermal-101" variant="ghost">
              How TENs work
            </Btn>
          </div>
        </div>
      </div>

      <HeroScrollCue />
    </section>
  )
}

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
 * 7 — Live loop.
 *
 * Leads with the mechanism and names it second: an ambient loop runs the width
 * of the hero with energy visibly moving along it, then the caption tells you
 * what that loop is called. Reuses the `animate-flow` dash idiom from the ATL
 * diagram, so reduced motion stops it through the existing `svg line` rule.
 */

const copy = {
  eyebrow: 'Thermal Utility Master Planners',
  headline: 'One loop. Every building.',
  captionLead: 'That loop is a',
  captionTerm: 'Thermal Energy Network',
  body: 'Heat leaves the buildings that have too much and arrives at the ones that need it. We plan, design and deliver the networks that make it happen.',
}

type LoopNode = { x: number; label: string }

const wideNodes: LoopNode[] = [
  { x: 160, label: 'Campus' },
  { x: 405, label: 'Housing' },
  { x: 650, label: 'Hospital' },
  { x: 895, label: 'Data center' },
  { x: 1140, label: 'Borefield' },
]

/**
 * Scaling the wide loop down to a phone renders the labels at a few pixels, so
 * narrow screens get their own shorter route rather than a shrunken one.
 */
const narrowNodes: LoopNode[] = [
  { x: 60, label: 'Campus' },
  { x: 200, label: 'Housing' },
  { x: 340, label: 'Borefield' },
]

const SPINE_Y = 52

/** Darker mid-band than the live hero so the loop and its labels stay legible on bright frames. */
const OVERLAY =
  'linear-gradient(to bottom, rgba(20,23,26,0.8) 0%, rgba(20,23,26,0.58) 28%, rgba(20,23,26,0.78) 62%, rgba(20,23,26,0.95) 100%)'

function LoopDiagram({
  id,
  nodes,
  width,
  fontSize,
  className,
  reducedMotion,
}: {
  id: string
  nodes: LoopNode[]
  width: number
  fontSize: number
  className: string
  /**
   * The stylesheet already stops `animate-flow` for the OS setting, but the
   * preview toggle is a prop, so the moving dash is dropped here too.
   */
  reducedMotion: boolean
}) {
  const inset = 30
  return (
    <svg
      viewBox={`0 0 ${width} 110`}
      className={`w-full ${className}`}
      role="img"
      aria-labelledby={`${id}-title`}
    >
      <title id={`${id}-title`}>
        Buildings and thermal resources connected to a single shared ambient loop.
      </title>

      <line x1={inset} y1={SPINE_Y} x2={width - inset} y2={SPINE_Y} stroke="#7a8288" strokeWidth="2" />
      {!reducedMotion && (
        <line
          x1={inset}
          y1={SPINE_Y}
          x2={width - inset}
          y2={SPINE_Y}
          stroke="#5a8574"
          strokeWidth="2"
          strokeDasharray="14 116"
          className="animate-flow"
        />
      )}

      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={SPINE_Y} r="7" fill="#14171a" stroke="#5a8574" strokeWidth="2" />
          <text
            x={n.x}
            y={SPINE_Y + 34}
            textAnchor="middle"
            className="font-body"
            fontSize={fontSize}
            fill="#e4e6e8"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function HeroLoopLine({ headingLevel = 1, forceReducedMotion = false }: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-end`}>
      <HeroMedia reducedMotion={reducedMotion} overlay={OVERLAY} />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-24 pt-24 sm:px-8 md:pt-28 lg:pb-28">
        <div className="fade-slide-up">
          <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>

          <HeroHeading
            level={headingLevel}
            className="mt-6 max-w-4xl font-display text-[clamp(2.1rem,5.6vw,4.75rem)] font-bold uppercase leading-[0.98] tracking-tight text-white"
          >
            {copy.headline}
          </HeroHeading>

          <div className="mt-9">
            <LoopDiagram
              id="hero-loop-narrow"
              nodes={narrowNodes}
              width={400}
              fontSize={20}
              className="sm:hidden"
              reducedMotion={reducedMotion}
            />
            <LoopDiagram
              id="hero-loop-wide"
              nodes={wideNodes}
              width={1200}
              fontSize={15}
              className="hidden sm:block"
              reducedMotion={reducedMotion}
            />
          </div>

          <p className="mt-5 font-body text-lg text-ge-silver sm:text-xl">
            {copy.captionLead}{' '}
            <span className="font-semibold text-white">{copy.captionTerm}</span>.
          </p>

          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base">
            {copy.body}
          </p>

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

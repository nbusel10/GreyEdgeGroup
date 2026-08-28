import HeroScrollCue from '../HeroScrollCue'
import { Btn } from '../ui'
import {
  HERO_SECTION_CLASS,
  HeroHeading,
  HeroMedia,
  useHeroReducedMotion,
  type HeroVariantProps,
} from './heroShared'

/**
 * 8 — Before and after.
 *
 * An editorial statement rather than a claim: the old way is set in muted grey
 * and struck through, the new way in full white. Thermal Energy Networks land
 * as the resolution of the sentence, which is a different kind of emphasis than
 * simply setting the term larger.
 */

/**
 * The whole variant rests on reading both lines, so the scrim is heavier than
 * the live hero's — the muted line has to stay legible, not just quiet.
 */
const OVERLAY =
  'linear-gradient(to bottom, rgba(20,23,26,0.84) 0%, rgba(20,23,26,0.66) 32%, rgba(20,23,26,0.8) 66%, rgba(20,23,26,0.95) 100%)'

const copy = {
  before: 'Every building making its own heat.',
  after: 'One network sharing it.',
  term: 'Thermal Energy Networks',
  body: 'Planned, designed and delivered for campuses, districts and mountain towns by a team with 300+ years of combined geothermal experience.',
}

export default function HeroContrast({ headingLevel = 1, forceReducedMotion = false }: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-center`}>
      <HeroMedia reducedMotion={reducedMotion} overlay={OVERLAY} />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-24 pt-24 sm:px-8 md:pt-28 lg:pb-28">
        <div className="fade-slide-up max-w-4xl">
          <HeroHeading
            level={headingLevel}
            className="font-display font-bold uppercase leading-[1.03] tracking-tight"
          >
            <span className="block text-[clamp(1.5rem,3.6vw,2.9rem)] text-ge-silver line-through decoration-ge-accent-bright decoration-[3px]">
              {copy.before}
            </span>
            <span className="mt-3 block text-[clamp(2rem,5.4vw,4.5rem)] leading-[0.98] text-white">
              {copy.after}
            </span>
          </HeroHeading>

          <p className="mt-8 flex items-center gap-4">
            <span className="h-px w-10 shrink-0 bg-ge-accent-bright" aria-hidden="true" />
            <span className="font-display text-xl font-bold uppercase tracking-[0.06em] text-white sm:text-2xl">
              {copy.term}
            </span>
          </p>

          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
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

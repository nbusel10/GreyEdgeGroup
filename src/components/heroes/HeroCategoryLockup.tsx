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
 * A1 — Category lockup.
 *
 * The headline breaks so "Thermal Energy Networks" carries the full display
 * scale and an accent rule, with the surrounding sentence stepped down. The
 * term reads as a category we own rather than a phrase inside a claim.
 */

const copy = {
  eyebrow: 'Thermal Utility Master Planners',
  leadIn: 'We build',
  category: 'Thermal Energy Networks',
  trailing: 'for campuses, districts and mountain towns.',
  body: 'One shared loop that moves heat to where it is needed, instead of every building making and rejecting its own. Planned, designed and delivered by a single accountable partner with 300+ years of combined geothermal experience.',
}

export default function HeroCategoryLockup({
  headingLevel = 1,
  forceReducedMotion = false,
}: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-end`}>
      <HeroMedia reducedMotion={reducedMotion} />

      <div className="relative mx-auto w-full max-w-[1280px] pb-28 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-32 lg:pl-6">
        <div className="fade-slide-up max-w-5xl">
          <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>

          <HeroHeading
            level={headingLevel}
            className="mt-6 font-display font-bold uppercase leading-[1.02] tracking-tight text-white"
          >
            <span className="block text-[clamp(1.15rem,2.4vw,1.9rem)] font-medium text-ge-light">
              {copy.leadIn}
            </span>
            <span className="mt-1 block">
              <span className="inline-block border-b-2 border-ge-accent-bright pb-3 text-[clamp(2.1rem,6.4vw,5.75rem)] leading-[0.98]">
                {copy.category}
              </span>
            </span>
            <span className="mt-5 block text-[clamp(1.05rem,2.2vw,1.75rem)] font-medium normal-case tracking-normal text-ge-light">
              {copy.trailing}
            </span>
          </HeroHeading>

          <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
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

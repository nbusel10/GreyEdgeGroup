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
 * 5 — Definition card.
 *
 * Breaks the all-dark hero convention: a light card sits on the footage and
 * defines the term outright, dictionary style. The contrast reversal is what
 * makes it land — nothing else on the site puts black type on white this early.
 */

const copy = {
  term: 'Thermal Energy Network',
  partOfSpeech: 'noun · the system we plan, design and deliver',
  definition:
    'One shared water loop connecting buildings and local thermal resources, so heat moves to where it is needed instead of every building making and rejecting its own.',
  outro: 'Built for campuses, districts and mountain towns by a team with 300+ years of combined geothermal experience.',
}

export default function HeroDefinitionCard({
  headingLevel = 1,
  forceReducedMotion = false,
}: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-center`}>
      <HeroMedia reducedMotion={reducedMotion} />

      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-24 pt-24 sm:px-8 md:pt-28 lg:pb-28">
        <div className="fade-slide-up max-w-2xl">
          <div className="border-l-4 border-ge-accent bg-ge-offwhite px-7 py-8 sm:px-9 sm:py-10">
            <HeroHeading
              level={headingLevel}
              className="font-display text-[clamp(1.9rem,4.4vw,3.25rem)] font-bold uppercase leading-[1.02] tracking-tight text-ge-black"
            >
              {copy.term}
            </HeroHeading>
            <p className="mt-3 font-body text-[11px] uppercase tracking-[0.24em] text-ge-accent">
              {copy.partOfSpeech}
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              {copy.definition}
            </p>
          </div>

          <p className="mt-7 max-w-xl font-body text-sm leading-relaxed text-ge-light sm:text-base">
            {copy.outro}
          </p>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
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

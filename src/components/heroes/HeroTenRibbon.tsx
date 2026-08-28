import { Link } from 'react-router-dom'
import { hero } from '../../content/site'
import { Btn, Container } from '../ui'
import {
  HERO_SECTION_CLASS,
  HeroHeading,
  HeroMedia,
  useHeroReducedMotion,
  type HeroVariantProps,
} from './heroShared'

/**
 * C1 — TEN ribbon.
 *
 * Live headline and body are untouched. Thermal Energy Networks get their own
 * bordered object along the bottom edge, borrowing the accent panel language
 * from the 300+ callout in PartnerBrief, so the term stops being a phrase
 * inside a sentence. The ribbon replaces the scroll cue at the hero's foot.
 */

const ribbon = {
  label: 'Thermal Energy Networks',
  definition:
    'One shared water loop connecting buildings and local thermal resources, so heat moves to where it is needed instead of every building making and rejecting its own.',
  linkLabel: 'How they work',
  to: '/geothermal-101#networks',
}

export default function HeroTenRibbon({ headingLevel = 1, forceReducedMotion = false }: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex flex-col justify-end`}>
      <HeroMedia reducedMotion={reducedMotion} />

      <div className="relative mx-auto w-full max-w-[1280px] pb-14 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-16 lg:pl-6">
        <div className="fade-slide-up max-w-4xl lg:max-w-5xl">
          <p className="font-body text-base font-semibold uppercase tracking-wide text-ge-light [word-spacing:0.55em] sm:text-lg md:text-xl">
            {hero.words.join(' ')}
          </p>
          <HeroHeading
            level={headingLevel}
            className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[65px] lg:max-w-[50vw]"
          >
            {hero.headline}
          </HeroHeading>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
            <Btn to="/contact" variant="light">
              Start planning
            </Btn>
            <Btn to="/projects" variant="ghost">
              See our work
            </Btn>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white bg-ge-accent">
        <Container className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:py-6">
          <div className="md:flex md:items-baseline md:gap-6">
            <p className="shrink-0 font-display text-xl font-bold uppercase tracking-[0.04em] text-white md:text-2xl">
              {ribbon.label}
            </p>
            <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-white/85 md:mt-0">
              {ribbon.definition}
            </p>
          </div>
          <Link
            to={ribbon.to}
            className="shrink-0 self-start border border-white px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-colors hover:bg-white hover:text-ge-accent md:self-auto"
          >
            {ribbon.linkLabel}
          </Link>
        </Container>
      </div>
    </section>
  )
}

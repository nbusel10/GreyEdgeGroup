import { Link } from 'react-router-dom'
import { site } from '../../content/images'
import { hero } from '../../content/site'
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
 * C2 — Split hero with the network diagram.
 *
 * Live copy is untouched; the right column shows the ambient loop instead of
 * describing it, so a visitor sees what a Thermal Energy Network is before
 * reading a word. Stacks below lg with the diagram beneath the copy.
 */

const diagram = {
  caption: 'The Thermal Highway©',
  linkLabel: 'See how it works',
  to: '/geothermal-101#thermal-highway',
}

/** Heavier scrim than the live hero: copy sits over a busier half of the frame. */
const OVERLAY =
  'linear-gradient(to bottom, rgba(20,23,26,0.86) 0%, rgba(20,23,26,0.6) 45%, rgba(20,23,26,0.92) 100%)'

export default function HeroSplitDiagram({
  headingLevel = 1,
  forceReducedMotion = false,
}: HeroVariantProps) {
  const reducedMotion = useHeroReducedMotion(forceReducedMotion)

  return (
    <section className={`${HERO_SECTION_CLASS} flex items-center`}>
      <HeroMedia reducedMotion={reducedMotion} overlay={OVERLAY} />

      <div className="relative mx-auto grid w-full max-w-[1280px] items-center gap-10 px-5 pb-24 pt-24 sm:px-8 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-28">
        <div className="fade-slide-up">
          <p className="font-body text-base font-semibold uppercase tracking-wide text-ge-light [word-spacing:0.55em] sm:text-lg md:text-xl">
            {hero.words.join(' ')}
          </p>
          <HeroHeading
            level={headingLevel}
            className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[58px]"
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

        <figure className="fade-slide-up border border-white/15 bg-ge-black/55 p-4 backdrop-blur-sm">
          {/* Above the fold, so it loads eagerly; the ratio reserves the frame before decode. */}
          <div className="img-cut aspect-[1408/768] overflow-hidden bg-ge-ink">
            <img
              src={site['network-diagram'].src}
              alt={site['network-diagram'].alt}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4">
            <span className="font-body text-[10px] uppercase tracking-[0.28em] text-ge-silver">
              {diagram.caption}
            </span>
            <Link
              to={diagram.to}
              className="font-body text-[10px] uppercase tracking-[0.22em] text-white transition-colors hover:text-ge-accent-bright"
            >
              {diagram.linkLabel}
            </Link>
          </figcaption>
        </figure>
      </div>

      <HeroScrollCue />
    </section>
  )
}

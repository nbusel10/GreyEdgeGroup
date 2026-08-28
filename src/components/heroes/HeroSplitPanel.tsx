import { site } from '../../content/images'
import { Btn, Eyebrow } from '../ui'
import { HeroHeading, type HeroVariantProps } from './heroShared'

/**
 * 6 — Hard split panel.
 *
 * No video and no gradient. A solid type panel butts straight against a
 * full-height photograph, so the hero is built from geometry rather than an
 * overlay. The accent appears only as the edge between the two halves.
 */

const copy = {
  eyebrow: 'Thermal Utility Master Planners',
  headline: 'Thermal Energy Networks',
  body: 'We plan, design and deliver the shared loops that let campuses, districts and mountain towns trade heat between buildings instead of generating it building by building.',
}

export default function HeroSplitPanel({ headingLevel = 1 }: HeroVariantProps) {
  return (
    <section className="relative grid min-h-svh grid-rows-[auto_1fr] overflow-hidden bg-ge-black lg:h-[92vh] lg:min-h-[720px] lg:grid-cols-2 lg:grid-rows-1">
      {/* The accent is the seam: the panel's top edge when stacked, its right edge when split. */}
      <div className="fade-slide-up order-2 flex flex-col justify-center border-t-4 border-ge-accent px-5 py-16 sm:px-8 lg:order-1 lg:border-r-4 lg:border-t-0 lg:py-0 lg:pl-10 lg:pr-14 xl:pl-16">
        <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>

        <HeroHeading
          level={headingLevel}
          className="mt-6 font-display text-[clamp(2.1rem,4.6vw,4.25rem)] font-bold uppercase leading-[0.98] tracking-tight text-white"
        >
          {copy.headline}
        </HeroHeading>

        <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
          {copy.body}
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

      <div className="relative order-1 min-h-[42svh] lg:order-2 lg:min-h-0">
        <img
          src={site['hero-district'].src}
          alt={site['hero-district'].alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

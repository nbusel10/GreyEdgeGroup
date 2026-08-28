import type { ReactNode } from 'react'
import { hero } from '../../content/site'
import { usePrefersReducedMotion } from '../../lib/hooks'

/**
 * Shared pieces for the draft home hero variants in this folder.
 *
 * Each variant owns its own layout and copy so it can be read in isolation and
 * dropped into Home.tsx whole. Only the background treatment and the heading
 * tag are shared, since those must stay identical across variants for the
 * comparison to be fair.
 */

export type HeroVariantProps = {
  /**
   * The review page stacks every variant on one document, so only the live
   * hero should render an h1.
   */
  headingLevel?: 1 | 2
  forceReducedMotion?: boolean
}

/** Matches the gradient on the current live hero. */
export const HERO_OVERLAY =
  'linear-gradient(to bottom, rgba(20,23,26,0.78) 0%, rgba(20,23,26,0.32) 26%, rgba(20,23,26,0.6) 58%, rgba(20,23,26,0.94) 100%)'

export const HERO_SECTION_CLASS =
  'relative min-h-svh overflow-hidden bg-ge-black lg:h-[92vh] lg:min-h-[720px]'

export function useHeroReducedMotion(force = false) {
  return usePrefersReducedMotion() || force
}

/** Background video with the poster standing in whenever motion is reduced. */
export function HeroMedia({
  reducedMotion,
  overlay = HERO_OVERLAY,
}: {
  reducedMotion: boolean
  overlay?: string
}) {
  return (
    <>
      {reducedMotion ? (
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={hero.image}
          aria-hidden="true"
        >
          <source src={hero.video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0" aria-hidden="true" style={{ background: overlay }} />
    </>
  )
}

export function HeroHeading({
  level = 1,
  className = '',
  children,
}: {
  level?: 1 | 2
  className?: string
  children: ReactNode
}) {
  const Tag = level === 1 ? 'h1' : 'h2'
  return <Tag className={className}>{children}</Tag>
}

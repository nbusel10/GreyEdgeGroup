/**
 * The official GREYEDGE wordmark — including the diagonal slashes through EDGE.
 * Swaps between the light and dark brand assets depending on the surface.
 */
export default function Logo({
  className = '',
  tone = 'dark',
  scale,
}: {
  className?: string
  /** 'light' for use on dark backgrounds. */
  tone?: 'light' | 'dark'
  /** Height multiplier relative to parent font size. Defaults by tone. */
  scale?: number
}) {
  const src = tone === 'light' ? '/images/brand/logo-white.webp' : '/images/brand/logo-dark.webp'
  // White asset carries more transparent padding — scale up to match dark wordmark visually.
  const resolvedScale = scale ?? (tone === 'light' ? 2.5 : 1.05)
  const maxWidthEm = 11 * resolvedScale

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span className="sr-only">The GreyEdge Group</span>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="w-auto select-none"
        style={{ height: `${resolvedScale}em`, maxWidth: `${maxWidthEm}em` }}
        draggable={false}
      />
    </span>
  )
}

/**
 * The GreyEdge Group lockup ("the" / GreyEdge / "group").
 * Light tone is the white mark for dark surfaces; dark tone is the grey mark for light surfaces.
 */
export default function Logo({
  className = '',
  tone = 'dark',
  scale,
}: {
  className?: string
  /** 'light' for use on dark backgrounds. */
  tone?: 'light' | 'dark'
  /** Height multiplier relative to parent font size. */
  scale?: number
}) {
  const src = tone === 'light' ? '/images/brand/logo-white-v2.webp' : '/images/brand/logo-dark-v2.webp'
  const resolvedScale = scale ?? 1.95
  const maxWidthEm = 8 * resolvedScale

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

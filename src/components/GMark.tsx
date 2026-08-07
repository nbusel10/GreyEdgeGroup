/**
 * The GreyEdge G.
 *
 * Traced from the "GE" monogram favicon: a bold geometric ring with a horizontal
 * crossbar meeting it on the right. The butt-cut terminal on the upper right leaves an
 * angled edge, which echoes the diagonal slices in the "EDGE" half of the wordmark.
 *
 * Drawn in currentColor so callers control it with a text colour class.
 */

const RING = 'M 78.83 31.98 A 34 34 0 1 0 83.67 54.73'
const STROKE = 16
// Cropped to the glyph's actual bounds so the mark fills its box and can be optically
// matched to cap height when it sits inline with type.
const VIEWBOX = '8 8 84 84'

export default function GMark({
  className = '',
  title,
}: {
  className?: string
  /** Supply only when the mark is meaningful on its own; decorative uses stay silent. */
  title?: string
}) {
  return (
    <svg
      viewBox={VIEWBOX}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title && <title>{title}</title>}
      <path d={RING} fill="none" stroke="currentColor" strokeWidth={STROKE} />
      <rect x="48" y="42" width="43" height={STROKE} fill="currentColor" />
    </svg>
  )
}

/** The G as a small list glyph, replacing a generic bullet. */
export function GBullet({ className = '' }: { className?: string }) {
  return <GMark className={`w-2.5 h-2.5 shrink-0 ${className}`} />
}

/**
 * Oversized watermark that bleeds off the edge of a section. Purely decorative —
 * it sits behind content and never receives pointer events.
 */
export function GWatermark({
  className = '',
  side = 'right',
}: {
  className?: string
  side?: 'left' | 'right'
}) {
  return (
    <div
      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 select-none ${
        side === 'right' ? 'right-0 translate-x-1/3' : 'left-0 -translate-x-1/3'
      } ${className}`}
      aria-hidden="true"
    >
      <GMark className="w-[60vw] max-w-[680px] h-auto" />
    </div>
  )
}
/**
 * The GreyEdge G.
 *
 * Condensed from the GE monogram: a bold geometric ring with a horizontal
 * crossbar meeting it on the right. Used as a watermark / accent mark; the
 * full wordmark (with EDGE slashes) lives in Logo and the brand image assets.
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

/**
 * Oversized watermark that bleeds off the edge of a section. Purely decorative —
 * it sits behind content and never receives pointer events.
 *
 * `mark="ge"` uses the favicon monogram (masked so callers still tint via text colour).
 */
// ge-mark.webp is a square canvas with padded glyphs. Measured opaque bounds:
// 742×508 inside 854×854 → aspect ~1.46. Scale the mask so glyph edges meet the box.
const GE_GLYPH_ASPECT = '742 / 508'
const GE_MASK_SIZE = `${(854 / 742) * 100}% ${(854 / 508) * 100}%`

export function GWatermark({
  className = '',
  side = 'right',
  mark = 'g',
}: {
  className?: string
  side?: 'left' | 'right'
  /** Condensed G (default) or the full favicon GE monogram. */
  mark?: 'g' | 'ge'
}) {
  // Condensed G bleeds hard off-edge; GE is much wider at full height, so keep a light
  // nudge (or none) so both letters stay inside overflow-hidden sections.
  const edge =
    mark === 'ge'
      ? side === 'right'
        ? 'right-0 translate-x-[2%]'
        : 'left-0 -translate-x-[2%]'
      : side === 'right'
        ? 'right-0 translate-x-1/3'
        : 'left-0 -translate-x-1/3'

  // GE fills the section height; condensed G stays vw-sized and vertically centered.
  const placement =
    mark === 'ge'
      ? `inset-y-0 ${edge}`
      : `top-1/2 -translate-y-1/2 ${edge}`

  return (
    <div
      className={`pointer-events-none absolute select-none ${placement} ${className}`}
      aria-hidden="true"
    >
      {mark === 'ge' ? (
        <div
          className="h-full w-auto bg-current"
          style={{
            aspectRatio: GE_GLYPH_ASPECT,
            WebkitMaskImage: 'url(/images/brand/ge-mark.webp)',
            maskImage: 'url(/images/brand/ge-mark.webp)',
            // Oversize + center crops the square padding so G/E touch top & bottom.
            WebkitMaskSize: GE_MASK_SIZE,
            maskSize: GE_MASK_SIZE,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      ) : (
        <GMark className="h-auto w-[60vw] max-w-[680px]" />
      )}
    </div>
  )
}
import { useScrollProgress, useScrolled } from '../lib/hooks'

/**
 * Scroll progress as a ring around the GE favicon monogram. Doubles as back-to-top.
 * Hidden until past the first screen so it never competes with the hero.
 */

// ge-mark.webp: square canvas with padded glyphs — crop mask so G/E fill the box.
const GE_GLYPH_ASPECT = '742 / 508'
const GE_MASK_SIZE = `${(854 / 742) * 100}% ${(854 / 508) * 100}%`

const geMaskStyle = {
  aspectRatio: GE_GLYPH_ASPECT,
  WebkitMaskImage: 'url(/images/brand/ge-mark.webp)',
  maskImage: 'url(/images/brand/ge-mark.webp)',
  WebkitMaskSize: GE_MASK_SIZE,
  maskSize: GE_MASK_SIZE,
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  maskPosition: 'center',
} as const

export default function ScrollIndicator() {
  const progress = useScrollProgress()
  const shown = useScrolled(600)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ge-charcoal/15 bg-ge-offwhite/90 backdrop-blur-sm transition-all duration-300 hover:border-ge-accent hover:text-ge-accent sm:bottom-8 sm:right-8 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      } text-ge-charcoal`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-ge-charcoal/10"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          pathLength={1}
          className="stroke-ge-accent transition-[stroke-dashoffset] duration-150"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <span
        className="relative block h-[14px] w-auto bg-current"
        style={geMaskStyle}
        aria-hidden="true"
      />
      <span className="sr-only">{Math.round(progress * 100)}% of page read</span>
    </button>
  )
}

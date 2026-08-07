import { useScrollProgress, useScrolled } from '../lib/hooks'
import GMark from './GMark'

/**
 * Scroll progress rendered as the G filling from the bottom, parked in the corner.
 * Doubles as a back-to-top control. Hidden until the reader is past the first screen so
 * it never competes with the hero.
 */
export default function ScrollIndicator() {
  const progress = useScrollProgress()
  const shown = useScrolled(600)
  const clip = Math.round((1 - progress) * 100)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-6 right-5 z-40 flex h-11 w-11 items-center justify-center border border-ge-charcoal/15 bg-ge-offwhite/90 backdrop-blur-sm transition-all duration-300 hover:border-ge-accent sm:bottom-8 sm:right-8 ${
        shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <span className="relative block h-5 w-5">
        <GMark className="h-full w-full text-ge-steel/35" />
        <span
          className="absolute inset-0 block transition-[clip-path] duration-150"
          style={{ clipPath: `inset(${clip}% 0 0 0)` }}
        >
          <GMark className="h-full w-full text-ge-accent" />
        </span>
      </span>
      <span className="sr-only">{Math.round(progress * 100)}% of page read</span>
    </button>
  )
}

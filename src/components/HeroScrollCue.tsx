/**
 * Minimal hero scroll prompt — “SCROLL” over a thin vertical track with a
 * bright tip that travels downward. Absolute inside the hero section.
 */
export default function HeroScrollCue({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        window.scrollBy({
          top: Math.round(window.innerHeight * 0.85),
          behavior: 'smooth',
        })
      }
      aria-label="Scroll to content"
      className={`absolute bottom-[max(1.5rem,env(safe-area-inset-bottom,0px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70 transition-colors hover:text-white md:bottom-7 md:gap-2.5 ${className}`}
    >
      <span className="font-body text-[10px] font-medium uppercase tracking-[0.32em]">
        Scroll
      </span>
      <span className="hero-scroll-track relative block h-11 w-px overflow-hidden bg-white/25" aria-hidden="true">
        <span className="hero-scroll-tip absolute left-0 top-0 h-3 w-px bg-white" />
      </span>
    </button>
  )
}

/**
 * Full-bleed GreyEdge lockup GIF. The asset has ~43% empty top and ~30%
 * empty bottom; we crop to the ink band (~57% down) so the mark and scrolling
 * word row fill the section without wasted whitespace or clipping.
 */
export default function GreyEdgeBand() {
  return (
    <section className="overflow-hidden border-t border-ge-light bg-white py-6 md:py-8" aria-label="GreyEdge">
      {/* Aspect matches the ink band (~1400×300) with a little breathing room. */}
      <div className="relative mx-auto w-full max-w-[1176px] aspect-[1400/310] overflow-hidden">
        <img
          src="/videos/greyedge-lockup.gif?v=3"
          alt="GreyEdge"
          className="pointer-events-none absolute left-0 w-full max-w-none"
          style={{ top: '50%', transform: 'translateY(-56.7%)' }}
          loading="lazy"
        />
      </div>
    </section>
  )
}

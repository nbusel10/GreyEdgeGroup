import GreyEdgeCycle from '../GreyEdgeCycle'
import { Container } from '../ui'

/**
 * Full-bleed fly-up GreyEdge lockup (preview option 6).
 * Animation starts when the band scrolls into view, plays three times with a
 * 2s pause between passes, then holds on GreyEdge with the filled adjective
 * row and brand-accent underline.
 */
export default function GreyEdgeBand({
  forceReducedMotion = false,
}: {
  forceReducedMotion?: boolean
}) {
  return (
    <section className="ge-word-band border-t border-ge-charcoal bg-ge-black py-10 md:py-12" aria-label="GreyEdge">
      <Container>
        <div className="flex justify-center">
          <GreyEdgeCycle
            variant="fly-up-row"
            loops={3}
            pauseBetweenMs={2000}
            forceReducedMotion={forceReducedMotion}
            className="text-[clamp(2rem,4.8vw,4.5rem)]"
          />
        </div>
      </Container>
    </section>
  )
}

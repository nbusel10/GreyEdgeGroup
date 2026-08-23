import GreyEdgeCycle from '../GreyEdgeCycle'
import { Container } from '../ui'

/**
 * Full-bleed fly-up GreyEdge lockup (preview option 6).
 * Leading / Cutting / Competitive park beside Edge, then zoom up into the
 * row and stay; Grey locks with the brand-accent underline. Sized in vw so
 * the top row always fits — no overflow clipping that shoves the lockup
 * off-screen.
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
            forceReducedMotion={forceReducedMotion}
            className="text-[clamp(2rem,4.8vw,4.5rem)]"
          />
        </div>
      </Container>
    </section>
  )
}

import GreyEdgeCycle from '../GreyEdgeCycle'
import { Container } from '../ui'

/**
 * Full-bleed fly-up GreyEdge lockup. Lives between light chapters as a brand
 * beat; on Home it sits above the LinkedIn strip, before Final CTA.
 */
export default function GreyEdgeBand({
  forceReducedMotion = false,
}: {
  forceReducedMotion?: boolean
}) {
  return (
    <section className="border-t border-ge-charcoal bg-ge-black py-10 md:py-12" aria-label="GreyEdge">
      <Container>
        <div className="flex justify-center overflow-visible [container-type:inline-size]">
          <GreyEdgeCycle
            variant="fly-up-row"
            forceReducedMotion={forceReducedMotion}
            className="text-[length:clamp(1.75rem,calc(100cqw/12.5),6rem)]"
          />
        </div>
      </Container>
    </section>
  )
}

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
    <section
      className="overflow-x-hidden border-t border-ge-charcoal bg-ge-black py-10 md:py-12"
      aria-label="GreyEdge"
    >
      <Container>
        {/*
          Clip horizontal spill from the fly path. Size off the container so
          “Leading · Cutting · Competitive” stays inside the content width —
          100cqw/12.5 was still wide enough for mid-flight scale to clip the
          viewport on live.
        */}
        <div className="flex justify-center overflow-x-clip [container-type:inline-size]">
          <GreyEdgeCycle
            variant="fly-up-row"
            forceReducedMotion={forceReducedMotion}
            className="max-w-full text-[length:clamp(1.5rem,calc(100cqw/16),4.5rem)]"
          />
        </div>
      </Container>
    </section>
  )
}

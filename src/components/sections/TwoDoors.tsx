import { doors } from '../../content/advantage'
import { Btn, Container, Reveal } from '../ui'

/** Approach closer: same band as Geothermal 101 “still have a question.” */
export default function TwoDoors() {
  return (
    <div className="border-t border-ge-light bg-white py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 border border-ge-light bg-ge-offwhite p-8 md:flex-row md:items-center md:p-10">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">
                Explore the possibilities
              </h3>
              <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ge-graphite">
                Every project begins with a different set of challenges, constraints, and possibilities. Bring us what
                you have, and we&rsquo;ll bring decades of industry experience to help uncover opportunities, identify
                risks, and clarify the path forward.
              </p>
            </div>
            <Btn to={doors.consultation.to} className="shrink-0">
              Get in touch
            </Btn>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}

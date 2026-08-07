import { finalCta } from '../../content/site'
import { doors } from '../../content/advantage'
import { GWatermark } from '../GMark'
import { Btn, Container, Eyebrow, Reveal } from '../ui'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-ge-charcoal bg-ge-black py-20 md:py-28">
      <GWatermark className="text-white/[0.03]" side="left" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow tone="light">{finalCta.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
              Let&rsquo;s engineer <span className="text-ge-accent">what&rsquo;s next.</span>
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ge-silver">{finalCta.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Btn to={doors.consultation.to} variant="light">
                Start planning
              </Btn>
              <Btn to={doors.education.to} variant="ghost">
                Or just learn more
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={finalCta.image}
              alt={finalCta.imageAlt}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

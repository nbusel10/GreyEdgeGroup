import { finalCta } from '../../content/site'
import { doors } from '../../content/advantage'
import { Btn, Container, Eyebrow, Reveal } from '../ui'

export default function FinalCta() {
  return (
    <section className="border-t border-ge-charcoal bg-ge-black py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <Eyebrow tone="light">{finalCta.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
              Let&rsquo;s plan <span className="text-ge-accent">what&rsquo;s next.</span>
            </h2>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-ge-silver">{finalCta.body}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Btn to={doors.consultation.to} variant="light">
                Start planning
              </Btn>
              <Btn to={doors.education.to} variant="ghost">
                Learn More
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <img
              src={finalCta.image}
              alt={finalCta.imageAlt}
              className="img-cut aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

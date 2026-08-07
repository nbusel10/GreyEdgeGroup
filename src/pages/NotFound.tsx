import { GWatermark } from '../components/GMark'
import { Btn, Container, Eyebrow } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function NotFound() {
  usePageMeta({ title: 'Page not found — The GreyEdge Group' })

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-ge-black py-28">
      <GWatermark className="text-white/[0.04]" side="right" />
      <Container className="relative">
        <Eyebrow tone="light">Error 404</Eyebrow>
        <h1 className="mt-5 font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-7xl">
          This one&rsquo;s <span className="text-ge-accent">off the map.</span>
        </h1>
        <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-ge-silver">
          The page you were looking for doesn&rsquo;t exist. Here are a few places that do.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Btn to="/" variant="light">
            Home
          </Btn>
          <Btn to="/projects" variant="ghost">
            Projects
          </Btn>
          <Btn to="/contact" variant="ghost">
            Contact
          </Btn>
        </div>
      </Container>
    </section>
  )
}

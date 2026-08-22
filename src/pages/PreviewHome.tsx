import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { hero, org } from '../content/site'
import { featuredProjects } from '../content/projects'
import Challenges from '../components/sections/Challenges'
import PartnerBrief from '../components/sections/PartnerBrief'
import Leadership from '../components/sections/Leadership'
import GreyEdgeBand from '../components/sections/GreyEdgeBand'
import Educate from '../components/sections/Educate'
import FinalCta from '../components/sections/FinalCta'
import ProjectCard from '../components/ProjectCard'
import HeroScrollCue from '../components/HeroScrollCue'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable mock of the shortened home spine.
 * Not linked in nav. Live `/` is unchanged until this flow is approved.
 */
export default function PreviewHome() {
  const [preferReducedMotion, setPreferReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPreferReducedMotion(mq.matches)
    const onChange = () => setPreferReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  usePageMeta({
    title: `Preview — ${org.name}`,
    description: 'Draft homepage flow preview. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · shortened home spine ·{' '}
          <Link to="/" className="underline underline-offset-2 hover:text-white/80">
            Back to live home
          </Link>
        </p>
      </div>

      {/* ── Hero ── */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-ge-black lg:h-[92vh] lg:min-h-[720px]">
        {preferReducedMotion ? (
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.image}
            aria-hidden="true"
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        )}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,23,26,0.78) 0%, rgba(20,23,26,0.32) 26%, rgba(20,23,26,0.6) 58%, rgba(20,23,26,0.94) 100%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-[1280px] pb-36 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-40 lg:pl-6">
          <div className="fade-slide-up max-w-4xl lg:max-w-5xl">
            <p className="font-body text-base font-semibold uppercase tracking-wide text-ge-light [word-spacing:0.55em] sm:text-lg md:text-xl">
              {hero.words.join(' ')}
            </p>
            <h1 className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[65px] lg:max-w-[50vw]">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
              {hero.body}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
              <Btn to="/contact" variant="light">
                Start planning
              </Btn>
              <Btn to="/projects" variant="ghost">
                See our work
              </Btn>
            </div>
          </div>
        </div>
        <HeroScrollCue className="!bottom-20" />
      </section>

      <Challenges />
      <PartnerBrief />
      <GreyEdgeBand />

      {/* ── Featured projects ── */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <div>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <Eyebrow>Proof</Eyebrow>
                  <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl md:text-6xl">
                    Featured Projects
                  </h2>
                </div>
                <Btn to="/projects" variant="outline" className="shrink-0 self-start">
                  View all projects
                </Btn>
              </div>
              <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                Every project faces challenges, from site constraints and subsurface uncertainty to utility
                coordination and mechanical complexity. TGEG helps clients navigate these obstacles with
                rigorous analysis, innovative thermal network strategies, and practical solutions that deliver
                reliable, long-term energy infrastructure.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Leadership variant="teaser" />
      <Educate />
      <FinalCta />
    </>
  )
}

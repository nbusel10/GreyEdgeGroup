import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { hero, org } from '../content/site'
import { featuredProjects } from '../content/projects'
import { insights } from '../content/insights'
import Challenges from '../components/sections/Challenges'
import PartnerBrief from '../components/sections/PartnerBrief'
import Leadership from '../components/sections/Leadership'
import FinalCta from '../components/sections/FinalCta'
import ProjectCard from '../components/ProjectCard'
import HeroScrollCue from '../components/HeroScrollCue'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function Home() {
  const [preferReducedMotion, setPreferReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPreferReducedMotion(mq.matches)
    const onChange = () => setPreferReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  usePageMeta({
    title: `${org.name} — ${org.tagline}`,
    description:
      'We plan, design and deliver Thermal Energy Networks for developers, campuses and communities. 300+ years of combined experience, one accountable partner from evaluation through expansion.',
  })

  return (
    <>
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
        <div className="relative mx-auto w-full max-w-[1280px] pb-28 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-32 lg:pl-6">
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
        <HeroScrollCue />
      </section>

      <Challenges />
      <PartnerBrief />

      {/* ── Featured projects ── */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <div>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <Eyebrow>The Proof</Eyebrow>
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

      <Leadership />

      {/* ── Insights ── */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>The Edge</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl md:text-6xl">
                  From education to execution.
                </h2>
              </div>
              <Btn to="/insights" variant="outline" className="shrink-0 self-start">
                All insights
              </Btn>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {insights.slice(0, 3).map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.07}>
                <Link
                  to={item.to}
                  className="group flex h-full flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent"
                >
                  <div className="img-cut h-44 overflow-hidden bg-ge-light">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">
                        {item.category}
                      </span>
                      <span className="font-body text-[10px] text-ge-steel">{item.readTime}</span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{item.summary}</p>
                    <span className="rule-grow mt-5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="!py-10 border-t border-ge-light bg-ge-offwhite md:!py-12">
        <Container>
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 border border-ge-light bg-white px-5 py-5 md:flex-row md:items-center md:px-6 md:py-5">
              <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black md:text-3xl">
                More on LinkedIn
              </h2>
              <Btn
                href={org.social.linkedin}
                className="shrink-0 !bg-ge-accent px-6 py-3 hover:!bg-ge-accent-deep"
              >
                Follow GreyEdge
              </Btn>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

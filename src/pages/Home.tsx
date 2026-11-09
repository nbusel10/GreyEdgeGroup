import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { hero, org } from '../content/site'
import { featuredProjects } from '../content/projects'
import { insights } from '../content/insights'
import Challenges from '../components/sections/Challenges'
import FeaturedConversation from '../components/sections/FeaturedConversation'
import PartnerBrief from '../components/sections/PartnerBrief'
import Leadership from '../components/sections/Leadership'
import FinalCta from '../components/sections/FinalCta'
import GreyEdgeBand from '../components/sections/GreyEdgeBand'
import LinkedInFeed from '../components/sections/LinkedInFeed'
import ProjectCard from '../components/ProjectCard'
import HeroScrollCue from '../components/HeroScrollCue'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { gaAttrs } from '../lib/gaLabel'
import { usePageMeta } from '../lib/meta'

const GEOTHERMAL_RISING_ANNOUNCEMENT =
  'https://www.linkedin.com/posts/geothermalrising_geothermalrising-geothermal-geothermalleadership-activity-7521584676235386880-pRE_'

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
    title: `${org.name} — Thermal Energy Network Design Experts`,
    description: org.description,
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
              <span className="block">{hero.headlineLead}</span>
              <span className="block text-white">{hero.headlineEmphasis}</span>
              <span className="block">{hero.headlineAccent}</span>
            </h1>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
              {hero.body}
            </p>
            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
              <Btn to="/contact" track="home_hero_start_planning" variant="light">
                Start planning
              </Btn>
              <Btn to="/geothermal-101#thermal-highway" track="home_hero_see_how_it_works" variant="ghost">
                See how it works
              </Btn>
            </div>
          </div>
        </div>
        <HeroScrollCue />
      </section>

      <section className="border-b border-ge-light bg-white">
        <Container className="py-5 sm:py-6">
          <div className="flex flex-col gap-4 border-l-4 border-ge-accent pl-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
            <div className="min-w-0">
              <Eyebrow>Industry Leadership</Eyebrow>
              <h2 className="mt-2 font-body text-base font-medium leading-snug text-ge-black sm:text-lg">
                GreyEdge CEO Elected to Geothermal Rising Board
              </h2>
              <p className="mt-1 font-body text-sm leading-relaxed text-ge-graphite">
                Matt Garlick will represent the Heat Pumps seat on the Board of Directors.
              </p>
            </div>
            <a
              href={GEOTHERMAL_RISING_ANNOUNCEMENT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 self-start font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ge-black transition-colors hover:text-ge-accent"
              {...gaAttrs('home_geothermal_rising_announcement')}
            >
              Read the announcement
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                <path
                  d="M4 12L12 4M12 4H6.5M12 4V9.5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </Container>
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
                <Btn to="/projects" track="home_projects_view_all" variant="outline" className="shrink-0 self-start">
                  View all projects
                </Btn>
              </div>
              <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                Behind every successful thermal energy project is a series of complex decisions. From site
                conditions and infrastructure constraints to utility integration and long-term performance, The
                GreyEdge Group helps clients navigate each challenge with confidence, delivering practical
                solutions that create lasting value.
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
              <Btn to="/insights" track="home_insights_view_all" variant="outline" className="shrink-0 self-start">
                All insights
              </Btn>
            </div>
          </Reveal>

          <FeaturedConversation />

          <div className="mt-14 grid gap-6 border-t border-ge-light pt-14 md:mt-16 md:grid-cols-3 md:pt-16">
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
                      <span className="font-body text-[10px] text-ge-graphite">{item.readTime}</span>
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

      <GreyEdgeBand />

      <LinkedInFeed />

      <FinalCta />
    </>
  )
}

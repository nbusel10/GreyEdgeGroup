import { Link } from 'react-router-dom'
import { hero, org } from '../content/site'
import { featuredProjects } from '../content/projects'
import { insights } from '../content/insights'
import { site } from '../content/images'
import Challenges from '../components/sections/Challenges'
import CollaborativeAdvantage from '../components/sections/CollaborativeAdvantage'
import Process from '../components/sections/Process'
import Leadership from '../components/sections/Leadership'
import FinalCta from '../components/sections/FinalCta'
import ProjectCard from '../components/ProjectCard'
import GMark from '../components/GMark'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function Home() {
  usePageMeta({
    title: `${org.name} — ${org.tagline}`,
    description:
      'We plan, design and deliver Thermal Energy Networks for developers, campuses and communities. 300+ years of combined experience, one accountable partner from evaluation through expansion.',
  })

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative flex min-h-[640px] items-end overflow-hidden bg-ge-black lg:h-[92vh] lg:min-h-[720px]">
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,23,26,0.78) 0%, rgba(20,23,26,0.32) 26%, rgba(20,23,26,0.6) 58%, rgba(20,23,26,0.94) 100%)',
          }}
        />
        <Container className="relative pb-16 pt-28 md:pb-20">
          <div className="fade-slide-up">
            <div className="flex flex-wrap items-baseline gap-x-4">
              {hero.words.map((w, i) => (
                <span
                  key={w}
                  className={`font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl ${
                    i === hero.words.length - 1 ? 'text-ge-accent' : 'text-white/90'
                  }`}
                >
                  {w}
                </span>
              ))}
            </div>
            <h1
              className="mt-6 max-w-4xl font-display font-bold uppercase leading-[0.94] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.6rem, 7vw, 6.2rem)' }}
            >
              Build the thermal infrastructure your future requires.
            </h1>
            <p className="mt-7 max-w-xl font-body text-base leading-relaxed text-ge-light sm:text-lg">{hero.body}</p>

            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
              {hero.promises.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <GMark className="h-3 w-3 shrink-0 text-ge-accent" />
                  <span className="font-body text-xs uppercase tracking-[0.12em] text-white/85">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Btn to="/contact" variant="light">
                Start planning
              </Btn>
              <Btn to="/geothermal-101" variant="ghost">
                See how it works
              </Btn>
            </div>
          </div>
        </Container>
      </section>

      <Challenges />
      <CollaborativeAdvantage />
      <Process />

      {/* ── Featured projects ── */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Eyebrow>The Proof</Eyebrow>
                <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                  Projects that close.
                </h2>
                <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">
                  Capacity ceilings, subsurface uncertainty, utility delays and mechanical risk. We turn those
                  constraints into infrastructure that scales.
                </p>
              </div>
              <Btn to="/projects" variant="outline" className="shrink-0 self-start">
                View all projects
              </Btn>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
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
                <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
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
                  <div className="h-44 overflow-hidden bg-ge-light">
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

      {/* ── LinkedIn ── */}
      <Section className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 border border-ge-light md:grid-cols-[1.2fr_1fr]">
              <div className="p-8 md:p-12">
                <Eyebrow>Follow Along</Eyebrow>
                <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl">
                  What we&rsquo;re working on now
                </h2>
                <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ge-graphite">
                  Project milestones, industry commentary and the occasional look inside a mechanical room. LinkedIn is
                  where we post first.
                </p>
                <Btn href={org.social.linkedin} variant="solid" className="mt-8">
                  Follow on LinkedIn
                </Btn>
              </div>
              <div className="relative h-64 md:h-full md:min-h-[300px]">
                <img
                  src={site['team-group'].src}
                  alt={site['team-group'].alt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

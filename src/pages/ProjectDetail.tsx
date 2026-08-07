import { Link, Navigate, useParams } from 'react-router-dom'
import { getProject, projects } from '../content/projects'
import GMark from '../components/GMark'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProject(slug) : undefined

  const idx = projects.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1]
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0]

  usePageMeta({
    title: project ? `${project.name} — GreyEdge Projects` : 'Project — The GreyEdge Group',
    description: project?.summary,
    image: project?.image ?? undefined,
  })

  if (!project) return <Navigate to="/projects" replace />

  const stats = [
    { label: 'Square feet', value: project.sqFeet },
    { label: 'Buildings', value: project.buildings },
    { label: 'Completion', value: project.completion },
    { label: 'Location', value: project.location },
  ].filter((s) => s.value)

  return (
    <>
      <section className="relative flex min-h-[520px] items-end overflow-hidden bg-ge-black pt-28">
        {project.image && (
          <img src={project.image} alt={project.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
        )}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,23,26,0.82) 0%, rgba(20,23,26,0.34) 38%, rgba(20,23,26,0.93) 100%)',
          }}
        />
        <Container className="relative pb-14">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-ge-accent-bright"
          >
            <span aria-hidden="true">&larr;</span> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="border border-ge-accent px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent-bright">
              {project.status}
            </span>
            <span className="font-body text-xs uppercase tracking-[0.16em] text-white/70">{project.location}</span>
          </div>
          <h1
            className="mt-4 font-display font-bold uppercase leading-[0.95] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)' }}
          >
            {project.name}
          </h1>
        </Container>
      </section>

      {/* Stat strip */}
      {stats.length > 0 && (
        <div className="border-b border-ge-light bg-white">
          <Container>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 py-10 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel">{s.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ge-black md:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      )}

      <Section className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <Eyebrow>About the project</Eyebrow>
              <p className="mt-6 font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
                {project.summary}
              </p>
              {project.description && (
                <p className="mt-8 font-body text-base leading-relaxed text-ge-graphite">{project.description}</p>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-ge-light bg-white p-8">
                <div className="flex items-center gap-2">
                  <GMark className="h-4 w-4 text-ge-accent" />
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ge-black">
                    The project team
                  </h2>
                </div>
                {/*
                  Team assignments per project aren't in the CMS yet — Nancy flagged this
                  in the review as something to collect before launch.
                */}
                <p className="mt-4 font-body text-sm leading-relaxed text-ge-graphite">
                  Project team details are being compiled. In the meantime, meet the specialists behind our work.
                </p>
                <Btn to="/about#team" variant="outline" className="mt-6 w-full">
                  Meet the team
                </Btn>
              </div>

              {project.articles.length > 0 && (
                <div className="mt-8 border border-ge-light bg-white p-8">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-ge-black">
                    In the press
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {project.articles.map((a) => (
                      <li key={a.url}>
                        <a
                          href={a.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block border-l-2 border-ge-light pl-4 transition-colors hover:border-ge-accent"
                        >
                          <div className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">
                            {a.publisher}
                          </div>
                          <div className="mt-1 font-body text-sm leading-snug text-ge-charcoal transition-colors group-hover:text-ge-black">
                            {a.title}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Prev / next */}
      <Section className="border-t border-ge-light bg-white py-14 md:py-16">
        <Container>
          <div className="grid gap-px bg-ge-light sm:grid-cols-2">
            {[
              { p: prev, dir: 'Previous', align: 'text-left' },
              { p: next, dir: 'Next', align: 'sm:text-right' },
            ].map(({ p, dir, align }) => (
              <Link key={dir} to={`/projects/${p.slug}`} className="group bg-white p-7 transition-colors hover:bg-ge-offwhite">
                <div className={`font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel ${align}`}>{dir}</div>
                <div
                  className={`mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ge-black transition-colors group-hover:text-ge-accent ${align}`}
                >
                  {p.name}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

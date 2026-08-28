import { Link, Navigate, useParams } from 'react-router-dom'
import { getInsight, insights } from '../content/insights'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function InsightDetail() {
  const { slug } = useParams<{ slug: string }>()
  const insight = slug ? getInsight(slug) : undefined

  usePageMeta({
    title: insight ? `${insight.title} — GreyEdge Insights` : 'Insight — The GreyEdge Group',
    description: insight?.summary,
    image: insight?.image ?? undefined,
  })

  // Only slugs with a long-form body get a detail page; others keep deep-linking via `to`.
  if (!insight?.body?.length) {
    if (insight?.to) return <Navigate to={insight.to} replace />
    return <Navigate to="/insights" replace />
  }

  const withBody = insights.filter((i) => i.body?.length)
  const idx = withBody.findIndex((i) => i.slug === insight.slug)
  const prev = idx > 0 ? withBody[idx - 1] : withBody[withBody.length - 1]
  const next = idx < withBody.length - 1 ? withBody[idx + 1] : withBody[0]
  const showNav = withBody.length > 1

  const related = insight.relatedLinks?.length
    ? insight.relatedLinks
    : [{ label: 'Geothermal 101', to: '/geothermal-101' }]

  return (
    <>
      <section className="relative flex min-h-[420px] items-end overflow-hidden bg-ge-black pt-28">
        {insight.image && (
          <img src={insight.image} alt={insight.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
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
            to="/insights"
            className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-ge-accent-bright"
          >
            <span aria-hidden="true">&larr;</span> All insights
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="border border-white/70 px-2.5 py-1 font-body text-[10px] uppercase tracking-[0.18em] text-white">
              {insight.category}
            </span>
            <span className="font-body text-xs uppercase tracking-[0.16em] text-white/70">{insight.readTime}</span>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl">
            {insight.title}
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-light sm:text-lg">{insight.summary}</p>
        </Container>
      </section>

      <Section className="bg-ge-offwhite">
        <Container>
          <div className="mx-auto max-w-3xl">
            {insight.body.map((section, i) => (
              <Reveal key={section.heading ?? `section-${i}`} delay={i * 0.04}>
                <div className={i > 0 ? 'mt-12 md:mt-14' : undefined}>
                  {section.heading && (
                    <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black sm:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((p, pi) => (
                    <p
                      key={`${i}-${pi}`}
                      className={`font-body text-base leading-relaxed text-ge-graphite ${
                        section.heading && pi === 0 ? 'mt-5' : pi > 0 || (i > 0 && !section.heading) ? 'mt-5' : ''
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="mt-14 border-t border-ge-light pt-10">
                <Eyebrow>Go deeper</Eyebrow>
                <p className="mt-4 font-body text-sm leading-relaxed text-ge-graphite">
                  Keep reading, or talk through a specific site with us.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {related.map((link) => (
                    <Btn key={link.to} to={link.to} variant="outline">
                      {link.label}
                    </Btn>
                  ))}
                  <Btn to="/contact" variant="outline">
                    Get in touch
                  </Btn>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {showNav && prev && next && (
        <Section className="border-t border-ge-light bg-white py-14 md:py-16">
          <Container>
            <div className="grid gap-px bg-ge-light sm:grid-cols-2">
              {[
                { p: prev, dir: 'Previous', align: 'text-left' },
                { p: next, dir: 'Next', align: 'sm:text-right' },
              ].map(({ p, dir, align }) => (
                <Link
                  key={dir}
                  to={`/insights/${p.slug}`}
                  className="group bg-white p-7 transition-colors hover:bg-ge-offwhite"
                >
                  <div className={`font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel ${align}`}>{dir}</div>
                  <div
                    className={`mt-2 font-display text-xl font-bold uppercase tracking-wide text-ge-black transition-colors group-hover:text-ge-accent sm:text-2xl ${align}`}
                  >
                    {p.title}
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <FinalCta />
    </>
  )
}

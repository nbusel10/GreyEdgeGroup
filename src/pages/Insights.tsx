import { useState } from 'react'
import { Link } from 'react-router-dom'
import { insightCategories, insights, type InsightCategoryFilter } from '../content/insights'
import { org } from '../content/site'
import { site } from '../content/images'
import PageHero from '../components/PageHero'
import FinalCta from '../components/sections/FinalCta'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function Insights() {
  usePageMeta({
    title: 'Insights — The GreyEdge Group',
    description:
      'Technical education, case studies and policy commentary on thermal energy networks, ambient loops and district-scale decarbonization.',
    image: site.conference.src,
  })

  const [filter, setFilter] = useState<InsightCategoryFilter>('All')
  const shown = filter === 'All' ? insights : insights.filter((i) => i.category === filter)

  return (
    <>
      <PageHero
        eyebrow="The Edge"
        title="Insights"
        lead="What we're learning, what we're seeing in the field, and what we think the industry is getting wrong."
      />

      <Section className="bg-ge-offwhite">
        <Container>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter insights by category">
            {insightCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`border px-5 py-2.5 font-body text-[11px] uppercase tracking-[0.16em] transition-colors ${
                  filter === c
                    ? 'border-ge-black bg-ge-black text-white'
                    : 'border-ge-light bg-white text-ge-graphite hover:border-ge-accent hover:text-ge-accent'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <Reveal className="mt-10">
              <div className="border border-ge-light bg-white p-10 md:p-14">
                <span className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">
                  {filter === 'Case Study' ? 'Case Study' : filter}
                </span>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-ge-black sm:text-3xl">
                  Coming soon
                </h2>
                <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-ge-graphite">
                  {filter === 'Case Study'
                    ? 'Narrative case studies are being written. In the meantime, see built work on Projects.'
                    : 'Nothing in this category yet.'}
                </p>
                {filter === 'Case Study' && (
                  <Btn to="/projects" variant="outline" className="mt-8">
                    View projects
                  </Btn>
                )}
              </div>
            </Reveal>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((item, i) => (
                <Reveal key={item.slug} delay={(i % 3) * 0.06}>
                  <Link
                    to={item.to}
                    className="group flex h-full flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent"
                  >
                    <div className="img-cut h-48 overflow-hidden bg-ge-light">
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
                        <span className="font-body text-[10px] uppercase tracking-[0.12em] text-ge-steel">
                          {item.level}
                        </span>
                      </div>
                      <h2 className="mt-4 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                        {item.title}
                      </h2>
                      <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{item.summary}</p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="rule-grow" />
                        <span className="font-body text-[10px] text-ge-steel">{item.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 border border-ge-light bg-white p-8 md:flex-row md:items-center md:p-10">
              <div>
                <Eyebrow>Follow Along</Eyebrow>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-wide text-ge-black">
                  More on LinkedIn
                </h2>
                <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-ge-graphite">
                  Project milestones and shorter commentary get posted there first.
                </p>
              </div>
              <Btn href={org.social.linkedin} className="shrink-0">
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

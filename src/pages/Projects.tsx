import { projects } from '../content/projects'
import { site } from '../content/images'
import ProjectCard from '../components/ProjectCard'
import PageHero from '../components/PageHero'
import FinalCta from '../components/sections/FinalCta'
import { Container, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function Projects() {
  usePageMeta({
    title: 'Projects — The GreyEdge Group',
    description:
      'Thermal Energy Network projects across mountain towns, campuses and districts — from Aspen and Vail to Colorado Mesa University and Weber State.',
    image: site['global-projects'].src,
  })

  const inProgress = projects.filter((p) => p.status !== 'Completed').length

  return (
    <>
      <PageHero
        eyebrow="The Proof"
        title="Our projects"
        lead="Every development faces constraints: capacity ceilings, subsurface uncertainty, utility delays, mechanical risk. These are the projects where we turned those constraints into infrastructure that scales."
        image={site['global-projects'].src}
        imageAlt={site['global-projects'].alt}
      >
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {[
            { label: 'Projects shown', value: String(projects.length) },
            { label: 'Active or in development', value: String(inProgress) },
            { label: 'States and regions', value: 'CO · UT · East Coast' },
          ].map((s) => (
            <div key={s.label}>
              <dd className="font-display text-3xl font-bold leading-none text-ge-accent">{s.value}</dd>
              <dt className="mt-2 font-body text-[10px] uppercase tracking-[0.18em] text-ge-silver">{s.label}</dt>
            </div>
          ))}
        </dl>
      </PageHero>

      {/*
        No filters for now. With ten projects, Megan and Joe both felt filtering would
        emphasise how few there are rather than help anyone find something.
      */}
      <Section className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07}>
                <ProjectCard project={p} eager={i < 3} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <FinalCta />
    </>
  )
}

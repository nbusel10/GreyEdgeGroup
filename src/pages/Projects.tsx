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
      'Thermal Energy Network projects across mountain towns, campuses and districts, from Aspen and Vail to Colorado Mesa University and Weber State.',
    image: site['global-projects'].src,
  })

  return (
    <>
      <PageHero
        eyebrow="The Proof"
        title="Our projects"
        lead="Every project starts somewhere different - an idea, an existing system, a new development, a growth plan, or a decarbonization goal. Our portfolio reflects the many ways GreyEdge helps turn those starting points into practical, scalable thermal infrastructure."
      />

      {/*
        No filters for now. With ten projects, Megan and Joe both felt filtering would
        emphasise how few there are rather than help anyone find something.
      */}
      <Section className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.07} className="h-full">
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

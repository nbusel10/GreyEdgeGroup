import { Link } from 'react-router-dom'
import { org } from '../content/site'
import PageHero from '../components/PageHero'
import { Container, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function Accessibility() {
  usePageMeta({
    title: 'Accessibility — The GreyEdge Group',
    description:
      'The GreyEdge Group builds greyedgegroup.com to WCAG 2.2 Level AA and welcomes reports of access barriers.',
  })

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Accessibility"
        lead="We build this website to the Web Content Accessibility Guidelines (WCAG) 2.2, Level AA. That is our target. It is not a certification."
      />

      <Section className="bg-ge-offwhite">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-10 font-body text-base leading-relaxed text-ge-graphite">
              <section>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black md:text-3xl">
                  <span className="text-ge-accent" aria-hidden="true">
                    //{' '}
                  </span>
                  What that means here
                </h2>
                <p className="mt-4">
                  Pages are written so they can be reached with a keyboard, read with a screen reader, and resized
                  without losing the content. Form fields have visible labels. Motion eases off when your system asks
                  for reduced motion. We keep text and controls at contrast levels WCAG 2.2 AA calls for.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black md:text-3xl">
                  <span className="text-ge-accent" aria-hidden="true">
                    //{' '}
                  </span>
                  If something blocks you
                </h2>
                <p className="mt-4">
                  Email{' '}
                  <a href={`mailto:${org.email}`} className={proseLinkClass}>
                    {org.email}
                  </a>{' '}
                  and tell us the page, what you were trying to do, and the browser or assistive technology you use. We
                  will reply and work on a fix. You can also reach us through the{' '}
                  <Link to="/contact" className={proseLinkClass}>
                    contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

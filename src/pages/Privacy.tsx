import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { org } from '../content/site'
import PageHero from '../components/PageHero'
import { Container, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

const LAST_UPDATED = 'September 9, 2026'

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: 'who-we-are',
    title: 'Who we are',
    body: (
      <>
        This Privacy Policy describes how {org.name} (“GreyEdge,” “we,” “us,” or “our”) collects, uses, and
        shares information when you visit{' '}
        <a href="https://greyedgegroup.com" className={proseLinkClass}>
          greyedgegroup.com
        </a>
        , contact us, or otherwise interact with our online services. We are thermal utility master planners
        serving clients across {org.region}.
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: (
      <>
        <p>We may collect information you provide directly, including:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Name, email address, phone number, and organization</li>
          <li>Project location and details you share through our contact form or email</li>
          <li>Any other information you choose to send us</li>
        </ul>
        <p className="mt-4">
          When you visit our website, our hosting provider and related infrastructure may automatically
          collect technical data such as IP address, browser type, device information, pages visited, and
          timestamps. We do not use this information to identify you personally unless needed for security
          or abuse prevention.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How we use information',
    body: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Respond to inquiries and provide the services you request</li>
          <li>Operate, maintain, and improve our website</li>
          <li>Communicate about projects, industry updates, or other messages you opt into</li>
          <li>Protect our systems, investigate misuse, and comply with legal obligations</li>
        </ul>
        <p className="mt-4">We do not sell your personal information.</p>
      </>
    ),
  },
  {
    id: 'third-parties',
    title: 'Service providers and third parties',
    body: (
      <>
        <p>
          We may share information with trusted service providers who help us run our website and business
          operations — for example hosting, form delivery, email, and analytics — under agreements that
          limit how they may use that information.
        </p>
        <p className="mt-4">
          Our site may link to or display content from third-party platforms such as LinkedIn, Facebook, or
          X. Those services have their own privacy policies, and we are not responsible for their practices.
          If we retrieve public posts or related content from LinkedIn to display on our site, we do so to
          show our company’s public updates; we do not use that integration to collect personal data from
          site visitors.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies and similar technologies',
    body: (
      <>
        Our website may use cookies or similar technologies that are necessary for the site to function,
        or that help us understand how the site is used. You can control cookies through your browser
        settings. Disabling cookies may affect some site features.
      </>
    ),
  },
  {
    id: 'retention',
    title: 'How long we keep information',
    body: (
      <>
        We retain personal information only as long as needed for the purposes described in this policy,
        including responding to your requests, maintaining business records, and meeting legal or
        operational requirements. When information is no longer needed, we delete or de-identify it where
        reasonably practicable.
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <>
        We take reasonable administrative and technical measures to protect personal information. No method
        of transmission or storage is completely secure, and we cannot guarantee absolute security.
      </>
    ),
  },
  {
    id: 'your-choices',
    title: 'Your choices and rights',
    body: (
      <>
        Depending on where you live, you may have rights to access, correct, delete, or restrict use of
        your personal information, or to object to certain processing. To make a request, contact us at{' '}
        <a href={`mailto:${org.email}`} className={proseLinkClass}>
          {org.email}
        </a>
        . We may need to verify your identity before responding.
      </>
    ),
  },
  {
    id: 'children',
    title: 'Children’s privacy',
    body: (
      <>
        Our website and services are directed to business and professional audiences. We do not knowingly
        collect personal information from children under 13. If you believe a child has provided us
        information, please contact us and we will take appropriate steps to delete it.
      </>
    ),
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: (
      <>
        We may update this Privacy Policy from time to time. When we do, we will revise the “Last updated”
        date at the top of this page. Continued use of the site after changes means you acknowledge the
        updated policy.
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact us',
    body: (
      <>
        Questions about this Privacy Policy or our privacy practices can be sent to{' '}
        <a href={`mailto:${org.email}`} className={proseLinkClass}>
          {org.email}
        </a>
        , or through our{' '}
        <Link to="/contact" className={proseLinkClass}>
          contact page
        </Link>
        .
      </>
    ),
  },
]

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy — The GreyEdge Group',
    description:
      'How The GreyEdge Group collects, uses, and protects information when you visit our website or contact us.',
  })

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lead={`Last updated ${LAST_UPDATED}. This policy explains what information we collect on greyedgegroup.com and how we use it.`}
      />

      <Section className="bg-ge-offwhite">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl space-y-12">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black md:text-3xl">
                    <span className="text-ge-accent" aria-hidden="true">
                      //{' '}
                    </span>
                    {section.title}
                  </h2>
                  <div className="mt-4 font-body text-base leading-relaxed text-ge-graphite">{section.body}</div>
                </section>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

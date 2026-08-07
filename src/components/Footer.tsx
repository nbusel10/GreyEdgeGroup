import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Container } from './ui'
import { org } from '../content/site'

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Approach',
    links: [
      { label: 'The Collaborative Advantage', to: '/approach#advantage' },
      { label: 'Capabilities', to: '/approach#capabilities' },
      { label: 'Our Process', to: '/approach#process' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Thermal Energy Networks', to: '/geothermal-101#networks' },
      { label: 'The Thermal Highway', to: '/geothermal-101#thermal-highway' },
      { label: 'Insights', to: '/insights' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Team', to: '/about#team' },
      { label: 'Industry Leadership', to: '/about#leadership' },
      { label: 'Projects', to: '/projects' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

const socials = [
  { label: 'LinkedIn', href: org.social.linkedin },
  { label: 'Facebook', href: org.social.facebook },
  { label: 'X', href: org.social.twitter },
]

export default function Footer() {
  return (
    <footer className="border-t border-ge-charcoal bg-ge-black">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <Link to="/" className="text-2xl">
              <Logo tone="light" />
            </Link>
            <p className="mt-5 font-body text-xs leading-relaxed text-ge-silver">
              {org.tagline}.
              <br />
              {org.region}.
            </p>
            <a
              href={`mailto:${org.email}`}
              className="mt-5 inline-block font-body text-xs text-ge-light underline decoration-ge-accent decoration-2 underline-offset-4 transition-colors hover:text-ge-accent-bright"
            >
              {org.email}
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <div className="font-body text-[11px] uppercase tracking-[0.24em] text-ge-steel">
                <span className="text-ge-accent" aria-hidden="true">
                  //{' '}
                </span>
                {col.title}
              </div>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-ge-silver transition-colors hover:text-ge-accent-bright"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-ge-charcoal pt-8 md:flex-row md:items-center">
          <p className="font-body text-xs text-ge-steel">
            © {new Date().getFullYear()} {org.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-xs uppercase tracking-[0.16em] text-ge-steel transition-colors hover:text-ge-accent-bright"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

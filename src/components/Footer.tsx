import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Container } from './ui'
import { org } from '../content/site'

const columns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Approach',
    links: [
      { label: 'Built on Experience', to: '/approach#advantage' },
      { label: 'Our Process', to: '/approach#process' },
      { label: 'Our Services', to: '/approach#services' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Geothermal 101', to: '/geothermal-101' },
      { label: 'Thermal Energy Networks', to: '/geothermal-101#networks' },
      { label: 'The Thermal Highway©', to: '/geothermal-101#thermal-highway' },
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
  {
    label: 'LinkedIn',
    href: org.social.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: org.social.facebook,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: org.social.twitter,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.717-8.739L1.254 2.25H8.08l4.261 5.888 5.903-5.888zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    ),
  },
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
            <ul className="mt-4 flex gap-4" aria-label="Social links">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex text-ge-steel transition-colors hover:text-ge-accent-bright"
                  >
                    {s.icon}
                  </a>
                </li>
              ))}
            </ul>
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

        <div className="mt-16 border-t border-ge-charcoal pt-8">
          <p className="font-body text-xs text-ge-steel">
            © {new Date().getFullYear()} {org.name}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

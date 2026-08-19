import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { story, teamIntro, whoWeAre, whyUs } from '../content/about'
import { team, type TeamMember } from '../content/team'
import { projects } from '../content/projects'
import { site } from '../content/images'
import PageHero from '../components/PageHero'
import Leadership from '../components/sections/Leadership'
import FinalCta from '../components/sections/FinalCta'
import { Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

const proseLinkClass =
  'italic text-ge-charcoal underline decoration-ge-light underline-offset-2 transition-colors hover:text-ge-accent hover:decoration-ge-accent'

type ProseLink = { label: string; to: string }

/** Team bios + project pages, longest label first so shorter names don’t steal the match. */
const proseLinks: ProseLink[] = [
  ...team.flatMap((m) => {
    const labels = new Set([m.name, m.name.replace(/’/g, "'"), m.name.replace(/'/g, '’')])
    return [...labels].map((label) => ({ label, to: `/team/${m.slug}` }))
  }),
  ...projects.map((p) => ({ label: p.name, to: `/projects/${p.slug}` })),
].sort((a, b) => b.label.length - a.label.length)

const proseLinkPattern = new RegExp(
  `(${proseLinks
    .map(({ label }) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/['’]/g, "['’]"))
    .join('|')})`,
  'g',
)

const proseLinkByLabel = new Map(proseLinks.map((l) => [l.label, l]))

/** Turn known team / project names in prose into links. */
function linkProseNames(text: string): ReactNode[] {
  const parts = text.split(proseLinkPattern)
  return parts.map((part, i) => {
    const hit = proseLinkByLabel.get(part)
    if (!hit) return part
    return (
      <Link key={`${hit.to}-${i}`} to={hit.to} className={proseLinkClass}>
        {part}
      </Link>
    )
  })
}

export default function About() {
  usePageMeta({
    title: 'About — The GreyEdge Group',
    description:
      'Founded in 2016 as a collective of the thermal energy industry’s most accomplished practitioners. Meet the engineers, modelers, hydrogeologists and researchers behind GreyEdge.',
    image: site['team-photo'].src,
  })

  return (
    <>
      <PageHero
        eyebrow="Who we are"
        title="About Us"
        lead="GreyEdge is a collective of practitioners, not a firm that hired its way into geothermal. The difference shows up in the details of every project."
      />

      {/* Who we are */}
      <Section id="story" className="bg-ge-offwhite">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                {whoWeAre.heading}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
                {whoWeAre.lead}
              </p>
            </Reveal>
            <Reveal delay={0.08} className="self-start lg:self-center">
              <img
                src={whoWeAre.image}
                alt={whoWeAre.imageAlt}
                className="img-cut w-full"
                loading="lazy"
              />
            </Reveal>
          </div>

          <div className="mt-12 grid gap-px bg-ge-light md:grid-cols-3">
            {whoWeAre.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="bg-white">
                <div className="h-full p-8">
                  <span className="text-ge-accent" aria-hidden="true">
                    //
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                    {p.title}
                  </h3>
                  <div className="mt-4 space-y-4 font-body text-sm leading-relaxed text-ge-graphite">
                    {(Array.isArray(p.body) ? p.body : [p.body]).map((para) => (
                      <p key={para.slice(0, 32)}>{linkProseNames(para)}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founding story */}
      <Section className="border-t border-ge-light bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                {story.heading}
              </h2>
              <div className="mt-10">
                <img src={story.image} alt={story.imageAlt} className="img-cut w-full object-cover" loading="lazy" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-6xl font-bold leading-none text-ge-accent">{story.year}</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">{story.title}</h3>
              </div>
              <div className="mt-8 space-y-5 border-l border-ge-light pl-7">
                {story.body.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-ge-graphite">
                    {p}
                  </p>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-ge-accent pl-7">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black">
                  {story.pullQuote}
                </p>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why choose us */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>{whyUs.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                {whyUs.heading}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite">{whyUs.lead}</p>
              {whyUs.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                  {p}
                </p>
              ))}
              <p className="mt-8 font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                {whyUs.closing}
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                {whyUs.pillars.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
                    <span className="font-body text-sm uppercase tracking-[0.1em] text-ge-charcoal">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="self-stretch">
              <img
                src={whyUs.image}
                alt={whyUs.imageAlt}
                className="img-cut h-full w-full object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section id="team" className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <Eyebrow>{teamIntro.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              {teamIntro.heading}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">{teamIntro.lead}</p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {team.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 5) * 0.04}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Leadership />
      <FinalCta />
    </>
  )
}

function TeamCard({ member }: { member: TeamMember }) {
  const contacts = [
    member.website
      ? {
          label: 'Website',
          href: member.website,
          external: true,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" className="h-5 w-5">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9s1.3-6.3 3.8-9z" />
            </svg>
          ),
        }
      : null,
    member.linkedin
      ? {
          label: 'LinkedIn',
          href: member.linkedin,
          external: true,
          icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
        }
      : null,
    member.email
      ? {
          label: 'Email',
          href: `mailto:${member.email}`,
          external: false,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" className="h-5 w-5">
              <rect x="3" y="5" width="18" height="14" rx="1.5" />
              <path d="M3.5 7.5 12 13l8.5-5.5" />
            </svg>
          ),
        }
      : null,
    member.phone
      ? {
          label: 'Phone',
          href: `tel:${member.phone.replace(/[^\d+]/g, '')}`,
          external: false,
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true" className="h-5 w-5">
              <path d="M8.5 4.5h-3A1.5 1.5 0 004 6v1.2c0 7 5.8 12.8 12.8 12.8H18a1.5 1.5 0 001.5-1.5v-3l-3.2-1.6-1.6 1.6a11.2 11.2 0 01-5-5l1.6-1.6L9.7 4.5z" />
            </svg>
          ),
        }
      : null,
  ].filter(Boolean) as {
    label: string
    href: string
    external: boolean
    icon: ReactNode
  }[]

  return (
    <article className="group border border-ge-light bg-white transition-colors hover:border-ge-charcoal">
      <div className="relative aspect-[4/5] overflow-hidden bg-ge-light">
        <Link to={`/team/${member.slug}`} className="absolute inset-0 block" aria-label={`${member.name} profile`}>
          {member.image && (
            <img
              src={member.image}
              alt={member.imageAlt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </Link>

        {contacts.length > 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-end justify-center bg-ge-black/55 px-3 pb-4 opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
            <ul className="flex items-center gap-3">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    aria-label={`${member.name} ${c.label}`}
                    className="inline-flex h-9 w-9 items-center justify-center text-white transition-colors hover:text-ge-accent-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {c.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <Link to={`/team/${member.slug}`} className="block p-4 text-center sm:p-5">
        <div className="font-display text-base font-bold uppercase leading-tight tracking-wide text-ge-black transition-colors group-hover:text-ge-accent sm:text-lg">
          {member.name}
        </div>
        {member.role && (
          <div className="mt-1.5 font-body text-xs leading-snug text-ge-steel">{member.role}</div>
        )}
      </Link>
    </article>
  )
}

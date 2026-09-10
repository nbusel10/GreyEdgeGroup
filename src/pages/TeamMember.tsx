import { Link, Navigate, useParams } from 'react-router-dom'
import { useState, type ReactNode } from 'react'
import { firmLinks } from '../content/firms'
import { getMember, team, type BioSection } from '../content/team'
import { projects } from '../content/projects'
import FinalCta from '../components/sections/FinalCta'
import { Container, Eyebrow, Reveal, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/** Items longer than this read as prose, not bullets (common in Areas of Expertise). */
const PROSE_ITEM_MIN = 160

const contactLinkClass =
  'font-body text-sm text-ge-light underline decoration-ge-accent decoration-2 underline-offset-4 transition-colors hover:text-ge-accent-bright'

type ProseLink = { label: string; href: string; external?: boolean }

/** Firms + project names — longest label first so shorter names don’t steal the match. */
const namedLinks: ProseLink[] = [
  ...firmLinks.map((f) => ({ label: f.label, href: f.href, external: true })),
  ...projects.map((p) => ({ label: p.name, href: `/projects/${p.slug}`, external: false })),
].sort((a, b) => b.label.length - a.label.length)

const namedLinkPattern = new RegExp(
  `(${namedLinks.map(({ label }) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
  'g',
)

const namedLinkByLabel = new Map(namedLinks.map((l) => [l.label, l]))

const urlPattern = /(https?:\/\/[^\s]+)/g

function linkNode(hit: ProseLink, text: string, key: string): ReactNode {
  if (hit.external) {
    return (
      <a key={key} href={hit.href} target="_blank" rel="noopener noreferrer" className={proseLinkClass}>
        {text}
      </a>
    )
  }
  return (
    <Link key={key} to={hit.href} className={proseLinkClass}>
      {text}
    </Link>
  )
}

/** Link firm / project names and bare URLs in bio prose. */
function linkBioProse(text: string): ReactNode[] {
  const namedParts = text.split(namedLinkPattern)
  const out: ReactNode[] = []

  namedParts.forEach((part, i) => {
    const hit = namedLinkByLabel.get(part)
    if (hit) {
      out.push(linkNode(hit, part, `${hit.href}-${i}`))
      return
    }

    const urlParts = part.split(urlPattern)
    urlParts.forEach((chunk, j) => {
      if (!chunk) return
      if (/^https?:\/\//i.test(chunk)) {
        const href = chunk.replace(/[.,;:)]+$/, '')
        const trailing = chunk.slice(href.length)
        out.push(
          <a
            key={`url-${i}-${j}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={proseLinkClass}
          >
            {href}
          </a>,
        )
        if (trailing) out.push(trailing)
      } else {
        out.push(chunk)
      }
    })
  })

  return out
}

function SectionItems({ items }: { items: string[] }) {
  type Block = { kind: 'prose'; text: string } | { kind: 'list'; items: string[] }
  const blocks: Block[] = []

  for (const item of items) {
    if (item.length >= PROSE_ITEM_MIN) {
      blocks.push({ kind: 'prose', text: item })
    } else {
      const last = blocks[blocks.length - 1]
      if (last?.kind === 'list') last.items.push(item)
      else blocks.push({ kind: 'list', items: [item] })
    }
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, i) =>
        block.kind === 'prose' ? (
          <p key={i} className="font-body text-sm leading-relaxed text-ge-graphite">
            {linkBioProse(block.text)}
          </p>
        ) : (
          <ul key={i} className="space-y-1.5">
            {block.items.map((item, j) => (
              <li key={j} className="font-body text-sm leading-relaxed text-ge-graphite">
                {linkBioProse(item)}
              </li>
            ))}
          </ul>
        ),
      )}
    </div>
  )
}

/** Single-panel accordion: one bio section open at a time. */
function BioSectionsAccordion({ sections }: { sections: BioSection[] }) {
  const [openHeading, setOpenHeading] = useState<string | null>(sections[0]?.heading ?? null)

  return (
    <div className="border border-ge-light bg-white">
      {sections.map((s) => {
        const open = openHeading === s.heading
        return (
          <div key={s.heading} className="border-b border-ge-light last:border-b-0">
            <button
              type="button"
              onClick={() => setOpenHeading(open ? null : s.heading)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ge-offwhite/60 md:px-6"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 text-ge-accent" aria-hidden="true">
                  //
                </span>
                <h2 className="font-display text-base font-bold uppercase tracking-wide text-ge-black">
                  {s.heading}
                </h2>
              </span>
              <svg
                className={`h-4 w-4 shrink-0 text-ge-steel transition-transform ${open ? 'rotate-180' : ''}`}
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {open && (
              <div className="fade-slide-up px-5 pb-5 md:px-6 md:pb-6">
                <SectionItems items={s.items} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function TeamMemberPage() {
  const { slug } = useParams<{ slug: string }>()
  const member = slug ? getMember(slug) : undefined

  usePageMeta({
    title: member ? `${member.name} — The GreyEdge Group` : 'Team — The GreyEdge Group',
    description: member ? `${member.name}${member.role ? `, ${member.role}` : ''}. ${member.bio[0] ?? ''}`.slice(0, 300) : undefined,
    image: member?.image ?? undefined,
  })

  if (!member) return <Navigate to="/about#team" replace />

  const idx = team.findIndex((m) => m.slug === member.slug)
  const prev = idx > 0 ? team[idx - 1] : team[team.length - 1]
  const next = idx < team.length - 1 ? team[idx + 1] : team[0]

  return (
    <>
      <section className="relative bg-ge-black pb-16 pt-32 md:pt-40">
        <Container>
          <Link
            to="/about#team"
            className="inline-flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-ge-accent-bright"
          >
            <span aria-hidden="true">&larr;</span> The team
          </Link>

          <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:gap-14">
            <div className="max-w-[280px]">
              {member.image && (
                <img src={member.image} alt={member.imageAlt} className="img-cut aspect-[4/5] w-full object-cover" />
              )}
            </div>
            <div>
              <h1
                className="font-display font-bold uppercase leading-none tracking-tight text-white"
                style={{ fontSize: '65px' }}
              >
                {member.name}
              </h1>
              {member.role && (
                <div className="mt-4 font-display text-xl font-semibold uppercase tracking-wide text-ge-accent">
                  {member.role}
                </div>
              )}
              {member.credentials && (
                <div className="mt-2 font-body text-sm tracking-wide text-ge-silver">{member.credentials}</div>
              )}

              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                {member.email && (
                  <div>
                    <dt className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel">Email</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${member.email}`} className={contactLinkClass}>
                        {member.email}
                      </a>
                    </dd>
                  </div>
                )}
                {member.phone && (
                  <div>
                    <dt className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel">Phone</dt>
                    <dd className="mt-1">
                      <a href={`tel:${member.phone.replace(/[^\d+]/g, '')}`} className={contactLinkClass}>
                        {member.phone}
                      </a>
                    </dd>
                  </div>
                )}
                {member.website && (
                  <div>
                    <dt className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel">Website</dt>
                    <dd className="mt-1">
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={contactLinkClass}
                      >
                        {member.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                      </a>
                    </dd>
                  </div>
                )}
                {member.linkedin && (
                  <div>
                    <dt className="font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel">LinkedIn</dt>
                    <dd className="mt-1">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={contactLinkClass}
                      >
                        View profile
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <Reveal>
              {member.bio.length > 0 && (
                <>
                  <Eyebrow>Background</Eyebrow>
                  <div className="mt-6 space-y-5">
                    {member.bio.map((p, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? 'font-body text-lg leading-relaxed text-ge-charcoal'
                            : 'font-body text-base leading-relaxed text-ge-graphite'
                        }
                      >
                        {linkBioProse(p)}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </Reveal>

            {member.sections.length > 0 && (
              <Reveal delay={0.08}>
                <BioSectionsAccordion key={member.slug} sections={member.sections} />
              </Reveal>
            )}
          </div>
        </Container>
      </Section>

      {/* Prev / next */}
      <section className="relative scroll-mt-20 border-t border-ge-light bg-white py-10 md:py-12">
        <Container>
          <div className="grid gap-px bg-ge-light sm:grid-cols-2">
            {[
              { m: prev, dir: 'Previous', align: 'text-left' },
              { m: next, dir: 'Next', align: 'sm:text-right' },
            ].map(({ m, dir, align }) => (
              <Link
                key={dir}
                to={`/team/${m.slug}`}
                className="group bg-white p-5 transition-colors hover:bg-ge-offwhite md:p-6"
              >
                <div className={`font-body text-[10px] uppercase tracking-[0.2em] text-ge-steel ${align}`}>{dir}</div>
                <div
                  className={`mt-2 font-display text-2xl font-bold uppercase tracking-wide text-ge-black transition-colors group-hover:text-ge-accent ${align}`}
                >
                  {m.name}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  )
}

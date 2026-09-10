import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  aboutHeadline,
  credits,
  detailLinks,
  intro,
  teaserHeadline,
  teaserProof,
  type Credit,
} from '../../content/leadership'
import { linkExternalPhrases } from '../../lib/linkExternalPhrases'
import { linkTeamNames } from '../../lib/linkTeamNames'
import { leadershipHashTarget } from '../../lib/leadershipHash'
import { Btn, Container, Eyebrow, Reveal, Section, proseLinkClass } from '../ui'

type LeadershipVariant = 'full' | 'teaser'

/**
 * Industry Leadership — full credits on About; Home uses a dark-band teaser
 * with a proof strip that deep-links to matching rows on /about#industry-*.
 */
/** Wait for ScrollToTop smooth scroll before listening for unlock input. */
const PIN_UNLOCK_DEFER_MS = 700

const pinnedDetailLinkClass =
  'italic text-white underline decoration-white/50 underline-offset-2 transition-colors hover:decoration-white'

function OrgLabel({ credit, rowLit }: { credit: Credit; rowLit: boolean }) {
  const className = [
    'font-body text-[10px] uppercase tracking-[0.16em]',
    rowLit ? 'text-white/85' : 'text-ge-accent',
    (credit.orgHref || credit.orgTo) &&
      'underline decoration-current underline-offset-4 transition-opacity hover:opacity-80',
  ]
    .filter(Boolean)
    .join(' ')

  if (credit.orgHref) {
    return (
      <a href={credit.orgHref} target="_blank" rel="noopener noreferrer" className={className}>
        {credit.org}
      </a>
    )
  }

  if (credit.orgTo) {
    return (
      <Link to={credit.orgTo} className={className}>
        {credit.org}
      </Link>
    )
  }

  return <span className={className}>{credit.org}</span>
}

export default function Leadership({ variant = 'full' }: { variant?: LeadershipVariant }) {
  const { hash } = useLocation()
  const isFull = variant === 'full'
  const initial = isFull ? leadershipHashTarget(hash) : null
  const [pinnedId, setPinnedId] = useState<string | null>(() => initial)
  const [hoverLocked, setHoverLocked] = useState(() => initial !== null)

  useEffect(() => {
    if (!isFull) return

    const target = leadershipHashTarget(hash)

    setPinnedId(target)

    if (target === null) {
      setHoverLocked(false)
      return
    }

    setHoverLocked(true)

    const unlock = () => setHoverLocked(false)
    let attached = false

    const attachUnlock = () => {
      if (attached) return
      attached = true
      window.addEventListener('mousemove', unlock, { once: true })
      window.addEventListener('pointerdown', unlock, { once: true })
    }

    const deferTimer = window.setTimeout(attachUnlock, PIN_UNLOCK_DEFER_MS)
    window.addEventListener('scrollend', attachUnlock, { once: true })

    return () => {
      window.clearTimeout(deferTimer)
      window.removeEventListener('scrollend', attachUnlock)
      if (attached) {
        window.removeEventListener('mousemove', unlock)
        window.removeEventListener('pointerdown', unlock)
      }
    }
  }, [hash, isFull])

  if (variant === 'teaser') {
    return (
      <Section className="border-t border-ge-charcoal bg-ge-black">
        <Container>
          <Reveal>
            <Eyebrow tone="light">Industry Leadership</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
              {teaserHeadline.lead}{' '}
              <span className="text-ge-accent">{teaserHeadline.accent}</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <ul className="mt-8 flex flex-wrap items-center gap-x-0 gap-y-3">
              {teaserProof.map(({ id, label }, i) => (
                <li key={id} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-4 h-3 w-px bg-white/25 sm:mx-5" aria-hidden="true" />
                  )}
                  <Link
                    to={`/about#${id}`}
                    className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-light transition-colors hover:text-ge-accent"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <Btn to="/about#leadership" variant="light" className="mt-8">
              See industry leadership
            </Btn>
          </Reveal>
        </Container>
      </Section>
    )
  }

  return (
    <Section id="leadership" className="border-t border-ge-light bg-white">
      <Container>
        <Reveal
          id="leadership-head"
          className={`scroll-mt-16 lg:scroll-mt-[4.5rem]${pinnedId ? ' is-visible' : ''}`}
        >
          <Eyebrow>Industry Leadership</Eyebrow>
          <h2 className="mt-5 max-w-3xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
            {aboutHeadline.lead}{' '}
            <span className="text-ge-accent">{aboutHeadline.accent}</span>
          </h2>
          <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">{intro}</p>
        </Reveal>

        <Reveal delay={0.06} className={pinnedId ? 'is-visible' : ''}>
          <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {credits.map((c) => {
              const rowLit = hoverLocked && pinnedId === c.id
              return (
                <li
                  key={c.id}
                  id={c.id}
                  className={`scroll-mt-20 border-b px-5 py-5 transition-colors xl:px-4 ${
                    rowLit
                      ? 'border-ge-accent bg-ge-accent process-pin-glow'
                      : 'border-ge-light'
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3
                      className={`font-display text-lg font-bold uppercase tracking-wide ${
                        rowLit ? 'text-white' : 'text-ge-black'
                      }`}
                    >
                      {c.title}
                    </h3>
                    <OrgLabel credit={c} rowLit={rowLit} />
                  </div>
                  <p
                    className={`mt-2 font-body text-sm leading-relaxed ${
                      rowLit ? 'text-white/90' : 'text-ge-graphite'
                    }`}
                  >
                    {linkExternalPhrases(
                      linkTeamNames(c.detail, rowLit ? pinnedDetailLinkClass : proseLinkClass),
                      [...detailLinks],
                      rowLit ? pinnedDetailLinkClass : proseLinkClass,
                    )}
                  </p>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}

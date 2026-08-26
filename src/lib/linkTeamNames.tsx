import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { team } from '../content/team'
import { proseLinkClass } from '../components/ui'

const teamLinks = [...team]
  .flatMap((m) => {
    const labels = new Set([m.name, m.name.replace(/’/g, "'"), m.name.replace(/'/g, '’')])
    return [...labels].map((label) => ({ label, to: `/team/${m.slug}` }))
  })
  .sort((a, b) => b.label.length - a.label.length)

const teamNamePattern = new RegExp(
  `(${teamLinks
    .map(({ label }) => label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/['’]/g, "['’]"))
    .join('|')})`,
  'g',
)

const teamByName = new Map(teamLinks.map((l) => [l.label, l]))

/** Turn team member names in prose into /team/:slug links. */
export function linkTeamNames(text: string): ReactNode[] {
  const parts = text.split(teamNamePattern)
  return parts.map((part, i) => {
    const hit = teamByName.get(part)
    if (!hit) return part
    return (
      <Link key={`${hit.to}-${i}`} to={hit.to} className={proseLinkClass}>
        {part}
      </Link>
    )
  })
}

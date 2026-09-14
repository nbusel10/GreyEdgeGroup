import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { proseLinkClass } from '../components/ui'
import { phrasesPattern } from './phrasePattern'

export type InternalPhrase = { label: string; to: string }

/** Link known in-site phrases in string fragments left by another prose linker. */
export function linkInternalPhrases(
  nodes: ReactNode[],
  phrases: InternalPhrase[],
  className = proseLinkClass,
): ReactNode[] {
  if (phrases.length === 0) return nodes

  const sorted = [...phrases].sort((a, b) => b.label.length - a.label.length)
  const byLabel = new Map(sorted.map((p) => [p.label, p]))
  const pattern = phrasesPattern(sorted.map((p) => p.label))

  return nodes.flatMap((node, n) => {
    if (typeof node !== 'string') return node
    return node.split(pattern).map((part, i) => {
      const hit = byLabel.get(part)
      if (!hit) return part
      return (
        <Link key={`${hit.to}-${n}-${i}`} to={hit.to} className={className}>
          {part}
        </Link>
      )
    })
  })
}

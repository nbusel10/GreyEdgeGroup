import { credits } from '../content/leadership'

/** Resolve a #industry-* hash to a leadership credit row id. */
export function leadershipHashTarget(hash: string): string | null {
  const id = hash.slice(1)
  if (!id.startsWith('industry-')) return null
  return credits.some((c) => c.id === id) ? id : null
}

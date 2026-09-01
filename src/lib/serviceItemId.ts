import { serviceGroups } from '../content/advantage'

/** Stable anchor id for a service list item within its group card. */
export function serviceItemId(groupId: string, itemLabel: string): string {
  const slug = itemLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${groupId}-${slug}`
}

export type ServiceHashTarget =
  | { kind: 'card'; cardIndex: number }
  | { kind: 'item'; cardIndex: number; itemId: string }

/** Resolve a #services hash to a card or list-item target. */
export function serviceHashTarget(hash: string): ServiceHashTarget | null {
  const id = hash.slice(1)
  if (!id) return null

  const cardIndex = serviceGroups.findIndex((g) => g.id === id)
  if (cardIndex >= 0) return { kind: 'card', cardIndex }

  for (let i = 0; i < serviceGroups.length; i++) {
    const g = serviceGroups[i]
    for (const item of g.items) {
      const itemId = serviceItemId(g.id, item)
      if (itemId === id) return { kind: 'item', cardIndex: i, itemId }
    }
  }

  return null
}

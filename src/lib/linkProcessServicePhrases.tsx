import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { serviceItemId } from './serviceItemId'

type ServicePhrase = {
  phrase: string
  itemId: string
}

/** Longest phrases first so partial overlaps resolve predictably. */
const servicePhrases: ServicePhrase[] = [
  {
    phrase: 'integrate geothermal resources',
    itemId: serviceItemId('service-design', 'Ambient Temperature Loop System Design'),
  },
  {
    phrase: 'evaluating existing systems',
    itemId: serviceItemId('service-refine', 'System Commissioning'),
  },
  {
    phrase: 'governance discussions',
    itemId: serviceItemId('service-define', 'Governance Structure Facilitations'),
  },
  {
    phrase: 'technology assessment',
    itemId: serviceItemId('service-define', 'Best Technology Assessment'),
  },
  {
    phrase: 'technology planning',
    itemId: serviceItemId('service-guide', 'Technology Upgrade Planning'),
  },
  {
    phrase: 'building systems',
    itemId: serviceItemId('service-design', 'HVAC System Design'),
  },
  {
    phrase: 'energy modeling',
    itemId: serviceItemId('service-assess', 'Energy Modeling'),
  },
]

const servicePhrasePattern = new RegExp(
  `(${servicePhrases
    .map(({ phrase }) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|')})`,
  'gi',
)

const phraseByLower = new Map(servicePhrases.map((p) => [p.phrase.toLowerCase(), p]))

/** Turn process description service phrases into item-level #service-* hash links. */
export function linkProcessServicePhrases(text: string, linkClassName: string): ReactNode[] {
  const parts = text.split(servicePhrasePattern)
  return parts.map((part, i) => {
    const hit = phraseByLower.get(part.toLowerCase())
    if (!hit) return part
    return (
      <Link key={`${hit.itemId}-${i}`} to={`#${hit.itemId}`} className={linkClassName}>
        {part}
      </Link>
    )
  })
}

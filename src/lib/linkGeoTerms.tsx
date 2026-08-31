import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { proseLinkClass } from '../components/ui'

type GeoTerm = {
  label: string
  to: string
  /** Concept id for first-occurrence tracking (distinct even when `to` is shared). */
  id: string
}

/**
 * Geothermal 101 section anchors. Longest labels first so
 * "ambient temperature loop" wins over "ambient loop", etc.
 */
const geoTerms: GeoTerm[] = [
  { label: 'Ambient Temperature Loops', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'ambient temperature loops', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'Ambient Temperature Loop', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'ambient temperature loop', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'Thermal Energy Networks', to: '/geothermal-101#networks', id: 'ten' },
  { label: 'thermal energy networks', to: '/geothermal-101#networks', id: 'ten' },
  { label: 'Thermal Energy Network', to: '/geothermal-101#networks', id: 'ten' },
  { label: 'thermal energy network', to: '/geothermal-101#networks', id: 'ten' },
  { label: 'Thermal Highway©', to: '/geothermal-101#thermal-highway', id: 'thermal-highway' },
  { label: 'Thermal Highway®', to: '/geothermal-101#thermal-highway', id: 'thermal-highway' },
  { label: 'Thermal Highway', to: '/geothermal-101#thermal-highway', id: 'thermal-highway' },
  { label: 'thermal highway', to: '/geothermal-101#thermal-highway', id: 'thermal-highway' },
  { label: 'thermal resources', to: '/geothermal-101#thermal-resources', id: 'thermal-resources' },
  { label: 'load diversity', to: '/geothermal-101#networks', id: 'load-diversity' },
  { label: 'geo-exchange', to: '/geothermal-101#thermal-resources', id: 'geoexchange' },
  { label: 'Geo-exchange', to: '/geothermal-101#thermal-resources', id: 'geoexchange' },
  { label: 'geoexchange', to: '/geothermal-101#thermal-resources', id: 'geoexchange' },
  { label: 'Geoexchange', to: '/geothermal-101#thermal-resources', id: 'geoexchange' },
  { label: 'ambient loops', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'ambient loop', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'ATLs', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'ATL', to: '/geothermal-101#ambient-loops', id: 'atl' },
  { label: 'TENs', to: '/geothermal-101#networks', id: 'ten' },
  { label: 'TEN', to: '/geothermal-101#networks', id: 'ten' },
]

const geoTermPattern = new RegExp(
  `(${geoTerms
    .map(({ label }) => {
      const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      // Short acronyms need word boundaries so UTEN / ATLAS do not match.
      if (/^[A-Z]{2,5}s?$/.test(label)) return `\\b${escaped}\\b`
      return escaped
    })
    .join('|')})`,
  'g',
)

const termByLabel = new Map(geoTerms.map((t) => [t.label, t]))

/**
 * Turn Geothermal 101 glossary terms in prose into deep links.
 * Pass a shared `seen` Set across paragraphs to link each concept once per page.
 */
export function linkGeoTerms(text: string, seen?: Set<string>): ReactNode[] {
  const parts = text.split(geoTermPattern)
  return parts.map((part, i) => {
    const hit = termByLabel.get(part)
    if (!hit) return part
    if (seen) {
      if (seen.has(hit.id)) return part
      seen.add(hit.id)
    }
    return (
      <Link key={`${hit.id}-${i}`} to={hit.to} className={proseLinkClass}>
        {part}
      </Link>
    )
  })
}

/** Apply geo-term linking to string fragments left by another prose linker (e.g. team names). */
export function linkGeoTermsInNodes(nodes: ReactNode[], seen?: Set<string>): ReactNode[] {
  return nodes.flatMap((node) => (typeof node === 'string' ? linkGeoTerms(node, seen) : node))
}

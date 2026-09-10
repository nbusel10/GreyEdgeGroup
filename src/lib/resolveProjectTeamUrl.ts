import type { ProjectTeamMember } from '../content/projects'
import { firmLinks } from '../content/firms'
import { escapeRegExp, isShortAcronym } from './phrasePattern'

/**
 * Fallback URLs for project partners when the import did not capture a link.
 * Prefer official sites; LinkedIn when no public site exists.
 */
const partnerUrlByName: Record<string, string> = {
  'Steamboat Springs Redevelopment Authority (SSRA)':
    'https://www.steamboatsprings.net/391/Urban-Renewal-Authority',
  'Landmark Consultants': 'https://www.landmark-co.com/',
  'Cairn Global': 'https://cairnglobal.com/',
  'Steamboat Engineering and Design': 'https://www.seadinc.com/',
}

const firmByLabel = [...firmLinks]
  .sort((a, b) => b.label.length - a.label.length)
  .map((f) => [f.label.toLowerCase(), f.href] as const)

function nameMatchesFirm(nameLower: string, label: string): boolean {
  if (isShortAcronym(label)) {
    return new RegExp(`\\b${escapeRegExp(label)}\\b`).test(nameLower)
  }
  return nameLower.includes(label)
}

export function resolveProjectTeamUrl(member: ProjectTeamMember): string | undefined {
  if (member.url) return member.url

  const direct = partnerUrlByName[member.name]
  if (direct) return direct

  const lower = member.name.toLowerCase()
  for (const [label, href] of firmByLabel) {
    if (nameMatchesFirm(lower, label)) return href
  }

  return undefined
}

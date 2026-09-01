import { phases } from '../content/process'
import type { Project } from '../content/projects'

const phaseRank = new Map(phases.map((p, i) => [p.id, i]))

export function sortProjectsForListing(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const phaseDiff = (phaseRank.get(b.phase) ?? 0) - (phaseRank.get(a.phase) ?? 0)
    if (phaseDiff !== 0) return phaseDiff
    return a.name.localeCompare(b.name)
  })
}

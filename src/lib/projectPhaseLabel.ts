import { phases } from '../content/process'
import type { ProjectPhase } from '../content/projects'

/** Display label for project badges — same on listing cards and detail heroes. */
export function getProjectPhaseLabel(phase: ProjectPhase): string {
  return phases.find((p) => p.id === phase)?.title ?? phase
}

/** Short all-caps acronyms need word boundaries so MIT does not match MITTEN. */
export function isShortAcronym(label: string): boolean {
  return /^[A-Za-z0-9]{2,5}$/.test(label)
}

export function escapeRegExp(label: string): string {
  return label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function phraseAlt(label: string): string {
  const escaped = escapeRegExp(label)
  return isShortAcronym(label) ? `\\b${escaped}\\b` : escaped
}

export function phrasesPattern(labels: string[]): RegExp {
  const parts = [...labels].sort((a, b) => b.length - a.length).map(phraseAlt)
  return new RegExp(`(${parts.join('|')})`, 'g')
}

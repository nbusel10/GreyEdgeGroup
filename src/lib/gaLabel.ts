/**
 * Stable click labels for GA4. GTM can read `data-ga-label` as an element attribute
 * and send it as an event parameter. Labels are lowercase snake_case and stay within
 * GA4's 100-character parameter limit.
 */
export function gaLabel(...parts: Array<string | number>): string {
  const raw = parts
    .join(' ')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
  return raw.slice(0, 100).replace(/_+$/g, '')
}

export function gaAttrs(label: string): { 'data-ga-label': string } {
  return { 'data-ga-label': label }
}

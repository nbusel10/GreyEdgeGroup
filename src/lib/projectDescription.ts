/** Split project copy at the thermal-assets section when stored as one string. */
export function projectDescriptionParts(description: string | string[]): string[] {
  if (Array.isArray(description)) return description

  const match = description.match(/^(.*?)\.\s+(Thermal assets\b[\s\S]*)$/i)
  if (match) return [`${match[1]}.`, match[2]]

  return [description]
}

/** Firms / orgs named in team bios — linked in prose like project-team partners. */
export interface FirmLink {
  label: string
  href: string
}

/**
 * Longest labels should win when sorting for matchers.
 * Only include names with a known public site; skip dissolved / unlisted practices.
 */
export const firmLinks: FirmLink[] = [
  // Member / affiliate companies
  { label: 'Sound Geothermal Corporation', href: 'https://www.soundgt.com/' },
  { label: 'Sound Geothermal', href: 'https://www.soundgt.com/' },
  { label: 'Melink Solar & Geo', href: 'https://www.melinksolar.com/' },
  { label: 'Melink Zero', href: 'https://www.melinkzero.com/' },
  { label: 'Genesys NZE', href: 'https://genesysgeo.com/' },

  // Manufacturers & past employers
  { label: 'Westinghouse Electric Corporation', href: 'https://westinghousenuclear.com/' },
  { label: 'Dowell Schlumberger', href: 'https://www.slb.com/' },
  { label: 'ASRC Energy Services', href: 'https://www.asrcenergy.com/' },
  { label: 'WaterFurnace', href: 'https://www.waterfurnace.com/' },
  { label: 'ClimateMaster', href: 'https://www.climatemaster.com/' },
  { label: 'Carrier Corp', href: 'https://www.carrier.com/' },
  { label: 'Plug Power', href: 'https://www.plugpower.com/' },
  { label: 'WFI', href: 'https://www.waterfurnace.com/' },

  // Industry orgs named as boards / employers / partners
  { label: 'International Ground Source Heat Pump Association', href: 'https://igshpa.org/' },
  { label: 'International District Energy Association', href: 'https://www.districtenergy.org/' },
  { label: 'Electric & Gas Industries Association', href: 'https://egia.org/' },
  { label: 'Solar Energy International', href: 'https://www.solarenergy.org/' },
  { label: 'Run on Climate', href: 'https://runonclimate.org/' },
  { label: 'IGSHPA', href: 'https://igshpa.org/' },
  { label: 'EGIA', href: 'https://egia.org/' },
  { label: 'HEET', href: 'https://www.heet.org/' },
]

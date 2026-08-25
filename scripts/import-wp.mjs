/**
 * One-time content importer: WordPress -> typed TS + local images.
 *
 * Pulls projects, team members and media from the WordPress REST API, scrapes the
 * stats and bio copy that Elementor keeps out of the REST payload, downloads every
 * image into public/images, and writes src/content/{projects,team}.ts.
 *
 * Safe to re-run: it overwrites the generated files and skips images already on disk.
 *   pnpm import:wp            re-use cached images
 *   pnpm import:wp --force    re-download everything
 *
 * Corrections that came out of the Aug 5 review live in the OVERRIDES block below so
 * they survive a re-run rather than being silently reverted by WordPress.
 */
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { parse } from 'node-html-parser'

const BASE = 'https://thegreyedge.buselmeier.com'
const FORCE = process.argv.includes('--force')

const IMG_DIR = 'public/images'
const CONTENT_DIR = 'src/content'

// ── Corrections from the Aug 5 website review ──────────────────────────────────
// Megan asked for her title to match her business card.
//
// The rest of these people have no title anywhere on the WordPress site. Each value
// below is a descriptor taken from that person's own bio copy, not an invented job
// title — they still need Matt's confirmation before launch.
const ROLE_OVERRIDES = {
  'bill-odonnell': 'Engineering',
  'megan-lim': 'Marketing and Business Development',
  'garen-ewbank': 'Ground Loop and Drilling Specialist',
  'stephen-hamstra': 'Thermal Energy Systems Specialist',
  'john-mclennan': 'Subsurface and Geoscience Advisor',
  'mark-smith': 'Geoexchange Design and Installation',
  'garry-sexton': 'Renewable Energy Engineering and Design',
  'roshan-revankar': 'Geothermal Design and Energy Modeling',
  'ian-talbot': 'Engineer in Training - EIT',
  'delaini-moss-marriott': 'Marketing and Creative',
}

// Matt selected these three as the homepage features.
const FEATURED = ['aspen', 'vail', 'steamboat-springs']

// Founders / board flag (used on homepage leadership callouts).
const LEADERSHIP = [
  'matthew-garlick',
  'richard-b-white',
  'cary-smith',
  'bill-odonnell',
  'garen-ewbank',
  'stephen-hamstra',
  'paul-bony',
]

/** Grid order from the legacy Our Team page (5-across). */
const TEAM_ORDER = [
  'matthew-garlick',
  'richard-b-white',
  'cary-smith',
  'paul-bony',
  'garen-ewbank',
  'stephen-hamstra',
  'john-mclennan',
  'bill-odonnell',
  'roshan-revankar',
  'garry-sexton',
  'mark-smith',
  'jaiden-marriott',
  'megan-lim',
  'delaini-moss-marriott',
  'ian-talbot',
]

// Site photography worth keeping, mapped to stable local names so the React code
// isn't littered with WordPress upload paths and date folders.
const SITE_IMAGES = {
  'hero-ski-town': '2026/06/skiTownMainStreet-1.webp',
  'hero-district': '2026/05/greyedge-hero-1-scaled.webp',
  'hero-mountain': '2026/05/district-scale-teams-moving-the-needle-mountain-town-scaled.webp',
  'hero-cityscape': '2026/06/cityScape-scaled.webp',
  'design-session': '2026/06/the-greyedge-group-working-on-technical-ten-design-scaled.webp',
  'design-session-alt': '2025/12/greyedge-district-system-ten-design-session.webp',
  'design-meeting': '2026/05/greyedge-team-design-meeting.webp',
  'team-photo': '2026/05/greyEdge-TeamPhoto.webp',
  'team-group': '2026/04/greyedge-group-our-team-engineers-experts.webp',
  'onsite-work': '2026/05/greyedge-onsite-geothermal-project-work.webp',
  'planning-ten': '2026/06/greyedge-planning-ten.webp',
  'panel-discussion': '2026/04/greyedge-group-at-work-panel-discussion.webp',
  'conference': '2026/05/greyedge-ten-conference.webp',
  puzzle: '2026/06/greyedge-solving-the-puzzle.webp',
  'campus-build': '2026/06/greyEdge-TEN-Build-Campus.webp',
  blueprints: '2026/05/TGEG-engineering-blueprints-concept-to-execution-scaled.webp',
  'mechanical-room': '2026/05/tgeg-integrated-engineering-operational-readiness-scaled.webp',
  'network-diagram': '2026/04/tgeg-integrated-geothermal-network-diagram.webp',
  'global-projects': '2026/06/greyedgegroup-projects-around-the-world.webp',
  contact: '2026/05/contact-greyedge-scaled.webp',
  'decarbonization': '2026/05/tgeg-decarbonization-compliance-urban-skyline-clean-air-scaled.webp',
  electrification: '2026/05/tgeg-electrification-grid-demand-urban-district-pathway-scaled.webp',
  infrastructure: '2026/05/tgeg-infrastructure-grid-constraints-urban-district-existing-capacity-scaled.webp',
  'lifecycle-cost': '2026/05/tgeg-capital-lifecycle-cost-sustainable-campus-infrastructure-scaled.webp',
  'growth-flexibility': '2026/05/TGEG_Long-Term_Growth_and_Flexibility_Cityscape-scaled.webp',
}

/** A few media items have no alt text in WordPress. Descriptions for those. */
const ALT_FALLBACKS = {
  'hero-district': 'Engineers reviewing a district thermal energy system in a mechanical plant room',
  'hero-cityscape': 'Dense urban skyline served by district-scale thermal infrastructure',
  'global-projects': 'Map of GreyEdge thermal energy network projects across the world',
  'edge-only-white': 'The GreyEdge edge mark',
}

/** Prefer these over WordPress alt_text so local corrections survive `pnpm import:wp`. */
const ALT_OVERRIDES = {
  'team-photo':
    'About ten GreyEdge Group team members standing together indoors in business casual attire for a group portrait.',
}

const BRAND_IMAGES = {
  'logo-white': '2025/12/greyEdge-Logo-White.webp',
  'logo-dark': '2026/05/greyedge-group-logo-darkGrey-transparent.webp',
  'edge-only-white': '2026/05/EdgeOnly-white-1.webp',
  favicon: '2026/05/greyEdge-favicon2.webp',
}

const PUBLISHERS = {
  'bigpivots.com': 'Big Pivots',
  'www.aspendailynews.com': 'Aspen Daily News',
  'www.aspentimes.com': 'The Aspen Times',
  'aspendailynews.com': 'Aspen Daily News',
  'aspentimes.com': 'The Aspen Times',
  'www.vaildaily.com': 'Vail Daily',
  'vaildaily.com': 'Vail Daily',
  'steamboatpilot.com': 'Steamboat Pilot & Today',
  'www.steamboatpilot.com': 'Steamboat Pilot & Today',
  'www.summitdaily.com': 'Summit Daily',
  'summitdaily.com': 'Summit Daily',
  'www.parkrecord.com': 'Park Record',
  'parkrecord.com': 'Park Record',
  'www.kpcw.org': 'KPCW',
  'kpcw.org': 'KPCW',
  'coloradosun.com': 'The Colorado Sun',
  'www.coloradosun.com': 'The Colorado Sun',
  'www.linkedin.com': 'LinkedIn',
}

const warnings = []
const warn = (m) => {
  warnings.push(m)
  console.log(`  ! ${m}`)
}

// ── helpers ───────────────────────────────────────────────────────────────────

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

async function getJSON(path) {
  const res = await fetch(`${BASE}/wp-json/wp/v2/${path}`)
  if (!res.ok) throw new Error(`REST ${path} -> ${res.status}`)
  return res.json()
}

async function getDOM(url) {
  const res = await fetch(url)
  if (!res.ok) {
    warn(`fetch failed ${url} -> ${res.status}`)
    return null
  }
  const dom = parse(await res.text())
  dom.querySelectorAll('script,style,noscript').forEach((n) => n.remove())
  return dom
}

/** Strip the -1024x220 / -scaled suffixes so we grab the original upload. */
function fullSize(url) {
  return url.replace(/-\d+x\d+(?=\.[a-z]+$)/i, '')
}

async function download(url, destDir, baseName) {
  const ext = extname(new URL(url).pathname) || '.webp'
  const rel = `${destDir}/${baseName}${ext}`
  const abs = join(IMG_DIR, rel)
  if (!FORCE && (await exists(abs))) return `/images/${rel}`

  const res = await fetch(url)
  if (!res.ok) {
    warn(`image failed ${url} -> ${res.status}`)
    return null
  }
  await mkdir(join(IMG_DIR, destDir), { recursive: true })
  await writeFile(abs, Buffer.from(await res.arrayBuffer()))
  console.log(`  + ${rel}`)
  return `/images/${rel}`
}

const clean = (s) =>
  (s || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const decode = (s) =>
  clean(s)
    .replace(/&#8217;|&#039;|&#39;/g, '\u2019')
    .replace(/&#8216;/g, '\u2018')
    .replace(/&#8220;/g, '\u201c')
    .replace(/&#8221;/g, '\u201d')
    .replace(/&#8211;/g, '\u2013')
    .replace(/&#8212;/g, '\u2014')
    .replace(/&#160;|&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/<[^>]+>/g, '')
    .trim()

const ts = (v) => JSON.stringify(v, null, 2).replace(/"([A-Za-z_][A-Za-z0-9_]*)":/g, '$1:')

function titleFromUrl(url) {
  try {
    const u = new URL(url)
    const seg = u.pathname.split('/').filter(Boolean).pop() || u.hostname
    return seg
      .replace(/\.(html?|php)$/, '')
      .replace(/^article_[a-f0-9-]+$/i, '')
      .replace(/-[a-f0-9]{8}-[a-f0-9]{4}.*$/i, '')
      .split('-')
      .filter((w) => w && !/^\d+$/.test(w))
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
      .trim()
  } catch {
    return url
  }
}

const publisher = (url) => {
  try {
    return PUBLISHERS[new URL(url).hostname] || new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return 'Article'
  }
}

// ── media index ───────────────────────────────────────────────────────────────

async function loadMedia() {
  const all = []
  for (let page = 1; page <= 6; page++) {
    const batch = await getJSON(`media?per_page=100&page=${page}&_fields=id,source_url,alt_text`)
    all.push(...batch)
    if (batch.length < 100) break
  }
  console.log(`Media library: ${all.length} items`)
  return all
}

const byId = (media, id) => media.find((m) => m.id === id)
const byPath = (media, tail) => media.find((m) => m.source_url.endsWith(tail))

// ── projects ──────────────────────────────────────────────────────────────────

/** The stat labels used on project pages, in the order the theme renders them. */
const PROJECT_LABELS = [
  'Sq. Feet:',
  '# of Buildings:',
  'Completion Year:',
  'The Project Team:',
  'About the Project:',
  'Related Articles:',
]

/**
 * Stats live in a run of sibling <h2> elements shaped as label, value, label, value.
 * Walk the ordered headings and read the text after each known label.
 *
 * Some projects (Park City, Breckenridge) have labels with no value, so the heading
 * after the label is the *next label*. Guard against that or the stats shift by one.
 */
function scrapeProject(dom) {
  const heads = dom.querySelectorAll('h1,h2,h3').map((h) => clean(h.text))
  const isLabel = (t) => PROJECT_LABELS.some((l) => t.toLowerCase().startsWith(l.toLowerCase()))

  const after = (label) => {
    const i = heads.findIndex((t) => t.toLowerCase().startsWith(label.toLowerCase()))
    if (i === -1) return null
    // Some themes render "Label: value" in one node, others split across two.
    const inline = heads[i].slice(label.length).replace(/^[:\s]+/, '')
    if (inline) return inline
    const next = heads[i + 1]
    if (!next || isLabel(next)) return null
    return next
  }

  const locality = heads.slice(2, 8).filter((t) => /,$/.test(t))[0]
  const localityIdx = heads.indexOf(locality)
  const region = localityIdx > -1 ? heads[localityIdx + 1] : null
  const country = localityIdx > -1 ? heads[localityIdx + 2] : null

  // Team partners live in the heading after "The Project Team:" as a mix of links and plain text.
  const team = scrapeProjectTeam(dom)
  const teamUrls = new Set(
    team.map((m) => m.url).filter((u) => u && /^https?:/i.test(u)).map((u) => u.replace(/\s+$/, '')),
  )

  const articles = [
    ...new Set(
      dom
        .querySelectorAll('a')
        .map((a) => a.getAttribute('href'))
        .filter(
          (h) =>
            h &&
            h.startsWith('http') &&
            !h.includes('buselmeier') &&
            !/linkedin|facebook|twitter|x\.com|instagram|greyedgegroup\.com/i.test(h) &&
            !teamUrls.has(h.replace(/\s+$/, '')),
        ),
    ),
  ]

  return {
    city: locality ? locality.replace(/,$/, '') : null,
    region,
    country: country && /states|canada/i.test(country) ? country : null,
    sqFeet: after('Sq. Feet:'),
    buildings: after('# of Buildings:'),
    completion: after('Completion Year:'),
    description: after('About the Project:'),
    team,
    articles: articles.map((url) => ({
      title: titleFromUrl(url.trim()),
      publisher: publisher(url.trim()),
      url: url.trim(),
    })),
  }
}

/**
 * Parse "Name, Name, Name" from the Project Team value heading, preserving optional hrefs.
 * GreyEdge's own home URL on the WP site becomes "/" for the React app.
 */
function scrapeProjectTeam(dom) {
  const heads = dom.querySelectorAll('h1,h2,h3')
  const labelIdx = heads.findIndex((h) =>
    clean(h.text).toLowerCase().startsWith('the project team:'),
  )
  if (labelIdx === -1) return []
  const valueEl = heads[labelIdx + 1]
  if (!valueEl) return []
  // Skip if the next heading is another label (empty team).
  if (PROJECT_LABELS.some((l) => clean(valueEl.text).toLowerCase().startsWith(l.toLowerCase()))) {
    return []
  }

  const members = []
  const push = (name, url) => {
    const n = decode(name).replace(/\s+/g, ' ').trim().replace(/^,\s*|,\s*$/g, '')
    if (!n) return
    const entry = { name: n }
    if (url) {
      const href = url.trim()
      if (/buselmeier\.com\/?$/i.test(href) || href === BASE || href === `${BASE}/`) {
        entry.url = '/'
      } else if (/^https?:/i.test(href)) {
        entry.url = href
      }
    }
    members.push(entry)
  }

  const walk = (node) => {
    if (node.nodeType === 3) {
      // Text nodes may hold multiple comma-separated unlinked names.
      for (const part of node.text.split(',')) push(part)
      return
    }
    if (node.tagName === 'A') {
      push(node.text, node.getAttribute('href'))
      return
    }
    for (const child of node.childNodes || []) walk(child)
  }
  walk(valueEl)
  return members
}

function deriveStatus(completion) {
  if (!completion) return 'In Development'
  if (/operational/i.test(completion)) return 'Operational'
  if (/progress/i.test(completion)) return 'In Progress'
  if (/development|planning|feasibility/i.test(completion)) return 'In Development'
  if (/^\s*\d{4}\s*$/.test(completion)) return 'Completed'
  return 'In Progress'
}

async function importProjects(media) {
  console.log('\nProjects')
  const raw = await getJSON('project?per_page=100&_fields=id,slug,title,excerpt,featured_media')
  const out = []

  for (const p of raw) {
    const slug = p.slug.replace(/-\d+$/, '') // "park-city-2" -> "park-city"
    const dom = await getDOM(`${BASE}/projects/${p.slug}/`)
    const s = dom ? scrapeProject(dom) : {}

    const m = byId(media, p.featured_media)
    let image = null
    let imageAlt = ''
    if (m) {
      image = await download(fullSize(m.source_url), 'projects', slug)
      imageAlt = decode(m.alt_text) || `${decode(p.title.rendered)} project`
    } else {
      warn(`no featured image for project "${p.slug}"`)
    }

    const location = [s.city, s.region].filter(Boolean).join(', ')
    if (!s.sqFeet) warn(`project "${slug}" is missing Sq. Feet`)
    if (!s.buildings) warn(`project "${slug}" is missing # of Buildings`)

    out.push({
      slug,
      name: decode(p.title.rendered),
      location: location || 'United States',
      country: s.country || 'United States',
      sqFeet: s.sqFeet || null,
      buildings: s.buildings || null,
      completion: s.completion || null,
      status: deriveStatus(s.completion),
      summary: decode(p.excerpt?.rendered),
      description: s.description ? decode(s.description) : '',
      team: s.team || [],
      articles: s.articles || [],
      image,
      imageAlt,
      featured: FEATURED.includes(slug),
    })
    console.log(`  · ${slug}  ${s.sqFeet || '—'} sq ft, ${s.buildings || '—'} bldgs, ${s.completion || '—'}`)
  }

  // Featured first, in the order Matt picked; everything else after.
  out.sort((a, b) => {
    const ai = FEATURED.indexOf(a.slug)
    const bi = FEATURED.indexOf(b.slug)
    if (ai !== -1 || bi !== -1) return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    return a.name.localeCompare(b.name)
  })
  return out
}

// ── team ──────────────────────────────────────────────────────────────────────

/** Footer CTA and chrome that appears on every page. */
const BOILERPLATE =
  /^©|explore below|let.s engineer|whether you.re advancing|^home$|^about|^our team$|^contact$|^projects$/i

/**
 * Bio pages come in three shapes, so this reads structurally rather than by position:
 *   1. Matthew Garlick — name, role, credentials, email, then <h4>Background</h4> + <p>
 *   2. Cary Smith      — name, role, credentials, email, phone, website, then loose <p>
 *   3. Paul Bony       — name, email, phone, then <h4> sections with the role as the first one
 */
function scrapeBio(dom) {
  const headings = dom.querySelectorAll('h1,h2')
  const nameIdx = headings.findIndex((h) => h.tagName === 'H1')

  // Everything between the name and the footer CTA is this person's metadata.
  const meta = []
  for (let i = nameIdx + 1; i < headings.length; i++) {
    const t = clean(headings[i].text)
    if (!t || BOILERPLATE.test(t)) break
    meta.push(t)
  }

  const contactLine = /^(email|phone|tel|website|url|linkedin)\s*:/i
  const grab = (key) => {
    const hit = meta.find((t) => new RegExp(`^${key}\\s*:`, 'i').test(t))
    return hit ? clean(hit.replace(new RegExp(`^${key}\\s*:`, 'i'), '')) || null : null
  }

  // Credentials are an acronym list: "CCP, CxA, CEM, BEMP" or "CEM, CEA, AEE Fellow".
  const isCredentials = (t) => /,/.test(t) && /^[A-Z]/.test(t) && t.split(',').every((p) => p.trim().length <= 12)

  const credentials = meta.find((t) => !contactLine.test(t) && isCredentials(t)) || null
  const role = meta.find((t) => !contactLine.test(t) && t !== credentials) || null

  const email = grab('email')
  const phone = grab('phone')
  const website = grab('website') || grab('url')
  const linkedin = grab('linkedin')

  // Walk the body in document order, bucketing content under its <h4> heading.
  // Content before the first <h4> is the intro.
  const intro = []
  const sections = []
  let current = null
  for (const el of dom.querySelectorAll('h4,h5,p,li')) {
    const text = decode(el.text)
    if (!text || text.length < 3 || BOILERPLATE.test(text)) continue
    if (el.tagName === 'H4' || el.tagName === 'H5') {
      current = { heading: text, items: [] }
      sections.push(current)
    } else if (current) {
      current.items.push(text)
    } else if (text.length > 40) {
      intro.push(text)
    }
  }

  let bio = intro
  let roleFromSection = null
  const background = sections.find((s) => /^background$/i.test(s.heading))
  if (background) {
    bio = [...intro, ...background.items]
    sections.splice(sections.indexOf(background), 1)
  } else if (!bio.length && sections.length) {
    // Paul Bony's layout: the first section carries the summary and doubles as the role.
    const first = sections[0]
    bio = first.items.filter((t) => t.length > 60)
    if (bio.length) {
      roleFromSection = first.heading
      sections.shift()
    }
  }

  return {
    role: role || roleFromSection,
    credentials,
    email,
    phone,
    website,
    linkedin,
    bio,
    sections: sections.filter((s) => s.items.length),
  }
}

async function importTeam(media) {
  console.log('\nTeam')
  const raw = await getJSON('tgeg-employee?per_page=100&_fields=id,slug,title,featured_media')
  const out = []

  for (const person of raw) {
    const slug = person.slug
    const dom = await getDOM(`${BASE}/tgeg-team/${slug}/`)
    const b = dom ? scrapeBio(dom) : {}

    const m = byId(media, person.featured_media)
    let image = null
    let imageAlt = ''
    if (m) {
      image = await download(fullSize(m.source_url), 'team', slug)
      imageAlt = decode(m.alt_text) || `${decode(person.title.rendered)} headshot`
    } else {
      warn(`no headshot for "${slug}"`)
    }

    const role = ROLE_OVERRIDES[slug] || b.role || ''
    if (ROLE_OVERRIDES[slug] && b.role !== ROLE_OVERRIDES[slug]) {
      console.log(`  ~ ${slug}: role override "${b.role}" -> "${ROLE_OVERRIDES[slug]}"`)
    }
    if (!b.bio?.length) warn(`no background copy for "${slug}"`)

    if (!role) warn(`no role found for "${slug}" — add one to ROLE_OVERRIDES`)

    out.push({
      slug,
      name: decode(person.title.rendered),
      role,
      credentials: b.credentials || null,
      email: b.email || null,
      phone: b.phone || null,
      website: b.website || null,
      linkedin: b.linkedin || null,
      bio: b.bio || [],
      sections: b.sections || [],
      image,
      imageAlt,
      leadership: LEADERSHIP.includes(slug),
    })
    console.log(`  · ${slug} — ${role || '?'}${b.bio?.length ? ` (${b.bio.length}p bio)` : ''}`)
  }

  out.sort((a, b) => {
    const ai = TEAM_ORDER.indexOf(a.slug)
    const bi = TEAM_ORDER.indexOf(b.slug)
    const aRank = ai === -1 ? Number.MAX_SAFE_INTEGER : ai
    const bRank = bi === -1 ? Number.MAX_SAFE_INTEGER : bi
    if (aRank !== bRank) return aRank - bRank
    return a.name.localeCompare(b.name)
  })
  return out
}

// ── site + brand imagery ──────────────────────────────────────────────────────

async function importImageSet(media, set, dir) {
  console.log(`\n${dir} imagery`)
  const map = {}
  for (const [name, tail] of Object.entries(set)) {
    const m = byPath(media, tail)
    if (!m) {
      warn(`${dir} image not found in media library: ${tail}`)
      continue
    }
    const local = await download(fullSize(m.source_url), dir, name)
    if (!local) continue

    const alt = ALT_OVERRIDES[name] || decode(m.alt_text) || ALT_FALLBACKS[name]
    if (!alt) warn(`${dir} image "${name}" has no alt text in WordPress and no fallback`)
    map[name] = { src: local, alt: alt || '' }
  }
  return map
}

// ── emit ──────────────────────────────────────────────────────────────────────

const HEADER = `// GENERATED by scripts/import-wp.mjs — edit the script or re-run \`pnpm import:wp\`
// rather than hand-editing, or your changes will be overwritten on the next import.
`

async function writeContent(name, body) {
  await mkdir(CONTENT_DIR, { recursive: true })
  await writeFile(join(CONTENT_DIR, name), HEADER + body)
  console.log(`  = ${CONTENT_DIR}/${name}`)
}

async function main() {
  const media = await loadMedia()

  const projects = await importProjects(media)
  const team = await importTeam(media)
  const site = await importImageSet(media, SITE_IMAGES, 'site')
  const brand = await importImageSet(media, BRAND_IMAGES, 'brand')

  console.log('\nWriting content files')

  await writeContent(
    'projects.ts',
    `
export interface ProjectArticle {
  title: string
  publisher: string
  url: string
}

/** Partner / org credited on a project page. Optional url when the source links them. */
export interface ProjectTeamMember {
  name: string
  url?: string
}

export interface Project {
  slug: string
  name: string
  location: string
  country: string
  sqFeet: string | null
  buildings: string | null
  completion: string | null
  status: 'In Progress' | 'In Development' | 'Operational' | 'Completed'
  summary: string
  description: string
  /** Project partners / collaborating orgs. Empty when not yet collected. */
  team: ProjectTeamMember[]
  articles: ProjectArticle[]
  image: string | null
  imageAlt: string
  featured: boolean
}

export const projects: Project[] = ${ts(projects)}

export const featuredProjects = projects.filter((p) => p.featured)

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
`,
  )

  await writeContent(
    'team.ts',
    `
export interface BioSection {
  heading: string
  items: string[]
}

export interface TeamMember {
  slug: string
  name: string
  role: string
  credentials: string | null
  email: string | null
  phone: string | null
  website: string | null
  linkedin: string | null
  bio: string[]
  /** Awards, publications, education etc. — varies per person. */
  sections: BioSection[]
  image: string | null
  imageAlt: string
  leadership: boolean
}

/**
 * Grid order from the legacy Our Team page (5-across).
 */
export const teamOrder = ${ts(TEAM_ORDER)} as const

export const team: TeamMember[] = ${ts(team)}

const orderIndex = (slug: string) => {
  const i = (teamOrder as readonly string[]).indexOf(slug)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}
team.sort((a, b) => orderIndex(a.slug) - orderIndex(b.slug))

export const leadership = team.filter((m) => m.leadership)

export const getMember = (slug: string) => team.find((m) => m.slug === slug)
`,
  )

  await writeContent(
    'images.ts',
    `
export interface Img {
  src: string
  alt: string
}

/** Site photography, imported from the WordPress media library. */
export const site = ${ts(site)} satisfies Record<string, Img>

/** Logo and brand marks. */
export const brand = ${ts(brand)} satisfies Record<string, Img>
`,
  )

  console.log(`\nDone. ${projects.length} projects, ${team.length} team members.`)
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s) — content to fill in by hand:`)
    warnings.forEach((w) => console.log(`  - ${w}`))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

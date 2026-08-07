/**
 * Generates build-time static assets that depend on site content:
 *   public/sitemap.xml            every route, including project and team slugs
 *   public/images/og-greyedge.webp  the social share card
 *
 * Runs automatically as part of `pnpm build`.
 */
import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const SITE = 'https://greyedgegroup.com'

/** The content files are plain TS literals, so the slugs can be read without a parser. */
async function slugsFrom(file) {
  const src = await readFile(file, 'utf8')
  return [...src.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1])
}

async function sitemap() {
  const projects = await slugsFrom('src/content/projects.ts')
  const team = await slugsFrom('src/content/team.ts')

  const routes = [
    { path: '/', priority: '1.0' },
    { path: '/approach', priority: '0.9' },
    { path: '/projects', priority: '0.9' },
    { path: '/geothermal-101', priority: '0.9' },
    { path: '/about', priority: '0.8' },
    { path: '/insights', priority: '0.7' },
    { path: '/contact', priority: '0.8' },
    ...projects.map((s) => ({ path: `/projects/${s}`, priority: '0.7' })),
    ...team.map((s) => ({ path: `/team/${s}`, priority: '0.5' })),
  ]

  const today = new Date().toISOString().slice(0, 10)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) =>
      `  <url>\n    <loc>${SITE}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${r.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
  await writeFile('public/sitemap.xml', xml)
  console.log(`  sitemap.xml — ${routes.length} routes`)
}

/**
 * Share card. Built from the real logo asset rather than rendered text, because the
 * display font isn't guaranteed to be installed wherever this runs.
 */
async function ogImage() {
  const W = 1200
  const H = 630

  const photo = await sharp('public/images/site/hero-district.webp')
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer()

  const scrim = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- The wordmark's "EDGE" half is sliced open, so the photo shows through it.
             The scrim has to stay dark enough behind the mark for it to read. -->
        <linearGradient id="g" x1="0" y1="0" x2="0.55" y2="1">
          <stop offset="0%" stop-color="#14171A" stop-opacity="0.97"/>
          <stop offset="60%" stop-color="#14171A" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#14171A" stop-opacity="0.80"/>
        </linearGradient>
      </defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect x="80" y="470" width="120" height="5" fill="#5A9835"/>
    </svg>`,
  )

  const logo = await sharp('public/images/brand/logo-white.webp').resize({ width: 480 }).toBuffer()

  await sharp(photo)
    .composite([
      { input: scrim, top: 0, left: 0 },
      { input: logo, top: 240, left: 80 },
    ])
    .webp({ quality: 88 })
    .toFile('public/images/og-greyedge.webp')

  console.log(`  og-greyedge.webp — ${W}x${H}`)
}

console.log('Generating static assets')
await sitemap()
await ogImage()

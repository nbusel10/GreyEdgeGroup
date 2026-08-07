/**
 * Visual QA: screenshots every route at the breakpoints called out in the Aug 5 review.
 *
 *   node scripts/shots.mjs                      all routes, all widths
 *   node scripts/shots.mjs /projects 768        one route at one width
 *   node scripts/shots.mjs / 1280 --full        full-page rather than viewport
 *
 *
 * Points at the dev server by default; set BASE to hit `vite preview` instead when you
 * want to check the built output. Output lands in scripts/.shots/ (gitignored).
 */
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'
import sharp from 'sharp'

const BASE = process.env.BASE ?? 'http://localhost:8446'
const OUT = 'scripts/.shots'

const ALL_ROUTES = [
  '/',
  '/approach',
  '/projects',
  '/projects/aspen',
  '/geothermal-101',
  '/about',
  '/team/matthew-garlick',
  '/insights',
  '/contact',
  '/nope',
]
const ALL_WIDTHS = [1440, 1280, 1024, 768, 375]

const args = process.argv.slice(2)
const full = args.includes('--full')
const positional = args.filter((a) => !a.startsWith('--'))
const routes = positional[0] ? [positional[0]] : ALL_ROUTES
const widths = positional[1] ? [Number(positional[1])] : ALL_WIDTHS

const slug = (r) => (r === '/' ? 'home' : r.replace(/^\//, '').replace(/\//g, '-'))

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const problems = []

for (const width of widths) {
  const ctx = await browser.newContext({
    viewport: { width, height: width < 500 ? 812 : 900 },
    deviceScaleFactor: 1,
    // Freeze reveal animations so screenshots are deterministic.
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()

  const consoleErrors = []
  page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()))
  page.on('pageerror', (e) => consoleErrors.push(String(e)))

  for (const route of routes) {
    consoleErrors.length = 0
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    // Let fonts settle and reveals resolve.
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(350)

    const file = `${OUT}/${slug(route)}-${width}.png`
    await page.screenshot({ path: file, fullPage: full })

    // Horizontal overflow is the classic responsive bug; catch it numerically.
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement
      const over = []
      if (doc.scrollWidth > doc.clientWidth + 1) {
        for (const el of document.querySelectorAll('body *')) {
          const r = el.getBoundingClientRect()
          if (r.width > 0 && (r.right > doc.clientWidth + 1 || r.left < -1)) {
            const cls = typeof el.className === 'string' ? el.className.slice(0, 70) : ''
            over.push(`${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)}`)
          }
        }
      }
      return { scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth, offenders: over.slice(0, 4) }
    })

    if (overflow.scrollWidth > overflow.clientWidth + 1) {
      problems.push(`${route} @${width}: overflows by ${overflow.scrollWidth - overflow.clientWidth}px`)
      overflow.offenders.forEach((o) => problems.push(`    ${o}`))
    }
    if (consoleErrors.length) {
      problems.push(`${route} @${width}: ${consoleErrors.length} console error(s)`)
      ;[...new Set(consoleErrors)].slice(0, 3).forEach((e) => problems.push(`    ${e.slice(0, 160)}`))
    }
    process.stdout.write(`  ${route} @${width}\n`)
  }
  await ctx.close()
}

await browser.close()

// Contact sheet per width so several routes can be reviewed in one image.
for (const width of widths) {
  const files = routes.map((r) => `${OUT}/${slug(r)}-${width}.png`)
  const thumbW = Math.min(width, 420)
  const scaled = await Promise.all(
    files.map((f) => sharp(f).resize({ width: thumbW }).toBuffer()),
  )
  const meta = await sharp(scaled[0]).metadata()
  await sharp({
    create: {
      width: thumbW * scaled.length,
      height: meta.height,
      channels: 3,
      background: '#ffffff',
    },
  })
    .composite(scaled.map((buf, i) => ({ input: buf, left: i * thumbW, top: 0 })))
    .png()
    .toFile(`${OUT}/_sheet-${width}.png`)
}

console.log(`\n${routes.length * widths.length} screenshots -> ${OUT}`)
if (problems.length) {
  console.log(`\n${problems.length} issue(s):`)
  problems.forEach((p) => console.log(`  ${p}`))
} else {
  console.log('\nNo horizontal overflow and no console errors.')
}

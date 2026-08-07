/**
 * Section-level visual QA. Scrolls each named block into view and captures it, which is
 * more readable than one enormous full-page screenshot.
 *
 *   node scripts/sections.mjs 1280
 */
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'

const width = Number(process.argv[2] || 1280)
const OUT = 'scripts/.sections'

/** [route, label, selector or scroll target] */
const targets = [
  ['/', 'challenges', 'section:has([role="tablist"])'],
  ['/', 'advantage-claim', '#advantage > div:first-child'],
  ['/', 'lessons', '#advantage ol'],
  ['/', 'capabilities', '#capabilities'],
  ['/', 'doors', '#advantage > div:last-child'],
  ['/', 'process', '#process'],
  ['/', 'featured-projects', 'section:has(h2:text-is("Projects that close."))'],
  ['/', 'leadership', '#leadership'],
  ['/', 'linkedin', 'section:has(h2:text-is("What we’re working on now"))'],
  ['/', 'final-cta', 'footer'],
  ['/projects', 'grid', 'section:last-of-type'],
  ['/geothermal-101', 'thermal-highway', '#thermal-highway'],
  ['/about', 'team-grid', '#team'],
  ['/contact', 'form', 'form'],
]

await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()
const ctx = await browser.newContext({
  viewport: { width, height: width < 500 ? 812 : 900 },
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()

let current = null
for (const [route, label, selector] of targets) {
  if (route !== current) {
    await page.goto('http://localhost:5173' + route, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    current = route
  }
  const el = page.locator(selector).first()
  try {
    await el.scrollIntoViewIfNeeded({ timeout: 4000 })
    await page.waitForTimeout(400)
    await el.screenshot({ path: `${OUT}/${label}-${width}.png` })
    console.log(`  ${label}`)
  } catch (err) {
    console.log(`  ${label} — SKIPPED (${String(err).split('\n')[0].slice(0, 90)})`)
  }
}

await browser.close()
console.log(`\n-> ${OUT}`)

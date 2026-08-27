/**
 * THROWAWAY. Screenshots the mounted AtlExplainer section on /geothermal-101.
 *
 * Playwright's own browser download isn't installed, but it can drive a browser already on the
 * machine, so this uses the Edge that ships with Windows. Falls back through the usual channels
 * before giving up, and reports clearly if none are present.
 */
import { chromium } from 'playwright'

const channels = ['msedge', 'chrome', 'chromium']
let browser
let used
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel })
    used = channel
    break
  } catch {
    // try the next one
  }
}
if (!browser) {
  console.error(`no local browser found; tried ${channels.join(', ')}`)
  process.exit(1)
}
console.log(`using ${used}`)

// The sticky header floats over whatever is beneath it, so a section-bounded screenshot
// catches it sitting on top of the eyebrow. Drop it for the shot only.
const HIDE_CHROME = 'header{display:none !important}'

async function shoot(width, height, file) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 2 })
  page.on('pageerror', (e) => console.log('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && console.log('console error:', m.text()))

  await page.goto('http://localhost:8446/geothermal-101', { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: HIDE_CHROME })

  // The section reveals on scroll, so bring it into view and let the transition settle.
  const section = page.locator('section').filter({ hasText: 'Every connection runs both ways' }).first()
  await section.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await section.screenshot({ path: file })
  console.log(`wrote ${file}`)
  await page.close()
}

await shoot(1440, 1000, 'tmp-crops/section-atl-explainer.png')
await shoot(390, 900, 'tmp-crops/section-atl-explainer-390.png')

await browser.close()

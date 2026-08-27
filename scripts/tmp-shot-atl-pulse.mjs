/**
 * THROWAWAY. Samples the ATL pulse cycle at fixed points and stacks the frames.
 *
 * Rather than screenshotting at wall-clock intervals and hoping, this pauses every running
 * animation and drives Animation.currentTime directly, so each frame is exactly the moment
 * it claims to be and the whole strip shares one clock.
 */
import { chromium } from 'playwright'
import sharp from 'sharp'

const channels = ['msedge', 'chrome', 'chromium']
let browser
for (const channel of channels) {
  try {
    browser = await chromium.launch({ channel })
    break
  } catch {
    // try the next one
  }
}
if (!browser) {
  console.error(`no local browser found; tried ${channels.join(', ')}`)
  process.exit(1)
}

const URL = 'http://localhost:8446/geothermal-101'
const HIDE_CHROME = 'header{display:none !important}'

async function section(width, height, ms, out) {
  const page = await browser.newPage({ viewport: { width, height } })
  page.on('pageerror', (e) => console.log('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && console.log('console error:', m.text()))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: HIDE_CHROME })
  const el = page.locator('section').filter({ hasText: 'Every connection runs both ways' })
  await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await seek(page, ms)
  await el.screenshot({ path: out })
  await page.close()
  console.log(`wrote ${out}`)
}

async function openFigure(width, height, reducedMotion) {
  const page = await browser.newPage({ viewport: { width, height }, reducedMotion })
  page.on('pageerror', (e) => console.log('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && console.log('console error:', m.text()))
  await page.goto(URL, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: HIDE_CHROME })
  const figure = page.locator('section').filter({ hasText: 'Every connection runs both ways' }).locator('svg')
  await figure.scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  return { page, figure }
}

const seek = (page, ms) =>
  page.evaluate((t) => {
    for (const a of document.getAnimations()) {
      a.pause()
      a.currentTime = t
    }
  }, ms)

async function filmstrip(width, height, times, out, crop) {
  const { page, figure } = await openFigure(width, height, 'no-preference')
  const frames = []
  for (const t of times) {
    await seek(page, t)
    let shot = await figure.screenshot()
    if (crop) {
      const m = await sharp(shot).metadata()
      shot = await sharp(shot)
        .extract({
          left: 0,
          top: Math.round(m.height * crop[0]),
          width: m.width,
          height: Math.round(m.height * (crop[1] - crop[0])),
        })
        .toBuffer()
    }
    frames.push(shot)
  }
  await page.close()

  // Tall frames tile across, wide ones stack down, so the sheet stays roughly square and
  // survives being looked at.
  const sized = await Promise.all(frames.map((b) => sharp(b).metadata()))
  const across = sized[0].height > sized[0].width
  const majors = sized.map((m) => (across ? m.width : m.height))
  const layers = []
  let offset = 0
  frames.forEach((input, i) => {
    layers.push(across ? { input, left: offset, top: 0 } : { input, left: 0, top: offset })
    offset += majors[i] + 8
  })
  const minor = Math.max(...sized.map((m) => (across ? m.height : m.width)))
  await sharp({
    create: {
      width: across ? offset : minor,
      height: across ? minor : offset,
      channels: 3,
      background: '#ffffff',
    },
  })
    .composite(layers)
    .png()
    .toFile(out)
  console.log(`wrote ${out} — ${times.map((t) => `${t}ms`).join(', ')}`)
}

async function still(width, height, reducedMotion, ms, out) {
  const { page, figure } = await openFigure(width, height, reducedMotion)
  if (ms != null) await seek(page, ms)
  await figure.screenshot({ path: out })
  await page.close()
  console.log(`wrote ${out}`)
}

// One full cycle of Mode 1, wide. cycleMs is 6000; the last frame is the beat of quiet
// before it restarts, and should match the first.
// Cropped to the band the pulses actually travel through, so the strip stays legible.
await filmstrip(1400, 1000, [200, 700, 1200, 1600, 2100, 3200, 4300, 5000, 5600], 'tmp-crops/atl-pulse-wide.png', [
  0.3, 0.62,
])

// The same cycle on a phone, where the loop stands on end.
await filmstrip(390, 900, [200, 900, 1400, 2100, 3200, 4300, 5000, 5600], 'tmp-crops/atl-pulse-narrow.png')

await still(1440, 1000, 'reduce', null, 'tmp-crops/atl-pulse-reduced.png')

// The whole section, caught at 2100ms where two pulses are in the air at once.
await section(1440, 1000, 2100, 'tmp-crops/atl-section-wide.png')
await section(390, 900, 2100, 'tmp-crops/atl-section-narrow.png')

await browser.close()

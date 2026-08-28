/**
 * Captures the ATL explainer on /geothermal-101, one PNG per mode at ~1s intervals
 * across that mode's full cycle. Output: tmp/atl-frames/
 *
 * Starts `npm run dev` if nothing is listening on the configured port. Seeks
 * CSS animations via Animation.currentTime (same clock-scrub as svg-to-gif.mjs)
 * so each filename is the moment it claims to be.
 *
 *   node scripts/atl-frames.mjs
 *   node scripts/atl-frames.mjs --out tmp/atl-frames/before
 */
import { spawn } from 'node:child_process'
import { mkdir, rm } from 'node:fs/promises'
import { setTimeout as sleep } from 'node:timers/promises'
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:8446'
const OUT = process.argv.includes('--out')
  ? process.argv[process.argv.indexOf('--out') + 1]
  : 'tmp/atl-frames'
const WIDTH = 1280
const HEIGHT = 900
const STEP_MS = 1000

const HIDE_CHROME = 'header, [data-scroll-indicator] { display: none !important }'

async function isUp() {
  try {
    const r = await fetch(BASE, { signal: AbortSignal.timeout(1500) })
    return r.status < 500
  } catch {
    return false
  }
}

async function ensureServer() {
  if (await isUp()) return null
  console.log(`nothing on ${BASE}; starting npm run dev`)
  const child = spawn('npm', ['run', 'dev'], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
    env: process.env,
  })
  const start = Date.now()
  while (Date.now() - start < 40000) {
    if (await isUp()) {
      console.log('dev server ready')
      return child
    }
    await sleep(400)
  }
  child.kill()
  throw new Error(`dev server did not come up on ${BASE}`)
}

async function launchBrowser() {
  const channels = [undefined, 'msedge', 'chrome', 'chromium']
  for (const channel of channels) {
    try {
      const browser = await chromium.launch(channel ? { channel } : {})
      if (channel) console.log(`using ${channel}`)
      return browser
    } catch {
      // try the next one
    }
  }
  throw new Error('no local browser found; tried bundled Chromium, msedge, chrome, chromium')
}

const seek = (page, ms) =>
  page.evaluate((t) => {
    for (const a of document.getAnimations()) {
      a.pause()
      a.currentTime = t
    }
  }, ms)

async function main() {
  const server = await ensureServer()
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const browser = await launchBrowser()
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 2,
  })
  page.on('pageerror', (e) => console.log('page error:', e.message))
  page.on('console', (m) => m.type() === 'error' && console.log('console error:', m.text()))

  await page.goto(`${BASE}/geothermal-101`, { waitUntil: 'networkidle' })
  await page.addStyleTag({ content: HIDE_CHROME })
  await page.evaluate(() => document.fonts.ready)

  const section = page.locator('#thermal-highway')
  await section.scrollIntoViewIfNeeded()
  await sleep(800)

  const tabs = page.locator('#thermal-highway [role="tab"]')
  const tabCount = await tabs.count()
  if (tabCount === 0) throw new Error('no mode tabs found in #thermal-highway')

  const svg = section.locator('svg[role="img"]')

  for (let i = 0; i < tabCount; i++) {
    const tab = tabs.nth(i)
    const label = (await tab.innerText()).replace(/\s+/g, ' ').trim()
    const slug = label
      .toLowerCase()
      .replace(/^\d+\s+/, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    await tab.click()
    // Remounted pulses need a paint before getAnimations() can see them.
    await sleep(120)

    const cycleMs = await page.evaluate(() => {
      const pulse = document.querySelector('#thermal-highway .atl-pulse, #thermal-highway .atl-ground-hot')
      if (!pulse) return 6000
      const raw = getComputedStyle(pulse).animationDuration
      const n = parseFloat(raw)
      return raw.endsWith('ms') ? n : n * 1000
    })

    const times = []
    for (let t = 0; t < cycleMs; t += STEP_MS) times.push(t)
    if (times[times.length - 1] !== cycleMs - STEP_MS && cycleMs > STEP_MS) {
      // Always include a frame just before the cycle restarts.
      const last = cycleMs - 80
      if (last > times[times.length - 1]) times.push(last)
    }

    console.log(`\n${slug}  cycle ${cycleMs}ms  ${times.length} frames`)
    for (const t of times) {
      await seek(page, t)
      const file = `${OUT}/${String(i + 1).padStart(2, '0')}-${slug}-${String(t).padStart(5, '0')}ms.png`
      await svg.screenshot({ path: file })
      process.stdout.write(`  ${t}ms\n`)
    }
  }

  await browser.close()
  if (server) server.kill()
  console.log(`\nwrote frames to ${OUT}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

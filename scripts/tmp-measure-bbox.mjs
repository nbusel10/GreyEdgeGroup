/**
 * THROWAWAY. Compares each ATL layout's real ink bounds against its viewBox window, to prove
 * the crop frames the drawing without clipping it. Text extents depend on the loaded font,
 * which is the part that can't be worked out on paper, so this asks the browser once fonts
 * have settled.
 */
import { chromium } from 'playwright'

const browser = await chromium.launch({ channel: 'msedge' })
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
await page.goto('http://localhost:8446/preview-atl-icons', { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.waitForTimeout(500)

const found = await page.evaluate(() =>
  Array.from(document.querySelectorAll('svg'))
    .filter((s) => s.querySelector('title')?.textContent?.includes('Ambient temperature loop network'))
    .map((s) => {
      const b = s.getBBox()
      const [vx, vy, vw, vh] = s.getAttribute('viewBox').split(/\s+/).map(Number)
      return { viewBox: s.getAttribute('viewBox'), vx, vy, vw, vh, x: b.x, y: b.y, w: b.width, h: b.height }
    }),
)

const r = (n) => Math.round(n * 10) / 10
const seen = new Set()
for (const f of found) {
  if (seen.has(f.viewBox)) continue
  seen.add(f.viewBox)
  const left = f.x - f.vx
  const right = f.vx + f.vw - (f.x + f.w)
  const top = f.y - f.vy
  const bottom = f.vy + f.vh - (f.y + f.h)
  const worst = Math.min(left, right, top, bottom)
  console.log(
    `viewBox "${f.viewBox}"\n` +
      `  ink   x ${r(f.x)} → ${r(f.x + f.w)}   y ${r(f.y)} → ${r(f.y + f.h)}\n` +
      `  clear left ${r(left)}  right ${r(right)}  top ${r(top)}  bottom ${r(bottom)}\n` +
      `  ${worst < 0 ? `*** CLIPPED by ${r(-worst)} ***` : `ok — tightest edge has ${r(worst)} units to spare`}\n`,
  )
}

await browser.close()

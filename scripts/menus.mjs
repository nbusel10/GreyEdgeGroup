/** Captures the nav in its open states, at the widths where the old menu misaligned. */
import { chromium } from 'playwright'
import { mkdir, rm } from 'node:fs/promises'

const OUT = 'scripts/.menus'
await rm(OUT, { recursive: true, force: true })
await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const width of [1440, 1280, 1024]) {
  const ctx = await browser.newContext({ viewport: { width, height: 700 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  await page.getByRole('link', { name: 'About', exact: true }).first().hover()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/about-menu-${width}.png`, clip: { x: 0, y: 0, width, height: 260 } })

  // Check the panel is flush with the header and spans the full width.
  const box = await page.evaluate(() => {
    const panel = document.querySelector('header > div:last-of-type')
    const header = document.querySelector('header > div:first-child')
    if (!panel || !header) return null
    const p = panel.getBoundingClientRect()
    const h = header.getBoundingClientRect()
    return { panelLeft: Math.round(p.left), panelWidth: Math.round(p.width), headerBottom: Math.round(h.bottom), panelTop: Math.round(p.top) }
  })
  console.log(width, JSON.stringify(box))
  await ctx.close()
}

// Mobile drawer
for (const width of [768, 375]) {
  const ctx = await browser.newContext({ viewport: { width, height: 812 }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173/about', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('button', { name: /Expand Approach/ }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${OUT}/drawer-${width}.png` })
  console.log(`drawer ${width} ok`)
  await ctx.close()
}

await browser.close()
console.log(`-> ${OUT}`)

import { chromium } from 'playwright'

const browser = await chromium.launch()

for (const reduced of ['reduce', 'no-preference']) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: reduced,
  })
  const page = await ctx.newPage()
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(600)

  const info = await page.evaluate(() => {
    const h1 = document.querySelector('h1')
    if (!h1) return { error: 'no h1' }
    const cs = getComputedStyle(h1)
    const wrap = h1.closest('.fade-slide-up')
    const wcs = wrap ? getComputedStyle(wrap) : null
    const r = h1.getBoundingClientRect()
    return {
      text: h1.textContent?.slice(0, 40),
      rect: { top: Math.round(r.top), height: Math.round(r.height) },
      h1Opacity: cs.opacity,
      wrapOpacity: wcs?.opacity,
      wrapAnimation: wcs?.animationName + ' ' + wcs?.animationDuration + ' ' + wcs?.animationFillMode,
      wrapTransform: wcs?.transform,
      heroHeight: Math.round(document.querySelector('section')?.getBoundingClientRect().height ?? 0),
    }
  })
  console.log(reduced, JSON.stringify(info, null, 2))
  await ctx.close()
}

await browser.close()

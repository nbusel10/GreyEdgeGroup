/**
 * Crawls every internal link on the running site and asserts each one resolves to a real
 * page rather than the 404 route. Also reports images that failed to load and any
 * duplicate/missing page titles.
 *
 * Points at the dev server by default; set BASE to check a `vite preview` build instead.
 */
import { chromium } from 'playwright'

const BASE = process.env.BASE ?? 'http://localhost:5173'
const browser = await chromium.launch()
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' })
const page = await ctx.newPage()

const seen = new Set()
const queue = ['/']
const problems = []
const titles = new Map()
const external = new Set()

while (queue.length) {
  const route = queue.shift()
  if (seen.has(route)) continue
  seen.add(route)

  const failedImages = []
  const onResponse = (r) => {
    if (r.request().resourceType() === 'image' && r.status() >= 400) failedImages.push(r.url())
  }
  page.on('response', onResponse)

  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(150)
  page.off('response', onResponse)

  const info = await page.evaluate(() => ({
    title: document.title,
    is404: !!document.body.textContent?.includes('Error 404'),
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? null,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
    h1Count: document.querySelectorAll('h1').length,
    links: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    // A missing alt attribute is a bug. alt="" is valid, but only for images that carry
    // no meaning — here that's just the background photo in the page header.
    imgsNoAltAttr: [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length,
    imgsEmptyAlt: [...document.querySelectorAll('img')]
      .filter((i) => i.hasAttribute('alt') && !i.getAttribute('alt') && i.getAttribute('aria-hidden') !== 'true')
      .map((i) => i.getAttribute('src')),
  }))

  if (info.is404) problems.push(`${route} -> renders the 404 page`)
  if (!info.description) problems.push(`${route} -> no meta description`)
  if (!info.canonical) problems.push(`${route} -> no canonical URL`)
  if (info.h1Count !== 1) problems.push(`${route} -> ${info.h1Count} <h1> elements (expected 1)`)
  if (info.imgsNoAltAttr) problems.push(`${route} -> ${info.imgsNoAltAttr} image(s) with no alt attribute`)
  info.imgsEmptyAlt.forEach((src) => problems.push(`${route} -> empty alt on ${src}`))
  failedImages.forEach((u) => problems.push(`${route} -> image failed: ${u.replace(BASE, '')}`))

  if (titles.has(info.title)) problems.push(`${route} -> duplicate <title> with ${titles.get(info.title)}`)
  else titles.set(info.title, route)

  for (const href of info.links) {
    if (!href) continue
    if (href.startsWith('http')) {
      external.add(href)
    } else if (href.startsWith('/')) {
      const path = href.split('#')[0] || '/'
      if (!seen.has(path)) queue.push(path)
      // Verify in-page anchors exist on the page that links to them.
      const hash = href.split('#')[1]
      if (hash && path === route) {
        const exists = await page.evaluate((id) => !!document.getElementById(id), hash)
        if (!exists) problems.push(`${route} -> anchor #${hash} has no matching element`)
      }
    } else if (!href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
      problems.push(`${route} -> odd href "${href}"`)
    }
  }
}

// Anchors that point at another page need checking once that page is loaded.
const anchorTargets = new Map()
for (const route of seen) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded' })
  const hrefs = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href')).filter((h) => h?.includes('#')),
  )
  for (const h of hrefs) {
    const [path, hash] = h.split('#')
    anchorTargets.set(`${path || '/'}#${hash}`, route)
  }
}
for (const [target, from] of anchorTargets) {
  const [path, hash] = target.split('#')
  await page.goto(BASE + path, { waitUntil: 'networkidle' })
  const exists = await page.evaluate((id) => !!document.getElementById(id), hash)
  if (!exists) problems.push(`${from} -> links to ${target}, but #${hash} does not exist on ${path}`)
}

await browser.close()

console.log(`Crawled ${seen.size} routes, ${anchorTargets.size} cross-page anchors, ${external.size} external links.`)
console.log([...seen].sort().join('\n'))
console.log(`\nExternal:\n${[...external].sort().join('\n')}`)

if (problems.length) {
  console.log(`\n${problems.length} problem(s):`)
  problems.forEach((p) => console.log(`  - ${p}`))
  process.exitCode = 1
} else {
  console.log('\nNo broken links, missing anchors, missing alt text, or missing metadata.')
}

/**
 * THROWAWAY. Rasterises the ATL icons for review without needing a browser.
 *
 * It loads the real src/components/AtlIcons.tsx through Vite's SSR pipeline and renders it
 * with react-dom/server, so what gets rasterised is the actual component rather than a copy
 * of its shapes that could drift. Tailwind isn't in play here, so the --color-atl-* classes
 * are resolved against src/index.css and rewritten as plain fill/stroke attributes.
 */
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createServer } from 'vite'
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'tmp-crops')
await fs.mkdir(out, { recursive: true })

// ── resolve the design tokens straight out of the stylesheet ───────────────
const css = await fs.readFile(path.join(root, 'src/index.css'), 'utf8')
const raw = new Map()
for (const m of css.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) raw.set(m[1], m[2].trim())
const token = (name, depth = 0) => {
  const v = raw.get(name)
  if (!v) throw new Error(`unknown token --color-${name}`)
  const ref = v.match(/^var\(--color-([\w-]+)\)$/)
  if (ref) {
    if (depth > 5) throw new Error(`token loop at ${name}`)
    return token(ref[1], depth + 1)
  }
  return v
}

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { atlIcons } = await vite.ssrLoadModule('/src/components/AtlIcons.tsx')

const FONTS = {
  'font-body': 'Inter, Segoe UI, sans-serif',
  'font-display': 'Barlow Condensed, Segoe UI, sans-serif',
}

/** React emits the utility classes verbatim; turn them into presentation attributes. */
function resolveClasses(markup) {
  return markup.replace(/class="([^"]+)"/g, (_, classes) => {
    const attrs = []
    for (const c of classes.split(/\s+/)) {
      const m = c.match(/^(fill|stroke)-(atl-[\w-]+)$/)
      if (m) attrs.push(`${m[1]}="${token(m[2])}"`)
      else if (FONTS[c]) attrs.push(`font-family="${FONTS[c]}"`)
    }
    return attrs.join(' ')
  })
}

/** AtlDiagram renders its own <svg> sized by CSS; give it real pixels and white paper. */
function prepScene(markup, pxWidth) {
  const [, , vbW, vbH] = markup.match(/viewBox="([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)"/).slice(1).map(Number)
  const pxHeight = Math.round((pxWidth * vbH) / vbW)
  return markup
    .replace(/^<svg /, `<svg xmlns="http://www.w3.org/2000/svg" width="${pxWidth}" height="${pxHeight}" `)
    .replace(/(<svg[^>]*>)/, `$1<rect x="0" y="0" width="${vbW}" height="${vbH}" fill="#ffffff"/>`)
}

const icons = atlIcons.map((i) => ({ ...i, markup: resolveClasses(renderToStaticMarkup(createElement(i.Icon))) }))

// ── contact sheet: each icon at 96px and 48px, on white ────────────────────
const COL = 210
const ROW = 168
const cols = 4
const rows = Math.ceil(icons.length / cols)
const W = cols * COL
const H = rows * ROW

const cells = icons.map((icon, i) => {
  const cx = (i % cols) * COL
  const cy = ((i / cols) | 0) * ROW
  // 48-unit artboard scaled to 96 and to 48, sharing a baseline.
  const big = `<g transform="translate(${cx + 34} ${cy + 22}) scale(2)">${icon.markup}</g>`
  const small = `<g transform="translate(${cx + 142} ${cy + 70}) scale(1)">${icon.markup}</g>`
  const label = `<text x="${cx + COL / 2}" y="${cy + ROW - 22}" text-anchor="middle" font-family="Inter, Segoe UI, sans-serif" font-size="11" fill="#5a6168">${icon.label}</text>`
  return big + small + label
})

const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#ffffff"/>${cells.join('')}</svg>`
await sharp(Buffer.from(sheet), { density: 144 }).png().toFile(path.join(out, 'icons-sheet.png'))

// ── the row as the scene will show it: all seven at 48px, shared baseline ──
const GAP = 76
const rowW = GAP * icons.length + 40
const rowSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${rowW}" height="90" viewBox="0 0 ${rowW} 90"><rect width="${rowW}" height="90" fill="#ffffff"/>${icons
  .map((icon, i) => `<g transform="translate(${20 + i * GAP} 20)">${icon.markup}</g>`)
  .join('')}</svg>`
await sharp(Buffer.from(rowSvg), { density: 288 }).png().toFile(path.join(out, 'icons-row-48.png'))

// ── one big rendering of each icon, for construction review ────────────────
for (const icon of icons) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="-2 -2 52 52"><rect x="-2" y="-2" width="52" height="52" fill="#ffffff"/>${icon.markup}</svg>`
  await sharp(Buffer.from(svg), { density: 288 }).png().toFile(path.join(out, `icon-${icon.id}.png`))
}

console.log(`rendered ${icons.length} icons to tmp-crops/`)

// ── the static scene, in both building-scale options ───────────────────────
const { default: AtlDiagram } = await vite.ssrLoadModule('/src/components/AtlDiagram.tsx')

const scenes = [
  ['scene-wide', { layout: 'wide' }, 1500],
  ['scene-narrow', { layout: 'narrow' }, 560],
]

for (const [name, props, px] of scenes) {
  const svg = prepScene(resolveClasses(renderToStaticMarkup(createElement(AtlDiagram, props))), px)
  await sharp(Buffer.from(svg), { density: 144 }).png().toFile(path.join(out, `${name}.png`))
  console.log(`  ${name}.png`)
}

await vite.close()

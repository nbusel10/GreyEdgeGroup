/**
 * Renders the Thermal Highway SVG (with CSS flow animations) to an animated GIF.
 * Output: public/videos/thermal-highway.gif
 *
 * Uses Playwright for frames + sharp for PNG→RGBA. GIF is encoded with a
 * compact fixed-palette writer (diagram uses ~10 brand colors).
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import sharp from 'sharp'

const WIDTH = 800
const HEIGHT = 280
const FPS = 12
const DURATION_S = 3
const FRAME_COUNT = FPS * DURATION_S
const DELAY_CS = Math.round(100 / FPS) // GIF delay in centiseconds

const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body {
    margin: 0;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #14171A;
    overflow: hidden;
  }
  @keyframes flow {
    from { stroke-dashoffset: 120; }
    to { stroke-dashoffset: 0; }
  }
  @keyframes flowReverse {
    from { stroke-dashoffset: 0; }
    to { stroke-dashoffset: 120; }
  }
  .animate-flow { animation: flow 3s linear infinite; }
  .animate-flow-reverse { animation: flowReverse 4s linear infinite; }
  svg { display: block; width: ${WIDTH}px; height: ${HEIGHT}px; }
</style>
</head>
<body>
<svg viewBox="0 0 800 280" width="800" height="280" role="img">
  <rect width="800" height="280" fill="#14171A"/>
  <line x1="20" y1="135" x2="780" y2="135" stroke="#3c4247" stroke-width="3"></line>
  <line x1="20" y1="135" x2="780" y2="135" stroke="#426255" stroke-width="2" stroke-dasharray="24 36" class="animate-flow"></line>
  <line x1="20" y1="142" x2="780" y2="142" stroke="#25292d" stroke-width="2"></line>
  <line x1="20" y1="142" x2="780" y2="142" stroke="#5a6168" stroke-width="1.5" stroke-dasharray="16 44" class="animate-flow-reverse"></line>
  <g>
    <line x1="100" y1="135" x2="100" y2="83" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="100" y1="135" x2="100" y2="83" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2s linear infinite;"></line>
    <rect x="60" y="53" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="100" y="70" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">University</text>
  </g>
  <g>
    <line x1="260" y1="135" x2="260" y2="58" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="260" y1="135" x2="260" y2="58" stroke="#9AA1A6" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2.7s linear infinite;"></line>
    <rect x="220" y="28" width="80" height="28" fill="#1e2124" stroke="#7A8288" stroke-width="1"></rect>
    <text x="260" y="45" text-anchor="middle" fill="#9AA1A6" font-size="9" font-family="system-ui, sans-serif">Data Center</text>
  </g>
  <g>
    <line x1="420" y1="135" x2="420" y2="83" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="420" y1="135" x2="420" y2="83" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 3.4s linear infinite;"></line>
    <rect x="380" y="53" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="420" y="70" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">Residential</text>
  </g>
  <g>
    <line x1="580" y1="135" x2="580" y2="58" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="580" y1="135" x2="580" y2="58" stroke="#426255" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2s linear infinite;"></line>
    <rect x="540" y="28" width="80" height="28" fill="#14171A" stroke="#426255" stroke-width="1"></rect>
    <text x="580" y="45" text-anchor="middle" fill="#5a8574" font-size="9" font-family="system-ui, sans-serif">Borefield</text>
  </g>
  <g>
    <line x1="740" y1="135" x2="740" y2="83" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="740" y1="135" x2="740" y2="83" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2.7s linear infinite;"></line>
    <rect x="700" y="53" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="740" y="70" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">Municipal</text>
  </g>
  <g>
    <line x1="100" y1="135" x2="100" y2="191" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="100" y1="135" x2="100" y2="191" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 3.4s linear infinite;"></line>
    <rect x="60" y="195" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="100" y="212" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">Office</text>
  </g>
  <g>
    <line x1="260" y1="135" x2="260" y2="216" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="260" y1="135" x2="260" y2="216" stroke="#9AA1A6" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2s linear infinite;"></line>
    <rect x="220" y="220" width="80" height="28" fill="#1e2124" stroke="#7A8288" stroke-width="1"></rect>
    <text x="260" y="237" text-anchor="middle" fill="#9AA1A6" font-size="9" font-family="system-ui, sans-serif">Wastewater</text>
  </g>
  <g>
    <line x1="420" y1="135" x2="420" y2="191" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="420" y1="135" x2="420" y2="191" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2.7s linear infinite;"></line>
    <rect x="380" y="195" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="420" y="212" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">Hotel</text>
  </g>
  <g>
    <line x1="580" y1="135" x2="580" y2="216" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="580" y1="135" x2="580" y2="216" stroke="#9AA1A6" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 3.4s linear infinite;"></line>
    <rect x="540" y="220" width="80" height="28" fill="#1e2124" stroke="#7A8288" stroke-width="1"></rect>
    <text x="580" y="237" text-anchor="middle" fill="#9AA1A6" font-size="9" font-family="system-ui, sans-serif">Solar Thermal</text>
  </g>
  <g>
    <line x1="740" y1="135" x2="740" y2="191" stroke="#3c4247" stroke-width="1.5"></line>
    <line x1="740" y1="135" x2="740" y2="191" stroke="#5a6168" stroke-width="1" stroke-dasharray="5 8" style="animation: flow 2s linear infinite;"></line>
    <rect x="700" y="195" width="80" height="28" fill="#25292d" stroke="#3c4247" stroke-width="1"></rect>
    <text x="740" y="212" text-anchor="middle" fill="#7A8288" font-size="9" font-family="system-ui, sans-serif">Expansion</text>
  </g>
  <text x="400" y="159" text-anchor="middle" fill="#5a6168" font-size="8" font-family="system-ui, sans-serif" letter-spacing="2">SHARED AMBIENT TEMPERATURE LOOP</text>
</svg>
</body>
</html>`

/** Brand palette padded to 16 (2^4) for GIF color table. */
const PALETTE = [
  [0x14, 0x17, 0x1a], // bg / borefield fill
  [0x1e, 0x21, 0x24], // source fill
  [0x25, 0x29, 0x2d], // building fill / return base
  [0x3c, 0x42, 0x47], // pipe base
  [0x42, 0x62, 0x55], // accent flow
  [0x5a, 0x61, 0x68], // graphite
  [0x5a, 0x85, 0x74], // accent bright text
  [0x7a, 0x82, 0x88], // steel
  [0x9a, 0xa1, 0xa6], // silver
  [0x31, 0x4a, 0x40], // accent deep (antialias)
  [0x2e, 0x33, 0x38], // charcoal
  [0x4a, 0x52, 0x58],
  [0x68, 0x70, 0x76],
  [0x8a, 0x90, 0x96],
  [0x00, 0x00, 0x00],
  [0xff, 0xff, 0xff],
]

function nearestIndex(r, g, b) {
  let best = 0
  let bestD = Infinity
  for (let i = 0; i < PALETTE.length; i++) {
    const [pr, pg, pb] = PALETTE[i]
    const d = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2
    if (d < bestD) {
      bestD = d
      best = i
    }
  }
  return best
}

function rgbaToIndexed(rgba) {
  const n = rgba.length / 4
  const out = new Uint8Array(n)
  for (let i = 0, p = 0; i < n; i++, p += 4) {
    out[i] = nearestIndex(rgba[p], rgba[p + 1], rgba[p + 2])
  }
  return out
}

/** Minimal GIF89a writer (global palette, looping). */
function encodeGif(frames, width, height, delayCs) {
  const parts = []
  const push = (...bytes) => parts.push(Uint8Array.from(bytes))
  const u16 = (n) => push(n & 255, (n >> 8) & 255)

  // Header
  parts.push(new TextEncoder().encode('GIF89a'))
  u16(width)
  u16(height)
  const colorBits = 4 // 16 colors
  push(0x80 | ((colorBits - 1) << 4) | (colorBits - 1), 0, 0) // GCT
  for (const [r, g, b] of PALETTE) push(r, g, b)

  // Netscape loop
  push(0x21, 0xff, 0x0b)
  parts.push(new TextEncoder().encode('NETSCAPE2.0'))
  push(0x03, 0x01, 0x00, 0x00, 0x00)

  for (const indexed of frames) {
    // Graphic Control Extension
    push(0x21, 0xf9, 0x04, 0x00)
    u16(delayCs)
    push(0x00, 0x00)
    // Image Descriptor
    push(0x2c)
    u16(0)
    u16(0)
    u16(width)
    u16(height)
    push(0x00) // no local color table
    parts.push(lzwEncode(indexed, colorBits))
  }

  push(0x3b) // trailer
  const total = parts.reduce((n, p) => n + p.length, 0)
  const out = new Uint8Array(total)
  let o = 0
  for (const p of parts) {
    out.set(p, o)
    o += p.length
  }
  return out
}

function lzwEncode(indexStream, minCodeSize) {
  const clear = 1 << minCodeSize
  const end = clear + 1
  let codeSize = minCodeSize + 1
  let nextCode = end + 1
  const maxCode = 1 << 12

  const dict = new Map()
  const resetDict = () => {
    dict.clear()
    for (let i = 0; i < clear; i++) dict.set(String(i), i)
    nextCode = end + 1
    codeSize = minCodeSize + 1
  }
  resetDict()

  const bitOut = []
  let cur = 0
  let curBits = 0
  const writeCode = (code) => {
    cur |= code << curBits
    curBits += codeSize
    while (curBits >= 8) {
      bitOut.push(cur & 255)
      cur >>= 8
      curBits -= 8
    }
  }

  writeCode(clear)
  let w = String(indexStream[0])
  for (let i = 1; i < indexStream.length; i++) {
    const k = String(indexStream[i])
    const wk = w + ',' + k
    if (dict.has(wk)) {
      w = wk
    } else {
      writeCode(dict.get(w))
      if (nextCode < maxCode) {
        dict.set(wk, nextCode++)
        if (nextCode > 1 << codeSize && codeSize < 12) codeSize++
      } else {
        writeCode(clear)
        resetDict()
      }
      w = k
    }
  }
  writeCode(dict.get(w))
  writeCode(end)
  if (curBits > 0) bitOut.push(cur & 255)

  // Pack into sub-blocks
  const out = [minCodeSize]
  for (let i = 0; i < bitOut.length; i += 255) {
    const chunk = bitOut.slice(i, i + 255)
    out.push(chunk.length, ...chunk)
  }
  out.push(0)
  return Uint8Array.from(out)
}

async function main() {
  await mkdir('public/videos', { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  })
  await page.setContent(HTML, { waitUntil: 'load' })
  await page.waitForTimeout(50)

  // Pause CSS animations so we can scrub currentTime
  await page.evaluate(() => {
    document.getAnimations().forEach((a) => {
      a.pause()
    })
  })

  const frames = []
  for (let i = 0; i < FRAME_COUNT; i++) {
    const t = (i / FPS) * 1000
    await page.evaluate((ms) => {
      document.getAnimations().forEach((a) => {
        a.currentTime = ms
      })
    }, t)

    const png = await page.screenshot({ type: 'png' })
    const { data } = await sharp(png).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
    frames.push(rgbaToIndexed(data))
    process.stdout.write(`\rframe ${i + 1}/${FRAME_COUNT}`)
  }

  await browser.close()

  const gif = encodeGif(frames, WIDTH, HEIGHT, DELAY_CS)
  const out = 'public/videos/thermal-highway.gif'
  await writeFile(out, gif)
  console.log(`\nWrote ${out} (${(gif.byteLength / 1024).toFixed(1)} KB)`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

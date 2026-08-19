import { atlIconById, type AtlIconId } from '../components/AtlIcons'

/**
 * Coordinate tables for the ATL diagram.
 *
 * Everything positional lives here so AtlDiagram stays a renderer with no arithmetic in it.
 * Two layouts, one node set: the wide one runs the loop horizontally with buildings above and
 * resources below, the narrow one stands the same loop on end and interleaves the nodes down
 * either side. Same ids in both, so anything keyed by node id survives the switch.
 *
 * The two lanes inside the pill are the two long sides of one stadium — cool above the
 * name, heat below it — joined by the rounded caps. A pulse takes the riser to the near
 * edge of that circuit, walks the track clockwise (the same way the baseline circulation
 * is drawn), and takes the riser out. Same-side journeys that already sit clockwise stay
 * on the near edge; anything that would have to reverse goes the long way around a cap
 * instead. Nothing ever cuts through the name to reach a building. Heat and cool are a
 * colour, not a direction: both ride the same one-way loop.
 */

export type NodeKind = 'building' | 'resource'
export type LayoutId = 'wide' | 'narrow'
export type Thermal = 'heat' | 'cool'

export type PlacedNode = {
  id: AtlIconId
  kind: NodeKind
  /** Pre-uppercased, one entry per line. */
  lines: string[]
  /** Transform for the icon's 48-unit artboard. */
  x: number
  y: number
  scale: number
  /** Runs from the icon to just inside the pill; the pill is painted over the join. */
  riser: { x1: number; y1: number; x2: number; y2: number }
  /** The riser's outer end, where it meets the icon. Every pulse starts or finishes here. */
  tap: { x: number; y: number }
  labelAt: { x: number; y: number }
}

export type Layout = {
  id: LayoutId
  viewBox: string
  pill: { x: number; y: number; width: number; height: number; rx: number }
  /** Coordinates on the axis across the pill: y when it runs horizontally, x when vertically. */
  lanes: Record<Thermal, number>
  /**
   * The pulse circuit: a stadium whose long sides are the two lanes and whose caps sit
   * inside the pill's rounded ends. routeFor walks this rather than a chord between risers.
   */
  track: { x: number; y: number; width: number; height: number; rx: number }
  /** Which way the pill runs. Routing works in along/across terms so one rule serves both. */
  orientation: 'horizontal' | 'vertical'
  /** Where a lane starts and stops along the pill, held clear of its rounded ends. */
  laneSpan: { from: number; to: number }
  loopName: { x: number; y: number; transform?: string }
  riserWidth: number
  pillStroke: number
  loopNameSize: number
  labelSize: number
  /** Stroke width of a thermal pulse, and of the baseline circulation beneath it. */
  pulseWidth: number
  flowWidth: number
  /** How long a pulse should read, in diagram units. Held constant across routes. */
  pulseLength: number
  /**
   * Earth behind the borefield U-tubes. Neutral tan always. Mode 2's charge is a red or
   * blue glow around this patch — an ellipse plus blur, not a fill of the same rect.
   */
  ground: {
    x: number
    y: number
    width: number
    height: number
    rx: number
    glow: { cx: number; cy: number; rx: number; ry: number; blur: number }
  }
  nodes: PlacedNode[]
  nodeById: Record<AtlIconId, PlacedNode>
}

const LABELS: Record<AtlIconId, string[]> = {
  civic: ['CIVIC'],
  campus: ['CAMPUS'],
  housing: ['HOUSING'],
  hospital: ['HOSPITAL'],
  borefield: ['GEOEXCHANGE', 'BOREFIELD'],
  wastewater: ['WASTEWATER', 'EXCHANGER'],
  datacenter: ['DATA CENTER'],
}

const kindOf = (id: AtlIconId): NodeKind => (atlIconById[id].group === 'Buildings' ? 'building' : 'resource')

/**
 * Per-building multipliers against the layout's base scale, hinting at relative thermal
 * demand: a hospital runs hot around the clock, a campus is simply large, housing is the
 * lightest draw.
 *
 * The spread is deliberately lopsided. Nearly all of it comes from enlarging the hospital and
 * the campus, with housing barely below the civic baseline, because an earlier pass that took
 * housing down to 0.83 stopped reading as information and started reading as a mistake —
 * conspicuously small beside a full-size label, and worse once the narrow layout scaled it
 * down again. Growing the heavy loads keeps the ordering legible without making any building
 * look like an error. Resources are exempt; their size carries no meaning.
 */
const WEIGHT: Partial<Record<AtlIconId, number>> = {
  campus: 1.18,
  housing: 0.94,
  hospital: 1.24,
}

const weightFor = (id: AtlIconId) => WEIGHT[id] ?? 1

const byId = (nodes: PlacedNode[]) =>
  Object.fromEntries(nodes.map((n) => [n.id, n])) as Record<AtlIconId, PlacedNode>

/**
 * Earth patch in the icon's local 48-space: below the manifold bar, covering the U-tubes
 * with a little padding. Mode 2's glow is an ellipse centred on this patch, sized inside
 * it so a blur blooms past the tan rather than painting a second rounded square. Red and
 * blue overlays share this geometry; both at rest leaves the tan.
 */
function groundBehind(borefield: PlacedNode): Layout['ground'] {
  const s = borefield.scale
  const x = borefield.x + 1 * s
  const y = borefield.y + 9 * s
  const width = 46 * s
  const height = 38 * s
  return {
    x,
    y,
    width,
    height,
    rx: 6,
    glow: {
      cx: x + width / 2,
      cy: y + height / 2,
      rx: width * 0.42,
      ry: height * 0.46,
      blur: 0.18 * Math.min(width, height),
    },
  }
}

/** Stadium whose long sides are the two lanes and whose caps sit inside the pill's ends. */
function trackFrom(
  pill: Layout['pill'],
  lanes: Layout['lanes'],
  orientation: Layout['orientation'],
): Layout['track'] {
  if (orientation === 'horizontal') {
    const height = lanes.heat - lanes.cool
    const rx = height / 2
    const inset = pill.rx - rx
    return { x: pill.x + inset, y: lanes.cool, width: pill.width - 2 * inset, height, rx }
  }
  const width = lanes.heat - lanes.cool
  const rx = width / 2
  const inset = pill.rx - rx
  return { x: lanes.cool, y: pill.y + inset, width, height: pill.height - 2 * inset, rx }
}

// ── wide ───────────────────────────────────────────────────────────────────

const WIDE = {
  width: 900,
  height: 460,
  /**
   * Framing only. Every coordinate below is exactly where the plan puts it — pill at y227,
   * building bases at y195, resource tops at y305 — and this is just the window we look at
   * them through. The design canvas is 900x460, but the drawing's ink runs y64 to y414, so a
   * full-canvas viewBox spent 64 units of empty space above the labels. Cropping the window
   * removes that without moving anything. Do not read this as a departure from the plan's
   * geometry; nothing has been repositioned.
   */
  view: { x: 0, y: 56, width: 900, height: 372 },
  pill: { x: 40, y: 227, width: 820, height: 46, rx: 23 },
  lanes: { cool: 235, heat: 265 },
  /** Buildings stand on this line; varying their scale grows them upward from it. */
  baseY: 195,
  /** Resources hang from this line. */
  resourceTopY: 305,
  buildingScale: 2.3,
  resourceScale: 2.1,
  // Clears the tallest building — the hospital, which grows upward off the shared base line.
  buildingLabelY: 74,
  resourceLabelY: 400,
  buildings: [
    ['civic', 130],
    ['campus', 340],
    ['housing', 560],
    ['hospital', 770],
  ] as [AtlIconId, number][],
  // Offset into the gaps between the buildings above, so the distribution reads.
  resources: [
    ['borefield', 235],
    ['wastewater', 450],
    ['datacenter', 665],
  ] as [AtlIconId, number][],
}

export function layoutWide(): Layout {
  const { pill } = WIDE

  const buildings: PlacedNode[] = WIDE.buildings.map(([id, cx]) => {
    const scale = WIDE.buildingScale * weightFor(id)
    return {
      id,
      kind: 'building',
      lines: LABELS[id],
      x: cx - 24 * scale,
      y: WIDE.baseY - atlIconById[id].base * scale,
      scale,
      riser: { x1: cx, y1: WIDE.baseY - 8, x2: cx, y2: pill.y + 4 },
      tap: { x: cx, y: WIDE.baseY - 8 },
      labelAt: { x: cx, y: WIDE.buildingLabelY },
    }
  })

  const resources: PlacedNode[] = WIDE.resources.map(([id, cx]) => {
    const scale = WIDE.resourceScale
    return {
      id,
      kind: 'resource',
      lines: LABELS[id],
      x: cx - 24 * scale,
      y: WIDE.resourceTopY - atlIconById[id].top * scale,
      scale,
      riser: { x1: cx, y1: pill.y + pill.height - 4, x2: cx, y2: WIDE.resourceTopY + 6 },
      tap: { x: cx, y: WIDE.resourceTopY + 6 },
      labelAt: { x: cx, y: WIDE.resourceLabelY },
    }
  })

  const nodes = [...buildings, ...resources]

  return {
    id: 'wide',
    viewBox: `${WIDE.view.x} ${WIDE.view.y} ${WIDE.view.width} ${WIDE.view.height}`,
    pill,
    lanes: WIDE.lanes,
    track: trackFrom(pill, WIDE.lanes, 'horizontal'),
    orientation: 'horizontal',
    laneSpan: { from: pill.x + pill.rx, to: pill.x + pill.width - pill.rx },
    loopName: { x: WIDE.width / 2, y: 255 },
    riserWidth: 9,
    pillStroke: 3,
    loopNameSize: 12,
    labelSize: 10,
    pulseWidth: 7,
    flowWidth: 2.5,
    pulseLength: 52,
    ground: groundBehind(nodes.find((n) => n.id === 'borefield')!),
    nodes,
    nodeById: byId(nodes),
  }
}

// ── narrow ─────────────────────────────────────────────────────────────────

const NARROW = {
  width: 340,
  height: 560,
  /**
   * Framing only, as above — no node or pill coordinate moves. This layout carried about 40
   * units of slack on every side, and horizontally that was a quarter of the canvas, which on
   * a phone is width the icons should have had. Cropping scales the whole drawing up inside
   * the same container.
   */
  view: { x: 31, y: 28, width: 284, height: 510 },
  pill: { x: 147, y: 40, width: 46, height: 476, rx: 23 },
  lanes: { cool: 155, heat: 185 },
  buildingCx: 80,
  resourceCx: 260,
  scale: 1.4,
  /** Buildings and resources alternate down the spine, so consecutive icons never share a
   *  side and each side gets twice the vertical room. */
  order: ['civic', 'borefield', 'campus', 'wastewater', 'housing', 'datacenter', 'hospital'] as AtlIconId[],
  slots: [80, 146, 212, 278, 344, 410, 476],
}

export function layoutNarrow(): Layout {
  const { pill } = NARROW
  const centreY = pill.y + pill.height / 2

  const nodes: PlacedNode[] = NARROW.order.map((id, i) => {
    const kind = kindOf(id)
    const slotY = NARROW.slots[i]
    const scale = NARROW.scale * (kind === 'building' ? weightFor(id) : 1)
    const cx = kind === 'building' ? NARROW.buildingCx : NARROW.resourceCx
    // 20 rather than 24: the icons carry slack inside their artboard, and the riser
    // should meet the drawn mass instead of stopping short of it.
    const inkEdge = 20 * scale
    return {
      id,
      kind,
      lines: LABELS[id],
      x: cx - 24 * scale,
      y: slotY - 24 * scale,
      scale,
      riser:
        kind === 'building'
          ? { x1: cx + inkEdge, y1: slotY, x2: pill.x + 4, y2: slotY }
          : { x1: pill.x + pill.width - 4, y1: slotY, x2: cx - inkEdge, y2: slotY },
      tap: { x: kind === 'building' ? cx + inkEdge : cx - inkEdge, y: slotY },
      labelAt: { x: cx, y: slotY + 20 * scale + 13 },
    }
  })

  return {
    id: 'narrow',
    viewBox: `${NARROW.view.x} ${NARROW.view.y} ${NARROW.view.width} ${NARROW.view.height}`,
    pill,
    lanes: NARROW.lanes,
    track: trackFrom(pill, NARROW.lanes, 'vertical'),
    orientation: 'vertical',
    laneSpan: { from: pill.y + pill.rx, to: pill.y + pill.height - pill.rx },
    loopName: {
      x: pill.x + pill.width / 2,
      y: centreY + 5,
      transform: `rotate(-90 ${pill.x + pill.width / 2} ${centreY})`,
    },
    riserWidth: 7,
    pillStroke: 3,
    loopNameSize: 11,
    labelSize: 9,
    pulseWidth: 5.5,
    flowWidth: 2,
    // Shorter than the wide layout's 52 in absolute terms, but a similar fraction of the
    // journeys here, which are about half as long.
    pulseLength: 34,
    ground: groundBehind(nodes.find((n) => n.id === 'borefield')!),
    nodes,
    nodeById: byId(nodes),
  }
}

export const layoutFor = (id: LayoutId) => (id === 'wide' ? layoutWide() : layoutNarrow())

// ── routing ────────────────────────────────────────────────────────────────

export type Route = {
  /** Riser out of the source, a run around the track, riser into the destination. */
  d: string
  /**
   * Length in diagram units. Not needed to draw the route — the path is normalised to
   * pathLength 100 — but the mode data authors durations against it so every pulse crosses
   * the drawing at roughly one speed, and AtlDiagram divides by it to keep every comet the
   * same physical length whether it hops next door or crosses the whole loop.
   */
  length: number
  /**
   * 0–1 along the path where the destination riser begins — the pulse leaving the loop
   * and dropping into the destination node. Mode 2's earth glow keys off this so the
   * ground does not change colour until a dash actually enters the borefield.
   */
  destEntry: number
}

type Pt = { x: number; y: number }
type Track = Layout['track']

/** Radius where a riser turns onto the track. */
const TURN = 10
/** Arc length of the quadratic quarter-turn below, for legs of 1. */
const TURN_ARC = 1.4789

const round = (n: number) => Math.round(n * 100) / 100
const pt = (p: Pt) => `${round(p.x)} ${round(p.y)}`

function hypot(a: Pt, b: Pt) {
  return Math.hypot(b.x - a.x, b.y - a.y)
}

/** Point a given distance from `from` toward `to`. */
function toward(from: Pt, to: Pt, dist: number): Pt {
  const len = hypot(from, to) || 1
  const k = dist / len
  return { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k }
}

/**
 * Where a node's riser meets the track: buildings on the near long side, resources on the
 * far one. The pulse never crosses the interior to get there; opposite-side journeys go
 * around a cap instead.
 */
function joinOf(node: PlacedNode, track: Track, orientation: Layout['orientation']): Pt {
  if (orientation === 'horizontal') {
    return node.kind === 'building'
      ? { x: node.tap.x, y: track.y }
      : { x: node.tap.x, y: track.y + track.height }
  }
  return node.kind === 'building'
    ? { x: track.x, y: node.tap.y }
    : { x: track.x + track.width, y: node.tap.y }
}

/** Clockwise stadium: two longs, two caps. `side` is 0 when the track is itself a pill. */
function stadium(t: Track) {
  const { x, y, width: w, height: h, rx } = t
  const long = w - 2 * rx
  const side = h - 2 * rx
  const arc = (Math.PI / 2) * rx
  const perim = 2 * long + 2 * side + 4 * arc
  // Cumulative s at the end of each of the eight segments, clockwise from the left of the
  // top straight. Zero-length sides (a true stadium) are kept so the index math is stable.
  const ends = [
    long,
    long + arc,
    long + arc + side,
    long + 2 * arc + side,
    2 * long + 2 * arc + side,
    2 * long + 3 * arc + side,
    2 * long + 3 * arc + 2 * side,
    perim,
  ]
  return { x, y, w, h, rx, long, side, arc, perim, ends }
}

type Stadium = ReturnType<typeof stadium>

function wrapS(s: number, perim: number) {
  return ((s % perim) + perim) % perim
}

function atS(t: Stadium, s: number): Pt {
  const { x, y, w, h, rx, long, side, arc, perim } = t
  s = wrapS(s, perim)
  if (s <= long) return { x: x + rx + s, y }
  s -= long
  if (s <= arc) {
    const a = -Math.PI / 2 + (s / arc) * (Math.PI / 2)
    return { x: x + w - rx + rx * Math.cos(a), y: y + rx + rx * Math.sin(a) }
  }
  s -= arc
  if (s <= side) return { x: x + w, y: y + rx + s }
  s -= side
  if (s <= arc) {
    const a = (s / arc) * (Math.PI / 2)
    return { x: x + w - rx + rx * Math.cos(a), y: y + h - rx + rx * Math.sin(a) }
  }
  s -= arc
  if (s <= long) return { x: x + w - rx - s, y: y + h }
  s -= long
  if (s <= arc) {
    const a = Math.PI / 2 + (s / arc) * (Math.PI / 2)
    return { x: x + rx + rx * Math.cos(a), y: y + h - rx + rx * Math.sin(a) }
  }
  s -= arc
  if (s <= side) return { x, y: y + h - rx - s }
  s -= side
  const a = Math.PI + (s / arc) * (Math.PI / 2)
  return { x: x + rx + rx * Math.cos(a), y: y + rx + rx * Math.sin(a) }
}

/** Project a point already on the track to its clockwise arc length. */
function sOf(t: Stadium, p: Pt) {
  const { x, y, w, h, rx, long, side, arc } = t
  const distTop = Math.abs(p.y - y)
  const distRight = Math.abs(p.x - (x + w))
  const distBottom = Math.abs(p.y - (y + h))
  const distLeft = Math.abs(p.x - x)
  const nearest = Math.min(distTop, distRight, distBottom, distLeft)
  if (nearest === distTop) return Math.min(Math.max(p.x - (x + rx), 0), long)
  if (nearest === distRight) return long + arc + Math.min(Math.max(p.y - (y + rx), 0), side)
  if (nearest === distBottom) {
    return long + arc + side + arc + Math.min(Math.max(x + w - rx - p.x, 0), long)
  }
  return long + 2 * arc + side + long + arc + Math.min(Math.max(y + h - rx - p.y, 0), side)
}

function segIndex(t: Stadium, s: number) {
  s = wrapS(s, t.perim)
  for (let i = 0; i < t.ends.length; i++) {
    const start = i === 0 ? 0 : t.ends[i - 1]
    if (t.ends[i] - start < 1e-6) continue
    if (s < t.ends[i] - 1e-9) return i
  }
  return 7
}

function isArc(i: number) {
  return i % 2 === 1
}

/**
 * Walks the stadium from sFrom to sTo. Continuation only — the caller has already moved
 * the pen to atS(sFrom). Clockwise uses SVG sweep 1, the other way sweep 0.
 */
function walkTrack(t: Stadium, sFrom: number, sTo: number, cw: boolean) {
  const dist = cw ? wrapS(sTo - sFrom, t.perim) : wrapS(sFrom - sTo, t.perim)
  if (dist < 0.01) return { d: '', length: 0 }

  const parts: string[] = []
  let s = wrapS(sFrom, t.perim)
  let left = dist
  const step = cw ? 1 : -1
  let guard = 0

  while (left > 0.01 && guard++ < 12) {
    const i = segIndex(t, cw ? s : wrapS(s - 1e-6, t.perim))
    const start = i === 0 ? 0 : t.ends[i - 1]
    const end = t.ends[i]
    const room = cw ? Math.max(0, end - s) : Math.max(0, s - start)
    if (room <= 1e-6) {
      s = wrapS(s + step * 1e-4, t.perim)
      continue
    }
    const take = Math.min(left, room)
    const next = wrapS(s + step * take, t.perim)
    const p = atS(t, next)
    if (isArc(i)) {
      parts.push(`A${round(t.rx)} ${round(t.rx)} 0 0 ${cw ? 1 : 0} ${pt(p)}`)
    } else {
      parts.push(`L${pt(p)}`)
    }
    s = next
    left -= take
  }

  return { d: parts.join(' '), length: dist }
}

/** Closed stadium, for the baseline circulation that runs even when no pulse is riding it. */
export function trackPath(layout: Layout) {
  const { x, y, width: w, height: h, rx } = layout.track
  return [
    `M${round(x + rx)} ${round(y)}`,
    `H${round(x + w - rx)}`,
    `A${round(rx)} ${round(rx)} 0 0 1 ${round(x + w)} ${round(y + rx)}`,
    `V${round(y + h - rx)}`,
    `A${round(rx)} ${round(rx)} 0 0 1 ${round(x + w - rx)} ${round(y + h)}`,
    `H${round(x + rx)}`,
    `A${round(rx)} ${round(rx)} 0 0 1 ${round(x)} ${round(y + h - rx)}`,
    `V${round(y + rx)}`,
    `A${round(rx)} ${round(rx)} 0 0 1 ${round(x + rx)} ${round(y)}`,
  ].join(' ')
}

/**
 * Composes the path a pulse follows: riser onto the track, clockwise around it, riser
 * off. Same-side journeys that are already clockwise stay on the near edge and never cut
 * through the name; anything that would reverse against the loop goes the long way around
 * a cap. Heat and cool share this circuit with the water — colour is applied by the
 * renderer, not by walking the other way.
 */
export function routeFor(from: AtlIconId, to: AtlIconId, layout: Layout): Route {
  const src = layout.nodeById[from]
  const dst = layout.nodeById[to]
  const t = stadium(layout.track)
  const joinA = joinOf(src, layout.track, layout.orientation)
  const joinB = joinOf(dst, layout.track, layout.orientation)

  const sA = sOf(t, joinA)
  const sB = sOf(t, joinB)
  const around = wrapS(sB - sA, t.perim)

  const riserA = hypot(src.tap, joinA)
  const riserB = hypot(dst.tap, joinB)
  const r = Math.min(TURN, around / 2, riserA, riserB)

  if (r < 1.5) {
    const d = `M${pt(src.tap)} L${pt(joinA)} ${walkTrack(t, sA, sB, true).d} L${pt(dst.tap)}`
    const length = riserA + around + riserB
    return { d, length, destEntry: length > 0 ? (riserA + around) / length : 1 }
  }

  const sLand = wrapS(sA + r, t.perim)
  const sLeave = wrapS(sB - r, t.perim)
  const mid = walkTrack(t, sLand, sLeave, true)

  const d = [
    `M${pt(src.tap)}`,
    `L${pt(toward(src.tap, joinA, riserA - r))}`,
    `Q${pt(joinA)} ${pt(atS(t, sLand))}`,
    mid.d,
    `Q${pt(joinB)} ${pt(toward(dst.tap, joinB, riserB - r))}`,
    `L${pt(dst.tap)}`,
  ]
    .filter(Boolean)
    .join(' ')

  const destLen = TURN_ARC * r + (riserB - r)
  const length = riserA - r + TURN_ARC * r + mid.length + destLen
  const destEntry = length > 0 ? Math.max(0, 1 - destLen / length) : 1

  return { d, length, destEntry }
}

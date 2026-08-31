import { useId, type CSSProperties } from 'react'
import { atlIconById, type AtlIconId } from './AtlIcons'
import {
  atlModes,
  defaultAtlMode,
  groundChargeFor,
  loadSharingArrivalGlow,
  loadSharingSourceGlow,
  nodeChargeFor,
  PROCESS_DATACENTER_INITIAL,
  processBuildingChargeFor,
  processDatacenterDischargeGlow,
  type AtlMode,
  type GroundGlow,
  type Pulse,
} from '../content/atlModes'
import { layoutFor, routeFor, trackPath, type Layout, type LayoutId } from '../lib/atl-geometry'
import { useMediaQuery } from '../lib/hooks'

/** Every icon that can take a soft heat/cool bloom behind it. */
const GLOW_NODES: AtlIconId[] = [
  'civic',
  'campus',
  'housing',
  'hospital',
  'borefield',
  'wastewater',
  'datacenter',
]

/**
 * The ATL scene: one shared loop drawn as the schematic's white pill, four buildings tapped
 * into it from above and three distributed resources from below, with thermal pulses running
 * between them.
 *
 * SVG only — no prose, no hex. Every colour arrives as a Tailwind utility built from the
 * --color-atl-* tokens, and nothing static is red or blue, because those two mean thermal
 * energy here and a static object wearing either would be mistaken for a pulse.
 *
 * All arithmetic lives in atl-geometry; this walks the node table and paints it.
 */

/** Inline custom properties are how per-pulse dash maths reaches the shared keyframe. */
type PulseStyle = CSSProperties & Record<`--${string}`, string>

/**
 * Turns one authored pulse into the dash geometry .atl-pulse animates.
 *
 * `dash` is the comet, expressed as a percentage of the route because the path is normalised
 * to pathLength 100. Dividing the layout's target length by the route's real length keeps
 * every comet the same size on screen however far it travels.
 *
 * Delay lives in the keyframe, not in animation-delay: CSS only waits before the first
 * iteration, so a 3s heat phase would fire at t=0 on every loop after the first. The
 * keyframe holds the comet off-path until `delay`, travels 0 → -(100 + dash) over
 * `duration` (tail just left the destination), then holds it off-path until the cycle
 * restarts. `gap` is just wide enough that a second dash cannot wrap onto the path.
 */
function pulseStyle(dash: number, cycleMs: number, kf: string): PulseStyle {
  // Units are load-bearing rather than decorative here; see the @property block in index.css.
  return {
    '--atl-pulse-dash': `${dash.toFixed(2)}px`,
    '--atl-pulse-gap': `${(100 + dash).toFixed(2)}px`,
    animationName: kf,
    animationDuration: `${cycleMs}ms`,
  }
}

function pulseKeyframes(name: string, delay: number, duration: number, cycle: number) {
  const start = (delay / cycle) * 100
  const end = Math.min(((delay + duration) / cycle) * 100, 99.9)
  const holdUntil = Math.max(0, start - 0.08)
  const gone = Math.min(end + 0.08, 99.96)
  const off = 'var(--atl-pulse-dash)'
  const onPath = '0px'
  const left = 'calc(-1 * (100px + var(--atl-pulse-dash)))'

  if (start < 0.05) {
    return `@keyframes ${name} {
      0% { stroke-dashoffset: ${onPath}; }
      ${end.toFixed(2)}% { stroke-dashoffset: ${left}; }
      ${gone.toFixed(2)}%, 100% { stroke-dashoffset: ${off}; }
    }`
  }
  return `@keyframes ${name} {
    0%, ${holdUntil.toFixed(2)}% { stroke-dashoffset: ${off}; }
    ${start.toFixed(2)}% { stroke-dashoffset: ${onPath}; }
    ${end.toFixed(2)}% { stroke-dashoffset: ${left}; }
    ${gone.toFixed(2)}%, 100% { stroke-dashoffset: ${off}; }
  }`
}

function pulseMotion(mode: AtlMode, uid: string) {
  const cycle = mode.cycleMs / 1000
  const safe = uid.replace(/[^a-zA-Z0-9_-]/g, '')
  const groups = new Map<string, { kf: string; css: string }>()
  for (const p of mode.pulses) {
    const key = `${Math.round(p.delay * 100)}-${Math.round(p.duration * 100)}`
    if (groups.has(key)) continue
    const kf = `atlP-${safe}-${key}`
    groups.set(key, { kf, css: pulseKeyframes(kf, p.delay, p.duration, cycle) })
  }
  return {
    css: [...groups.values()].map((g) => g.css).join('\n'),
    kfFor: (delay: number, duration: number) =>
      groups.get(`${Math.round(delay * 100)}-${Math.round(duration * 100)}`)!.kf,
  }
}

function Pulses({
  mode,
  layout,
  kfFor,
}: {
  mode: AtlMode
  layout: Layout
  kfFor: (delay: number, duration: number) => string
}) {
  return (
    <g fill="none" strokeWidth={layout.pulseWidth} strokeLinecap="round" strokeLinejoin="round">
      {mode.pulses.map((p, i) => {
        const route = routeFor(p.from, p.to, layout)
        const dash = (layout.pulseLength / route.length) * 100
        return (
          <path
            // Keyed by mode so switching modes remounts the paths and every animation
            // restarts together at zero rather than resuming mid-flight.
            key={`${mode.id}-${i}`}
            className={`atl-pulse ${p.thermal === 'heat' ? 'stroke-atl-heat' : 'stroke-atl-cool'}`}
            d={route.d}
            pathLength={100}
            style={pulseStyle(dash, mode.cycleMs, kfFor(p.delay, p.duration))}
          />
        )
      })}
    </g>
  )
}

/**
 * Soft red/blue blooms behind nodes as pulses arrive (or, for Mode 2's ground
 * and Waste heat's data center, as charges enter / leave).
 *
 * Ground colour steps come from groundChargeFor — timed on destEntry so the
 * earth brightens as a dash leaves the loop into the borefield. Building and
 * resource arrival blooms wait for destArrival (path end) so the glow does not
 * fire while the comet is still climbing the riser. Waste heat's data center
 * starts dark red and steps down / into blue on each sourceExit. A short ease
 * at each step keeps the change from popping.
 */
type GlowStop = { at: number; opacity: number; ease?: boolean }

const GLOW_FADE = 0.32
const GLOW_LOOP_FADE = 0.6

function pulseAtFraction(p: Pulse, layout: Layout, pick: (route: ReturnType<typeof routeFor>) => number) {
  const route = routeFor(p.from, p.to, layout)
  const dash = (layout.pulseLength / route.length) * 100
  return p.delay + p.duration * ((pick(route) * 100) / (100 + dash))
}

function pulseDestEntry(p: Pulse, layout: Layout) {
  return pulseAtFraction(p, layout, (r) => r.destEntry)
}

/** Head of the comet reaches the destination tap — when it enters the building/resource. */
function pulseDestArrival(p: Pulse, layout: Layout) {
  return pulseAtFraction(p, layout, () => 1)
}

function pulseSourceExit(p: Pulse, layout: Layout) {
  return pulseAtFraction(p, layout, (r) => r.sourceExit)
}

function pushHold(stops: GlowStop[], at: number, from: number, to: number) {
  if (from === to) return
  stops.push({ at, opacity: from, ease: true })
  stops.push({ at: at + GLOW_FADE, opacity: to })
}

function closeGlowLoop(stops: GlowStop[], opacity: number, cycle: number) {
  if (opacity > 0) {
    stops.push({ at: cycle - GLOW_LOOP_FADE, opacity, ease: true })
    stops.push({ at: cycle, opacity: 0 })
  } else {
    stops.push({ at: cycle, opacity: 0 })
  }
}

function glowStopsFromSteps(
  arrivals: number[],
  charge: GroundGlow[],
  cycle: number,
  initial: GroundGlow = { heat: 0, cool: 0 },
) {
  if (!arrivals.length) return null

  // Apply steps in time order so authored pulse order can differ from arrival order.
  const paired = arrivals
    .map((at, i) => ({ at, next: charge[i]! }))
    .sort((a, b) => a.at - b.at)

  const heat: GlowStop[] = [{ at: 0, opacity: initial.heat }]
  const cool: GlowStop[] = [{ at: 0, opacity: initial.cool }]
  let heatOp = initial.heat
  let coolOp = initial.cool

  for (const { at, next } of paired) {
    pushHold(heat, at, heatOp, next.heat)
    heatOp = next.heat
    pushHold(cool, at, coolOp, next.cool)
    coolOp = next.cool
  }

  closeGlowLoop(heat, heatOp, cycle)
  closeGlowLoop(cool, coolOp, cycle)

  return { heat, cool }
}

function groundGlowStops(mode: AtlMode, layout: Layout) {
  const cycle = mode.cycleMs / 1000
  const charge = groundChargeFor(mode.pulses)
  if (!charge.length) return null
  const stores = mode.pulses.some((p) => p.to === 'borefield')
  const events = mode.pulses.flatMap((p) => {
    if (p.to === 'borefield') return [pulseDestEntry(p, layout)]
    if (stores && p.from === 'borefield') return [pulseSourceExit(p, layout)]
    return []
  })
  if (events.length !== charge.length) return null
  return glowStopsFromSteps(events, charge, cycle)
}

function nodeArrivalGlowStops(mode: AtlMode, layout: Layout, node: AtlIconId) {
  const cycle = mode.cycleMs / 1000
  const destined = mode.pulses.filter((p) => p.to === node)
  if (!destined.length) return null
  // Charge ladder must follow arrival time, not authored pulse order.
  const timed = destined
    .map((p) => ({ p, at: pulseDestArrival(p, layout) }))
    .sort((a, b) => a.at - b.at || a.p.delay - b.p.delay)
  const ordered = timed.map((t) => t.p)
  const charge =
    mode.id === 'process-energy'
      ? processBuildingChargeFor(ordered, node)
      : nodeChargeFor(ordered, node)
  if (!charge.length) return null
  const arrivals = timed.map((t) => t.at)
  if (arrivals.length !== charge.length) return null
  return glowStopsFromSteps(arrivals, charge, cycle)
}

function glowKeyframes(name: string, stops: GlowStop[], cycle: number) {
  const pct = (t: number) => ((Math.min(Math.max(t, 0), cycle) / cycle) * 100).toFixed(2)
  const frames = stops
    .map((s) => {
      const ease = s.ease ? ' animation-timing-function: ease;' : ''
      return `      ${pct(s.at)}% { opacity: ${s.opacity};${ease} }`
    })
    .join('\n')
  return `@keyframes ${name} {\n${frames}\n    }`
}

function pairGlowCss(
  prefix: string,
  stops: { heat: GlowStop[]; cool: GlowStop[] },
  cycle: number,
) {
  const heat = `${prefix}-heat`
  const cool = `${prefix}-cool`
  return {
    heat,
    cool,
    initialHeat: stops.heat[0]?.opacity ?? 0,
    initialCool: stops.cool[0]?.opacity ?? 0,
    css: `${glowKeyframes(heat, stops.heat, cycle)}\n${glowKeyframes(cool, stops.cool, cycle)}`,
  }
}

type NodeGlowCss = {
  node: AtlIconId
  heat: string
  cool: string
  initialHeat: number
  initialCool: number
  css: string
}

function groundChargeCss(mode: AtlMode, uid: string, layout: Layout) {
  // Mode 2 owns the earth store/discharge ladder. Other modes that send into
  // the borefield use the shared node-arrival bloom instead.
  if (mode.id !== 'ground-battery') return null
  const g = groundGlowStops(mode, layout)
  if (!g) return null
  const cycle = mode.cycleMs / 1000
  const safe = `${mode.id}-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`
  return pairGlowCss(`atlGround-${safe}`, g, cycle)
}

/** Waste heat: data center holds dark red, then steps down / into blue as heat leaves. */
function processDatacenterGlowStops(mode: AtlMode, layout: Layout) {
  if (mode.id !== 'process-energy') return null
  const cycle = mode.cycleMs / 1000
  const charge = processDatacenterDischargeGlow()
  const exits = mode.pulses
    .filter((p) => p.from === 'datacenter')
    .map((p) => pulseSourceExit(p, layout))
  if (exits.length !== charge.length) return null
  return glowStopsFromSteps(exits, charge, cycle, PROCESS_DATACENTER_INITIAL)
}

/**
 * Energy sharing: sources start charged and clear as the pulse leaves; destinations
 * take a medium glow of the arriving colour when the comet enters. A node can be
 * either, both, or only a destination.
 */
function loadSharingNodeGlowStops(mode: AtlMode, layout: Layout, node: AtlIconId) {
  if (mode.id !== 'load-sharing') return null
  const cycle = mode.cycleMs / 1000
  const spec = loadSharingSourceGlow(node)
  const events: { at: number; next: GroundGlow }[] = []

  for (const p of mode.pulses) {
    if (p.from === node) {
      events.push({ at: pulseSourceExit(p, layout), next: { heat: 0, cool: 0 } })
    }
    if (p.to === node) {
      events.push({ at: pulseDestArrival(p, layout), next: loadSharingArrivalGlow(p.thermal) })
    }
  }

  if (!events.length) return null
  events.sort((a, b) => a.at - b.at)

  return glowStopsFromSteps(
    events.map((e) => e.at),
    events.map((e) => e.next),
    cycle,
    spec?.initial ?? { heat: 0, cool: 0 },
  )
}

/**
 * Arrival blooms for every destination, plus authored source-discharge blooms.
 * Borefield store/discharge on Mode 2 stays on the earth patch via groundChargeCss.
 */
function nodeArrivalGlowCss(mode: AtlMode, uid: string, layout: Layout): NodeGlowCss[] {
  const cycle = mode.cycleMs / 1000
  const safe = `${mode.id}-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const out: NodeGlowCss[] = []
  const claimed = new Set<AtlIconId>()

  for (const node of GLOW_NODES) {
    if (node === 'borefield' && mode.id === 'ground-battery') continue
    // Source-discharge modes drive these nodes from exits, not arrivals.
    if (node === 'datacenter' && mode.id === 'process-energy') continue
    // Energy sharing owns the full source + arrival timeline for its buildings.
    if (mode.id === 'load-sharing') continue

    const g = nodeArrivalGlowStops(mode, layout, node)
    if (!g) continue
    const pair = pairGlowCss(`atlNode-${safe}-${node}`, g, cycle)
    out.push({ node, ...pair })
    claimed.add(node)
  }

  const processDc = processDatacenterGlowStops(mode, layout)
  if (processDc) {
    const pair = pairGlowCss(`atlNode-${safe}-datacenter`, processDc, cycle)
    out.push({ node: 'datacenter', ...pair })
    claimed.add('datacenter')
  }

  if (mode.id === 'load-sharing') {
    for (const node of GLOW_NODES) {
      const g = loadSharingNodeGlowStops(mode, layout, node)
      if (!g) continue
      const pair = pairGlowCss(`atlNode-${safe}-${node}`, g, cycle)
      out.push({ node, ...pair })
    }
  }

  return out
}

function GlowEllipse({
  kf,
  cycleMs,
  className,
  glow,
  filterId,
  initialOpacity = 0,
}: {
  kf: string
  cycleMs: number
  className: string
  glow: { cx: number; cy: number; rx: number; ry: number }
  filterId: string
  /** First-frame opacity so charged sources show before the keyframe attaches. */
  initialOpacity?: number
}) {
  return (
    <ellipse
      className={className}
      cx={glow.cx}
      cy={glow.cy}
      rx={glow.rx}
      ry={glow.ry}
      filter={`url(#${filterId})`}
      style={{
        opacity: initialOpacity,
        animationName: kf,
        animationDuration: `${cycleMs}ms`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationFillMode: 'both',
      }}
    />
  )
}

function glowGeomFor(layout: Layout, node: AtlIconId) {
  if (node === 'borefield') return layout.ground.glow
  return layout.nodeGlow[node]
}

export default function AtlDiagram({
  modeId,
  layout,
  className = '',
}: {
  /** Driven by the tablist. Defaults to the first mode. */
  modeId?: string
  /** Forces a layout instead of choosing on viewport width. Used by the review page. */
  layout?: LayoutId
  className?: string
}) {
  const uid = useId()
  const safeUid = uid.replace(/[^a-zA-Z0-9_-]/g, '')
  const isWide = useMediaQuery('(min-width: 768px)')
  const L = layoutFor(layout ?? (isWide ? 'wide' : 'narrow'))
  const mode = atlModes.find((m) => m.id === modeId) ?? defaultAtlMode
  const charge = groundChargeCss(mode, uid, L)
  const nodeGlows = nodeArrivalGlowCss(mode, uid, L)
  const motion = pulseMotion(mode, uid)
  const glowFilters = new Map<string, number>()
  if (charge) glowFilters.set('borefield', L.ground.glow.blur)
  for (const g of nodeGlows) {
    if (!glowFilters.has(g.node)) glowFilters.set(g.node, glowGeomFor(L, g.node).blur)
  }

  return (
    <>
      {charge && <style key={`ground-${mode.id}`}>{charge.css}</style>}
      {nodeGlows.map((g) => (
        <style key={`node-${mode.id}-${g.node}`}>{g.css}</style>
      ))}
      {motion.css && <style key={`pulses-${mode.id}`}>{motion.css}</style>}
      <svg
        viewBox={L.viewBox}
        className={`w-full ${className}`}
        role="img"
        aria-labelledby={`${uid}-title ${uid}-desc`}
      >
      <title id={`${uid}-title`}>{mode.title}</title>
      <desc id={`${uid}-desc`}>
        A single shared ambient temperature loop, drawn as a long rounded bar. Four buildings — a civic building, a
        campus, housing and a hospital — connect into it from above. Three distributed thermal resources — a
        geoexchange borefield, a wastewater heat exchanger and a data center — connect into it from below.{' '}
        {mode.desc}
      </desc>

      {/* Neutral earth, then charged glows. Both sit behind the U-tubes so the borefield
          still reads as pipe in the ground; the charge is a bloom, not a second fill.
          Red and blue are separate overlays so the pass through tan is a gap, not a mix. */}
      <rect
        className="fill-atl-ground"
        x={L.ground.x}
        y={L.ground.y}
        width={L.ground.width}
        height={L.ground.height}
        rx={L.ground.rx}
      />
      {glowFilters.size > 0 && (
        <defs>
          {[...glowFilters.entries()].map(([node, blur]) => (
            <filter
              key={node}
              id={`${safeUid}-glow-${node}`}
              x="-120%"
              y="-120%"
              width="340%"
              height="340%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          ))}
        </defs>
      )}
      {charge && (
        <g key={`ground-${mode.id}`}>
          <GlowEllipse
            kf={charge.heat}
            cycleMs={mode.cycleMs}
            className="atl-node-glow atl-ground-glow atl-ground-hot fill-atl-heat"
            glow={L.ground.glow}
            filterId={`${safeUid}-glow-borefield`}
            initialOpacity={charge.initialHeat}
          />
          <GlowEllipse
            kf={charge.cool}
            cycleMs={mode.cycleMs}
            className="atl-node-glow atl-ground-glow atl-ground-cool fill-atl-cool"
            glow={L.ground.glow}
            filterId={`${safeUid}-glow-borefield`}
            initialOpacity={charge.initialCool}
          />
        </g>
      )}

      {/* Soft heat/cool blooms behind buildings and resources as pulses arrive
          (or leave the data center in Waste heat). */}
      {nodeGlows.map((g) => {
        const geom = glowGeomFor(L, g.node)
        const hotClass =
          g.node === 'housing' ? 'atl-housing-glow atl-housing-hot' : 'atl-node-hot'
        const coolClass =
          g.node === 'housing' ? 'atl-housing-glow atl-housing-cool' : 'atl-node-cool'
        return (
          <g key={`node-${mode.id}-${g.node}`}>
            <GlowEllipse
              kf={g.heat}
              cycleMs={mode.cycleMs}
              className={`atl-node-glow ${hotClass} fill-atl-heat`}
              glow={geom}
              filterId={`${safeUid}-glow-${g.node}`}
              initialOpacity={g.initialHeat}
            />
            <GlowEllipse
              kf={g.cool}
              cycleMs={mode.cycleMs}
              className={`atl-node-glow ${coolClass} fill-atl-cool`}
              glow={geom}
              filterId={`${safeUid}-glow-${g.node}`}
              initialOpacity={g.initialCool}
            />
          </g>
        )
      })}

      {/* Risers first: the pill is painted over them, which hides every join without needing
          the pipe to stop at an exact tangent. */}
      <g className="stroke-atl-pipe" strokeWidth={L.riserWidth}>
        {L.nodes.map((n) => (
          <line key={n.id} x1={n.riser.x1} y1={n.riser.y1} x2={n.riser.x2} y2={n.riser.y2} />
        ))}
      </g>

      <rect
        className="fill-atl-surface stroke-atl-pill-outline"
        x={L.pill.x}
        y={L.pill.y}
        width={L.pill.width}
        height={L.pill.height}
        rx={L.pill.rx}
        strokeWidth={L.pillStroke}
      />

      {/* Baseline circulation around the pill as a closed stadium, so the loop reads as a
          circuit even between pulses. Same stroke-dashoffset idiom as ThermalHighway, and
          reusing its `flow` keyframe: the dash period of 40 divides that 120-unit travel
          exactly, so it repeats without a jump. One-way, matching the clockwise track and
          the thermal pulses that ride it — heat and cool are colour, not a second current. */}
      <g className="stroke-atl-flow" fill="none" strokeWidth={L.flowWidth} strokeDasharray="12 28">
        <path className="atl-flow" d={trackPath(L)} style={{ animation: 'flow 4.5s linear infinite' }} />
      </g>

      {L.nodes.map((n) => {
        const { Icon } = atlIconById[n.id]
        return (
          <g key={n.id} transform={`translate(${n.x} ${n.y}) scale(${n.scale})`}>
            <Icon />
          </g>
        )
      })}

      {/* Above the icons, so a pulse runs the full length of its riser and meets the building
          rather than disappearing behind its base. */}
      <Pulses mode={mode} layout={L} kfFor={motion.kfFor} />

      {/* Last, so it stays legible. Same-side pulses ride the near edge and clear the name;
          opposite-side ones go around a cap. Painting the lettering above the comets still
          costs less than a pulse that happened to clip a glyph. */}
      <text
        className="fill-atl-outline font-body"
        x={L.loopName.x}
        y={L.loopName.y}
        transform={L.loopName.transform}
        textAnchor="middle"
        fontSize={L.loopNameSize}
        letterSpacing={2.2}
      >
        AMBIENT TEMPERATURE LOOP
      </text>

      <g className="fill-atl-outline font-body" fontSize={L.labelSize} letterSpacing={1.5} textAnchor="middle">
        {L.nodes.map((n) => (
          <text key={n.id} x={n.labelAt.x} y={n.labelAt.y}>
            {n.lines.map((line, i) => (
              <tspan key={line} x={n.labelAt.x} dy={i === 0 ? 0 : L.labelSize + 2}>
                {line}
              </tspan>
            ))}
          </text>
        ))}
      </g>
    </svg>
    </>
  )
}

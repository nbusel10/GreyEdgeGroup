import { useId, type CSSProperties } from 'react'
import { atlIconById } from './AtlIcons'
import { atlModes, defaultAtlMode, groundChargeFor, type AtlMode, type Pulse } from '../content/atlModes'
import { layoutFor, routeFor, trackPath, type Layout, type LayoutId } from '../lib/atl-geometry'
import { useMediaQuery } from '../lib/hooks'

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
 * Mode 2's charged earth: red and blue glows around the borefield. Two overlays rather
 * than one fill, so the pass through the earth's own tan is a real gap and not a purple
 * mix of heat into cool.
 *
 * Colour at each step comes from groundChargeFor — three red opacities, then a walk
 * back through tan to blue. Timing is pulse arrival, not a colour clock. A dash
 * "enters the borefield" when its head reaches the destination riser — destEntry
 * along the route, adjusted for the comet length the keyframe is travelling. The
 * ground holds that step until the next dash arrives; a short ease at arrival keeps
 * the step from popping.
 */
type GroundGlowStop = { at: number; opacity: number; ease?: boolean }

const GROUND_FADE = 0.32
const GROUND_LOOP_FADE = 0.6

function pulseBorefieldEntry(p: Pulse, layout: Layout) {
  const route = routeFor(p.from, p.to, layout)
  const dash = (layout.pulseLength / route.length) * 100
  return p.delay + p.duration * ((route.destEntry * 100) / (100 + dash))
}

function pushHold(stops: GroundGlowStop[], at: number, from: number, to: number) {
  if (from === to) return
  stops.push({ at, opacity: from, ease: true })
  stops.push({ at: at + GROUND_FADE, opacity: to })
}

function glowStopsFromArrivals(mode: AtlMode, layout: Layout) {
  const cycle = mode.cycleMs / 1000
  const arrivals = mode.pulses
    .filter((p) => p.to === 'borefield')
    .map((p) => pulseBorefieldEntry(p, layout))
  const charge = groundChargeFor(mode.pulses)
  if (!arrivals.length) return null

  const heat: GroundGlowStop[] = [{ at: 0, opacity: 0 }]
  const cool: GroundGlowStop[] = [{ at: 0, opacity: 0 }]
  let heatOp = 0
  let coolOp = 0

  for (let i = 0; i < arrivals.length; i++) {
    const next = charge[i]!
    pushHold(heat, arrivals[i]!, heatOp, next.heat)
    heatOp = next.heat
    pushHold(cool, arrivals[i]!, coolOp, next.cool)
    coolOp = next.cool
  }

  // Close the loop at tan so the next pass can start from the earth's own colour
  // and the first heat train can climb the red ladder again.
  if (heatOp > 0) {
    heat.push({ at: cycle - GROUND_LOOP_FADE, opacity: heatOp, ease: true })
    heat.push({ at: cycle, opacity: 0 })
  } else {
    heat.push({ at: cycle, opacity: 0 })
  }
  if (coolOp > 0) {
    cool.push({ at: cycle - GROUND_LOOP_FADE, opacity: coolOp, ease: true })
    cool.push({ at: cycle, opacity: 0 })
  } else {
    cool.push({ at: cycle, opacity: 0 })
  }

  return { heat, cool }
}

function glowKeyframes(name: string, stops: GroundGlowStop[], cycle: number) {
  const pct = (t: number) => ((Math.min(Math.max(t, 0), cycle) / cycle) * 100).toFixed(2)
  const frames = stops
    .map((s) => {
      const ease = s.ease ? ' animation-timing-function: ease;' : ''
      return `      ${pct(s.at)}% { opacity: ${s.opacity};${ease} }`
    })
    .join('\n')
  return `@keyframes ${name} {\n${frames}\n    }`
}

function groundChargeCss(mode: AtlMode, uid: string, layout: Layout) {
  const g = glowStopsFromArrivals(mode, layout)
  if (!g) return null
  const cycle = mode.cycleMs / 1000
  const safe = `${mode.id}-${uid.replace(/[^a-zA-Z0-9_-]/g, '')}`
  const heat = `atlGround-${safe}-heat`
  const cool = `atlGround-${safe}-cool`
  return {
    heat,
    cool,
    css: `${glowKeyframes(heat, g.heat, cycle)}\n${glowKeyframes(cool, g.cool, cycle)}`,
  }
}

function GroundGlow({
  kf,
  cycleMs,
  className,
  glow,
  filterId,
}: {
  kf: string
  cycleMs: number
  className: string
  glow: Layout['ground']['glow']
  filterId: string
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
        opacity: 0,
        animationName: kf,
        animationDuration: `${cycleMs}ms`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        animationFillMode: 'both',
      }}
    />
  )
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
  const motion = pulseMotion(mode, uid)

  return (
    <>
      {charge && <style key={`ground-${mode.id}`}>{charge.css}</style>}
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

      {/* Neutral earth, then Mode 2's glows. Both sit behind the U-tubes so the borefield
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
      {charge && (
        <>
          <defs>
            <filter
              id={`${safeUid}-ground-glow`}
              x="-120%"
              y="-120%"
              width="340%"
              height="340%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation={L.ground.glow.blur} />
            </filter>
          </defs>
          <g key={mode.id}>
            <GroundGlow
              kf={charge.heat}
              cycleMs={mode.cycleMs}
              className="atl-ground-glow atl-ground-hot fill-atl-heat"
              glow={L.ground.glow}
              filterId={`${safeUid}-ground-glow`}
            />
            <GroundGlow
              kf={charge.cool}
              cycleMs={mode.cycleMs}
              className="atl-ground-glow atl-ground-cool fill-atl-cool"
              glow={L.ground.glow}
              filterId={`${safeUid}-ground-glow`}
            />
          </g>
        </>
      )}

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

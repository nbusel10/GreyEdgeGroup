import type { AtlIconId } from '../components/AtlIcons'
import type { Thermal } from '../lib/atl-geometry'

/**
 * The thermal modes the ATL diagram cycles through, as data.
 *
 * Nothing here is a coordinate. A pulse names two nodes and a thermal type; routeFor()
 * turns that into a riser onto the loop, a walk around the track, and a riser back out.
 * So a mode is written in the language of the story it tells — the hospital's waste heat
 * goes to the housing block — and the drawing works out where that lives.
 *
 * Every duration and delay lives in this file. The diagram only consumes them.
 */

export type NodeId = AtlIconId

export type Pulse = {
  from: NodeId
  to: NodeId
  /** Heat (red) or cool (blue). Colour only — both travel the same way around the loop. */
  thermal: Thermal
  /** Seconds from the top of the cycle to this pulse leaving its source. */
  delay: number
  /**
   * Seconds in flight. Author it against the route's length in the wide layout so every
   * pulse in a mode moves at about one speed — a comet crossing the whole loop in the same
   * time as one hopping next door reads as a bug, not as choreography. routeFor() reports
   * that length. The narrow layout's risers are proportionally longer, which leaves its
   * speeds spread by about a tenth; below noticing, and the alternative is a second set of
   * durations that could drift out of step with the first.
   *
   * Must not exceed cycleMs: a pulse cannot still be travelling when its cycle restarts.
   */
  duration: number
}

export type AtlMode = {
  id: string
  /** Tab label. Short enough to sit in a row of four on a phone. */
  tab: string
  /** The SVG's <title> while this mode runs. */
  title: string
  /** The SVG's <desc>: what a listener needs, given they cannot watch the pulses. */
  desc: string
  /** Sits above the figure, in the panel. Says what the animation shows. */
  caption: string
  /**
   * Length of one full pass, in milliseconds. Every pulse's animation runs for exactly this
   * long and idles out the remainder, so the whole mode restarts as one piece however
   * staggered its journeys are. Leave a beat of quiet at the end — without it the loop reads
   * as continuous traffic rather than as a sequence of exchanges.
   */
  cycleMs: number
  pulses: Pulse[]
}

/**
 * Mode 1 — instantaneous load sharing.
 *
 * Two exchanges at once: heat leaves civic (starting dark red) for campus, which
 * takes a medium red glow on entry; cool leaves housing (starting dark blue) for
 * the hospital, which takes a medium blue glow on entry. Sources clear as soon as
 * their pulse leaves the building.
 *
 * Durations at ~200 u/s: both neighbour hops ~1.5s. Quiet beat after landing.
 */
const LS_NEIGHBOUR = 1.5
const LOAD_SHARING_CYCLE = Math.round((LS_NEIGHBOUR + 1.5) * 10) / 10

const loadSharing: AtlMode = {
  id: 'load-sharing',
  tab: 'Energy sharing',
  title: 'Instantaneous energy sharing',
  desc:
    'Heat leaves the civic building for campus while cooling leaves housing for the hospital. Civic starts red and housing starts blue; each destination takes on that colour as the pulse arrives.',
  caption:
    'Heat moves from civic to campus while cooling moves from housing to the hospital.',
  cycleMs: Math.round(LOAD_SHARING_CYCLE * 1000),
  pulses: [
    { from: 'civic', to: 'campus', thermal: 'heat', delay: 0, duration: LS_NEIGHBOUR },
    { from: 'housing', to: 'hospital', thermal: 'cool', delay: 0, duration: LS_NEIGHBOUR },
  ],
}

/**
 * Overlay opacities for Mode 2's charged earth and warmed housing. Red and blue
 * each climb the same three strengths; neutral is both at 0 so tan / the building
 * fill shows through.
 */
export const GROUND_GLOW = {
  soft: 0.28,
  medium: 0.55,
  dark: 0.88,
} as const

export type GroundGlow = { heat: number; cool: number }

const GLOW_STEPS = [0, GROUND_GLOW.soft, GROUND_GLOW.medium, GROUND_GLOW.dark] as const

function glowFromLevels(heatLevel: number, coolLevel: number): GroundGlow {
  return { heat: GLOW_STEPS[heatLevel]!, cool: GLOW_STEPS[coolLevel]! }
}

/**
 * Ground overlay opacities after each dash that enters or leaves the borefield, in
 * pulse order. Starts tan. Campus→borefield climbs the matching colour ladder;
 * borefield→housing steps that ladder back to zero. Heat and cool never mix — a
 * charge of one colour clears the other. Discharge steps only count when the mode
 * also stores into the borefield, so multi-source leave-traffic does not dim earth.
 */
export function groundChargeFor(pulses: Pulse[]): GroundGlow[] {
  const stores = pulses.some((p) => p.to === 'borefield')
  let heat = 0
  let cool = 0
  const steps: GroundGlow[] = []
  for (const p of pulses) {
    if (p.to === 'borefield') {
      if (p.thermal === 'heat') {
        heat = Math.min(3, heat + 1)
        cool = 0
      } else {
        cool = Math.min(3, cool + 1)
        heat = 0
      }
      steps.push(glowFromLevels(heat, cool))
    } else if (stores && p.from === 'borefield') {
      if (p.thermal === 'heat') heat = Math.max(0, heat - 1)
      else cool = Math.max(0, cool - 1)
      steps.push(glowFromLevels(heat, cool))
    }
  }
  return steps
}

/**
 * Overlay opacities after each dash that arrives at `node`. Same soft → medium →
 * dark ladder as the ground; the first pulse of the other colour clears the last.
 */
export function nodeChargeFor(pulses: Pulse[], node: NodeId): GroundGlow[] {
  let heat = 0
  let cool = 0
  const steps: GroundGlow[] = []
  for (const p of pulses) {
    if (p.to !== node) continue
    if (p.thermal === 'heat') {
      heat = Math.min(3, heat + 1)
      cool = 0
    } else {
      cool = Math.min(3, cool + 1)
      heat = 0
    }
    steps.push(glowFromLevels(heat, cool))
  }
  return steps
}

/** Housing arrivals — same ladder as any other destination node. */
export function housingChargeFor(pulses: Pulse[]): GroundGlow[] {
  return nodeChargeFor(pulses, 'housing')
}

/**
 * Energy-sharing start colours: civic holds heat; housing holds cool. Campus and
 * hospital only glow on arrival. Sources clear when their outbound pulse leaves.
 */
export function loadSharingSourceGlow(node: NodeId): { initial: GroundGlow; steps: GroundGlow[] } | null {
  if (node === 'civic') {
    return {
      initial: { heat: GROUND_GLOW.dark, cool: 0 },
      steps: [{ heat: 0, cool: 0 }],
    }
  }
  if (node === 'housing') {
    return {
      initial: { heat: 0, cool: GROUND_GLOW.dark },
      steps: [{ heat: 0, cool: 0 }],
    }
  }
  return null
}

function softArrivalGlow(thermal: Thermal): GroundGlow {
  return thermal === 'heat'
    ? { heat: GROUND_GLOW.medium, cool: 0 }
    : { heat: 0, cool: GROUND_GLOW.medium }
}

/** Destination colour when an energy-sharing pulse enters a building (medium for a single pulse). */
export function loadSharingArrivalGlow(thermal: Thermal): GroundGlow {
  return softArrivalGlow(thermal)
}

/**
 * Waste-heat mode: the data center starts dark red (holding process heat). Each
 * outbound pulse steps the glow down, then into cool — heat leaving the plant,
 * then the empty plant reading as cool.
 *
 * Pulse 1 exit → medium red; pulse 2 → off; pulse 3 → soft blue; pulse 4 → medium blue.
 */
export const PROCESS_DATACENTER_INITIAL: GroundGlow = {
  heat: GROUND_GLOW.dark,
  cool: 0,
}

export function processDatacenterDischargeGlow(): GroundGlow[] {
  return [
    { heat: GROUND_GLOW.medium, cool: 0 },
    { heat: 0, cool: 0 },
    { heat: 0, cool: GROUND_GLOW.soft },
    { heat: 0, cool: GROUND_GLOW.medium },
  ]
}

/**
 * Waste-heat building arrivals: one pulse each would only reach soft (0.28), which
 * reads too faintly on the filled icons. Keep heat at least medium.
 */
export function processBuildingChargeFor(pulses: Pulse[], node: NodeId): GroundGlow[] {
  return nodeChargeFor(pulses, node).map((step) => ({
    heat: step.heat > 0 ? Math.max(step.heat, GROUND_GLOW.medium) : 0,
    cool: step.cool,
  }))
}

/**
 * Mode 2 — ground as thermal storage.
 *
 * Heat leaves the campus as three charges into the borefield. The ground glow
 * climbs soft → medium → dark red as each dash enters. One second after the last
 * enters, three red charges leave the ground (glow steps back to tan) and travel
 * clockwise into housing, where the building glow climbs the same red ladder.
 * Cooling then repeats the pattern in blue: campus → ground, pause, ground →
 * housing.
 *
 * AtlDiagram times ground charge from destEntry (entering the borefield), ground
 * discharge from sourceExit (leaving it), and housing glow from destArrival
 * (pulse head at the housing tap).
 *
 * Campus→borefield at ~200 u/s is ~6.2s; borefield→housing is ~4.0s.
 */
const GB_STORE_DURATION = 6.2
const GB_RECOVER_DURATION = 4.0
const GB_DASHES = 3
const GB_GAP = 0.45
const GB_WAIT = 1.0
/** Dest-riser fraction for campus→borefield — head enters the ground near path end. */
const GB_STORE_ENTRY_FRAC = 0.9

const tenths = (n: number) => Math.round(n * 10) / 10

const storeEntryAt = (trainStart: number) =>
  trainStart + (GB_DASHES - 1) * GB_GAP + GB_STORE_DURATION * GB_STORE_ENTRY_FRAC

const GB_HEAT_STORE_AT = 0
const GB_HEAT_RECOVER_AT = tenths(storeEntryAt(GB_HEAT_STORE_AT) + GB_WAIT)
const GB_HEAT_RECOVER_LAND =
  GB_HEAT_RECOVER_AT + (GB_DASHES - 1) * GB_GAP + GB_RECOVER_DURATION
const GB_COOL_STORE_AT = tenths(GB_HEAT_RECOVER_LAND + 0.5)
const GB_COOL_RECOVER_AT = tenths(storeEntryAt(GB_COOL_STORE_AT) + GB_WAIT)
const GB_COOL_RECOVER_LAND =
  GB_COOL_RECOVER_AT + (GB_DASHES - 1) * GB_GAP + GB_RECOVER_DURATION
const GROUND_BATTERY_CYCLE = tenths(GB_COOL_RECOVER_LAND + 1.5)

const gbStore = (thermal: Thermal, delay: number): Pulse[] =>
  Array.from({ length: GB_DASHES }, (_, i) => ({
    from: 'campus' as const,
    to: 'borefield' as const,
    thermal,
    delay: tenths(delay + i * GB_GAP),
    duration: GB_STORE_DURATION,
  }))

const gbRecover = (thermal: Thermal, delay: number): Pulse[] =>
  Array.from({ length: GB_DASHES }, (_, i) => ({
    from: 'borefield' as const,
    to: 'housing' as const,
    thermal,
    delay: tenths(delay + i * GB_GAP),
    duration: GB_RECOVER_DURATION,
  }))

const groundBattery: AtlMode = {
  id: 'ground-battery',
  tab: 'Thermal storage',
  title: 'Ground as thermal storage',
  desc:
    'Heat leaves the campus into the ground in three charges; the ground glows red as each one enters. After a short pause, three charges leave the ground — the glow fades — and warm housing. Cooling repeats the same pattern in blue.',
  caption:
    'Heat leaves the campus into the ground in three charges, then three charges leave the ground to warm housing. Cooling repeats the same pattern in blue.',
  cycleMs: Math.round(GROUND_BATTERY_CYCLE * 1000),
  pulses: [
    ...gbStore('heat', GB_HEAT_STORE_AT),
    ...gbRecover('heat', GB_HEAT_RECOVER_AT),
    ...gbStore('cool', GB_COOL_STORE_AT),
    ...gbRecover('cool', GB_COOL_RECOVER_AT),
  ],
}

/** Twelve ground steps for Mode 2: 3 heat in, 3 heat out, 3 cool in, 3 cool out. */
export const groundCharge = groundChargeFor(groundBattery.pulses)

/** Six housing steps for Mode 2: 3 heat arrivals, then 3 cool arrivals. */
export const housingCharge = housingChargeFor(groundBattery.pulses)

/**
 * Clockwise around-the-track lengths at ~200 u/s. Mode 3 uses the datacenter row
 * for its four consecutive heat legs; Mode 4 fires every source-to-building pair
 * in a volley — four pulses leave each source together — and lets cool leave
 * while the longest heat is still in flight.
 */
const MULTI_BUILDINGS: NodeId[] = ['civic', 'campus', 'housing', 'hospital']
const MULTI_HEAT_SOURCES: NodeId[] = ['borefield', 'wastewater', 'datacenter']
const MULTI_COOL_SOURCES: NodeId[] = ['borefield', 'wastewater']

const MULTI_DURATION: Record<string, Record<string, number>> = {
  borefield: { civic: 1.9, campus: 2.9, housing: 4.0, hospital: 5.1 },
  wastewater: { civic: 2.9, campus: 4.0, housing: 5.1, hospital: 6.2 },
  datacenter: { civic: 4.0, campus: 5.1, housing: 6.2, hospital: 7.2 },
}

const multiPulses = (thermal: Thermal, sources: NodeId[], delay: number): Pulse[] =>
  sources.flatMap((from) =>
    MULTI_BUILDINGS.map((to) => ({
      from,
      to,
      thermal,
      delay,
      duration: MULTI_DURATION[from][to]!,
    })),
  )

/**
 * Mode 3 — waste heat recovery.
 *
 * Four consecutive red pulses leave the data center and travel clockwise around
 * the shared loop, one into each building in turn: hospital, then housing, then
 * campus, then civic. The data center starts dark red and steps down (then into
 * blue) as each pulse leaves; each building takes a soft red arrival glow. No
 * other source fires, and there is no cool follow — the story is process heat
 * leaving the data center and being taken up by the district.
 *
 * Stagger matches Mode 2's train gap (0.45s). Durations are the clockwise
 * datacenter→building lengths above. The hospital leg is the longest flight
 * (7.2s) and the first to leave, so it is also the last to land; a short quiet
 * beat after that keeps the cycle from reading as continuous traffic.
 */
const PROCESS_TARGETS: NodeId[] = ['hospital', 'housing', 'campus', 'civic']
const PROCESS_GAP = 0.45
const PROCESS_HEAT_AT = 0
const PROCESS_LAST_LAND = Math.max(
  ...PROCESS_TARGETS.map((to, i) => PROCESS_HEAT_AT + i * PROCESS_GAP + MULTI_DURATION.datacenter![to]!),
)
const PROCESS_CYCLE = tenths(PROCESS_LAST_LAND + 1.5)

const processEnergy: AtlMode = {
  id: 'process-energy',
  tab: 'Waste heat',
  title: 'Waste heat recovery',
  desc:
    'Heat from the data center travels clockwise along the shared loop and arrives at the hospital, then housing, then campus, then the civic building.',
  caption:
    'Heat from the data center arrives at the hospital, then housing, then campus, then the civic building.',
  cycleMs: Math.round(PROCESS_CYCLE * 1000),
  pulses: PROCESS_TARGETS.map((to, i) => ({
    from: 'datacenter',
    to,
    thermal: 'heat' as const,
    delay: tenths(PROCESS_HEAT_AT + i * PROCESS_GAP),
    duration: MULTI_DURATION.datacenter![to]!,
  })),
}

/**
 * Mode 4 — multi-source feed.
 *
 * The same source-to-every-building volley as Mode 3: geoexchange, wastewater
 * and the data center leave together on heat; cool follows from the two thermal
 * resources only. Pulses leave the exchange, they do not go into it, so there
 * is no earth charge ladder — buildings take the soft arrival glow instead.
 * Cool starts at 7s even if the longest heat is still in flight. A short rest
 * after the last cool lands (wastewater→hospital at 7 + 6.2 = 13.2s) keeps the
 * loop from reading as continuous traffic.
 */
const MULTI_COOL_AT = 7

const multiSource: AtlMode = {
  id: 'multi-source',
  tab: 'Multi-Source',
  title: 'Multi-source feed',
  desc:
    'Heat from the geoexchange borefield, the wastewater exchanger, and the data center leaves at the same time and arrives at every building — civic, campus, housing, and the hospital. Cooling then follows from the borefield and the wastewater exchanger into all four buildings.',
  caption:
    'Heat from the borefield, wastewater exchanger, and data center feeds every building. Cooling then follows from the borefield and wastewater.',
  cycleMs: 14000,
  pulses: [...multiPulses('heat', MULTI_HEAT_SOURCES, 0), ...multiPulses('cool', MULTI_COOL_SOURCES, MULTI_COOL_AT)],
}

export const atlModes: AtlMode[] = [loadSharing, groundBattery, processEnergy, multiSource]

export const defaultAtlMode = atlModes[0]

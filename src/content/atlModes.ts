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
  /** Sits above the figure, in the panel. Says what the motion means, not what it does. */
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
 * The simplest true thing about an ambient loop: surplus heat leaving one building is heat
 * arriving at another, right now, with nothing in between. Both sources here are buildings
 * that reject heat whatever the season — a hospital cooling equipment and imaging suites
 * around the clock, a campus dense with people and plant — and both sinks are the ones
 * asking for it. Every journey runs the same direction along the loop, so the drawing says
 * something specific: surplus concentrates at one end of this district and demand sits at
 * the other.
 *
 * Durations follow the wide layout's clockwise around-the-track lengths at roughly
 * 200 units per second. Neighbour hops that sit against the loop take the long way
 * (~7.6s); hospital to civic is the shorter clockwise run (~5.4s) because it arrives
 * at the left cap first.
 *
 * Cool is the same three routes a beat later — colour, not a second current — so blue
 * chases red along each path instead of taking a different arc. The 2.0s follow keeps
 * the comets apart; the cycle grows by the same 2.0s so the quiet beat at the end
 * stays about 1.7s after the last cool lands (campus→civic at 10.3s).
 */
const LOAD_SHARING_COOL_AT = 2.0

const loadSharing: AtlMode = {
  id: 'load-sharing',
  tab: 'Energy sharing',
  title: 'Instantaneous energy sharing',
  desc:
    'Heat leaves the hospital and the campus as they reject it, travels along the shared loop, and arrives at the housing block and the civic building that need it. Cooling follows those same three journeys a moment later. Journeys overlap, so energy is leaving one building while it is arriving at another.',
  caption:
    'Heat leaving the hospital and campus arrives at housing and the civic building; cooling follows the same paths.',
  cycleMs: 12000,
  pulses: [
    { from: 'hospital', to: 'housing', thermal: 'heat', delay: 0, duration: 7.6 },
    { from: 'campus', to: 'civic', thermal: 'heat', delay: 0.7, duration: 7.6 },
    // Last heat to leave: the same exchange works end to end, not only between neighbours.
    { from: 'hospital', to: 'civic', thermal: 'heat', delay: 1.6, duration: 5.4 },
    { from: 'hospital', to: 'housing', thermal: 'cool', delay: LOAD_SHARING_COOL_AT, duration: 7.6 },
    { from: 'campus', to: 'civic', thermal: 'cool', delay: 0.7 + LOAD_SHARING_COOL_AT, duration: 7.6 },
    { from: 'hospital', to: 'civic', thermal: 'cool', delay: 1.6 + LOAD_SHARING_COOL_AT, duration: 5.4 },
  ],
}

/**
 * Overlay opacities for Mode 2's charged earth. One red (`--color-atl-heat`) at three
 * strengths, one blue (`--color-atl-cool`). Neutral is both at 0 so the tan patch shows.
 */
export const GROUND_GLOW = {
  soft: 0.28,
  medium: 0.55,
  dark: 0.88,
  cool: 0.88,
} as const

export type GroundGlow = { heat: number; cool: number }

type GroundLevel = 'blue' | 'tan' | 'soft' | 'medium' | 'dark'

function stepGround(level: GroundLevel, thermal: Thermal): GroundLevel {
  if (thermal === 'heat') {
    if (level === 'blue' || level === 'tan') return 'soft'
    if (level === 'soft') return 'medium'
    return 'dark'
  }
  if (level === 'dark' || level === 'medium') return 'soft'
  if (level === 'soft') return 'tan'
  return 'blue'
}

function glowForLevel(level: GroundLevel): GroundGlow {
  switch (level) {
    case 'soft':
      return { heat: GROUND_GLOW.soft, cool: 0 }
    case 'medium':
      return { heat: GROUND_GLOW.medium, cool: 0 }
    case 'dark':
      return { heat: GROUND_GLOW.dark, cool: 0 }
    case 'blue':
      return { heat: 0, cool: GROUND_GLOW.cool }
    default:
      return { heat: 0, cool: 0 }
  }
}

/**
 * Heat/cool overlay opacities after each dash that enters the borefield, in pulse
 * order. Starts tan. Each heat arrival climbs the red ladder (and leaves blue on
 * the first step); each cool arrival steps dark → soft red → tan → blue.
 */
export function groundChargeFor(pulses: Pulse[]): GroundGlow[] {
  let level: GroundLevel = 'tan'
  const steps: GroundGlow[] = []
  for (const p of pulses) {
    if (p.to !== 'borefield') continue
    level = stepGround(level, p.thermal)
    steps.push(glowForLevel(level))
  }
  return steps
}

/**
 * Mode 2 — ground as thermal storage.
 *
 * Heat goes into the borefield as a train of three dashes. The ground glow steps
 * with each dash that enters: tan → soft red → medium red → dark red. Cooling
 * follows the same clockwise path as three blue dashes and steps the other way:
 * dark red → soft red → tan → blue. A second heat train leaves the blue the same
 * way the first left tan — soft, then medium, then dark — so it never lingers on
 * leftover blue. That return is the cycle, not a draw-out to housing.
 *
 * The colour at each step lives in groundCharge (derived from the nine arrivals).
 * AtlDiagram times those stops from destEntry, so the glow changes when a dash
 * actually enters the borefield, not when it leaves the campus.
 *
 * One injection path keeps the volley as three dashes, not a swarm. Campus→borefield
 * is the longer clockwise run, so the train reads clearly. Wide-layout length at
 * ~200 u/s is ~6.2s. Cool waits until the heat train has landed; the second heat
 * waits until the ground is clearly blue.
 */
const GB_DURATION = 6.2
const GB_DASHES = 3
const GB_GAP = 0.45
const GB_HEAT1_AT = 0
const GB_COOL_AT = 7.4
const GB_HEAT2_AT = 15.6
const GROUND_BATTERY_CYCLE = 24.0

const gbTrain = (thermal: Thermal, delay: number): Pulse[] =>
  Array.from({ length: GB_DASHES }, (_, i) => ({
    from: 'campus',
    to: 'borefield',
    thermal,
    delay: delay + i * GB_GAP,
    duration: GB_DURATION,
  }))

const groundBattery: AtlMode = {
  id: 'ground-battery',
  tab: 'Thermal storage',
  title: 'Ground as thermal storage',
  desc:
    'Heat leaves the campus as three charges, travels the shared loop, and goes into the geoexchange borefield. The ground glows a soft red as the first dash enters, a medium red as the second enters, and a dark red as the third enters. Cooling then follows the same journey as three charges: the first brings the glow back to soft red, the second to the earth\'s own colour, and the third to a blue glow. Heat goes in again and the ground steps back to red the same way.',
  caption:
    'Heat leaving the campus goes into the ground in three charges — the earth glows soft, then medium, then dark red as each one enters. Cooling follows; the glow steps back through soft red and tan to blue. Heat goes in again and the ground returns to red.',
  cycleMs: GROUND_BATTERY_CYCLE * 1000,
  pulses: [...gbTrain('heat', GB_HEAT1_AT), ...gbTrain('cool', GB_COOL_AT), ...gbTrain('heat', GB_HEAT2_AT)],
}

/** Nine arrival steps for Mode 2: 3 heat, 3 cool, 3 heat. Timed in AtlDiagram. */
export const groundCharge = groundChargeFor(groundBattery.pulses)

/**
 * Clockwise around-the-track lengths at ~200 u/s. Mode 3 and Mode 4 both fire every
 * source-to-building pair in a volley — four pulses leave each source together.
 * Same numbers either way. Mode 3 waits for the last red to land before blue;
 * Mode 4 lets cool leave while the longest heat is still in flight.
 */
const MULTI_BUILDINGS: NodeId[] = ['civic', 'campus', 'housing', 'hospital']
const MULTI_HEAT_SOURCES: NodeId[] = ['borefield', 'wastewater', 'datacenter']
const MULTI_COOL_SOURCES: NodeId[] = ['borefield', 'wastewater']

const MULTI_DURATION: Record<string, Record<string, number>> = {
  borefield: { civic: 1.9, campus: 2.9, housing: 4.0, hospital: 5.1 },
  wastewater: { civic: 2.9, campus: 4.0, housing: 5.1, hospital: 6.2 },
  datacenter: { civic: 4.0, campus: 5.1, housing: 6.2, hospital: 7.2 },
}

const tenths = (n: number) => Math.round(n * 10) / 10

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
 * A simultaneous fan-out from each thermal resource: geoexchange, wastewater and
 * the data center each send four heat pulses at once, one into every building
 * (12 red dashes, all at delay 0). They arrive at different times because the
 * clockwise paths differ. Cool follows from the two thermal resources only —
 * the data center is a heat source, so it does not send blue — once the last
 * red has entered (datacenter→hospital at 7.2s), plus a short gap.
 *
 * Heat delay: 0. Cool delay: 7.5s. Last cool (wastewater→hospital) lands at
 * 13.7s; the cycle is 14.0s.
 */
const PROCESS_GAP = 0.3
const PROCESS_HEAT_AT = 0
const PROCESS_LAST_HEAT = MULTI_DURATION.datacenter!.hospital!
const PROCESS_COOL_AT = tenths(PROCESS_HEAT_AT + PROCESS_LAST_HEAT + PROCESS_GAP)
const PROCESS_LAST_COOL = tenths(PROCESS_COOL_AT + MULTI_DURATION.wastewater!.hospital!)
const PROCESS_CYCLE = tenths(PROCESS_LAST_COOL + PROCESS_GAP)

const processEnergy: AtlMode = {
  id: 'process-energy',
  tab: 'Waste heat',
  title: 'Waste heat recovery',
  desc:
    'Heat leaves the geoexchange borefield, the wastewater exchanger and the data center at the same time, each sending a pulse into every building — civic, campus, housing and the hospital. Cooling then follows from the borefield and the wastewater exchanger into all four buildings.',
  caption:
    'Waste heat, geoexchange and the data center feed every building as heat; cooling then follows from geoexchange and waste heat.',
  cycleMs: Math.round(PROCESS_CYCLE * 1000),
  pulses: [
    ...multiPulses('heat', MULTI_HEAT_SOURCES, PROCESS_HEAT_AT),
    ...multiPulses('cool', MULTI_COOL_SOURCES, PROCESS_COOL_AT),
  ],
}

/**
 * Mode 4 — multi-source feed.
 *
 * The same source-to-every-building volley as Mode 3: geoexchange, wastewater
 * and the data center leave together on heat; cool follows from the two thermal
 * resources only. Pulses leave the exchange, they do not go into it, so there
 * is no earth glow. Cool starts at 7s even if the longest heat is still in
 * flight. A short rest after the last cool lands (wastewater→hospital at
 * 7 + 6.2 = 13.2s) keeps the loop from reading as continuous traffic.
 */
const MULTI_COOL_AT = 7

const multiSource: AtlMode = {
  id: 'multi-source',
  tab: 'Multi-Source',
  title: 'Multi-source feed',
  desc:
    'Heat leaves the geoexchange borefield, the wastewater exchanger and the data center at the same time and arrives at every building — civic, campus, housing and the hospital. Cooling then follows from the borefield and the wastewater exchanger into all four buildings.',
  caption:
    'The borefield, waste heat and the data center feed every building as heat; cooling then follows from the borefield and waste heat.',
  cycleMs: 14000,
  pulses: [...multiPulses('heat', MULTI_HEAT_SOURCES, 0), ...multiPulses('cool', MULTI_COOL_SOURCES, MULTI_COOL_AT)],
}

export const atlModes: AtlMode[] = [loadSharing, groundBattery, processEnergy, multiSource]

export const defaultAtlMode = atlModes[0]

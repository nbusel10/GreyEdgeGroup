import type { ReactNode } from 'react'

const W = 320
const H = 210
const GROUND = 96

const heat = '#c0392b'
const cool = '#1a8fa3'
const housing = '#b5aea6'
const civic = '#c1c1c1'
const campus = '#bf9359'
const steel = '#7a8288'
const roof = '#5a6168'
const outline = '#292929'
const win = '#ffffff'
const sky = '#f4f5f6'
const pipe = { fill: 'none', strokeWidth: 3.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const rocks: [number, number, number, number][] = [
  [22, 122, 4.2, 2.6],
  [48, 156, 3.2, 2.2],
  [74, 134, 5.4, 3.2],
  [108, 178, 3.6, 2.4],
  [136, 146, 2.8, 2],
  [162, 188, 4.8, 3],
  [196, 128, 3.4, 2.2],
  [214, 164, 5.6, 3.4],
  [248, 142, 3, 2.1],
  [276, 176, 4.4, 2.8],
  [300, 124, 2.6, 1.8],
  [34, 192, 3.8, 2.4],
  [92, 168, 2.4, 1.7],
  [182, 154, 4, 2.6],
  [258, 198, 3.2, 2],
]

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="aspect-[320/210] w-full">
      <rect width={W} height={H} fill={sky} />
      <rect y={GROUND} width={W} height={H - GROUND} fill="#d8c4a4" />
      {rocks.map(([x, y, rx, ry]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} fill="#b08968" opacity="0.75" />
      ))}
      <rect y={GROUND} width={W} height="8" fill="#8fbf4e" />
      <rect y={GROUND} width={W} height="2.5" fill="#7aaa42" />
      <line x1="0" y1={GROUND} x2={W} y2={GROUND} stroke="#14171a" strokeWidth="1.6" />
      {children}
    </svg>
  )
}

function Pane({ x, y, w = 12, h = 14 }: { x: number; y: number; w?: number; h?: number }) {
  const mx = x + w / 2
  const my = y + h / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={win} />
      <path d={`M ${mx} ${y} V ${y + h} M ${x} ${my} H ${x + w}`} stroke={outline} strokeWidth="0.75" />
      <line x1={x - 0.8} y1={y + h} x2={x + w + 0.8} y2={y + h} stroke={roof} strokeWidth="1.3" />
    </g>
  )
}

function Door({ x, ground, w = 11, h = 18 }: { x: number; ground: number; w?: number; h?: number }) {
  const y = ground - h
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={roof} />
      <rect x={x + 1.6} y={y + 1.6} width={w - 3.2} height={h / 2 - 2.4} fill="none" stroke={win} strokeWidth="0.7" />
      <rect x={x + 1.6} y={y + h / 2 + 0.6} width={w - 3.2} height={h / 2 - 2.6} fill="none" stroke={win} strokeWidth="0.7" />
      <circle cx={x + w - 2.6} cy={y + h / 2} r="0.8" fill={win} />
    </g>
  )
}

function Cottage({ x, w, wall, detailed = false }: { x: number; w: number; wall: number; detailed?: boolean }) {
  const wallTop = GROUND - wall
  const peak = wallTop - Math.round(w * 0.4)
  const mid = x + w / 2
  const winW = detailed ? 16 : 9
  const winH = detailed ? 15 : 9
  const doorW = detailed ? 13 : 8
  const doorH = detailed ? 22 : 14
  return (
    <g>
      <polygon points={`${x - 6},${wallTop} ${mid},${peak} ${x + w + 6},${wallTop}`} fill={roof} stroke={outline} strokeWidth="1" strokeLinejoin="round" />
      <line x1={x - 6} y1={wallTop} x2={x + w + 6} y2={wallTop} stroke={outline} strokeWidth="1.4" />
      <rect x={x} y={wallTop} width={w} height={wall} fill={housing} stroke={outline} strokeWidth="1" />
      {detailed &&
        [0, 1, 2].map((i) => (
          <line
            key={i}
            x1={x + 1}
            x2={x + w - 1}
            y1={wallTop + 10 + i * 9}
            y2={wallTop + 10 + i * 9}
            stroke="#8f8880"
            strokeWidth="0.6"
          />
        ))}
      <rect x={x + w * 0.72} y={peak + 8} width={7} height={Math.max(12, (wallTop - peak) * 0.55)} fill={roof} />
      <rect x={x + w * 0.72 - 2} y={peak + 5} width={11} height={3.5} fill={outline} />
      {detailed && <Pane x={mid - 6} y={peak + 14} w={12} h={10} />}
      <Pane x={x + 6} y={wallTop + 6} w={winW} h={winH} />
      <Pane x={x + w - 6 - winW} y={wallTop + 6} w={winW} h={winH} />
      <Door x={mid - doorW / 2} ground={GROUND} w={doorW} h={doorH} />
      {detailed && <rect x={mid - 11} y={GROUND - 3} width={22} height={3} fill={outline} />}
    </g>
  )
}

function WindowGrid({ x, y, cols, rows, gapX = 8, gapY = 9 }: { x: number; y: number; cols: number; rows: number; gapX?: number; gapY?: number }) {
  const cells = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push(<rect key={`${r}-${c}`} x={x + c * gapX} y={y + r * gapY} width="5" height="6" fill={win} />)
    }
  }
  return <g>{cells}</g>
}

function Tower({ cx }: { cx: number }) {
  return (
    <g fill="none" stroke="#667077" strokeWidth="1.45" strokeLinejoin="miter" strokeLinecap="round">
      <path d={`M ${cx - 18} ${GROUND} L ${cx} 14 L ${cx + 18} ${GROUND}`} />
      <path d={`M ${cx - 18} ${GROUND} L ${cx + 7} ${GROUND - 26} M ${cx + 18} ${GROUND} L ${cx - 7} ${GROUND - 26}`} />
      <path d={`M ${cx - 12} ${GROUND - 24} L ${cx + 5} ${GROUND - 46} M ${cx + 12} ${GROUND - 24} L ${cx - 5} ${GROUND - 46}`} />
      <path d={`M ${cx - 8} ${GROUND - 42} H ${cx + 8}`} />
      <path d={`M ${cx - 22} 36 H ${cx + 22}`} />
      <path d={`M ${cx - 17} 50 H ${cx + 17}`} />
      <path d={`M ${cx - 22} 36 L ${cx - 17} 50 M ${cx + 22} 36 L ${cx + 17} 50 M ${cx} 36 V 50`} />
      <circle cx={cx - 20} cy={40} r="1.5" fill="#667077" />
      <circle cx={cx} cy={40} r="1.5" fill="#667077" />
      <circle cx={cx + 20} cy={40} r="1.5" fill="#667077" />
      <circle cx={cx - 15} cy={54} r="1.3" fill="#667077" />
      <circle cx={cx + 15} cy={54} r="1.3" fill="#667077" />
    </g>
  )
}

function Tree({ x }: { x: number }) {
  return (
    <g>
      <rect x={x - 2.5} y={GROUND - 18} width="5" height="18" fill={roof} />
      <circle cx={x} cy={GROUND - 32} r="12" fill="#7d8a62" />
      <circle cx={x - 9} cy={GROUND - 24} r="9" fill="#7d8a62" />
      <circle cx={x + 9} cy={GROUND - 24} r="9" fill="#7d8a62" />
      <circle cx={x} cy={GROUND - 22} r="8" fill="#657252" />
    </g>
  )
}

function Cyclist({ x }: { x: number }) {
  const y = GROUND
  return (
    <g fill={roof} stroke={roof} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx={x} cy={y - 10} r="8" fill="none" />
      <circle cx={x + 24} cy={y - 10} r="8" fill="none" />
      <circle cx={x} cy={y - 10} r="1.5" />
      <circle cx={x + 24} cy={y - 10} r="1.5" />
      <path d={`M ${x} ${y - 10} L ${x + 10} ${y - 19} L ${x + 20} ${y - 13} L ${x + 9} ${y - 10} Z`} fill={roof} />
      <path d={`M ${x + 10} ${y - 19} L ${x + 11} ${y - 30}`} fill="none" />
      <path d={`M ${x + 6} ${y - 26} H ${x + 16}`} fill="none" />
      <path d={`M ${x + 11} ${y - 26} L ${x + 22} ${y - 20} L ${x + 27} ${y - 17}`} fill="none" />
      <path d={`M ${x + 20} ${y - 17} L ${x + 24} ${y - 18}`} fill="none" />
      <circle cx={x + 11} cy={y - 34} r="3.6" fill={housing} />
    </g>
  )
}

function PowerArt() {
  return (
    <Frame label="Power plant and transmission towers above two deep wells">
      <Tower cx={36} />
      <Tower cx={284} />
      <g fill="none" stroke="#7a828a" strokeWidth="1.35">
        <path d="M 56 36 Q 92 58 124 42" />
        <path d="M 56 50 Q 92 70 124 54" />
        <path d="M 196 42 Q 230 58 264 36" />
        <path d="M 196 54 Q 230 70 264 50" />
      </g>
      <rect x="118" y="62" width="84" height="34" fill={steel} stroke={outline} strokeWidth="1" />
      <rect x="118" y="62" width="84" height="5" fill={civic} />
      <rect x="130" y="36" width="11" height="30" fill={roof} />
      <rect x="127" y="33" width="17" height="5" fill={outline} />
      <rect x="178" y="32" width="11" height="34" fill={roof} />
      <rect x="175" y="29" width="17" height="5" fill={outline} />
      <WindowGrid x={128} y={74} cols={4} rows={1} gapX={12} />
      <rect x="196" y="78" width="10" height="18" fill={roof} />
      <path d="M 136 96 V 202" stroke={heat} {...pipe} />
      <path d="M 184 96 V 202" stroke={cool} {...pipe} />
    </Frame>
  )
}

function DistrictArt() {
  return (
    <Frame label="A row of buildings on shallow pipes, with two deep wells at the plant">
      <Cottage x={8} w={46} wall={28} />
      <g>
        <polygon points="62,64 98,40 134,64" fill={roof} stroke={outline} strokeWidth="1" strokeLinejoin="round" />
        <rect x="66" y="64" width="64" height="32" fill={campus} stroke={outline} strokeWidth="1" />
        <Pane x={76} y={70} w={12} h={10} />
        <Pane x={94} y={70} w={12} h={10} />
        <Pane x={112} y={70} w={12} h={10} />
        <Door x={92} ground={GROUND} w={12} h={16} />
      </g>
      <g>
        <rect x="146" y="40" width="38" height="56" fill={civic} stroke={outline} strokeWidth="1" />
        <rect x="146" y="40" width="38" height="4" fill={outline} />
        <WindowGrid x={154} y={50} cols={3} rows={4} gapX={9} gapY={11} />
      </g>
      <g>
        <rect x="198" y="58" width="62" height="38" fill={steel} stroke={outline} strokeWidth="1" />
        <rect x="244" y="30" width="10" height="32" fill={roof} />
        <rect x="241" y="27" width="16" height="5" fill={outline} />
        <WindowGrid x={208} y={68} cols={3} rows={2} gapX={10} gapY={12} />
      </g>
      <path d="M 30 108 H 236" stroke={heat} {...pipe} />
      <path d="M 38 118 H 250" stroke={cool} {...pipe} />
      <path d="M 30 96 V 108 M 98 96 V 108 M 164 96 V 108 M 228 96 V 108" stroke={heat} {...pipe} />
      <path d="M 38 96 V 118 M 106 96 V 118 M 172 96 V 118 M 250 96 V 118" stroke={cool} {...pipe} />
      <path d="M 236 108 V 202" stroke={heat} {...pipe} />
      <path d="M 250 118 V 202" stroke={cool} {...pipe} />
    </Frame>
  )
}

function ULoop({ x, heatY, coolY, bottom, span }: { x: number; heatY: number; coolY: number; bottom: number; span: number }) {
  const mid = x + span / 2
  return (
    <g {...pipe}>
      <path d={`M ${x} ${heatY} V ${bottom - 12} Q ${x} ${bottom} ${mid} ${bottom}`} stroke={heat} />
      <path d={`M ${mid} ${bottom} Q ${x + span} ${bottom} ${x + span} ${bottom - 12} V ${coolY}`} stroke={cool} />
    </g>
  )
}

function BuildingArt() {
  const startX = 118
  const joinX = 136
  const x = 164
  const gap = 22
  const r = gap / 2
  const returnY = 110
  const runY = 126
  const top = 146
  const bottom = 184
  const endX = x + gap * 3
  return (
    <Frame label="A house with a shallow red and blue ground loop beside it">
      <Cottage x={22} w={108} wall={44} detailed />
      <g {...pipe}>
        <path d={`M ${startX} 96 V ${runY} H ${x} V ${bottom - r} Q ${x} ${bottom} ${x + r} ${bottom}`} stroke={cool} />
        <path
          d={`M ${x + r} ${bottom} Q ${x + gap} ${bottom} ${x + gap} ${bottom - r} V ${top + r} Q ${x + gap} ${top} ${x + gap + r} ${top}`}
          stroke={heat}
        />
        <path
          d={`M ${x + gap + r} ${top} Q ${x + gap * 2} ${top} ${x + gap * 2} ${top + r} V ${bottom - r} Q ${x + gap * 2} ${bottom} ${x + gap * 2 + r} ${bottom}`}
          stroke={cool}
        />
        <path
          d={`M ${x + gap * 2 + r} ${bottom} Q ${endX} ${bottom} ${endX} ${bottom - r} V ${returnY + r} Q ${endX} ${returnY} ${endX - r} ${returnY} H ${joinX} Q ${joinX - r} ${returnY} ${joinX - r} 96`}
          stroke={heat}
        />
      </g>
    </Frame>
  )
}

function NetworkArt() {
  return (
    <Frame label="Houses, a tree, taller buildings, and a cyclist sharing shallow ground loops">
      <Cottage x={6} w={40} wall={26} />
      <Tree x={60} />
      <g>
        <rect x="78" y="30" width="36" height="66" fill={civic} stroke={outline} strokeWidth="1" />
        <rect x="78" y="30" width="36" height="4" fill={outline} />
        <WindowGrid x={86} y={40} cols={3} rows={5} gapX={9} gapY={11} />
      </g>
      <Cottage x={126} w={44} wall={28} />
      <Cyclist x={186} />
      <g>
        <rect x="236" y="34" width="70" height="62" fill={steel} stroke={outline} strokeWidth="1" />
        <rect x="236" y="34" width="70" height="5" fill={outline} />
        <WindowGrid x={246} y={46} cols={5} rows={4} gapX={11} gapY={12} />
        <rect x="262" y="82" width="12" height="14" fill={roof} />
      </g>
      <path d="M 12 106 H 308" stroke={heat} {...pipe} />
      <path d="M 12 116 H 308" stroke={cool} {...pipe} />
      <path d="M 26 96 V 106 M 96 96 V 106 M 148 96 V 106 M 270 96 V 106" stroke={heat} {...pipe} />
      <path d="M 34 96 V 116 M 104 96 V 116 M 156 96 V 116 M 278 96 V 116" stroke={cool} {...pipe} />
      <ULoop x={22} heatY={106} coolY={116} bottom={172} span={18} />
      <ULoop x={86} heatY={106} coolY={116} bottom={172} span={18} />
      <ULoop x={150} heatY={106} coolY={116} bottom={172} span={18} />
      <ULoop x={214} heatY={106} coolY={116} bottom={172} span={18} />
      <ULoop x={278} heatY={106} coolY={116} bottom={172} span={18} />
    </Frame>
  )
}

const arts = {
  power: PowerArt,
  district: DistrictArt,
  building: BuildingArt,
  network: NetworkArt,
}

export default function GeoTypeArt({ variant }: { variant: keyof typeof arts }) {
  const Art = arts[variant]
  return <Art />
}

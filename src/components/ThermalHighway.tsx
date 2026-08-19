interface Node {
  x: number
  y: number
  label: string
  kind?: 'source' | 'storage'
}

const nodes: Node[] = [
  { x: 60, y: 55, label: 'University' },
  { x: 220, y: 30, label: 'Data Center', kind: 'source' },
  { x: 380, y: 55, label: 'Residential' },
  { x: 540, y: 30, label: 'Borefield', kind: 'storage' },
  { x: 700, y: 55, label: 'Municipal' },
  { x: 60, y: 195, label: 'Office' },
  { x: 220, y: 220, label: 'Wastewater', kind: 'source' },
  { x: 380, y: 195, label: 'Hotel' },
  { x: 540, y: 220, label: 'Solar Thermal', kind: 'source' },
  { x: 700, y: 195, label: 'Expansion' },
]

const SPINE_Y = 135

const fillFor = (kind?: Node['kind']) =>
  kind === 'storage' ? '#14171A' : kind === 'source' ? '#1e2124' : '#25292d'
const strokeFor = (kind?: Node['kind']) =>
  kind === 'storage' ? '#426255' : kind === 'source' ? '#7A8288' : '#3c4247'
const textFor = (kind?: Node['kind']) => (kind === 'storage' ? '#5a8574' : kind === 'source' ? '#9AA1A6' : '#7A8288')
// Kept in step with strokeFor so the legend below actually describes the drawing.
const flowFor = (kind?: Node['kind']) =>
  kind === 'storage' ? '#426255' : kind === 'source' ? '#9AA1A6' : '#5a6168'

/**
 * The Thermal Highway: one shared ambient loop that every building both draws from and
 * returns to, so a data center rejecting heat becomes the heat source for housing next
 * door. Ported from the Figma build and recoloured — sources are grey, thermal storage
 * carries the accent.
 */
export default function ThermalHighway() {
  return (
    <figure className="overflow-x-auto">
      <svg
        viewBox="0 0 800 280"
        className="w-full min-w-[640px]"
        role="img"
        aria-labelledby="thermal-highway-title thermal-highway-desc"
      >
        <title id="thermal-highway-title">Thermal Highway© network diagram</title>
        <desc id="thermal-highway-desc">
          Ten buildings and thermal resources (including a university, data center, wastewater plant, solar thermal
          array and a borefield) all connected to a single shared ambient temperature loop running horizontally
          through the district.
        </desc>

        {/* Supply and return, flowing in opposite directions. */}
        <line x1="20" y1={SPINE_Y} x2="780" y2={SPINE_Y} stroke="#3c4247" strokeWidth="3" />
        <line
          x1="20"
          y1={SPINE_Y}
          x2="780"
          y2={SPINE_Y}
          stroke="#426255"
          strokeWidth="2"
          strokeDasharray="24 36"
          className="animate-flow"
        />
        <line x1="20" y1={SPINE_Y + 7} x2="780" y2={SPINE_Y + 7} stroke="#25292d" strokeWidth="2" />
        <line
          x1="20"
          y1={SPINE_Y + 7}
          x2="780"
          y2={SPINE_Y + 7}
          stroke="#5a6168"
          strokeWidth="1.5"
          strokeDasharray="16 44"
          className="animate-flow-reverse"
        />

        {nodes.map((n, i) => {
          const above = n.y < SPINE_Y
          const boxY = above ? n.y - 2 : n.y
          const connY = above ? n.y + 28 : n.y - 4
          return (
            <g key={n.label}>
              <line x1={n.x + 40} y1={SPINE_Y} x2={n.x + 40} y2={connY} stroke="#3c4247" strokeWidth="1.5" />
              <line
                x1={n.x + 40}
                y1={SPINE_Y}
                x2={n.x + 40}
                y2={connY}
                stroke={flowFor(n.kind)}
                strokeWidth="1"
                strokeDasharray="5 8"
                style={{ animation: `flow ${2 + (i % 3) * 0.7}s linear infinite` }}
              />
              <rect
                x={n.x}
                y={boxY}
                width="80"
                height="28"
                fill={fillFor(n.kind)}
                stroke={strokeFor(n.kind)}
                strokeWidth="1"
              />
              <text
                x={n.x + 40}
                y={boxY + 17}
                textAnchor="middle"
                fill={textFor(n.kind)}
                fontSize="9"
                fontFamily="Inter, sans-serif"
              >
                {n.label}
              </text>
            </g>
          )
        })}

        <text
          x="400"
          y={SPINE_Y + 24}
          textAnchor="middle"
          fill="#5a6168"
          fontSize="8"
          fontFamily="Inter, sans-serif"
          letterSpacing="2"
        >
          SHARED AMBIENT TEMPERATURE LOOP
        </text>
      </svg>

      <figcaption className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {[
          { label: 'Buildings', color: '#3c4247' },
          { label: 'Thermal sources', color: '#7A8288' },
          { label: 'Storage and balancing', color: '#426255' },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 border" style={{ borderColor: l.color }} aria-hidden="true" />
            <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-silver">{l.label}</span>
          </span>
        ))}
      </figcaption>
    </figure>
  )
}

/**
 * Icon set for the ATL explainer, in the NexTEMP schematic's grammar: flat filled shapes,
 * black outlines, white knockout windows, no gradients or depth.
 *
 * Each icon draws into a 48x48 local space and sits on a shared baseline at y=44, so the
 * scene can place one with a single translate and know where its riser should meet it. They
 * render bare shapes rather than their own <svg> element, which lets the diagram group them
 * and the preview page wrap them at any size.
 *
 * Colors come only from the --color-atl-* tokens. Nothing here is red or blue: in this
 * drawing those two carry thermal meaning, so a static object wearing either would be
 * indistinguishable from a heat or cool pulse crossing it.
 */

const SW = 1.5

/** Civic center. The schematic's own colonnade treatment, which needs no window grid. */
export function CivicIcon() {
  return (
    <g className="fill-atl-bldg-civic stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <path d="M2 15.5 L24 4 L46 15.5 Z" />
      <rect x="4" y="15.5" width="40" height="4" />
      <rect x="6.5" y="19.5" width="6" height="20.5" />
      <rect x="16" y="19.5" width="6" height="20.5" />
      <rect x="25.5" y="19.5" width="6" height="20.5" />
      <rect x="35" y="19.5" width="6" height="20.5" />
      <rect x="3" y="40" width="42" height="4" />
    </g>
  )
}

/** Campus. Twin masses over a linking podium — the schematic's multi-use building form. */
export function CampusIcon() {
  const rows = [15.5, 21.5, 27.5, 33.5]
  return (
    <g className="fill-atl-bldg-campus stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <path d="M5 41 L5 12 L20 12 L20 19 L28 19 L28 12 L43 12 L43 41 Z" />
      <rect x="3" y="41" width="42" height="3" />
      <g className="fill-atl-window" stroke="none">
        {rows.map((y) =>
          [7, 11.4, 15.8, 28.9, 33.3, 37.7].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="3.2" height="4" />
          )),
        )}
        {[21.5, 27.5, 33.5].map((y) => (
          <rect key={`mid-${y}`} x="22.4" y={y} width="3.2" height="4" />
        ))}
      </g>
    </g>
  )
}

/** Housing. Pitched roof and a door, so it reads residential at a glance rather than as
 *  another office block. */
export function HousingIcon() {
  return (
    <g className="fill-atl-bldg-housing stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <path className="fill-atl-roof" d="M2.5 20 L24 6 L45.5 20 Z" />
      <rect x="7" y="20" width="34" height="21" />
      <rect x="4" y="41" width="40" height="3" />
      <g className="fill-atl-window" stroke="none">
        <rect x="11" y="24" width="6" height="5.5" />
        <rect x="21" y="24" width="6" height="5.5" />
        <rect x="31" y="24" width="6" height="5.5" />
        <rect x="11" y="32" width="6" height="5.5" />
        <rect x="31" y="32" width="6" height="5.5" />
        <rect x="20.5" y="32" width="7" height="9" />
      </g>
    </g>
  )
}

/** Hospital. The schematic marks this one with a cross emblem; here the emblem does the
 *  identifying work that its red fill used to. */
export function HospitalIcon() {
  return (
    <g className="fill-atl-bldg-hospital stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <rect x="18" y="7" width="12" height="5.5" />
      <rect x="6" y="12" width="36" height="29" />
      <rect x="3" y="41" width="42" height="3" />
      <g className="fill-atl-window" stroke="none">
        {[15, 20.5, 26].map((y) =>
          [8.5, 17, 25.5, 34].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="5" height="4" />),
        )}
        <circle cx="24" cy="35.5" r="4.6" />
      </g>
      <g className="fill-atl-bldg-hospital" stroke="none">
        <rect x="22.9" y="32.2" width="2.2" height="6.6" />
        <rect x="20.7" y="34.4" width="6.6" height="2.2" />
      </g>
    </g>
  )
}

/** Geoexchange borefield: a U-tube array, drawn the way the schematic draws it — an
 *  outlined channel rather than a solid line, so the tube reads as pipe carrying something. */
export function BorefieldIcon() {
  const tubes = [11.5, 24, 36.5].map((cx) => `M${cx - 3.4} 13 V 39 A 3.4 3.4 0 0 0 ${cx + 3.4} 39 V 13`)
  return (
    <g strokeLinejoin="round">
      {tubes.map((d) => (
        <path key={`o-${d}`} className="stroke-atl-outline" d={d} fill="none" strokeWidth="4" />
      ))}
      {tubes.map((d) => (
        <path key={`i-${d}`} className="stroke-atl-surface" d={d} fill="none" strokeWidth="1.6" />
      ))}
      <rect
        className="fill-atl-resource stroke-atl-outline"
        x="4"
        y="8"
        width="40"
        height="5"
        strokeWidth={SW}
      />
    </g>
  )
}

/** Wastewater heat exchanger: the schematic's stack of discs, seen slightly from above. */
export function WastewaterIcon() {
  return (
    <g className="stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <path className="fill-atl-resource" d="M9 18 V 39.5 A 15 4.5 0 0 0 39 39.5 V 18 Z" />
      {[23.5, 28.5, 33.5].map((y) => (
        <path key={y} d={`M9 ${y} A 15 4.5 0 0 0 39 ${y}`} fill="none" />
      ))}
      <ellipse className="fill-atl-resource-bright" cx="24" cy="18" rx="15" ry="4.5" />
    </g>
  )
}

/** Data center: a flat block with a rack motif, plus the rooftop plant that makes it a
 *  heat source rather than just another building. */
export function DataCenterIcon() {
  return (
    <g className="fill-atl-resource stroke-atl-outline" strokeWidth={SW} strokeLinejoin="round">
      <rect x="17" y="8" width="14" height="4.5" />
      <rect x="5" y="12.5" width="38" height="28.5" />
      <rect x="3" y="41" width="42" height="3" />
      {[17, 25, 33].map((y) => (
        <g key={y}>
          <rect className="fill-atl-window" stroke="none" x="10" y={y} width="28" height="5.5" />
          {[12, 18, 24, 30, 35].map((x) => (
            <rect
              key={x}
              className="fill-atl-outline"
              stroke="none"
              x={x}
              y={y + 1.25}
              width="1.6"
              height="3"
            />
          ))}
        </g>
      ))}
    </g>
  )
}

/**
 * `top` and `base` are where each icon's ink actually starts and stops inside the 48-unit box,
 * which is not the box itself — a pediment apex and a rooftop plant sit at different heights.
 * The scene aligns buildings on their base and resources on their top, so it needs both rather
 * than assuming every icon fills its artboard.
 */
export const atlIcons = [
  { id: 'civic', label: 'Civic', group: 'Buildings', Icon: CivicIcon, top: 4, base: 44 },
  { id: 'campus', label: 'Campus', group: 'Buildings', Icon: CampusIcon, top: 12, base: 44 },
  { id: 'housing', label: 'Housing', group: 'Buildings', Icon: HousingIcon, top: 6, base: 44 },
  { id: 'hospital', label: 'Hospital', group: 'Buildings', Icon: HospitalIcon, top: 7, base: 44 },
  { id: 'borefield', label: 'Geoexchange borefield', group: 'Resources', Icon: BorefieldIcon, top: 8, base: 44 },
  { id: 'wastewater', label: 'Wastewater exchanger', group: 'Resources', Icon: WastewaterIcon, top: 13.5, base: 44 },
  { id: 'datacenter', label: 'Data center', group: 'Resources', Icon: DataCenterIcon, top: 8, base: 44 },
] as const

export type AtlIconId = (typeof atlIcons)[number]['id']

export const atlIconById = Object.fromEntries(atlIcons.map((i) => [i.id, i])) as Record<
  AtlIconId,
  (typeof atlIcons)[number]
>

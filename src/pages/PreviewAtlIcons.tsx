import AtlDiagram from '../components/AtlDiagram'
import { atlIcons } from '../components/AtlIcons'
import { Container, Eyebrow, Section } from '../components/ui'

/**
 * TEMPORARY review route for the ATL explainer icons, at /preview-atl-icons.
 *
 * The icons are the part of the diagram most likely to look wrong, so they get approved on
 * their own before anything is wired into a scene or animated. Delete this page and its route
 * once the icon set is signed off.
 */

// Class names are written out in full because Tailwind scans source as plain text and never
// sees an interpolated one.
const swatches = [
  {
    token: 'atl-bldg-civic',
    bg: 'bg-atl-bldg-civic',
    note: '#c1c1c1 — measured, the schematic\u2019s classical government building',
  },
  {
    token: 'atl-bldg-campus',
    bg: 'bg-atl-bldg-campus',
    note: '#bf9359 — measured, the schematic\u2019s multi-use buildings',
  },
  { token: 'atl-bldg-housing', bg: 'bg-atl-bldg-housing', note: '#b5aea6 — warm grey, so it cannot be read as cool' },
  { token: 'atl-bldg-hospital', bg: 'bg-atl-bldg-hospital', note: 'ge-steel #7a8288' },
  { token: 'atl-roof', bg: 'bg-atl-roof', note: 'ge-graphite #5a6168' },
  { token: 'atl-resource', bg: 'bg-atl-resource', note: 'ge-accent #426255' },
  { token: 'atl-resource-bright', bg: 'bg-atl-resource-bright', note: 'ge-accent-bright #5a8574' },
  { token: 'atl-pipe', bg: 'bg-atl-pipe', note: '#292929 — measured, the schematic\u2019s risers' },
  { token: 'atl-outline', bg: 'bg-atl-outline', note: '#292929 — measured, same near-black' },
  {
    token: 'atl-pill-outline',
    bg: 'bg-atl-pill-outline',
    note: 'ge-steel #7a8288 — mid grey, so the loop sits behind the icons',
  },
]

function Swatch({ token, bg, note }: { token: string; bg: string; note: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-8 w-8 shrink-0 border border-ge-light ${bg}`} aria-hidden="true" />
      <span className="font-body text-[11px] leading-snug text-ge-graphite">
        <code className="text-ge-black">--color-{token}</code>
        <br />
        {note}
      </span>
    </div>
  )
}

export default function PreviewAtlIcons() {
  const buildings = atlIcons.filter((i) => i.group === 'Buildings')
  const resources = atlIcons.filter((i) => i.group === 'Resources')

  return (
    <Section className="bg-white">
      <Container>
        <Eyebrow>Temporary review page</Eyebrow>
        <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl">
          ATL icons and static scene
        </h1>
        <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
          Flat fills, black outlines, white knockout windows — the NexTEMP schematic&rsquo;s construction. Nothing
          static is red or blue, because in the finished diagram those two colors mean thermal energy and would be
          mistaken for a pulse. Each icon is drawn in a 48-unit box on a shared baseline.
        </p>

        {/* Every icon at the size it will actually be read at, and at 2x for construction. */}
        {[
          { heading: 'Buildings', items: buildings },
          { heading: 'Distributed resources', items: resources },
        ].map((group) => (
          <div key={group.heading} className="mt-16">
            <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
              {group.heading}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-px border border-ge-light bg-ge-light sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map(({ id, label, Icon }) => (
                <div key={id} className="flex flex-col items-center gap-5 bg-white px-6 py-8">
                  <div className="flex items-end gap-6">
                    <svg viewBox="0 0 48 48" width="96" height="96" role="img" aria-label={`${label}, 96 pixels`}>
                      <Icon />
                    </svg>
                    <svg viewBox="0 0 48 48" width="48" height="48" role="img" aria-label={`${label}, 48 pixels`}>
                      <Icon />
                    </svg>
                  </div>
                  <span className="font-body text-[11px] uppercase tracking-[0.16em] text-ge-graphite">{label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Side by side at 48px, which is how the scene will actually show them. */}
        <div className="mt-16">
          <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
            All seven at 48px, for relative weight
          </h2>
          <div className="mt-6 flex flex-wrap items-end gap-10 border border-ge-light bg-white px-8 py-10">
            {atlIcons.map(({ id, label, Icon }) => (
              <svg key={id} viewBox="0 0 48 48" width="48" height="48" role="img" aria-label={label}>
                <Icon />
              </svg>
            ))}
          </div>
        </div>

        {/* The static scene. No pulses yet — the loop, the taps and the labels only. */}
        <div className="mt-20 border-t border-ge-light pt-16">
          <Eyebrow>Static scene</Eyebrow>
          <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-none tracking-tight text-ge-black">
            The loop and its taps
          </h2>
          <p className="mt-5 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            Buildings are scaled to hint at thermal demand — hospital and campus heaviest, housing lightest — while the
            three resources stay one size, since their size would mean nothing. Every building stands on the same
            ground line, so the variation reads as height rather than drift.
          </p>
          <div className="mt-8 border border-ge-light bg-white p-4">
            <AtlDiagram layout="wide" />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
            Narrow layout, same node data
          </h2>
          <div className="mt-6 max-w-[340px] border border-ge-light bg-white p-4">
            <AtlDiagram layout="narrow" />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
            Responsive, switching at 768px — resize to check
          </h2>
          <div className="mt-6 border border-ge-light bg-white p-4">
            <AtlDiagram />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
            Tokens
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {swatches.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

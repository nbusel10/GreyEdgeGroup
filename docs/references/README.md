# Visual references for the animated ATL diagram

Source material for the multi-source Thermal Highway animation. Attach these images in any
chat that touches the animation's icons, colors, or composition — a fresh chat has no memory
of them.

## Present in this folder

### `atl-schematic-nextemp.png`

Our real NexTEMP ATL schematic. **This is the target graphic language.** Reuse its grammar:

- The loop is a white pill-shaped bar with a black outline and its name set inside it, not a bare line.
- Secondary pill bars group building clusters above the spine. This is how the drawing conveys distribution.
- Thick near-black risers tap every building and resource into the bar.
- Resources hang below the spine. The borefield is a U-tube array; the surface water exchanger is a stack of discs.
- Labels are small, black, uppercase, lightly letter-spaced, and set outside the icons.
- Everything is flat filled vector with black outlines. No gradients, no shadows, no depth.

### `atl-loop-semantics-DO-NOT-COPY-STYLE.png`

Useful for exactly two things:

1. The red and blue semantics for the legend: blue is cooler in winter and heat rejection in
   summer; red is warmer in winter and heat absorption in summer.
2. It draws the loop as two parallel pipes, one red and one blue, running a closed circuit,
   which is one candidate geometry for showing concurrent heating and cooling.

Ignore its rendering entirely. It is photorealistic, which is the one thing we do not want.
The filename says so on purpose.

## The one rule that overrides faithfulness

The NexTEMP schematic spends red on government buildings and cyan on commercial buildings,
the storage tank, and the river. In the animation, **red and blue mean thermal energy and
nothing else**, so no static object may be red or blue. Keep the schematic's flat filled
construction and black outlines, but recolor buildings into neutrals, greys, tans, and the
existing muted `--color-ge-accent` green. Pipes stay near-black, which is what makes the
pulses read.

Without this, a viewer cannot tell a red building from a red heat pulse, and the animation
fails at its only job.

## DOE Liftoff figures

`doe-liftoff-geothermal-heating-cooling-2025.pdf` is the full report, and the `doe-liftoff-fig*.png`
files are its conceptual-diagram pages rendered at 200 DPI. Attach the PNGs, not the PDF — Cursor
converts PDFs to text, so the PDF supplies the words and none of the graphics we care about.

Ranked by usefulness:

### 1. `doe-liftoff-fig08-fig09-tens-principles-systems-at-scale.png` (printed p18)

**The most important reference in this folder.** Figure 8 is essentially a static version of the
animation we are building: buildings arranged around a closed rounded loop, a geothermal borehole
field sitting inside the loop, a wastewater treatment plant tapped in with a sewer heat recovery
label, a data center, and a cold storage warehouse with its refrigeration system called out.

Two things to take from it directly:

- **Every building connects to the loop with a short red stub and a short blue stub.** Buildings
  themselves are muted greys, tans, and blue-greys. DOE arrived independently at the same rule we
  set: red and blue mean thermal energy, and nothing static competes for those colors.
- It draws the loop as a **closed rounded circuit**, not a straight spine, which is worth weighing
  when choosing the geometry.

It also has a compact key distinguishing a heat pump from a heat exchanger, which is a good model
for our legend. Figure 9 shares the page and shows the same idea at three scales in outline style.

### 2. `doe-liftoff-fig07-ghp-principles.png` (printed p17)

Cooling and heating shown side by side, and the lower half is close to our Mode 2 ground battery:
a ground loop with arrays of red and blue arrows labeled "heat dispersion" and "heat absorption"
pointing into and out of the earth. If the ground-as-thermal-battery mode needs a visual convention,
this is it.

### 3. `doe-liftoff-fig10-value-chain.png` (printed p19)

A stakeholder flow chart, so the composition is irrelevant, but the small icons inside its labeled
boxes are a good gauge of how simple an icon can be and still read.

### 4. `doe-liftoff-fig30-liftoff-imperatives.png` (printed p41)

Icon treatment for a set of parallel concepts.

### 5. `doe-liftoff-fig06-heat-pump-technologies.png` (printed p16)

Isometric illustrated buildings with red and blue borehole pipes. More rendered and dimensional
than the flat vector style we want, so use it for the red/blue subsurface convention only.

### Provenance

*Pathways to Commercial Liftoff: Geothermal Heating and Cooling*, Report #2 in DOE's geothermal
series, January 2025. Figures 6, 7, and 8 are credited to Marjorie Schott at NREL, adapted with
permission — we are taking stylistic cues, not reproducing the artwork.

**The original host `liftoff.energy.gov` no longer resolves; DOE appears to have retired the domain,
so search results pointing there are stale.** Working sources:

- [Internet Archive snapshot of the original DOE PDF](https://web.archive.org/web/20250422230925/https://liftoff.energy.gov/wp-content/uploads/2025/03/LIFTOFF_DOE_Geothermal-Heating-and-Cooling_Updated-3.21.25.pdf)
- [IGSHPA mirror](https://igshpa.org/wp-content/uploads/LIFTOFF_DOE_Geothermal_HC.pdf) — where this
  copy came from. Refuses scripted downloads but serves browsers.
- [OurEnergyPolicy resource page](https://www.ourenergypolicy.org/resources/pathways-to-commercial-liftoff-geothermal-heating-and-cooling/)

A companion overview slide deck was published at
`liftoff.energy.gov/wp-content/uploads/2025/01/Geothermal-HC-Webinar-Presentation_Feb-2025-Update.pdf`
and is more diagram-dense than the report. Worth retrieving from the Internet Archive if these
figures prove insufficient.

### Campus Energy reference

The animation that prompted this was seen at CampusEnergy2026, February 17 to 19, National
Harbor MD. Session recordings are free to attendees at <https://learn.districtenergy.org/>.
The two preconference workshops most likely to contain a multi-source animation are the
**Thermal Energy Networks Workshop** and the **District Energy and Data Centers Workshop**.
Check those first.

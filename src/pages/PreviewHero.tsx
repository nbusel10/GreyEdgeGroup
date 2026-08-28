import { useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import HeroCategoryLockup from '../components/heroes/HeroCategoryLockup'
import HeroDefinition from '../components/heroes/HeroDefinition'
import HeroTenRibbon from '../components/heroes/HeroTenRibbon'
import HeroSplitDiagram from '../components/heroes/HeroSplitDiagram'
import HeroDefinitionCard from '../components/heroes/HeroDefinitionCard'
import HeroSplitPanel from '../components/heroes/HeroSplitPanel'
import HeroLoopLine from '../components/heroes/HeroLoopLine'
import HeroContrast from '../components/heroes/HeroContrast'
import type { HeroVariantProps } from '../components/heroes/heroShared'
import { Container, Eyebrow, Section } from '../components/ui'
import { org } from '../content/site'
import { usePageMeta } from '../lib/meta'
import { usePrefersReducedMotion } from '../lib/hooks'

/**
 * TEMPORARY review route for the home hero, at /preview-hero.
 *
 * Four full-bleed drafts of the first viewport, aimed at making Thermal Energy
 * Networks read as the category we own. The live home page is unchanged until
 * one is signed off. Delete this page, its route, and the unused variants in
 * components/heroes once a direction is chosen.
 */

type Variant = {
  id: string
  n: number
  family: string
  title: string
  note: string
  Component: ComponentType<HeroVariantProps>
}

/** Second pass: four structurally different heroes, not variations on the first four. */
const round2: Variant[] = [
  {
    id: 'definition-card',
    n: 5,
    family: 'Contrast reversal',
    title: 'Definition card',
    note: 'Black type on a light card sitting on the footage, defining the term outright. Nothing else on the site reverses contrast this early, so the card reads as the subject of the page rather than another dark headline.',
    Component: HeroDefinitionCard,
  },
  {
    id: 'split-panel',
    n: 6,
    family: 'Geometry, no video',
    title: 'Hard split panel',
    note: 'No video and no gradient overlay. A solid type panel butts straight against a full-height photograph, with the accent used only as the edge between them. Quieter and more architectural than the current hero.',
    Component: HeroSplitPanel,
  },
  {
    id: 'loop-line',
    n: 7,
    family: 'Mechanism first',
    title: 'Live loop',
    note: 'An ambient loop runs the width of the hero with energy visibly moving along it, then the caption names it: "That loop is a Thermal Energy Network." Shows the thing working before asking anyone to learn the term.',
    Component: HeroLoopLine,
  },
  {
    id: 'contrast',
    n: 8,
    family: 'Editorial statement',
    title: 'Before and after',
    note: 'The old way struck through in grey, the new way in full white, with Thermal Energy Networks landing as the resolution. Emphasis comes from the argument rather than from setting the term larger.',
    Component: HeroContrast,
  },
]

/** First pass, kept for reference. */
const round1: Variant[] = [
  {
    id: 'category-lockup',
    n: 1,
    family: 'A — TEN in the headline',
    title: 'Category lockup',
    note: 'The headline breaks so "Thermal Energy Networks" takes the full display scale with an accent rule under it, and the rest of the sentence steps down around it. Strongest claim on the category; the eyebrow finally renders.',
    Component: HeroCategoryLockup,
  },
  {
    id: 'definition',
    n: 2,
    family: 'A — TEN in the headline',
    title: 'Definition hero',
    note: 'Same dominant category headline, then a rotating mechanism line (shared ambient loops / recovered heat / district scale) and a row of proof numbers. Answers "what is that?" without a scroll. Reduced motion shows the three phrases as one static line.',
    Component: HeroDefinition,
  },
  {
    id: 'ten-ribbon',
    n: 3,
    family: 'C — Current headline, TEN callout',
    title: 'TEN ribbon',
    note: 'Live headline and body untouched. An accent ribbon along the bottom edge gives Thermal Energy Networks its own bordered object with a one-sentence definition, using the panel language from the 300+ callout. Replaces the scroll cue.',
    Component: HeroTenRibbon,
  },
  {
    id: 'split-diagram',
    n: 4,
    family: 'C — Current headline, TEN callout',
    title: 'Split with network diagram',
    note: 'Live copy on the left, the ambient loop diagram framed on the right. Shows the network rather than asserting it. Stacks below lg with the diagram under the copy.',
    Component: HeroSplitDiagram,
  },
]

export default function PreviewHero() {
  const [forceReducedMotion, setForceReducedMotion] = useState(false)
  const osReduced = usePrefersReducedMotion()

  usePageMeta({
    title: `Preview — home hero — ${org.name}`,
    description: 'Draft home hero review. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · home hero ·{' '}
          <Link to="/" className="underline underline-offset-2 hover:text-white/80">
            Back to live home
          </Link>
        </p>
      </div>

      <Section className="bg-white">
        <Container>
          <Eyebrow>Temporary review page</Eyebrow>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl">
            Home hero drafts
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            The live hero already says <em>Thermal Energy Network</em>, but every word carries the same weight,
            so the term reads as part of a sentence rather than a category. Options 5 to 8 are the second pass:
            each one changes the structure of the hero rather than the size of the headline. The first four are
            kept below for reference. Production pages are unchanged.
          </p>
          <p className="mt-4 font-body text-sm text-ge-steel">
            Each band is a full first viewport, so scroll through one at a time. Mixing is fine — option 8&rsquo;s
            argument with option 7&rsquo;s loop, for instance.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              aria-pressed={forceReducedMotion}
              onClick={() => setForceReducedMotion((v) => !v)}
              className="inline-flex items-center justify-center border border-ge-light px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
            >
              {forceReducedMotion ? 'Show motion' : 'Preview reduced motion'}
            </button>
            {osReduced ? (
              <p className="font-body text-sm text-ge-steel">
                This browser already requests reduced motion, so every hero shows the poster image.
              </p>
            ) : forceReducedMotion ? (
              <p className="font-body text-sm text-ge-steel">
                Forcing the poster image and static type on every hero below.
              </p>
            ) : null}
          </div>

          <nav className="mt-12 flex flex-wrap gap-2">
            {[...round2, ...round1].map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="border border-ge-light px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
              >
                {v.n}. {v.title}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {round2.map(({ Component, ...v }) => (
        <section key={v.id} id={v.id} className="scroll-mt-20">
          <VariantLabel {...v} />
          <Component headingLevel={2} forceReducedMotion={forceReducedMotion} />
        </section>
      ))}

      <div className="border-t border-ge-light bg-white py-14">
        <Container>
          <Eyebrow>Already reviewed</Eyebrow>
          <p className="mt-5 max-w-3xl font-display text-2xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-3xl">
            The first four, kept for comparison
          </p>
        </Container>
      </div>

      {round1.map(({ Component, ...v }) => (
        <section key={v.id} id={v.id} className="scroll-mt-20">
          <VariantLabel {...v} />
          <Component headingLevel={2} forceReducedMotion={forceReducedMotion} />
        </section>
      ))}
    </>
  )
}

function VariantLabel({ n, title, family, note }: Omit<Variant, 'id' | 'Component'>) {
  return (
    <div className="border-t border-ge-light bg-ge-offwhite py-8">
      <Container>
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
          {n} — {title}
        </p>
        <p className="mt-1 font-body text-[11px] uppercase tracking-[0.18em] text-ge-accent">{family}</p>
        <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ge-steel">{note}</p>
      </Container>
    </div>
  )
}

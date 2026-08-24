import { useState } from 'react'
import { Link } from 'react-router-dom'
import GreyEdgeCycle, { type WordCycleVariant } from '../components/GreyEdgeCycle'
import { Container, Eyebrow, Section } from '../components/ui'
import { org } from '../content/site'
import { usePageMeta } from '../lib/meta'
import { usePrefersReducedMotion } from '../lib/hooks'
import { WORD_CYCLE_MS } from '../lib/wordCycle'

/**
 * TEMPORARY review route for the GreyEdge word cycle, at /preview-wordmark.
 *
 * Each skin gets its own full-bleed black band. Live site is unchanged until a
 * style is signed off. Delete this page and its route once a treatment is chosen.
 */

const styles: {
  id: WordCycleVariant
  n: number
  title: string
  note: string
  sizeClass: string
}[] = [
  {
    id: 'slot-reel',
    n: 1,
    title: 'Slot reel',
    note: 'Vertical drum. Outgoing word rolls up; Edge stays put. Gold line draws on GreyEdge.',
    sizeClass: 'text-4xl sm:text-5xl md:text-6xl',
  },
  {
    id: 'scramble',
    n: 2,
    title: 'Letter scramble',
    note: 'Only the letters in the word tick through A–Z and settle. Gold line draws on GreyEdge.',
    sizeClass: 'text-5xl sm:text-6xl md:text-7xl',
  },
  {
    id: 'type-from-e',
    n: 3,
    title: 'Type from E',
    note: 'Letters type out from the E and the word grows left. Then they delete back into the E before the next word types out. Gold line draws on GreyEdge.',
    sizeClass: 'text-4xl sm:text-5xl md:text-6xl',
  },
  {
    id: 'random-fill',
    n: 4,
    title: 'Split-flap board',
    note: 'Airport / menu Solari board: Edge lives on the tiles. Leading and Edge flip in together the first time; Edge then stays. Between words only the adjective tiles blank and refill. Bold type, tight tile spacing. Gold underline on GreyEdge.',
    sizeClass: 'text-5xl sm:text-6xl md:text-7xl',
  },
  {
    id: 'bump-bounce',
    n: 5,
    title: 'Bump bounce',
    note: 'One shove from below. The outgoing word launches up, fading and tilting; the incoming word settles. No double hop. Gold line draws on GreyEdge.',
    sizeClass: 'text-4xl sm:text-5xl md:text-6xl',
  },
  {
    id: 'fly-up-row',
    n: 6,
    title: 'Fly-up row',
    note: 'Lato Bold, all caps. Each adjective is green beside Edge, flies down into a white row below GreyEdge; accent underline holds, then the row resets.',
    sizeClass: 'text-[clamp(2rem,4.8vw,4.5rem)]',
  },
  {
    id: 'block-rotate',
    n: 7,
    title: 'Block rotate',
    note: 'Cube tumbles Leading → Cutting → Competitive → Grey beside Edge. After each green word holds, it zooms down into a dot-separated row below GreyEdge (option 6 inverted). No underline.',
    sizeClass: 'text-[clamp(2rem,4.8vw,4.5rem)]',
  },
]

function WordmarkBand({
  variant,
  forceReducedMotion,
  sizeClass,
}: {
  variant: WordCycleVariant
  forceReducedMotion: boolean
  sizeClass: string
}) {
  return (
    <div className="ge-word-band border-t border-ge-charcoal bg-ge-black py-12 md:py-16">
      <Container>
        <div className="flex justify-center overflow-visible">
          <GreyEdgeCycle variant={variant} forceReducedMotion={forceReducedMotion} className={sizeClass} />
        </div>
      </Container>
    </div>
  )
}

export default function PreviewWordmark() {
  const [forceReducedMotion, setForceReducedMotion] = useState(false)
  const osReduced = usePrefersReducedMotion()

  usePageMeta({
    title: `Preview — word cycle — ${org.name}`,
    description: 'Draft GreyEdge word-cycle review. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · word cycle ·{' '}
          <Link to="/" className="underline underline-offset-2 hover:text-white/80">
            Back to live home
          </Link>
        </p>
      </div>

      <Section className="bg-white">
        <Container>
          <Eyebrow>Temporary review page</Eyebrow>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl">
            GreyEdge word cycle
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            Rotates <em>Leading</em>, <em>Cutting</em>, and <em>Competitive</em> in front of a pinned{' '}
            <em>Edge</em>, then holds <em>GreyEdge</em> and loops. Each option below is its own black band — not
            the footer or Final CTA lockup. Production pages are unchanged.
          </p>
          <p className="mt-4 font-body text-sm text-ge-steel">
            {WORD_CYCLE_MS.dwell / 1000}s per adjective · {WORD_CYCLE_MS.transition / 1000}s transition ·{' '}
            {WORD_CYCLE_MS.lockHold / 1000}s hold on GreyEdge. Off-screen bands pause. Reduced motion is static
            GreyEdge.
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
                This browser already requests reduced motion, so every skin is static GreyEdge.
              </p>
            ) : forceReducedMotion ? (
              <p className="font-body text-sm text-ge-steel">Forcing the static lock on every band below.</p>
            ) : null}
          </div>

          <nav className="mt-12 flex flex-wrap gap-2">
            {styles.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="border border-ge-light px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
              >
                {s.n}. {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {styles.map((s) => (
        <section key={s.id} id={s.id} className="scroll-mt-20">
          <div className="border-t border-ge-light bg-ge-offwhite py-8">
            <Container>
              <p className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
                {s.n} — {s.title}
              </p>
              <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-ge-steel">{s.note}</p>
            </Container>
          </div>
          <WordmarkBand variant={s.id} forceReducedMotion={forceReducedMotion} sizeClass={s.sizeClass} />
        </section>
      ))}
    </>
  )
}

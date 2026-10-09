import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AtlDiagram from '../components/AtlDiagram'
import ProjectCard from '../components/ProjectCard'
import { GWatermark } from '../components/GMark'
import HeroScrollCue from '../components/HeroScrollCue'
import HeroLoopLine from '../components/heroes/HeroLoopLine'
import HeroSplitDiagram from '../components/heroes/HeroSplitDiagram'
import Challenges from '../components/sections/Challenges'
import AtlExplainer from '../components/sections/AtlExplainer'
import { Btn, Container, Eyebrow, Reveal, Section, StatBlock, proseLinkClass } from '../components/ui'
import { anchorQuote, partnerBriefBody, stats } from '../content/advantage'
import { atlModes } from '../content/atlModes'
import { loopConceptMore } from '../content/loopConceptNotes'
import { featuredProjects } from '../content/projects'
import { barriers, hero, org } from '../content/site'
import { usePrefersReducedMotion } from '../lib/hooks'
import { usePageMeta } from '../lib/meta'

/**
 * TEMPORARY review route for where the ambient-loop animation could sit on
 * the homepage, at /preview-home-loop.
 *
 * The live home page is unchanged. Each band is one placement, with enough of
 * the surrounding section to judge the seam. Delete this page and its route
 * once a direction is chosen.
 */

const LOOP_HREF = '/geothermal-101#thermal-highway'

const concepts = [
  {
    id: 'bridge',
    n: '1',
    title: 'Bridge after The Barriers',
    note: 'A short section between The Barriers and Partnership. The diagram runs the full width and cycles the four modes on its own, with the live captions and no tabs. Partnership would follow this band.',
  },
  {
    id: 'partnership',
    n: '2',
    title: 'Partnership inset',
    note: 'The district photograph comes out. The diagram sits in a white card in that column, and the 300+ badge stays on the card. The quote and the schematic share one band.',
  },
  {
    id: 'projects',
    n: '3',
    title: 'Beside Featured Projects',
    note: 'The Proof intro stays on the left. The diagram takes the right column, then the project cards run full width underneath. This is the tightest frame the wide diagram gets.',
  },
  {
    id: 'hero-loop',
    n: '4',
    title: 'Hero — live loop',
    note: 'Already on /preview-hero. An ambient loop is drawn across the hero, and the caption names it a Thermal Energy Network. The footage stays behind the type.',
  },
  {
    id: 'hero-split',
    n: '5',
    title: 'Hero — split diagram',
    note: 'Already on /preview-hero. Live hero copy on the left, a still of the network diagram on the right, over the same footage.',
  },
  {
    id: 'explainer',
    n: '6',
    title: 'Full explainer',
    note: 'The Thermal Energy Networks 101 opening, tabs and notes included, dropped onto the homepage as its own section.',
  },
  {
    id: 'text-link',
    n: '7',
    title: 'Text link only',
    note: 'No diagram. One line under the hero body, and the same line after the partnership paragraph. The hero footage is included so the line can be judged in place.',
  },
  {
    id: 'solved-button',
    n: '8',
    title: 'Button on the solved close',
    note: 'On the close of The Barriers — “These aren’t problems we’ve read about.” The button sits at the top right of that block and uses the same outline button as View all projects. It links to the animation.',
  },
] as const

export default function PreviewHomeLoop() {
  const [forceReducedMotion, setForceReducedMotion] = useState(false)
  const osReduced = usePrefersReducedMotion()

  usePageMeta({
    title: `Preview — loop on the homepage — ${org.name}`,
    description: 'Draft placements for the ambient loop animation on the homepage. Not the live site.',
  })

  return (
    <>
      <div className="fixed inset-x-0 top-16 z-40 bg-ge-accent lg:top-[72px]">
        <p className="px-5 py-2.5 text-center font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Preview only ·{' '}
          <Link to="/" className="underline underline-offset-2 hover:text-white/80">
            Live home
          </Link>
        </p>
      </div>

      <Section className="bg-white">
        <Container>
          <Eyebrow>Temporary review page</Eyebrow>
          <h1 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl">
            Where the loop could sit
          </h1>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite">
            The animation that opens Thermal Energy Networks 101 is not on the homepage. These eight bands try a
            place for it. The live homepage is unchanged. Options 4 and 5 already live on the{' '}
            <Link to="/preview-hero" className={proseLinkClass}>
              hero review
            </Link>
            .
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              data-ga-label="preview_loop_reduced_motion"
              aria-pressed={forceReducedMotion}
              onClick={() => setForceReducedMotion((v) => !v)}
              className="inline-flex items-center justify-center border border-ge-light px-6 py-3 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
            >
              {forceReducedMotion ? 'Show motion' : 'Preview reduced motion'}
            </button>
            {osReduced ? (
              <p className="font-body text-sm text-ge-steel">
                This browser already requests reduced motion, so the diagrams hold on the first mode.
              </p>
            ) : forceReducedMotion ? (
              <p className="font-body text-sm text-ge-steel">
                Motion is held: the diagrams freeze on the current mode, and the hero bands use the poster.
              </p>
            ) : null}
          </div>

          <nav className="mt-12 flex flex-wrap gap-2">
            {concepts.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="border border-ge-light px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent"
              >
                {c.n}. {c.title}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      <div id="bridge" className="scroll-mt-36">
        <ConceptLabel {...concepts[0]} />
        <Challenges />
        <LoopBridge forcePaused={forceReducedMotion} />
        <div className="bg-ge-black py-8">
          <Container>
            <p className="font-body text-[11px] uppercase tracking-[0.22em] text-ge-silver">
              Partnership — The Advantage of Experience would follow
            </p>
          </Container>
        </div>
      </div>

      <div id="partnership" className="scroll-mt-36">
        <ConceptLabel {...concepts[1]} />
        <PartnershipInset forcePaused={forceReducedMotion} />
      </div>

      <div id="projects" className="scroll-mt-36">
        <ConceptLabel {...concepts[2]} />
        <ProjectsBeside forcePaused={forceReducedMotion} />
      </div>

      <div id="hero-loop" className="scroll-mt-36">
        <ConceptLabel {...concepts[3]} />
        <HeroLoopLine headingLevel={2} forceReducedMotion={forceReducedMotion} />
      </div>

      <div id="hero-split" className="scroll-mt-36">
        <ConceptLabel {...concepts[4]} />
        <HeroSplitDiagram headingLevel={2} forceReducedMotion={forceReducedMotion} />
      </div>

      <div id="explainer" className="scroll-mt-36">
        <ConceptLabel {...concepts[5]} />
        <AtlExplainer
          panelNoun="concept"
          more={loopConceptMore('/geothermal-101#thermal-resources')}
          moreFullWidth
          intro={<ExplainerIntro />}
        />
      </div>

      <div id="text-link" className="scroll-mt-36">
        <ConceptLabel {...concepts[6]} />
        <TextLinkHero forceReducedMotion={forceReducedMotion} />
        <TextLinkPartnership />
      </div>

      <div id="solved-button" className="scroll-mt-36">
        <ConceptLabel {...concepts[7]} />
        <SolvedCloseButton />
      </div>
    </>
  )
}

function ConceptLabel({ n, title, note }: { n: string; title: string; note: string }) {
  return (
    <div className="border-t border-ge-light bg-ge-offwhite py-8">
      <Container>
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.28em] text-ge-graphite">
          {n} — {title}
        </p>
        <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-ge-steel">{note}</p>
      </Container>
    </div>
  )
}

function SolvedCloseButton() {
  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-display text-3xl font-bold uppercase tracking-tight text-ge-black sm:text-4xl md:text-5xl">
              {barriers.closing}
              <br />
              {barriers.closingLead}{' '}
              <span className="text-ge-accent">{barriers.closingAccent}</span>
            </p>
            <p className="mt-4 max-w-none font-body text-base leading-relaxed text-ge-graphite">{barriers.closingBody}</p>
          </div>
          <Btn to={LOOP_HREF} track="preview_loop_solved_how_one_loop" variant="outline" className="shrink-0 self-start">
            How one loop does it all
          </Btn>
        </div>
      </Container>
    </Section>
  )
}

function ExplainerIntro() {
  return (
    <p>
      The Thermal Highway® is GreyEdge’s approach to connecting buildings and{' '}
      <a href="/geothermal-101#thermal-resources" className={proseLinkClass}>
        thermal resources
      </a>{' '}
      across a network through a single ambient temperature loop. Heat pumps are the devices that move thermal energy
      between the loop and each building. They can draw heat from the loop for heating or remove heat from a building
      and return it to the loop for cooling. As energy moves through the network, it can be exchanged between
      buildings, stored for later use, recovered from sources like wastewater or data centers, or supplied by multiple
      thermal resources working together. The four graphics below show different concepts of how the same loop
      continuously balances, moves, and delivers energy and prioritizes the most cost effective energy path.
    </p>
  )
}

function LoopBridge({ forcePaused }: { forcePaused: boolean }) {
  return (
    <Section className="border-t border-ge-light bg-white">
      <Container>
        <Reveal>
          <Eyebrow>The Exchange</Eyebrow>
          <h2 className="mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-ge-black sm:text-5xl md:text-6xl">
            How <span className="text-ge-accent">One Loop</span> Does It All.
          </h2>
          <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
            Buildings and thermal resources trade heat on a single ambient temperature loop.
          </p>
          <div className="mt-8">
            <Btn to={LOOP_HREF} track="preview_loop_bridge_see_how_it_works" variant="outline">
              See how it works
            </Btn>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-12">
          <CyclingLoop forcePaused={forcePaused} />
        </Reveal>
      </Container>
    </Section>
  )
}

function PartnershipInset({ forcePaused }: { forcePaused: boolean }) {
  return (
    <section className="scroll-mt-36">
      <div className="relative overflow-hidden bg-ge-black py-20 md:py-28">
        <GWatermark className="text-white/[0.04]" side="right" mark="ge" />
        <Container className="relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <Eyebrow tone="light">Partnership</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl">
                The Advantage of
                <br />
                <span className="text-ge-accent">Experience</span>
              </h2>
              <blockquote className="mt-9 border-l-2 border-ge-accent pl-6">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-white sm:text-3xl">
                  {anchorQuote}
                </p>
              </blockquote>
              <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-ge-light sm:text-lg">
                {partnerBriefBody}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Btn to="/approach" track="preview_loop_partnership_approach" variant="light">
                  Our approach
                </Btn>
                <Btn to="/contact" track="preview_loop_partnership_start_planning" variant="ghost">
                  Start planning
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative bg-white">
                <div className="p-4 pb-28 sm:p-6 sm:pb-32">
                  <CyclingLoop forcePaused={forcePaused} legend={false} />
                </div>
                <div className="absolute bottom-6 right-6 border border-white bg-ge-accent px-6 py-4">
                  <div className="font-display text-3xl font-bold leading-none text-white">300+</div>
                  <div className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-white/75">
                    Years in the field
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </div>

      <div className="border-t border-ge-light bg-ge-offwhite py-14 md:py-16">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
              {stats.map((s, i) => (
                <div key={s.label} className="relative px-6 py-1">
                  {i > 0 && (
                    <span
                      aria-hidden
                      className={`absolute left-0 top-1/2 h-14 w-px -translate-y-1/2 bg-ge-light md:h-16 ${
                        i % 2 === 0 ? 'hidden md:block' : ''
                      }`}
                    />
                  )}
                  <StatBlock value={s.value} label={s.label} prefix={s.prefix} suffix={s.suffix} />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </div>
    </section>
  )
}

function ProjectsBeside({ forcePaused }: { forcePaused: boolean }) {
  return (
    <Section className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <Eyebrow>The Proof</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl md:text-6xl">
              Featured Projects
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
              Behind every successful thermal energy project is a series of complex decisions. From site conditions and
              infrastructure constraints to utility integration and long-term performance, The GreyEdge Group helps
              clients navigate each challenge with confidence, delivering practical solutions that create lasting
              value.
            </p>
            <div className="mt-8">
              <Btn to="/projects" track="preview_loop_projects_view_all" variant="outline">
                View all projects
              </Btn>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-ge-light bg-white p-4 sm:p-6">
              <p className="font-body text-[10px] uppercase tracking-[0.22em] text-ge-accent">
                The network those projects share
              </p>
              <CyclingLoop forcePaused={forcePaused} legend={false} className="mt-4" />
              <Link
                to={LOOP_HREF}
                className="mt-4 inline-block font-body text-[10px] uppercase tracking-[0.22em] text-ge-graphite transition-colors hover:text-ge-accent"
              >
                See how it works
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.07} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function TextLinkHero({ forceReducedMotion }: { forceReducedMotion: boolean }) {
  const reduced = usePrefersReducedMotion() || forceReducedMotion

  return (
    <section className="relative flex min-h-svh items-end overflow-hidden bg-ge-black lg:h-[92vh] lg:min-h-[720px]">
      {reduced ? (
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={hero.image}
          aria-hidden="true"
        >
          <source src={hero.video} type="video/mp4" />
        </video>
      )}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,23,26,0.78) 0%, rgba(20,23,26,0.32) 26%, rgba(20,23,26,0.6) 58%, rgba(20,23,26,0.94) 100%)',
        }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] pb-28 pl-4 pr-5 pt-24 sm:pl-5 sm:pr-8 md:pt-28 lg:pb-32 lg:pl-6">
        <div className="fade-slide-up max-w-4xl lg:max-w-5xl">
          <p className="font-body text-base font-semibold uppercase tracking-wide text-ge-light [word-spacing:0.55em] sm:text-lg md:text-xl">
            {hero.words.join(' ')}
          </p>
          <h2 className="mt-4 font-display text-[2.5rem] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[65px] lg:max-w-[50vw]">
            <span className="block">{hero.headlineLead}</span>
            <span className="block text-white">{hero.headlineEmphasis}</span>
            <span className="block">{hero.headlineAccent}</span>
          </h2>
          <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-ge-light sm:text-base md:text-lg">
            {hero.body}
          </p>
          <p className="mt-4 max-w-2xl">
            <Link
              to={LOOP_HREF}
              className="font-body text-sm text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-ge-accent-bright hover:decoration-ge-accent-bright sm:text-base"
            >
              See how one loop moves heat between buildings
            </Link>
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-start">
            <Btn to="/contact" track="preview_loop_text_hero_start_planning" variant="light">
              Start planning
            </Btn>
            <Btn to="/projects" track="preview_loop_text_hero_see_our_work" variant="ghost">
              See our work
            </Btn>
          </div>
        </div>
      </div>
      <HeroScrollCue />
    </section>
  )
}

function TextLinkPartnership() {
  return (
    <section className="relative overflow-hidden bg-ge-black py-20 md:py-28">
      <GWatermark className="text-white/[0.04]" side="right" mark="ge" />
      <Container className="relative">
        <p className="font-body text-[11px] uppercase tracking-[0.22em] text-ge-silver">
          Same line, inside the partnership band
        </p>
        <div className="mt-8 max-w-xl">
          <Eyebrow tone="light">Partnership</Eyebrow>
          <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight text-white sm:text-5xl">
            The Advantage of
            <br />
            <span className="text-ge-accent">Experience</span>
          </h2>
          <blockquote className="mt-9 border-l-2 border-ge-accent pl-6">
            <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-white sm:text-3xl">
              {anchorQuote}
            </p>
          </blockquote>
          <p className="mt-8 font-body text-base leading-relaxed text-ge-light sm:text-lg">{partnerBriefBody}</p>
          <p className="mt-4">
            <Link
              to={LOOP_HREF}
              className="font-body text-sm text-white underline decoration-white/40 underline-offset-4 transition-colors hover:text-ge-accent-bright hover:decoration-ge-accent-bright sm:text-base"
            >
              See how one loop moves heat between buildings
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}

/**
 * The four thermal modes, advancing on their own. No tabs: the caption is the
 * only chrome. Off-screen diagrams freeze so this page does not run every loop
 * at once.
 */
function CyclingLoop({
  forcePaused,
  legend = true,
  className = '',
}: {
  forcePaused: boolean
  legend?: boolean
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [inView, setInView] = useState(false)
  const reduceMotion = usePrefersReducedMotion()
  const mode = atlModes[index]
  const paused = forcePaused || reduceMotion || !inView

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (paused) return
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % atlModes.length), mode.cycleMs)
    return () => window.clearTimeout(t)
  }, [paused, index, mode.cycleMs])

  return (
    <div ref={ref} className={className}>
      <p className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">{mode.tab}</p>
      <p className="mt-2 font-body text-sm leading-relaxed text-ge-graphite">{mode.caption}</p>
      <p className="sr-only" aria-live="polite">
        {mode.tab}. {mode.caption}
      </p>
      <div className={`mt-4 ${paused ? 'atl-is-paused' : ''}`}>
        <AtlDiagram modeId={mode.id} />
      </div>
      {legend ? <LoopLegend /> : null}
    </div>
  )
}

function LoopLegend() {
  return (
    <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
      <li className="flex items-center gap-2.5">
        <span className="h-1.5 w-6 shrink-0 bg-atl-heat" aria-hidden="true" />
        <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">Heat</span>
      </li>
      <li className="flex items-center gap-2.5">
        <span className="h-1.5 w-6 shrink-0 bg-atl-cool" aria-hidden="true" />
        <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">Cool</span>
      </li>
      <li className="flex items-center gap-2.5">
        <span className="flex w-6 shrink-0 gap-1" aria-hidden="true">
          <span className="h-1.5 flex-1 bg-atl-flow" />
          <span className="h-1.5 flex-1 bg-atl-flow" />
          <span className="h-1.5 flex-1 bg-atl-flow" />
        </span>
        <span className="font-body text-[11px] uppercase tracking-[0.14em] text-ge-graphite">Circulation</span>
      </li>
    </ul>
  )
}

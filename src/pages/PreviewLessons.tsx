import { useState } from 'react'
import { Link } from 'react-router-dom'
import { lessons } from '../content/advantage'
import { site } from '../content/images'
import { org } from '../content/site'
import { Container, Eyebrow, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable comparison of Built on Experience / What We've Learned layouts.
 * Not linked in nav. Live `/approach` is unchanged until a direction is chosen.
 */

const media = [
  site.puzzle,
  site.blueprints,
  site['campus-build'],
  site['thermal-plant-inspection'],
  site['onsite-work'],
]

const shorts = ['The seams', 'Early decisions', 'Right-sizing', 'Verification', 'Existing assets']

const variants = [
  { id: 'option-a', letter: 'A', title: 'Photo cards', note: 'Image on every lesson · 2+3 grid' },
  { id: 'option-b', letter: 'B', title: 'Tabs + photo', note: 'One changing image · no extra scroll' },
  { id: 'option-c', letter: 'C', title: 'Split picker', note: 'One changing image · click to read' },
  { id: 'option-d', letter: 'D', title: 'Hero + compact grid', note: 'One shared photo · all five in view' },
  { id: 'option-e', letter: 'E', title: 'Featured + supporting', note: 'Large photo on one · thumbs on the rest' },
]

function Intro() {
  return (
    <>
      <Eyebrow>What We&rsquo;ve Learned</Eyebrow>
      <h2 className="mt-5 max-w-3xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
        Built on Experience
      </h2>
      <p className="mt-6 max-w-none font-body text-base leading-relaxed text-ge-graphite">
        With more than 300 years of combined experience helping shape the geothermal industry, we bring a perspective
        that only comes from decades of firsthand involvement. We understand the technologies, stakeholders, funding
        opportunities, permitting, and policies that influence long-term success. We leverage that knowledge to help
        clients make informed decisions, secure critical resources, and maximize the impact of their investment.
      </p>
    </>
  )
}

function ComeIn({ capability }: { capability: string }) {
  return (
    <div>
      <div className="font-body text-[10px] uppercase tracking-[0.22em] text-ge-steel">Where we come in</div>
      <div className="mt-2 flex items-start gap-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
        <span className="font-body text-sm leading-snug text-ge-charcoal">{capability}</span>
      </div>
    </div>
  )
}

function VariantBar({ letter, title, note }: { letter: string; title: string; note: string }) {
  return (
    <div className="border-b border-ge-charcoal bg-ge-black py-4">
      <Container>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-display text-xl font-bold uppercase tracking-wide text-ge-accent">Option {letter}</span>
          <span className="font-display text-xl font-bold uppercase tracking-wide text-white">{title}</span>
          <span className="font-body text-[11px] uppercase tracking-[0.16em] text-ge-steel">{note}</span>
        </div>
      </Container>
    </div>
  )
}

/** A — 2 large + 3 smaller photo cards. */
function OptionA() {
  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid gap-5 md:grid-cols-6">
          {lessons.map((l, i) => {
            const wide = i < 2
            return (
              <article
                key={l.lesson}
                className={`flex flex-col border border-ge-light bg-white ${wide ? 'md:col-span-3' : 'md:col-span-2'}`}
              >
                <div className={`img-cut overflow-hidden bg-ge-light ${wide ? 'h-52' : 'h-40'}`}>
                  <img src={media[i].src} alt={media[i].alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-xl">
                    {l.lesson}
                  </h3>
                  <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ge-graphite">{l.detail}</p>
                  <div className="mt-5 border-t border-ge-light pt-4">
                    <ComeIn capability={l.capability} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}

/** B — Challenges-style tabs, one photo at a time. */
function OptionB() {
  const [active, setActive] = useState(0)
  const l = lessons[active]
  const img = media[active]

  return (
    <Section className="bg-white">
      <Container>
        <Intro />
        <div className="mt-12 border border-ge-light">
          <div role="tablist" aria-label="Lessons" className="grid grid-cols-5 border-b border-ge-light bg-ge-offwhite">
            {shorts.map((label, i) => {
              const selected = active === i
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(i)}
                  className={`group relative flex flex-col items-start gap-2 border-r border-ge-light px-3 py-5 text-left last:border-r-0 lg:px-5 ${
                    selected ? 'bg-white' : 'hover:bg-white/60'
                  }`}
                >
                  <span className={`font-body text-[10px] tracking-[0.18em] ${selected ? 'text-ge-accent' : 'text-ge-steel'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`font-display text-[13px] font-bold uppercase leading-snug tracking-wide lg:text-base ${
                      selected ? 'text-ge-black' : 'text-ge-steel group-hover:text-ge-graphite'
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`absolute inset-x-0 bottom-0 h-0.5 ${selected ? 'bg-ge-black' : 'bg-transparent'}`}
                    aria-hidden="true"
                  />
                </button>
              )
            })}
          </div>
          <div className="grid bg-white lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className="img-cut relative min-h-56 overflow-hidden bg-ge-light lg:min-h-[28rem]">
              <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,23,26,0.4), transparent 65%)' }}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6 p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
                {l.lesson}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-ge-graphite">{l.detail}</p>
              <ComeIn capability={l.capability} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** C — Image left, clickable list right. */
function OptionC() {
  const [active, setActive] = useState(0)
  const l = lessons[active]
  const img = media[active]

  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid overflow-hidden border border-ge-light lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="img-cut relative min-h-72 bg-ge-light lg:min-h-full">
            <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-white">
            {lessons.map((item, i) => {
              const selected = active === i
              return (
                <button
                  key={item.lesson}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`w-full border-b border-ge-light px-6 py-5 text-left last:border-b-0 lg:px-8 ${
                    selected ? 'bg-ge-offwhite' : 'bg-white hover:bg-ge-offwhite/60'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-display text-xl font-bold leading-none ${selected ? 'text-ge-accent' : 'text-ge-light'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`font-display text-lg font-bold uppercase leading-snug tracking-wide ${
                        selected ? 'text-ge-black' : 'text-ge-graphite'
                      }`}
                    >
                      {shorts[i]}
                    </span>
                  </div>
                  {selected && (
                    <div className="mt-4 pl-11">
                      <p className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                        {item.lesson}
                      </p>
                      <p className="mt-3 font-body text-sm leading-relaxed text-ge-graphite">{item.detail}</p>
                      <div className="mt-4">
                        <ComeIn capability={item.capability} />
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** D — One hero photo, then a tight five-up text grid. */
function OptionD() {
  const hero = site['design-meeting']

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
          <Intro />
          <div className="img-cut overflow-hidden bg-ge-light">
            <img src={hero.src} alt={hero.alt} className="aspect-[16/10] h-full w-full object-cover lg:aspect-[5/3]" loading="lazy" />
          </div>
        </div>
        <ol className="mt-12 grid border-l border-t border-ge-light sm:grid-cols-2 xl:grid-cols-5">
          {lessons.map((l, i) => (
            <li key={l.lesson} className="flex flex-col border-b border-r border-ge-light bg-ge-offwhite p-6 xl:p-5">
              <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-base font-bold uppercase leading-snug tracking-wide text-ge-black xl:text-[15px]">
                {l.lesson}
              </h3>
              <p className="mt-3 flex-1 font-body text-[13px] leading-relaxed text-ge-graphite">{l.detail}</p>
              <div className="mt-5 border-t border-ge-light pt-4">
                <ComeIn capability={l.capability} />
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

/** E — First lesson featured with a large photo; the rest as supporting cards with thumbs. */
function OptionE() {
  const featured = lessons[0]
  const rest = lessons.slice(1)

  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid overflow-hidden border border-ge-light bg-white lg:grid-cols-2">
          <div className="img-cut relative min-h-64 bg-ge-light lg:min-h-[26rem]">
            <img src={media[0].src} alt={media[0].alt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">01</span>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
              {featured.lesson}
            </h3>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-ge-graphite">{featured.detail}</p>
            <div className="mt-6">
              <ComeIn capability={featured.capability} />
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((l, i) => (
            <article key={l.lesson} className="grid border border-ge-light bg-white sm:grid-cols-[8.5rem_1fr]">
              <div className="img-cut h-36 overflow-hidden bg-ge-light sm:h-full">
                <img src={media[i + 1].src} alt={media[i + 1].alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black">
                  {l.lesson}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-ge-graphite">{l.detail}</p>
                <div className="mt-4">
                  <ComeIn capability={l.capability} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default function PreviewLessons() {
  usePageMeta({
    title: `Preview — Built on Experience — ${org.name}`,
    description: 'Draft layouts for the What We\'ve Learned section. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · Built on Experience layouts ·{' '}
          <Link to="/preview-services" className="underline underline-offset-2 hover:text-white/80">
            Services
          </Link>
          {' · '}
          <Link to="/approach" className="underline underline-offset-2 hover:text-white/80">
            Approach
          </Link>
        </p>
      </div>

      <div className="sticky top-16 z-40 border-b border-ge-light bg-ge-offwhite/95 backdrop-blur-md lg:top-[72px]">
        <Container>
          <nav className="flex gap-1 overflow-x-auto py-3" aria-label="Layout options">
            {variants.map((v) => (
              <a
                key={v.id}
                href={`#${v.id}`}
                className="shrink-0 px-3 py-2 font-body text-[10px] font-medium uppercase tracking-[0.16em] text-ge-graphite hover:text-ge-black"
              >
                {v.letter} · {v.title}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      {variants.map((v) => (
        <div key={v.id} id={v.id} className="scroll-mt-36">
          <VariantBar letter={v.letter} title={v.title} note={v.note} />
          {v.letter === 'A' && <OptionA />}
          {v.letter === 'B' && <OptionB />}
          {v.letter === 'C' && <OptionC />}
          {v.letter === 'D' && <OptionD />}
          {v.letter === 'E' && <OptionE />}
        </div>
      ))}
    </>
  )
}

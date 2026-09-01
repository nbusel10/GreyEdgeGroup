import { useState } from 'react'
import { Link } from 'react-router-dom'
import { capabilities, capabilityNote, serviceGroups as groups } from '../content/advantage'
import { site } from '../content/images'
import { org } from '../content/site'
import { Container, Eyebrow, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable comparison of Our Services / Total Capability layouts.
 * Not linked in nav. Live `/approach` now uses Option A.
 */

const variants = [
  { id: 'option-a', letter: 'A', title: 'Category photo cards', note: 'Image on every group · five in one row' },
  { id: 'option-b', letter: 'B', title: 'Tabs + photo', note: 'One changing image · no extra scroll' },
  { id: 'option-c', letter: 'C', title: 'Split picker', note: 'One changing image · click to read' },
  { id: 'option-d', letter: 'D', title: 'Hero + tight grid', note: 'One shared photo · all 13 in view' },
  { id: 'option-e', letter: 'E', title: 'Featured + supporting', note: 'Large photo on one · thumbs on the rest' },
]

function Intro({ noteBeside = true }: { noteBeside?: boolean }) {
  return (
    <div className={noteBeside ? 'grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-14 lg:gap-20' : ''}>
      <div>
        <Eyebrow>Total Capability</Eyebrow>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
          Our Services
        </h2>
      </div>
      <p
        className={`font-body text-base leading-relaxed text-ge-graphite md:text-[15px] ${
          noteBeside ? 'max-w-md md:justify-self-end' : 'mt-6 max-w-none'
        }`}
      >
        {capabilityNote}
      </p>
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

function ServiceList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-ge-accent" aria-hidden="true" />
          <span className="font-body text-sm leading-snug text-ge-charcoal">{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** A — five category cards with photos, one viewport on xl. */
function OptionA() {
  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {groups.map((g, i) => (
            <article key={g.title} className="flex flex-col border border-ge-light bg-white">
              <div className="img-cut h-40 overflow-hidden bg-ge-light xl:h-36">
                  <img src={g.image} alt={g.imageAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="flex flex-1 flex-col p-5 xl:p-4">
                <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black xl:text-base">
                  {g.title}
                </h3>
                <ServiceList items={g.items} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

/** B — Challenges-style tabs, one photo at a time. */
function OptionB() {
  const [active, setActive] = useState(0)
  const g = groups[active]

  return (
    <Section className="bg-white">
      <Container>
        <Intro />
        <div className="mt-12 border border-ge-light">
          <div role="tablist" aria-label="Service groups" className="grid grid-cols-5 border-b border-ge-light bg-ge-offwhite">
            {groups.map((item, i) => {
              const selected = active === i
              return (
                <button
                  key={item.short}
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
                    {item.short}
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
            <div className="img-cut relative min-h-56 overflow-hidden bg-ge-light lg:min-h-[26rem]">
              <img src={g.image} alt={g.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(20,23,26,0.4), transparent 65%)' }}
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-10">
              <h3 className="font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
                {g.title}
              </h3>
              <ServiceList items={g.items} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

/** C — Image left, clickable groups right. */
function OptionC() {
  const [active, setActive] = useState(0)
  const g = groups[active]

  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid overflow-hidden border border-ge-light lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="img-cut relative min-h-72 bg-ge-light lg:min-h-full">
            <img src={g.image} alt={g.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="bg-white">
            {groups.map((item, i) => {
              const selected = active === i
              return (
                <button
                  key={item.title}
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
                      {item.short}
                    </span>
                  </div>
                  {selected && (
                    <div className="mt-4 pl-11">
                      <p className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                        {item.title}
                      </p>
                      <ServiceList items={item.items} />
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

/** D — One hero photo, then all 13 services in a tight numbered grid. */
function OptionD() {
  const hero = site['design-session']

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-14">
          <Intro noteBeside={false} />
          <div className="img-cut overflow-hidden bg-ge-light">
            <img
              src={hero.src}
              alt={hero.alt}
              className="aspect-[16/10] h-full w-full object-cover lg:aspect-[5/3]"
              loading="lazy"
            />
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-1 border-l border-t border-ge-light sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {capabilities.map((c, i) => (
            <li
              key={c}
              className="border-b border-r border-ge-light bg-ge-offwhite px-5 py-5 transition-colors duration-200 hover:bg-white"
            >
              <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 block font-display text-[15px] font-bold uppercase leading-snug tracking-wide text-ge-black">
                {c}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}

/** E — First group featured with a large photo; the rest as supporting cards with thumbs. */
function OptionE() {
  const featured = groups[0]
  const rest = groups.slice(1)

  return (
    <Section className="bg-ge-offwhite">
      <Container>
        <Intro />
        <div className="mt-12 grid overflow-hidden border border-ge-light bg-white lg:grid-cols-2">
          <div className="img-cut relative min-h-64 bg-ge-light lg:min-h-[22rem]">
            <img src={featured.image} alt={featured.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-10">
            <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">01</span>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-3xl">
              {featured.title}
            </h3>
            <ServiceList items={featured.items} />
          </div>
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((g, i) => (
            <article key={g.title} className="grid border border-ge-light bg-white sm:grid-cols-[8.5rem_1fr]">
              <div className="img-cut h-36 overflow-hidden bg-ge-light sm:h-full">
                  <img src={g.image} alt={g.imageAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-6">
                <span className="font-body text-[10px] tracking-[0.18em] text-ge-steel">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold uppercase leading-snug tracking-wide text-ge-black">
                  {g.title}
                </h3>
                <ServiceList items={g.items} />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}

export default function PreviewServices() {
  usePageMeta({
    title: `Preview — Our Services — ${org.name}`,
    description: 'Draft layouts for the Our Services section. Not the live site.',
  })

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <p className="pointer-events-auto border border-ge-accent bg-ge-accent px-5 py-3 font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-lg">
          Preview only · Our Services layouts ·{' '}
          <Link to="/preview-process" className="underline underline-offset-2 hover:text-white/80">
            Process
          </Link>
          {' · '}
          <Link to="/preview-lessons" className="underline underline-offset-2 hover:text-white/80">
            Lessons
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

import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { gaLabel } from '../lib/gaLabel'
import { Container, Eyebrow, Section, proseLinkClass } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Disposable comparison of ways to shorten the 101 FAQ.
 * Not linked in nav. Live /geothermal-101 is unchanged.
 */

type Faq = { q: string; a: ReactNode; find?: string }

const VISIBLE = 4

const faqs: Faq[] = [
  {
    q: 'What does a Thermal Energy Network cost, and when does it make financial sense?',
    find: 'The answer to this question is nuanced and needs to be developed for each application. Financial viability often pivots on three questions: How large a load can you connect within a small geographic circle? What thermal resources are nearby? And what existing building systems are currently operating in the buildings being considered? State and federal tax credits and incentives can go a long way toward making a Thermal Energy Network financially viable.',
    a: (
      <>
        The answer to this question is nuanced and needs to be developed for each application. Financial viability
        often pivots on three questions: How large a load can you connect within a small geographic circle? What{' '}
        <a href="/geothermal-101#thermal-resources" className={proseLinkClass}>
          thermal resources
        </a>{' '}
        are nearby? And what existing building systems are currently operating in the buildings being considered? State
        and federal tax credits and incentives can go a long way toward making a{' '}
        <a href="/geothermal-101#networks" className={proseLinkClass}>
          Thermal Energy Network
        </a>{' '}
        financially viable.
      </>
    ),
  },
  {
    q: 'Is this the same as geothermal power?',
    a: 'No. Geothermal power generation taps very high temperature resources to spin a turbine, and only works in a few places on earth. What we do is ground-source heat exchange: we use the stable moderate temperature of the shallow ground as a place to put heat in summer and take heat from in winter. It works essentially anywhere.',
  },
  {
    q: 'How is a Thermal Energy Network different from conventional district heating and cooling?',
    a: 'Conventional district systems push hot or chilled water from a central plant to every building. A Thermal Energy Network is an ambient temperature loop: buildings and thermal resources trade usable heat within a shared pipe, and each building’s heat pumps make the final temperature lift. Thermal resources are distributed around the loop, which increases the system’s resiliency and efficiency.',
  },
  {
    q: 'Does every Thermal Energy Network need a geothermal borefield?',
    a: 'No. Geoexchange is one common source, sink, and storage option, not a requirement for every network. Wastewater, process heat, surface water, mine water, and building-to-building diversity can share the load, which often shrinks how much field you need. When you do drill, bores commonly sit under parking, fields, or the building footprint.',
  },
  {
    q: 'Does it work in cold climates?',
    a: 'Absolutely. Below about six meters, ground temperature stays near the local annual average all year, so a system in Steamboat Springs is drawing from roughly 45°F ground while the air outside is below zero. The colder the air, the bigger the advantage over an air-source system.',
  },
  {
    q: 'Can an existing building connect to a Thermal Energy Network?',
    a: 'Yes, often with minimal interventions necessary. Depending on the type of system the existing building has, a heat pump system can replace boilers and chillers directly and serve as the connection between the building system and the central loop. In this case few or minimal changes are necessary out in the building itself and the connection becomes a mechanical room retrofit.',
  },
  {
    q: 'Can the network be built in phases as a development grows?',
    a: 'Yes, and that is usually how districts get built. Design the backbone for known phase-one loads, then leave connection points and reserved capacity so later buildings or thermal resources can join without rebuilding the pipe. The goal is expandable infrastructure, not a one-shot plant sized only for today’s tenants.',
  },
  {
    q: 'What happens when heating and cooling loads don’t balance?',
    a: 'The loop uses thermal resources as a balancing account. When buildings cannot offset one another directly, surplus heat goes into the ground, wastewater, or another sink on the network, and a shortfall is drawn from the same places. That is why geoexchange, process heat and storage sit on the loop: they absorb the difference so far less heat has to be rejected or produced from scratch.',
  },
  {
    q: 'How long do these systems last?',
    a: 'The ground loop is the long-lived part. The polyethylene piping is typically warranted for 50 years and expected to last longer. Heat pumps are replaced on a normal mechanical cycle of roughly 20 to 25 years.',
  },
  {
    q: 'Who owns and operates the network, and what happens if the development changes?',
    a: 'Ownership can sit with a public entity, a utility, or a third party. Settle early who finances, operates, meters, and decides when the network expands. Load diversity modeling and reserved capacity are how you plan for buildings joining, leaving, or changing use without treating every lease change as a redesign.',
  },
  {
    q: 'Will a Thermal Energy Network require an electrical service upgrade?',
    a: 'Often the upgrade is smaller than building-by-building electrification, and sometimes it is avoided, because diversity and thermal storage flatten coincident peaks. It is still site-specific: the right question is whether the network’s coincident load fits the feeder, not a promise that no upgrade is ever required.',
  },
]

const lead = faqs.slice(0, VISIBLE)
const rest = faqs.slice(VISIBLE)

const samples = [
  { id: 'more', k: 'A', t: 'More questions', d: 'One control opens the rest in the same list, and can close them again.' },
  { id: 'group', k: 'B', t: 'Second group', d: 'The other seven sit in their own closed block.' },
  { id: 'batches', k: 'C', t: 'In batches', d: 'Each click adds about four more, until the list is complete.' },
  { id: 'search', k: 'D', t: 'Search', d: 'The first four stay up, with More questions for the rest. Typing searches every question and shows only the matches.' },
  { id: 'links', k: 'E', t: 'Quiet links', d: 'The other seven are sentence-case links, so the extra titles stay small.' },
]

function Plus({ open, className = '' }: { open: boolean; className?: string }) {
  return (
    <svg
      className={`h-4 w-4 shrink-0 text-ge-accent transition-transform ${open ? 'rotate-45' : ''} ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function Accordion({
  items,
  open,
  onToggle,
  track,
}: {
  items: Faq[]
  open: number | null
  onToggle: (i: number) => void
  track: string
}) {
  return (
    <dl className="border-t border-ge-light">
      {items.map((f, i) => (
        <div key={f.q} className="border-b border-ge-light">
          <dt>
            <button
              type="button"
              data-ga-label={gaLabel(track, f.q)}
              onClick={() => onToggle(i)}
              aria-expanded={open === i}
              className="flex w-full items-start justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
                {f.q}
              </span>
              <Plus open={open === i} className="mt-1.5" />
            </button>
          </dt>
          {open === i && (
            <dd className="fade-slide-up max-w-3xl pb-7 font-body text-base leading-relaxed text-ge-graphite">{f.a}</dd>
          )}
        </div>
      ))}
    </dl>
  )
}

function RevealRow({
  open,
  onClick,
  track,
  children,
}: {
  open: boolean
  onClick: () => void
  track: string
  children: ReactNode
}) {
  return (
    <button
      type="button"
      data-ga-label={track}
      onClick={onClick}
      aria-expanded={open}
      className="flex w-full items-center justify-between gap-6 border-b border-ge-light py-6 text-left"
    >
      <span className="font-display text-xl font-bold uppercase leading-snug tracking-wide text-ge-black sm:text-2xl">
        {children}
      </span>
      <Plus open={open} />
    </button>
  )
}

function Sample({ id, k, t, d, children }: { id: string; k: string; t: string; d: string; children: ReactNode }) {
  return (
    <Section id={id} className="border-t border-ge-light bg-white">
      <Container>
        <Eyebrow>Option {k}</Eyebrow>
        <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
          {t}
        </h2>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">{d}</p>
        <div className="mt-10">{children}</div>
      </Container>
    </Section>
  )
}

function OptionMore() {
  const [open, setOpen] = useState<number | null>(0)
  const [more, setMore] = useState(false)
  const shown = more ? faqs : lead
  return (
    <>
      <Accordion
        items={shown}
        open={open}
        track="preview_faq_more"
        onToggle={(i) => setOpen(open === i ? null : i)}
      />
      <RevealRow
        open={more}
        track="preview_faq_more_toggle"
        onClick={() => {
          setMore((v) => !v)
          if (more && open !== null && open >= VISIBLE) setOpen(null)
        }}
      >
        {more ? 'Fewer questions' : `${rest.length} more questions`}
      </RevealRow>
    </>
  )
}

function OptionGroup() {
  const [openLead, setOpenLead] = useState<number | null>(0)
  const [openRest, setOpenRest] = useState<number | null>(null)
  const [more, setMore] = useState(false)
  return (
    <>
      <Accordion
        items={lead}
        open={openLead}
        track="preview_faq_group_lead"
        onToggle={(i) => setOpenLead(openLead === i ? null : i)}
      />
      <RevealRow
        open={more}
        track="preview_faq_group_more"
        onClick={() => {
          setMore((v) => !v)
          if (more) setOpenRest(null)
        }}
      >
        More questions
      </RevealRow>
      {more && (
        <Accordion
          items={rest}
          open={openRest}
          track="preview_faq_group_rest"
          onToggle={(i) => setOpenRest(openRest === i ? null : i)}
        />
      )}
    </>
  )
}

function OptionBatches() {
  const [open, setOpen] = useState<number | null>(0)
  const [count, setCount] = useState(VISIBLE)
  const shown = faqs.slice(0, count)
  const left = faqs.length - count
  const next = Math.min(VISIBLE, left)
  return (
    <>
      <Accordion
        items={shown}
        open={open}
        track="preview_faq_batches"
        onToggle={(i) => setOpen(open === i ? null : i)}
      />
      {left > 0 && (
        <RevealRow
          open={false}
          track="preview_faq_batches_more"
          onClick={() => setCount((n) => Math.min(faqs.length, n + VISIBLE))}
        >
          Show {next} more
        </RevealRow>
      )}
    </>
  )
}

function faqText(f: Faq) {
  const body = f.find ?? (typeof f.a === 'string' ? f.a : '')
  return `${f.q} ${body}`.toLowerCase()
}

function OptionSearch() {
  const [openLead, setOpenLead] = useState<number | null>(0)
  const [openMatch, setOpenMatch] = useState<number | null>(null)
  const [more, setMore] = useState(false)
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const matches = q ? faqs.filter((f) => faqText(f).includes(q)) : []
  return (
    <>
      <label className="mb-8 block max-w-xl">
        <span className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-ge-steel">
          Search questions
        </span>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpenMatch(null)
          }}
          placeholder="Cold climates, ownership, financial…"
          className="mt-2 w-full border border-ge-light bg-white px-4 py-3 font-body text-sm text-ge-black placeholder:text-ge-steel focus:border-ge-accent focus:outline-none"
        />
      </label>
      {q ? (
        matches.length > 0 ? (
          <Accordion
            items={matches}
            open={openMatch}
            track="preview_faq_search_match"
            onToggle={(i) => setOpenMatch(openMatch === i ? null : i)}
          />
        ) : (
          <p className="border-b border-ge-light py-6 font-body text-base text-ge-graphite">No questions match.</p>
        )
      ) : (
        <>
          <Accordion
            items={lead}
            open={openLead}
            track="preview_faq_search_lead"
            onToggle={(i) => setOpenLead(openLead === i ? null : i)}
          />
          <RevealRow open={more} track="preview_faq_search_more" onClick={() => setMore((v) => !v)}>
            More questions
          </RevealRow>
          {more && (
            <Accordion
              items={rest}
              open={openMatch}
              track="preview_faq_search_rest"
              onToggle={(i) => setOpenMatch(openMatch === i ? null : i)}
            />
          )}
        </>
      )}
    </>
  )
}

function OptionLinks() {
  const [openLead, setOpenLead] = useState<number | null>(0)
  const [quiet, setQuiet] = useState<number | null>(null)
  return (
    <>
      <Accordion
        items={lead}
        open={openLead}
        track="preview_faq_links_lead"
        onToggle={(i) => setOpenLead(openLead === i ? null : i)}
      />
      <ul className="border-b border-ge-light">
        {rest.map((f, i) => (
          <li key={f.q} className="border-t border-ge-light">
            <button
              type="button"
              data-ga-label={gaLabel('preview_faq_links', f.q)}
              onClick={() => setQuiet(quiet === i ? null : i)}
              aria-expanded={quiet === i}
              className="flex w-full items-start justify-between gap-6 py-4 text-left"
            >
              <span className="font-body text-base leading-snug text-ge-charcoal underline decoration-ge-light underline-offset-4">
                {f.q}
              </span>
              <Plus open={quiet === i} className="mt-1" />
            </button>
            {quiet === i && (
              <p className="fade-slide-up max-w-3xl pb-6 font-body text-base leading-relaxed text-ge-graphite">{f.a}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

const bodies = [OptionMore, OptionGroup, OptionBatches, OptionSearch, OptionLinks]

export default function PreviewFaq() {
  usePageMeta({
    title: 'Preview — FAQ reveal options — The GreyEdge Group',
    description: 'Five ways to show the first questions and still reach the rest. Not the live site.',
  })

  return (
    <>
      <div className="bg-ge-accent px-5 py-3 text-center">
        <p className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          Preview only · FAQ reveal options ·{' '}
          <Link to="/geothermal-101" className="underline underline-offset-2 hover:text-white/80">
            Live page
          </Link>
        </p>
      </div>

      <Section className="bg-white">
        <Container>
          <Eyebrow>How it works</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
            Five ways to shorten the questions
          </h1>
          <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
            The first four stay visible. The other seven stay available. Nothing here changes the live page.
          </p>
          <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-3" aria-label="Options">
            {samples.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-body text-sm text-ge-charcoal underline decoration-ge-light underline-offset-4 hover:text-ge-accent hover:decoration-ge-accent"
              >
                {s.k}. {s.t}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {samples.map((s, i) => {
        const Body = bodies[i]
        return (
          <Sample key={s.id} id={s.id} k={s.k} t={s.t} d={s.d}>
            <Body />
          </Sample>
        )
      })}
    </>
  )
}

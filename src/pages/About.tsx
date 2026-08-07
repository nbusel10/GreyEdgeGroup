import { Link } from 'react-router-dom'
import { story, teamIntro, whoWeAre, whyUs } from '../content/about'
import { team } from '../content/team'
import { site } from '../content/images'
import GMark, { GBullet } from '../components/GMark'
import PageHero from '../components/PageHero'
import Leadership from '../components/sections/Leadership'
import FinalCta from '../components/sections/FinalCta'
import { Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

export default function About() {
  usePageMeta({
    title: 'About — The GreyEdge Group',
    description:
      'Founded in 2016 as a collective of the thermal energy industry’s most accomplished practitioners. Meet the engineers, modelers, hydrogeologists and researchers behind GreyEdge.',
    image: site['team-photo'].src,
  })

  const leaders = team.filter((m) => m.leadership)
  const rest = team.filter((m) => !m.leadership)

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built by the people who built the industry"
        lead="GreyEdge is a collective of practitioners, not a firm that hired its way into geothermal. The difference shows up in the details of every project."
        image={site['team-group'].src}
        imageAlt={site['team-group'].alt}
      />

      {/* Who we are */}
      <Section id="story" className="bg-ge-offwhite">
        <Container>
          <Reveal>
            <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              {whoWeAre.heading}
            </h2>
            <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-ge-graphite sm:text-lg">
              {whoWeAre.lead}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ge-light md:grid-cols-3">
            {whoWeAre.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="bg-white">
                <div className="h-full p-8">
                  <GMark className="h-5 w-5 text-ge-accent" />
                  <h3 className="mt-5 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                    {p.title}
                  </h3>
                  <p className="mt-4 font-body text-sm leading-relaxed text-ge-graphite">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founding story */}
      <Section className="border-t border-ge-light bg-white">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                {story.heading}
              </h2>
              <div className="mt-10">
                <img src={story.image} alt={story.imageAlt} className="w-full object-cover" loading="lazy" />
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="flex items-baseline gap-5">
                <span className="font-display text-6xl font-bold leading-none text-ge-accent">{story.year}</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ge-black">{story.title}</h3>
              </div>
              <div className="mt-8 space-y-5 border-l border-ge-light pl-7">
                {story.body.map((p) => (
                  <p key={p.slice(0, 24)} className="font-body text-base leading-relaxed text-ge-graphite">
                    {p}
                  </p>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-ge-accent pl-7">
                <p className="font-display text-2xl font-semibold uppercase leading-snug tracking-wide text-ge-black">
                  {story.pullQuote}
                </p>
              </blockquote>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-ge-light pt-8">
                {[
                  { v: '1,000+', l: 'Geothermal projects managed' },
                  { v: '80,000', l: 'Tons of heat pump capacity' },
                  { v: '15–18', l: 'Years of continuous operation' },
                ].map((s) => (
                  <div key={s.l}>
                    <dd className="font-display text-2xl font-bold leading-none text-ge-black">{s.v}</dd>
                    <dt className="mt-2 font-body text-[10px] uppercase tracking-[0.16em] text-ge-steel">{s.l}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why choose us */}
      <Section className="border-t border-ge-light bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>{whyUs.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
                {whyUs.heading}
              </h2>
              <p className="mt-6 font-body text-base leading-relaxed text-ge-graphite">{whyUs.lead}</p>
              {whyUs.body.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 font-body text-base leading-relaxed text-ge-graphite">
                  {p}
                </p>
              ))}
              <p className="mt-8 font-display text-2xl font-bold uppercase leading-snug tracking-wide text-ge-black">
                {whyUs.closing}
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
                {whyUs.pillars.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <GBullet className="text-ge-accent" />
                    <span className="font-body text-sm uppercase tracking-[0.1em] text-ge-charcoal">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <img
                src={whyUs.image}
                alt={whyUs.imageAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section id="team" className="border-t border-ge-light bg-white">
        <Container>
          <Reveal>
            <Eyebrow>{teamIntro.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl">
              {teamIntro.heading}
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-ge-graphite">{teamIntro.lead}</p>
          </Reveal>

          <h3 className="mt-14 font-body text-[11px] uppercase tracking-[0.24em] text-ge-steel">
            <span className="text-ge-accent" aria-hidden="true">
              //{' '}
            </span>
            Founders and leadership
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 4) * 0.05}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>

          <h3 className="mt-16 font-body text-[11px] uppercase tracking-[0.24em] text-ge-steel">
            <span className="text-ge-accent" aria-hidden="true">
              //{' '}
            </span>
            The team
          </h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((m, i) => (
              <Reveal key={m.slug} delay={(i % 4) * 0.05}>
                <TeamCard member={m} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Leadership />
      <FinalCta />
    </>
  )
}

function TeamCard({ member }: { member: (typeof team)[number] }) {
  return (
    <Link
      to={`/team/${member.slug}`}
      className="group block border border-ge-light bg-white transition-colors hover:border-ge-accent"
    >
      <div className="aspect-[4/5] overflow-hidden bg-ge-light">
        {member.image && (
          <img
            src={member.image}
            alt={member.imageAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="p-5">
        <div className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-ge-black transition-colors group-hover:text-ge-accent">
          {member.name}
        </div>
        {member.role && (
          <div className="mt-1 font-body text-xs leading-snug text-ge-steel">{member.role}</div>
        )}
        <span className="rule-grow mt-4" />
      </div>
    </Link>
  )
}

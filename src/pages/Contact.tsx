import { useState } from 'react'
import type { FormEvent } from 'react'
import { org } from '../content/site'
import { site } from '../content/images'
import { doors } from '../content/advantage'
import PageHero from '../components/PageHero'
import { Btn, Container, Eyebrow, Reveal, Section } from '../components/ui'
import { usePageMeta } from '../lib/meta'

/**
 * Host-agnostic contact form.
 *
 * With no configuration it posts back to the site root as URL-encoded data, which is
 * exactly what Netlify Forms expects — the hidden form-name field and the `data-netlify`
 * attribute below are what Netlify's build step looks for. Set VITE_FORM_ENDPOINT to
 * post JSON somewhere else instead (a CRM intake, a serverless function, Formspree),
 * which is the one-line change needed once the CRM decision is made.
 */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const FORM_NAME = 'greyedge-contact'

const helpOptions = [
  'Not sure yet (exploring options)',
  'Feasibility or resource study',
  'Master planning a campus or district',
  'Design or engineering support',
  'Commissioning or troubleshooting',
  'Optimizing an existing system',
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  usePageMeta({
    title: 'Contact — The GreyEdge Group',
    description:
      'Tell us about your project: a site, a study, a constraint, or just a hunch. We’ll tell you what we see.',
    image: site.contact.src,
  })

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const data = new FormData(e.currentTarget)
    // Honeypot: real people leave this empty. Pretend success for bots.
    if (data.get('company-website')) {
      setStatus('sent')
      return
    }

    try {
      const res = ENDPOINT
        ? await fetch(ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(data)),
          })
        : await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
          })

      if (!res.ok) throw new Error(`Server responded ${res.status}`)
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Start Planning"
        title="Let's plan what's next"
        lead="Whether you're planning a new community, evaluating district-scale infrastructure, or working through grid constraints, bring us your vision, your data, or your questions. We'll help you uncover the opportunities and chart the path forward."
      />

      <Section className="bg-ge-offwhite">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
            <Reveal>
              {status === 'sent' ? (
                <div className="border border-ge-accent bg-white p-10 text-center">
                  <span className="text-ge-accent" aria-hidden="true">
                    //
                  </span>
                  <h2 className="mt-6 font-display text-3xl font-bold uppercase tracking-wide text-ge-black">
                    Thank you
                  </h2>
                  <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-ge-graphite">
                    Your message is with us. Someone from the team will be in touch shortly, usually within one
                    business day.
                  </p>
                  <Btn to="/geothermal-101" variant="outline" className="mt-8">
                    Read Geothermal 101 in the meantime
                  </Btn>
                </div>
              ) : (
                <form
                  name={FORM_NAME}
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="company-website"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Netlify needs the form name in the payload. */}
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  <p className="hidden">
                    <label>
                      Leave this field empty
                      <input name="company-website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </p>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Name" name="name" required autoComplete="name" />
                    <Field label="Email" name="email" type="email" required autoComplete="email" />
                    <Field label="Organization" name="organization" autoComplete="organization" />
                    <Field label="Phone" name="phone" type="tel" optional autoComplete="tel" />
                  </div>

                  <Field label="Project location" name="location" optional placeholder="City, state" />

                  <div>
                    <Label htmlFor="help">What can we help with?</Label>
                    <select
                      id="help"
                      name="help"
                      defaultValue={helpOptions[0]}
                      className="mt-2 w-full border border-ge-light bg-white px-4 py-3 font-body text-sm text-ge-black transition-colors focus:border-ge-accent focus:outline-none"
                    >
                      {helpOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="message">Tell us about the project</Label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder="Site, timeline, what you've already looked at, and what's making the decision hard."
                      className="mt-2 w-full border border-ge-light bg-white px-4 py-3 font-body text-sm text-ge-black transition-colors placeholder:text-ge-steel focus:border-ge-accent focus:outline-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="border-l-2 border-red-500 bg-white px-4 py-3 font-body text-sm text-ge-charcoal">
                      We couldn&rsquo;t send that. {error}. Please email{' '}
                      <a href={`mailto:${org.email}`} className="underline decoration-ge-accent underline-offset-4">
                        {org.email}
                      </a>{' '}
                      and we&rsquo;ll pick it up from there.
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Btn type="submit" disabled={status === 'sending'} className="disabled:opacity-60">
                      {status === 'sending' ? 'Sending…' : 'Send message'}
                    </Btn>
                  </div>
                </form>
              )}
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border border-ge-light bg-white p-8">
                <Eyebrow>Direct</Eyebrow>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide text-ge-black">
                  Prefer email?
                </h2>
                <a
                  href={`mailto:${org.email}`}
                  className="mt-3 block font-body text-base text-ge-charcoal underline decoration-ge-accent decoration-2 underline-offset-4 transition-colors hover:text-ge-accent"
                >
                  {org.email}
                </a>
                <a
                  href={org.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block font-body text-[11px] uppercase tracking-[0.18em] text-ge-graphite transition-colors hover:text-ge-accent"
                >
                  Connect on LinkedIn &rarr;
                </a>
              </div>

              {/* The other door, for readers who aren't ready for a conversation. */}
              <div className="mt-6 border border-ge-light bg-ge-black p-8">
                <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
                  <span className="text-ge-accent" aria-hidden="true">
                    //{' '}
                  </span>
                  Still Exploring?
                </h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-ge-light">
                  Learn how thermal energy networks work, what resources are available, and where the opportunities
                  may exist within your community.
                </p>
                <Btn to={doors.education.to} variant="ghost" className="mt-6">
                  {doors.education.cta}
                </Btn>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="font-body text-[11px] uppercase tracking-[0.18em] text-ge-graphite">
      {children}
    </label>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  optional,
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  optional?: boolean
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal text-ge-steel">(optional)</span>}
      </Label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full border border-ge-light bg-white px-4 py-3 font-body text-sm text-ge-black transition-colors placeholder:text-ge-steel focus:border-ge-accent focus:outline-none"
      />
    </div>
  )
}

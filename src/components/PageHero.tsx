import type { ReactNode } from 'react'
import { Container, Eyebrow } from './ui'

/**
 * Shared interior-page header: typography-first dark band.
 * Soft charcoal gradient + accent rule — no photos, no G watermark.
 */
export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-ge-black pb-16 pt-32 md:pb-20 md:pt-40">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(165deg, #1a1d20 0%, #14171a 42%, #2e3338 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ge-accent/40 to-transparent"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="fade-slide-up flex max-w-4xl gap-5 sm:gap-6">
          <span
            className="mt-1.5 hidden w-px shrink-0 self-stretch bg-ge-accent sm:block"
            aria-hidden="true"
          />
          <div className="min-w-0">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1
              className="mt-5 font-display font-bold uppercase leading-[0.96] tracking-tight text-white"
              style={{ fontSize: '65px' }}
            >
              {title}
            </h1>
            {lead && (
              <p className="mt-7 max-w-2xl font-body text-base leading-relaxed text-ge-light sm:text-lg">
                {lead}
              </p>
            )}
            {children}
          </div>
        </div>
      </Container>
    </section>
  )
}

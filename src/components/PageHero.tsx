import type { ReactNode } from 'react'
import { Container, Eyebrow } from './ui'
import { GWatermark } from './GMark'

/** Shared interior-page header: dark band, optional photo, G watermark. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  image?: string
  imageAlt?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-ge-black pb-16 pt-32 md:pb-20 md:pt-40">
      {image && (
        <>
          <img
            src={image}
            alt={imageAlt ?? ''}
            // Purely atmospheric behind the heading; hidden from assistive tech when
            // no caller supplies a description.
            aria-hidden={imageAlt ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom, rgba(20,23,26,0.93) 0%, rgba(20,23,26,0.84) 50%, rgba(20,23,26,0.95) 100%)',
            }}
          />
        </>
      )}
      {!image && <GWatermark className="text-white/[0.035]" side="right" />}

      <Container className="relative">
        <div className="fade-slide-up max-w-4xl">
          <Eyebrow tone="light">{eyebrow}</Eyebrow>
          <h1
            className="mt-5 font-display font-bold uppercase leading-[0.96] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.6rem)' }}
          >
            {title}
          </h1>
          {lead && <p className="mt-7 max-w-2xl font-body text-base leading-relaxed text-ge-silver sm:text-lg">{lead}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}

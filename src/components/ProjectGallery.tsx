import { useEffect, useId, useRef, useState } from 'react'
import type { ProjectGalleryImage } from '../content/projects'
import { Container, Eyebrow, Reveal } from './ui'

export default function ProjectGallery({ images }: { images: ProjectGalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const titleId = useId()
  const open = active !== null
  const current = open ? images[active] : null

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i === null ? i : (i + 1) % images.length))
      if (e.key === 'ArrowLeft')
        setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, images.length])

  if (images.length === 0) return null

  return (
    <>
      <section className="relative scroll-mt-20 border-t border-ge-light bg-white py-10 md:py-12">
        <Container>
          <Reveal>
            <Eyebrow>Project Photos</Eyebrow>
            <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
              {images.map((img, i) => (
                <li key={img.src}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`View larger: ${img.alt}`}
                    className="img-cut group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-ge-offwhite text-left"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {current && active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ge-black/90 p-4 md:p-10"
          onClick={() => setActive(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-full max-w-6xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id={titleId} className="sr-only">
              {current.alt}
            </h2>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
              className="absolute -right-1 -top-1 z-10 flex h-10 w-10 items-center justify-center bg-ge-black text-white transition-colors hover:text-ge-accent-bright md:-right-2 md:-top-2"
            >
              <svg className="h-4 w-4 rotate-45" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActive((active - 1 + images.length) % images.length)}
                  aria-label="Previous photo"
                  className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ge-black/80 text-white transition-colors hover:text-ge-accent-bright md:-left-12"
                >
                  <span aria-hidden="true">&larr;</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActive((active + 1) % images.length)}
                  aria-label="Next photo"
                  className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-ge-black/80 text-white transition-colors hover:text-ge-accent-bright md:-right-12"
                >
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </>
            )}

            <img
              src={current.src}
              alt={current.alt}
              className="max-h-[85vh] w-auto max-w-full object-contain"
            />
            <p className="mt-4 max-w-2xl text-center font-body text-xs uppercase tracking-[0.16em] text-white/70">
              {active + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

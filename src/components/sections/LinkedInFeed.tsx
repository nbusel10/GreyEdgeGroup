import { useEffect, useId, useRef, useState } from 'react'
import { org } from '../../content/site'
import { formatLinkedInDate, getLatestLinkedInPosts } from '../../content/linkedin'
import { Btn, Container, Eyebrow, Reveal, Section } from '../ui'

function cardsIn(el: HTMLDivElement) {
  return [...el.querySelectorAll<HTMLElement>('[data-card]')]
}

/** Movement below this still counts as a click; above it is a drag. */
const DRAG_THRESHOLD_PX = 8

export default function LinkedInFeed() {
  const posts = getLatestLinkedInPosts()
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
    moved: false,
    suppressClick: false,
  })
  const [index, setIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [dragging, setDragging] = useState(false)
  const headingId = useId()

  const syncPosition = () => {
    const el = trackRef.current
    if (!el) return
    const cards = cardsIn(el)
    const first = cards[0]
    if (!first) return
    const origin = first.offsetLeft
    let best = 0
    let bestDist = Infinity
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - origin - el.scrollLeft)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    })
    setIndex(best)
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    syncPosition()
    const ro = new ResizeObserver(syncPosition)
    ro.observe(el)
    el.addEventListener('scroll', syncPosition, { passive: true })
    window.addEventListener('resize', syncPosition)
    return () => {
      ro.disconnect()
      el.removeEventListener('scroll', syncPosition)
      window.removeEventListener('resize', syncPosition)
    }
  }, [posts.length])

  const scrollToCard = (i: number) => {
    const el = trackRef.current
    if (!el) return
    const cards = cardsIn(el)
    const next = Math.max(0, Math.min(cards.length - 1, i))
    const card = cards[next]
    const first = cards[0]
    if (!card || !first) return
    el.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: 'smooth' })
  }

  const scrollByCard = (dir: -1 | 1) => scrollToCard(index + dir)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const drag = dragRef.current
      const el = trackRef.current
      if (!drag.active || !el) return
      const dx = e.clientX - drag.startX
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX) return
        drag.moved = true
        drag.suppressClick = true
        setDragging(true)
        try {
          el.setPointerCapture(e.pointerId)
        } catch {
          // Pointer was already released.
        }
      }
      el.scrollLeft = drag.startScroll - dx
    }

    const onUp = (e: PointerEvent) => {
      const el = trackRef.current
      if (el?.hasPointerCapture(e.pointerId)) {
        el.releasePointerCapture(e.pointerId)
      }
      if (!dragRef.current.active) return
      dragRef.current.active = false
      setDragging(false)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'touch') return
    if (e.button !== 0) return
    const el = trackRef.current
    if (!el) return
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
      suppressClick: false,
    }
  }

  const arrowClass =
    'inline-flex h-10 w-10 items-center justify-center border border-ge-light text-ge-graphite transition-colors hover:border-ge-accent hover:text-ge-accent disabled:pointer-events-none disabled:opacity-30'

  return (
    <Section className="border-t border-ge-light bg-ge-offwhite !py-12 md:!py-16">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <Eyebrow>Follow Along</Eyebrow>
              <h2
                id={headingId}
                className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-5xl md:text-6xl"
              >
                Latest on LinkedIn
              </h2>
            </div>
            <div className="flex shrink-0 items-center gap-3 self-start">
              {posts.length > 1 && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Previous posts"
                    disabled={atStart}
                    onClick={() => scrollByCard(-1)}
                    className={arrowClass}
                  >
                    <span aria-hidden="true">&larr;</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Next posts"
                    disabled={atEnd}
                    onClick={() => scrollByCard(1)}
                    className={arrowClass}
                  >
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              )}
              <Btn href={org.social.linkedin} variant="outline">
                Follow GreyEdge
              </Btn>
            </div>
          </div>
          <p className="mt-3 font-body text-base leading-relaxed text-ge-graphite">
            Project milestones and shorter commentary land on LinkedIn first. Scroll the latest
            posts from The GreyEdge Group.
          </p>
        </Reveal>

        <Reveal className="mt-8">
          <div role="region" aria-labelledby={headingId} aria-roledescription="carousel">
            <div
              ref={trackRef}
              tabIndex={0}
              onPointerDown={onPointerDown}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') {
                  e.preventDefault()
                  scrollByCard(-1)
                }
                if (e.key === 'ArrowRight') {
                  e.preventDefault()
                  scrollByCard(1)
                }
              }}
              className={`flex gap-5 overflow-x-auto overscroll-x-contain pb-1 outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                dragging
                  ? 'cursor-grabbing snap-none select-none'
                  : 'cursor-grab snap-x snap-mandatory'
              }`}
            >
              {posts.map((post) => (
                <a
                  key={post.id}
                  data-card
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onClick={(e) => {
                    // Keyboard activation (Enter) has detail 0 and should always navigate.
                    if (e.detail === 0) return
                    if (dragRef.current.moved || dragRef.current.suppressClick) {
                      e.preventDefault()
                    }
                  }}
                  onDragStart={(e) => e.preventDefault()}
                  className="group flex w-[85%] shrink-0 snap-start flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent sm:w-[46%] lg:w-[31%]"
                >
                  <div className="img-cut h-36 overflow-hidden bg-ge-light">
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      draggable={false}
                      loading="lazy"
                      className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-body text-[10px] uppercase tracking-[0.18em] text-ge-accent">
                        LinkedIn
                      </span>
                      <time
                        dateTime={post.publishedAt}
                        className="font-body text-[10px] text-ge-steel"
                      >
                        {formatLinkedInDate(post.publishedAt)}
                      </time>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold uppercase leading-tight tracking-wide text-ge-black">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ge-graphite">
                      {post.excerpt}
                    </p>
                    <span className="rule-grow mt-4" />
                  </div>
                </a>
              ))}
            </div>

            {posts.length > 1 && (
              <div className="mt-5 flex justify-center gap-2" aria-label="Carousel position">
                {posts.map((post, i) => (
                  <button
                    key={post.id}
                    type="button"
                    aria-label={`Show post ${i + 1} of ${posts.length}`}
                    aria-current={i === index ? 'true' : undefined}
                    onClick={() => scrollToCard(i)}
                    className={`h-1.5 transition-colors ${
                      i === index ? 'w-6 bg-ge-accent' : 'w-1.5 bg-ge-light hover:bg-ge-steel'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

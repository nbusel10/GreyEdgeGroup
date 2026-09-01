import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { capabilityNote, serviceGroups } from '../../content/advantage'
import { serviceHashTarget, serviceItemId } from '../../lib/serviceItemId'
import { Container, Eyebrow, Reveal, Section } from '../ui'

/** Our Services — five category photo cards, height follows content. */
export default function Services() {
  const { hash } = useLocation()
  const initial = serviceHashTarget(hash)
  const [pinnedCard, setPinnedCard] = useState<number | null>(() =>
    initial?.kind === 'card' ? initial.cardIndex : null,
  )
  const [pinnedItem, setPinnedItem] = useState<string | null>(() =>
    initial?.kind === 'item' ? initial.itemId : null,
  )
  const [hoverLocked, setHoverLocked] = useState(() => initial !== null)

  useEffect(() => {
    const target = serviceHashTarget(hash)

    if (target === null) {
      setPinnedCard(null)
      setPinnedItem(null)
      setHoverLocked(false)
      return
    }

    if (target.kind === 'card') {
      setPinnedCard(target.cardIndex)
      setPinnedItem(null)
    } else {
      setPinnedCard(null)
      setPinnedItem(target.itemId)
    }

    setHoverLocked(true)

    const unlock = () => setHoverLocked(false)
    window.addEventListener('mousemove', unlock, { once: true })
    window.addEventListener('pointerdown', unlock, { once: true })

    return () => {
      window.removeEventListener('mousemove', unlock)
      window.removeEventListener('pointerdown', unlock)
    }
  }, [hash])

  return (
    <Section id="services" className="border-t border-ge-light bg-ge-offwhite">
      <Container>
        <Reveal id="services-head" className="scroll-mt-16 lg:scroll-mt-[4.5rem]">
          <Eyebrow>Total Capability</Eyebrow>
          <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-ge-black sm:text-4xl md:text-5xl">
            Our Services
          </h3>
          <p className="mt-6 max-w-none font-body text-base leading-relaxed text-ge-graphite">
            {capabilityNote}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid items-start gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {serviceGroups.map((g, i) => {
              const num = String(i + 1).padStart(2, '0')
              const cardLit = hoverLocked && pinnedCard === i
              return (
                <article
                  key={g.title}
                  id={g.id}
                  className={`group scroll-mt-20 border bg-white transition-colors ${
                    cardLit
                      ? 'border-ge-accent process-pin-glow'
                      : 'border-ge-light hover:border-ge-accent'
                  }`}
                >
                  <div className="img-cut h-40 overflow-hidden bg-ge-light xl:h-36">
                    <img
                      src={g.image}
                      alt={g.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`px-5 pt-5 xl:px-4 xl:pt-4 ${cardLit ? 'bg-ge-accent text-white' : ''}`}
                  >
                    <span
                      className={`block font-body text-[10px] tracking-[0.18em] ${
                        cardLit ? 'text-white/70' : 'text-ge-steel'
                      }`}
                    >
                      {num}
                    </span>
                    <span
                      className={`mt-2 block font-body text-xs font-medium uppercase tracking-[0.14em] ${
                        cardLit ? 'text-white/85' : 'text-ge-accent'
                      }`}
                    >
                      {g.short}
                    </span>
                    <h4
                      className={`mt-1.5 font-display text-lg font-bold uppercase leading-snug tracking-wide xl:text-base ${
                        cardLit ? 'text-white' : 'text-ge-black'
                      }`}
                    >
                      {g.title}
                    </h4>
                    <ul
                      className={`-mx-5 mt-4 border-t xl:-mx-4 ${
                        cardLit ? 'border-white/25' : 'border-ge-light'
                      }`}
                    >
                      {g.items.map((item) => {
                        const itemId = serviceItemId(g.id, item)
                        const itemLit = hoverLocked && pinnedItem === itemId
                        return (
                          <li
                            key={item}
                            id={itemId}
                            className={`scroll-mt-20 border-b px-5 py-3 transition-colors xl:px-4 ${
                              itemLit
                                ? 'border-ge-accent bg-ge-accent process-pin-glow'
                                : cardLit
                                  ? 'border-white/25'
                                  : 'border-ge-light'
                            }`}
                          >
                            <span
                              className={`font-body text-sm leading-snug ${
                                itemLit || cardLit ? 'text-white/90' : 'text-ge-charcoal'
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}

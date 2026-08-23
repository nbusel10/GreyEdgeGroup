import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { usePrefersReducedMotion } from '../lib/hooks'
import {
  ADJECTIVES,
  ANCHOR_WORD,
  BUMP_BOUNCE_MS,
  FLAP_ADJ_LEN,
  LOCK_WORD,
  SCRAMBLE_MS,
  SLOT_WORD,
  WORD_CYCLE_CSS,
  WORD_CYCLE_MS,
  scrambleText,
  useFlyUpRowCycle,
  useInView,
  useRandomFillCycle,
  useTypeFromECycle,
  useWordCycle,
  type FlyUpPhase,
  type FlyUpState,
  type WordCycleState,
  type WordCycleVariant,
} from '../lib/wordCycle'

export type { WordCycleVariant }

function wordTone(word: string) {
  if (!word) return 'text-white'
  return LOCK_WORD.startsWith(word) || word.startsWith(LOCK_WORD) ? 'text-ge-graphite' : 'text-white'
}

function Slot({ children, clip = true }: { children: ReactNode; clip?: boolean }) {
  return (
    <span className="ge-word-slot relative inline-grid justify-items-end">
      {/* Trailing g sizes the line box for descenders (Leading, Cutting, Grey). */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {SLOT_WORD}
        <span className="inline-block w-0 overflow-visible">g</span>
      </span>
      <span
        className={`col-start-1 row-start-1 flex w-full items-baseline justify-end ${
          clip ? 'overflow-hidden' : 'overflow-visible'
        }`}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  )
}

function SlotReel({ current, next, phase, generation }: WordCycleState) {
  if (phase !== 'transition') {
    return <span className={wordTone(current)}>{current}</span>
  }
  return (
    <span key={generation} className="ge-word-reel is-trans">
      <span className="ge-word-reel-track">
        <span className={`ge-word-reel-item ${wordTone(current)}`}>{current}</span>
        <span className={`ge-word-reel-item ${wordTone(next)}`}>{next}</span>
      </span>
    </span>
  )
}

function Scramble({ current, next, phase, generation }: WordCycleState) {
  const [text, setText] = useState(current)

  useEffect(() => {
    if (phase !== 'transition') {
      setText(current)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / SCRAMBLE_MS, 1)
      setText(scrambleText(next, p, now))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase, current, next, generation])

  const display = phase === 'hold' ? current : text
  return (
    <span className={wordTone(phase === 'transition' ? next : current)}>{display}</span>
  )
}

function TypeFromE({ text }: { text: string }) {
  return <span className={wordTone(text)}>{text}</span>
}

const FLAP_MS = 220

function FlapCell({ char, tone }: { char: string; tone: string }) {
  const glyph = char === ' ' ? '' : char
  const [face, setFace] = useState(glyph)
  const [incoming, setIncoming] = useState(glyph)
  const [flipKey, setFlipKey] = useState(0)
  const [flipping, setFlipping] = useState(false)
  const glyphRef = useRef(glyph)
  glyphRef.current = glyph
  const flippingRef = useRef(false)

  useEffect(() => {
    // Same letter as the resting face: cancel any in-flight flip. Edge tiles
    // hit this when the board blanks and refills the same E / d / g / e.
    if (glyph === face) {
      if (flippingRef.current) {
        flippingRef.current = false
        setFlipping(false)
        setIncoming(glyph)
        setFlipKey((k) => k + 1)
      }
      return
    }
    flippingRef.current = true
    setIncoming(glyph)
    setFlipping(true)
    setFlipKey((k) => k + 1)
    const t = window.setTimeout(() => {
      flippingRef.current = false
      setFace(glyphRef.current)
      setFlipping(false)
    }, FLAP_MS)
    return () => window.clearTimeout(t)
  }, [glyph, face])

  return (
    <span className="ge-word-flap">
      <span key={flipKey} className={`ge-word-flap-card ${flipping ? 'is-flipping' : ''}`}>
        <span className={`ge-word-flap-face ge-word-flap-front ${tone}`}>{face}</span>
        <span className={`ge-word-flap-face ge-word-flap-back ${tone}`}>{incoming}</span>
      </span>
      <span className="ge-word-flap-seam" />
    </span>
  )
}

function flapTone(index: number, target: string) {
  if (index >= FLAP_ADJ_LEN) return 'text-white'
  return wordTone(target)
}

function SplitFlapBoard({ chars, target }: { chars: string[]; target: string }) {
  return (
    <span className="ge-word-flap-row">
      {chars.map((ch, i) => (
        <FlapCell key={i} char={ch} tone={flapTone(i, target)} />
      ))}
    </span>
  )
}

function BumpBounce({ current, next, phase, generation }: WordCycleState) {
  if (phase !== 'transition') {
    return <span className={wordTone(current)}>{current}</span>
  }
  return (
    <span key={generation} className="ge-word-bump is-trans">
      <span className={`ge-word-bump-out ${wordTone(current)}`}>{current}</span>
      <span className={`ge-word-bump-in ${wordTone(next)}`}>{next}</span>
    </span>
  )
}

function AdjectiveSlot({
  variant,
  cycle,
  typed,
}: {
  variant: WordCycleVariant
  cycle: WordCycleState
  typed: string
}) {
  switch (variant) {
    case 'slot-reel':
      return <SlotReel {...cycle} />
    case 'scramble':
      return <Scramble {...cycle} />
    case 'type-from-e':
      return <TypeFromE text={typed} />
    case 'bump-bounce':
      return <BumpBounce {...cycle} />
    case 'random-fill':
    case 'fly-up-row':
      return null
  }
}

function flyRowOn(phase: FlyUpPhase, from: FlyUpPhase) {
  const order: FlyUpPhase[] = [
    'lead',
    'flyLead',
    'cutting',
    'flyCutting',
    'competitive',
    'flyCompetitive',
    'grey',
    'lock',
    'reset',
  ]
  return order.indexOf(phase) >= order.indexOf(from)
}

function flySlotWord(phase: FlyUpPhase) {
  if (phase === 'lead' || phase === 'flyLead') return ADJECTIVES[0]
  if (phase === 'cutting' || phase === 'flyCutting') return ADJECTIVES[1]
  if (phase === 'competitive' || phase === 'flyCompetitive') return ADJECTIVES[2]
  return LOCK_WORD
}

function flySlotMotion(phase: FlyUpPhase, leaving: boolean) {
  if (phase === 'flyLead' || phase === 'flyCutting' || phase === 'flyCompetitive') {
    return leaving ? 'ge-word-fly-leave' : ''
  }
  if (phase === 'cutting' || phase === 'competitive' || phase === 'grey') return 'ge-word-fly-grey'
  return ''
}

function flyCenters(from: HTMLElement, to: HTMLElement) {
  const a = from.getBoundingClientRect()
  const b = to.getBoundingClientRect()
  return {
    x: b.left + b.width / 2 - (a.left + a.width / 2),
    y: b.top + b.height / 2 - (a.top + a.height / 2),
  }
}

function FlyCell({
  word,
  visible,
  flying,
  sizerRef,
  flyX,
  flyY,
}: {
  word: string
  visible: boolean
  flying: boolean
  sizerRef: RefObject<HTMLSpanElement | null>
  flyX: number
  flyY: number
}) {
  return (
    <span className="ge-word-fly-cell">
      <span className="ge-word-fly-sizer" ref={sizerRef}>
        {word}
      </span>
      {visible ? (
        <span
          className={`ge-word-fly-item is-in ${flying ? 'is-flying' : ''}`}
          style={flying ? ({ '--ge-fly-x': `${flyX}px`, '--ge-fly-y': `${flyY}px` } as CSSProperties) : undefined}
        >
          {word}
        </span>
      ) : null}
    </span>
  )
}

function FlyUpPack({ state }: { state: FlyUpState }) {
  const { phase } = state
  const leadingIn = flyRowOn(phase, 'flyLead')
  const cuttingIn = flyRowOn(phase, 'flyCutting')
  const competitiveIn = flyRowOn(phase, 'flyCompetitive')
  const slotWord = flySlotWord(phase)
  const flying = phase === 'flyLead' || phase === 'flyCutting' || phase === 'flyCompetitive'

  const slotRef = useRef<HTMLSpanElement>(null)
  const leadSizerRef = useRef<HTMLSpanElement>(null)
  const cutSizerRef = useRef<HTMLSpanElement>(null)
  const compSizerRef = useRef<HTMLSpanElement>(null)
  const [path, setPath] = useState<{ leaveX: number; leaveY: number } | null>(null)

  useLayoutEffect(() => {
    if (!flying) {
      setPath(null)
      return
    }
    const slot = slotRef.current
    const dest =
      phase === 'flyLead' ? leadSizerRef.current : phase === 'flyCutting' ? cutSizerRef.current : compSizerRef.current
    if (!slot || !dest) return
    const { x, y } = flyCenters(slot, dest)
    setPath({ leaveX: x, leaveY: y })
  }, [flying, phase])

  const leaving = flying && path !== null
  const leadFlying = phase === 'flyLead' && leaving
  const cutFlying = phase === 'flyCutting' && leaving
  const compFlying = phase === 'flyCompetitive' && leaving

  return (
    <span
      key={state.generation}
      className={`ge-word-fly-pack ${state.isLocked ? 'is-locked' : ''}`}
      aria-hidden="true"
    >
      {/* Top row sizes the pack; mark + gold line share its horizontal center. */}
      <span className={`ge-word-fly-row ${phase === 'reset' ? 'is-reset' : ''}`}>
        <FlyCell
          word={ADJECTIVES[0]}
          visible={leadingIn && (phase !== 'flyLead' || leaving)}
          flying={leadFlying}
          sizerRef={leadSizerRef}
          flyX={path ? -path.leaveX : 0}
          flyY={path ? -path.leaveY : 0}
        />
        <span className={`ge-word-fly-dot ${cuttingIn ? 'is-in' : ''}`}>·</span>
        <FlyCell
          word={ADJECTIVES[1]}
          visible={cuttingIn && (phase !== 'flyCutting' || leaving)}
          flying={cutFlying}
          sizerRef={cutSizerRef}
          flyX={path ? -path.leaveX : 0}
          flyY={path ? -path.leaveY : 0}
        />
        <span className={`ge-word-fly-dot ${competitiveIn ? 'is-in' : ''}`}>·</span>
        <FlyCell
          word={ADJECTIVES[2]}
          visible={competitiveIn && (phase !== 'flyCompetitive' || leaving)}
          flying={compFlying}
          sizerRef={compSizerRef}
          flyX={path ? -path.leaveX : 0}
          flyY={path ? -path.leaveY : 0}
        />
      </span>
      {/* Size to the live word (not Competitive Slot) so GreyEdge shares the row's center axis. */}
      <span className="ge-word-fly-lock-slot">
        <span className="ge-word-fly-mark">
          <span
            key={slotWord}
            ref={slotRef}
            className={`${wordTone(slotWord)} ${flySlotMotion(phase, leaving)}`}
            style={
              leaving
                ? ({ '--ge-fly-x': `${path.leaveX}px`, '--ge-fly-y': `${path.leaveY}px` } as CSSProperties)
                : undefined
            }
          >
            {slotWord}
          </span>
          <span className="text-white">{ANCHOR_WORD}</span>
        </span>
      </span>
      {/* Absolute left/right of pack = top-row width (lock slot cannot widen the pack). */}
      <span className="ge-word-gold-line" />
    </span>
  )
}

/**
 * Rotates Leading / Cutting / Competitive, then holds GreyEdge. Most skins pin
 * a static Edge beside the slot; random-fill puts Edge on the flap board;
 * fly-up-row parks each adjective beside Edge, then flies it into a fixed
 * left / center / right seat in the row above. Slot reel and scramble
 * share one clock; type-from-E, random-fill, and fly-up-row run their own
 * sequencers. Reduced motion is static GreyEdge.
 */
export default function GreyEdgeCycle({
  variant,
  className = '',
  forceReducedMotion = false,
}: {
  variant: WordCycleVariant
  className?: string
  forceReducedMotion?: boolean
}) {
  const osReduced = usePrefersReducedMotion()
  const reducedMotion = forceReducedMotion || osReduced
  const { ref, inView } = useInView<HTMLDivElement>()
  const ownClock = variant === 'type-from-e' || variant === 'random-fill' || variant === 'fly-up-row'
  const cycle = useWordCycle({
    active: inView && !reducedMotion && !ownClock,
    reducedMotion,
    transitionMs:
      variant === 'bump-bounce' ? BUMP_BOUNCE_MS : variant === 'scramble' ? SCRAMBLE_MS : WORD_CYCLE_MS.transition,
  })
  const typed = useTypeFromECycle({
    active: inView && !reducedMotion && variant === 'type-from-e',
    reducedMotion,
  })
  const filled = useRandomFillCycle({
    active: inView && !reducedMotion && variant === 'random-fill',
    reducedMotion,
  })
  const fly = useFlyUpRowCycle({
    active: inView && !reducedMotion && variant === 'fly-up-row',
    reducedMotion,
  })

  const vars = {
    '--ge-word-dwell': WORD_CYCLE_CSS.dwell,
    '--ge-word-trans': WORD_CYCLE_CSS.transition,
    '--ge-word-lock': WORD_CYCLE_CSS.lockHold,
    '--ge-word-gold': '#c4a35a',
  } as CSSProperties

  const locked =
    variant === 'type-from-e'
      ? typed.isLocked
      : variant === 'random-fill'
        ? filled.isLocked
        : variant === 'fly-up-row'
          ? fly.isLocked
          : cycle.isLocked
  const markClass = `ge-word relative inline-flex items-baseline font-display leading-[1.25] ${
    variant === 'random-fill'
      ? 'font-bold tracking-normal'
      : `font-semibold ${variant === 'type-from-e' ? 'tracking-[0.04em]' : 'tracking-[0.08em]'}`
  }`

  if (reducedMotion) {
    return (
      <div ref={ref} className={`${markClass} is-locked pb-[0.22em] ${className}`} style={vars} aria-label="GreyEdge">
        {variant === 'random-fill' ? (
          <SplitFlapBoard chars={filled.chars} target={LOCK_WORD} />
        ) : (
          <>
            <span className="text-ge-graphite" aria-hidden="true">
              {LOCK_WORD}
            </span>
            <span className="text-white" aria-hidden="true">
              {ANCHOR_WORD}
            </span>
          </>
        )}
        <span className="ge-word-gold-line" aria-hidden="true" />
      </div>
    )
  }

  if (variant === 'fly-up-row') {
    return (
      <div
        ref={ref}
        className={`inline-flex flex-col items-center font-display font-semibold tracking-[0.02em] ${className}`}
        style={vars}
        aria-label="GreyEdge"
      >
        <FlyUpPack state={fly} />
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={`${markClass} pb-[0.22em] ${locked ? 'is-locked' : ''} ${className}`}
      style={vars}
      aria-label="GreyEdge"
    >
      {variant === 'random-fill' ? (
        <SplitFlapBoard chars={filled.chars} target={filled.target} />
      ) : (
        <>
          <Slot clip={variant === 'slot-reel'}>
            <AdjectiveSlot variant={variant} cycle={cycle} typed={typed.text} />
          </Slot>
          <span className="text-white" aria-hidden="true">
            {ANCHOR_WORD}
          </span>
        </>
      )}
      <span className="ge-word-gold-line" aria-hidden="true" />
    </div>
  )
}

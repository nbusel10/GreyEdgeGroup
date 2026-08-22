import { useEffect, useRef, useState } from 'react'

export const ADJECTIVES = ['Leading', 'Cutting', 'Competitive'] as const
export const LOCK_WORD = 'Grey'
export const ANCHOR_WORD = 'Edge'
/** Longest adjective — sizes the slot so Edge never shifts. */
export const SLOT_WORD = 'Competitive'
/** Split-flap board: adjective columns + Edge tiles. */
export const FLAP_ADJ_LEN = SLOT_WORD.length
export const FLAP_EDGE_LEN = ANCHOR_WORD.length
export const FLAP_BOARD_LEN = FLAP_ADJ_LEN + FLAP_EDGE_LEN

export const WORD_CYCLE_MS = {
  dwell: 800,
  transition: 350,
  lockHold: 3500,
} as const

export const WORD_CYCLE_CSS = {
  dwell: '0.8s',
  transition: '0.35s',
  lockHold: '3.5s',
} as const

export const TYPE_FROM_E_MS = {
  perLetter: 95,
  perDelete: 70,
} as const

export const RANDOM_FILL_MS = {
  perLetter: 120,
  hold: 1000,
  perBlank: 70,
} as const

export const BUMP_BOUNCE_MS = 720
/** Letter-scramble settle time — longer than the shared 350ms transition. */
export const SCRAMBLE_MS = 740

export const FLY_UP_MS = {
  leadHold: 800,
  fly: 450,
  slotHold: 700,
  wordIn: 350,
  lockHold: 3500,
  reset: 280,
} as const

export type WordCycleVariant =
  | 'slot-reel'
  | 'scramble'
  | 'type-from-e'
  | 'random-fill'
  | 'bump-bounce'
  | 'fly-up-row'

export type FlyUpPhase =
  | 'lead'
  | 'flyLead'
  | 'cutting'
  | 'flyCutting'
  | 'competitive'
  | 'flyCompetitive'
  | 'grey'
  | 'lock'
  | 'reset'

export type FlyUpState = {
  phase: FlyUpPhase
  isLocked: boolean
  generation: number
}

export type WordCyclePhase = 'hold' | 'transition'

export type WordCycleState = {
  current: string
  next: string
  phase: WordCyclePhase
  /** True while arriving at Grey or holding GreyEdge — drives the gold underline. */
  isLocked: boolean
  generation: number
}

const STEPS: { word: string; hold: number }[] = [
  { word: ADJECTIVES[0], hold: WORD_CYCLE_MS.dwell },
  { word: ADJECTIVES[1], hold: WORD_CYCLE_MS.dwell },
  { word: ADJECTIVES[2], hold: WORD_CYCLE_MS.dwell },
  { word: LOCK_WORD, hold: WORD_CYCLE_MS.lockHold },
]

const STATIC: WordCycleState = {
  current: LOCK_WORD,
  next: LOCK_WORD,
  phase: 'hold',
  isLocked: true,
  generation: 0,
}

function holdState(index: number, generation: number): WordCycleState {
  const word = STEPS[index].word
  return {
    current: word,
    next: word,
    phase: 'hold',
    isLocked: word === LOCK_WORD,
    generation,
  }
}

/**
 * Walks Leading → Cutting → Competitive → GreyEdge hold, then loops.
 *
 * Timeouts, not RAF: most skins are CSS transitions keyed off `generation`.
 * Pass `active: false` to freeze (off-screen). Reduced motion pins GreyEdge.
 */
export function useWordCycle({
  active,
  reducedMotion,
  transitionMs = WORD_CYCLE_MS.transition,
}: {
  active: boolean
  reducedMotion: boolean
  transitionMs?: number
}): WordCycleState {
  const [state, setState] = useState<WordCycleState>(reducedMotion ? STATIC : holdState(0, 0))
  const indexRef = useRef(0)
  const holdTimer = useRef(0)
  const transTimer = useRef(0)

  useEffect(() => {
    const clear = () => {
      window.clearTimeout(holdTimer.current)
      window.clearTimeout(transTimer.current)
    }

    if (reducedMotion) {
      clear()
      indexRef.current = 0
      setState(STATIC)
      return clear
    }

    if (!active) {
      clear()
      return clear
    }

    let cancelled = false

    const schedule = () => {
      const i = indexRef.current
      const step = STEPS[i]
      const nextI = (i + 1) % STEPS.length
      const nextWord = STEPS[nextI].word

      holdTimer.current = window.setTimeout(() => {
        if (cancelled) return
        setState((s) => ({
          current: step.word,
          next: nextWord,
          phase: 'transition',
          isLocked: nextWord === LOCK_WORD,
          generation: s.generation + 1,
        }))
        transTimer.current = window.setTimeout(() => {
          if (cancelled) return
          indexRef.current = nextI
          setState((s) => holdState(nextI, s.generation))
          schedule()
        }, transitionMs)
      }, step.hold)
    }

    setState((s) => holdState(indexRef.current, s.generation))
    schedule()

    return () => {
      cancelled = true
      clear()
    }
  }, [active, reducedMotion, transitionMs])

  return state
}

/**
 * True while the element intersects the viewport. Starts false so off-screen
 * lockups on the preview page don't all run at once.
 */
export function useInView<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
      rootMargin: '0px 0px -8% 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}

const ALPHA = 'abcdefghijklmnopqrstuvwxyz'

/** Tick only the destination word’s letters — no padding into the empty slot. */
export function scrambleText(to: string, progress: number, now: number) {
  return to
    .split('')
    .map((target, i) => {
      const settle = (i + 1) / to.length
      if (progress >= settle) return target
      const idx = Math.abs(Math.floor((Math.sin(now * 0.045 + i * 13.7) + 1) * 13)) % 26
      const c = ALPHA[idx]
      return target === target.toUpperCase() ? c.toUpperCase() : c
    })
    .join('')
}

export function isLockWord(word: string) {
  return word === LOCK_WORD
}

const TYPE_STEPS = [...ADJECTIVES, LOCK_WORD]

/**
 * Types each word out from Edge (new letters appear at the E and the word grows
 * left), holds, then deletes back into the E before the next word.
 */
export function useTypeFromECycle({
  active,
  reducedMotion,
}: {
  active: boolean
  reducedMotion: boolean
}): { text: string; isLocked: boolean } {
  const [text, setText] = useState('')
  const [isLocked, setIsLocked] = useState(false)
  const indexRef = useRef(0)

  useEffect(() => {
    if (reducedMotion) {
      setText(LOCK_WORD)
      setIsLocked(true)
      indexRef.current = 0
      return
    }
    if (!active) return

    let cancelled = false
    let timer = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const run = async () => {
      while (!cancelled) {
        const word = TYPE_STEPS[indexRef.current]
        const lock = word === LOCK_WORD
        setIsLocked(false)

        for (let n = 1; n <= word.length; n++) {
          if (cancelled) return
          setText(word.slice(0, n))
          if (n === word.length) setIsLocked(lock)
          await wait(TYPE_FROM_E_MS.perLetter)
        }

        if (cancelled) return
        await wait(lock ? WORD_CYCLE_MS.lockHold : WORD_CYCLE_MS.dwell)

        setIsLocked(false)
        for (let n = word.length - 1; n >= 0; n--) {
          if (cancelled) return
          setText(word.slice(0, n))
          await wait(TYPE_FROM_E_MS.perDelete)
        }

        indexRef.current = (indexRef.current + 1) % TYPE_STEPS.length
      }
    }

    void run()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [active, reducedMotion])

  return { text, isLocked }
}

function shuffleIndices(n: number) {
  const order = Array.from({ length: n }, (_, i) => i)
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = order[i]
    order[i] = order[j]
    order[j] = tmp
  }
  return order
}

function flapBoard(word: string) {
  return [...word.padStart(FLAP_ADJ_LEN, ' ').split(''), ...ANCHOR_WORD.split('')]
}

function lockedFlapBoard() {
  return flapBoard(LOCK_WORD)
}

function adjLetterIndices(word: string) {
  return word
    .padStart(FLAP_ADJ_LEN, ' ')
    .split('')
    .flatMap((c, i) => (c === ' ' ? [] : [i]))
}

function edgeIndices() {
  return Array.from({ length: FLAP_EDGE_LEN }, (_, i) => FLAP_ADJ_LEN + i)
}

/**
 * Split-flap board: Competitive-width adjective tiles plus Edge tiles.
 * First pass fills Leading and Edge together. After that Edge stays;
 * only the adjective tiles blank and refill.
 */
export function useRandomFillCycle({
  active,
  reducedMotion,
}: {
  active: boolean
  reducedMotion: boolean
}): { chars: string[]; target: string; isLocked: boolean } {
  const emptyBoard = () => Array.from({ length: FLAP_BOARD_LEN }, () => ' ')
  const [chars, setChars] = useState<string[]>(() =>
    reducedMotion ? lockedFlapBoard() : emptyBoard(),
  )
  const [target, setTarget] = useState<string>(reducedMotion ? LOCK_WORD : ADJECTIVES[0])
  const [isLocked, setIsLocked] = useState(reducedMotion)
  const indexRef = useRef(0)
  const edgeBuiltRef = useRef(reducedMotion)
  const slotsRef = useRef<string[]>(reducedMotion ? lockedFlapBoard() : emptyBoard())

  useEffect(() => {
    if (reducedMotion) {
      const locked = lockedFlapBoard()
      slotsRef.current = locked
      edgeBuiltRef.current = true
      setChars(locked)
      setTarget(LOCK_WORD)
      setIsLocked(true)
      indexRef.current = 0
      return
    }
    if (!active) return

    let cancelled = false
    let timer = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const run = async () => {
      const slots = slotsRef.current

      while (!cancelled) {
        const word = TYPE_STEPS[indexRef.current]
        const lock = word === LOCK_WORD
        const nextBoard = flapBoard(word)
        const adjIdx = adjLetterIndices(word)
        const fillIdx = edgeBuiltRef.current ? adjIdx : [...adjIdx, ...edgeIndices()]
        setTarget(word)
        setIsLocked(false)

        for (const i of shuffleIndices(fillIdx.length).map((k) => fillIdx[k])) {
          if (cancelled) return
          slots[i] = nextBoard[i]
          slotsRef.current = slots
          setChars([...slots])
          await wait(RANDOM_FILL_MS.perLetter)
        }

        if (cancelled) return
        edgeBuiltRef.current = true
        setIsLocked(lock)
        await wait(RANDOM_FILL_MS.hold)

        setIsLocked(false)
        for (const i of shuffleIndices(adjIdx.length).map((k) => adjIdx[k])) {
          if (cancelled) return
          slots[i] = ' '
          setChars([...slots])
          await wait(RANDOM_FILL_MS.perBlank)
        }

        indexRef.current = (indexRef.current + 1) % TYPE_STEPS.length
      }
    }

    void run()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [active, reducedMotion])

  return { chars, target, isLocked }
}

/**
 * LeadingEdge hold. Leading flies up-right into a row. Cutting sits next to
 * Edge, then flies up; Competitive does the same. Grey locks beside Edge.
 */
export function useFlyUpRowCycle({
  active,
  reducedMotion,
}: {
  active: boolean
  reducedMotion: boolean
}): FlyUpState {
  const [state, setState] = useState<FlyUpState>(() =>
    reducedMotion
      ? { phase: 'lock', isLocked: true, generation: 0 }
      : { phase: 'lead', isLocked: false, generation: 0 },
  )

  useEffect(() => {
    if (reducedMotion) {
      setState({ phase: 'lock', isLocked: true, generation: 0 })
      return
    }
    if (!active) return

    let cancelled = false
    let timer = 0

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const run = async () => {
      while (!cancelled) {
        setState((s) => ({ phase: 'lead', isLocked: false, generation: s.generation + 1 }))
        await wait(FLY_UP_MS.leadHold)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'flyLead' }))
        await wait(FLY_UP_MS.fly)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'cutting' }))
        await wait(FLY_UP_MS.slotHold)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'flyCutting' }))
        await wait(FLY_UP_MS.fly)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'competitive' }))
        await wait(FLY_UP_MS.slotHold)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'flyCompetitive' }))
        await wait(FLY_UP_MS.fly)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'grey' }))
        await wait(FLY_UP_MS.wordIn)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'lock', isLocked: true }))
        await wait(FLY_UP_MS.lockHold)
        if (cancelled) return

        setState((s) => ({ ...s, phase: 'reset', isLocked: false }))
        await wait(FLY_UP_MS.reset)
      }
    }

    void run()
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [active, reducedMotion])

  return state
}

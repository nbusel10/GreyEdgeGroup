import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useCountUp, useReveal } from '../lib/hooks'

/** Italic underline used for in-prose jumps (About names, glossary terms). */
export const proseLinkClass =
  'italic text-ge-charcoal underline decoration-ge-light underline-offset-2 transition-colors hover:text-ge-accent hover:decoration-ge-accent'

/** Standard page gutter and max width, shared by every section. */
export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>
}

/** Small label above a heading. The slashes are the one always-accent element. */
export function Eyebrow({
  children,
  tone = 'dark',
  className = '',
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <div
      className={`font-body text-[11px] font-medium uppercase tracking-[0.28em] ${
        tone === 'light' ? 'text-ge-light' : 'text-ge-graphite'
      } ${className}`}
    >
      <span className="text-ge-accent" aria-hidden="true">
        //{' '}
      </span>
      {children}
    </div>
  )
}

/** Wraps children in a scroll-reveal. */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  /** Seconds. Stagger siblings with 0.06–0.12. */
  delay?: number
  className?: string
}) {
  const { ref, visible } = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}

type BtnVariant = 'solid' | 'outline' | 'light' | 'ghost'

const btnBase =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-body text-[11px] font-medium uppercase tracking-[0.22em] px-8 py-4 transition-colors duration-200'

const btnVariants: Record<BtnVariant, string> = {
  solid: 'bg-ge-black text-white hover:bg-ge-accent',
  outline: 'border border-ge-light text-ge-graphite hover:border-ge-accent hover:text-ge-accent',
  light: 'bg-white text-ge-black hover:bg-ge-accent hover:text-white',
  ghost: 'border border-white/40 text-white hover:border-ge-accent hover:text-ge-accent-bright',
}

export function Btn({
  to,
  href,
  variant = 'solid',
  className = '',
  children,
  ...rest
}: {
  to?: string
  href?: string
  variant?: BtnVariant
  className?: string
  children: ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${btnBase} ${btnVariants[variant]} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}

/** A counted statistic. Numerals in black; labels muted. */
export function StatBlock({
  value,
  label,
  prefix,
  suffix,
  tone = 'dark',
}: {
  value: number
  label: string
  prefix?: string
  suffix?: string
  tone?: 'light' | 'dark'
}) {
  const { ref, value: shown } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl font-bold leading-none tracking-tight text-ge-black md:text-6xl">
        {prefix}
        {shown.toLocaleString('en-US')}
        {suffix}
      </div>
      <div
        className={`mt-3 font-body text-[11px] uppercase tracking-[0.16em] ${
          tone === 'light' ? 'text-ge-silver' : 'text-ge-steel'
        }`}
      >
        {label}
      </div>
    </div>
  )
}

/** Section heading with optional eyebrow and lead paragraph. */
export function SectionHeading({
  eyebrow,
  heading,
  lead,
  tone = 'dark',
  align = 'left',
  className = '',
}: {
  eyebrow?: string
  heading: ReactNode
  lead?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-5 font-display text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl md:text-6xl ${
          tone === 'light' ? 'text-white' : 'text-ge-black'
        }`}
      >
        {heading}
      </h2>
      {lead && (
        <p
          className={`mt-6 font-body text-base leading-relaxed sm:text-lg ${
            tone === 'light' ? 'text-ge-light' : 'text-ge-graphite'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}

/** Vertical rhythm wrapper so section padding stays consistent. */
export function Section({
  id,
  className = '',
  children,
}: {
  id?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  )
}

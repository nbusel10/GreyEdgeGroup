import GMark from './GMark'

/**
 * The wordmark lockup. The G is the SVG mark rather than a letter, so the brand's
 * strongest asset carries the accent colour and the text supplies the rest.
 */
export default function Logo({
  className = '',
  tone = 'dark',
}: {
  className?: string
  /** 'light' for use on dark backgrounds. */
  tone?: 'light' | 'dark'
}) {
  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span className="sr-only">The GreyEdge Group</span>
      {/* Sized and nudged to sit on the baseline at cap height, so it reads as a letter. */}
      <GMark className="h-[0.72em] w-[0.72em] shrink-0 translate-y-[0.005em] text-ge-accent" />
      <span
        aria-hidden="true"
        className={`ml-[0.06em] font-display font-bold uppercase leading-none tracking-[0.04em] ${
          tone === 'light' ? 'text-white' : 'text-ge-black'
        }`}
      >
        reyedge
      </span>
    </span>
  )
}

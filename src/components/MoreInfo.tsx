import type { ReactNode } from 'react'

/** Closed by default. Opening one does not close the others. */
export default function MoreInfo({ children, fullWidth = false }: { children: ReactNode; fullWidth?: boolean }) {
  return (
    <details className="group mt-4">
      <summary className="flex w-fit cursor-pointer list-none items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-ge-black [&::-webkit-details-marker]:hidden">
        <svg
          className="h-3.5 w-3.5 shrink-0 text-ge-accent transition-transform group-open:rotate-45"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        More info
      </summary>
      <div
        className={`mt-3 space-y-3 font-body text-sm leading-relaxed text-ge-graphite ${fullWidth ? 'max-w-none' : 'max-w-3xl'}`}
      >
        {children}
      </div>
    </details>
  )
}

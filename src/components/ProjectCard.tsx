import { Link } from 'react-router-dom'
import type { Project } from '../content/projects'

const statusTone: Record<Project['status'], string> = {
  Completed: 'border-ge-accent text-ge-accent-bright',
  Operational: 'border-white/50 text-white',
  'In Progress': 'border-white/50 text-white',
  'In Development': 'border-white/40 text-white/85',
}

export default function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { slug, name, location, status, sqFeet, buildings, summary, image, imageAlt } = project

  return (
    <Link
      to={`/projects/${slug}`}
      className="group flex h-full flex-col border border-ge-light bg-white transition-colors hover:border-ge-accent"
    >
      <div className="relative h-60 shrink-0 overflow-hidden bg-ge-light md:h-64">
        {image && (
          <img
            src={image}
            alt={imageAlt}
            loading={eager ? 'eager' : 'lazy'}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(20,23,26,0.8) 0%, transparent 58%)' }}
        />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <span
            className={`inline-block border px-2 py-1 font-body text-[10px] uppercase tracking-[0.16em] ${statusTone[status]}`}
          >
            {status}
          </span>
          <h3 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white">
            {name}
          </h3>
          <div className="mt-1 font-body text-xs text-white/80">{location}</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-body text-sm leading-relaxed text-ge-graphite">{summary}</p>
        <div className="mt-auto pt-5">
          <dl className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <dt className="shrink-0 font-body text-[10px] uppercase tracking-[0.18em] text-ge-steel">Square feet</dt>
              <span aria-hidden className="stat-leader" />
              <dd className="shrink-0 font-display text-lg font-bold text-ge-black">{sqFeet ?? 'In progress'}</dd>
            </div>
            <div className="flex items-center gap-3">
              <dt className="shrink-0 font-body text-[10px] uppercase tracking-[0.18em] text-ge-steel">Buildings</dt>
              <span aria-hidden className="stat-leader stat-leader-delay" />
              <dd className="shrink-0 font-display text-lg font-bold text-ge-black">{buildings ?? 'In progress'}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  )
}

import { useState } from 'react'
import { gaAttrs } from '../../lib/gaLabel'
import { Eyebrow, Reveal } from '../ui'

const ARTICLE_URL =
  'https://mt2030.org/solutions/geothermal-and-thermal-energy-networks-for-mountain-towns/'
const VIDEO_ID = 'y2X53b0G6yA'
const POSTER = '/images/site/mt2030-panel.webp'

/**
 * Homepage feature for the MT2030 mountain-towns session.
 * The YouTube player is mounted only after a click, so the page does not autoplay.
 */
export default function FeaturedConversation() {
  const [playing, setPlaying] = useState(false)

  return (
    <Reveal>
      <article className="mt-12 grid items-center gap-8 lg:mt-14 lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)] lg:gap-12 xl:gap-16">
        <div className="relative aspect-video overflow-hidden bg-ge-black">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&playsinline=1`}
              title="Geothermal and Thermal Energy Networks for Mountain Towns"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 block h-full w-full cursor-pointer"
              aria-label="Play the MT2030 panel video, Advancing thermal energy networks in mountain communities"
              {...gaAttrs('home_featured_mt2030_play')}
            >
              <img
                src={POSTER}
                alt=""
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-ge-black/25 transition-colors duration-300 group-hover:bg-ge-black/35" />
              <span className="relative flex h-full flex-col items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/75 bg-ge-black/50 text-white transition-colors duration-200 group-hover:border-white group-hover:bg-ge-accent">
                  <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6" aria-hidden="true">
                    <path fill="currentColor" d="M8 5.4v13.2L19.2 12 8 5.4z" />
                  </svg>
                </span>
                <span className="mt-5 font-body text-[10px] font-medium uppercase tracking-[0.28em] text-white">
                  MT2030 panel video
                </span>
              </span>
            </button>
          )}
        </div>

        <div className="lg:py-2">
          <Eyebrow>Featured conversation / MT2030</Eyebrow>
          <h3 className="mt-4 font-display text-[1.75rem] font-bold uppercase leading-[1.05] tracking-tight text-ge-black sm:text-3xl lg:text-[2.15rem] xl:text-4xl">
            Advancing thermal energy networks in mountain communities
          </h3>
          <p className="mt-4 max-w-prose font-body text-sm leading-relaxed text-ge-graphite sm:text-base">
            GreyEdge CEO Matt Garlick joins industry leaders to discuss how thoughtful planning, governance, and
            shared thermal infrastructure can help communities move from feasibility to implementation.
          </p>
          <a
            href={ARTICLE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center gap-2 border-b border-ge-light pb-1 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-ge-black transition-colors hover:border-ge-accent hover:text-ge-accent"
            {...gaAttrs('home_featured_mt2030_article')}
          >
            Read the full feature
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </article>
    </Reveal>
  )
}

import { useEffect } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { phases } from '../content/process'
import { leadershipHashTarget } from '../lib/leadershipHash'
import { serviceHashTarget } from '../lib/serviceItemId'

/** Top-row process phases scroll to the full timeline so every circle stays in view. */
const processTimelineScrollIds = new Set(phases.slice(0, 3).map((p) => p.id))

/** Section anchors that scroll with fixed header offset instead of scrollIntoView. */
const headerOffsetScrollIds = new Set(['process-timeline', 'services-head', 'leadership-head'])

function scrollTargetId(hashId: string) {
  if (processTimelineScrollIds.has(hashId)) return 'process-timeline'
  if (hashId === 'services' || serviceHashTarget(`#${hashId}`)) return 'services-head'
  if (hashId === 'leadership' || leadershipHashTarget(`#${hashId}`)) return 'leadership-head'
  return hashId
}

function headerOffsetFor(targetId: string) {
  if (targetId === 'services-head' || targetId === 'leadership-head') {
    const header = document.querySelector('header')
    if (header) return header.getBoundingClientRect().height
    return window.matchMedia('(min-width: 1024px)').matches ? 72 : 64
  }
  return window.matchMedia('(min-width: 1024px)').matches ? 96 : 88
}

function scrollToHash(hash: string, behavior: ScrollBehavior = 'smooth') {
  const id = scrollTargetId(hash.slice(1))
  let frames = 0
  const tryScroll = () => {
    const el = document.getElementById(id)
    if (el) {
      if (headerOffsetScrollIds.has(id)) {
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffsetFor(id)
        window.scrollTo({ top: Math.max(0, top), behavior })
        return
      }
      el.scrollIntoView({ behavior, block: 'start' })
      return
    }
    if (frames++ < 20) requestAnimationFrame(tryScroll)
  }
  return requestAnimationFrame(tryScroll)
}

/**
 * Router-level scroll management. Jumps to the top on a new route, or to the anchored
 * section when the URL carries a hash — including when arriving from another page,
 * where the target element doesn't exist until after the new page paints.
 *
 * Back/forward (POP) restores the saved scroll position for that history entry.
 * Positions are recorded on scroll (not effect cleanup) so a route change does not
 * overwrite the previous entry with the new page's scrollY.
 * Refresh ignores a leftover hash so a mid-page dropdown click does not pin reload
 * to that section.
 */

let lastKey = ''
let reloadHandled = false
const scrollPositions = new Map<string, number>()

function documentNavigationType() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  return nav?.type ?? 'navigate'
}

export default function ScrollToTop() {
  const { pathname, hash, key: locationKey } = useLocation()
  const navigate = useNavigate()
  const navType = useNavigationType()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Record while this history entry is active. Do not write on mount — that would
  // overwrite a saved POP target with the outgoing page's scrollY.
  useEffect(() => {
    const onScroll = () => {
      scrollPositions.set(locationKey, window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [locationKey])

  useEffect(() => {
    const key = `${pathname}${hash}`
    const reload = documentNavigationType() === 'reload'

    if (reload && !reloadHandled) {
      reloadHandled = true
      if (hash) navigate(`${pathname}${window.location.search}`, { replace: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      lastKey = pathname
      return
    }

    if (lastKey === key) return
    lastKey = key

    let raf = 0

    if (navType === 'POP') {
      const y = scrollPositions.get(locationKey)
      if (y != null) {
        raf = requestAnimationFrame(() => {
          window.scrollTo({ top: y, left: 0, behavior: 'auto' })
        })
      } else if (hash) {
        raf = scrollToHash(hash, 'auto')
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    } else if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } else {
      raf = scrollToHash(hash)
    }

    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, locationKey, navigate, navType])

  return null
}

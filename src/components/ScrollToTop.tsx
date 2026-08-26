import { useEffect } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'

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
        const id = hash.slice(1)
        let frames = 0
        const tryScroll = () => {
          const el = document.getElementById(id)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            return
          }
          if (frames++ < 20) raf = requestAnimationFrame(tryScroll)
        }
        raf = requestAnimationFrame(tryScroll)
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    } else if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    } else {
      const id = hash.slice(1)
      let frames = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        if (frames++ < 20) raf = requestAnimationFrame(tryScroll)
      }
      raf = requestAnimationFrame(tryScroll)
    }

    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, locationKey, navigate, navType])

  return null
}

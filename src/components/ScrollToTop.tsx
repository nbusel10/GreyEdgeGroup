import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Router-level scroll management. Jumps to the top on a new route, or to the anchored
 * section when the URL carries a hash — including when arriving from another page,
 * where the target element doesn't exist until after the new page paints.
 *
 * Refresh ignores a leftover hash so a mid-page dropdown click does not pin reload
 * to that section.
 */

let lastKey = ''
let reloadHandled = false

function navigationType() {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  return nav?.type ?? 'navigate'
}

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    const key = `${pathname}${hash}`
    const reload = navigationType() === 'reload'

    if (reload && !reloadHandled) {
      reloadHandled = true
      if (hash) navigate(`${pathname}${window.location.search}`, { replace: true })
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      lastKey = pathname
      return
    }

    if (lastKey === key) return
    lastKey = key

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }

    const id = hash.slice(1)
    let frames = 0
    let raf = 0
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (frames++ < 20) raf = requestAnimationFrame(tryScroll)
    }
    raf = requestAnimationFrame(tryScroll)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, navigate])

  return null
}

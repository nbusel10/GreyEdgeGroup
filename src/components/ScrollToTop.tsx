import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Router-level scroll management. Jumps to the top on a new route, or to the anchored
 * section when the URL carries a hash — including when arriving from another page,
 * where the target element doesn't exist until after the new page paints.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      return
    }
    const id = hash.slice(1)
    let frames = 0
    let raf = 0
    // The section may mount a frame or two late; retry briefly before giving up.
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
  }, [pathname, hash])

  return null
}

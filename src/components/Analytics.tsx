import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Page views and button clicks for the production GA4 tag.
 * The tag is added to the built HTML only for production, so this stays quiet
 * in local dev and on staging.
 */
export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (typeof window.gtag !== 'function') return
      window.gtag('event', 'page_view', {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      })
    }, 0)
    return () => window.clearTimeout(timer)
  }, [pathname, search])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (typeof window.gtag !== 'function') return
      const raw = event.target
      const start = raw instanceof Element ? raw : raw instanceof Node ? raw.parentElement : null
      const el = start?.closest('[data-ga-label]')
      const buttonLabel = el?.getAttribute('data-ga-label')
      if (!buttonLabel) return
      window.gtag('event', 'button_click', { button_label: buttonLabel })
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

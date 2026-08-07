import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
  /** Absolute or root-relative path to a share image. */
  image?: string
}

const SITE_URL = 'https://greyedgegroup.com'

function setTag(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement | HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const match = selector.match(/\[(name|property|rel)="([^"]+)"\]/)
    if (match) el.setAttribute(match[1], match[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/**
 * Per-route title, description, canonical and Open Graph tags.
 *
 * This is a client-side SPA, so crawlers that don't execute JavaScript will only see
 * index.html. If organic search becomes a priority, prerendering at build time is the
 * next step — the content is all static, so nothing here would need to change.
 */
export function usePageMeta({ title, description, image }: PageMeta) {
  useEffect(() => {
    document.title = title
    setTag('meta[property="og:title"]', 'content', title)

    if (description) {
      setTag('meta[name="description"]', 'content', description)
      setTag('meta[property="og:description"]', 'content', description)
    }

    const url = SITE_URL + window.location.pathname
    setTag('link[rel="canonical"]', 'href', url)
    setTag('meta[property="og:url"]', 'content', url)

    if (image) {
      setTag('meta[property="og:image"]', 'content', image.startsWith('http') ? image : SITE_URL + image)
    }
  }, [title, description, image])
}

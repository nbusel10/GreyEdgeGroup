/**
 * Production builds stay indexable. Staging deploys set SITE_ENVIRONMENT=staging
 * and this rewrites the built files so crawlers stay out of the preview host.
 */
import { readFile, writeFile } from 'node:fs/promises'

const staging = process.env.SITE_ENVIRONMENT === 'staging'
const GA_ID = 'G-1KDVP6WJYT'
const gaBlock = `    <!-- ga4:start -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { send_page_view: false });
    </script>
    <!-- ga4:end -->
`

if (!staging) {
  const indexPath = 'dist/index.html'
  let html = await readFile(indexPath, 'utf8')
  html = html.replace(/\s*<!-- ga4:start -->[\s\S]*?<!-- ga4:end -->\n?/, '\n')
  html = html.replace('</head>', `${gaBlock}  </head>`)
  await writeFile(indexPath, html)
  console.log('robots: indexable')
  console.log(`ga4: ${GA_ID}`)
} else {
  const indexPath = 'dist/index.html'
  let html = await readFile(indexPath, 'utf8')
  html = html.replace(/\s*<!-- ga4:start -->[\s\S]*?<!-- ga4:end -->\n?/, '\n')
  const blocked = '<meta name="robots" content="noindex, nofollow" />'
  if (/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/.test(html)) {
    html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/, blocked)
  } else {
    html = html.replace('<head>', `<head>\n    ${blocked}`)
  }
  await writeFile(indexPath, html)

  await writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n')

  const htaccessPath = 'dist/.htaccess'
  let htaccess = await readFile(htaccessPath, 'utf8')
  if (!htaccess.includes('X-Robots-Tag')) {
    htaccess =
      `<IfModule mod_headers.c>\n  Header set X-Robots-Tag "noindex, nofollow"\n</IfModule>\n` +
      htaccess
  }
  await writeFile(htaccessPath, htaccess)

  console.log('robots: noindex (staging)')
}

/**
 * Production builds stay indexable. Staging deploys set SITE_ENVIRONMENT=staging
 * and this rewrites the built files so crawlers stay out of the preview host.
 */
import { readFile, writeFile } from 'node:fs/promises'

const staging = process.env.SITE_ENVIRONMENT === 'staging'

if (!staging) {
  console.log('robots: indexable')
} else {
  const indexPath = 'dist/index.html'
  let html = await readFile(indexPath, 'utf8')
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

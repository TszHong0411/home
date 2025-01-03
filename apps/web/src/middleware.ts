import { i18nMiddleware } from '@tszhong0411/i18n/middleware'
import { type NextRequest } from 'next/server'

const middleware = (request: NextRequest) => {
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.honghong.me vercel.live va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' vercel.live;
    img-src * blob: data:;
    font-src 'self' data: assets.vercel.com vercel.live;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    connect-src *;
    media-src 'self';
    frame-ancestors 'none';
    frame-src vercel.live;
    block-all-mixed-content;
    upgrade-insecure-requests;
    worker-src blob:;
  `

  const response = i18nMiddleware(request)

  response.headers.set('Content-Security-Policy', csp.replaceAll('\n', ''))

  return response
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   * - folders in public (which resolve to /foldername)
   * - sitemap.xml
   * - robots.txt
   */
  matcher: [
    '/((?!api|_next/static|_next/image|og|favicon|fonts|images|videos|favicon.ico|sitemap.xml|robots.txt|rss.xml).*)'
  ]
}

export default middleware

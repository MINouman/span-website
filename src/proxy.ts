// Locale routing (Next.js 16 "proxy", formerly middleware).
// English is served without a prefix: "/projects" is rewritten internally to "/en/projects".
// Bangla keeps its prefix: "/bn/projects". A request for "/en/..." redirects to the unprefixed URL
// so each page has one canonical address.
import { NextResponse, type NextRequest } from 'next/server'

import { defaultLocale, locales } from '@/lib/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/'
    return NextResponse.redirect(url, 308)
  }

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Skip Payload admin and API, Next internals, and any path with a file extension.
  matcher: ['/((?!admin|api|_next|.*\\..*).*)'],
}

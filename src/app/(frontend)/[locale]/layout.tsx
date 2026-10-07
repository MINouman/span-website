// Root frontend layout: fonts (Manrope; Noto Sans Bengali on bn), Header, Footer.
// StickyActionBar is added in step 5. MotionLayer adds the site-wide scroll reveal and card tilt.
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MotionLayer } from '@/components/ui/MotionLayer'
import { manrope, notoBengali } from '@/fonts'
import { getDictionary, isLocale, locales } from '@/lib/i18n'
import { placeholderContact } from '@/lib/site'

import '../globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'SPAN — homes built in Aftabnagar, Dhaka',
    template: '%s — SPAN',
  },
  description:
    'SPAN Engineering and Construction Ltd. builds residential buildings in Aftabnagar, Dhaka.',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type LayoutProps = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function FrontendLayout({ children, params }: LayoutProps) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const dict = getDictionary(locale)
  const fontClasses =
    locale === 'bn' ? `${manrope.variable} ${notoBengali.variable}` : manrope.variable

  return (
    <html lang={locale} className={fontClasses} data-scroll-behavior="smooth">
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only z-[60] rounded-control bg-amber px-4 py-3 font-semibold text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {dict.common.skipToContent}
        </a>
        <Header locale={locale} dict={dict} contact={placeholderContact} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} contact={placeholderContact} />
        <MotionLayer />
      </body>
    </html>
  )
}

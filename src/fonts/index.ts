import localFont from 'next/font/local'

// Manrope variable (400–800), Latin subset, self-hosted and preloaded (spec §2).
export const manrope = localFont({
  src: './Manrope-Variable-latin.woff2',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  preload: true,
  variable: '--font-manrope',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

// Noto Sans Bengali variable, Bengali subset. Not preloaded: the browser only fetches it
// when Bangla text renders, and the family is only applied on the bn locale.
export const notoBengali = localFont({
  src: './NotoSansBengali-Variable-bengali.woff2',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  preload: false,
  variable: '--font-noto-bengali',
})

'use client'

// The photo viewer, loaded on demand: its code downloads only when a photo is first opened,
// so pages with galleries ship less JavaScript up front.
import dynamic from 'next/dynamic'

export const Lightbox = dynamic(() => import('./Lightbox').then((m) => m.Lightbox), {
  ssr: false,
})

'use client'

// Map block (spec §3.12). Shows a light drawn map with a pin until tapped, then loads the Google Maps
// embed, so no third-party map code loads unless the visitor asks for it.
import { useState } from 'react'

import { ArrowButton } from '@/components/ui/ArrowButton'
import { Icon } from '@/components/ui/Icon'
import { mapsUrl } from '@/lib/contact-links'
import type { Dictionary } from '@/lib/i18n'

type MapBlockProps = {
  lat: number
  lng: number
  labels: Dictionary['map']
  className?: string
  /** Aspect-ratio classes for the map frame. */
  aspectClass?: string
}

export function MapBlock({
  lat,
  lng,
  labels,
  className = '',
  aspectClass = 'aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9]',
}: MapBlockProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={className}>
      <div
        className={`relative overflow-hidden rounded-card border border-stone bg-[#eef0ee] ${aspectClass}`}
      >
        {loaded ? (
          <iframe
            title={labels.title}
            src={`https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`}
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <>
            {/* Drawn stand-in: blocks and roads, not real geography. */}
            <svg
              aria-hidden="true"
              className="absolute inset-0 size-full"
              viewBox="0 0 400 300"
              preserveAspectRatio="xMidYMid slice"
            >
              <rect width="400" height="300" fill="#eef0ee" />
              <g fill="#e2e5e2">
                <rect x="20" y="20" width="110" height="80" rx="4" />
                <rect x="150" y="20" width="90" height="80" rx="4" />
                <rect x="260" y="20" width="120" height="80" rx="4" />
                <rect x="20" y="130" width="110" height="60" rx="4" />
                <rect x="260" y="130" width="120" height="60" rx="4" />
                <rect x="20" y="220" width="160" height="60" rx="4" />
                <rect x="200" y="220" width="180" height="60" rx="4" />
              </g>
              <g stroke="#ffffff" strokeWidth="12" fill="none">
                <path d="M0 115h400M0 205h400M140 0v300M250 0v300" />
              </g>
              <path
                d="M0 260 C120 230 220 290 400 245"
                stroke="#b9d7ee"
                strokeWidth="18"
                fill="none"
              />
              <rect x="150" y="130" width="90" height="60" rx="4" fill="#ffe7bf" />
            </svg>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-ink drop-shadow-sm">
              <svg width="40" height="48" viewBox="0 0 40 48" aria-hidden="true">
                <path
                  d="M20 47s16-15.2 16-27A16 16 0 0 0 4 20c0 11.8 16 27 16 27z"
                  fill="var(--ink)"
                />
                <circle cx="20" cy="20" r="6" fill="var(--amber)" />
              </svg>
            </span>
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-surface via-surface/90 to-transparent p-4 pt-10">
              <p className="text-small text-muted">{labels.note}</p>
              <ArrowButton onClick={() => setLoaded(true)} icon="pin" size="sm" onLight>
                {labels.show}
              </ArrowButton>
            </div>
          </>
        )}
      </div>
      <a
        href={mapsUrl(lat, lng)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-body font-medium underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
      >
        <Icon name="expand" size={18} />
        {labels.open}
      </a>
    </div>
  )
}

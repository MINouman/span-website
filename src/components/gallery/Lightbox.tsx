'use client'

// Full-screen photo viewer (spec §3.8): swipe, keyboard arrows, Escape, focus trap, captions.
// Radius 0 (spec §2). Rendered into <body> so no parent transform or overflow can clip it.
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/ui/Icon'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import type { ImageSource } from '@/lib/projects'

export type LightboxItem = { image: ImageSource; alt: string; caption?: string }

type LightboxProps = {
  items: LightboxItem[]
  /** Index of the open photo, or null when closed. */
  index: number | null
  onIndexChange: (index: number | null) => void
  labels: Dictionary['gallery']
  /** White background suits drawings such as floor plans. */
  tone?: 'dark' | 'light'
}

const SWIPE_THRESHOLD = 50

export function Lightbox({ items, index, onIndexChange, labels, tone = 'dark' }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const pointerStartX = useRef<number | null>(null)
  const open = index !== null
  const count = items.length

  // Focus and scroll lock while open; focus returns to the opener on close.
  useEffect(() => {
    if (!open) return
    const opener = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
      opener?.focus()
    }
  }, [open])

  // Keyboard: Escape closes, arrows move, Tab stays inside the viewer.
  useEffect(() => {
    if (index === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onIndexChange(null)
      } else if (event.key === 'ArrowRight' && count > 1) {
        event.preventDefault()
        onIndexChange((index + 1) % count)
      } else if (event.key === 'ArrowLeft' && count > 1) {
        event.preventDefault()
        onIndexChange((index - 1 + count) % count)
      } else if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled])')
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, count, onIndexChange])

  if (!open || typeof document === 'undefined') return null
  const item = items[index]
  if (!item) return null

  const go = (delta: number) => onIndexChange((index + delta + count) % count)
  const dark = tone === 'dark'

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={labels.dialog}
      className={`fixed inset-0 z-[70] flex flex-col pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] ${
        dark ? 'bg-ink text-canvas' : 'bg-surface text-ink'
      }`}
      style={{ animation: 'fade-in 200ms var(--ease-out) both' }}
    >
      <div className="flex h-16 shrink-0 items-center justify-between px-[var(--gutter)]">
        <p className="text-small tabular" aria-live="polite">
          {fillTemplate(labels.counter, { n: index + 1, total: count })}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={() => onIndexChange(null)}
          aria-label={labels.close}
          className="press -mr-2 inline-flex size-11 items-center justify-center"
        >
          <Icon name="close" />
        </button>
      </div>

      <div
        className="relative min-h-0 flex-1 touch-pan-y select-none"
        onPointerDown={(e) => {
          pointerStartX.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (pointerStartX.current === null) return
          const dx = e.clientX - pointerStartX.current
          pointerStartX.current = null
          if (count > 1 && dx <= -SWIPE_THRESHOLD) go(1)
          else if (count > 1 && dx >= SWIPE_THRESHOLD) go(-1)
        }}
      >
        <Image
          key={index}
          src={item.image}
          alt={item.alt}
          fill
          sizes="100vw"
          draggable={false}
          className="object-contain px-[var(--gutter)] lg:px-24"
          style={{ animation: 'fade-in 250ms var(--ease-out) both' }}
        />
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={labels.previous}
              className={`press absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full md:inline-flex lg:left-6 ${
                dark ? 'bg-canvas/10 hover:bg-canvas/20' : 'bg-stone hover:bg-stone/70'
              }`}
            >
              <Icon name="chevronLeft" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={labels.next}
              className={`press absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full md:inline-flex lg:right-6 ${
                dark ? 'bg-canvas/10 hover:bg-canvas/20' : 'bg-stone hover:bg-stone/70'
              }`}
            >
              <Icon name="chevronRight" />
            </button>
          </>
        ) : null}
      </div>

      <div className="flex min-h-16 shrink-0 items-center justify-center px-[var(--gutter)] py-4 text-center">
        {item.caption ? (
          <p className={`measure text-small ${dark ? 'text-canvas/85' : 'text-muted'}`}>
            {item.caption}
          </p>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

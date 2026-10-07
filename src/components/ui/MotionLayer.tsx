'use client'

// Site-wide motion, mounted once in the layout. Renders nothing; it adds two quiet effects:
//
// 1. Scroll reveal. Content inside each <section> of <main> (and any [data-stagger] list) rises into
//    place with a slight 3D lift the first time it scrolls into view. Pieces that enter together are
//    staggered a little, photos settle from a touch larger, and span lines ([data-span-line]) draw
//    across instead of rising. Only content that starts below the fold is held back, and only once
//    this script runs, so nothing is stuck hidden without JavaScript and nothing on screen flickers.
//    Runs on the Web Animations API, so it never changes the DOM attributes React hydrates.
// 2. Card tilt. Elements with [data-tilt] lean a few degrees towards a mouse pointer, with a soft
//    highlight. Mouse and trackpad only: phones and tablets keep the plain press feedback.
//
// The Home hero, blocks that run their own Reveal, and visitors who prefer reduced motion are left
// alone. Tilt CSS lives in globals.css ("Motion layer").
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Most pieces a block is split into before it is treated as one piece. */
const MAX_PIECES = 12
/** Delay between pieces that enter together, and the most any piece waits. */
const STAGGER_MS = 80
const MAX_DELAY_MS = 400
const EASE_OUT = 'cubic-bezier(0.22, 1, 0.36, 1)'

const SKIP = '[aria-roledescription="carousel"], [data-reveal], [data-no-motion]'

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isLayoutRow(el: Element): boolean {
  const style = getComputedStyle(el)
  if (style.overflowX === 'auto' || style.overflowX === 'scroll') return false
  return /^(grid|flex)$/.test(style.display) && el.children.length >= 2
}

/** Splits a block into the pieces that reveal one after another. */
function pieces(block: Element): Element[] {
  let el = block
  // Step through single-child wrappers (Container, spacing divs).
  for (let i = 0; i < 2 && el.children.length === 1; i++) el = el.children[0]
  if (el.children.length > MAX_PIECES) return [block]
  return Array.from(el.children).flatMap((child) => {
    let row = child
    for (let i = 0; i < 2 && row.children.length === 1; i++) row = row.children[0]
    return isLayoutRow(row) && row.children.length <= MAX_PIECES
      ? Array.from(row.children)
      : [child]
  })
}

/** Start and end frames for a piece. Phones get a shorter, flatter rise. */
function framesFor(el: Element): Keyframe[] {
  if (el.hasAttribute('data-span-line')) {
    return [
      { transform: 'scaleX(0)', transformOrigin: 'left center' },
      { transform: 'scaleX(1)', transformOrigin: 'left center' },
    ]
  }
  const phone = window.matchMedia('(max-width: 767px)').matches
  const from = phone
    ? 'perspective(900px) translate3d(0, 18px, 0) rotateX(4deg)'
    : 'perspective(1200px) translate3d(0, 28px, 0) rotateX(6deg)'
  return [
    { opacity: 0, transform: from, transformOrigin: '50% 100%' },
    { opacity: 1, transform: 'none', transformOrigin: '50% 100%' },
  ]
}

/** Photos that fill a clipped frame inside the piece. */
function photosIn(el: Element): Element[] {
  return Array.from(el.querySelectorAll('.overflow-hidden > img'))
}

function setupReveal(main: HTMLElement) {
  const seen = new WeakSet<Element>()
  // Pieces waiting below the fold, each held at its first frame.
  const held = new Map<Element, Animation[]>()

  const hold = (el: Element) => {
    const frames = framesFor(el)
    const still = { duration: 1, fill: 'forwards' as const }
    held.set(el, [
      el.animate([frames[0], frames[0]], still),
      ...photosIn(el).map((img) => img.animate([{ scale: 1.06 }, { scale: 1.06 }], still)),
    ])
  }

  const reveal = (el: Element, delay: number) => {
    held.get(el)?.forEach((a) => a.cancel())
    held.delete(el)
    const phone = window.matchMedia('(max-width: 767px)').matches
    const line = el.hasAttribute('data-span-line')
    el.animate(framesFor(el), {
      duration: line ? 900 : phone ? 750 : 900,
      delay,
      easing: EASE_OUT,
      fill: 'backwards',
    })
    photosIn(el).forEach((img) =>
      img.animate([{ scale: 1.06 }, { scale: 1 }], {
        duration: 1200,
        delay,
        easing: EASE_OUT,
        fill: 'backwards',
      }),
    )
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        )
        .forEach((entry, i) => {
          observer.unobserve(entry.target)
          reveal(entry.target, Math.min(i * STAGGER_MS, MAX_DELAY_MS))
        })
    },
    { rootMargin: '0px 0px -8% 0px' },
  )

  const scan = () => {
    const fold = window.innerHeight
    const blocks = [...main.querySelectorAll('section, [data-stagger]')].filter(
      (el) => !el.closest(SKIP),
    )

    for (const block of blocks) {
      if (seen.has(block)) continue
      seen.add(block)
      // A section nested inside a piece that is already handled moves with that piece.
      let parent = block.parentElement
      let inside = false
      while (parent && parent !== main) {
        if (seen.has(parent)) inside = true
        parent = parent.parentElement
      }
      if (inside) continue

      const list = block.hasAttribute('data-stagger') ? Array.from(block.children) : pieces(block)
      for (const piece of list) {
        seen.add(piece)
        const rect = piece.getBoundingClientRect()
        // Already on screen, above it, or not displayed: leave it as it is.
        if (rect.height === 0 || rect.top < fold) continue
        hold(piece)
        observer.observe(piece)
      }
    }
  }

  scan()
  // Content that mounts later (tabs, read more, client lists) gets the same treatment.
  let frame = 0
  const mutations = new MutationObserver(() => {
    if (!frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        scan()
      })
  })
  mutations.observe(main, { childList: true, subtree: true })

  return () => {
    observer.disconnect()
    mutations.disconnect()
    if (frame) cancelAnimationFrame(frame)
    // Never leave anything hidden behind.
    held.forEach((animations) => animations.forEach((a) => a.cancel()))
    held.clear()
  }
}

function setupTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return () => {}

  let current: HTMLElement | null = null
  let frame = 0
  let last: PointerEvent | null = null

  const reset = (el: HTMLElement) => {
    el.style.removeProperty('--tilt-x')
    el.style.removeProperty('--tilt-y')
    el.style.removeProperty('--glare-x')
    el.style.removeProperty('--glare-y')
  }

  const apply = () => {
    frame = 0
    if (!current || !last) return
    const rect = current.getBoundingClientRect()
    const x = Math.min(Math.max((last.clientX - rect.left) / rect.width, 0), 1)
    const y = Math.min(Math.max((last.clientY - rect.top) / rect.height, 0), 1)
    // -1 to 1 from the centre; the card leans towards the pointer.
    current.style.setProperty('--tilt-x', ((x - 0.5) * 2).toFixed(3))
    current.style.setProperty('--tilt-y', ((y - 0.5) * 2).toFixed(3))
    current.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`)
    current.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`)
  }

  const onMove = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') return
    const target = (event.target as Element | null)?.closest<HTMLElement>('[data-tilt]') ?? null
    if (current && current !== target) reset(current)
    current = target
    last = event
    if (current && !frame) frame = requestAnimationFrame(apply)
  }
  const onLeave = () => {
    if (current) reset(current)
    current = null
  }

  document.addEventListener('pointermove', onMove, { passive: true })
  document.documentElement.addEventListener('pointerleave', onLeave)
  return () => {
    document.removeEventListener('pointermove', onMove)
    document.documentElement.removeEventListener('pointerleave', onLeave)
    if (frame) cancelAnimationFrame(frame)
    if (current) reset(current)
  }
}

export function MotionLayer() {
  const pathname = usePathname()

  useEffect(() => {
    if (reducedMotion()) return
    const main = document.getElementById('main')
    if (!main) return
    let cleanup = () => {}
    // Wait a frame so the new page is laid out and scrolled to the top before measuring.
    const frame = requestAnimationFrame(() => {
      cleanup = setupReveal(main)
    })
    return () => {
      cancelAnimationFrame(frame)
      cleanup()
    }
  }, [pathname])

  useEffect(() => {
    if (reducedMotion()) return
    return setupTilt()
  }, [])

  return null
}

'use client'

// Home hero (spec §4 Home, §5), in the client-chosen inset style: a full-height rounded panel with a
// thin canvas margin, the floating header inside it, a large centred uppercase headline with subhead
// and actions, and a bottom bar with the span line, slider lines and project caption.
// The first photo is preloaded.
//
// Slideshow: each photo slides in from the right every `intervalMs`. Line indicators at the bottom
// fill up over the interval and jump to a photo when pressed. Autoplay keeps running under the mouse;
// it pauses only for the pause button, keyboard focus inside the hero, or a hidden tab, and never runs
// when the visitor prefers reduced motion.
import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import {
  useCallback,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from 'react'

import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'
import { SpanLine } from '@/components/ui/SpanLine'
import type { Dictionary } from '@/lib/i18n'

export type HeroSlide = {
  image: StaticImageData
  alt: string
  /** CSS object-position, to keep the building in frame when the photo is cropped. */
  position?: string
  /** Shown in the bottom-right corner while this photo is on screen. */
  projectName?: string
  location?: string
  /** Project detail page, so the name links to it. */
  href?: string
}

type HeroProps = {
  slides: HeroSlide[]
  headline: string
  subhead: string
  actions: ReactNode
  labels: Dictionary['hero']
  intervalMs?: number
}

const SWIPE_THRESHOLD = 50

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}
const getReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function subscribeVisibility(onChange: () => void) {
  document.addEventListener('visibilitychange', onChange)
  return () => document.removeEventListener('visibilitychange', onChange)
}
const getHidden = () => document.hidden

export function Hero({ slides, headline, subhead, actions, labels, intervalMs = 5000 }: HeroProps) {
  const [active, setActive] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [userPaused, setUserPaused] = useState(false)
  const [focused, setFocused] = useState(false)
  const pointerStartX = useRef<number | null>(null)

  // Server render assumes motion is allowed and the tab is visible.
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false)

  const count = slides.length
  const autoplay = count > 1 && !reducedMotion
  const running = autoplay && !userPaused && !focused && !hidden

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % count) + count) % count
      if (next === active) return
      setPrevious(active)
      setActive(next)
    },
    [active, count],
  )

  const current = slides[active]?.projectName ? slides[active] : null

  const slideLabel = (n: number) =>
    labels.slide.replace('{n}', String(n)).replace('{total}', String(count))

  return (
    // Inset frame: the hero is a rounded panel with a thin canvas margin around it.
    <div className="bg-canvas p-[var(--hero-inset)] pt-[calc(env(safe-area-inset-top)+var(--hero-inset))]">
      <section
        aria-roledescription="carousel"
        aria-label={labels.carousel}
        className="relative isolate flex h-[calc(100svh-2*var(--hero-inset)-env(safe-area-inset-top))] max-h-[1100px] min-h-[640px] w-full touch-pan-y flex-col overflow-hidden rounded-[var(--hero-radius)] bg-ink text-canvas"
        // Pause for keyboard focus only (people tabbing through need time to read); mouse clicks don't count.
        onFocus={(e) => {
          if (e.target.matches(':focus-visible')) setFocused(true)
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false)
        }}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') pointerStartX.current = e.clientX
        }}
        onPointerUp={(e) => {
          if (pointerStartX.current === null) return
          const dx = e.clientX - pointerStartX.current
          pointerStartX.current = null
          if (dx <= -SWIPE_THRESHOLD) goTo(active + 1)
          else if (dx >= SWIPE_THRESHOLD) goTo(active - 1)
        }}
        onPointerCancel={() => {
          pointerStartX.current = null
        }}
      >
        {/* Slides. The active photo sits at 0, the outgoing one slides left, the rest wait off to the right. */}
        <div className="hero-drift absolute inset-0 -z-20" aria-live={running ? 'off' : 'polite'}>
          {slides.map((slide, i) => {
            const isActive = i === active
            const isPrevious = i === previous
            return (
              <div
                key={slide.image.src}
                role="group"
                aria-roledescription="slide"
                aria-label={slideLabel(i + 1)}
                aria-hidden={!isActive}
                className={`absolute inset-0 ${
                  isActive || isPrevious
                    ? 'transition-transform duration-[900ms] ease-[var(--ease-out)]'
                    : ''
                }`}
                style={{
                  transform: isActive
                    ? 'translateX(0)'
                    : isPrevious
                      ? 'translateX(-100%)'
                      : 'translateX(100%)',
                }}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  preload={i === 0}
                  loading={i === 0 ? undefined : 'eager'}
                  fetchPriority={i === 0 ? undefined : 'low'}
                  draggable={false}
                  className="hero-settle object-cover select-none"
                  style={{ objectPosition: slide.position ?? 'center' }}
                />
              </div>
            )
          })}
        </div>

        {/* Scrims: an even dim over the whole photo for the centred headline, deeper at the bottom
          for the slider and project caption. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/45" />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-ink/75 to-transparent"
        />

        {/* Centred headline block, clear of the floating header. */}
        <div className="hero-lift flex flex-1 flex-col items-center justify-center px-[var(--gutter)] pt-[calc(var(--header-height)+2.5rem)] pb-8 text-center">
          <h1 className="rise-in max-w-[15ch] text-[clamp(2.5rem,1.2rem+6.2vw,6.75rem)] leading-[calc(0.95+var(--leading-boost))] font-extrabold tracking-[calc(-0.035em*var(--tracking-scale))] uppercase">
            {headline}
          </h1>
          <p
            className="rise-in mt-6 max-w-[36rem] text-body-lg text-canvas/85"
            style={{ '--rise-delay': '150ms' } as CSSProperties}
          >
            {subhead}
          </p>
          <div
            className="rise-in mt-10 flex flex-col items-center gap-x-6 gap-y-4 sm:flex-row"
            style={{ '--rise-delay': '300ms' } as CSSProperties}
          >
            {actions}
          </div>
        </div>

        <Container className="pb-5 lg:pb-7">
          <SpanLine draw delayMs={500} />

          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 lg:mt-6">
            {count > 1 ? (
              <div className="flex items-center gap-2">
                <ul className="flex items-center gap-2">
                  {slides.map((slide, i) => {
                    const isActive = i === active
                    return (
                      <li key={slide.image.src}>
                        <button
                          type="button"
                          aria-label={slideLabel(i + 1)}
                          aria-current={isActive ? 'true' : undefined}
                          className="group flex h-11 w-10 items-center sm:w-12"
                          onClick={() => goTo(i)}
                        >
                          <span className="relative block h-0.5 w-full overflow-hidden bg-canvas/35 transition-colors group-hover:bg-canvas/60">
                            {isActive ? (
                              <span
                                // Re-mount on every change so the fill restarts from empty.
                                key={`${active}-${autoplay}`}
                                className="absolute inset-0 origin-left bg-canvas"
                                style={
                                  autoplay
                                    ? {
                                        animation: `span-draw ${intervalMs}ms linear both`,
                                        animationPlayState: running ? 'running' : 'paused',
                                      }
                                    : undefined
                                }
                                onAnimationEnd={autoplay ? () => goTo(active + 1) : undefined}
                              />
                            ) : null}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>

                {autoplay ? (
                  <button
                    type="button"
                    className="press ml-1 inline-flex size-11 items-center justify-center rounded-control"
                    aria-label={userPaused ? labels.play : labels.pause}
                    onClick={() => setUserPaused((p) => !p)}
                  >
                    <Icon name={userPaused ? 'play' : 'pause'} size={20} />
                  </button>
                ) : null}
              </div>
            ) : null}

            {/* Project name and location for the photo on screen. Fades in on each change. */}
            {current ? (
              <p
                key={active}
                className="ml-auto flex flex-col items-end text-right text-small"
                style={{ animation: 'fade-in 600ms var(--ease-out) both' }}
              >
                {current.href ? (
                  <Link
                    href={current.href}
                    className="font-semibold text-canvas underline-offset-4 hover:underline hover:decoration-amber hover:decoration-2"
                  >
                    {current.projectName}
                  </Link>
                ) : (
                  <span className="font-semibold text-canvas">{current.projectName}</span>
                )}
                <span className="mt-0.5 inline-flex items-center gap-1 text-canvas/85">
                  <Icon name="pin" size={16} />
                  {current.location}
                </span>
              </p>
            ) : null}
          </div>
        </Container>
      </section>
    </div>
  )
}

'use client'

// The interactive body of "How we build". Left: a project-planning illustration (a drawn site plan on a
// blueprint grid, an "Engineer approved" badge, and a "Project plan" checklist card that lists the
// pillars). Right: the pillars as a vertical list joined by a line.
// The steps run on their own: every STEP_MS the next pillar becomes active (line, icon tile, checklist
// row and progress bar), then the finished checklist holds for one beat and the cycle restarts.
// It runs only while the section is on screen and the tab is visible. With reduced motion it shows
// the finished checklist, still. The illustration is decorative; all pillar text is always visible.
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { Icon } from '@/components/ui/Icon'
import type { Dictionary } from '@/lib/i18n'
import type { QualityPillarData } from '@/lib/placeholder-home'

type QualityStepsProps = {
  pillars: QualityPillarData[]
  labels: Dictionary['quality']
}

const STEP_MS = 1500

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

export function QualitySteps({ pillars, labels }: QualityStepsProps) {
  const count = pillars.length
  // 0..count-1: that pillar is active. count: all done, held for one beat before restarting.
  const [tick, setTick] = useState(0)
  const [inView, setInView] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false)
  const hidden = useSyncExternalStore(subscribeVisibility, getHidden, () => false)
  const running = !reducedMotion && inView && !hidden && count > 1

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!running) return
    const id = window.setInterval(() => setTick((t) => (t >= count ? 0 : t + 1)), STEP_MS)
    return () => window.clearInterval(id)
  }, [running, count])

  // Reduced motion: show the finished checklist.
  const effectiveTick = reducedMotion ? count : tick
  const done = effectiveTick >= count
  const active = Math.min(effectiveTick, count - 1)
  const checked = done ? count : active + 1

  return (
    <div ref={rootRef} className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-6">
      {/* Illustration */}
      <div aria-hidden="true" className="relative lg:col-span-6">
        {/* Soft amber glow behind the composition */}
        <div className="absolute top-1/2 left-1/2 -z-10 size-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-tint blur-3xl" />

        <div className="relative pr-[12%] pb-[58%] sm:pb-[22%]">
          {/* Site plan on a blueprint grid */}
          <div className="relative overflow-hidden rounded-card border border-stone bg-surface shadow-card">
            <div className="flex items-center justify-between border-b border-stone px-5 py-3">
              <span className="text-small font-semibold">{labels.sitePlan}</span>
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-stone" />
                <span className="size-2.5 rounded-full bg-stone" />
                <span className="size-2.5 rounded-full bg-amber" />
              </span>
            </div>
            <div
              className="relative aspect-[4/3]"
              style={{
                backgroundImage:
                  'linear-gradient(var(--stone) 1px, transparent 1px), linear-gradient(90deg, var(--stone) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                backgroundColor: 'var(--canvas)',
              }}
            >
              <SitePlanDrawing />
            </div>
          </div>

          {/* "Engineer approved" badge with a small curved arrow towards the checklist */}
          <div className="absolute top-14 right-0 flex flex-col items-end gap-1 sm:top-[42%]">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-small font-semibold whitespace-nowrap text-canvas shadow-card">
              <Icon name="check" size={16} className="text-amber" />
              {labels.approved}
            </span>
            <svg
              width="40"
              height="34"
              viewBox="0 0 40 34"
              fill="none"
              className="mr-6 hidden text-ink sm:block"
            >
              <path
                d="M30 2c6 8 4 20-10 26"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M24 22l-5 6.5 8 1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Project plan checklist card */}
          <div className="absolute right-0 bottom-0 w-[78%] rounded-[16px] border border-stone bg-surface p-4 shadow-card-hover sm:w-[64%] lg:p-5">
            <div className="flex items-center justify-between">
              <span className="text-small font-semibold">{labels.planTitle}</span>
              <span className="text-small text-muted tabular">
                {checked}/{count}
              </span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stone">
              <div
                className="h-full rounded-full bg-amber transition-[width] duration-500 ease-[var(--ease-out)]"
                style={{ width: `${(checked / count) * 100}%` }}
              />
            </div>
            <ul className="mt-3 flex flex-col gap-1">
              {pillars.map((pillar, i) => (
                <li
                  key={pillar.title}
                  className={`flex items-center gap-3 rounded-[10px] px-2.5 py-2 transition-colors duration-300 ${
                    i === active && !done ? 'bg-amber-tint' : ''
                  }`}
                >
                  <span
                    className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      i < checked ? 'bg-ink text-canvas' : 'border border-stone text-transparent'
                    }`}
                  >
                    <Icon name="check" size={14} />
                  </span>
                  <span className="min-w-0 flex-1 text-small leading-snug font-medium">
                    {pillar.title}
                  </span>
                  <span
                    className={`text-small transition-opacity duration-300 ${
                      i < checked ? 'text-muted opacity-100' : 'opacity-0'
                    }`}
                  >
                    {labels.planDone}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <ul className="flex flex-col lg:col-span-5 lg:col-start-8">
        {pillars.map((pillar, i) => {
          // On the "all done" beat every pillar reads as complete, none singled out.
          const isActive = i === active && !done
          return (
            <li key={pillar.title} className="relative flex gap-5 py-6 pl-6 lg:pl-8">
              {/* Line: stone track, ink on the active pillar */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-0.5 transition-colors duration-300 ${
                  isActive ? 'bg-ink' : 'bg-stone'
                }`}
              />
              <span
                className={`inline-flex size-12 shrink-0 items-center justify-center rounded-[12px] transition-colors duration-300 ${
                  isActive ? 'bg-amber text-ink' : 'bg-amber-tint text-ink'
                }`}
              >
                <Icon name={pillar.icon} />
              </span>
              <div>
                <h3 className="text-h3">{pillar.title}</h3>
                <p className="measure mt-2 text-body text-muted">{pillar.proof}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Site plan drawing: plot boundary, building footprint with its structural column grid, a dimension
 *  line, the road, trees and a north arrow. Ink lines on the blueprint grid, amber for the footprint. */
function SitePlanDrawing() {
  const columns = [0, 1, 2, 3].flatMap((x) => [0, 1, 2].map((y) => [130 + x * 50, 70 + y * 50]))
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" fill="none">
      {/* Road */}
      <rect x="0" y="262" width="400" height="38" fill="var(--stone)" />
      <path d="M0 281h400" stroke="var(--surface)" strokeWidth="2" strokeDasharray="14 10" />
      {/* Plot boundary */}
      <rect
        x="80"
        y="30"
        width="250"
        height="215"
        stroke="var(--ink)"
        strokeWidth="1.5"
        strokeDasharray="6 5"
      />
      {/* Building footprint */}
      <rect
        x="115"
        y="55"
        width="180"
        height="130"
        fill="var(--amber-tint)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      {/* Structural grid and columns */}
      <g stroke="var(--muted)" strokeWidth="0.75" strokeDasharray="3 3">
        {[130, 180, 230, 280].map((x) => (
          <path key={x} d={`M${x} 55v130`} />
        ))}
        {[70, 120, 170].map((y) => (
          <path key={y} d={`M115 ${y}h180`} />
        ))}
      </g>
      {columns.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" fill="var(--ink)" />
      ))}
      {/* Entrance and driveway */}
      <path d="M190 185v18M220 185v18" stroke="var(--ink)" strokeWidth="1.5" />
      <path d="M190 203h30v59h-30z" fill="var(--surface)" stroke="var(--muted)" strokeWidth="1" />
      {/* Dimension line */}
      <g stroke="var(--ink)" strokeWidth="1">
        <path d="M115 210h180M115 205v10M295 205v10" />
      </g>
      <rect x="183" y="202" width="44" height="16" rx="3" fill="var(--canvas)" />
      <text
        x="205"
        y="214"
        textAnchor="middle"
        fontSize="10"
        fontWeight="600"
        fill="var(--ink)"
        fontFamily="var(--font-sans)"
      >
        18 m
      </text>
      {/* Trees */}
      {[
        [100, 60],
        [97, 215],
        [312, 70],
        [315, 215],
      ].map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r="11" fill="var(--surface)" stroke="var(--muted)" />
          <circle cx={cx} cy={cy} r="2" fill="var(--muted)" />
        </g>
      ))}
      {/* North arrow */}
      <g transform="translate(362 52)">
        <circle r="16" fill="var(--surface)" stroke="var(--stone)" />
        <path d="M0 -10l6 14-6-4-6 4z" fill="var(--ink)" />
        <text
          y="-20"
          textAnchor="middle"
          fontSize="10"
          fontWeight="700"
          fill="var(--ink)"
          fontFamily="var(--font-sans)"
        >
          N
        </text>
      </g>
    </svg>
  )
}

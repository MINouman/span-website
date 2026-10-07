'use client'

// Filter tabs (Projects status, Gallery category). ARIA tabs pattern: arrow keys move between tabs.
// Selected tab: ink pill with canvas text. Others: quiet text with a count.
import { useRef, type KeyboardEvent } from 'react'

type Tab<T extends string> = { id: T; label: string; count?: number }

type TabsProps<T extends string> = {
  label: string
  tabs: Tab<T>[]
  value: T
  onChange: (id: T) => void
  /** id of the element the tabs control. */
  panelId: string
}

export function Tabs<T extends string>({ label, tabs, value, onChange, panelId }: TabsProps<T>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const last = tabs.length - 1
    const next =
      event.key === 'ArrowRight'
        ? index === last
          ? 0
          : index + 1
        : event.key === 'ArrowLeft'
          ? index === 0
            ? last
            : index - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    onChange(tabs[next].id)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label={label}
      className="-mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
    >
      {tabs.map((tab, i) => {
        const selected = tab.id === value
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={panelId}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`press inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-small font-semibold transition-colors ${
              selected
                ? 'bg-ink text-canvas'
                : 'border border-stone bg-surface text-ink hover:border-ink'
            }`}
          >
            {tab.label}
            {tab.count !== undefined ? (
              <span className={`tabular ${selected ? 'text-canvas/70' : 'text-muted'}`}>
                {tab.count}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

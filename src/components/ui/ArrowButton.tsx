// Client-chosen call to action: white button with an amber arrow box. On hover or keyboard focus the
// amber box grows to fill the button, stopping 2px short so the white button shows as a thin border.
// Text stays ink on amber. `onLight` adds a border and soft shadow so it stands off the canvas.
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Icon } from '@/components/ui/Icon'

type ArrowButtonProps = {
  href: string
  children: ReactNode
  onLight?: boolean
  className?: string
}

export function ArrowButton({ href, children, onLight = false, className = '' }: ArrowButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative isolate inline-flex h-14 items-center gap-4 overflow-hidden rounded-[14px] bg-surface pr-2 pl-6 text-body font-semibold text-ink transition-[translate,scale,box-shadow] duration-200 hover:-translate-y-px active:scale-[0.98] ${
        onLight ? 'border border-stone shadow-card' : ''
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute top-2 right-2 bottom-2 -z-10 w-10 rounded-[10px] bg-amber transition-all duration-300 ease-[var(--ease-out)] group-hover:top-0.5 group-hover:right-0.5 group-hover:bottom-0.5 group-hover:w-[calc(100%-4px)] group-hover:rounded-[12px] group-focus-visible:top-0.5 group-focus-visible:right-0.5 group-focus-visible:bottom-0.5 group-focus-visible:w-[calc(100%-4px)] group-focus-visible:rounded-[12px]"
      />
      {children}
      <span className="inline-flex size-10 items-center justify-center">
        <Icon name="arrowRight" size={20} />
      </span>
    </Link>
  )
}

'use client'

// Reveals its `.reveal-item` children one after another when the block first scrolls into view.
// Each item sets its order with style={{ '--reveal-index': n }}. Runs once; CSS lives in globals.css.
import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section'
  id?: string
  'aria-labelledby'?: string
}

export function Reveal({ children, className = '', as: Tag = 'div', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      // Start when the top fifth of the block is in view.
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      data-revealed={revealed ? '' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

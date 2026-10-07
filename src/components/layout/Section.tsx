// Content section: static span line above the H2 (spec §1), optional lead, then content.
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { SpanLine } from '@/components/ui/SpanLine'

type SectionProps = {
  id?: string
  title: string
  lead?: ReactNode
  /** Right side of the heading row, e.g. a "View all" link. */
  aside?: ReactNode
  children: ReactNode
  className?: string
}

export function Section({ id, title, lead, aside, children, className = '' }: SectionProps) {
  const headingId = id ? `${id}-title` : undefined
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-[var(--nav-clearance)] section-y ${className}`}
    >
      <Container>
        <SpanLine />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:mt-8">
          <div>
            <h2 id={headingId} className="text-h2">
              {title}
            </h2>
            {lead ? <p className="measure mt-3 text-body text-muted">{lead}</p> : null}
          </div>
          {aside}
        </div>
        <div className="mt-6 lg:mt-10">{children}</div>
      </Container>
    </section>
  )
}

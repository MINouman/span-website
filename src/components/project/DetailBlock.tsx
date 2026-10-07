// Compact block for the project page's main column: hairline above, small heading, tight spacing.
import type { ReactNode } from 'react'

type DetailBlockProps = {
  id?: string
  title: string
  lead?: ReactNode
  children: ReactNode
}

export function DetailBlock({ id, title, lead, children }: DetailBlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-title` : undefined}
      className="scroll-mt-[var(--nav-clearance)] border-t border-stone pt-8 lg:pt-10"
    >
      <h2 id={id ? `${id}-title` : undefined} className="text-h3">
        {title}
      </h2>
      {lead ? <p className="measure mt-1.5 text-small text-muted">{lead}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  )
}

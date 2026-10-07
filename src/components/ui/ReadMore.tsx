'use client'

// Shows the first paragraph and reveals the rest on "Show more". All text is in the page from the start.
import { useId, useState } from 'react'

import { Icon } from '@/components/ui/Icon'

type ReadMoreProps = {
  paragraphs: string[]
  moreLabel: string
  lessLabel: string
}

export function ReadMore({ paragraphs, moreLabel, lessLabel }: ReadMoreProps) {
  const [open, setOpen] = useState(false)
  const id = useId()
  const [first, ...rest] = paragraphs
  if (!first) return null

  return (
    <div>
      <p className="measure text-body text-muted">{first}</p>
      {rest.length > 0 ? (
        <>
          <div id={id} hidden={!open} className="mt-3 flex flex-col gap-3">
            {rest.map((para, i) => (
              <p key={i} className="measure text-body text-muted">
                {para}
              </p>
            ))}
          </div>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((o) => !o)}
            className="group mt-3 inline-flex min-h-11 items-center gap-1.5 text-small font-semibold"
          >
            <span className="link-underline">{open ? lessLabel : moreLabel}</span>
            <Icon
              name="chevronRight"
              size={16}
              className={`transition-transform duration-200 ${open ? '-rotate-90' : 'rotate-90'}`}
            />
          </button>
        </>
      ) : null}
    </div>
  )
}

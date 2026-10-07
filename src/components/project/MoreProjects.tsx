'use client'

// "More projects" (reference: "Currently listed by this agent"): a sideways-scrolling row of project
// cards with previous/next arrow buttons. Cards are rendered on the server and passed in.
import { useRef, type ReactNode } from 'react'

import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'

type MoreProjectsProps = {
  title: string
  previousLabel: string
  nextLabel: string
  cards: { key: string; card: ReactNode }[]
}

const arrow =
  'press inline-flex size-10 items-center justify-center rounded-full border border-stone bg-surface hover:border-ink'

export function MoreProjects({ title, previousLabel, nextLabel, cards }: MoreProjectsProps) {
  const rowRef = useRef<HTMLUListElement>(null)
  if (cards.length === 0) return null

  const scroll = (direction: 1 | -1) => {
    const row = rowRef.current
    if (!row) return
    const card = row.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 16 : row.clientWidth * 0.8
    row.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <section aria-labelledby="more-projects-title" className="py-12 lg:py-16">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <h2 id="more-projects-title" className="text-h3">
            {title}
          </h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label={previousLabel}
              className={arrow}
            >
              <Icon name="arrowLeft" size={18} />
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label={nextLabel}
              className={arrow}
            >
              <Icon name="arrowRight" size={18} />
            </button>
          </div>
        </div>
        <ul
          ref={rowRef}
          className="-mx-[var(--gutter)] mt-5 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-4 overflow-x-auto px-[var(--gutter)] py-3 [scrollbar-width:none]"
        >
          {cards.map(({ key, card }) => (
            <li
              key={key}
              className="w-[85%] max-w-[380px] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
            >
              {card}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

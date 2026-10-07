// FAQ accordion built on native <details>/<summary>: keyboard and screen-reader support without
// JavaScript. The chevron turns on open; the answer fades in (instant with reduced motion).
import { Icon } from '@/components/ui/Icon'

type AccordionItem = { question: string; answer: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="border-t border-stone">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-stone">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-h3 [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-stone transition-transform duration-200 group-open:rotate-90">
              <Icon name="chevronRight" size={20} />
            </span>
          </summary>
          <p
            className="measure pb-6 text-body text-muted"
            style={{ animation: 'fade-in 250ms var(--ease-out) both' }}
          >
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}

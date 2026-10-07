'use client'

// "Questions landowners ask" (For landowners page), in the client-chosen layout: a label pill,
// heading and intro, then the questions as numbered cards on the left; a browser-window card on the
// right shows the selected question and answer, with a chat card on top (the question as the
// visitor's message, the answer as SPAN's reply). Built as vertical tabs: click or arrow keys to
// switch. On phones the answer card sits right under the questions, then the call to action.
import { useId, useRef, useState, type KeyboardEvent } from 'react'

import { Container } from '@/components/layout/Container'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Icon } from '@/components/ui/Icon'
import { SpanLine } from '@/components/ui/SpanLine'
import type { Dictionary } from '@/lib/i18n'
import type { Faq } from '@/lib/placeholder-pages'

type FaqShowcaseProps = {
  faqs: Faq[]
  labels: Dictionary['landownerPage']
  /** Where the call to action and "Ask anything" lead, e.g. "#enquire". */
  askHref: string
}

export function FaqShowcase({ faqs, labels, askHref }: FaqShowcaseProps) {
  const [active, setActive] = useState(0)
  const uid = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  if (faqs.length === 0) return null
  const current = faqs[active]

  const onKeyDown = (event: KeyboardEvent, i: number) => {
    const last = faqs.length - 1
    const next =
      event.key === 'ArrowDown' || event.key === 'ArrowRight'
        ? i === last
          ? 0
          : i + 1
        : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
          ? i === 0
            ? last
            : i - 1
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-[var(--nav-clearance)] py-16 lg:py-24"
    >
      <Container>
        <SpanLine />
        <div className="mt-10 grid grid-cols-1 items-start gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {/* Questions */}
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-stone bg-surface py-1.5 pr-4 pl-1.5 text-small font-semibold">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-amber text-ink">
                <Icon name="help" size={16} />
              </span>
              {labels.faqBadge}
            </span>
            <h2 id="faq-title" className="mt-6 max-w-[16ch] text-h1">
              {labels.faqTitle}
            </h2>
            <p className="measure mt-5 text-body-lg text-muted">{labels.faqLead}</p>
            <p className="mt-8 text-body">{labels.faqPick}</p>

            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label={labels.faqListLabel}
              className="mt-4 flex flex-col gap-3"
            >
              {faqs.map((faq, i) => {
                const selected = i === active
                return (
                  <button
                    key={faq.question}
                    ref={(el) => {
                      tabRefs.current[i] = el
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`press flex w-full items-start gap-4 rounded-[14px] border bg-surface p-4 text-left lg:p-5 ${
                      selected
                        ? 'border-amber shadow-[0_0_0_1px_var(--amber)]'
                        : 'border-stone hover:border-muted/50'
                    }`}
                  >
                    <span
                      className={`inline-flex size-7 shrink-0 items-center justify-center rounded-full text-small font-semibold tabular transition-colors ${
                        selected ? 'bg-amber text-ink' : 'bg-stone text-muted'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`pt-0.5 text-body font-medium ${selected ? 'text-ink' : 'text-ink/80'}`}
                    >
                      {faq.question}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="mt-10 hidden lg:block">
              <ArrowButton href={askHref} onLight>
                {labels.cta}
              </ArrowButton>
            </div>
          </div>

          {/* Answer: browser window with a chat card */}
          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${active}`}
            className="lg:sticky lg:top-[calc(var(--nav-clearance)+1rem)] lg:col-span-6"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-card border border-stone bg-surface shadow-card-hover">
                {/* Browser chrome */}
                <div
                  aria-hidden="true"
                  className="flex items-center gap-3 border-b border-stone bg-canvas px-4 py-3"
                >
                  <span className="flex gap-1.5">
                    <span className="size-2.5 rounded-full border border-stone" />
                    <span className="size-2.5 rounded-full border border-stone" />
                    <span className="size-2.5 rounded-full border border-stone" />
                  </span>
                  <span className="mx-auto max-w-[70%] truncate rounded-full border border-stone bg-surface px-4 py-1 text-[0.6875rem] text-muted">
                    {labels.faqPath}
                  </span>
                  <span className="w-10" />
                </div>
                {/* Answer page */}
                <div
                  key={active}
                  className="p-6 sm:min-h-[24rem] sm:pr-[54%] lg:p-8 lg:pr-[54%]"
                  style={{ animation: 'fade-in 300ms var(--ease-out) both' }}
                >
                  <p className="text-small text-muted">{labels.faqCrumb}</p>
                  <h3 className="mt-2 text-h3">{current.question}</h3>
                  <p className="mt-3 text-body text-muted">{current.answer}</p>
                </div>
              </div>

              {/* Chat card, overlapping the window on larger screens */}
              <div
                aria-hidden="true"
                className="absolute top-[4.25rem] right-4 hidden w-[48%] rounded-[16px] border border-stone bg-surface shadow-card-hover sm:block lg:top-[4.75rem] lg:right-5"
              >
                <div className="flex items-center gap-2 border-b border-stone px-4 py-3">
                  <span className="inline-flex size-6 items-center justify-center rounded-[6px] bg-amber text-[0.6875rem] font-extrabold text-ink">
                    S
                  </span>
                  <span className="text-small font-semibold">SPAN</span>
                </div>
                <div
                  key={active}
                  className="flex flex-col gap-3 p-4"
                  style={{ animation: 'fade-in 300ms var(--ease-out) both' }}
                >
                  <p className="ml-auto max-w-[85%] rounded-[12px] rounded-br-[4px] bg-canvas px-3 py-2 text-small">
                    {current.question}
                  </p>
                  <p className="max-w-[90%] rounded-[12px] rounded-bl-[4px] border border-amber/40 bg-amber-tint px-3 py-2 text-small">
                    {current.answer}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <span className="flex items-center gap-2 rounded-full border border-stone px-4 py-2 text-small text-muted">
                    <Icon name="chat" size={16} />
                    {labels.faqAsk}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={askHref}
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-semibold underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2 sm:hidden"
            >
              <Icon name="chat" size={18} />
              {labels.faqAskOwn}
            </a>
            <div className="mt-8 lg:hidden">
              <ArrowButton href={askHref} onLight>
                {labels.cta}
              </ArrowButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

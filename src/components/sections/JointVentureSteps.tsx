// "How a joint venture works" on the landowner page: four step cards in a row, joined by small
// arrow connectors on desktop. Each card has a step name, title, text, a small decorative
// illustration and a tag chip. The illustrations are aria-hidden; all step text stays in the markup.
import type { ReactNode } from 'react'

import { Icon } from '@/components/ui/Icon'
import type { Dictionary } from '@/lib/i18n'
import type { ProcessStep } from '@/lib/placeholder-home'

type Labels = Dictionary['landownerPage']

type JointVentureStepsProps = {
  steps: ProcessStep[]
  labels: Labels
}

const blueprint = {
  backgroundImage:
    'linear-gradient(var(--stone) 1px, transparent 1px), linear-gradient(90deg, var(--stone) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
}

export function JointVentureSteps({ steps, labels }: JointVentureStepsProps) {
  const art = labels.stepArt
  const illustrations: ReactNode[] = [
    <PlotArt key="plot" plot={art.plot} visit={art.visit} />,
    <AgreementArt key="agreement" title={art.agreement} registered={art.registered} />,
    <BuildArt key="build" update={art.update} />,
    <HandoverArt key="handover" />,
  ]

  return (
    <ol
      aria-label={labels.stepsTitle}
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="relative flex flex-col rounded-card border border-stone bg-surface p-5 lg:p-6"
        >
          <span className="text-small tracking-wide text-muted uppercase">
            {labels.stepNames[i] ?? i + 1}
          </span>
          <h3 className="mt-2 text-h3">{step.title}</h3>
          <p className="mt-2 mb-6 text-small text-muted">{step.text}</p>

          <div
            aria-hidden="true"
            className="relative mt-auto flex h-44 items-center justify-center overflow-hidden rounded-card-inner bg-canvas"
          >
            {illustrations[i]}
          </div>

          {labels.stepTags[i] ? (
            <span className="mt-4 inline-flex h-7 items-center self-start rounded-chip bg-amber-tint px-3 text-small whitespace-nowrap text-amber-text">
              {labels.stepTags[i]}
            </span>
          ) : null}

          {/* Connector to the next card, centred in the gap (desktop row only) */}
          {i < steps.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-[18px] z-10 hidden size-6 -translate-y-1/2 items-center justify-center rounded-full border border-stone bg-surface text-muted lg:inline-flex"
            >
              <Icon name="arrowRight" size={14} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  )
}

/** Step 1: a plot outlined on a blueprint grid with a pin, and a "site visit booked" chip. */
function PlotArt({ plot, visit }: { plot: string; visit: string }) {
  return (
    <div className="absolute inset-0" style={blueprint}>
      <div className="absolute top-1/2 left-1/2 flex h-[52%] w-[58%] -translate-x-1/2 -translate-y-[62%] items-end justify-start rounded-[6px] border-2 border-dashed border-ink/70 bg-amber-tint/80 p-2">
        <span className="text-[11px] font-semibold text-ink">{plot}</span>
      </div>
      <span className="absolute top-[14%] left-1/2 inline-flex size-9 -translate-x-1/2 items-center justify-center rounded-full bg-amber text-ink shadow-card">
        <Icon name="pin" size={18} />
      </span>
      <span className="absolute bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold whitespace-nowrap text-canvas shadow-card">
        <Icon name="check" size={13} className="text-amber" />
        {visit}
      </span>
    </div>
  )
}

/** Step 2: an agreement page with text lines and a signature, stamped "Registered". */
function AgreementArt({ title, registered }: { title: string; registered: string }) {
  return (
    <>
      <div className="absolute top-5 left-1/2 w-[62%] -translate-x-1/2 -rotate-3 rounded-[10px] border border-stone bg-surface p-3 shadow-card">
        <span className="block truncate text-[11px] font-semibold text-ink">{title}</span>
        <span className="mt-2 block h-1.5 w-full rounded-full bg-stone" />
        <span className="mt-1.5 block h-1.5 w-[85%] rounded-full bg-stone" />
        <span className="mt-1.5 block h-1.5 w-[70%] rounded-full bg-stone" />
        <svg viewBox="0 0 80 20" className="mt-2 h-5 w-20 text-ink" fill="none">
          <path
            d="M2 14c6-10 10-10 9-2s5 4 9-3 6 8 11 2 6-6 9 0 8 2 12-3 10 4 16 1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <span className="mt-1 block h-px w-full bg-stone" />
      </div>
      <span className="absolute right-[10%] bottom-4 inline-flex rotate-[-8deg] items-center gap-1.5 rounded-full border-2 border-amber-text bg-surface px-3 py-1 text-[11px] font-bold tracking-wide text-amber-text uppercase shadow-card">
        <Icon name="shieldCheck" size={14} />
        {registered}
      </span>
    </>
  )
}

/** Step 3: a building going up floor by floor, the top floor in progress, with an update card. */
function BuildArt({ update }: { update: string }) {
  const floors = [0, 1, 2, 3]
  return (
    <>
      <div className="absolute bottom-0 left-[16%] flex w-[38%] flex-col-reverse">
        {floors.map((f) => (
          <span
            key={f}
            className="flex h-5 items-center justify-around border-x-2 border-t-2 border-ink bg-surface"
          >
            <span className="h-2 w-2 bg-stone" />
            <span className="h-2 w-2 bg-stone" />
            <span className="h-2 w-2 bg-stone" />
          </span>
        ))}
        {/* Floor in progress */}
        <span className="h-5 border-2 border-b-0 border-dashed border-amber-text bg-amber-tint" />
      </div>
      <span className="absolute bottom-0 left-0 h-1.5 w-full bg-stone" />
      <div className="absolute top-5 right-[8%] w-[46%] rounded-[10px] border border-stone bg-surface p-2.5 shadow-card-hover">
        <span className="flex items-center gap-1.5">
          <span className="size-2 shrink-0 rounded-full bg-amber" />
          <span className="truncate text-[11px] font-semibold text-ink">{update}</span>
        </span>
        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-stone">
          <span className="block h-full w-4/5 rounded-full bg-amber" />
        </span>
        <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-stone" />
      </div>
    </>
  )
}

/** Step 4: a key tile in front of a tilted building tile. */
function HandoverArt() {
  return (
    <div className="relative h-24 w-36">
      <span className="absolute top-2 right-0 inline-flex size-20 rotate-[10deg] items-center justify-center rounded-[18px] border border-stone bg-surface text-muted shadow-card">
        <Icon name="building" size={32} />
      </span>
      <span className="absolute top-0 left-0 inline-flex size-20 -rotate-[6deg] items-center justify-center rounded-[18px] bg-ink text-amber shadow-card-hover">
        <Icon name="key" size={34} />
      </span>
    </div>
  )
}

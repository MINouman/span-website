// Numbered 1–4 steps (spec §3.7). The steps are genuinely sequential, so numbers are allowed here.
// `onDark` for the ink landowner section.
import type { ProcessStep } from '@/lib/placeholder-home'

type ProcessStepsProps = {
  steps: ProcessStep[]
  label: string
  onDark?: boolean
}

export function ProcessSteps({ steps, label, onDark = false }: ProcessStepsProps) {
  return (
    <ol
      aria-label={label}
      className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:gap-y-14"
    >
      {steps.map((step, i) => (
        <li
          key={step.title}
          className={`border-t pt-6 ${onDark ? 'border-canvas/20' : 'border-stone'}`}
        >
          <span
            aria-hidden="true"
            className={`block text-h2 tabular ${onDark ? 'text-amber' : 'text-amber-text'}`}
          >
            {i + 1}
          </span>
          <h3 className="mt-3 text-h3">{step.title}</h3>
          <p className={`measure mt-2 text-body ${onDark ? 'text-canvas/75' : 'text-muted'}`}>
            {step.text}
          </p>
        </li>
      ))}
    </ol>
  )
}

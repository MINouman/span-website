// Home section 4 (spec §4): dark ink section for landowners. Short pitch and actions on the left,
// the four joint-venture steps on the right, a button to the landowner page.
import { Container } from '@/components/layout/Container'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SpanLine } from '@/components/ui/SpanLine'
import { telHref } from '@/lib/contact-links'
import type { Dictionary } from '@/lib/i18n'
import type { ProcessStep } from '@/lib/placeholder-home'

type LandownerPitchProps = {
  steps: ProcessStep[]
  labels: Dictionary['landowner']
  landownerHref: string
  phone: string
  phoneDisplay: string
  /** Another dark section follows directly: use a short bottom padding so the two read as one band. */
  continues?: boolean
}

export function LandownerPitch({
  steps,
  labels,
  landownerHref,
  phone,
  phoneDisplay,
  continues = false,
}: LandownerPitchProps) {
  return (
    <section
      aria-labelledby="landowner-title"
      className={`bg-deco-dark bg-ink text-canvas ${continues ? 'pt-9 pb-9 md:pt-12 md:pb-10 xl:pt-14 xl:pb-12' : 'section-y'}`}
    >
      <Container>
        <SpanLine />
        <div className="mt-8 grid grid-cols-1 gap-14 lg:mt-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 id="landowner-title" className="text-h2">
              {labels.title}
            </h2>
            <p className="measure mt-5 text-body-lg text-canvas/80">{labels.pitch}</p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Button href={landownerHref}>{labels.cta}</Button>
              <a
                href={telHref(phone)}
                className="inline-flex min-h-11 items-center gap-2 text-body text-canvas/80 hover:text-canvas"
              >
                <Icon name="phone" size={18} />
                {labels.call}{' '}
                <span className="font-semibold text-canvas tabular underline decoration-1 underline-offset-4">
                  {phoneDisplay}
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <ProcessSteps steps={steps} label={labels.stepsLabel} onDark />
          </div>
        </div>
      </Container>
    </section>
  )
}

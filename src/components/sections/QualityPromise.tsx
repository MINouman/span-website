// "How we build" (Home section, also on About), in the client-chosen layout: a centred heading with a
// small label and lead, then a project-planning illustration on the left and the four quality pillars
// as a vertical list on the right (QualitySteps).
import { Container } from '@/components/layout/Container'
import { QualitySteps } from '@/components/sections/QualitySteps'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { SpanLine } from '@/components/ui/SpanLine'
import type { Dictionary } from '@/lib/i18n'
import type { QualityPillarData } from '@/lib/placeholder-home'

type QualityPromiseProps = {
  pillars: QualityPillarData[]
  labels: Dictionary['quality']
  /** Link to the About page. Omit on the About page itself. */
  aboutHref?: string
}

export function QualityPromise({ pillars, labels, aboutHref }: QualityPromiseProps) {
  if (pillars.length === 0) return null

  return (
    <section aria-labelledby="quality-title" className="section-y overflow-hidden">
      <Container>
        <SpanLine />
        <div className="mx-auto mt-8 max-w-[40rem] text-center lg:mt-10">
          <p className="text-small font-semibold text-amber-text">{labels.eyebrow}</p>
          <h2 id="quality-title" className="mt-3 text-h2">
            {labels.title}
          </h2>
          <p className="mt-4 text-body-lg text-muted">{labels.lead}</p>
        </div>

        <div className="mt-10 lg:mt-12">
          <QualitySteps pillars={pillars} labels={labels} />
        </div>

        {aboutHref ? (
          <div className="mt-10 flex justify-center lg:mt-12">
            <ArrowButton href={aboutHref} onLight>
              {labels.link}
            </ArrowButton>
          </div>
        ) : null}
      </Container>
    </section>
  )
}

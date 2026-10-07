// Home section after the hero (client-requested): a short company introduction with the founder,
// then three beliefs as stacked rows (title left, explanation right). Pieces appear one after
// another as the section scrolls into view (Reveal).
import Image from 'next/image'
import type { CSSProperties } from 'react'

import { Container } from '@/components/layout/Container'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal } from '@/components/ui/Reveal'
import { SpanLine } from '@/components/ui/SpanLine'
import type { Dictionary } from '@/lib/i18n'
import type { Belief, Founder } from '@/lib/placeholder-home'

type CompanyIntroProps = {
  lead: string
  founder: Founder
  beliefs: Belief[]
  labels: Dictionary['intro']
  aboutHref: string
}

/** Order in the reveal sequence. */
const order = (n: number) => ({ '--reveal-index': n }) as CSSProperties

function initials(name: string): string {
  return name
    .replace(/\[[^\]]*\]/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function CompanyIntro({ lead, founder, beliefs, labels, aboutHref }: CompanyIntroProps) {
  return (
    <Reveal as="section" aria-labelledby="intro-title" className="section-y">
      <Container>
        <SpanLine />

        <div className="mt-8 grid grid-cols-1 items-start gap-10 lg:mt-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <h2 id="intro-title" className="reveal-item max-w-[16ch] text-h1" style={order(0)}>
              {labels.title}
            </h2>
            <p className="reveal-item measure mt-5 text-body-lg text-muted" style={order(1)}>
              {lead}
            </p>
          </div>

          {/* Founder: photo, signature, name and role. */}
          <figure
            className="reveal-item flex items-center gap-5 lg:col-span-4 lg:col-start-9 lg:justify-self-end"
            style={order(2)}
          >
            <div className="relative size-28 shrink-0 overflow-hidden rounded-[14px] bg-render-ground lg:size-32">
              {founder.photo ? (
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-full items-center justify-center text-h2 text-muted/60"
                >
                  {initials(founder.name) || '·'}
                </span>
              )}
            </div>
            <figcaption>
              {founder.signature ? (
                <span className="relative mb-2 block h-14 w-36">
                  <Image
                    src={founder.signature}
                    alt=""
                    fill
                    sizes="144px"
                    className="object-contain object-left"
                  />
                </span>
              ) : null}
              <span className="block text-body font-semibold">{founder.name}</span>
              <span className="mt-0.5 block text-small text-muted">{founder.role}</span>
            </figcaption>
          </figure>
        </div>

        <ul aria-label={labels.beliefsLabel} className="mt-12 flex flex-col gap-3 lg:mt-16">
          {beliefs.map((belief, i) => (
            <li
              key={belief.title}
              className="reveal-item grid grid-cols-1 gap-3 rounded-[16px] border border-stone bg-surface p-6 md:grid-cols-12 md:gap-6 lg:p-8"
              style={order(3 + i)}
            >
              <h3 className="text-h3 md:col-span-5">{belief.title}</h3>
              <p className="text-body text-muted md:col-span-6 md:col-start-7">{belief.text}</p>
            </li>
          ))}
        </ul>

        <div
          className="reveal-item mt-10 flex justify-center lg:mt-12"
          style={order(3 + beliefs.length)}
        >
          <ArrowButton href={aboutHref} onLight>
            {labels.link}
          </ArrowButton>
        </div>
      </Container>
    </Reveal>
  )
}

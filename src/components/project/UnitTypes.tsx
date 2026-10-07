'use client'

// Apartment types: one card per type (Type A, B…) with size, bedrooms, bathrooms, balconies and the
// number of apartments. "View floor plan" opens the plan in a light Lightbox.
import { useState, type CSSProperties } from 'react'

import { Lightbox } from '@/components/gallery/LazyLightbox'
import { Icon } from '@/components/ui/Icon'
import { fillTemplate, formatNumber } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import type { UnitType } from '@/lib/projects'

type UnitTypesProps = {
  unitTypes: UnitType[]
  labels: Dictionary['project']
  galleryLabels: Dictionary['gallery']
}

export function UnitTypes({ unitTypes, labels, galleryLabels }: UnitTypesProps) {
  const [open, setOpen] = useState<number | null>(null)
  const plans = unitTypes
    .map((u, i) => ({ u, i }))
    .filter(({ u }) => u.floorPlan)
    .map(({ u, i }) => ({
      typeIndex: i,
      image: u.floorPlan!,
      alt: fillTemplate(labels.floorPlanOf, { label: u.label }),
      caption: `${u.label} · ${formatNumber(u.sizeSqft)} sqft`,
    }))

  return (
    <>
      <ul
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))]"
        // As many columns as types (2 to 4), so three types fill the row instead of leaving a gap.
        style={{ '--cols': Math.min(Math.max(unitTypes.length, 2), 4) } as CSSProperties}
      >
        {unitTypes.map((unit, i) => {
          const planIndex = plans.findIndex((p) => p.typeIndex === i)
          return (
            <li
              key={unit.label}
              className="flex flex-col rounded-card border border-stone bg-surface p-5 shadow-card lg:p-6"
            >
              <p className="text-small font-semibold text-muted">{unit.label}</p>
              <p className="mt-1 text-h2 tabular">
                {formatNumber(unit.sizeSqft)}
                <span className="ml-1.5 text-body font-medium text-muted">sqft</span>
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                <li className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-canvas px-3 text-small tabular">
                  <Icon name="bed" size={18} className="text-muted" />
                  {unit.bedrooms} {labels.bedrooms}
                </li>
                <li className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-canvas px-3 text-small tabular">
                  <Icon name="bath" size={18} className="text-muted" />
                  {unit.bathrooms} {labels.bathrooms}
                </li>
                {unit.balconies ? (
                  <li className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-canvas px-3 text-small tabular">
                    <Icon name="sun" size={18} className="text-muted" />
                    {unit.balconies} {labels.balconies}
                  </li>
                ) : null}
              </ul>

              {unit.count ? (
                <p className="mt-4 text-small text-muted tabular">
                  {fillTemplate(labels.unitCount, { n: unit.count })}
                </p>
              ) : null}

              {planIndex >= 0 ? (
                <button
                  type="button"
                  onClick={() => setOpen(planIndex)}
                  className="mt-auto inline-flex min-h-11 items-center gap-2 self-start pt-5 text-body font-semibold underline decoration-1 underline-offset-4 hover:decoration-amber hover:decoration-2"
                >
                  <Icon name="expand" size={18} />
                  {labels.viewFloorPlan}
                </button>
              ) : null}
            </li>
          )
        })}
      </ul>

      {/* Rendered only while open, so the viewer's code loads on first use. */}
      {open !== null ? (
        <Lightbox
          items={plans}
          index={open}
          onIndexChange={setOpen}
          labels={galleryLabels}
          tone="light"
        />
      ) : null}
    </>
  )
}

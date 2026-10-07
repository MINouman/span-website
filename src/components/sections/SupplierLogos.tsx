// Home section (client-requested): "Our partners" logo grid on the dark ink background, right after
// the landowner section. Five across on desktop, three on tablets, two on phones, hairline grid lines.
// Logos are shown in white whatever their original colours; a slot without a logo shows the name.
import Image from 'next/image'

import { Container } from '@/components/layout/Container'
import { SpanLine } from '@/components/ui/SpanLine'
import type { Dictionary } from '@/lib/i18n'
import type { Supplier } from '@/lib/placeholder-suppliers'

type SupplierLogosProps = {
  suppliers: Supplier[]
  labels: Dictionary['suppliers']
}

export function SupplierLogos({ suppliers, labels }: SupplierLogosProps) {
  if (suppliers.length === 0) return null

  return (
    <section
      aria-labelledby="suppliers-title"
      className="bg-deco-dark bg-ink pb-[72px] text-canvas md:pb-[112px] xl:pb-[160px]"
    >
      <Container>
        <SpanLine />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 lg:mt-10">
          <h2 id="suppliers-title" className="text-h2">
            {labels.title}
          </h2>
          <p className="measure text-body-lg text-canvas/75">{labels.lead}</p>
        </div>

        {/* gap-px over a light background draws the hairlines between cells. */}
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[16px] border border-canvas/15 bg-canvas/15 sm:grid-cols-3 lg:mt-14 lg:grid-cols-5">
          {suppliers.map((supplier, i) => {
            const content = supplier.logo ? (
              <span className="relative block h-10 w-full max-w-[9rem]">
                <Image
                  src={supplier.logo}
                  alt={supplier.name}
                  fill
                  sizes="144px"
                  className="object-contain brightness-0 invert"
                />
              </span>
            ) : (
              <span className="text-center">
                <span className="block text-small font-semibold text-canvas/85">
                  {supplier.name}
                </span>
                <span className="mt-1 block text-small text-canvas/45">{labels.logoPending}</span>
              </span>
            )
            const cell =
              'flex h-28 items-center justify-center bg-ink px-4 transition-colors lg:h-32'
            return (
              <li key={`${supplier.name}-${i}`}>
                {supplier.url ? (
                  <a
                    href={supplier.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cell} opacity-80 hover:bg-canvas/5 hover:opacity-100`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={`${cell} opacity-80`}>{content}</div>
                )}
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

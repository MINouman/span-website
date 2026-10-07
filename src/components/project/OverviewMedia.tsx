'use client'

// Project page media column: the 3D main image on a soft ground, then gallery thumbnails.
// The last thumbnail shows "+N photos". Thumbnails open the gallery in the Lightbox.
import Image from 'next/image'
import { useState } from 'react'

import { Lightbox } from '@/components/gallery/LazyLightbox'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import type { GalleryImage, ImageSource } from '@/lib/projects'
import { blurPlaceholder } from '@/lib/image'

type OverviewMediaProps = {
  image: ImageSource
  imageAlt: string
  gallery: GalleryImage[]
  labels: Dictionary['gallery']
}

const THUMBS = 4

export function OverviewMedia({ image, imageAlt, gallery, labels }: OverviewMediaProps) {
  const [open, setOpen] = useState<number | null>(null)
  const thumbs = gallery.slice(0, THUMBS)
  const remaining = gallery.length - THUMBS

  return (
    <div>
      <div className="relative aspect-[5/4] overflow-hidden rounded-card bg-render-ground">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="(min-width: 1320px) 720px, (min-width: 1024px) 58vw, 100vw"
          className="object-contain object-bottom px-[10%] pt-[6%] pb-[4%]"
        />
      </div>

      {thumbs.length > 0 ? (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {thumbs.map((item, i) => {
            const isLast = i === THUMBS - 1 && remaining > 0
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={
                    isLast
                      ? fillTemplate(labels.more, { n: remaining + 1 })
                      : fillTemplate(labels.open, { n: i + 1, total: gallery.length })
                  }
                  className="group relative block aspect-square w-full overflow-hidden rounded-[10px] bg-stone"
                >
                  <Image
                    src={item.image}
                    {...blurPlaceholder(item.image)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 170px, 25vw"
                    className="object-cover transition-opacity group-hover:opacity-90"
                  />
                  {isLast ? (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/60 text-body font-semibold text-canvas tabular">
                      +{remaining + 1}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}

      {/* Rendered only while open, so the viewer's code loads on first use. */}
      {open !== null ? (
        <Lightbox items={gallery} index={open} onIndexChange={setOpen} labels={labels} />
      ) : null}
    </div>
  )
}

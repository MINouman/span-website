'use client'

// Project page photo grid (reference layout): the 3D main image large on the left, two gallery photos
// stacked on the right, with "Map view" and "Show all photos" chips. Photos open the gallery viewer.
// Phones: the main image on top, the two photos side by side beneath it.
import Image from 'next/image'
import { useState } from 'react'

import { Lightbox } from '@/components/gallery/LazyLightbox'
import { Icon } from '@/components/ui/Icon'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import { blurPlaceholder } from '@/lib/image'
import type { GalleryImage, ImageSource } from '@/lib/projects'

type ProjectMediaGridProps = {
  image: ImageSource
  imageAlt: string
  gallery: GalleryImage[]
  labels: Dictionary['gallery']
  projectLabels: Pick<Dictionary['project'], 'mapView' | 'allPhotos'>
  /** Anchor for the map section, or null when the project has no location. */
  mapHref: string | null
}

const chip =
  'press inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-surface/95 px-3 text-small font-semibold text-ink shadow-card backdrop-blur hover:bg-surface'

export function ProjectMediaGrid({
  image,
  imageAlt,
  gallery,
  labels,
  projectLabels,
  mapHref,
}: ProjectMediaGridProps) {
  const [open, setOpen] = useState<number | null>(null)
  const side = gallery.slice(0, 2)

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:grid-rows-2">
      <div className="relative col-span-2 aspect-[4/3] overflow-hidden rounded-card bg-render-ground lg:col-span-1 lg:row-span-2 lg:aspect-auto lg:min-h-[26rem]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          preload
          sizes="(min-width: 1320px) 520px, (min-width: 1024px) 40vw, 100vw"
          className="object-contain object-bottom px-[10%] pt-[6%] pb-[4%]"
        />
      </div>

      {side.map((item, i) => {
        const isLast = i === side.length - 1
        return (
          <div key={i} className="relative aspect-[4/3] lg:aspect-auto">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={fillTemplate(labels.open, { n: i + 1, total: gallery.length })}
              className="group block size-full overflow-hidden rounded-card bg-stone"
            >
              <Image
                src={item.image}
                alt=""
                fill
                {...blurPlaceholder(item.image)}
                sizes="(min-width: 1320px) 340px, (min-width: 1024px) 26vw, 50vw"
                className="rounded-card object-cover transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </button>
            {isLast ? (
              <div className="pointer-events-none absolute right-2 bottom-2 flex flex-wrap justify-end gap-2 sm:right-3 sm:bottom-3">
                {mapHref ? (
                  <a href={mapHref} className={`${chip} pointer-events-auto`}>
                    <Icon name="pin" size={16} />
                    {projectLabels.mapView}
                  </a>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpen(0)}
                  className={`${chip} pointer-events-auto`}
                >
                  <Icon name="grid" size={16} />
                  {fillTemplate(projectLabels.allPhotos, { n: gallery.length })}
                </button>
              </div>
            ) : null}
          </div>
        )
      })}

      {/* Rendered only while open, so the viewer's code loads on first use. */}
      {open !== null ? (
        <Lightbox items={gallery} index={open} onIndexChange={setOpen} labels={labels} />
      ) : null}
    </div>
  )
}

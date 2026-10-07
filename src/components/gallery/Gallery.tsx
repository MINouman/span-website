'use client'

// Project gallery (spec §3.8): category tabs (only categories that have photos), then the photos.
// Phones: a single swipeable row. Tablet and up: free-form masonry columns. Each photo opens the Lightbox.
import Image from 'next/image'
import { useState } from 'react'

import { Lightbox } from '@/components/gallery/LazyLightbox'
import { Tabs } from '@/components/ui/Tabs'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import { galleryCategories, type GalleryCategory, type GalleryImage } from '@/lib/projects'
import { blurPlaceholder } from '@/lib/image'

type GalleryProps = {
  items: GalleryImage[]
  labels: Dictionary['gallery']
}

type Filter = 'all' | GalleryCategory

export function Gallery({ items, labels }: GalleryProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)

  const present = galleryCategories.filter((c) => items.some((i) => i.category === c))
  const visible = filter === 'all' ? items : items.filter((i) => i.category === filter)

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: labels.all, count: items.length },
    ...present.map((c) => ({
      id: c,
      label: labels[c],
      count: items.filter((i) => i.category === c).length,
    })),
  ]

  return (
    <div>
      {present.length > 1 ? (
        <Tabs
          label={labels.filterLabel}
          tabs={tabs}
          value={filter}
          onChange={(id) => {
            setFilter(id)
            setOpen(null)
          }}
          panelId="gallery-panel"
        />
      ) : null}

      <ul
        id="gallery-panel"
        role={present.length > 1 ? 'tabpanel' : undefined}
        className="-mx-[var(--gutter)] mt-6 flex snap-x snap-mandatory scroll-px-[var(--gutter)] gap-3 overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:block md:columns-2 md:gap-4 md:overflow-visible md:px-0 lg:columns-3"
      >
        {visible.map((item, i) => (
          <li
            key={`${filter}-${i}`}
            className="w-[85%] shrink-0 snap-start md:mb-4 md:w-auto md:break-inside-avoid"
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={fillTemplate(labels.open, { n: i + 1, total: visible.length })}
              className="group block w-full text-left"
            >
              <span className="block overflow-hidden rounded-image bg-stone">
                <Image
                  src={item.image}
                  alt={item.alt}
                  {...blurPlaceholder(item.image)}
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 85vw"
                  className="aspect-[4/3] h-auto w-full object-cover transition-opacity duration-200 group-hover:opacity-90 md:aspect-auto"
                />
              </span>
              {item.caption ? (
                <span className="mt-2 block text-small text-muted">{item.caption}</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>

      {/* Rendered only while open, so the viewer's code loads on first use. */}
      {open !== null ? (
        <Lightbox items={visible} index={open} onIndexChange={setOpen} labels={labels} />
      ) : null}
    </div>
  )
}

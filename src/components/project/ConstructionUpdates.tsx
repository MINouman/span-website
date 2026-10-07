// Dated construction updates, newest first. Shown for ongoing projects only.
import Image from 'next/image'

import type { Locale } from '@/lib/i18n'
import type { ProjectDetail } from '@/lib/projects'
import { blurPlaceholder } from '@/lib/image'

type ConstructionUpdatesProps = {
  updates: ProjectDetail['constructionUpdates']
  locale: Locale
}

export function ConstructionUpdates({ updates, locale }: ConstructionUpdatesProps) {
  const sorted = [...updates].sort((a, b) => b.date.localeCompare(a.date))
  const format = new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <ol className="relative flex flex-col gap-10 border-l border-stone pl-6 lg:pl-10">
      {sorted.map((update) => (
        <li key={update.date} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-ink lg:-left-[calc(2.5rem+5px)]"
          />
          <time dateTime={update.date} className="text-small font-semibold text-muted">
            {format.format(new Date(update.date))}
          </time>
          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-[280px_minmax(0,1fr)] md:gap-8">
            {update.image ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-image bg-stone">
                <Image
                  src={update.image}
                  {...blurPlaceholder(update.image)}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 280px, 100vw"
                  className="object-cover"
                />
              </div>
            ) : null}
            <p className={`measure text-body ${update.image ? '' : 'md:col-span-2'}`}>
              {update.note}
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}

// Key numbers from SiteSettings (static, no count-up; spec §5). Tabular figures, hairline dividers.
import type { KeyNumber } from '@/lib/placeholder-pages'

export function KeyNumbers({ items, label }: { items: KeyNumber[]; label: string }) {
  return (
    <dl aria-label={label} className="grid grid-cols-2 border-t border-stone lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`border-b border-stone py-6 pr-4 lg:border-b-0 lg:py-8 ${
            i > 0 ? 'lg:border-l lg:pl-6' : ''
          } ${i % 2 === 1 ? 'border-l pl-4 lg:pl-6' : ''}`}
        >
          <dt className="text-small text-muted">{item.label}</dt>
          <dd className="mt-2 text-h1 tabular">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

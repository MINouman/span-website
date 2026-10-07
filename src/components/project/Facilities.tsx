// Facilities: icon and label for each, in a simple grid.
import { Icon } from '@/components/ui/Icon'
import type { ProjectDetail } from '@/lib/projects'

export function Facilities({ items }: { items: ProjectDetail['facilities'] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <li
          key={item.label}
          className="flex min-h-16 items-center gap-3 rounded-[12px] border border-stone bg-surface px-4 py-3 text-body"
        >
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-canvas">
            <Icon name={item.icon} size={22} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  )
}

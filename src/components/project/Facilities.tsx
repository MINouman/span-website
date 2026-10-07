// Facilities as a two-column checklist (reference: "Property info"): small icon, label, no boxes.
import { Icon } from '@/components/ui/Icon'
import type { ProjectDetail } from '@/lib/projects'

export function Facilities({ items }: { items: ProjectDetail['facilities'] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-3 text-body">
          <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-amber-tint text-ink">
            <Icon name={item.icon} size={18} />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  )
}

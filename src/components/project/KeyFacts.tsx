// Key facts strip on the project page: rounded pills with icons, in the card style.
import { Icon, type IconName } from '@/components/ui/Icon'

export type KeyFact = { icon: IconName; label: string }

export function KeyFacts({ facts }: { facts: KeyFact[] }) {
  if (facts.length === 0) return null
  return (
    <ul className="flex flex-wrap gap-2">
      {facts.map((fact) => (
        <li
          key={fact.label}
          className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-stone bg-surface px-3.5 text-small text-ink tabular"
        >
          <Icon name={fact.icon} size={18} className="text-muted" />
          {fact.label}
        </li>
      ))}
    </ul>
  )
}

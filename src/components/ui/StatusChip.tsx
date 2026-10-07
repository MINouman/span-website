// Ongoing / Completed / Upcoming chip (spec §3.4).
import type { Dictionary } from '@/lib/i18n'
import type { ProjectStatus } from '@/lib/projects'

const styles: Record<ProjectStatus, string> = {
  ongoing: 'bg-amber-tint text-amber-text',
  completed: 'bg-stone text-ink',
  upcoming: 'border border-muted text-ink',
}

type StatusChipProps = {
  status: ProjectStatus
  labels: Dictionary['status']
  className?: string
}

export function StatusChip({ status, labels, className = '' }: StatusChipProps) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-chip px-3 text-small whitespace-nowrap ${styles[status]} ${className}`}
    >
      {labels[status]}
    </span>
  )
}

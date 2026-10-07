// Quality details and approvals as list rows in one card (reference: "Near by" lists): an icon, the
// label with a small caption, and the value on the right.
import { Icon, type IconName } from '@/components/ui/Icon'
import type { Dictionary } from '@/lib/i18n'
import type { ProjectDetail } from '@/lib/projects'

type QualityDetailsProps = {
  details: ProjectDetail['qualityDetails']
  approvals: ProjectDetail['approvals']
  labels: Dictionary['project']
}

type Row = { icon: IconName; label: string; caption?: string; value: string }

export function QualityDetails({ details, approvals, labels }: QualityDetailsProps) {
  const rows: Row[] = [
    ...details.map((d) => ({ icon: 'columns' as const, label: d.label, value: d.value })),
    ...approvals.map((a) => ({
      icon: 'shieldCheck' as const,
      label: a.name,
      caption: labels.approvalsTitle,
      value: a.reference ? `${labels.reference}: ${a.reference}` : '',
    })),
  ]
  if (rows.length === 0) return null

  return (
    <ul className="divide-y divide-stone rounded-card border border-stone bg-surface">
      {rows.map((row, i) => (
        <li key={`${row.label}-${i}`} className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-canvas">
            <Icon name={row.icon} size={18} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-small font-semibold">{row.label}</span>
            {row.caption ? (
              <span className="block text-small text-muted">{row.caption}</span>
            ) : null}
          </span>
          <span className="max-w-[50%] text-right text-small text-muted tabular">{row.value}</span>
        </li>
      ))}
    </ul>
  )
}

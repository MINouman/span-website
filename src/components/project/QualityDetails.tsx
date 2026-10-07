// Quality details (engineer, materials, tests) and approvals for one project.
import { SpecList } from '@/components/project/SpecList'
import type { Dictionary } from '@/lib/i18n'
import type { ProjectDetail } from '@/lib/projects'

type QualityDetailsProps = {
  details: ProjectDetail['qualityDetails']
  approvals: ProjectDetail['approvals']
  labels: Dictionary['project']
}

export function QualityDetails({ details, approvals, labels }: QualityDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-6">
      {details.length > 0 ? (
        <div className="lg:col-span-7">
          <SpecList rows={details} />
        </div>
      ) : null}
      {approvals.length > 0 ? (
        <div className="lg:col-span-4 lg:col-start-9">
          <h3 className="text-h3">{labels.approvalsTitle}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {approvals.map((a) => (
              <li key={a.name} className="rounded-[12px] border border-stone bg-surface p-4">
                <p className="text-body font-semibold">{a.name}</p>
                {a.reference ? (
                  <p className="mt-1 text-small text-muted tabular">
                    {labels.reference}: {a.reference}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

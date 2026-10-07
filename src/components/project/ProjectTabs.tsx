'use client'

// Projects list filter (spec §4 Projects): All, Ongoing, Completed, Upcoming. Cards are rendered on
// the server and passed in; this component only decides which ones show.
import { useState, type ReactNode } from 'react'

import { Tabs } from '@/components/ui/Tabs'
import { fillTemplate } from '@/lib/format'
import type { Dictionary } from '@/lib/i18n'
import type { ProjectStatus } from '@/lib/projects'

type Item = { slug: string; status: ProjectStatus; card: ReactNode }
type Filter = 'all' | ProjectStatus

type ProjectTabsProps = {
  items: Item[]
  labels: Pick<Dictionary, 'projects' | 'status'>
}

const statuses: ProjectStatus[] = ['ongoing', 'completed', 'upcoming']

export function ProjectTabs({ items, labels }: ProjectTabsProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter)

  const tabs = [
    { id: 'all' as Filter, label: labels.projects.all, count: items.length },
    ...statuses.map((s) => ({
      id: s as Filter,
      label: labels.status[s],
      count: items.filter((i) => i.status === s).length,
    })),
  ]

  return (
    <div>
      <Tabs
        label={labels.projects.filterLabel}
        tabs={tabs}
        value={filter}
        onChange={setFilter}
        panelId="projects-panel"
      />
      <div id="projects-panel" role="tabpanel" className="mt-8 lg:mt-10">
        {visible.length > 0 ? (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((item) => (
              <li key={item.slug}>{item.card}</li>
            ))}
          </ul>
        ) : (
          <p className="rounded-card border border-dashed border-muted/50 p-10 text-center text-body text-muted">
            {fillTemplate(labels.projects.empty, {
              status: filter === 'all' ? '' : labels.status[filter].toLowerCase(),
            })}
          </p>
        )}
      </div>
    </div>
  )
}

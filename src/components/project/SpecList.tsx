// Two-column definition list (spec §3.5): label muted, value ink, hairline dividers.
export type SpecRow = { label: string; value: string }

export function SpecList({ rows }: { rows: SpecRow[] }) {
  return (
    <dl className="border-t border-stone">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 border-b border-stone py-3.5"
        >
          <dt className="text-small text-muted">{row.label}</dt>
          <dd className="text-body text-ink tabular">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

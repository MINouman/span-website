// Signature 2px amber line (spec §1).
// Static by default: a divider above major section headings and under the header on inner pages.
// `draw` is for the Home hero only: it draws across once (about 900ms), then rests.
// Reduced motion turns the draw into an instant state change (globals.css).
// Never use inside cards or lists.

type SpanLineProps = {
  draw?: boolean
  /** Delay before the draw starts, in ms, so it can follow the hero headline. */
  delayMs?: number
  className?: string
}

export function SpanLine({ draw = false, delayMs = 0, className = '' }: SpanLineProps) {
  return (
    <div
      aria-hidden="true"
      data-span-line=""
      className={`h-[var(--span-line)] w-full origin-left bg-amber ${className}`}
      style={
        draw
          ? {
              animation: `span-draw 900ms var(--ease-out) ${delayMs}ms both`,
            }
          : undefined
      }
    />
  )
}

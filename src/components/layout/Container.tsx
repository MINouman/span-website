// Max-width 1240px content area with 20px (mobile) / 40px (desktop) side padding (spec §2 Layout).
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type ContainerProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

export function Container<T extends ElementType = 'div'>({
  as,
  className = '',
  ...props
}: ContainerProps<T>) {
  const Tag = as ?? 'div'
  return (
    <Tag
      className={`mx-auto w-full max-w-[calc(var(--container-max)+2*var(--gutter))] px-[var(--gutter)] ${className}`}
      {...props}
    />
  )
}

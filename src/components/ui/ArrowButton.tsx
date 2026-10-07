// The site's button (client-chosen): a white button with the label and an amber icon box. On hover or
// keyboard focus the amber box grows to fill the button, stopping 2px short so the white button shows
// as a thin border. Text stays ink on amber.
//
// Renders a Next Link for internal paths, a plain <a> for external, tel:, mailto: and #hash links, or a
// <button> when there is no href. `icon` sets the symbol in the amber box (an arrow by default).
// `onLight` adds a border and soft shadow so it stands off the canvas. `size="sm"` is the shorter
// version for tight spots like the navbar. `block` makes it fill its container's width.
// The exception is the ClosingCta contact row, which keeps the classic buttonClasses styles.
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Icon, type IconName } from '@/components/ui/Icon'

type CommonProps = {
  children: ReactNode
  icon?: IconName
  onLight?: boolean
  size?: 'md' | 'sm'
  block?: boolean
  className?: string
}

type LinkProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className' | 'children'
  >
type NativeProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className' | 'children'
  >

export type ArrowButtonProps = LinkProps | NativeProps

const sizes = {
  md: {
    root: 'h-14 gap-4 rounded-[14px] pr-2 pl-6 text-body',
    fill: 'top-2 right-2 bottom-2 w-10 rounded-[10px] group-hover/btn:rounded-[12px] group-focus-visible/btn:rounded-[12px]',
    box: 'size-10',
    icon: 20,
  },
  sm: {
    root: 'h-12 gap-3 rounded-[12px] pr-1.5 pl-5 text-small',
    fill: 'top-1.5 right-1.5 bottom-1.5 w-9 rounded-[9px] group-hover/btn:rounded-[10px] group-focus-visible/btn:rounded-[10px]',
    box: 'size-9',
    icon: 18,
  },
}

export function ArrowButton(props: ArrowButtonProps) {
  const {
    children,
    icon = 'arrowRight',
    onLight = false,
    size = 'md',
    block = false,
    className = '',
  } = props
  const s = sizes[size]

  const classes = `group/btn relative isolate inline-flex items-center overflow-hidden bg-surface font-semibold text-ink transition-[translate,scale,box-shadow,opacity] duration-200 hover:-translate-y-px active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${s.root} ${
    block ? 'w-full justify-between' : ''
  } ${onLight ? 'border border-stone shadow-card' : ''} ${className}`

  const inner = (
    <>
      <span
        aria-hidden="true"
        className={`absolute -z-10 bg-amber transition-all duration-300 ease-[var(--ease-out)] group-hover/btn:top-0.5 group-hover/btn:right-0.5 group-hover/btn:bottom-0.5 group-hover/btn:w-[calc(100%-4px)] group-focus-visible/btn:top-0.5 group-focus-visible/btn:right-0.5 group-focus-visible/btn:bottom-0.5 group-focus-visible/btn:w-[calc(100%-4px)] ${s.fill}`}
      />
      <span className="inline-flex items-center gap-1.5">{children}</span>
      <span className={`inline-flex shrink-0 items-center justify-center ${s.box}`}>
        <Icon name={icon} size={s.icon} />
      </span>
    </>
  )

  if (props.href !== undefined) {
    const {
      children: _c,
      icon: _i,
      onLight: _o,
      size: _s,
      block: _b,
      className: _cl,
      href,
      ...rest
    } = props
    if (/^(https?:|tel:|mailto:|#)/.test(href)) {
      return (
        <a href={href} className={classes} {...rest}>
          {inner}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    )
  }

  const {
    children: _c,
    icon: _i,
    onLight: _o,
    size: _s,
    block: _b,
    className: _cl,
    href: _h,
    type = 'button',
    ...rest
  } = props
  return (
    <button type={type} className={classes} {...rest}>
      {inner}
    </button>
  )
}

// Buttons (spec §3.2, restyled by the client). Primary and secondary both render the site's arrow-box
// button (ArrowButton): white with an amber icon box that fills on hover. Text link: underline offset
// 4px, amber underline on hover.
// buttonClasses keeps the older solid/outlined styles, used only by the ClosingCta contact row.
// Labels say what happens: "View projects", "Talk to us about your land", "Send enquiry".
import Link from 'next/link'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { ArrowButton } from '@/components/ui/ArrowButton'
import type { IconName } from '@/components/ui/Icon'

type Variant = 'primary' | 'secondary' | 'text'

type CommonProps = {
  variant?: Variant
  /** Set on dark ink sections so secondary and text variants use canvas instead of ink. */
  onDark?: boolean
  /** Symbol in the amber box (primary and secondary only). Defaults to an arrow. */
  icon?: IconName
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<'a'>,
    'href' | 'className'
  >
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<'button'>,
    'className'
  >

export type ButtonProps = LinkButtonProps | NativeButtonProps

const base =
  'inline-flex items-center justify-center gap-2 font-semibold transition-[background-color,border-color,color,translate,scale,box-shadow,text-decoration-color,filter] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

function classesFor(variant: Variant, onDark: boolean): string {
  switch (variant) {
    case 'primary':
      return 'min-h-12 rounded-control bg-amber px-6 text-body text-ink hover:-translate-y-px hover:brightness-95 hover:shadow-[0_6px_16px_rgb(255_165_0/0.30)]'
    case 'secondary':
      return onDark
        ? 'min-h-12 rounded-control border border-canvas px-6 text-body text-canvas hover:-translate-y-px hover:bg-canvas hover:text-ink'
        : 'min-h-12 rounded-control border border-ink px-6 text-body text-ink hover:-translate-y-px hover:bg-ink hover:text-canvas hover:shadow-[0_6px_16px_rgb(31_41_51/0.18)]'
    case 'text':
      return `min-h-11 text-body underline underline-offset-4 decoration-1 hover:decoration-amber hover:decoration-2 ${
        onDark ? 'text-canvas' : 'text-ink'
      }`
  }
}

/** Shared class string, for places that need button styling on another element. */
export function buttonClasses(variant: Variant = 'primary', onDark = false): string {
  return `${base} ${classesFor(variant, onDark)}`
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', onDark = false, icon, className = '', children } = props

  // Primary and secondary share the site's arrow-box button (ArrowButton).
  if (variant !== 'text') {
    const { variant: _v, onDark: _d, ...rest } = props
    return <ArrowButton {...rest} icon={icon} onLight={!onDark} />
  }

  const classes = `${buttonClasses(variant, onDark)} ${className}`

  if (props.href !== undefined) {
    const { variant: _v, onDark: _d, icon: _i, className: _c, children: _ch, href, ...rest } = props
    const external = /^(https?:|tel:|mailto:)/.test(href)
    if (external) {
      return (
        <a href={href} className={classes} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  const {
    variant: _v,
    onDark: _d,
    icon: _i,
    className: _c,
    children: _ch,
    href: _h,
    type = 'button',
    ...rest
  } = props
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}

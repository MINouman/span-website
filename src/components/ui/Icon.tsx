// 24px line icons, 1.5px stroke (spec §3.6). Decorative by default; pass `label` when the icon carries meaning.
import type { ReactNode } from 'react'

const paths = {
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  chevronLeft: <path d="M14.5 5.5L8 12l6.5 6.5" />,
  chevronRight: <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />,
  expand: <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="1.5" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  building: (
    <>
      <path d="M5 20.5V4.5h9v16M14 9.5h5v11M3 20.5h18" />
      <path d="M8 8h3M8 11.5h3M8 15h3M16.5 13h0M16.5 16.5h0" />
    </>
  ),
  layers: (
    <path d="M12 4l8.5 4.5L12 13 3.5 8.5 12 4zM3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5" />
  ),
  land: <path d="M3.5 17.5l5-9 4 6 2.5-3.5 5.5 6.5H3.5zM3.5 20.5h17" />,
  lift: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="1.5" />
      <path d="M12 3.5v17M8.5 9.5l-1.5 2h3l-1.5-2zM15.5 14.5l1.5-2h-3l1.5 2z" />
    </>
  ),
  bolt: <path d="M13 3.5L5.5 13.5H12l-1 7 7.5-10H12l1-7z" />,
  car: (
    <>
      <path d="M4.5 16.5v-4l2-5h11l2 5v4M3.5 12.5h17v4h-17zM7 16.5v2M17 16.5v2" />
      <path d="M7 14.5h1M16 14.5h1" />
    </>
  ),
  camera: (
    <>
      <path d="M3.5 8.5l11-3 1.5 5.5-11 3-1.5-5.5zM16 9l4-1v5l-4-.5" />
      <path d="M7 14l1 6.5M5 20.5h6" />
    </>
  ),
  flame: (
    <path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15a6 6 0 0 0 6 6z" />
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  shield: <path d="M12 3.5l7.5 3v5.5c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6.5l7.5-3z" />,
  droplet: <path d="M12 3.5s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  share: (
    <>
      <path d="M12 15V3.5M7.5 8L12 3.5 16.5 8" />
      <path d="M8 11H6.5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H16" />
    </>
  ),
  grid: <path d="M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.6 9.6a2.5 2.5 0 1 1 3.4 2.3c-.6.3-1 .8-1 1.5v.3M12 16.6v.4" />
    </>
  ),
  chat: (
    <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H10l-4 3.5v-3.5H6.5a2 2 0 0 1-2-2v-8z" />
  ),
  columns: (
    <path d="M3.5 7.5L12 3.5l8.5 4M4.5 7.5h15M6.5 10v7.5M10.5 10v7.5M13.5 10v7.5M17.5 10v7.5M3.5 20.5h17M4.5 18h15" />
  ),
  bricks: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" />
      <path d="M3.5 9.8h17M3.5 14.2h17M9 5.5v4.3M15 5.5v4.3M12 9.8v4.4M6 14.2v4.3M18 14.2v4.3" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M12 3.5l7.5 3v5.5c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6.5l7.5-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4.5" />
      <path d="M11.2 11.8L20 3M16.5 6.5l2.5 2.5M14 9l2 2" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5.5M12 16.2v.3" />
    </>
  ),
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 5.5 1.5 1.5 0 0 1 5 4z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.2-4A8 8 0 1 1 8 18.8L4 20z" />
      <path d="M9.5 9c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9.5 9z" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="M4 7l8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10" r="2.25" />
    </>
  ),
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  bed: (
    <>
      <path d="M3 18.5V6.5M3 14.5h18v4M21 14.5v-3a2.5 2.5 0 0 0-2.5-2.5H11v5.5" />
      <circle cx="7" cy="11" r="1.75" />
    </>
  ),
  bath: (
    <>
      <path d="M3.5 12h17v2.5a4 4 0 0 1-4 4h-9a4 4 0 0 1-4-4V12z" />
      <path d="M6 12V6.5A2 2 0 0 1 8 4.5a2 2 0 0 1 2 2M7 18.5l-1 2M17 18.5l1 2" />
    </>
  ),
  area: (
    <>
      <path d="M4 9V4h5M20 15v5h-5M15 4h5v5M9 20H4v-5" />
    </>
  ),
  pause: <path d="M9 6v12M15 6v12" />,
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5z" />,
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof paths

type IconProps = {
  name: IconName
  size?: number
  label?: string
  className?: string
}

export function Icon({ name, size = 24, label, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {paths[name]}
    </svg>
  )
}

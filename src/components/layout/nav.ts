// Primary navigation, shared by Header, MobileMenu and Footer.
import type { Dictionary } from '@/lib/i18n'

export type NavItem = { key: keyof Dictionary['nav']; path: string }

export const primaryNav: NavItem[] = [
  { key: 'projects', path: '/projects' },
  { key: 'landowners', path: '/for-landowners' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
]

/** True when `current` (locale stripped) is the nav path or one of its children. */
export function isActive(current: string, path: string): boolean {
  return current === path || current.startsWith(`${path}/`)
}

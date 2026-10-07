// Re-mounts on every page change, so each page's content fades and rises gently into place while the
// navbar and footer (in the layout) stay put. The animation leaves no transform behind afterwards
// (fill-mode backwards), so fixed and sticky elements inside pages are unaffected.
import type { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>
}

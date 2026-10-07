// The brand is SPAN. "Engineering and Construction Ltd." is a small descriptor line (spec §1).
import Link from 'next/link'

type WordmarkProps = {
  href: string
  /** Show the descriptor line under the name. */
  descriptor?: string
  className?: string
}

export function Wordmark({ href, descriptor, className = '' }: WordmarkProps) {
  return (
    <Link href={href} className={`inline-flex min-h-11 flex-col justify-center ${className}`}>
      <span className="text-[1.5rem] leading-none font-extrabold tracking-[-0.04em]">SPAN</span>
      {descriptor ? (
        <span className="mt-1 text-[0.6875rem] leading-tight font-medium opacity-80">
          {descriptor}
        </span>
      ) : null}
    </Link>
  )
}

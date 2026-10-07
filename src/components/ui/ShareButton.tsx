'use client'

// Share the current page: the phone's share sheet where available, otherwise copy the link.
import { useState } from 'react'

import { Icon } from '@/components/ui/Icon'

type ShareButtonProps = {
  title: string
  label: string
  copiedLabel: string
}

export function ShareButton({ title, label, copiedLabel }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // Dismissed or unavailable: fall through to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: nothing else to do.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="group press inline-flex min-h-11 items-center gap-2 text-small font-semibold"
    >
      <Icon name={copied ? 'check' : 'share'} size={18} />
      <span className="link-underline" aria-live="polite">
        {copied ? copiedLabel : label}
      </span>
    </button>
  )
}

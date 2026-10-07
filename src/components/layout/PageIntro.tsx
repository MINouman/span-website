// Inner page opening: H1 and an optional lead paragraph. The span line sits above it, under the header.
import type { ReactNode } from 'react'

import { Container } from '@/components/layout/Container'

type PageIntroProps = {
  title: string
  lead?: ReactNode
  children?: ReactNode
}

export function PageIntro({ title, lead, children }: PageIntroProps) {
  return (
    <Container className="pt-12 pb-18 lg:pt-20 lg:pb-28">
      <h1 className="measure text-h1">{title}</h1>
      {lead ? <p className="measure mt-6 text-body-lg text-muted">{lead}</p> : null}
      {children}
    </Container>
  )
}

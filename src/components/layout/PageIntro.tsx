// Inner page opening: H1 and an optional lead paragraph. The span line sits above it, under the header.
import type { CSSProperties, ReactNode } from 'react'

import { Container } from '@/components/layout/Container'

type PageIntroProps = {
  title: string
  lead?: ReactNode
  children?: ReactNode
}

export function PageIntro({ title, lead, children }: PageIntroProps) {
  return (
    <Container className="pt-6 pb-8 lg:pt-10 lg:pb-12">
      <h1 className="rise-in measure text-h1">{title}</h1>
      {lead ? (
        <p
          className="rise-in measure mt-6 text-body-lg text-muted"
          style={{ '--rise-delay': '120ms' } as CSSProperties}
        >
          {lead}
        </p>
      ) : null}
      {children}
    </Container>
  )
}

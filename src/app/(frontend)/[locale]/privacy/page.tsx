// Privacy note (launch checklist). Text comes from the client before launch.
import type { Metadata } from 'next'

import { PageIntro } from '@/components/layout/PageIntro'

export const metadata: Metadata = { title: 'Privacy' }

export default function PrivacyPage() {
  return <PageIntro title="Privacy" lead="[CLIENT] Privacy note." />
}

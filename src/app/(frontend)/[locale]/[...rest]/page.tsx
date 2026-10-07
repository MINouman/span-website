// Any path that matches no page renders the localized 404 inside the site layout.
import { notFound } from 'next/navigation'

export default function CatchAll() {
  notFound()
}

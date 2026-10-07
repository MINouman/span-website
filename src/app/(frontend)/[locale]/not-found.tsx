// 404 page
import { PageIntro } from '@/components/layout/PageIntro'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageIntro title="Page not found" lead="The page you asked for does not exist or has moved.">
      <div className="mt-10">
        <Button href="/projects" variant="secondary">
          View projects
        </Button>
      </div>
    </PageIntro>
  )
}

// sitemap.xml. Static pages now; published projects are added in step 6.
// Only English is listed until Bangla goes live (then add bn URLs and hreflang alternates).
import type { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const staticPaths = ['/', '/projects', '/for-landowners', '/about', '/contact', '/privacy']

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPaths.map((path) => ({
    url: `${siteUrl}${path === '/' ? '' : path}`,
  }))
}

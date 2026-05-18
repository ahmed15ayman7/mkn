import type { MetadataRoute } from 'next'
import { fetchProjectSlugs } from '@/lib/sanity/fetch'
import { absoluteUrl } from '@/lib/utils'
import { routing } from '@/i18n/routing'

const staticSlugs = ['', 'about-us', 'projects', 'contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales

  const staticPages = staticSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: absoluteUrl(`/${locale}${slug ? `/${slug}` : ''}`),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: slug === '' ? 1 : 0.8,
    })),
  )

  let projectPages: MetadataRoute.Sitemap = []

  try {
    const rows = await fetchProjectSlugs()
    projectPages = rows.flatMap((row) =>
      locales.map((locale) => ({
        url: absoluteUrl(`/${locale}/projects/${row.slug}`),
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
    )
  } catch {
    /* Sanity unreachable */
  }

  return [...staticPages, ...projectPages]
}

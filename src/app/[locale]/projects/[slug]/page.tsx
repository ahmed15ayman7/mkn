import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchProject, fetchProjectSlugs } from '@/lib/sanity/fetch'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import ProjectHero from '@/components/projects/ProjectHero'
import { absoluteUrl } from '@/lib/utils'

type Props = { params: Promise<{ locale: string; slug: string }> }

export const dynamicParams = true

export async function generateStaticParams() {
  try {
    const rows = await fetchProjectSlugs()
    return rows.flatMap((row) => [
      { locale: 'en', slug: row.slug },
      { locale: 'ar', slug: row.slug },
    ])
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = await fetchProject(slug, locale)
  if (!project) return {}

  const title = typeof project.title === 'string' ? project.title : 'Project'
  const description = typeof project.excerpt === 'string' ? project.excerpt : undefined
  const cover = project.coverImage as { url?: string } | undefined
  const coverUrl = cover?.url

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: coverUrl ? [{ url: coverUrl }] : [],
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical: absoluteUrl(`/${locale}/projects/${slug}`),
      languages: {
        en: absoluteUrl(`/en/projects/${slug}`),
        ar: absoluteUrl(`/ar/projects/${slug}`),
      },
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { locale, slug } = await params
  const project = await fetchProject(slug, locale)
  if (!project) notFound()

  return (
    <>
      <ProjectHero project={project as any} locale={locale} />
      {Array.isArray(project.blocks) && project.blocks.length > 0 && (
        <BlockRenderer blocks={project.blocks as any[]} locale={locale} />
      )}
    </>
  )
}

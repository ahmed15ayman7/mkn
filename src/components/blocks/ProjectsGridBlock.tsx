import Link from 'next/link'
import Image from 'next/image'
import { fetchPublishedProjects } from '@/lib/sanity/fetch'
import { ArrowRight } from 'lucide-react'

interface ProjectsGridBlockProps {
  block: {
    heading?: string
    subheading?: string
    displayMode?: 'all' | 'curated'
    selectedProjects?: Array<{
      id?: string
      _id?: string
      slug?: string
      title?: string
      excerpt?: string
      coverImage?: { url?: string; alt?: string } | null
      projectDetails?: { location?: string }
    }>
    limit?: number
    showDiscoverCta?: boolean
    ctaLabel?: string
  }
  locale: string
}

export default async function ProjectsGridBlock({ block, locale }: ProjectsGridBlockProps) {
  const { heading, subheading, displayMode = 'all', selectedProjects, limit = 6, showDiscoverCta, ctaLabel } = block

  let projects: NonNullable<ProjectsGridBlockProps['block']['selectedProjects']> = []

  if (displayMode === 'curated' && selectedProjects?.length) {
    projects = selectedProjects.filter(Boolean)
  } else {
    projects = await fetchPublishedProjects(limit, locale)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6">
          <div>
            <p className="section-number mb-3">YOUR PORTFOLIO</p>
            {heading && (
              <h2 className="font-display text-charcoal text-5xl lg:text-7xl leading-none">{heading}</h2>
            )}
            {subheading && <p className="text-charcoal/60 mt-4 max-w-md">{subheading}</p>}
          </div>
          {showDiscoverCta && (
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-charcoal hover:text-tan transition-colors shrink-0"
            >
              {ctaLabel || 'DISCOVER ALL'} <ArrowRight size={14} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
          {projects.map((project) => {
            const cover = project.coverImage
            const slug = project.slug
            const pid = project.id ?? project._id ?? slug
            if (!slug) return null
            return (
              <Link
                key={pid}
                href={`/${locale}/projects/${slug}`}
                className="group relative bg-white overflow-hidden aspect-[4/3]"
              >
                {cover?.url && (
                  <Image
                    src={cover.url}
                    alt={cover.alt ?? project.title ?? ''}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-teal/0 group-hover:bg-teal/60 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-display text-2xl leading-tight">{project.title}</p>
                  {project.projectDetails?.location && (
                    <p className="text-white/70 text-xs mt-1 tracking-wide">{project.projectDetails.location}</p>
                  )}
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent group-hover:opacity-0 transition-opacity">
                  <p className="text-white text-sm font-medium">{project.title}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

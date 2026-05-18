import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedProjectBlockProps {
  block: {
    project?: {
      id?: string
      slug?: string
      title?: string
      excerpt?: string
      coverImage?: { url?: string; alt?: string } | null
      projectDetails?: {
        location?: string
        area?: string
        deliveryDate?: string
      }
    } | null
    overrideImage?: { url?: string; alt?: string } | null
    layout?: 'imageLeft' | 'imageRight' | 'fullBleed'
    showDetails?: boolean
  }
  locale: string
}

export default function FeaturedProjectBlock({ block, locale }: FeaturedProjectBlockProps) {
  const { project, overrideImage, layout = 'fullBleed', showDetails } = block

  if (!project?.slug) return null

  const cover = overrideImage?.url
    ? overrideImage
    : project.coverImage?.url
      ? project.coverImage
      : null

  const details = project.projectDetails ?? {}

  if (layout === 'fullBleed') {
    return (
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden flex items-end">
        {cover?.url && (
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title ?? ''}
            fill
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 gradient-overlay-strong" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 w-full">
          {details.deliveryDate && <p className="section-number mb-3">{details.deliveryDate}</p>}
          <h2 className="font-display text-white text-5xl lg:text-7xl leading-none mb-4 max-w-2xl">{project.title}</h2>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
            {showDetails && details.location && <p className="text-white/60 text-sm">{details.location}</p>}
            {showDetails && details.area && <p className="text-white/60 text-sm">{details.area}</p>}
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex items-center gap-2 text-white text-xs font-semibold tracking-widest uppercase hover:text-tan transition-colors"
            >
              SHOW PROJECT <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const isImageLeft = layout === 'imageLeft'

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={cn('relative aspect-[4/3] overflow-hidden', isImageLeft ? 'lg:order-1' : 'lg:order-2')}>
            {cover?.url && (
              <Image
                src={cover.url}
                alt={cover.alt ?? project.title ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            )}
          </div>
          <div className={isImageLeft ? 'lg:order-2' : 'lg:order-1'}>
            <h2 className="font-display text-charcoal text-5xl leading-none mb-4">{project.title}</h2>
            {project.excerpt && <p className="text-charcoal/60 mb-8 leading-relaxed">{project.excerpt}</p>}
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-teal transition-colors"
            >
              SHOW PROJECT <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

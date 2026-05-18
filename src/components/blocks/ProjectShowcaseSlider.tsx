'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ShowcaseProject = {
  id?: string
  slug?: string
  title?: string
  coverImage?: { url?: string; alt?: string } | null
  projectDetails?: { location?: string; area?: string; deliveryDate?: string }
}

interface ProjectShowcaseSliderProps {
  projects: ShowcaseProject[]
  locale: string
}

export default function ProjectShowcaseSlider({ projects, locale }: ProjectShowcaseSliderProps) {
  const [active, setActive] = useState(0)

  if (!projects.length) return null

  const current = projects[active] ?? projects[0]
  const cover = current.coverImage
  const details = current.projectDetails ?? {}
  const meta = [details.location, details.area].filter(Boolean).join(' · ')
  const watermark = current.title?.split(' ')[0] ?? ''

  const go = (dir: -1 | 1) => {
    setActive((i) => (i + dir + projects.length) % projects.length)
  }

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16">
          <div className="relative">
            <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-charcoal/5">
              {cover?.url && (
                <Image
                  key={cover.url}
                  src={cover.url}
                  alt={cover.alt ?? current.title ?? ''}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority={active === 0}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" aria-hidden />

              {watermark && (
                <p
                  aria-hidden
                  className="absolute bottom-4 right-4 font-display text-white/[0.08] text-[5rem] lg:text-[8rem] leading-none select-none pointer-events-none"
                >
                  {watermark}
                </p>
              )}

              <div className="absolute bottom-0 inset-x-0 p-6 lg:p-10">
                {details.deliveryDate && (
                  <p className="section-number text-white/70 mb-2">{details.deliveryDate}</p>
                )}
                <h2 className="font-display text-white text-4xl lg:text-6xl leading-none mb-3">{current.title}</h2>
                {meta && <p className="text-white/60 text-sm mb-4">{meta}</p>}
                {current.slug && (
                  <Link
                    href={`/${locale}/projects/${current.slug}`}
                    className="inline-flex items-center gap-2 text-white text-xs font-semibold tracking-widest uppercase hover:text-tan transition-colors"
                  >
                    SHOW PROJECT <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="w-10 h-10 border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Previous project"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="w-10 h-10 border border-white/40 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                  aria-label="Next project"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <ol className="flex lg:flex-col flex-row flex-wrap gap-2 lg:gap-1 lg:min-w-[3rem] lg:items-end lg:justify-center">
            {projects.map((p, i) => (
              <li key={p.id ?? p.slug ?? i}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  className={cn(
                    'font-display text-2xl lg:text-3xl leading-none tabular-nums transition-colors',
                    i === active ? 'text-charcoal' : 'text-charcoal/25 hover:text-charcoal/50',
                  )}
                  aria-current={i === active ? 'true' : undefined}
                  aria-label={`Project ${i + 1}: ${p.title}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

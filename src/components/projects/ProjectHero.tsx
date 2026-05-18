import Image from 'next/image'

interface ProjectHeroProps {
  project: {
    title: string
    subtitle?: string
    coverImage?: { url?: string; alt?: string } | null
    heroVideo?: { url?: string } | null
    projectDetails?: {
      location?: string
      area?: string
      deliveryDate?: string
      projectType?: string
    }
  }
  locale: string
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const { title, subtitle, coverImage, heroVideo, projectDetails: details } = project
  const cover = typeof coverImage === 'object' ? coverImage : null
  const video = typeof heroVideo === 'object' ? heroVideo : null

  return (
    <section className="relative h-screen min-h-[500px] flex items-end overflow-hidden">
      {video?.url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={cover?.url}
        >
          <source src={video.url} type="video/mp4" />
        </video>
      ) : cover?.url ? (
        <Image
          src={cover.url}
          alt={cover.alt ?? title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-charcoal" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/80" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
        {/* Big DELIVERY-style offset heading */}
        <div className="absolute inset-x-6 lg:inset-x-12 bottom-16 flex items-end justify-between">
          <div>
            {details?.deliveryDate && (
              <p className="section-number mb-3">{details.deliveryDate}</p>
            )}
            <h1 className="font-display text-white text-6xl lg:text-8xl leading-none">{title}</h1>
            {subtitle && <p className="text-white/60 text-sm mt-3">{subtitle}</p>}
            {/* Project meta chips */}
            <div className="flex flex-wrap items-center gap-6 mt-6">
              {details?.location && (
                <span className="text-white/60 text-xs tracking-widest uppercase">{details.location}</span>
              )}
              {details?.area && (
                <span className="text-white/60 text-xs tracking-widest uppercase">{details.area}</span>
              )}
            </div>
          </div>

          {/* Large background typography */}
          <p
            aria-hidden
            className="hidden lg:block font-display text-white/10 text-[8rem] leading-none select-none pointer-events-none"
          >
            {title.split(' ')[0]}
          </p>
        </div>
      </div>
    </section>
  )
}

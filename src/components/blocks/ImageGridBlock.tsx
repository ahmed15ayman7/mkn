import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGridBlockProps {
  block: {
    heading?: string
    images: Array<{ image: { url?: string; alt?: string }; caption?: string }>
    columns?: '2' | '3' | '4'
    layout?: 'grid' | 'masonry'
  }
  locale: string
}

export default function ImageGridBlock({ block }: ImageGridBlockProps) {
  const { heading, images, columns = '3' } = block

  const colClass = { '2': 'sm:grid-cols-2', '3': 'sm:grid-cols-2 lg:grid-cols-3', '4': 'sm:grid-cols-2 lg:grid-cols-4' }[columns]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {heading && (
          <h3 className="font-display text-charcoal text-3xl mb-10">{heading}</h3>
        )}
        <div className={cn('grid grid-cols-1 gap-4', colClass)}>
          {images.map((item, i) => {
            const img = typeof item.image === 'object' ? item.image : null
            return img?.url ? (
              <figure key={i} className="group relative overflow-hidden aspect-[4/3]">
                <Image
                  src={img.url}
                  alt={img.alt ?? item.caption ?? ''}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {item.caption && (
                  <figcaption className="absolute bottom-0 inset-x-0 bg-charcoal/60 text-white text-xs px-4 py-2 translate-y-full group-hover:translate-y-0 transition-transform">
                    {item.caption}
                  </figcaption>
                )}
              </figure>
            ) : null
          })}
        </div>
      </div>
    </section>
  )
}

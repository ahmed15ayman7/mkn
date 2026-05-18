import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/ui/RichText'
import { cn } from '@/lib/utils'

interface AboutSnippetBlockProps {
  block: {
    variant?: 'default' | 'home' | 'splitIntro' | 'delivery'
    background?: 'white' | 'ivory' | 'tan' | 'sage'
    sectionLabel?: string
    heading: string
    body?: any
    image?: { url?: string; alt?: string } | null
    galleryImages?: Array<{ url?: string; alt?: string } | null>
    imagePosition?: 'left' | 'right'
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  locale: string
}

const bgMap = {
  white: 'bg-white',
  ivory: 'bg-ivory',
  tan: 'bg-tan',
  sage: 'bg-sage text-white',
} as const

export default function AboutSnippetBlock({ block }: AboutSnippetBlockProps) {
  const {
    variant = 'default',
    background = 'ivory',
    sectionLabel,
    heading,
    body,
    image,
    galleryImages,
    imagePosition = 'right',
    primaryCta,
    secondaryCta,
  } = block

  const bgClass = bgMap[background] ?? bgMap.ivory
  const isDarkText = background !== 'sage'
  const textClass = isDarkText ? 'text-charcoal' : 'text-white'
  const mutedClass = isDarkText ? 'text-charcoal/70' : 'text-white/80'
  const imgFirst = imagePosition === 'left'

  if (variant === 'splitIntro') {
    return (
      <section className={cn('py-20 lg:py-28', bgClass)}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          <div>
            {sectionLabel && <p className="section-number mb-4">{sectionLabel}</p>}
            <h2 className={cn('font-display text-4xl lg:text-5xl leading-tight uppercase', textClass)}>{heading}</h2>
          </div>
          {body && (
            <div className={cn('text-base leading-relaxed pt-2', mutedClass)}>
              <RichText content={body} />
            </div>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'home') {
    const images = galleryImages?.filter((img) => img?.url) ?? (image?.url ? [image] : [])
    return (
      <section className={cn('py-24 lg:py-32', bgClass)}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            {sectionLabel && <p className="section-number mb-4 text-charcoal/50">{sectionLabel}</p>}
            <h2 className="font-display text-charcoal text-5xl lg:text-6xl leading-none mb-8">{heading}</h2>
            {body && (
              <div className="text-charcoal/70 leading-relaxed mb-10 max-w-lg">
                <RichText content={body} />
              </div>
            )}
            <div className="flex items-center gap-4 flex-wrap">
              {primaryCta?.label && primaryCta.href && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-teal transition-colors"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta?.label && secondaryCta.href && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-charcoal hover:text-white transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 auto-rows-[120px] lg:auto-rows-[140px]">
              {images.slice(0, 3).map((img, i) => (
                <div
                  key={img?.url ?? i}
                  className={cn(
                    'relative overflow-hidden',
                    i === 0 && 'col-span-1 row-span-2',
                    i === 1 && 'col-span-1',
                    i === 2 && 'col-span-1',
                  )}
                >
                  {img?.url && (
                    <Image src={img.url} alt={img.alt ?? heading} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    )
  }

  if (variant === 'delivery') {
    return (
      <section className={cn('py-20 lg:py-28', bgClass)}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {body && (
              <div className={cn('text-base leading-relaxed mb-8 max-w-md', mutedClass)}>
                <RichText content={body} />
              </div>
            )}
            {primaryCta?.label && primaryCta.href && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-charcoal text-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-teal transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
          </div>
          <div className="lg:text-right">
            {sectionLabel && <p className={cn('section-number mb-2', mutedClass)}>{sectionLabel}</p>}
            <h2 className={cn('font-display text-6xl lg:text-8xl leading-none uppercase', textClass)}>{heading}</h2>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('py-24', bgClass)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={imgFirst ? 'lg:order-2' : 'lg:order-1'}>
            {sectionLabel && <p className="section-number mb-4">{sectionLabel}</p>}
            <h2 className={cn('font-display text-5xl lg:text-6xl leading-none mb-8', textClass)}>{heading}</h2>
            {body && (
              <div className={cn('leading-relaxed mb-10', mutedClass)}>
                <RichText content={body} />
              </div>
            )}
            <div className="flex items-center gap-4 flex-wrap">
              {primaryCta?.label && primaryCta.href && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 bg-charcoal text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-teal transition-colors"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta?.label && secondaryCta.href && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 border border-charcoal text-charcoal px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-charcoal hover:text-white transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          </div>

          {image?.url && (
            <div className={`relative aspect-square lg:aspect-[4/5] overflow-hidden ${imgFirst ? 'lg:order-1' : 'lg:order-2'}`}>
              <Image src={image.url} alt={image.alt ?? heading} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

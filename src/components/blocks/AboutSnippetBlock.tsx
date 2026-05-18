import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/ui/RichText'

interface AboutSnippetBlockProps {
  block: {
    sectionLabel?: string
    heading: string
    body?: any
    image?: { url?: string; alt?: string } | null
    imagePosition?: 'left' | 'right'
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  locale: string
}

export default function AboutSnippetBlock({ block }: AboutSnippetBlockProps) {
  const { sectionLabel, heading, body, image, imagePosition = 'right', primaryCta, secondaryCta } = block
  const imgFirst = imagePosition === 'left'

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imgFirst ? '' : ''}`}>
          {/* Text */}
          <div className={imgFirst ? 'lg:order-2' : 'lg:order-1'}>
            {sectionLabel && (
              <p className="section-number mb-4">{sectionLabel}</p>
            )}
            <h2 className="font-display text-charcoal text-5xl lg:text-6xl leading-none mb-8">
              {heading}
            </h2>
            {body && (
              <div className="text-charcoal/70 leading-relaxed mb-10">
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

          {/* Image */}
          {image?.url && (
            <div className={`relative aspect-square lg:aspect-[4/5] overflow-hidden ${imgFirst ? 'lg:order-1' : 'lg:order-2'}`}>
              <Image
                src={image.url}
                alt={image.alt ?? heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

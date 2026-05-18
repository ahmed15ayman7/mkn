import Image from 'next/image'
import Link from 'next/link'
import RichText from '@/components/ui/RichText'
import { cn } from '@/lib/utils'

interface AboutSnippetBlockProps {
  block: {
    introLayout?: 'split' | 'aboutIntro'
    sectionLabel?: string
    heading: string
    body?: unknown
    image?: { url?: string; alt?: string } | null
    imagePosition?: 'left' | 'right'
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  locale: string
}

export default function AboutSnippetBlock({ block }: AboutSnippetBlockProps) {
  const {
    introLayout = 'split',
    sectionLabel,
    heading,
    body,
    image,
    imagePosition = 'right',
    primaryCta,
    secondaryCta,
  } = block
  const imgFirst = imagePosition === 'left'

  if (introLayout === 'aboutIntro') {
    return (
      <section className="py-16 lg:py-24 bg-white border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-3">
              {sectionLabel && (
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-gold">{sectionLabel}</p>
              )}
              <h2 className="font-display text-charcoal text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-none">
                {heading}
              </h2>
            </div>
            <div className="lg:col-span-8">
              {Array.isArray(body) && body.length > 0 ? (
                <div className="text-charcoal/75 leading-[1.85] text-base lg:text-lg">
                  <RichText content={body} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${imgFirst ? '' : ''}`}>
          <div className={imgFirst ? 'lg:order-2' : 'lg:order-1'}>
            {sectionLabel && <p className="section-number mb-4">{sectionLabel}</p>}
            <h2 className="font-display text-charcoal text-5xl lg:text-6xl leading-none mb-8">{heading}</h2>
            {Array.isArray(body) && body.length > 0 ? (
              <div className="text-charcoal/70 leading-relaxed mb-10">
                <RichText content={body} />
              </div>
            ) : null}
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
            <div className={cn('relative aspect-square lg:aspect-[4/5] overflow-hidden', imgFirst ? 'lg:order-1' : 'lg:order-2')}>
              <Image src={image.url} alt={image.alt ?? heading} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

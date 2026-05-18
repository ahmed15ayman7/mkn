import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTABlockProps {
  block: {
    heading: string
    subheading?: string
    eyebrow?: string
    backgroundImage?: { url?: string } | null
    primaryCta: { label: string; href: string }
    secondaryCta?: { label?: string; href?: string }
    background?: 'dark' | 'tan' | 'image'
    layout?: 'centered' | 'banner' | 'careers'
  }
  locale: string
}

export default function CTABlock({ block }: CTABlockProps) {
  const {
    heading,
    subheading,
    eyebrow,
    backgroundImage,
    primaryCta,
    secondaryCta,
    background = 'dark',
    layout = 'centered',
  } = block

  const isDark = background === 'dark'
  const isTan = background === 'tan'
  const isImage = background === 'image' && backgroundImage?.url

  if (layout === 'careers') {
    return (
      <section className="relative py-24 lg:py-32 overflow-hidden bg-charcoal">
        {isImage && backgroundImage?.url && (
          <>
            <Image src={backgroundImage.url} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-charcoal/75" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-8">
          <h2 className="font-display text-white text-3xl lg:text-4xl leading-tight">{heading}</h2>
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 border border-white/50 text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-white/10 transition-colors shrink-0"
          >
            {primaryCta.label} <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    )
  }

  if (layout === 'banner') {
    return (
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-charcoal">
        {isImage && backgroundImage?.url && (
          <>
            <Image src={backgroundImage.url} alt="" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 bg-charcoal/50" />
          </>
        )}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-24 w-full">
          {eyebrow && <p className="section-number text-white/60 mb-4">{eyebrow}</p>}
          <h2 className="font-display text-white text-4xl sm:text-5xl lg:text-7xl leading-tight max-w-4xl mb-8">
            {heading}
          </h2>
          {subheading && (
            <p className="text-white/70 text-sm lg:text-base max-w-xl mb-8 leading-relaxed">{subheading}</p>
          )}
          <Link
            href={primaryCta.href}
            className="inline-flex items-center gap-2 bg-charcoal border border-white/30 text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-charcoal transition-colors"
          >
            {primaryCta.label}
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className={cn('relative py-32 overflow-hidden', isDark && 'bg-charcoal', isTan && 'bg-tan', isImage && 'bg-charcoal')}>
      {isImage && backgroundImage?.url && (
        <>
          <Image src={backgroundImage.url} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </>
      )}
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className={cn('font-display text-6xl lg:text-8xl leading-none mb-6', isDark || isImage ? 'text-white' : 'text-charcoal')}>
          {heading}
        </h2>
        {subheading && (
          <p className={cn('text-base leading-relaxed mb-10', isDark || isImage ? 'text-white/60' : 'text-charcoal/60')}>
            {subheading}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href={primaryCta.href}
            className={cn(
              'inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold tracking-widest uppercase transition-colors',
              isDark || isImage
                ? 'bg-tan text-charcoal hover:bg-tan-dark'
                : 'bg-charcoal text-white hover:bg-teal',
            )}
          >
            {primaryCta.label}
          </Link>
          {secondaryCta?.label && secondaryCta.href && (
            <Link
              href={secondaryCta.href}
              className={cn(
                'inline-flex items-center gap-2 px-8 py-3 text-xs font-semibold tracking-widest uppercase border transition-colors',
                isDark || isImage
                  ? 'border-white/40 text-white hover:border-white hover:bg-white/10'
                  : 'border-charcoal text-charcoal hover:bg-charcoal hover:text-white',
              )}
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

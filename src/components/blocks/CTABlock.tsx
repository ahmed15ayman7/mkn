import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CTABlockProps {
  block: {
    heading: string
    subheading?: string
    backgroundImage?: { url?: string } | null
    primaryCta: { label: string; href: string }
    secondaryCta?: { label?: string; href?: string }
    background?: 'dark' | 'tan' | 'image'
  }
  locale: string
}

export default function CTABlock({ block }: CTABlockProps) {
  const { heading, subheading, backgroundImage, primaryCta, secondaryCta, background = 'dark' } = block

  const isDark = background === 'dark'
  const isTan = background === 'tan'
  const isImage = background === 'image' && backgroundImage?.url

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

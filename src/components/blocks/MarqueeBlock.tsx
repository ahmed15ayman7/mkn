import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MarqueeBlockProps {
  block: {
    layout?: 'ticker' | 'banner'
    bannerImage?: { url?: string; alt?: string } | null
    bannerText?: string
    items: Array<{ text: string }>
    speed?: 'slow' | 'medium' | 'fast'
    background?: 'dark' | 'tan' | 'white'
  }
  locale: string
}

export default function MarqueeBlock({ block }: MarqueeBlockProps) {
  const { layout = 'ticker', bannerImage, bannerText, items, speed = 'medium', background = 'dark' } = block

  if (layout === 'banner' && (bannerImage?.url || bannerText)) {
    return (
      <section className="relative min-h-[200px] md:min-h-[260px] flex items-center justify-center overflow-hidden">
        {bannerImage?.url ? (
          <>
            <Image src={bannerImage.url} alt={bannerImage.alt ?? ''} fill className="object-cover grayscale contrast-[1.02]" sizes="100vw" />
            <div className="absolute inset-0 bg-charcoal/55" />
          </>
        ) : (
          <div className="absolute inset-0 bg-charcoal" />
        )}
        {bannerText && (
          <p className="relative z-10 px-6 text-center font-display text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] uppercase max-w-6xl leading-tight">
            {bannerText}
          </p>
        )}
      </section>
    )
  }

  const bgClass = { dark: 'bg-charcoal', tan: 'bg-tan', white: 'bg-white' }[background]
  const textClass = background === 'dark' ? 'text-white/40' : 'text-charcoal/40'
  const separatorClass = background === 'dark' ? 'text-white/20' : 'text-charcoal/20'

  const durationClass = { slow: '[--duration:50s]', medium: '[--duration:30s]', fast: '[--duration:15s]' }[speed]

  const repeated = items?.length ? [...items, ...items] : []

  if (repeated.length === 0) {
    return null
  }

  return (
    <section className={cn('py-6 overflow-hidden', bgClass)}>
      <div className={cn('flex whitespace-nowrap animate-marquee', durationClass)}>
        {repeated.map((item, i) => (
          <span key={i} className={cn('inline-flex items-center font-display text-xl tracking-widest uppercase', textClass)}>
            {item.text}
            <span className={cn('mx-6 text-2xl', separatorClass)}>•</span>
          </span>
        ))}
      </div>
    </section>
  )
}

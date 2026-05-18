import { cn } from '@/lib/utils'

interface MarqueeBlockProps {
  block: {
    items: Array<{ text: string }>
    speed?: 'slow' | 'medium' | 'fast'
    background?: 'dark' | 'tan' | 'white'
  }
  locale: string
}

export default function MarqueeBlock({ block }: MarqueeBlockProps) {
  const { items, speed = 'medium', background = 'dark' } = block

  const bgClass = { dark: 'bg-charcoal', tan: 'bg-tan', white: 'bg-white' }[background]
  const textClass = background === 'dark' ? 'text-white/40' : 'text-charcoal/40'
  const separatorClass = background === 'dark' ? 'text-white/20' : 'text-charcoal/20'

  const durationClass = { slow: '[--duration:50s]', medium: '[--duration:30s]', fast: '[--duration:15s]' }[speed]

  const repeated = [...items, ...items]

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

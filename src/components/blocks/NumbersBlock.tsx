import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NumbersBlockProps {
  block: {
    label?: string
    stats: Array<{ value: string; label: string; description?: string }>
    background?: 'white' | 'dark' | 'tan'
    showCtas?: boolean
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  locale: string
}

export default function NumbersBlock({ block }: NumbersBlockProps) {
  const { label, stats, background = 'white', showCtas, primaryCta, secondaryCta } = block

  const bgClass = {
    white: 'bg-white',
    dark: 'bg-charcoal text-white',
    tan: 'bg-tan',
  }[background]

  const textClass = background === 'dark' ? 'text-white' : 'text-charcoal'
  const mutedClass = background === 'dark' ? 'text-white/50' : 'text-charcoal/50'

  return (
    <section className={cn('py-24', bgClass)}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Label + heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            {label && <p className="section-number mb-4">{label}</p>}
            <h2 className={cn('font-display text-7xl lg:text-9xl leading-none', textClass)}>
              OUR<br />NUMBERS
            </h2>
          </div>

          {showCtas && (
            <div className="flex items-center gap-4 flex-wrap lg:pb-4">
              {primaryCta?.label && primaryCta.href && (
                <Link
                  href={primaryCta.href}
                  className="inline-flex items-center gap-2 border border-current px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-white hover:text-charcoal transition-colors"
                >
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta?.label && secondaryCta.href && (
                <Link
                  href={secondaryCta.href}
                  className="inline-flex items-center gap-2 bg-tan text-charcoal px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-tan-dark transition-colors"
                >
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-current/10 pt-12">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className={cn('font-display text-5xl', textClass)}>{stat.value}</p>
              <p className={cn('font-semibold text-sm tracking-widest uppercase', textClass)}>{stat.label}</p>
              {stat.description && <p className={cn('text-sm leading-relaxed', mutedClass)}>{stat.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

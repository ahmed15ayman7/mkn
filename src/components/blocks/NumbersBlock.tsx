import Link from 'next/link'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NumbersBlockProps {
  block: {
    label?: string
    statsHeading?: string
    showIntroPills?: boolean
    pillMissionLabel?: string
    pillVisionLabel?: string
    pillMissionAnchor?: string
    pillVisionAnchor?: string
    showPlayCircle?: boolean
    playCircleHref?: string
    stats: Array<{ value: string; label: string; description?: string }>
    background?: 'white' | 'dark' | 'tan'
    showCtas?: boolean
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
  locale: string
}

function headingLines(statsHeading: string | undefined): [string, string] {
  const raw = (statsHeading ?? 'OUR NUMBERS').trim()
  const parts = raw.split(/\s+/)
  if (parts.length <= 1) return [raw, '']
  const mid = Math.ceil(parts.length / 2)
  return [parts.slice(0, mid).join(' '), parts.slice(mid).join(' ')]
}

export default function NumbersBlock({ block }: NumbersBlockProps) {
  const {
    label,
    statsHeading,
    showIntroPills,
    pillMissionLabel,
    pillVisionLabel,
    pillMissionAnchor,
    pillVisionAnchor,
    showPlayCircle,
    playCircleHref,
    stats,
    background = 'white',
    showCtas,
    primaryCta,
    secondaryCta,
  } = block

  const bgClass = {
    white: 'bg-white',
    dark: 'bg-charcoal text-white',
    tan: 'bg-tan',
  }[background]

  const isTan = background === 'tan'
  const headingColor = isTan ? 'text-navy' : background === 'dark' ? 'text-white' : 'text-charcoal'
  const mutedClass = background === 'dark' ? 'text-white/55' : isTan ? 'text-navy/70' : 'text-charcoal/55'
  const [headLine1, headLine2] = headingLines(statsHeading)

  const playHref = playCircleHref?.startsWith('#') ? playCircleHref : playCircleHref ? `#${playCircleHref}` : '#'
  const missionHref = pillMissionAnchor ? `#${pillMissionAnchor.replace(/^#/, '')}` : '#'
  const visionHref = pillVisionAnchor ? `#${pillVisionAnchor.replace(/^#/, '')}` : '#'

  return (
    <section className={cn('relative py-20 lg:py-28 overflow-hidden', bgClass)}>
      {isTan && (
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-[28%] max-w-md opacity-[0.07] select-none font-display text-navy text-[clamp(3rem,8vw,7rem)] leading-none tracking-tighter flex flex-col justify-around py-8"
          aria-hidden
        >
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="block whitespace-nowrap text-right pr-4">
              {'MKN '.repeat(6)}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-12 mb-10 lg:mb-14">
          <div className="flex justify-start lg:pt-2">
            {showPlayCircle && (
              <Link
                href={playHref}
                className={cn(
                  'flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  isTan ? 'border-navy text-navy hover:bg-navy hover:text-white' : 'border-current hover:bg-white/10',
                )}
                aria-label="Play introduction"
              >
                <Play className="h-7 w-7 ml-0.5" fill="currentColor" />
              </Link>
            )}
          </div>

          <div className="lg:text-right lg:max-w-3xl lg:flex-1">
            {label && <p className="section-number mb-3 lg:text-right">{label}</p>}
            <h2 className={cn('font-display leading-[0.92] uppercase tracking-tight', headingColor)}>
              <span className="block text-5xl sm:text-6xl lg:text-8xl">{headLine1}</span>
              {headLine2 && <span className="block text-5xl sm:text-6xl lg:text-8xl mt-1">{headLine2}</span>}
            </h2>
          </div>
        </div>

        {showIntroPills && (pillMissionLabel || pillVisionLabel) && (
          <div className="flex flex-wrap gap-3 mb-12 lg:mb-14 lg:justify-end">
            {pillMissionLabel && (
              <Link
                href={missionHref}
                className={cn(
                  'inline-flex px-6 py-2.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase rounded-full border transition-colors',
                  isTan ? 'border-navy text-navy hover:bg-navy hover:text-tan' : 'border-charcoal/25 hover:bg-charcoal hover:text-white',
                )}
              >
                {pillMissionLabel}
              </Link>
            )}
            {pillVisionLabel && (
              <Link
                href={visionHref}
                className={cn(
                  'inline-flex px-6 py-2.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase rounded-full border transition-colors',
                  isTan ? 'border-navy text-navy hover:bg-navy hover:text-tan' : 'border-charcoal/25 hover:bg-charcoal hover:text-white',
                )}
              >
                {pillVisionLabel}
              </Link>
            )}
          </div>
        )}

        {showCtas && (
          <div className="flex items-center gap-4 flex-wrap mb-12">
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

        <div
          className={cn(
            'grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-12 pt-10 border-t',
            isTan ? 'border-navy/15' : 'border-current/10',
          )}
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col gap-3">
              <p className={cn('font-display text-5xl sm:text-6xl tracking-tight', headingColor)}>{stat.value}</p>
              <p className={cn('font-semibold text-xs tracking-[0.2em] uppercase', headingColor)}>{stat.label}</p>
              {stat.description && <p className={cn('text-sm leading-relaxed max-w-xs', mutedClass)}>{stat.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

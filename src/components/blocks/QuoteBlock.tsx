import Image from 'next/image'
import { cn } from '@/lib/utils'

interface QuoteBlockProps {
  block: {
    quote: string
    attribution?: string
    portrait?: { url?: string; alt?: string } | null
    background?: 'dark' | 'ivory' | 'tan'
  }
  locale: string
}

export default function QuoteBlock({ block }: QuoteBlockProps) {
  const { quote, attribution, portrait, background = 'dark' } = block

  const bgClass = { dark: 'bg-charcoal text-white', ivory: 'bg-ivory text-charcoal', tan: 'bg-tan text-charcoal' }[background]

  return (
    <section className={cn('py-24', bgClass)}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center gap-8">
        <blockquote className="text-xl lg:text-2xl leading-relaxed font-light italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {(attribution || portrait?.url) && (
          <div className="flex items-center gap-4">
            {portrait?.url && (
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                <Image src={portrait.url} alt={attribution ?? ''} fill className="object-cover" />
              </div>
            )}
            {attribution && (
              <p className="text-sm font-semibold tracking-wide opacity-70">{attribution}</p>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

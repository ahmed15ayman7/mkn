import Image from 'next/image'
import RichText from '@/components/ui/RichText'
import { cn } from '@/lib/utils'

interface Card {
  label: string
  heading: string
  body?: unknown
  image?: { url?: string; alt?: string } | null
  imagePosition?: 'left' | 'right'
  anchorId?: string
}

interface MissionVisionBlockProps {
  block: { cards: Card[] }
  locale: string
}

export default function MissionVisionBlock({ block }: MissionVisionBlockProps) {
  const { cards } = block

  return (
    <section className="py-20 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-24 lg:space-y-32">
        {cards.map((card, i) => {
          const imgLeft = card.imagePosition === 'left'
          const fragment = card.anchorId?.replace(/^#/, '')
          return (
            <div key={i} id={fragment} className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className={cn(imgLeft ? 'lg:order-2' : 'lg:order-1')}>
                <p className="section-number mb-3">{card.label}</p>
                <h3 className="font-display text-charcoal text-4xl lg:text-5xl uppercase tracking-tight leading-none mb-8">{card.heading}</h3>
                {Array.isArray(card.body) && card.body.length > 0 ? (
                  <div className="text-charcoal/70 leading-relaxed text-base lg:text-lg max-w-none [&_ul]:my-4 [&_li]:my-1 [&_ul]:list-disc [&_ul]:pl-6">
                    <RichText content={card.body} />
                  </div>
                ) : null}
              </div>
              {card.image?.url && (
                <div className={cn('relative mx-auto w-full max-w-lg', imgLeft ? 'lg:order-1' : 'lg:order-2')}>
                  <div className="relative aspect-square overflow-hidden bg-charcoal/5">
                    <Image
                      src={card.image.url}
                      alt={card.image.alt ?? card.heading}
                      fill
                      className="object-cover grayscale-[0.25]"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                    <div
                      className="pointer-events-none absolute inset-[12%] border-2 border-white/90 rotate-45 shadow-[0_0_0_1px_rgba(255,255,255,0.35)_inset]"
                      aria-hidden
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

import Image from 'next/image'

interface Card {
  label: string
  heading: string
  body?: string
  image?: { url?: string; alt?: string } | null
  imagePosition?: 'left' | 'right'
}

interface MissionVisionBlockProps {
  block: { cards: Card[] }
  locale: string
}

export default function MissionVisionBlock({ block }: MissionVisionBlockProps) {
  const { cards } = block

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-20">
        {cards.map((card, i) => {
          const imgLeft = card.imagePosition === 'left'
          return (
            <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={imgLeft ? 'lg:order-2' : 'lg:order-1'}>
                <p className="section-number mb-3">{card.label}</p>
                <h3 className="font-display text-charcoal text-4xl lg:text-5xl leading-none mb-6">{card.heading}</h3>
                {card.body && <p className="text-charcoal/60 leading-relaxed">{card.body}</p>}
              </div>
              {card.image?.url && (
                <div className={`relative aspect-square overflow-hidden ${imgLeft ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Image src={card.image.url} alt={card.image.alt ?? card.heading} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

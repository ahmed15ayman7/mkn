import Image from 'next/image'

interface ChairmanMessageBlockProps {
  block: {
    sectionLabel?: string
    quote: string
    attribution?: string
    portrait?: { url?: string; alt?: string } | null
    backgroundImage?: { url?: string } | null
  }
  locale: string
}

export default function ChairmanMessageBlock({ block }: ChairmanMessageBlockProps) {
  const { sectionLabel, quote, attribution, portrait, backgroundImage } = block

  return (
    <section className="relative py-24 bg-ivory overflow-hidden">
      {backgroundImage?.url && (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image src={backgroundImage.url} alt="" fill className="object-cover opacity-30" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          {sectionLabel && <p className="section-number mb-6">{sectionLabel}</p>}
          <blockquote className="text-charcoal text-xl lg:text-2xl leading-relaxed font-light italic mb-10">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-4">
            {portrait?.url && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image src={portrait.url} alt={attribution ?? ''} fill className="object-cover" />
              </div>
            )}
            {attribution && (
              <div>
                <p className="text-charcoal font-semibold text-sm">{attribution}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

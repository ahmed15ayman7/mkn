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
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      {backgroundImage?.url && (
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block opacity-[0.06]">
          <Image src={backgroundImage.url} alt="" fill className="object-cover grayscale" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {portrait?.url && (
            <div className="relative w-full max-w-md mx-auto lg:mx-0 aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-ivory-dark">
              <Image src={portrait.url} alt={portrait.alt ?? attribution ?? ''} fill className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 40vw" priority={false} />
            </div>
          )}
          <div className="flex flex-col justify-center text-center lg:text-left lg:pl-4">
            {sectionLabel && (
              <p className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-gold mb-8">{sectionLabel}</p>
            )}
            <blockquote className="text-charcoal text-xl sm:text-2xl lg:text-[1.65rem] leading-relaxed font-light mb-12 max-w-xl mx-auto lg:mx-0">
              <span className="text-gold/90 font-serif text-4xl leading-none mr-1">&ldquo;</span>
              {quote}
              <span className="text-gold/90 font-serif text-4xl leading-none ml-1">&rdquo;</span>
            </blockquote>
            {attribution && (
              <p className="font-display text-charcoal text-2xl lg:text-3xl tracking-wide uppercase">{attribution}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

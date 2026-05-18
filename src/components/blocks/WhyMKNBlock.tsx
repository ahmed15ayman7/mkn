import Image from 'next/image'
import RichText from '@/components/ui/RichText'

interface WhyMKNBlockProps {
  block: {
    heading: string
    body?: unknown
    backgroundImage?: { url?: string; alt?: string } | null
  }
  locale: string
}

export default function WhyMKNBlock({ block }: WhyMKNBlockProps) {
  const { heading, body, backgroundImage } = block

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden bg-charcoal">
      {backgroundImage?.url && (
        <>
          <Image src={backgroundImage.url} alt={backgroundImage.alt ?? ''} fill className="object-cover opacity-40 grayscale" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/85 to-charcoal" />
        </>
      )}
      {!backgroundImage?.url && <div className="absolute inset-0 bg-charcoal" />}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-display text-white text-5xl sm:text-6xl lg:text-[clamp(3.5rem,9vw,8rem)] uppercase tracking-tight leading-none mb-14 lg:mb-16 max-w-5xl">
          {heading}
        </h2>
        {Array.isArray(body) && body.length > 0 ? (
          <div className="text-white/85 text-base lg:text-lg leading-[1.85] max-w-5xl columns-1 md:columns-2 md:gap-x-14 [&_p]:mb-4 [&_p]:break-inside-avoid">
            <RichText content={body} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

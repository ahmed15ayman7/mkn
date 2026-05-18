import Image from 'next/image'
import RichText from '@/components/ui/RichText'

interface WhyMKNBlockProps {
  block: {
    heading: string
    body?: any
    backgroundImage?: { url?: string } | null
  }
  locale: string
}

export default function WhyMKNBlock({ block }: WhyMKNBlockProps) {
  const { heading, body, backgroundImage } = block

  return (
    <section className="relative py-32 overflow-hidden bg-charcoal">
      {backgroundImage?.url && (
        <>
          <Image src={backgroundImage.url} alt="" fill className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-charcoal/60" />
        </>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="font-display text-white text-7xl lg:text-9xl leading-none mb-12">{heading}</h2>
        {body && (
          <div className="text-white/60 text-base lg:text-lg leading-relaxed max-w-2xl prose prose-invert">
            <RichText content={body} />
          </div>
        )}
      </div>
    </section>
  )
}

import Image from 'next/image'
import { fetchPartners } from '@/lib/sanity/fetch'

interface PartnersBlockProps {
  block: {
    heading?: string
    overridePartners?: Array<{
      id?: string
      _id?: string
      name?: string
      url?: string | null
      logo?: { url?: string; alt?: string } | null
    }>
  }
  locale: string
}

export default async function PartnersBlock({ block }: PartnersBlockProps) {
  const { heading, overridePartners } = block

  let partners: PartnersBlockProps['block']['overridePartners'] = []

  if (overridePartners?.length) {
    partners = overridePartners.filter(Boolean)
  } else {
    partners = await fetchPartners()
  }

  if (!partners?.length) return null

  return (
    <section className="py-20 bg-ivory-dark border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {heading && <p className="section-number mb-10 text-center">{heading}</p>}
        <div className="flex flex-wrap items-center justify-center gap-12">
          {partners.map((partner) => {
            const logo = partner?.logo
            const key = partner.id ?? partner._id ?? partner.name
            return logo?.url ? (
              <a
                key={key}
                href={partner.url ?? '#'}
                target={partner.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              >
                <Image
                  src={logo.url}
                  alt={partner.name ?? ''}
                  width={120}
                  height={48}
                  className="h-10 w-auto object-contain"
                />
              </a>
            ) : (
              <span key={key} className="text-charcoal/40 font-semibold text-sm tracking-widest uppercase">
                {partner.name}
              </span>
            )
          })}
        </div>
      </div>
    </section>
  )
}

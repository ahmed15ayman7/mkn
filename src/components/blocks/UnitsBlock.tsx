import Image from 'next/image'

interface Unit {
  type: string
  area?: string
  bedrooms?: number
  bathrooms?: number
  floorPlan?: { url?: string; alt?: string } | null
  description?: string
  priceFrom?: string
}

interface UnitsBlockProps {
  block: { heading?: string; units: Unit[] }
  locale: string
}

export default function UnitsBlock({ block }: UnitsBlockProps) {
  const { heading, units } = block

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {heading && <h2 className="font-display text-charcoal text-5xl mb-14">{heading}</h2>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {units.map((unit, i) => (
            <div key={i} className="border border-charcoal/10 p-6 flex flex-col gap-4">
              {unit.floorPlan?.url && (
                <div className="relative aspect-[4/3] overflow-hidden bg-ivory">
                  <Image src={unit.floorPlan.url} alt={unit.floorPlan.alt ?? unit.type} fill className="object-contain p-4" />
                </div>
              )}
              <h3 className="font-display text-charcoal text-2xl">{unit.type}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-charcoal/60">
                {unit.area && <div><span className="font-semibold text-charcoal">Area:</span> {unit.area}</div>}
                {unit.bedrooms != null && <div><span className="font-semibold text-charcoal">Beds:</span> {unit.bedrooms}</div>}
                {unit.bathrooms != null && <div><span className="font-semibold text-charcoal">Baths:</span> {unit.bathrooms}</div>}
              </div>
              {unit.description && <p className="text-charcoal/60 text-sm leading-relaxed">{unit.description}</p>}
              {unit.priceFrom && (
                <p className="text-tan font-semibold text-sm mt-auto">From {unit.priceFrom}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

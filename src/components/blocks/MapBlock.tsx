import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface NearbyPlace {
  name: string
  distance?: string
  category?: string
}

interface MapBlockProps {
  block: {
    heading?: string
    address?: string
    mapImage?: { url?: string; alt?: string } | null
    googleMapsUrl?: string
    nearbyPlaces?: NearbyPlace[]
  }
  locale: string
}

export default function MapBlock({ block }: MapBlockProps) {
  const { heading, address, mapImage, googleMapsUrl, nearbyPlaces } = block

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {heading && <h2 className="font-display text-charcoal text-5xl mb-10">{heading}</h2>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Map */}
          <div className="lg:col-span-2">
            {mapImage?.url ? (
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={mapImage.url} alt={mapImage.alt ?? 'Location map'} fill className="object-cover" />
              </div>
            ) : (
              <div className="aspect-[16/9] bg-charcoal/10 flex items-center justify-center">
                <p className="text-charcoal/30 text-sm">Map unavailable</p>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            {address && (
              <div>
                <div className="flex items-start gap-2 text-charcoal">
                  <MapPin size={16} className="mt-1 text-tan shrink-0" />
                  <p className="leading-relaxed">{address}</p>
                </div>
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-xs font-semibold tracking-widest uppercase text-tan hover:text-tan-dark transition-colors"
                  >
                    GET DIRECTIONS
                  </a>
                )}
              </div>
            )}
            {nearbyPlaces && nearbyPlaces.length > 0 && (
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-charcoal/40 mb-4">Nearby</p>
                <ul className="space-y-3">
                  {nearbyPlaces.map((place, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <span className="text-charcoal">{place.name}</span>
                      {place.distance && <span className="text-charcoal/40">{place.distance}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

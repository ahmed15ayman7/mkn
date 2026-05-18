import Link from 'next/link'
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react'
import { fetchSiteFooter } from '@/lib/sanity/fetch'

const SOCIAL_LABELS: Record<string, string> = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  snapchat: 'Snapchat',
}

interface ContactInfoBlockProps {
  block: {
    useSiteFooter?: boolean
    getInTouchHeading?: string
    phones?: string[]
    workingHours?: string
    headOfficeHeading?: string
    address?: string
    directionsLabel?: string
    directionsUrl?: string
    socialHeading?: string
  }
  locale: string
}

export default async function ContactInfoBlock({ block, locale }: ContactInfoBlockProps) {
  const footer = block.useSiteFooter !== false ? await fetchSiteFooter(locale) : null
  const office = footer?.headOffice as Record<string, string> | undefined
  const socialLinks = (footer?.socialLinks as Array<{ platform?: string; url?: string }>) ?? []

  const getInTouchHeading = block.getInTouchHeading ?? 'Get In Touch'
  const phones = block.phones?.length
    ? block.phones
    : [office?.phone, office?.altPhone].filter(Boolean) as string[]
  const workingHours = block.workingHours ?? office?.workingHours
  const headOfficeHeading = block.headOfficeHeading ?? 'Head Office'
  const address = block.address ?? office?.address
  const directionsUrl = block.directionsUrl ?? office?.googleMapsUrl
  const directionsLabel = block.directionsLabel ?? 'GET DIRECTION'
  const socialHeading = block.socialHeading ?? 'Social Media'

  return (
    <section className="py-16 lg:py-20 bg-white border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        <div>
          <h2 className="font-display text-charcoal text-2xl mb-6">{getInTouchHeading}</h2>
          <ul className="space-y-4">
            {phones.map((phone) => (
              <li key={phone} className="flex items-start gap-3">
                <Phone size={18} className="text-tan shrink-0 mt-0.5" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm text-charcoal/80 hover:text-teal transition-colors">
                  {phone}
                </a>
              </li>
            ))}
            {workingHours && (
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-tan shrink-0 mt-0.5" />
                <span className="text-sm text-charcoal/60 leading-relaxed">{workingHours}</span>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-charcoal text-2xl mb-6">{headOfficeHeading}</h2>
          {address && (
            <div className="flex items-start gap-3 mb-4">
              <MapPin size={18} className="text-tan shrink-0 mt-0.5" />
              <p className="text-sm text-charcoal/60 leading-relaxed whitespace-pre-line">{address}</p>
            </div>
          )}
          {directionsUrl && (
            <Link
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-charcoal hover:text-teal transition-colors"
            >
              {directionsLabel} <ArrowUpRight size={14} />
            </Link>
          )}
        </div>

        <div>
          <h2 className="font-display text-charcoal text-2xl mb-6">{socialHeading}</h2>
          <ul className="space-y-3">
            {socialLinks.map((link) => {
              if (!link.url) return null
              const label = SOCIAL_LABELS[link.platform ?? ''] ?? link.platform ?? 'Link'
              return (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-charcoal/70 hover:text-teal transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'

const platformIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
  x: Twitter,
}

interface FooterProps {
  footer: Record<string, any> | null
  locale: string
}

export default function SiteFooter({ footer, locale }: FooterProps) {
  const f = footer ?? {}
  const columns = (f.quickLinksColumns as any[]) ?? []
  const social = (f.socialLinks as any[]) ?? []
  const office = f.headOffice ?? {}

  return (
    <footer className="bg-charcoal text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand column */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {f.logo?.url ? (
            <Image src={f.logo.url} alt="MKN" width={80} height={56} className="h-14 w-auto object-contain" />
          ) : (
            <span className="font-display text-white text-2xl tracking-widest">MKN</span>
          )}
          {f.description && <p className="leading-relaxed">{f.description}</p>}
        </div>

        {/* Quick links columns */}
        {columns.map((col: any, i: number) => (
          <div key={i}>
            <p className="text-white font-semibold tracking-widest text-xs uppercase mb-4">
              {col.heading}
            </p>
            <ul className="space-y-2">
              {(col.links ?? []).map((link: any, j: number) => (
                <li key={j}>
                  <Link
                    href={link.href}
                    className="hover:text-tan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Head Office */}
        {(office.address || office.phone) && (
          <div>
            <p className="text-white font-semibold tracking-widest text-xs uppercase mb-4">
              Head Office
            </p>
            {office.address && <p className="leading-relaxed mb-3">{office.address}</p>}
            {office.phone && (
              <a href={`tel:${office.phone}`} className="hover:text-tan transition-colors block">
                {office.phone}
              </a>
            )}
            {office.altPhone && (
              <a href={`tel:${office.altPhone}`} className="hover:text-tan transition-colors block">
                {office.altPhone}
              </a>
            )}
            {office.email && (
              <a href={`mailto:${office.email}`} className="hover:text-tan transition-colors block mt-1">
                {office.email}
              </a>
            )}
            {office.googleMapsUrl && (
              <a
                href={office.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-tan hover:text-tan-dark transition-colors text-xs font-semibold tracking-widest uppercase"
              >
                Get Direction
              </a>
            )}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            {f.copyrightText || `© ${new Date().getFullYear()} MKN Development. All rights reserved.`}
            {f.legalText && ` ${f.legalText}`}
          </p>

          {/* Social links */}
          {social.length > 0 && (
            <div className="flex items-center gap-4">
              {social.map((s: any, i: number) => {
                const Icon = platformIcons[s.platform]
                return (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="text-white/40 hover:text-tan transition-colors"
                  >
                    {Icon ? <Icon size={16} /> : <span className="text-xs uppercase">{s.platform}</span>}
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}

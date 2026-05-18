'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { X, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

type NavLink = { label: string; href: string; isExternal?: boolean }

interface HeaderProps {
  header: {
    logo?: { url?: string; alt?: string } | null
    logoText?: string
    navLinks?: NavLink[]
    ctaButton?: { label?: string; href?: string } | null
  } | null
  locale: string
}

export default function SiteHeader({ header, locale }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const router = useRouter()

  const otherLocale = locale === 'en' ? 'ar' : 'en'
  const switchLocaleHref = pathname.replace(`/${locale}`, `/${otherLocale}`)

  const navLinks: NavLink[] = header?.navLinks ?? [
    { label: t('home'), href: `/${locale}` },
    { label: t('aboutUs'), href: `/${locale}/about-us` },
    { label: t('ourProjects'), href: `/${locale}/projects` },
    { label: t('contactUs'), href: `/${locale}/contact` },
  ]

  const navLabels = [
    t('home'),
    t('aboutUs'),
    t('ourProjects'),
    t('contactUs'),
  ]

  return (
    <>
      {/* Sticky top header */}
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 py-5">
        {/* Logo */}
        <Link href={`/${locale}`} className="relative z-10">
          {header?.logo?.url ? (
            <Image
              src={header.logo.url}
              alt={header.logo.alt ?? 'MKN'}
              width={56}
              height={40}
              className="h-20 w-auto object-contain"
            />
          ) : (
            <span className="font-display text-white text-xl tracking-widest">
              {header?.logoText ?? 'MKN'}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={`/${locale}${link.href}`}
              className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
              target={link.isExternal ? '_blank' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Language switch */}
          <Link
            href={switchLocaleHref}
            className="text-white/70 hover:text-white text-sm font-medium tracking-widest transition-colors"
          >
            {t('switchTo')}
          </Link>

          {/* Hamburger */}
          <button
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="p-1 text-white hover:text-tan transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-[100] bg-teal transition-transform duration-500 ease-in-out flex',
          menuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Close button */}
        <button
          aria-label={tCommon('close') || 'Close menu'}
          onClick={() => setMenuOpen(false)}
          className="absolute top-5 right-6 lg:right-12 text-white/70 hover:text-white transition-colors"
        >
          <X size={28} />
        </button>

        {/* Left: numbered nav */}
        <nav className="flex flex-col justify-center px-12 lg:px-24 gap-2 flex-1">
          {navLabels.map((label, i) => {
            const href = navLinks[i]?.href ?? '#'
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-start gap-4 py-3"
              >
                <span className="section-number mt-3 w-6">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-display text-white text-5xl sm:text-6xl lg:text-7xl leading-none group-hover:text-tan transition-colors">
                  {label.toUpperCase()}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Right: contact info */}
        <div className="hidden lg:flex flex-col justify-center pr-24 gap-8 text-white/70 text-sm w-72">
          <div>
            <p className="text-white font-semibold mb-2 tracking-wide text-xs uppercase">Head Office</p>
            <p className="leading-relaxed">
              4679 Prince Muqrin St., Madinat Al Umal, Al Khobar 34621, Saudi Arabia.
            </p>
          </div>
          <div>
            <p className="text-white font-semibold mb-2 tracking-wide text-xs uppercase">Get In Touch</p>
            <p>hello@mkn.sa</p>
            <p>Ph: 0138691222 - 0556647666</p>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeroVideoBlockProps {
  block: {
    heroVariant?: 'home' | 'about'
    backgroundVideo?: { url?: string } | null
    posterImage?: { url?: string; alt?: string } | null
    eyebrow?: string
    heading: string
    subheading?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
    overlayOpacity?: number
  }
  locale: string
}

export default function HeroVideoBlock({ block }: HeroVideoBlockProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const {
    heroVariant = 'home',
    backgroundVideo,
    posterImage,
    eyebrow,
    heading,
    subheading,
    primaryCta,
    secondaryCta,
    overlayOpacity = 50,
  } = block

  const isAbout = heroVariant === 'about'

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  const overlayStyle = { backgroundColor: `rgba(12, 45, 74, ${overlayOpacity / 100})` }

  return (
    <section
      className={cn(
        'relative flex items-end overflow-hidden',
        isAbout ? 'min-h-[55vh] h-[min(85vh,920px)]' : 'h-screen min-h-[600px]',
      )}
    >
      {backgroundVideo?.url ? (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            isAbout && 'grayscale contrast-[1.05]',
          )}
          autoPlay
          muted
          loop
          playsInline
          poster={posterImage?.url}
        >
          <source src={backgroundVideo.url} type="video/mp4" />
        </video>
      ) : posterImage?.url ? (
        <Image
          src={posterImage.url}
          alt={posterImage.alt ?? heading}
          fill
          className={cn('object-cover', isAbout && 'grayscale contrast-[1.05]')}
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}

      <div className="absolute inset-0" style={overlayStyle} />

      <div
        className={cn(
          'relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full',
          isAbout ? 'pb-16 lg:pb-24 pt-32' : 'pb-20',
        )}
      >
        {eyebrow && !isAbout && <p className="section-number mb-4">{eyebrow}</p>}
        <h1
          className={cn(
            'font-display text-white leading-none mb-6 max-w-4xl tracking-tight',
            isAbout ? 'text-5xl sm:text-6xl lg:text-8xl text-left' : 'text-6xl sm:text-7xl lg:text-9xl',
          )}
        >
          {heading}
        </h1>
        {subheading && (
          <p
            className={cn(
              'text-white/75 leading-relaxed max-w-xl',
              isAbout ? 'text-base lg:text-lg font-medium' : 'text-base lg:text-lg mb-10',
            )}
          >
            {subheading}
          </p>
        )}
        {!isAbout && (
          <div className="flex items-center gap-4 flex-wrap">
            {primaryCta?.label && primaryCta?.href && (
              <Link
                href={primaryCta.href}
                className="inline-flex items-center gap-2 bg-tan text-charcoal px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:bg-tan-dark transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta?.label && secondaryCta?.href && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center gap-2 border border-white/50 text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase hover:border-white hover:bg-white/10 transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

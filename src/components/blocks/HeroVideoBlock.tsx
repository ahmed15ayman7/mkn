'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface HeroVideoBlockProps {
  block: {
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
    backgroundVideo,
    posterImage,
    eyebrow,
    heading,
    subheading,
    primaryCta,
    secondaryCta,
    overlayOpacity = 50,
  } = block

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches && videoRef.current) {
      videoRef.current.pause()
    }
  }, [])

  const overlayStyle = { backgroundColor: `rgba(12, 45, 74, ${overlayOpacity / 100})` }

  return (
    <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
      {/* Background Video or Poster */}
      {backgroundVideo?.url ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
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
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-navy" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0" style={overlayStyle} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-20 w-full">
        {eyebrow && (
          <p className="section-number mb-4">{eyebrow}</p>
        )}
        <h1 className="font-display text-white text-6xl sm:text-7xl lg:text-9xl leading-none mb-6 max-w-4xl">
          {heading}
        </h1>
        {subheading && (
          <p className="text-white/70 text-base lg:text-lg max-w-xl mb-10 leading-relaxed">
            {subheading}
          </p>
        )}
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
      </div>
    </section>
  )
}

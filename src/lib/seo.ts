import type { Metadata } from 'next'
import { fetchPage, fetchSiteSettings } from '@/lib/sanity/fetch'
import { absoluteUrl } from './utils'

const slugToPath: Record<string, string> = {
  home: '',
  'about-us': '/about-us',
  projects: '/projects',
  contact: '/contact',
}

export async function buildPageMetadata(slug: string, locale: string): Promise<Metadata> {
  const [doc, siteSeo] = await Promise.all([
    fetchPage(slug, locale),
    fetchSiteSettings(locale),
  ])

  const path = slugToPath[slug] ?? `/${slug}`
  const canonical = absoluteUrl(`/${locale}${path}`)

  const title =
    (typeof doc?.seoTitle === 'string' && doc.seoTitle) ||
    (typeof doc?.title === 'string' && doc.title) ||
    (typeof siteSeo?.defaultTitle === 'string' && siteSeo.defaultTitle) ||
    'MKN'

  const description =
    (typeof doc?.seoDescription === 'string' && doc.seoDescription) ||
    (typeof siteSeo?.defaultDescription === 'string' && siteSeo.defaultDescription) ||
    undefined

  const docOg = doc?.seoImage as { url?: string } | undefined
  const siteOg = siteSeo?.defaultOgImage as { url?: string } | undefined
  const ogImage = docOg?.url ?? siteOg?.url ?? undefined

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : [],
      type: 'website',
      locale,
    },
    twitter: { card: 'summary_large_image', title, description },
    alternates: {
      canonical,
      languages: {
        en: absoluteUrl(`/en${path}`),
        ar: absoluteUrl(`/ar${path}`),
      },
    },
  }
}

export async function buildOrganizationJsonLd() {
  const siteSeo = await fetchSiteSettings('en')
  const org = siteSeo?.organization as Record<string, unknown> | undefined

  if (!org) return null

  const logo = org.logo as { url?: string } | undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: (org.legalName as string) || 'MKN Development',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    logo: logo?.url,
    foundingDate: org.foundingYear != null ? String(org.foundingYear) : undefined,
    address: org.address,
    telephone: org.phone,
    email: org.email,
    sameAs: Array.isArray(org.sameAs)
      ? (org.sameAs as { url?: string }[]).map((s) => s.url).filter(Boolean)
      : [],
  }
}

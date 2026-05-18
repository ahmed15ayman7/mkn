import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchPage } from '@/lib/sanity/fetch'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { buildPageMetadata, buildOrganizationJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('home', locale)
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const doc = await fetchPage('home', locale)
  const orgJsonLd = await buildOrganizationJsonLd()

  if (!doc) notFound()

  return (
    <>
      {orgJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      )}
      <BlockRenderer blocks={doc.blocks as any[]} locale={locale} />
    </>
  )
}

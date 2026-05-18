import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { fetchPage } from '@/lib/sanity/fetch'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import { buildPageMetadata } from '@/lib/seo'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return buildPageMetadata('about-us', locale)
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const doc = await fetchPage('about-us', locale)
  if (!doc) notFound()

  return <BlockRenderer blocks={doc.blocks as any[]} locale={locale} />
}

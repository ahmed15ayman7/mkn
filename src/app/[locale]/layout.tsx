import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { fetchSiteHeader, fetchSiteFooter, fetchSiteSettings } from '@/lib/sanity/fetch'
import SiteHeader from '@/components/layout/Header'
import SiteFooter from '@/components/layout/Footer'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteSeo = await fetchSiteSettings(locale)

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
    title: {
      template: `%s — ${(siteSeo?.siteName as string) || 'MKN'}`,
      default: (siteSeo?.defaultTitle as string) || 'MKN Development',
    },
    description: (siteSeo?.defaultDescription as string) || undefined,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound()
  }

  const messages = await getMessages()
  const isRtl = locale === 'ar'

  const [header, footer] = await Promise.all([fetchSiteHeader(locale), fetchSiteFooter(locale)])

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader header={header} locale={locale} />
          <main>{children}</main>
          <SiteFooter footer={footer} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

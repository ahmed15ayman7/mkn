import { sanityClient } from './client'
import {
  pageBySlugQuery,
  partnersListQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectsListQuery,
  siteFooterQuery,
  siteHeaderQuery,
  siteSettingsQuery,
} from './queries'
import { deepPickLocale, localizeProjectDoc, normalizeBlocks } from './transform'

export async function fetchPage(slug: string, locale: string): Promise<Record<string, unknown> | null> {
  const raw = await sanityClient.fetch(pageBySlugQuery, { slug }).catch(() => null)
  if (!raw) return null
  const localized = deepPickLocale(raw, locale) as Record<string, unknown>
  return {
    ...localized,
    blocks: normalizeBlocks((localized.blocks as unknown[]) ?? [], locale),
  }
}

export async function fetchProject(slug: string, locale: string): Promise<Record<string, unknown> | null> {
  const raw = await sanityClient.fetch(projectBySlugQuery, { slug }).catch(() => null)
  return localizeProjectDoc(raw as Record<string, unknown> | null, locale)
}

export async function fetchPartners() {
  return sanityClient.fetch(partnersListQuery).catch(() => [])
}

export async function fetchPublishedProjects(limit: number, locale: string) {
  const rows = await sanityClient.fetch<Record<string, unknown>[]>(projectsListQuery, { limit }).catch(() => [])
  return rows.map((row) => deepPickLocale(row, locale))
}

export async function fetchProjectSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(projectSlugsQuery).catch(() => [])
}

export async function fetchSiteHeader(locale: string) {
  const raw = await sanityClient.fetch(siteHeaderQuery).catch(() => null)
  return raw ? (deepPickLocale(raw, locale) as Record<string, unknown>) : null
}

export async function fetchSiteFooter(locale: string) {
  const raw = await sanityClient.fetch(siteFooterQuery).catch(() => null)
  return raw ? (deepPickLocale(raw, locale) as Record<string, unknown>) : null
}

export async function fetchSiteSettings(locale: string) {
  const raw = await sanityClient.fetch(siteSettingsQuery).catch(() => null)
  return raw ? (deepPickLocale(raw, locale) as Record<string, unknown>) : null
}

export type LocaleCode = 'en' | 'ar'

export function isLocalePair(value: unknown): value is { en?: unknown; ar?: unknown } {
  if (!value || typeof value !== 'object') return false
  const o = value as Record<string, unknown>
  const keys = Object.keys(o).filter((k) => !k.startsWith('_'))
  return keys.length > 0 && keys.every((k) => k === 'en' || k === 'ar')
}

/** Collapse `{ en, ar }` objects to the active locale (recursive). */
export function deepPickLocale<T>(value: T, locale: string): T {
  if (value === null || value === undefined) return value

  if (Array.isArray(value)) {
    return value.map((item) => deepPickLocale(item, locale)) as T
  }

  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (isLocalePair(obj)) {
      const picked = locale === 'ar' ? obj.ar : obj.en
      return picked as T
    }

    const out: Record<string, unknown> = {}
    for (const [key, val] of Object.entries(obj)) {
      out[key] = deepPickLocale(val, locale)
    }
    return out as T
  }

  return value
}

export function normalizeBlocks(blocks: unknown[] | undefined | null, locale: string): Record<string, unknown>[] {
  if (!blocks?.length) return []
  return blocks.map((raw) => {
    const b = deepPickLocale(raw, locale) as Record<string, unknown> & { _type?: string; _key?: string }
    const blockType = b._type === 'bodyText' ? 'text' : b._type
    const next: Record<string, unknown> = { ...b, blockType, id: b._key }

    if (b._type === 'partners' && Array.isArray(next.overridePartners)) {
      next.overridePartners = next.overridePartners.map((p: Record<string, unknown>) => ({
        ...p,
        id: p._id ?? p.id,
      }))
    }

    if (b._type === 'projectsGrid' && Array.isArray(next.selectedProjects)) {
      next.selectedProjects = next.selectedProjects.map((p: Record<string, unknown>) => ({
        ...deepPickLocale(p, locale),
        id: p._id ?? p.id,
        slug: p.slug,
      }))
    }

    if (b._type === 'featuredProject' && next.project && typeof next.project === 'object') {
      const p = next.project as Record<string, unknown>
      next.project = { ...deepPickLocale(p, locale), id: p._id ?? p.id, slug: p.slug }
    }

    return next
  })
}

export function localizeProjectDoc(raw: Record<string, unknown> | null, locale: string): Record<string, unknown> | null {
  if (!raw) return null
  const picked = deepPickLocale(raw, locale) as Record<string, unknown>
  return {
    ...picked,
    id: raw._id,
    slug: picked.slug ?? raw.slug,
    title: picked.title,
    excerpt: picked.excerpt,
    subtitle: picked.subtitle,
    coverImage: picked.coverImage,
    heroVideo: picked.heroVideo,
    projectDetails: picked.projectDetails,
    blocks: normalizeBlocks((picked.blocks as unknown[]) ?? [], locale),
  }
}

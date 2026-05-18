import { defineField, defineType } from 'sanity'
import { getPageBlockMembers, pageBlockMembers, projectBlockMembers } from './blocks'
import { seoImageField } from './locale'

const projectDetailsFields = [
  defineField({
    name: 'projectType',
    type: 'string',
    options: { list: ['residential', 'commercial', 'mixed', 'coastal'] },
  }),
  defineField({ name: 'location', type: 'localeString' }),
  defineField({ name: 'area', type: 'string' }),
  defineField({ name: 'deliveryDate', type: 'localeString' }),
  defineField({ name: 'completionYear', type: 'number' }),
  defineField({ name: 'units', type: 'number' }),
  defineField({ name: 'floors', type: 'number' }),
]

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'string',
      validation: (r) => r.required(),
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About Us', value: 'about-us' },
          { title: 'Our Projects', value: 'projects' },
          { title: 'Contact Us', value: 'contact' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['draft', 'published'], layout: 'radio' },
      initialValue: 'published',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Page sections',
      type: 'array',
      // @ts-expect-error Sanity supports dynamic `of` by document; types lag behind runtime
      of: ({ document }: { document?: { slug?: string } }) => getPageBlockMembers(document?.slug),
      description:
        'Block picker is filtered by page slug. Set slug (home / about-us / projects / contact) before adding sections.',
      validation: (Rule) =>
        Rule.custom((blocks, context) => {
          const slug = (context.document as { slug?: string } | undefined)?.slug
          if (!slug || !Array.isArray(blocks)) return true
          const allowed = new Set(getPageBlockMembers(slug).map((m) => m.type))
          const invalid = (blocks as { _type?: string }[])
            .map((b) => b._type)
            .filter((t): t is string => !!t && !allowed.has(t))
          if (invalid.length === 0) return true
          return `Block type(s) not allowed on "${slug}": ${[...new Set(invalid)].join(', ')}`
        }),
      options: { insertMenu: { filter: true } },
    }),
    defineField({ name: 'seoTitle', type: 'localeString' }),
    defineField({ name: 'seoDescription', type: 'localeText' }),
    seoImageField,
  ],
  preview: {
    select: { slug: 'slug' },
    prepare({ slug }) {
      return { title: slug ? String(slug) : 'Page' }
    },
  },
})

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'subtitle', type: 'localeString' }),
    defineField({ name: 'excerpt', type: 'localeText' }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['draft', 'published'], layout: 'radio' },
      initialValue: 'draft',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'heroVideo', type: 'file', options: { accept: 'video/*' } }),
    defineField({
      name: 'projectDetails',
      type: 'object',
      fields: projectDetailsFields,
    }),
    defineField({ name: 'content', type: 'array', of: projectBlockMembers }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
    defineField({ name: 'seoTitle', type: 'localeString' }),
    defineField({ name: 'seoDescription', type: 'localeText' }),
    seoImageField,
  ],
  preview: {
    select: { title: 'title', slug: 'slug' },
    prepare({ title, slug }) {
      const t = title?.en ?? title?.ar ?? 'Project'
      return { title: `${t}`, subtitle: slug?.current }
    },
  },
})

export const partnerType = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'logo',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'url', type: 'url' }),
    defineField({ name: 'order', type: 'number', initialValue: 0 }),
  ],
})

export const contactSubmissionType = defineType({
  name: 'contactSubmission',
  title: 'Contact submission',
  type: 'document',
  fields: [
    defineField({ name: 'firstName', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'lastName', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({
      name: 'subject',
      type: 'string',
      options: { list: ['units', 'project', 'services', 'partnership', 'other'] },
    }),
    defineField({ name: 'budgetRange', type: 'string', options: { list: ['lt1m', '1m_3m', '3m_5m', 'gt5m'] } }),
    defineField({ name: 'message', type: 'text' }),
    defineField({
      name: 'status',
      type: 'string',
      options: { list: ['new', 'read', 'replied'] },
      initialValue: 'new',
    }),
    defineField({ name: 'consentGiven', type: 'boolean', readOnly: true }),
  ],
})

export const siteHeaderType = defineType({
  name: 'siteHeader',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'logoText', type: 'string', initialValue: 'MKN' }),
    defineField({
      name: 'navLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'href', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'isExternal', type: 'boolean', initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaButton',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'localeString' }),
        defineField({ name: 'href', type: 'string' }),
      ],
    }),
  ],
})

export const siteFooterType = defineType({
  name: 'siteFooter',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'description', type: 'localeText' }),
    defineField({
      name: 'quickLinksColumns',
      type: 'array',
      validation: (r) => r.max(3),
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
            defineField({
              name: 'links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
                    defineField({ name: 'href', type: 'string', validation: (r) => r.required() }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'headOffice',
      type: 'object',
      fields: [
        defineField({ name: 'address', type: 'localeText' }),
        defineField({ name: 'phone', type: 'string' }),
        defineField({ name: 'altPhone', type: 'string' }),
        defineField({ name: 'email', type: 'string' }),
        defineField({ name: 'workingHours', type: 'localeString' }),
        defineField({ name: 'googleMapsUrl', type: 'url' }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              validation: (r) => r.required(),
              options: { list: ['facebook', 'instagram', 'linkedin', 'x', 'youtube', 'tiktok', 'snapchat'] },
            }),
            defineField({ name: 'url', type: 'url', validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({ name: 'copyrightText', type: 'localeString' }),
    defineField({ name: 'legalText', type: 'localeString' }),
  ],
})

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site SEO & organization',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', type: 'string', initialValue: 'MKN Development' }),
    defineField({ name: 'defaultTitle', type: 'localeString' }),
    defineField({ name: 'defaultDescription', type: 'localeText' }),
    defineField({
      name: 'defaultOgImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'organization',
      type: 'object',
      fields: [
        defineField({ name: 'legalName', type: 'string' }),
        defineField({
          name: 'logo',
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string' }],
        }),
        defineField({ name: 'foundingYear', type: 'number' }),
        defineField({ name: 'address', type: 'text' }),
        defineField({ name: 'phone', type: 'string' }),
        defineField({ name: 'email', type: 'string' }),
        defineField({
          name: 'sameAs',
          type: 'array',
          of: [{ type: 'object', fields: [{ name: 'url', type: 'url' }] }],
        }),
      ],
    }),
    defineField({ name: 'twitterHandle', type: 'string' }),
    defineField({ name: 'googleSiteVerification', type: 'string' }),
  ],
})

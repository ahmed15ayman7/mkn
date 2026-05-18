import { defineField, defineType } from 'sanity'

/** Inline portable-text blocks (reuse for EN / AR) */
export const portableTextBlocks = [
  {
    type: 'block' as const,
    styles: [
      { title: 'Normal', value: 'normal' },
      { title: 'H2', value: 'h2' },
      { title: 'H3', value: 'h3' },
      { title: 'Quote', value: 'blockquote' },
    ],
    lists: [
      { title: 'Bullet', value: 'bullet' },
      { title: 'Numbered', value: 'number' },
    ],
    marks: {
      decorators: [
        { title: 'Strong', value: 'strong' },
        { title: 'Emphasis', value: 'em' },
      ],
      annotations: [
        {
          title: 'Link',
          name: 'link',
          type: 'object',
          fields: [{ name: 'href', type: 'url', title: 'URL' }],
        },
      ],
    },
  },
]

export const localeStringType = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'string' }),
    defineField({ name: 'ar', title: 'Arabic', type: 'string' }),
  ],
})

export const localeTextType = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
    defineField({ name: 'ar', title: 'Arabic', type: 'text', rows: 3 }),
  ],
})

export const localePortableTextType = defineType({
  name: 'localePortableText',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'array',
      of: portableTextBlocks,
    }),
    defineField({
      name: 'ar',
      title: 'Arabic',
      type: 'array',
      of: portableTextBlocks,
    }),
  ],
})

export const seoImageField = defineField({
  name: 'seoImage',
  title: 'SEO / OG image',
  type: 'image',
  options: { hotspot: true },
  fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
})

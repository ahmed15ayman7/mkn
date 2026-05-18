import { defineField, defineType } from 'sanity'

const ctaPair = () => [
  defineField({
    name: 'primaryCta',
    title: 'Primary CTA',
    type: 'object',
    fields: [
      defineField({ name: 'label', type: 'localeString' }),
      defineField({ name: 'href', type: 'string' }),
    ],
  }),
  defineField({
    name: 'secondaryCta',
    title: 'Secondary CTA',
    type: 'object',
    fields: [
      defineField({ name: 'label', type: 'localeString' }),
      defineField({ name: 'href', type: 'string' }),
    ],
  }),
]

export const heroVideoBlock = defineType({
  name: 'heroVideo',
  title: 'Hero Video',
  type: 'object',
  fields: [
    defineField({ name: 'backgroundVideo', title: 'Background video', type: 'file', options: { accept: 'video/*' } }),
    defineField({
      name: 'posterImage',
      title: 'Poster image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'eyebrow', type: 'localeString' }),
    defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'subheading', type: 'localeText' }),
    ...ctaPair(),
    defineField({ name: 'overlayOpacity', type: 'number', initialValue: 50, validation: (r) => r.min(0).max(100) }),
    defineField({
      name: 'variant',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Home (full screen)', value: 'home' },
          { title: 'Inner page (compact)', value: 'page' },
        ],
        layout: 'radio',
      },
      initialValue: 'page',
    }),
  ],
})

/** Sanity reserves primitive type name `text`; use an object type instead. */
export const bodyTextBlock = defineType({
  name: 'bodyText',
  title: 'Rich text',
  type: 'object',
  fields: [
    defineField({ name: 'content', type: 'localePortableText', validation: (r) => r.required() }),
    defineField({
      name: 'alignment',
      type: 'string',
      options: { list: ['left', 'center', 'right'], layout: 'radio' },
      initialValue: 'left',
    }),
    defineField({
      name: 'background',
      type: 'string',
      options: { list: ['white', 'ivory', 'dark', 'tan'], layout: 'radio' },
      initialValue: 'white',
    }),
  ],
})

export const imageGridBlock = defineType({
  name: 'imageGrid',
  title: 'Image grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({
      name: 'images',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'gridCell',
          fields: [
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
              validation: (r) => r.required(),
              fields: [{ name: 'alt', type: 'string' }],
            }),
            defineField({ name: 'caption', type: 'localeString' }),
          ],
        },
      ],
    }),
    defineField({ name: 'columns', type: 'string', options: { list: ['2', '3', '4'] }, initialValue: '3' }),
    defineField({ name: 'layout', type: 'string', options: { list: ['grid', 'masonry'] }, initialValue: 'grid' }),
  ],
})

export const numbersBlock = defineType({
  name: 'numbers',
  title: 'Numbers / stats',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'localeString' }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'localeText' }),
          ],
        },
      ],
    }),
    defineField({ name: 'background', type: 'string', options: { list: ['white', 'dark', 'tan'] }, initialValue: 'white' }),
    defineField({ name: 'showCtas', type: 'boolean', initialValue: false }),
    ...ctaPair(),
  ],
})

export const marqueeBlock = defineType({
  name: 'marquee',
  title: 'Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [defineField({ name: 'text', type: 'localeString', validation: (r) => r.required() })],
        },
      ],
    }),
    defineField({ name: 'speed', type: 'string', options: { list: ['slow', 'medium', 'fast'] }, initialValue: 'medium' }),
    defineField({ name: 'background', type: 'string', options: { list: ['dark', 'tan', 'white'] }, initialValue: 'dark' }),
  ],
})

export const featuredProjectBlock = defineType({
  name: 'featuredProject',
  title: 'Featured project',
  type: 'object',
  fields: [
    defineField({ name: 'project', type: 'reference', to: [{ type: 'project' }], validation: (r) => r.required() }),
    defineField({
      name: 'overrideImage',
      title: 'Override image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'layout',
      type: 'string',
      options: { list: ['imageLeft', 'imageRight', 'fullBleed'] },
      initialValue: 'fullBleed',
    }),
    defineField({ name: 'showDetails', type: 'boolean', initialValue: true }),
  ],
})

export const partnersBlock = defineType({
  name: 'partners',
  title: 'Partners',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({ name: 'overridePartners', type: 'array', of: [{ type: 'reference', to: [{ type: 'partner' }] }] }),
  ],
})

export const quoteBlock = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({ name: 'quote', type: 'localeText', validation: (r) => r.required() }),
    defineField({ name: 'attribution', type: 'localeString' }),
    defineField({
      name: 'portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'background', type: 'string', options: { list: ['dark', 'ivory', 'tan'] }, initialValue: 'dark' }),
  ],
})

export const ctaBlock = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'subheading', type: 'localeText' }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'primaryCta',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
        defineField({ name: 'href', type: 'string', validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'localeString' }),
        defineField({ name: 'href', type: 'string' }),
      ],
    }),
    defineField({ name: 'background', type: 'string', options: { list: ['dark', 'tan', 'image'] }, initialValue: 'dark' }),
    defineField({ name: 'eyebrow', type: 'localeString' }),
    defineField({
      name: 'layout',
      type: 'string',
      options: {
        list: [
          { title: 'Centered', value: 'centered' },
          { title: 'Banner (image + text)', value: 'banner' },
          { title: 'Careers strip', value: 'careers' },
        ],
        layout: 'radio',
      },
      initialValue: 'centered',
    }),
  ],
})

export const aboutSnippetBlock = defineType({
  name: 'aboutSnippet',
  title: 'About snippet',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default (image + text)', value: 'default' },
          { title: 'Home (tan + collage)', value: 'home' },
          { title: 'Split intro (heading | body)', value: 'splitIntro' },
          { title: 'Delivery (project page)', value: 'delivery' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'background',
      type: 'string',
      options: { list: ['white', 'ivory', 'tan', 'sage'], layout: 'radio' },
      initialValue: 'ivory',
    }),
    defineField({ name: 'sectionLabel', type: 'localeString' }),
    defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'localePortableText' }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
      hidden: ({ parent }) => parent?.variant === 'splitIntro',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Image collage',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string' }],
        },
      ],
      hidden: ({ parent }) => parent?.variant !== 'home',
    }),
    ...ctaPair(),
    defineField({
      name: 'imagePosition',
      type: 'string',
      options: { list: ['right', 'left'] },
      initialValue: 'right',
      hidden: ({ parent }) => parent?.variant === 'splitIntro' || parent?.variant === 'home',
    }),
  ],
})

export const projectsGridBlock = defineType({
  name: 'projectsGrid',
  title: 'Projects grid',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({ name: 'subheading', type: 'localeText' }),
    defineField({
      name: 'displayMode',
      type: 'string',
      options: { list: ['all', 'curated'] },
      initialValue: 'all',
    }),
    defineField({
      name: 'selectedProjects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'curated',
    }),
    defineField({ name: 'limit', type: 'number', initialValue: 6, hidden: ({ parent }) => parent?.displayMode !== 'all' }),
    defineField({ name: 'showDiscoverCta', type: 'boolean', initialValue: true }),
    defineField({ name: 'ctaLabel', type: 'localeString', hidden: ({ parent }) => !parent?.showDiscoverCta }),
  ],
})

export const contactFormBlock = defineType({
  name: 'contactForm',
  title: 'Contact form',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({
      name: 'subjectOptions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'value', type: 'string', validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({
      name: 'budgetOptions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'value', type: 'string', validation: (r) => r.required() }),
          ],
        },
      ],
    }),
    defineField({ name: 'submitLabel', type: 'localeString' }),
    defineField({ name: 'successMessage', type: 'localeText' }),
  ],
})

export const contactInfoBlock = defineType({
  name: 'contactInfo',
  title: 'Contact information',
  type: 'object',
  fields: [
    defineField({
      name: 'useSiteFooter',
      title: 'Use site footer data',
      type: 'boolean',
      initialValue: true,
      description: 'When enabled, office address, phones, and social links come from Site Footer.',
    }),
    defineField({ name: 'getInTouchHeading', type: 'localeString', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({
      name: 'phones',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => parent?.useSiteFooter,
    }),
    defineField({ name: 'workingHours', type: 'localeString', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({ name: 'headOfficeHeading', type: 'localeString', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({ name: 'address', type: 'localeText', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({ name: 'directionsLabel', type: 'localeString', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({ name: 'directionsUrl', type: 'url', hidden: ({ parent }) => parent?.useSiteFooter }),
    defineField({ name: 'socialHeading', type: 'localeString', hidden: ({ parent }) => parent?.useSiteFooter }),
  ],
})

export const projectShowcaseBlock = defineType({
  name: 'projectShowcase',
  title: 'Project showcase slider',
  type: 'object',
  fields: [
    defineField({
      name: 'displayMode',
      type: 'string',
      options: { list: ['all', 'curated'], layout: 'radio' },
      initialValue: 'all',
    }),
    defineField({
      name: 'selectedProjects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      hidden: ({ parent }) => parent?.displayMode !== 'curated',
    }),
    defineField({
      name: 'limit',
      type: 'number',
      initialValue: 8,
      hidden: ({ parent }) => parent?.displayMode !== 'all',
    }),
  ],
})

export const missionVisionBlock = defineType({
  name: 'missionVision',
  title: 'Mission / vision',
  type: 'object',
  fields: [
    defineField({
      name: 'frameStyle',
      type: 'string',
      options: {
        list: [
          { title: 'Square', value: 'square' },
          { title: 'Diamond', value: 'diamond' },
        ],
        layout: 'radio',
      },
      initialValue: 'diamond',
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'body', type: 'localeText' }),
            defineField({
              name: 'image',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string' }],
            }),
            defineField({ name: 'imagePosition', type: 'string', options: { list: ['left', 'right'] }, initialValue: 'right' }),
          ],
        },
      ],
    }),
  ],
})

export const whyMKNBlock = defineType({
  name: 'whyMKN',
  title: 'Why MKN',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString', validation: (r) => r.required() }),
    defineField({ name: 'body', type: 'localePortableText' }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
  ],
})

export const chairmanMessageBlock = defineType({
  name: 'chairmanMessage',
  title: 'Chairman message',
  type: 'object',
  fields: [
    defineField({ name: 'sectionLabel', type: 'localeString' }),
    defineField({ name: 'quote', type: 'localeText', validation: (r) => r.required() }),
    defineField({ name: 'attribution', type: 'localeString' }),
    defineField({
      name: 'portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
  ],
})

export const unitsBlock = defineType({
  name: 'units',
  title: 'Units / floor plans',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({
      name: 'units',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'type', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'area', type: 'string' }),
            defineField({ name: 'bedrooms', type: 'number' }),
            defineField({ name: 'bathrooms', type: 'number' }),
            defineField({
              name: 'floorPlan',
              type: 'image',
              options: { hotspot: true },
              fields: [{ name: 'alt', type: 'string' }],
            }),
            defineField({ name: 'description', type: 'localeText' }),
            defineField({ name: 'priceFrom', type: 'localeString' }),
          ],
        },
      ],
    }),
  ],
})

export const mapBlock = defineType({
  name: 'map',
  title: 'Map / location',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'localeString' }),
    defineField({ name: 'address', type: 'localeString' }),
    defineField({ name: 'latitude', type: 'number' }),
    defineField({ name: 'longitude', type: 'number' }),
    defineField({
      name: 'mapImage',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string' }],
    }),
    defineField({ name: 'googleMapsUrl', type: 'url' }),
    defineField({
      name: 'nearbyPlaces',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', type: 'localeString', validation: (r) => r.required() }),
            defineField({ name: 'distance', type: 'string' }),
            defineField({
              name: 'category',
              type: 'string',
              options: { list: ['beach', 'school', 'hospital', 'mall', 'airport', 'other'] },
            }),
          ],
        },
      ],
    }),
  ],
})

/** All page block types (registered in schema). */
export const pageBlockMembers = [
  { type: 'heroVideo' },
  { type: 'bodyText' },
  { type: 'imageGrid' },
  { type: 'numbers' },
  { type: 'marquee' },
  { type: 'featuredProject' },
  { type: 'partners' },
  { type: 'quote' },
  { type: 'cta' },
  { type: 'aboutSnippet' },
  { type: 'projectsGrid' },
  { type: 'projectShowcase' },
  { type: 'contactInfo' },
  { type: 'contactForm' },
  { type: 'missionVision' },
  { type: 'whyMKN' },
  { type: 'chairmanMessage' },
]

/** Home — hero, who we are, projects, marquee, featured, quote banner, partners */
export const homePageBlockMembers = [
  { type: 'heroVideo' },
  { type: 'aboutSnippet' },
  { type: 'projectsGrid' },
  { type: 'marquee' },
  { type: 'featuredProject' },
  { type: 'cta' },
  { type: 'partners' },
]

/** About — hero, intro, marquee, numbers, mission/vision, why MKN, chairman */
export const aboutPageBlockMembers = [
  { type: 'heroVideo' },
  { type: 'aboutSnippet' },
  { type: 'marquee' },
  { type: 'numbers' },
  { type: 'missionVision' },
  { type: 'whyMKN' },
  { type: 'chairmanMessage' },
]

/** Projects listing — hero, portfolio intro, showcase slider, numbers */
export const projectsPageBlockMembers = [
  { type: 'heroVideo' },
  { type: 'aboutSnippet' },
  { type: 'projectShowcase' },
  { type: 'numbers' },
]

/** Contact — hero, info grid, form, careers CTA */
export const contactPageBlockMembers = [
  { type: 'heroVideo' },
  { type: 'contactInfo' },
  { type: 'contactForm' },
  { type: 'cta' },
]

export function getPageBlockMembers(slug?: string) {
  switch (slug) {
    case 'home':
      return homePageBlockMembers
    case 'about-us':
      return aboutPageBlockMembers
    case 'projects':
      return projectsPageBlockMembers
    case 'contact':
      return contactPageBlockMembers
    default:
      return pageBlockMembers
  }
}

export const PAGE_BLOCK_HINTS: Record<string, string> = {
  home: 'Recommended: Hero → Who we are → Projects grid → Marquee → Featured project → Quote/CTA → Partners',
  'about-us': 'Recommended: Hero → Who we are → Marquee → Numbers → Mission/Vision → Why MKN → Chairman message',
  projects: 'Recommended: Hero → Portfolio intro → Project showcase → Numbers',
  contact: 'Recommended: Hero → Contact info → Form → Careers CTA',
}

/** Project detail page content blocks */
export const projectBlockMembers = [
  { type: 'aboutSnippet' },
  { type: 'bodyText' },
  { type: 'imageGrid' },
  { type: 'numbers' },
  { type: 'quote' },
  { type: 'cta' },
  { type: 'units' },
  { type: 'map' },
  { type: 'marquee' },
]

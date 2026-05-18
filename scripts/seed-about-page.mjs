/**
 * Idempotent seed: creates/replaces the published `page` document for slug `about-us`
 * with bilingual (EN/AR) copy and uploads placeholder images from Unsplash.
 *
 * Re-running uploads additional image assets each time; prefer editing content in Studio after the first import.
 *
 * Run (from repo root, Node 20+):
 *   node --env-file=.env scripts/seed-about-page.mjs
 *
 * Requires: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (optional),
 *           SANITY_API_WRITE_TOKEN with write access.
 */

import { createClient } from '@sanity/client'
import { randomUUID } from 'node:crypto'

const DOC_ID = 'page-about-us'

function key() {
  return randomUUID().replace(/-/g, '').slice(0, 16)
}

function span(text) {
  return { _type: 'span', _key: key(), text, marks: [] }
}

function blockParagraph(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    children: [span(text)],
    markDefs: [],
  }
}

function blockBullet(text) {
  return {
    _type: 'block',
    _key: key(),
    style: 'normal',
    listItem: 'bullet',
    level: 1,
    children: [span(text)],
    markDefs: [],
  }
}

function localePT(enText, arText) {
  return {
    en: [blockParagraph(enText)],
    ar: [blockParagraph(arText)],
  }
}

function localePTMulti(enParagraphs, arParagraphs) {
  return {
    en: enParagraphs.map((t) => blockParagraph(t)),
    ar: arParagraphs.map((t) => blockParagraph(t)),
  }
}

async function uploadImageFromUrl(client, url, filename) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image ${url}: ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  const asset = await client.assets.upload('image', buf, { filename })
  return asset._id
}

function imageField(assetId, altEn, altAr) {
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: assetId },
    alt: `${altEn} / ${altAr}`,
  }
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_WRITE_TOKEN

  if (!projectId || !token) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment.')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token,
    useCdn: false,
  })

  const img = {
    hero: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2400&q=82',
    banner: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=82',
    vision: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=82',
    mission: 'https://images.unsplash.com/photo-1587329310686-d91456943421?auto=format&fit=crop&w=1200&q=82',
    values: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=82',
    why: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2400&q=82',
    chairman: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=82',
  }

  console.log('Uploading placeholder images…')
  const [
    heroAsset,
    bannerAsset,
    visionAsset,
    missionAsset,
    valuesAsset,
    whyAsset,
    chairmanAsset,
  ] = await Promise.all([
    uploadImageFromUrl(client, img.hero, 'about-hero-architecture.jpg'),
    uploadImageFromUrl(client, img.banner, 'about-banner-facade.jpg'),
    uploadImageFromUrl(client, img.vision, 'about-vision.jpg'),
    uploadImageFromUrl(client, img.mission, 'about-mission.jpg'),
    uploadImageFromUrl(client, img.values, 'about-values.jpg'),
    uploadImageFromUrl(client, img.why, 'about-why-mkn.jpg'),
    uploadImageFromUrl(client, img.chairman, 'about-chairman.jpg'),
  ])

  const blocks = [
    {
      _type: 'heroVideo',
      _key: key(),
      heroVariant: 'about',
      posterImage: imageField(heroAsset, 'MKN architecture', 'عمارة إم كيه إن'),
      heading: {
        en: 'About Us',
        ar: 'من نحن',
      },
      subheading: {
        en: 'A developer focused on quality, innovation, and communities built for modern living.',
        ar: 'مطور عقاري يركز على الجودة والابتكار وبناء مجتمعات تناسب الحياة العصرية.',
      },
      overlayOpacity: 52,
    },
    {
      _type: 'aboutSnippet',
      _key: key(),
      introLayout: 'aboutIntro',
      sectionLabel: { en: 'ABOUT US', ar: 'من نحن' },
      heading: { en: 'WHO WE ARE', ar: 'عن الشركة' },
      body: localePT(
        'MKN develops residential and coastal destinations that combine architectural clarity with long-term investment value. From master planning to delivery, we prioritize craftsmanship, sustainability, and neighborhoods people are proud to call home.',
        'تطور إم كيه إن وجهات سكنية وساحلية تجمع بين الوضوح المعماري والقيمة الاستثمارية على المدى الطويل. من التخطيط الشامل وحتى التسليم، نمنح الأولوية للجودة والاستدامة والأحياء التي يفخر سكانها بها.',
      ),
      imagePosition: 'right',
    },
    {
      _type: 'marquee',
      _key: key(),
      layout: 'banner',
      bannerText: {
        en: 'WHERE QUALITY MEETS MODERN LIVING',
        ar: 'حيث تلتقي الجودة بالمعيشة العصرية',
      },
      bannerImage: imageField(bannerAsset, 'Building facade', 'واجهة مبنى'),
      items: [
        {
          _key: key(),
          text: { en: 'MKN', ar: 'إم كيه إن' },
        },
      ],
    },
    {
      _type: 'numbers',
      _key: key(),
      background: 'tan',
      statsHeading: { en: 'OUR NUMBERS', ar: 'أرقامنا' },
      showIntroPills: true,
      pillMissionLabel: { en: 'OUR MISSION', ar: 'رسالتنا' },
      pillVisionLabel: { en: 'OUR VISION', ar: 'رؤيتنا' },
      pillMissionAnchor: 'our-mission',
      pillVisionAnchor: 'our-vision',
      showPlayCircle: true,
      playCircleHref: '#our-vision',
      stats: [
        {
          _key: key(),
          value: '23+',
          label: {
            en: 'Years of experience',
            ar: 'سنوات خبرة',
          },
          description: {
            en: 'Delivering trusted developments across Egypt with a disciplined approach to planning and execution.',
            ar: 'تقديم مشاريع موثوقة في مصر مع نهج منضبط في التخطيط والتنفيذ.',
          },
        },
        {
          _key: key(),
          value: '50+',
          label: {
            en: 'Projects portfolio',
            ar: 'محفظة مشاريع',
          },
          description: {
            en: 'A diversified mix of residential and lifestyle-led communities shaped for families and investors.',
            ar: 'تنوع بين المجتمعات السكنية ووجهات أسلوب الحياة المصممة للعائلات والمستثمرين.',
          },
        },
        {
          _key: key(),
          value: '200M+',
          label: {
            en: 'Investment value',
            ar: 'قيمة استثمارية',
          },
          description: {
            en: 'Scale of curated opportunities aligned with market demand and lasting asset performance.',
            ar: 'حجم فرص مختارة بما يتوافق مع الطلب في السوق وأداء الأصول على المدى الطويل.',
          },
        },
      ],
    },
    {
      _type: 'missionVision',
      _key: key(),
      cards: [
        {
          _key: key(),
          label: { en: 'OUR VISION', ar: 'رؤيتنا' },
          heading: { en: 'Shaping skylines with purpose', ar: 'نسهم في تشكيل أفق المدن بغاية واضحة' },
          anchorId: 'our-vision',
          body: localePT(
            'We envision developments that feel timeless—balanced environments where design, nature, and daily life converge.',
            'نؤمن بمشاريع تبدو خالدة—بيئات متوازنة تلتقي فيها التصميم والطبيعة والحياة اليومية.',
          ),
          image: imageField(visionAsset, 'Vision', 'الرؤية'),
          imagePosition: 'left',
        },
        {
          _key: key(),
          label: { en: 'OUR MISSION', ar: 'رسالتنا' },
          heading: { en: 'Deliver with integrity', ar: 'الالتزام بالتنفيذ وباحترام الوعد' },
          anchorId: 'our-mission',
          body: localePT(
            'Our mission is to build responsibly—transparent timelines, rigorous standards, and spaces engineered for comfort.',
            'رسالتنا هي البناء بمسؤولية—جداول زمنية واضحة، معايير صارمة، ومساحات مصممة للراحة.',
          ),
          image: imageField(missionAsset, 'Mission', 'الرسالة'),
          imagePosition: 'right',
        },
        {
          _key: key(),
          label: { en: 'OUR VALUES', ar: 'قيمنا' },
          heading: { en: 'What guides every decision', ar: 'ما يوجه كل قرار نتخذه' },
          anchorId: 'our-values',
          body: {
            en: [
              blockBullet('Quality without compromise'),
              blockBullet('Integrity in partnerships'),
              blockBullet('Innovation with restraint'),
              blockBullet('Community-first mindset'),
            ],
            ar: [
              blockBullet('الجودة دون مساومة'),
              blockBullet('النزاهة في الشراكات'),
              blockBullet('الابتكار بروية'),
              blockBullet('أولوية المجتمع'),
            ],
          },
          image: imageField(valuesAsset, 'Values', 'القيم'),
          imagePosition: 'left',
        },
      ],
    },
    {
      _type: 'whyMKN',
      _key: key(),
      heading: { en: 'WHY MKN', ar: 'لماذا إم كيه إن' },
      body: localePTMulti(
        [
          'We combine international design cues with local insight, ensuring each project feels grounded yet aspirational.',
          'Investors and homeowners benefit from clear communication, dependable delivery, and amenities that elevate everyday routines.',
        ],
        [
          'نمزج الإلهام التصميمي العالمي مع فهم عميق للسوق المحلي، ليشعر كل مشروع بأنه rooted وطموح في آن واحد.',
          'يستفيد المستثمرون ومالكو الوحدات من تواصل واضح وتسليم موثوق ومرافق ترفع جودة اليوميات.',
        ],
      ),
      backgroundImage: imageField(whyAsset, 'Why MKN backdrop', 'خلفية لماذا إم كيه إن'),
    },
    {
      _type: 'chairmanMessage',
      _key: key(),
      sectionLabel: { en: "Chairman's message", ar: 'كلمة رئيس مجلس الإدارة' },
      quote: {
        en: 'At MKN, we focus on creating developments that combine quality, innovation, and long-term value. Our goal is to build communities that enhance lifestyles and offer meaningful investment opportunities.',
        ar: 'في إم كيه إن، نركز على مشاريع تجمع بين الجودة والابتكار والقيمة على المدى الطويل. هدفنا بناء مجتمعات ترتقي بأسلوب الحياة وتقدم فرص استثمار ذات معنى.',
      },
      attribution: { en: 'Chairman — MKN Development', ar: 'رئيس مجلس الإدارة — إم كيه إن للتطوير' },
      portrait: imageField(chairmanAsset, 'Chairman portrait', 'صورة رئيس مجلس الإدارة'),
    },
  ]

  const existingId = await client.fetch(`*[_type == "page" && slug == "about-us"][0]._id`)

  const doc = {
    _id: typeof existingId === 'string' ? existingId : DOC_ID,
    _type: 'page',
    title: { en: 'About Us', ar: 'من نحن' },
    slug: 'about-us',
    status: 'published',
    seoTitle: { en: 'About MKN Development', ar: 'عن إم كيه إن للتطوير' },
    seoDescription: {
      en: 'Learn about MKN Development—our vision, mission, leadership, and commitment to quality communities.',
      ar: 'تعرّف على إم كيه إن للتطوير—رؤيتنا، رسالتنا، قيادتنا، والتزامنا بمجتمعات ذات جودة.',
    },
    blocks,
  }

  await client.createOrReplace(doc)
  console.log(`Done. Published page _id=${doc._id} (slug about-us). Open Sanity Studio to review.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

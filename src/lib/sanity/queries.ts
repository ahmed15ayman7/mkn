const projectExpand = `{
  _id,
  "slug": slug.current,
  title,
  subtitle,
  excerpt,
  coverImage { "url": asset->url, alt },
  "heroVideo": heroVideo { "url": asset->url },
  projectDetails,
  order
}`

export const pageBySlugQuery = `
*[_type == "page" && slug == $slug && status == "published"][0]{
  _id,
  slug,
  title,
  status,
  seoTitle,
  seoDescription,
  seoImage { "url": asset->url, alt },
  blocks[]{
    _key,
    _type,
    _type == "heroVideo" => {
      _key,
      _type,
      eyebrow,
      heading,
      subheading,
      overlayOpacity,
      variant,
      primaryCta,
      secondaryCta,
      backgroundVideo { "url": asset->url },
      posterImage { "url": asset->url, alt }
    },
    _type == "bodyText" => { _key, _type, content, alignment, background },
    _type == "imageGrid" => {
      _key,
      _type,
      heading,
      columns,
      layout,
      images[]{
        caption,
        "image": image { "url": asset->url, alt }
      }
    },
    _type == "numbers" => { _key, _type, label, stats, background, showCtas, primaryCta, secondaryCta },
    _type == "marquee" => { _key, _type, items, speed, background },
    _type == "featuredProject" => {
      _key,
      _type,
      layout,
      showDetails,
      overrideImage { "url": asset->url, alt },
      "project": project->${projectExpand}
    },
    _type == "partners" => {
      _key,
      _type,
      heading,
      "overridePartners": overridePartners[]->{ _id, name, url, order, "logo": logo { "url": asset->url, alt } }
    },
    _type == "quote" => {
      _key,
      _type,
      quote,
      attribution,
      background,
      portrait { "url": asset->url, alt }
    },
    _type == "cta" => {
      _key,
      _type,
      heading,
      subheading,
      eyebrow,
      layout,
      primaryCta,
      secondaryCta,
      background,
      backgroundImage { "url": asset->url, alt }
    },
    _type == "aboutSnippet" => {
      _key,
      _type,
      variant,
      background,
      sectionLabel,
      heading,
      body,
      primaryCta,
      secondaryCta,
      imagePosition,
      image { "url": asset->url, alt },
      galleryImages[]{ "url": asset->url, alt }
    },
    _type == "contactInfo" => {
      _key,
      _type,
      useSiteFooter,
      getInTouchHeading,
      phones,
      workingHours,
      headOfficeHeading,
      address,
      directionsLabel,
      directionsUrl,
      socialHeading
    },
    _type == "projectShowcase" => {
      _key,
      _type,
      displayMode,
      limit,
      "selectedProjects": selectedProjects[]->${projectExpand}
    },
    _type == "projectsGrid" => {
      _key,
      _type,
      heading,
      subheading,
      displayMode,
      limit,
      showDiscoverCta,
      ctaLabel,
      "selectedProjects": selectedProjects[]->${projectExpand}
    },
    _type == "contactForm" => {
      _key,
      _type,
      heading,
      subjectOptions,
      budgetOptions,
      submitLabel,
      successMessage
    },
    _type == "missionVision" => {
      _key,
      _type,
      frameStyle,
      cards[]{
        label,
        heading,
        body,
        imagePosition,
        image { "url": asset->url, alt }
      }
    },
    _type == "whyMKN" => {
      _key,
      _type,
      heading,
      body,
      backgroundImage { "url": asset->url, alt }
    },
    _type == "chairmanMessage" => {
      _key,
      _type,
      sectionLabel,
      quote,
      attribution,
      portrait { "url": asset->url, alt },
      backgroundImage { "url": asset->url, alt }
    }
  }
}
`

export const projectBySlugQuery = `
*[_type == "project" && slug.current == $slug && status == "published"][0]{
  _id,
  "slug": slug.current,
  title,
  subtitle,
  excerpt,
  status,
  seoTitle,
  seoDescription,
  seoImage { "url": asset->url, alt },
  coverImage { "url": asset->url, alt },
  heroVideo { "url": asset->url },
  projectDetails,
  order,
  blocks: content[]{
    _key,
    _type,
    _type == "heroVideo" => {
      _key,
      _type,
      eyebrow,
      heading,
      subheading,
      overlayOpacity,
      variant,
      primaryCta,
      secondaryCta,
      backgroundVideo { "url": asset->url },
      posterImage { "url": asset->url, alt }
    },
    _type == "bodyText" => { _key, _type, content, alignment, background },
    _type == "imageGrid" => {
      _key,
      _type,
      heading,
      columns,
      layout,
      images[]{
        caption,
        "image": image { "url": asset->url, alt }
      }
    },
    _type == "numbers" => { _key, _type, label, stats, background, showCtas, primaryCta, secondaryCta },
    _type == "quote" => {
      _key,
      _type,
      quote,
      attribution,
      background,
      portrait { "url": asset->url, alt }
    },
    _type == "cta" => {
      _key,
      _type,
      heading,
      subheading,
      eyebrow,
      layout,
      primaryCta,
      secondaryCta,
      background,
      backgroundImage { "url": asset->url, alt }
    },
    _type == "aboutSnippet" => {
      _key,
      _type,
      variant,
      background,
      sectionLabel,
      heading,
      body,
      primaryCta,
      secondaryCta,
      imagePosition,
      image { "url": asset->url, alt },
      galleryImages[]{ "url": asset->url, alt }
    },
    _type == "marquee" => { _key, _type, items, speed, background },
    _type == "units" => {
      _key,
      _type,
      heading,
      units[]{
        type,
        area,
        bedrooms,
        bathrooms,
        description,
        priceFrom,
        floorPlan { "url": asset->url, alt }
      }
    },
    _type == "map" => {
      _key,
      _type,
      heading,
      address,
      latitude,
      longitude,
      googleMapsUrl,
      mapImage { "url": asset->url, alt },
      nearbyPlaces
    }
  }
}
`

export const partnersListQuery = `
*[_type == "partner"] | order(order asc) {
  _id,
  name,
  url,
  order,
  "logo": logo { "url": asset->url, alt }
}
`

export const projectsListQuery = `
*[_type == "project" && status == "published"] | order(order asc)[0...$limit] {
  _id,
  "slug": slug.current,
  title,
  excerpt,
  projectDetails,
  "coverImage": coverImage { "url": asset->url, alt }
}
`

export const siteHeaderQuery = `
*[_type == "siteHeader"][0]{
  logo { "url": asset->url, alt },
  logoText,
  navLinks,
  ctaButton
}`

export const siteFooterQuery = `
*[_type == "siteFooter"][0]{
  logo { "url": asset->url, alt },
  description,
  quickLinksColumns,
  headOffice,
  socialLinks,
  copyrightText,
  legalText
}`

export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  siteName,
  defaultTitle,
  defaultDescription,
  defaultOgImage { "url": asset->url, alt },
  organization{
    legalName,
    logo { "url": asset->url, alt },
    foundingYear,
    address,
    phone,
    email,
    sameAs
  },
  twitterHandle,
  googleSiteVerification
}`

export const projectSlugsQuery = `
*[_type == "project" && status == "published"]{
  "slug": slug.current
}
`

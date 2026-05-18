import { fetchPublishedProjects } from '@/lib/sanity/fetch'
import ProjectShowcaseSlider, { type ShowcaseProject } from './ProjectShowcaseSlider'

interface ProjectShowcaseBlockProps {
  block: {
    displayMode?: 'all' | 'curated'
    selectedProjects?: ShowcaseProject[]
    limit?: number
  }
  locale: string
}

export default async function ProjectShowcaseBlock({ block, locale }: ProjectShowcaseBlockProps) {
  const { displayMode = 'all', selectedProjects, limit = 8 } = block

  let projects: ShowcaseProject[] = []

  if (displayMode === 'curated' && selectedProjects?.length) {
    projects = selectedProjects.filter((p) => p?.slug)
  } else {
    projects = (await fetchPublishedProjects(limit, locale)) as ShowcaseProject[]
  }

  return <ProjectShowcaseSlider projects={projects} locale={locale} />
}

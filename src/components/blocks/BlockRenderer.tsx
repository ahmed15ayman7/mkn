import HeroVideoBlockComponent from './HeroVideoBlock'
import TextBlockComponent from './TextBlock'
import ImageGridBlockComponent from './ImageGridBlock'
import NumbersBlockComponent from './NumbersBlock'
import MarqueeBlockComponent from './MarqueeBlock'
import FeaturedProjectBlockComponent from './FeaturedProjectBlock'
import PartnersBlockComponent from './PartnersBlock'
import QuoteBlockComponent from './QuoteBlock'
import CTABlockComponent from './CTABlock'
import AboutSnippetBlockComponent from './AboutSnippetBlock'
import ProjectsGridBlockComponent from './ProjectsGridBlock'
import ContactFormBlockComponent from './ContactFormBlock'
import MissionVisionBlockComponent from './MissionVisionBlock'
import WhyMKNBlockComponent from './WhyMKNBlock'
import ChairmanMessageBlockComponent from './ChairmanMessageBlock'
import ContactInfoBlockComponent from './ContactInfoBlock'
import ProjectShowcaseBlockComponent from './ProjectShowcaseBlock'
import UnitsBlockComponent from './UnitsBlock'
import MapBlockComponent from './MapBlock'

const blockComponents: Record<string, React.ComponentType<any>> = {
  heroVideo: HeroVideoBlockComponent,
  text: TextBlockComponent,
  imageGrid: ImageGridBlockComponent,
  numbers: NumbersBlockComponent,
  marquee: MarqueeBlockComponent,
  featuredProject: FeaturedProjectBlockComponent,
  partners: PartnersBlockComponent,
  quote: QuoteBlockComponent,
  cta: CTABlockComponent,
  aboutSnippet: AboutSnippetBlockComponent,
  projectsGrid: ProjectsGridBlockComponent,
  contactForm: ContactFormBlockComponent,
  contactInfo: ContactInfoBlockComponent,
  projectShowcase: ProjectShowcaseBlockComponent,
  missionVision: MissionVisionBlockComponent,
  whyMKN: WhyMKNBlockComponent,
  chairmanMessage: ChairmanMessageBlockComponent,
  units: UnitsBlockComponent,
  map: MapBlockComponent,
}

interface BlockRendererProps {
  blocks: Array<{ blockType: string; [key: string]: any }> | null | undefined
  locale: string
}

export default function BlockRenderer({ blocks, locale }: BlockRendererProps) {
  if (!blocks || blocks.length === 0) return null

  return (
    <>
      {blocks.map((block, index) => {
        const Component = blockComponents[block.blockType]
        if (!Component) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(`No component for block type: ${block.blockType}`)
          }
          return null
        }
        return <Component key={block.id ?? index} block={block} locale={locale} />
      })}
    </>
  )
}

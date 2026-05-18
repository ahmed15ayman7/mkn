import { cn } from '@/lib/utils'
import RichText from '@/components/ui/RichText'

interface TextBlockProps {
  block: {
    content: any
    alignment?: 'left' | 'center' | 'right'
    background?: 'white' | 'ivory' | 'dark' | 'tan'
  }
  locale: string
}

export default function TextBlock({ block }: TextBlockProps) {
  const { content, alignment = 'left', background = 'white' } = block

  const bgClass = { white: 'bg-white', ivory: 'bg-ivory', dark: 'bg-charcoal text-white', tan: 'bg-tan' }[background]
  const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' }[alignment]

  return (
    <section className={cn('py-20', bgClass)}>
      <div className={cn('max-w-4xl mx-auto px-6 lg:px-12 prose prose-lg', alignClass)}>
        <RichText content={content} />
      </div>
    </section>
  )
}

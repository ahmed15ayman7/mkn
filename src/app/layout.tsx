import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s — MKN Development',
    default: 'MKN Development',
  },
  description: 'MKN is a Saudi real estate developer focused on creating modern residential and commercial projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}

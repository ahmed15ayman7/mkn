import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s — MKN Studio',
    default: 'MKN Studio',
  },
  description: 'MKN Studio is a Saudi real estate studio focused on creating modern residential and commercial projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}

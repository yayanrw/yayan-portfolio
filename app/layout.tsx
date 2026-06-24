import type { Metadata } from 'next'
import { instrumentSerif, geist, jetbrainsMono } from './fonts'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Yayan Rahmat Wijaya — Full-stack Engineer',
  description: 'Portfolio of Yayan Rahmat Wijaya, full-stack engineer and builder.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-night text-white">
        {/* Skip-to-content link for accessibility */}
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to main content
        </a>
        <Nav />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Vesak Card Generator | වෙසක් කාඩ් නිර්මාතෘ',
  description: 'Create beautiful Vesak greeting cards with traditional Sinhala poetry and blessings.',
  keywords: 'vesak, card generator, sinhala, buddhist, vesak 2025',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Vesak Card Generator',
    description: 'Create beautiful Vesak greeting cards',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="si">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0a0612" />
      </head>
      <body>{children}</body>
    </html>
  )
}

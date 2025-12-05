import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'

// Load the serif fonts with next/font for performance and self-hosting
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
  weight: ['400', '700', '900'],
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
  weight: ['400', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Linux - The Operating System That Runs the World',
    template: '%s | Linux'
  },
  description: 'Linux powers everything from embedded devices and smartphones to the world\'s supercomputers and cloud infrastructure. Open. Secure. Unstoppable.',
  keywords: [
    'Linux',
    'kernel',
    'open source',
    'operating system',
    'GNU/Linux',
    'kernel development',
    'system administration',
    'server',
    'cloud computing',
    'supercomputing'
  ],
  authors: [{ name: 'Linux Foundation' }],
  creator: 'Linux Foundation',
  publisher: 'Linux Foundation',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://linux.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://linux.org',
    title: 'Linux - The Operating System That Runs the World',
    description: 'Linux powers everything from embedded devices and smartphones to the world\'s supercomputers and cloud infrastructure. Open. Secure. Unstoppable.',
    siteName: 'Linux',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Linux Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linux - The Operating System That Runs the World',
    description: 'Linux powers everything from embedded devices and smartphones to the world\'s supercomputers and cloud infrastructure.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-screen bg-white text-black antialiased">
        <div id="app-root">
          {children}
        </div>
      </body>
    </html>
  )
}
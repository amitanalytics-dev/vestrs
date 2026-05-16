import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const siteUrl = 'https://vestrs.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'VESTRS — Access India Early | India Private Markets for Accredited Investors',
    template: '%s | VESTRS',
  },
  description:
    'VESTRS gives verified accredited investors structured access to India\'s private startup ecosystem — 112 unicorns, $1T+ valuation, cross-border compliance handled end-to-end. Join the founding member waitlist.',
  keywords: [
    'India private markets',
    'India startup investing',
    'accredited investor India',
    'India venture capital access',
    'India unicorn investment',
    'cross-border India investment',
    'India pre-IPO investment',
    'India angel investing',
    'Rule 506c India',
    'VESTRS',
  ],
  authors: [{ name: 'Vestrs LLC' }],
  creator: 'Vestrs LLC',
  publisher: 'Vestrs LLC',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'VESTRS',
    title: 'VESTRS — Access India Early | India Private Markets for Accredited Investors',
    description:
      'Verified accredited investors gain structured access to India\'s private startup ecosystem. 112 unicorns. $1T+ ecosystem. Cross-border compliance handled. Join the founding member waitlist.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VESTRS — Access India Early',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VESTRS — Access India Early',
    description:
      'Structured access to India\'s private startup ecosystem for verified accredited investors. 112 unicorns. $1T+ ecosystem. Join the founding member waitlist.',
    images: ['/og-image.png'],
    creator: '@vestrs',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'finance',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vestrs LLC',
  url: siteUrl,
  description:
    'Vestrs provides verified accredited investors with structured access to India\'s private startup ecosystem, handling cross-border compliance end-to-end.',
  foundingDate: '2025',
  areaServed: ['US', 'IN'],
  serviceType: 'Private Investment Platform',
  offers: {
    '@type': 'Offer',
    description: 'Access to curated Indian private company deal flow for verified accredited investors under Rule 506(c) of Regulation D.',
    eligibleCustomerType: 'Accredited Investors',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#030d1a] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "Vestrs — Access India's Private Markets",
  description:
    "A front-row seat to India's startup compounding engine. Join the waitlist for curated access to India's best early-stage deals.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#030d1a] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}

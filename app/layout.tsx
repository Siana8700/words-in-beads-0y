import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Words in Beads — Every bead tells a story',
  description:
    'Ръчно изработени бижута от Words in Beads. Гривни с послание, модел Crystal Dream и фините двуредни гривни Aura — всяка изработена с внимание към детайла.',
  generator: 'v0.app',
  openGraph: {
    title: 'Words in Beads — Every bead tells a story',
    description:
      'Ръчно изработени бижута. Гривни с послание, Crystal Dream и Aura.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#faf3e9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="bg" className={`light ${cormorant.variable} ${jost.variable}`}>
      <body className="antialiased font-sans">
        <CartProvider>{children}</CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

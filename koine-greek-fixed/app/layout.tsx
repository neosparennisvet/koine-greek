import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, JetBrains_Mono, Playfair_Display, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Κοινή Greek — Библейский греческий язык',
    template: '%s | Κοινή Greek',
  },
  description:
    'Полный курс библейского греческого языка от алфавита до свободного чтения Нового Завета. 5 модулей, 36 уроков, интерактивные упражнения.',
  keywords: ['библейский греческий', 'греческий язык', 'Новый Завет', 'койне', 'курс'],
  openGraph: {
    title: 'Κοινή Greek — Читай Новый Завет в оригинале',
    description: 'Полный курс библейского греческого. 36 уроков, интерактивные упражнения, личный кабинет.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${outfit.variable} ${jetbrains.variable} ${playfair.variable} ${sourceSerif.variable}`}
    >
      <body className="bg-night text-textc font-sans antialiased">
        {children}
      </body>
    </html>
  )
}

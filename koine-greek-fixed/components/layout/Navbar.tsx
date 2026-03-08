'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function Navbar() {
  const path = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-50 border-b border-rim bg-night/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-full flex items-center gap-8">

        {/* Logo */}
        <Link href="/" className="font-greek text-xl font-semibold text-gold shrink-0">
          Κοινή <span className="text-textc font-light">Greek</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1 flex-1">
          {[
            { href: '/course', label: 'Курс' },
            { href: '/#pricing', label: 'Тарифы' },
            { href: '/#about', label: 'О нас' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                path === href
                  ? 'text-goldl'
                  : 'text-soft hover:text-bright hover:bg-card/50'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/auth/login"
            className="px-4 py-1.5 rounded-lg text-sm font-medium border border-rim text-textc hover:border-gold hover:text-gold transition-colors"
          >
            Войти
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-gold text-night hover:bg-goldl transition-all hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(212,168,67,.3)]"
          >
            Начать бесплатно
          </Link>
        </div>

      </div>
    </header>
  )
}

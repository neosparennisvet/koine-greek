'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn, getInitials } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { createClient } from '@/lib/supabase-browser'
import type { Profile } from '@/types'

const NAV = [
  { href: '/dashboard',       icon: '🏠', label: 'Обзор' },
  { href: '/course',          icon: '🗺️', label: 'Программа курса' },
  { href: '__CONTINUE__',     icon: '📖', label: 'Мои уроки' },
  { href: '/dashboard/vocab', icon: '📚', label: 'Словарь' },
]

export function DashboardSidebar({ profile, continueLessonId }: { profile: Profile | null, continueLessonId?: string }) {
  const path = usePathname()
  const router = useRouter()
  const supabase = createClient()

  // Скрываем на страницах уроков — там своя боковая панель
  const isLessonPage = path.startsWith('/lesson/')
  if (isLessonPage) return null

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const name = profile?.full_name || profile?.email || 'Студент'

  return (
    <aside className="dashboard-sidebar-desktop fixed left-0 top-0 h-full w-[260px] bg-deep border-r border-rim flex flex-col z-40">

      {/* Logo */}
      <div className="px-5 py-5 border-b border-rim">
        <Link href="/" className="font-greek text-lg font-semibold text-gold">
          Κοινή <span className="text-textc font-light">Greek</span>
        </Link>
      </div>

      {/* User */}
      <div className="px-5 py-5 border-b border-rim">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-amber flex items-center justify-center text-sm font-bold text-night shrink-0">
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-bright truncate">{name}</div>
            <div className="text-xs text-muted truncate">{profile?.email}</div>
          </div>
        </div>
        {profile && !profile.has_access && (
          <Link href="/checkout" className="mt-3 block w-full py-2 text-center text-xs font-semibold bg-gold/10 border border-gold/30 text-gold rounded-lg hover:bg-gold/20 transition-colors">
            Открыть полный курс →
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-[2px] text-muted px-3 mb-2">Навигация</div>
        {NAV.map(({ href: rawHref, icon, label }) => {
          const href = rawHref === '__CONTINUE__' ? `/lesson/${continueLessonId || '1-1'}` : rawHref
          return (
          <Link key={href} href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all',
              path === href || path.startsWith(href + '/')
                ? 'bg-gold/10 text-goldl border-l-2 border-gold pl-[10px]'
                : 'text-soft hover:bg-card/60 hover:text-textc'
            )}
          >
            <span className="text-base w-5">{icon}</span>
            {label}
          </Link>
        )})}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-rim space-y-1">
        <div className="flex items-center gap-2">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-soft hover:bg-card/60 hover:text-textc transition-all flex-1">
            <span>⚙️</span> Настройки
          </Link>
          <ThemeToggle />
        </div>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-soft hover:bg-card/60 hover:text-rose transition-all w-full text-left">
          <span>↩️</span> Выйти
        </button>
      </div>
    </aside>
  )
}

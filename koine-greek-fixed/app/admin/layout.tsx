// @ts-nocheck
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Link from 'next/link'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL

export default async function AdminLayout({ children }) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')
  if (user.email !== ADMIN_EMAIL) redirect('/dashboard')

  return (
    <div className="flex min-h-screen bg-night">
      {/* Admin Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-[240px] bg-deep border-r border-rim flex flex-col z-40">
        <div className="px-5 py-5 border-b border-rim">
          <div className="font-greek text-lg font-semibold text-gold">Κοινή Admin</div>
          <div className="text-xs text-muted mt-1">{user.email}</div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {[
            { href: '/admin',          icon: '📊', label: 'Дашборд' },
            { href: '/admin/students', icon: '👥', label: 'Студенты' },
            { href: '/admin/lessons',  icon: '📖', label: 'Уроки' },
          ].map(({ href, icon, label }) => (
            <Link key={href} href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-soft hover:bg-card/60 hover:text-textc transition-all">
              <span>{icon}</span>{label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-rim">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-soft hover:bg-card/60 transition-all">
            ← Вернуться на сайт
          </Link>
        </div>
      </aside>

      <main className="flex-1 ml-[240px] min-h-screen p-8">
        {children}
      </main>
    </div>
  )
}

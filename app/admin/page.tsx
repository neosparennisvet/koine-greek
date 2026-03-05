// @ts-nocheck
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAllLessons } from '@/lib/course-data'
import Link from 'next/link'

export const metadata = { title: 'Admin — Дашборд' }

export default async function AdminPage() {
  const supabase = createServerSupabaseClient()

  const [
    { count: totalUsers },
    { count: paidUsers },
    { count: totalProgress },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('has_access', true),
    supabase.from('lesson_progress').select('*', { count: 'exact', head: true }).eq('completed', true),
    supabase.from('profiles').select('id, email, full_name, has_access, created_at')
      .order('created_at', { ascending: false }).limit(5),
  ])

  const allLessons = getAllLessons()
  const conversionRate = totalUsers > 0 ? Math.round((paidUsers / totalUsers) * 100) : 0

  const stats = [
    { icon: '👥', label: 'Всего студентов',    value: totalUsers ?? 0,    color: 'text-tealb' },
    { icon: '💳', label: 'Купили курс',         value: paidUsers ?? 0,     color: 'text-gold' },
    { icon: '📊', label: 'Конверсия',           value: `${conversionRate}%`, color: 'text-indigo' },
    { icon: '✅', label: 'Уроков пройдено',     value: totalProgress ?? 0, color: 'text-green-400' },
  ]

  return (
    <div className="max-w-5xl">
      <h1 className="font-greek text-4xl font-light text-bright mb-2">Панель администратора</h1>
      <p className="text-muted text-sm mb-8">Управление курсом Κοινή Greek</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="p-5 rounded-2xl bg-card border border-rim">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className={`font-greek text-4xl font-semibold leading-none mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Быстрые действия</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Link href="/admin/students" className="p-5 rounded-2xl bg-card border border-rim hover:border-gold/50 transition-all group">
          <div className="text-2xl mb-3">👥</div>
          <div className="font-semibold text-bright group-hover:text-gold transition-colors">Управление студентами</div>
          <div className="text-xs text-muted mt-1">Выдать доступ, посмотреть прогресс</div>
        </Link>
        <Link href="/admin/lessons" className="p-5 rounded-2xl bg-card border border-rim hover:border-gold/50 transition-all group">
          <div className="text-2xl mb-3">📖</div>
          <div className="font-semibold text-bright group-hover:text-gold transition-colors">Уроки ({allLessons.length})</div>
          <div className="text-xs text-muted mt-1">Просмотр, редактирование контента</div>
        </Link>
        <Link href="/admin/students?grant=all" className="p-5 rounded-2xl bg-card border border-rim hover:border-gold/50 transition-all group">
          <div className="text-2xl mb-3">🎁</div>
          <div className="font-semibold text-bright group-hover:text-gold transition-colors">Выдать тестовый доступ</div>
          <div className="text-xs text-muted mt-1">Открыть курс конкретному студенту</div>
        </Link>
      </div>

      {/* Recent signups */}
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Последние регистрации</h2>
      <div className="rounded-2xl bg-card border border-rim overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rim">
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Студент</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Email</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Дата</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Доступ</th>
            </tr>
          </thead>
          <tbody>
            {(recentUsers ?? []).map((u, i) => (
              <tr key={u.id} className={i < (recentUsers?.length ?? 0) - 1 ? 'border-b border-rim' : ''}>
                <td className="px-5 py-3 text-bright">{u.full_name || '—'}</td>
                <td className="px-5 py-3 text-soft">{u.email}</td>
                <td className="px-5 py-3 text-muted text-xs">
                  {new Date(u.created_at).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-5 py-3">
                  {u.has_access
                    ? <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Полный</span>
                    : <span className="text-xs font-semibold text-muted bg-card px-2 py-0.5 rounded-full border border-rim">Бесплатный</span>
                  }
                </td>
              </tr>
            ))}
            {(recentUsers ?? []).length === 0 && (
              <tr><td colSpan={4} className="px-5 py-8 text-center text-muted">Студентов пока нет</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

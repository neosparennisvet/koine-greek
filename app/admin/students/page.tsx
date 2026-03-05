// @ts-nocheck
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { GrantAccessButton, RevokeAccessButton } from './AccessButtons'
import Link from 'next/link'

export const metadata = { title: 'Admin — Студенты' }

export default async function StudentsPage({ searchParams }) {
  const supabase = createServerSupabaseClient()
  const search = searchParams?.q || ''

  let query = supabase
    .from('profiles')
    .select('id, email, full_name, has_access, created_at')
    .order('created_at', { ascending: false })

  if (search) {
    query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`)
  }

  const { data: students } = await query

  // Get lesson counts per user
  const { data: progressData } = await supabase
    .from('lesson_progress')
    .select('user_id, completed')
    .eq('completed', true)

  const progressByUser = {}
  for (const row of progressData ?? []) {
    progressByUser[row.user_id] = (progressByUser[row.user_id] || 0) + 1
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-greek text-4xl font-light text-bright mb-1">Студенты</h1>
          <p className="text-muted text-sm">{students?.length ?? 0} зарегистрировано</p>
        </div>
        <Link href="/admin" className="text-sm text-soft hover:text-textc transition-colors">← Назад</Link>
      </div>

      {/* Search */}
      <form method="GET" className="mb-6">
        <div className="flex gap-3">
          <input
            name="q"
            defaultValue={search}
            placeholder="Поиск по имени или email..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-card border border-rim text-textc text-sm placeholder:text-muted focus:outline-none focus:border-gold/50"
          />
          <button type="submit" className="px-5 py-2.5 rounded-xl bg-gold text-night text-sm font-semibold hover:bg-goldl transition-colors">
            Найти
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="rounded-2xl bg-card border border-rim overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-rim">
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Студент</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Уроков пройдено</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Дата</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Доступ</th>
              <th className="text-left px-5 py-3 text-xs font-bold uppercase tracking-wider text-muted">Действие</th>
            </tr>
          </thead>
          <tbody>
            {(students ?? []).map((s, i) => (
              <tr key={s.id} className={i < (students?.length ?? 0) - 1 ? 'border-b border-rim' : ''}>
                <td className="px-5 py-4">
                  <div className="font-medium text-bright">{s.full_name || '—'}</div>
                  <div className="text-xs text-muted">{s.email}</div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-mono text-gold">{progressByUser[s.id] ?? 0}</span>
                  <span className="text-muted text-xs"> / 36</span>
                </td>
                <td className="px-5 py-4 text-muted text-xs">
                  {new Date(s.created_at).toLocaleDateString('ru-RU')}
                </td>
                <td className="px-5 py-4">
                  {s.has_access
                    ? <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-full">✓ Полный</span>
                    : <span className="text-xs font-semibold text-muted bg-night px-2 py-1 rounded-full border border-rim">Бесплатный</span>
                  }
                </td>
                <td className="px-5 py-4">
                  {s.has_access
                    ? <RevokeAccessButton userId={s.id} />
                    : <GrantAccessButton userId={s.id} />
                  }
                </td>
              </tr>
            ))}
            {(students ?? []).length === 0 && (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-muted">Студентов не найдено</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

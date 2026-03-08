// @ts-nocheck
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { COURSE_MODULES, getAllLessons } from '@/lib/course-data'
import { calcProgress } from '@/lib/utils'
import Link from 'next/link'

export const metadata = { title: 'Личный кабинет' }

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  const { data: rawProgress } = await supabase
    .from('lesson_progress')
    .select('lesson_id, completed, time_spent')
    .eq('user_id', user.id)

  const progress = rawProgress || []
  const completed = progress.filter(p => p.completed)
  const allLessons = getAllLessons()
  const totalDone = completed.length
  const hoursSpent = Math.round(
    progress.reduce((s, p) => s + (p.time_spent || 0), 0) / 60
  )
  const name = profile?.full_name?.split(' ')[0] || 'студент'
  const doneIds = new Set(completed.map(p => p.lesson_id))
  const nextLesson = allLessons.find(l => !doneIds.has(l.id)) ?? allLessons[0]

  const moduleProgress = COURSE_MODULES.map(mod => {
    const doneLessons = mod.lessons.filter(l => doneIds.has(l.id)).length
    return { ...mod, done: doneLessons, pct: calcProgress(doneLessons, mod.lessons.length) }
  })

  const colors = ['bg-teal', 'bg-amber', 'bg-indigo', 'bg-rose', 'bg-goldl']

  return (
    <div className="p-10 max-w-5xl">
      <h1 className="font-greek text-[clamp(36px,4vw,52px)] font-light text-bright leading-tight mb-2">
        Добро пожаловать, <em className="italic text-gold">{name}!</em>
      </h1>
      <p className="text-soft text-base mb-10">
        Вы прошли {totalDone} из {allLessons.length} уроков.
      </p>

      <div className="flex items-center justify-between gap-5 p-6 rounded-2xl bg-gradient-to-br from-gold/10 to-indigo/5 border border-gold/25 mb-10 flex-wrap">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-gold mb-1">Продолжить обучение</div>
          <div className="text-lg font-semibold text-bright mb-1">{nextLesson.title}</div>
          <div className="text-sm text-muted">Модуль {nextLesson.moduleId} · {nextLesson.duration}</div>
        </div>
        <Link href={`/lesson/${nextLesson.id}`}
          className="px-6 py-3 rounded-xl font-semibold text-sm bg-gold text-night hover:bg-goldl transition-all shrink-0">
          Продолжить →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: '📖', value: totalDone,         label: 'Уроков пройдено' },
          { icon: '⏱️', value: `${hoursSpent}ч`,  label: 'Часов обучения' },
          { icon: '✍️', value: progress.length,   label: 'Заданий выполнено' },
          { icon: '📚', value: allLessons.length, label: 'Всего уроков' },
        ].map(s => (
          <div key={s.label} className="p-5 rounded-2xl bg-card border border-rim">
            <div className="text-2xl mb-3">{s.icon}</div>
            <div className="font-greek text-3xl font-semibold text-bright leading-none mb-1">{s.value}</div>
            <div className="text-xs text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="text-lg font-semibold text-bright mb-5">Прогресс по модулям</h2>
      <div className="space-y-3">
        {moduleProgress.map((mod, i) => (
          <div key={mod.id} className="p-5 rounded-2xl bg-card border border-rim">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-bright">{mod.title}</span>
              <span className="font-mono text-xs text-gold">{mod.pct}%</span>
            </div>
            <div className="h-1.5 bg-rim rounded-full overflow-hidden">
              <div className={`h-full rounded-full ${colors[i] || 'bg-teal'}`}
                style={{ width: `${mod.pct}%` }} />
            </div>
            <div className="flex justify-between mt-2 font-mono text-xs text-muted">
              <span>{mod.done}/{mod.lessons.length} уроков</span>
              <span>{mod.pct === 100 ? '✓ Завершён' : mod.pct > 0 ? 'В процессе' : 'Не начат'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

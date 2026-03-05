// @ts-nocheck
import { COURSE_MODULES, getAllLessons } from '@/lib/course-data'
import Link from 'next/link'

export const metadata = { title: 'Admin — Уроки' }

export default function LessonsAdminPage() {
  const allLessons = getAllLessons()

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-greek text-4xl font-light text-bright mb-1">Уроки</h1>
          <p className="text-muted text-sm">{allLessons.length} уроков · 5 модулей</p>
        </div>
        <Link href="/admin" className="text-sm text-soft hover:text-textc transition-colors">← Назад</Link>
      </div>

      {/* Info box */}
      <div className="p-4 rounded-xl bg-gold/5 border border-gold/20 mb-8 text-sm text-soft">
        💡 Сейчас уроки хранятся в коде. Чтобы редактировать — откройте файл
        <code className="mx-1 px-1.5 py-0.5 bg-card rounded text-gold text-xs">components/lesson/LessonContent.tsx</code>
        в вашей папке проекта. В следующей версии будет визуальный редактор прямо здесь.
      </div>

      {/* Modules */}
      <div className="space-y-6">
        {COURSE_MODULES.map(mod => (
          <div key={mod.id} className="rounded-2xl bg-card border border-rim overflow-hidden">
            <div className="px-5 py-4 border-b border-rim flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gold mr-2">Модуль {mod.id}</span>
                <span className="font-semibold text-bright">{mod.title}</span>
              </div>
              <span className="text-xs text-muted">{mod.lessons.length} уроков</span>
            </div>
            <div className="divide-y divide-rim">
              {mod.lessons.map(lesson => (
                <div key={lesson.id} className="px-5 py-3 flex items-center justify-between hover:bg-night/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted w-8">{lesson.id}</span>
                    <span className="text-sm text-textc">{lesson.title}</span>
                    {lesson.isFree && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-tealb bg-tealb/10 px-1.5 py-0.5 rounded-full">Бесплатно</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted">{lesson.duration}</span>
                    <Link href={`/lesson/${lesson.id}`} target="_blank"
                      className="text-xs text-gold hover:text-goldl transition-colors">
                      Просмотр →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

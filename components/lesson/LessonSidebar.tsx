// @ts-nocheck
'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
// types handled inline

interface Props {
  modules: CourseModule[]
  currentLessonId: string
  completedIds: Set<string>
  totalLessons: number
  doneLessons: number
}

export function LessonSidebar({ modules, currentLessonId, completedIds, totalLessons, doneLessons }: Props) {
  const pct = Math.round((doneLessons / totalLessons) * 100)

  return (
    <aside className="fixed left-0 top-0 h-full w-[300px] bg-deep border-r border-rim flex flex-col z-30 overflow-y-auto">

      {/* Header */}
      <div className="px-5 py-4 border-b border-rim sticky top-0 bg-deep z-10">
        <Link href="/" className="font-greek text-base font-semibold text-gold">Κοινή Greek</Link>
        <div className="text-xs text-muted mt-1">Библейский греческий</div>
        <div className="mt-3">
          <div className="h-1 bg-rim rounded-full overflow-hidden">
            <div className="h-full bg-teal rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="font-mono text-[10px] text-muted mt-1">{pct}% · {doneLessons}/{totalLessons} уроков</div>
        </div>
      </div>

      {/* Modules */}
      <div className="flex-1 pb-4">
        {modules.map(mod => (
          <div key={mod.id}>
            <div className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-[2px] text-muted bg-black/20 border-b border-rim">
              Модуль {mod.id} · {mod.title}
            </div>
            {mod.lessons.map(lesson => {
              const isActive    = lesson.id === currentLessonId
              const isDone      = completedIds.has(lesson.id)
              const isLocked    = !lesson.isFree && !completedIds.has(lesson.id) && lesson.moduleId > 1

              return (
                <Link
                  key={lesson.id}
                  href={`/lesson/${lesson.id}`}
                  className={cn(
                    'flex items-center gap-2.5 px-5 py-2.5 text-sm border-b border-rim/30 transition-all',
                    isActive
                      ? 'bg-gold/8 text-goldl border-l-2 border-gold pl-[18px]'
                      : isDone
                      ? 'text-teal hover:bg-white/[.02]'
                      : 'text-soft hover:bg-white/[.02] hover:text-textc'
                  )}
                >
                  <span className="w-4 text-xs shrink-0">
                    {isActive ? '▶' : isDone ? '✓' : isLocked ? '🔒' : '○'}
                  </span>
                  <span className="leading-snug">{lesson.title}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </aside>
  )
}

// @ts-nocheck
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { AmbientPlayer } from '@/components/ui/AmbientPlayer'

interface Props {
  modules: any[]
  currentLessonId: string
  completedIds: Set<string>
  totalLessons: number
  doneLessons: number
}

export function LessonSidebar({ modules, currentLessonId, completedIds, totalLessons, doneLessons }: Props) {
  const pct = Math.round((doneLessons / totalLessons) * 100)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<Set<number>>(() => {
    const set = new Set<number>()
    modules.forEach(m => {
      if (m.lessons.some((l: any) => l.id === currentLessonId)) set.add(m.id)
    })
    return set
  })

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function toggleModule(id: number) {
    setExpanded(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  return (
    <>
      {/* Toggle button — always visible, top-left corner */}
      <button
        onClick={() => setOpen(p => !p)}
        aria-label={open ? 'Закрыть навигацию' : 'Открыть навигацию'}
        className="lesson-sidebar-toggle"
        style={{
          position: 'fixed',
          left: open ? '300px' : '0px',
          top: '14px',
          zIndex: 50,
          width: '42px',
          height: '42px',
          borderRadius: '0 10px 10px 0',
          background: 'var(--c-surface)',
          border: '1px solid var(--c-border)',
          borderLeft: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)',
          color: 'var(--c-muted)',
          fontSize: '16px',
          boxShadow: '2px 2px 12px rgba(0,0,0,.15)',
        }}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Overlay backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,.45)',
          zIndex: 29,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s',
        }}
      />

      {/* Sidebar panel */}
      <aside
        className="flex flex-col z-30"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100%',
          width: '300px',
          background: 'var(--c-surface)',
          borderRight: '1px solid var(--c-border)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: open ? '4px 0 24px rgba(0,0,0,.25)' : 'none',
        }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--c-border)' }}>
          <Link href="/dashboard" className="flex items-center gap-2 group mb-3">
            <span className="text-lg">←</span>
            <span className="text-[13px] font-semibold" style={{ color: 'var(--c-muted)' }}>Назад в кабинет</span>
          </Link>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: 'var(--c-muted)' }}>
              Прогресс курса
            </span>
            <span className="text-[11px] font-bold text-gold">{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-border)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #c99a2e, #e8b84b)' }}
            />
          </div>
          <p className="text-[11px] mt-1" style={{ color: 'var(--c-muted)' }}>
            {doneLessons} из {totalLessons} уроков пройдено
          </p>
        </div>

        {/* Lessons list */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">
          {modules.map((mod: any) => {
            const isOpen = expanded.has(mod.id)
            const modDone = mod.lessons.filter((l: any) => completedIds.has(l.id)).length
            return (
              <div key={mod.id} className="mb-1">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-bold text-gold shrink-0">М{mod.id}</span>
                    <span className="text-[12px] font-semibold truncate" style={{ color: 'var(--c-text)' }}>
                      {mod.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px]" style={{ color: 'var(--c-muted)' }}>
                      {modDone}/{mod.lessons.length}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--c-muted)', transform: isOpen ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>
                      ▾
                    </span>
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-1">
                    {mod.lessons.map((lesson: any) => {
                      const isCurrent = lesson.id === currentLessonId
                      const isDone = completedIds.has(lesson.id)
                      return (
                        <Link key={lesson.id} href={`/lesson/${lesson.id}`}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-2.5 px-4 py-2 text-[13px] transition-all border-l-2 ml-0',
                            isCurrent
                              ? 'border-l-gold bg-gold/10 font-semibold'
                              : 'border-l-transparent hover:bg-black/5 dark:hover:bg-white/4'
                          )}
                          style={{
                            color: isCurrent ? 'var(--c-heading)' : 'var(--c-soft)',
                          }}
                        >
                          <span className="shrink-0 text-[12px] w-4 text-center">
                            {isCurrent ? '▶' : isDone ? '✓' : '○'}
                          </span>
                          <span className="truncate leading-tight">
                            {lesson.id.split('-')[1]}. {lesson.title}
                          </span>
                          {lesson.isFree && !isDone && !isCurrent && (
                            <span className="ml-auto shrink-0 text-[9px] text-tealb font-bold">FREE</span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: 'var(--c-border)' }}>
          <Link href="/dashboard/settings"
            className="text-[12px] transition-colors hover:text-textc"
            style={{ color: 'var(--c-muted)' }}>
            ⚙️ Настройки
          </Link>
          <div className="flex items-center gap-1"><AmbientPlayer /><ThemeToggle /></div>
        </div>
      </aside>
    </>
  )
}

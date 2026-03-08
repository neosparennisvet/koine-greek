'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CourseModule } from '@/types'
import { cn } from '@/lib/utils'

export function CourseAccordion({ modules }: { modules: CourseModule[] }) {
  const [open, setOpen] = useState<number | null>(1)

  return (
    <div className="space-y-3">
      {modules.map(mod => (
        <div key={mod.id} className="bg-card border border-rim rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === mod.id ? null : mod.id)}
            className="w-full flex items-center gap-4 px-6 py-5 hover:bg-white/[.02] transition-colors text-left"
          >
            <span className="font-mono text-[11px] font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full shrink-0">
              МОДУЛЬ {String(mod.id).padStart(2,'0')}
            </span>
            <span className="text-base font-semibold text-bright flex-1">{mod.title}</span>
            <span className="text-sm text-muted mr-2">{mod.lessons.length} уроков</span>
            <span className={cn('text-muted transition-transform text-lg', open === mod.id && 'rotate-180')}>⌄</span>
          </button>

          {open === mod.id && (
            <div className="px-6 pb-4 space-y-1">
              {mod.lessons.map(lesson => (
                <Link
                  key={lesson.id}
                  href={lesson.isFree ? `/lesson/${lesson.id}` : '/auth/register'}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/[.03] transition-colors"
                >
                  <span className={cn('text-sm w-5 text-center shrink-0', lesson.isFree ? 'text-teal' : 'text-muted')}>
                    {lesson.isFree ? '▶' : '🔒'}
                  </span>
                  <span className="text-sm text-textc flex-1">{lesson.title}</span>
                  {lesson.isFree && (
                    <span className="text-[11px] font-semibold text-tealb bg-teal/10 px-2 py-0.5 rounded-full">Бесплатно</span>
                  )}
                  <span className="font-mono text-xs text-muted">{lesson.duration}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

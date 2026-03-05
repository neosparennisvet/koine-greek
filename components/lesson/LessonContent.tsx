'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Lesson, Module, LessonSection, Exercise, VocabWord } from '@/lib/course-data'

// ─── Секция: Введение ─────────────────────────────────────────
function SectionIntro({ content }: { content: string }) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gold/8 to-transparent border border-gold/20 mb-8">
      <div className="text-soft leading-relaxed text-base whitespace-pre-line">{content}</div>
    </div>
  )
}

// ─── Секция: Теория ───────────────────────────────────────────
function SectionTheory({ title, content }: { title?: string; content: string }) {
  return (
    <div className="mb-8">
      {title && <h3 className="text-lg font-semibold text-bright mb-3">{title}</h3>}
      <div className="text-soft leading-relaxed text-[15px] whitespace-pre-line prose-custom"
        dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-bright">$1</strong>') }}
      />
    </div>
  )
}

// ─── Секция: Таблица ──────────────────────────────────────────
function SectionTable({ title, content, data }: { title?: string; content: string; data?: Record<string, string>[] }) {
  if (!data || data.length === 0) return null
  const headers = Object.keys(data[0])
  return (
    <div className="mb-8">
      {title && <h3 className="text-lg font-semibold text-bright mb-2">{title}</h3>}
      {content && <p className="text-muted text-sm mb-3">{content}</p>}
      <div className="rounded-xl border border-rim overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-card/80 border-b border-rim">
              {headers.map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-muted">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={cn('border-b border-rim/50 last:border-0', i % 2 === 0 ? '' : 'bg-card/30')}>
                {headers.map(h => (
                  <td key={h} className="px-4 py-2.5 text-soft font-greek">{row[h]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Секция: Стих из Библии ───────────────────────────────────
function SectionVerse({ title, content }: { title?: string; content: string }) {
  return (
    <div className="mb-8 pl-5 border-l-2 border-gold/50">
      {title && (
        <div className="text-xs font-bold uppercase tracking-widest text-gold mb-2">{title}</div>
      )}
      <div className="text-soft leading-relaxed text-[15px] whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-bright font-greek text-lg">$1</strong>') }}
      />
    </div>
  )
}

// ─── Секция: Подсказка ────────────────────────────────────────
function SectionTip({ title, content }: { title?: string; content: string }) {
  return (
    <div className="mb-8 p-5 rounded-xl bg-teal/5 border border-teal/20">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm">💡</span>
          <span className="text-sm font-semibold text-tealb">{title}</span>
        </div>
      )}
      <div className="text-soft text-sm leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-textc">$1</strong>') }}
      />
    </div>
  )
}

// ─── Секция: Предупреждение ───────────────────────────────────
function SectionWarning({ title, content }: { title?: string; content: string }) {
  return (
    <div className="mb-8 p-5 rounded-xl bg-rose/5 border border-rose/20">
      {title && (
        <div className="text-sm font-semibold text-rose mb-2">{title}</div>
      )}
      <div className="text-soft text-sm leading-relaxed whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: content.replace(/\*\*(.+?)\*\*/g, '<strong class="text-textc">$1</strong>') }}
      />
    </div>
  )
}

// ─── Рендер секции ────────────────────────────────────────────
function RenderSection({ section }: { section: LessonSection }) {
  switch (section.type) {
    case 'intro':    return <SectionIntro content={section.content} />
    case 'theory':   return <SectionTheory title={section.title} content={section.content} />
    case 'table':    return <SectionTable title={section.title} content={section.content} data={section.data} />
    case 'verse':    return <SectionVerse title={section.title} content={section.content} />
    case 'tip':      return <SectionTip title={section.title} content={section.content} />
    case 'warning':  return <SectionWarning title={section.title} content={section.content} />
    case 'example':  return <SectionTheory title={section.title} content={section.content} />
    default:         return null
  }
}

// ─── Словарь ──────────────────────────────────────────────────
function VocabSection({ words }: { words: VocabWord[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  if (words.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-bright mb-1">Словарь урока</h2>
      <p className="text-muted text-sm mb-5">Нажмите на карточку чтобы увидеть перевод</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {words.map((w, i) => (
          <button key={i} onClick={() => setRevealed(p => { const s = new Set(p); s.has(i) ? s.delete(i) : s.add(i); return s })}
            className={cn(
              'p-4 rounded-xl border text-left transition-all duration-200 w-full',
              revealed.has(i)
                ? 'bg-gold/8 border-gold/30'
                : 'bg-card border-rim hover:border-muted'
            )}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-greek text-2xl text-bright mb-0.5">{w.greek}</div>
                <div className="text-xs text-muted">{w.transliteration}</div>
              </div>
              {w.frequency && (
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-muted uppercase tracking-wider">в НЗ</div>
                  <div className="font-mono text-gold text-sm font-semibold">{w.frequency}×</div>
                </div>
              )}
            </div>
            {revealed.has(i) && (
              <div className="mt-3 pt-3 border-t border-gold/20">
                <div className="text-textc font-semibold mb-1">{w.translation}</div>
                {w.example && <div className="text-muted text-xs italic">{w.example}</div>}
              </div>
            )}
            {!revealed.has(i) && (
              <div className="mt-2 text-xs text-muted/50">нажмите чтобы открыть</div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Упражнения ───────────────────────────────────────────────
function ExerciseItem({ ex, index, total }: { ex: Exercise; index: number; total: number }) {
  const [userAnswer, setUserAnswer]   = useState('')
  const [selected, setSelected]       = useState<string | null>(null)
  const [submitted, setSubmitted]     = useState(false)
  const [showExplanation, setShowExp] = useState(false)

  const correctAnswer = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer

  const isCorrect = submitted && (
    ex.type === 'choose'
      ? selected === correctAnswer
      : userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()
  )

  function handleSubmit() {
    if ((ex.type === 'choose' && !selected) || (ex.type !== 'choose' && !userAnswer.trim())) return
    setSubmitted(true)
  }

  function handleReset() {
    setUserAnswer('')
    setSelected(null)
    setSubmitted(false)
    setShowExp(false)
  }

  return (
    <div className={cn(
      'p-5 rounded-2xl border transition-all',
      !submitted ? 'bg-card border-rim' :
      isCorrect  ? 'bg-green-400/5 border-green-400/30' : 'bg-rose/5 border-rose/30'
    )}>
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="text-xs font-bold uppercase tracking-widest text-muted">
          Задание {index + 1} / {total}
        </div>
        {submitted && (
          <div className={cn('text-xs font-semibold px-2 py-0.5 rounded-full',
            isCorrect ? 'text-green-400 bg-green-400/10' : 'text-rose bg-rose/10'
          )}>
            {isCorrect ? '✓ Верно!' : '✗ Неверно'}
          </div>
        )}
      </div>

      <p className="text-textc font-semibold mb-4">{ex.question}</p>

      {ex.type === 'choose' && ex.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ex.options.map(opt => (
            <button key={opt}
              disabled={submitted}
              onClick={() => !submitted && setSelected(opt)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm text-left border transition-all',
                submitted && opt === correctAnswer ? 'bg-green-400/15 border-green-400/50 text-green-400 font-semibold' :
                submitted && opt === selected && !isCorrect ? 'bg-rose/15 border-rose/50 text-rose' :
                selected === opt ? 'bg-gold/15 border-gold/50 text-gold' :
                'bg-night/50 border-rim/50 text-soft hover:border-muted hover:text-textc'
              )}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {(ex.type === 'translate' || ex.type === 'fill') && (
        <div className="mb-4">
          {ex.hint && !submitted && (
            <div className="text-xs text-muted mb-2">Подсказка: {ex.hint}</div>
          )}
          <input
            type="text"
            value={userAnswer}
            onChange={e => !submitted && setUserAnswer(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !submitted && handleSubmit()}
            disabled={submitted}
            placeholder="Введите ответ..."
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border text-sm bg-night/50 text-textc placeholder:text-muted focus:outline-none transition-all',
              submitted && isCorrect  ? 'border-green-400/50' :
              submitted && !isCorrect ? 'border-rose/50' : 'border-rim focus:border-gold/50'
            )}
          />
          {submitted && !isCorrect && (
            <div className="mt-2 text-sm text-green-400">
              Правильный ответ: <strong>{correctAnswer}</strong>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <button onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gold text-night hover:bg-goldl transition-colors">
            Проверить
          </button>
        ) : (
          <>
            <button onClick={handleReset}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-card border border-rim text-soft hover:text-textc transition-colors">
              Ещё раз
            </button>
            {ex.explanation && (
              <button onClick={() => setShowExp(p => !p)}
                className="text-xs text-gold hover:text-goldl transition-colors">
                {showExplanation ? 'Скрыть объяснение' : 'Почему?'}
              </button>
            )}
          </>
        )}
      </div>

      {showExplanation && ex.explanation && (
        <div className="mt-4 pt-4 border-t border-rim/50 text-sm text-muted leading-relaxed">
          {ex.explanation}
        </div>
      )}
    </div>
  )
}

function ExercisesSection({ exercises }: { exercises: Exercise[] }) {
  const [score, setScore] = useState<number | null>(null)
  if (exercises.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold text-bright mb-1">Упражнения</h2>
      <p className="text-muted text-sm mb-5">{exercises.length} заданий</p>
      <div className="space-y-4">
        {exercises.map((ex, i) => (
          <ExerciseItem key={i} ex={ex} index={i} total={exercises.length} />
        ))}
      </div>
    </div>
  )
}

// ─── Итоги урока ──────────────────────────────────────────────
function SummarySection({ points }: { points: string[] }) {
  if (points.length === 0) return null
  return (
    <div className="mb-10 p-6 rounded-2xl bg-card border border-rim">
      <h2 className="text-lg font-semibold text-bright mb-4">📋 Итоги урока</h2>
      <ul className="space-y-2">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-soft">
            <span className="text-gold mt-0.5 shrink-0">✓</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────
interface Props {
  lesson: Lesson
  module: Module | undefined
  userId: string
  prev: Lesson | null
  next: Lesson | null
  isCompleted: boolean
}

export function LessonContent({ lesson, module, userId, prev, next, isCompleted }: Props) {
  const [completed, setCompleted] = useState(isCompleted)
  const [saving, setSaving]       = useState(false)
  const [tab, setTab]             = useState<'lesson' | 'vocab' | 'exercises'>('lesson')

  async function handleComplete() {
    setSaving(true)
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, completed: true }),
      })
      setCompleted(true)
    } catch { /* silent */ }
    finally { setSaving(false) }
  }

  return (
    <div className="max-w-[780px]">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <span className="text-gold font-semibold">Модуль {lesson.moduleId}</span>
        <span>/</span>
        <span>{module?.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
            Урок {lesson.id}
          </span>
          {lesson.isFree && (
            <span className="text-xs font-bold uppercase tracking-widest text-tealb bg-tealb/10 px-2.5 py-1 rounded-full">
              Бесплатно
            </span>
          )}
          {completed && (
            <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
              ✓ Пройден
            </span>
          )}
        </div>
        <h1 className="font-greek text-[clamp(28px,4vw,42px)] font-light text-bright leading-tight mb-2">
          {lesson.title}
        </h1>
        <p className="text-soft text-base">{lesson.subtitle}</p>
        <div className="flex items-center gap-4 mt-3 text-xs text-muted">
          <span>⏱ {lesson.duration}</span>
          <span>📖 {lesson.vocab.length} слов</span>
          <span>✍️ {lesson.exercises.length} заданий</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-card rounded-xl border border-rim mb-8">
        {[
          { key: 'lesson',    label: '📖 Урок' },
          { key: 'vocab',     label: `📚 Словарь (${lesson.vocab.length})` },
          { key: 'exercises', label: `✍️ Задания (${lesson.exercises.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all',
              tab === t.key ? 'bg-gold text-night shadow-sm' : 'text-soft hover:text-textc'
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'lesson' && (
        <div>
          {lesson.sections.map((s, i) => <RenderSection key={i} section={s} />)}
          <SummarySection points={lesson.summary} />
        </div>
      )}

      {tab === 'vocab' && (
        <VocabSection words={lesson.vocab} />
      )}

      {tab === 'exercises' && (
        <ExercisesSection exercises={lesson.exercises} />
      )}

      {/* Complete button */}
      {!completed && (
        <div className="mt-6 mb-10 p-5 rounded-2xl bg-card border border-rim text-center">
          <p className="text-soft text-sm mb-4">Изучили материал и выполнили упражнения?</p>
          <button onClick={handleComplete} disabled={saving}
            className="px-8 py-3 rounded-xl font-semibold bg-gold text-night hover:bg-goldl transition-all disabled:opacity-50 hover:shadow-[0_4px_20px_rgba(212,168,67,.3)]">
            {saving ? 'Сохраняем...' : '✓ Отметить урок как пройденный'}
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 py-6 border-t border-rim mt-4">
        {prev ? (
          <Link href={`/lesson/${prev.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rim text-sm text-soft hover:border-muted hover:text-textc transition-all">
            <span className="text-lg">←</span>
            <div>
              <div className="text-xs text-muted">Предыдущий</div>
              <div className="font-medium truncate max-w-[160px]">{prev.title}</div>
            </div>
          </Link>
        ) : <div />}

        {next ? (
          <Link href={`/lesson/${next.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-night text-sm font-semibold hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.2)]">
            <div className="text-right">
              <div className="text-xs text-night/60">Следующий</div>
              <div className="truncate max-w-[160px]">{next.title}</div>
            </div>
            <span className="text-lg">→</span>
          </Link>
        ) : (
          <Link href="/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold text-night text-sm font-semibold hover:bg-goldl transition-all">
            В кабинет →
          </Link>
        )}
      </div>
    </div>
  )
}

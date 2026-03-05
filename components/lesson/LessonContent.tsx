'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { CourseLesson, CourseModule } from '@/types'

// Demo content for lesson 2-2
const DEMO_MORPH = [
  { form: 'ἄνθρωπον', case_: 'Вин.п.', number: 'ед.ч.', gender: 'муж.', lexical: 'ἄνθρωπος', meaning: 'человека' },
  { form: 'ὧραι',     case_: 'Им.п.',  number: 'мн.ч.', gender: 'жен.', lexical: 'ὥρα',      meaning: 'часы' },
  { form: 'τήν',      case_: 'Вин.п.', number: 'ед.ч.', gender: 'жен.', lexical: 'ὁ/ἡ/τό',  meaning: 'артикль' },
  { form: 'λόγους',   case_: 'Вин.п.', number: 'мн.ч.', gender: 'муж.', lexical: 'λόγος',    meaning: 'слова' },
  { form: 'θεοί',     case_: 'Им.п.',  number: 'мн.ч.', gender: 'муж.', lexical: 'θεός',     meaning: 'боги' },
]
const DEMO_TRANS = [
  { greek: 'αὐτοὶ τὸν θεὸν ὄψονται.', hint: '(они увидят)', answer: 'Они увидят Бога. (Мф. 5:8)' },
  { greek: 'Διώκετε τὴν ἀγάπην.',     hint: '(достигайте)', answer: 'Достигайте любви. (1 Кор. 14:1)' },
  { greek: 'ἐραυνᾶτε τὰς γραφάς.',    hint: '(исследуйте)', answer: 'Исследуйте Писания. (Ин. 5:39)' },
  { greek: 'πεπλήρωται ὁ καιρός.',    hint: '(исполнилось)', answer: 'Исполнилось время. (Мк. 1:15)' },
]

interface Props {
  lesson: CourseLesson
  module: CourseModule | null
  userId: string
  prev: CourseLesson | null
  next: CourseLesson | null
  isCompleted: boolean
}

export function LessonContent({ lesson, module, userId, prev, next, isCompleted }: Props) {
  const [revealedMorph, setRevealedMorph] = useState<Set<string>>(new Set())
  const [revealedTrans, setRevealedTrans] = useState<Set<number>>(new Set())
  const [completed, setCompleted]         = useState(isCompleted)
  const [saving, setSaving]               = useState(false)

  function revealMorph(key: string) {
    setRevealedMorph(prev => new Set([...prev, key]))
  }
  function toggleTrans(i: number) {
    setRevealedTrans(prev => {
      const s = new Set(prev)
      s.has(i) ? s.delete(i) : s.add(i)
      return s
    })
  }

  async function handleComplete() {
    setSaving(true)
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, completed: true }),
      })
      setCompleted(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <article>
      {/* Header */}
      <div className="mb-10">
        <div className="text-xs font-semibold uppercase tracking-[3px] text-tealb mb-3">
          Модуль {lesson.moduleId} · Урок {lesson.id}
        </div>
        <h1 className="font-greek text-[clamp(32px,4vw,48px)] font-semibold text-bright leading-tight mb-4">
          {lesson.title}
        </h1>
        <div className="flex flex-wrap gap-3">
          {[`⏱ ${lesson.duration}`, '📖 2 падежа', '🔤 3 склонения', '✍️ Домашнее задание'].map(chip => (
            <span key={chip} className="px-3 py-1.5 rounded-full text-xs bg-card border border-rim text-textc">{chip}</span>
          ))}
        </div>
      </div>

      {/* ── Main lesson content ── */}
      <div className="prose prose-invert max-w-none space-y-6 text-base leading-relaxed">

        <h2 className="font-greek text-2xl font-semibold text-bright mt-10 mb-4">Окончания — ключ к смыслу</h2>
        <p className="text-textc">В русском языке мы говорим <strong className="text-bright">«Бог любит мир»</strong> — и всё понятно из порядка слов. В греческом же слова могут стоять в <em>любом</em> порядке. Смысл определяется <strong className="text-gold">окончанием</strong>.</p>

        {/* Info box */}
        <div className="bg-gold/5 border border-gold/20 border-l-4 border-l-gold rounded-r-2xl px-6 py-5 not-prose">
          <div className="text-[10px] font-bold uppercase tracking-[3px] text-gold mb-2">✦ Ключевой принцип</div>
          <p className="text-sm text-textc leading-relaxed">
            Порядок слов в греческом используется для <strong className="text-bright">эмфазы</strong>: слово в начале — подчёркнуто. Функцию слова (субъект/объект) определяет <strong className="text-gold">окончание</strong>.
          </p>
        </div>

        {/* Word anatomy */}
        <h2 className="font-greek text-2xl font-semibold text-bright mt-10 mb-4">Строение слова: основа + окончание</h2>
        <div className="bg-card border border-rim rounded-2xl p-8 not-prose text-center">
          <div className="font-mono text-[10px] text-muted tracking-[3px] uppercase mb-4">II Склонение · Мужской род</div>
          <div className="font-greek text-8xl font-bold flex justify-center leading-none mb-8">
            <span className="text-indigol relative">
              λογο
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-sans text-[9px] font-bold text-indigol uppercase tracking-wider whitespace-nowrap">основа · значение</span>
            </span>
            <span className="text-gold relative">
              ς
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-sans text-[9px] font-bold text-gold uppercase tracking-wider whitespace-nowrap">окончание</span>
            </span>
          </div>
          <div className="flex justify-center gap-8 mt-10 flex-wrap">
            <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-indigol" /><strong className="text-indigol">λογο–</strong> = «слово, речь»</div>
            <div className="flex items-center gap-2 text-sm"><span className="w-3 h-3 rounded-full bg-gold" /><strong className="text-gold">–ς</strong> = им.п., ед.ч., муж.р.</div>
          </div>
        </div>

        {/* Cases table */}
        <h2 className="font-greek text-2xl font-semibold text-bright mt-10 mb-4">Два падежа</h2>
        <div className="overflow-x-auto rounded-2xl border border-rim not-prose">
          <table className="w-full text-sm bg-card">
            <thead><tr className="bg-gold/8">
              <th className="px-4 py-3 text-left font-mono text-[10px] text-gold uppercase tracking-wider">Падеж</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] text-gold uppercase tracking-wider">Форма</th>
              <th className="px-4 py-3 text-left font-mono text-[10px] text-gold uppercase tracking-wider">Роль</th>
            </tr></thead>
            <tbody>
              <tr className="border-t border-rim/50 hover:bg-white/[.02]">
                <td className="px-4 py-3"><span className="badge-nom">Именительный</span></td>
                <td className="px-4 py-3 font-greek text-xl"><span className="text-indigol">ἀπόστολο</span><span className="text-gold font-bold">ς</span></td>
                <td className="px-4 py-3 text-textc">Подлежащее</td>
              </tr>
              <tr className="border-t border-rim/50 hover:bg-white/[.02]">
                <td className="px-4 py-3"><span className="badge-acc">Винительный</span></td>
                <td className="px-4 py-3 font-greek text-xl"><span className="text-indigol">ἀπόστολο</span><span className="text-gold font-bold">ν</span></td>
                <td className="px-4 py-3 text-textc">Прямое дополнение</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Example sentence */}
        <div className="bg-card border border-rim rounded-2xl p-6 not-prose">
          <div className="font-greek text-2xl text-goldl mb-2">
            <span className="text-indigol">ὁ ἀπόστολος</span> πέμπει <span className="text-gold">τὸν ἀπόστολον</span>.
          </div>
          <div className="text-sm text-muted italic mb-3">«Апостол посылает апостола.»</div>
          <div className="flex gap-2 flex-wrap">
            <span className="badge-nom">ἀπόστολος — подлежащее</span>
            <span className="badge-acc">ἀπόστολον — дополнение</span>
          </div>
        </div>

        {/* Exegesis */}
        <div className="bg-rose/5 border border-rose/20 border-l-4 border-l-rose rounded-r-2xl px-6 py-5 not-prose mt-8">
          <div className="text-[10px] font-bold uppercase tracking-[3px] text-rose mb-3">🔍 Экзегетика · Иоанна 1:1</div>
          <div className="font-greek text-2xl text-goldl mb-3 leading-relaxed">καὶ θεὸς ἦν ὁ λόγος</div>
          <p className="text-sm text-textc leading-relaxed">
            «и Слово было Богом». θεός стоит первым — это <strong className="text-bright">эмфаза</strong> на Божественном качестве. Перед θεός нет артикля — значит «Слово» не отождествляется с Отцом. Артикль <strong className="text-gold">ὁ</strong> указывает на «Слово» как на подлежащее. Богословская точность в трёх словах.
          </p>
        </div>

      </div>

      {/* ── HOMEWORK ── */}
      <div className="mt-14">
        <h2 className="font-greek text-2xl font-semibold text-bright mb-6">📝 Домашнее задание</h2>

        {/* Exercise 1 — Morphology */}
        <div className="bg-deep border border-rim rounded-2xl p-7 mb-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-9 h-9 rounded-full bg-gold text-night flex items-center justify-center font-bold text-sm shrink-0">1</div>
            <div>
              <div className="font-semibold text-bright">Морфологический анализ</div>
              <div className="text-xs text-muted italic mt-0.5">Нажмите на ячейку, чтобы увидеть ответ</div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[560px]">
              <thead>
                <tr className="bg-white/5">
                  {['#','Форма','Падеж','Число','Род','Лексич. форма','Значение'].map(h => (
                    <th key={h} className="px-3 py-2.5 text-left font-mono text-gold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_MORPH.map((r, i) => (
                  <tr key={i} className="border-t border-rim/30 hover:bg-white/[.02]">
                    <td className="px-3 py-2.5 font-mono text-gold">{i+1}</td>
                    <td className="px-3 py-2.5 font-greek text-xl text-goldl">{r.form}</td>
                    {([r.case_, r.number, r.gender, r.lexical, r.meaning] as string[]).map((val, j) => {
                      const key = `${i}-${j}`
                      const shown = revealedMorph.has(key)
                      return (
                        <td key={j} className="px-3 py-2.5">
                          <button
                            onClick={() => revealMorph(key)}
                            className={cn(
                              'px-2 py-1 rounded text-xs font-mono border transition-all min-w-[64px] text-center',
                              shown
                                ? 'text-emerald-400 bg-emerald-400/8 border-emerald-400/25'
                                : 'text-transparent bg-white/5 border-rim hover:border-gold select-none'
                            )}
                          >
                            {shown ? val : '••••'}
                          </button>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Exercise 2 — Translation */}
        <div className="bg-deep border border-rim rounded-2xl p-7">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-9 h-9 rounded-full bg-gold text-night flex items-center justify-center font-bold text-sm shrink-0">2</div>
            <div>
              <div className="font-semibold text-bright">Перевод стихов</div>
              <div className="text-xs text-muted italic mt-0.5">Переведите предложение, затем нажмите «ответ»</div>
            </div>
          </div>
          <div className="space-y-0 divide-y divide-rim/30">
            {DEMO_TRANS.map((r, i) => (
              <div key={i} className="py-4 flex items-start gap-4">
                <span className="font-mono text-xs text-gold pt-0.5 w-5 shrink-0">{i+1}.</span>
                <div className="flex-1 min-w-0">
                  <div className="font-greek text-xl text-goldl mb-1">{r.greek}</div>
                  <div className="font-mono text-[10px] text-muted/50 mb-2">{r.hint}</div>
                  {revealedTrans.has(i) && (
                    <div className="text-sm text-emerald-400 italic">{r.answer}</div>
                  )}
                </div>
                <button
                  onClick={() => toggleTrans(i)}
                  className="shrink-0 px-3 py-1 rounded-lg border border-rim text-xs font-mono text-muted hover:border-gold hover:text-gold transition-colors"
                >
                  {revealedTrans.has(i) ? 'скрыть' : 'ответ'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-14 pt-8 border-t border-rim flex-wrap gap-4">
        {prev ? (
          <Link href={`/lesson/${prev.id}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rim text-sm text-textc hover:border-gold hover:text-gold transition-colors">
            ← {prev.title}
          </Link>
        ) : <span />}

        <button
          onClick={handleComplete} disabled={completed || saving}
          className={cn(
            'px-6 py-2.5 rounded-xl text-sm font-semibold transition-all',
            completed
              ? 'bg-teal/20 text-tealb border border-teal/30 cursor-default'
              : 'bg-teal text-white hover:bg-tealb'
          )}
        >
          {saving ? 'Сохраняем...' : completed ? '✓ Урок завершён' : 'Отметить как выполненный'}
        </button>

        {next ? (
          <Link href={`/lesson/${next.id}`} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-night text-sm font-semibold hover:bg-goldl transition-all hover:shadow-[0_4px_16px_rgba(212,168,67,.3)]">
            {next.title} →
          </Link>
        ) : <span />}
      </div>
    </article>
  )
}

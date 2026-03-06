// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─── SVG Иллюстрации ─────────────────────────────────────────
function Illustration({ type }: { type: string }) {
  if (type === 'mediterranean-map') return (
    <div className="my-6 rounded-2xl overflow-hidden border border-rim bg-card">
      <svg viewBox="0 0 700 280" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="seaGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a3a5c"/>
            <stop offset="100%" stopColor="#0d2035"/>
          </radialGradient>
          <radialGradient id="alexGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c99a2e" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#c99a2e" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {/* Sea */}
        <rect width="700" height="280" fill="url(#seaGrad)"/>
        {/* Wave lines */}
        {[40,80,120,160,200,240].map(y => (
          <path key={y} d={`M0 ${y} Q175 ${y-8} 350 ${y} T700 ${y}`} fill="none" stroke="#2a5070" strokeWidth="0.8" opacity="0.6"/>
        ))}
        {/* Land masses */}
        <path d="M50 80 L90 60 L150 55 L200 70 L220 90 L200 110 L160 120 L100 115 L60 100 Z" fill="#2d5a27" opacity="0.8"/>
        <text x="130" y="90" fill="#7dc87a" fontSize="9" textAnchor="middle" fontFamily="Georgia">ГРЕЦИЯ</text>
        <path d="M280 40 L340 30 L420 45 L460 70 L440 100 L380 110 L320 100 L270 75 Z" fill="#2d5a27" opacity="0.8"/>
        <text x="365" y="72" fill="#7dc87a" fontSize="9" textAnchor="middle" fontFamily="Georgia">МАЛАЯ АЗИЯ</text>
        <path d="M420 120 L480 110 L550 115 L580 140 L560 170 L500 175 L440 160 L415 140 Z" fill="#8b7355" opacity="0.8"/>
        <text x="498" y="148" fill="#d4b896" fontSize="9" textAnchor="middle" fontFamily="Georgia">ИУДЕЯ</text>
        <path d="M100 160 L180 150 L240 165 L250 200 L210 220 L140 215 L90 195 Z" fill="#c4a35a" opacity="0.8"/>
        <text x="170" y="190" fill="#fff" fontSize="9" textAnchor="middle" fontFamily="Georgia">ЕГИПЕТ</text>
        <path d="M0 100 L40 90 L50 120 L60 160 L40 200 L0 210 Z" fill="#2d6b4a" opacity="0.7"/>
        <text x="22" y="155" fill="#7dc87a" fontSize="8" textAnchor="middle" fontFamily="Georgia" transform="rotate(-90,22,155)">ИТАЛИЯ</text>
        {/* Alexander's route */}
        <path d="M140 85 Q280 60 365 72 Q430 85 465 130 Q510 160 520 148" 
              fill="none" stroke="#c99a2e" strokeWidth="2" strokeDasharray="5,3" opacity="0.9"/>
        {/* Glow on route */}
        <circle cx="140" cy="85" r="5" fill="#c99a2e" opacity="0.9"/>
        <circle cx="365" cy="72" r="5" fill="#c99a2e" opacity="0.7"/>
        <circle cx="520" cy="148" r="5" fill="#c99a2e" opacity="0.7"/>
        {/* Labels */}
        <text x="150" y="75" fill="#c99a2e" fontSize="8" fontFamily="Georgia">Афины</text>
        <text x="370" y="65" fill="#c99a2e" fontSize="8" fontFamily="Georgia">Эфес</text>
        <text x="515" y="142" fill="#c99a2e" fontSize="8" fontFamily="Georgia">Иерусалим</text>
        {/* Title */}
        <text x="350" y="260" fill="#8892aa" fontSize="10" textAnchor="middle" fontFamily="Georgia, serif">
          Греческий язык распространился по всему Средиземноморью (IV в. до н.э.)
        </text>
      </svg>
    </div>
  )

  if (type === 'timeline') return (
    <div className="my-6 rounded-2xl overflow-hidden border border-rim bg-card p-6">
      <svg viewBox="0 0 680 100" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="30" y1="50" x2="650" y2="50" stroke="var(--c-border)" strokeWidth="2"/>
        {[
          { x: 50,  label: 'XIII до н.э.', sub: 'Линейное\nписьмо Б', col: '#8892aa' },
          { x: 175, label: 'VIII–IV до н.э.', sub: 'Классический\nгреческий', col: '#5b6ef5' },
          { x: 310, label: 'IV до н.э.', sub: 'Александр\nВеликий', col: '#c99a2e' },
          { x: 440, label: 'III до н.э.–IV н.э.', sub: 'Койне / НЗ', col: '#3abfae' },
          { x: 620, label: 'Сегодня', sub: 'Новогреческий', col: '#7dc87a' },
        ].map(({ x, label, sub, col }) => (
          <g key={x}>
            <circle cx={x} cy="50" r="6" fill={col} opacity="0.9"/>
            <text x={x} y="28" fill={col} fontSize="8.5" textAnchor="middle" fontFamily="Georgia">{label}</text>
            {sub.split('\n').map((line, i) => (
              <text key={i} x={x} y={70 + i * 13} fill="var(--c-soft)" fontSize="8" textAnchor="middle" fontFamily="Georgia">{line}</text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )

  if (type === 'alphabet-chart') return (
    <div className="my-6 rounded-2xl border border-rim bg-card overflow-hidden">
      <div className="px-5 py-3 border-b border-rim">
        <span className="text-xs font-bold uppercase tracking-widest text-gold">Греческий алфавит — 24 буквы</span>
      </div>
      <svg viewBox="0 0 680 180" className="w-full" xmlns="http://www.w3.org/2000/svg">
        {/* 24 letters in 6 rows x 4 cols */}
        {[
          ['Αα','альфа','[а]'], ['Ββ','бета','[б]'], ['Γγ','гамма','[г]'], ['Δδ','дельта','[д]'],
          ['Εε','эпсилон','[э]'], ['Ζζ','дзета','[дз]'], ['Ηη','эта','[э̄]★'], ['Θθ','тета','[тх]'],
          ['Ιι','йота','[и]'], ['Κκ','каппа','[к]'], ['Λλ','лямбда','[л]'], ['Μμ','мю','[м]'],
          ['Νν','ню','[н]★'], ['Ξξ','кси','[кс]'], ['Οο','омикрон','[о]'], ['Ππ','пи','[п]'],
          ['Ρρ','ро','[р]'], ['Σσς','сигма','[с]'], ['Ττ','тау','[т]'], ['Υυ','ипсилон','[ю]'],
          ['Φφ','фи','[ф]'], ['Χχ','хи','[х]'], ['Ψψ','пси','[пс]'], ['Ωω','омега','[о̄]'],
        ].map(([letter, name, sound], i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const x = 15 + col * 168
          const y = 12 + row * 42
          const isTraicky = sound.includes('★')
          return (
            <g key={i}>
              <rect x={x} y={y} width="158" height="36" rx="6"
                fill={isTraicky ? 'rgba(192,68,90,0.08)' : 'rgba(255,255,255,0.02)'}
                stroke={isTraicky ? 'rgba(192,68,90,0.3)' : 'var(--c-border)'} strokeWidth="0.5"/>
              <text x={x+10} y={y+24} fontSize="18" fill={isTraicky ? '#e07a8e' : 'var(--c-heading)'}
                fontFamily="Georgia, serif" fontWeight="500">{letter.replace('★','')}</text>
              <text x={x+58} y={y+16} fontSize="8" fill="var(--c-muted)" fontFamily="sans-serif">{name}</text>
              <text x={x+58} y={y+28} fontSize="9" fill={isTraicky ? '#e07a8e' : '#3abfae'} fontFamily="monospace">
                {sound.replace('★','')} {isTraicky ? '⚠️' : ''}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="px-5 py-2 border-t border-rim text-xs text-muted">
        ⚠️ Красным выделены «ловушки» — буквы, похожие на русские, но звучащие иначе
      </div>
    </div>
  )

  return null
}

// ─── Рендер секции ────────────────────────────────────────────
function RenderSection({ s }: { s: any }) {
  const html = (text: string) => ({
    __html: text
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--c-heading);font-weight:600">$1</strong>')
      .replace(/\n/g, '<br/>')
  })

  switch (s.type) {
    case 'illustration':
      return <Illustration type={s.illustration} />

    case 'intro':
      return (
        <div className="mb-8 p-6 rounded-2xl bg-card border border-rim">
          <div className="text-[15px] leading-[1.85] text-soft"
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'theory':
      return (
        <div className="mb-7">
          {s.title && <h3 className="text-[17px] font-semibold text-bright mb-3">{s.title}</h3>}
          <div className="text-[15px] leading-[1.85] text-soft lesson-prose"
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'table':
      if (!s.data?.length) return null
      const headers = Object.keys(s.data[0])
      return (
        <div className="mb-7">
          {s.title && <h3 className="text-[17px] font-semibold text-bright mb-2">{s.title}</h3>}
          {s.content && <p className="text-sm text-muted mb-3">{s.content}</p>}
          <div className="rounded-xl border border-rim overflow-hidden shadow-sm">
            <table className="w-full text-[14px]">
              <thead>
                <tr className="bg-card border-b border-rim">
                  {headers.map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {s.data.map((row: any, i: number) => (
                  <tr key={i} className="border-b border-rim/40 last:border-0 hover:bg-card/50 transition-colors">
                    {headers.map(h => (
                      <td key={h} className="px-4 py-3 text-soft" style={{fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '15px'}}>
                        {row[h]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'verse':
      return (
        <div className="mb-7 pl-5 border-l-[3px] border-gold/60 py-1">
          {s.title && <div className="text-[11px] font-bold uppercase tracking-widest text-gold mb-2">{s.title}</div>}
          <div className="text-[15px] leading-[1.85] text-soft"
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'tip':
      return (
        <div className="mb-7 p-5 rounded-xl bg-teal/5 border border-teal/20">
          {s.title && <div className="text-[13px] font-semibold text-tealb mb-2">💡 {s.title}</div>}
          <div className="text-[14px] leading-[1.8] text-soft"
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'warning':
      return (
        <div className="mb-7 p-5 rounded-xl bg-rose/5 border border-rose/25">
          {s.title && <div className="text-[13px] font-semibold text-rose mb-2">{s.title}</div>}
          <div className="text-[14px] leading-[1.8] text-soft"
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    default: return null
  }
}

// ─── Словарь ──────────────────────────────────────────────────
function VocabCard({ w, index }: { w: any; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(p => !p)}
      className={cn(
        'w-full p-4 rounded-xl border text-left transition-all duration-200',
        open ? 'bg-gold/6 border-gold/35 shadow-sm' : 'bg-card border-rim hover:border-muted'
      )}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div style={{fontFamily:'var(--font-cormorant),Georgia,serif', fontSize:'22px', color:'var(--c-heading)', lineHeight:1.2, letterSpacing:'0.01em'}}>
            {w.greek}
          </div>
          <div className="text-[12px] text-muted mt-0.5 font-mono">{w.transliteration}</div>
        </div>
        {w.frequency && (
          <div className="text-right shrink-0">
            <div className="text-[10px] text-muted uppercase tracking-wider">в НЗ</div>
            <div className="text-gold text-[13px] font-bold font-mono">{w.frequency.toLocaleString()}×</div>
          </div>
        )}
      </div>
      {open && (
        <div className="mt-3 pt-3 border-t border-gold/20">
          <div className="text-[15px] font-semibold text-bright mb-1">{w.translation}</div>
          {w.example && <div className="text-[13px] text-muted italic">{w.example}</div>}
        </div>
      )}
      {!open && <div className="mt-2 text-[11px] text-muted/40">нажмите для перевода</div>}
    </button>
  )
}

// ─── Упражнение: сопоставление ────────────────────────────────
function MatchExercise({ ex }: { ex: any }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched]   = useState<Record<string, string>>({})
  const [wrong, setWrong]       = useState<string | null>(null)

  const pairs = ex.pairs ?? []
  const rights = [...pairs.map((p: any) => p.right)].sort(() => Math.random() - 0.5)
  const [shuffled] = useState(rights)

  function selectLeft(left: string) {
    if (matched[left]) return
    setSelected(left)
    setWrong(null)
  }

  function selectRight(right: string) {
    if (!selected) return
    if (Object.values(matched).includes(right)) return

    const correct = pairs.find((p: any) => p.left === selected)?.right
    if (correct === right) {
      setMatched(prev => ({ ...prev, [selected]: right }))
      setSelected(null)
    } else {
      setWrong(right)
      setTimeout(() => { setWrong(null); setSelected(null) }, 800)
    }
  }

  const done = Object.keys(matched).length === pairs.length

  return (
    <div>
      {done ? (
        <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/30 text-center text-green-400 font-semibold text-sm">
          ✓ Отлично! Все пары сопоставлены верно.
        </div>
      ) : (
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            {pairs.map((p: any) => (
              <button key={p.left} onClick={() => selectLeft(p.left)}
                disabled={!!matched[p.left]}
                className={cn(
                  'w-full px-4 py-2.5 rounded-lg text-sm border text-left transition-all font-greek',
                  matched[p.left] ? 'bg-green-400/10 border-green-400/30 text-green-400 opacity-60' :
                  selected === p.left ? 'bg-gold/15 border-gold/50 text-gold' :
                  'bg-card border-rim text-soft hover:border-muted hover:text-textc'
                )}>
                {p.left}
              </button>
            ))}
          </div>
          <div className="flex-1 space-y-2">
            {shuffled.map((right: string) => {
              const isMatched = Object.values(matched).includes(right)
              return (
                <button key={right} onClick={() => selectRight(right)}
                  disabled={isMatched}
                  className={cn(
                    'w-full px-4 py-2.5 rounded-lg text-sm border text-left transition-all',
                    isMatched ? 'bg-green-400/10 border-green-400/30 text-green-400 opacity-60' :
                    wrong === right ? 'bg-rose/15 border-rose/50 text-rose' :
                    'bg-card border-rim text-soft hover:border-muted hover:text-textc'
                  )}>
                  {right}
                </button>
              )
            })}
          </div>
        </div>
      )}
      {selected && !done && (
        <p className="mt-2 text-xs text-gold">Выбрано: «{selected}» — теперь выберите перевод справа</p>
      )}
    </div>
  )
}

// ─── Упражнение: выбор / перевод ─────────────────────────────
function StandardExercise({ ex }: { ex: any }) {
  const [selected, setSelected]   = useState<string>('')
  const [input, setInput]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showExp, setShowExp]     = useState(false)

  const correct = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer
  const isCorrect = submitted && (
    ex.type === 'choose'
      ? selected === correct
      : input.trim().toLowerCase() === correct.toLowerCase()
  )

  return (
    <div className={cn(
      'p-5 rounded-2xl border transition-all',
      !submitted ? 'bg-card border-rim' :
      isCorrect ? 'bg-green-400/5 border-green-400/25' : 'bg-rose/5 border-rose/20'
    )}>
      <p className="text-[15px] font-semibold text-bright mb-4">{ex.question}</p>

      {ex.type === 'choose' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ex.options?.map((opt: string) => (
            <button key={opt} disabled={submitted} onClick={() => !submitted && setSelected(opt)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-[14px] text-left border transition-all',
                submitted && opt === correct ? 'bg-green-400/12 border-green-400/40 text-green-400 font-semibold' :
                submitted && opt === selected && !isCorrect ? 'bg-rose/12 border-rose/40 text-rose' :
                selected === opt ? 'bg-gold/12 border-gold/40 text-gold' :
                'bg-night/40 border-rim/60 text-soft hover:border-muted hover:text-textc'
              )}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {(ex.type === 'translate' || ex.type === 'fill') && (
        <div className="mb-4">
          {ex.hint && !submitted && <p className="text-xs text-muted mb-2">Подсказка: {ex.hint}</p>}
          <input type="text" value={input} disabled={submitted}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !submitted && setSubmitted(true)}
            placeholder="Введите ответ..."
            className={cn(
              'w-full px-4 py-2.5 rounded-xl border text-[14px] focus:outline-none transition-all',
              'bg-night/40 text-textc placeholder:text-muted',
              submitted && isCorrect ? 'border-green-400/40' :
              submitted ? 'border-rose/40' : 'border-rim focus:border-gold/40'
            )}
          />
          {submitted && !isCorrect && (
            <p className="mt-2 text-[13px] text-green-400">Правильный ответ: <strong>{correct}</strong></p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3">
        {!submitted ? (
          <button onClick={() => setSubmitted(true)}
            disabled={!selected && !input.trim()}
            className="px-5 py-2 rounded-lg text-[13px] font-semibold bg-gold text-night hover:bg-goldl transition-colors disabled:opacity-40">
            Проверить
          </button>
        ) : (
          <>
            <div className={cn('text-[13px] font-semibold', isCorrect ? 'text-green-400' : 'text-rose')}>
              {isCorrect ? '✓ Верно!' : '✗ Неверно'}
            </div>
            <button onClick={() => { setSubmitted(false); setSelected(''); setInput(''); setShowExp(false) }}
              className="text-[13px] text-muted hover:text-textc transition-colors">
              Попробовать снова
            </button>
            {ex.explanation && (
              <button onClick={() => setShowExp(p => !p)} className="text-[13px] text-gold hover:text-goldl transition-colors ml-auto">
                {showExp ? 'Скрыть' : 'Почему?'}
              </button>
            )}
          </>
        )}
      </div>

      {showExp && ex.explanation && (
        <div className="mt-4 pt-4 border-t border-rim/40 text-[13px] text-muted leading-relaxed">
          {ex.explanation}
        </div>
      )}
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────
export function LessonContent({ lesson, module, userId, prev, next, isCompleted }: any) {
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
    } catch {}
    finally { setSaving(false) }
  }

  return (
    <article className="w-full max-w-[720px] mx-auto">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-muted mb-6">
        <span className="text-gold font-semibold">Модуль {lesson.moduleId}</span>
        <span>/</span>
        <span className="truncate">{module?.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-full">
            Урок {lesson.id}
          </span>
          {lesson.isFree && (
            <span className="text-[11px] font-bold uppercase tracking-widest text-tealb bg-teal/10 px-2.5 py-1 rounded-full">
              Бесплатно
            </span>
          )}
          {completed && (
            <span className="text-[11px] font-bold text-green-400 bg-green-400/10 px-2.5 py-1 rounded-full">
              ✓ Пройден
            </span>
          )}
        </div>
        <h1 className="text-[clamp(26px,4vw,38px)] font-light text-bright leading-tight mb-2"
          style={{fontFamily: 'var(--font-cormorant), Georgia, serif'}}>
          {lesson.title}
        </h1>
        <p className="text-soft text-[15px]">{lesson.subtitle}</p>
        <div className="flex items-center gap-5 mt-4 text-[12px] text-muted">
          <span>⏱ {lesson.duration}</span>
          <span>📚 {lesson.vocab.length} слов</span>
          <span>✍️ {lesson.exercises.length} заданий</span>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl border border-rim bg-card mb-8">
        {[
          { key: 'lesson',    label: '📖 Урок' },
          { key: 'vocab',     label: `📚 Словарь (${lesson.vocab.length})` },
          { key: 'exercises', label: `✍️ Задания (${lesson.exercises.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key as any)}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-[13px] font-medium transition-all',
              tab === t.key
                ? 'bg-gold text-night shadow-sm'
                : 'text-soft hover:text-textc'
            )}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Lesson Tab */}
      {tab === 'lesson' && (
        <div>
          {lesson.sections.map((s: any, i: number) => <RenderSection key={i} s={s} />)}

          {lesson.summary.length > 0 && (
            <div className="mb-8 p-6 rounded-2xl bg-card border border-rim">
              <h2 className="text-[16px] font-semibold text-bright mb-4">📋 Итоги урока</h2>
              <ul className="space-y-2">
                {lesson.summary.map((p: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[14px] text-soft">
                    <span className="text-gold mt-0.5 shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Vocab Tab */}
      {tab === 'vocab' && (
        <div>
          <p className="text-[13px] text-muted mb-5">Нажмите на карточку чтобы увидеть перевод и пример</p>
          {lesson.vocab.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-rim text-center text-muted">
              Словарь для этого урока скоро будет добавлен.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.vocab.map((w: any, i: number) => <VocabCard key={i} w={w} index={i} />)}
            </div>
          )}
        </div>
      )}

      {/* Exercises Tab */}
      {tab === 'exercises' && (
        <div>
          {lesson.exercises.length === 0 ? (
            <div className="p-8 rounded-2xl bg-card border border-rim text-center text-muted">
              Упражнения для этого урока скоро будут добавлены.
            </div>
          ) : (
            <div className="space-y-5">
              {lesson.exercises.map((ex: any, i: number) => (
                <div key={i}>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                    Задание {i + 1} из {lesson.exercises.length}
                  </div>
                  {ex.type === 'match'
                    ? <div className="p-5 rounded-2xl border bg-card border-rim">
                        <p className="text-[15px] font-semibold text-bright mb-4">{ex.question}</p>
                        <MatchExercise ex={ex} />
                      </div>
                    : <StandardExercise ex={ex} />
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Complete */}
      {!completed && (
        <div className="mt-6 mb-10 p-5 rounded-2xl bg-card border border-rim text-center">
          <p className="text-soft text-[14px] mb-4">Изучили материал? Отметьте урок как пройденный.</p>
          <button onClick={handleComplete} disabled={saving}
            className="px-8 py-3 rounded-xl font-semibold bg-gold text-night hover:bg-goldl transition-all disabled:opacity-50 text-[14px]">
            {saving ? 'Сохраняем...' : '✓ Урок пройден'}
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex items-center justify-between gap-4 py-6 border-t border-rim">
        {prev ? (
          <Link href={`/lesson/${prev.id}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl border border-rim text-[13px] text-soft hover:border-muted hover:text-textc transition-all">
            <span>←</span>
            <div>
              <div className="text-[11px] text-muted">Предыдущий</div>
              <div className="font-medium truncate max-w-[150px]">{prev.title}</div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/lesson/${next.id}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gold text-night text-[13px] font-semibold hover:bg-goldl transition-all">
            <div className="text-right">
              <div className="text-[11px] text-night/60">Следующий</div>
              <div className="truncate max-w-[150px]">{next.title}</div>
            </div>
            <span>→</span>
          </Link>
        ) : (
          <Link href="/dashboard"
            className="px-4 py-3 rounded-xl bg-gold text-night text-[13px] font-semibold hover:bg-goldl transition-all">
            В кабинет →
          </Link>
        )}
      </nav>
    </article>
  )
}

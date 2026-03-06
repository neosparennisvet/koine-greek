// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ═══════════════════════════════════════════════════════
//  SVG ИЛЛЮСТРАЦИИ
// ═══════════════════════════════════════════════════════
function MediterraneanMap() {
  return (
    <div className="my-6 rounded-2xl overflow-hidden border" style={{borderColor:'var(--c-border)', background:'#0d1e3a'}}>
      <svg viewBox="0 0 800 380" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="seaBg" cx="50%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#1a3d6e"/>
            <stop offset="100%" stopColor="#0b1e3a"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Sea background */}
        <rect width="800" height="380" fill="url(#seaBg)"/>

        {/* Wave texture */}
        {Array.from({length:12}).map((_,i) => (
          <path key={i}
            d={`M0 ${30+i*28} Q${200} ${22+i*28} ${400} ${30+i*28} T800 ${30+i*28}`}
            fill="none" stroke="#1e4a7a" strokeWidth="0.7" opacity="0.5"/>
        ))}

        {/* ── LAND MASSES ── */}

        {/* Italian peninsula */}
        <path d="M200 60 L230 55 L250 70 L260 110 L255 145 L248 170 L242 195
                 L250 220 L245 245 L235 260 L225 265 L220 255 L230 235 L225 210
                 L215 185 L205 160 L198 130 L192 100 L190 75 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8" opacity="0.9"/>
        <text x="218" y="145" fill="#6dbf7a" fontSize="9" textAnchor="middle" fontFamily="Georgia" transform="rotate(-10,218,145)">ИТАЛИЯ</text>

        {/* Sicily */}
        <path d="M228 275 L250 268 L265 275 L260 290 L245 295 L228 288 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.6"/>
        <text x="246" y="285" fill="#6dbf7a" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">Сицилия</text>

        {/* Greece / Balkan peninsula */}
        <path d="M340 45 L390 38 L430 45 L455 60 L460 90 L450 120
                 L440 145 L445 165 L435 185 L420 195 L410 185 L415 165
                 L405 145 L398 120 L385 100 L370 90 L355 80 L342 65 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8" opacity="0.9"/>
        <text x="403" y="118" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ГРЕЦИЯ</text>

        {/* Peloponnese */}
        <path d="M385 185 L410 180 L418 200 L410 218 L395 222 L382 210 L378 195 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.5"/>

        {/* Crete */}
        <path d="M380 255 L430 248 L475 253 L478 265 L430 272 L380 268 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.5"/>
        <text x="428" y="263" fill="#6dbf7a" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">Крит</text>

        {/* Cyprus */}
        <path d="M590 195 L618 188 L635 195 L630 208 L605 212 L588 205 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.5"/>
        <text x="612" y="202" fill="#6dbf7a" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">Кипр</text>

        {/* Asia Minor (Turkey) */}
        <path d="M460 40 L560 32 L640 45 L690 60 L710 85 L700 120
                 L680 145 L650 160 L620 165 L590 155 L565 140 L545 120
                 L520 105 L495 95 L470 85 L458 65 Z"
          fill="#3a5c2a" stroke="#4a7a3a" strokeWidth="0.8" opacity="0.9"/>
        <text x="585" y="95" fill="#8fd48a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">МАЛАЯ АЗИЯ</text>
        <text x="585" y="108" fill="#6dbf7a" fontSize="8" textAnchor="middle" fontFamily="Georgia">(Турция)</text>

        {/* Ephesus dot */}
        <circle cx="486" cy="118" r="4" fill="#e8b84b" opacity="0.9"/>
        <text x="478" y="132" fill="#e8b84b" fontSize="8" textAnchor="middle" fontFamily="Georgia">Эфес</text>

        {/* Antioch */}
        <circle cx="655" cy="155" r="3.5" fill="#e8b84b" opacity="0.8"/>
        <text x="655" y="168" fill="#e8b84b" fontSize="8" textAnchor="middle" fontFamily="Georgia">Антиохия</text>

        {/* Judea / Palestine */}
        <path d="M638 195 L660 185 L680 190 L688 215 L682 240 L668 250
                 L650 248 L638 232 L633 210 Z"
          fill="#8b7355" stroke="#a08a6a" strokeWidth="0.7" opacity="0.9"/>
        <text x="660" y="220" fill="#d4c09a" fontSize="9" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ИУДЕЯ</text>

        {/* Jerusalem */}
        <circle cx="662" cy="230" r="4" fill="#f0c96a" filter="url(#glow)"/>
        <text x="662" y="244" fill="#f0c96a" fontSize="8" textAnchor="middle" fontFamily="Georgia">Иерусалим</text>

        {/* Egypt */}
        <path d="M560 275 L680 268 L720 280 L725 330 L680 345 L620 348
                 L565 340 L550 310 Z"
          fill="#b8965a" stroke="#c8a66a" strokeWidth="0.7" opacity="0.9"/>
        <text x="636" y="312" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ЕГИПЕТ</text>
        {/* Alexandria */}
        <circle cx="580" cy="282" r="4" fill="#e8b84b" opacity="0.9"/>
        <text x="580" y="295" fill="#e8b84b" fontSize="8" textAnchor="middle" fontFamily="Georgia">Александрия</text>

        {/* North Africa */}
        <path d="M0 290 L200 278 L340 285 L380 300 L360 345 L280 355
                 L160 360 L60 355 L0 345 Z"
          fill="#a89060" stroke="#c0a870" strokeWidth="0.7" opacity="0.8"/>
        <text x="175" y="325" fill="#e8d090" fontSize="9" textAnchor="middle" fontFamily="Georgia">СЕВЕРНАЯ АФРИКА</text>

        {/* Carthage */}
        <circle cx="265" cy="285" r="3.5" fill="#e8b84b" opacity="0.7"/>
        <text x="265" y="298" fill="#e8b84b" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">Карфаген</text>

        {/* Spain / Hispania */}
        <path d="M0 68 L100 52 L155 60 L175 85 L160 120 L130 140
                 L90 150 L50 140 L20 115 L0 95 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.7" opacity="0.8"/>
        <text x="88" y="103" fill="#6dbf7a" fontSize="9" textAnchor="middle" fontFamily="Georgia">ИСПАНИЯ</text>

        {/* Gaul (France) */}
        <path d="M110 38 L195 32 L215 48 L205 65 L180 75 L155 68 L120 55 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.6" opacity="0.7"/>
        <text x="162" y="55" fill="#6dbf7a" fontSize="8" textAnchor="middle" fontFamily="Georgia">ГАЛЛИЯ</text>

        {/* Macedonia / northern Greece */}
        <path d="M335 40 L390 32 L410 42 L405 62 L385 68 L355 65 L335 52 Z"
          fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.6"/>
        <text x="372" y="55" fill="#6dbf7a" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">МАКЕДОНИЯ</text>

        {/* ── CITIES ── */}
        {/* Rome */}
        <circle cx="232" cy="185" r="5" fill="#e8b84b" opacity="0.95" filter="url(#glow)"/>
        <text x="232" y="199" fill="#e8b84b" fontSize="8.5" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">Рим</text>

        {/* Athens */}
        <circle cx="412" cy="193" r="4.5" fill="#e8b84b" opacity="0.9" filter="url(#glow)"/>
        <text x="412" y="207" fill="#e8b84b" fontSize="8.5" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">Афины</text>

        {/* Corinth */}
        <circle cx="396" cy="188" r="3" fill="#e8b84b" opacity="0.7"/>
        <text x="384" y="196" fill="#e8b84b" fontSize="7.5" fontFamily="Georgia">Коринф</text>

        {/* Thessaloniki */}
        <circle cx="418" cy="155" r="3" fill="#e8b84b" opacity="0.7"/>
        <text x="418" y="148" fill="#e8b84b" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">Фессалоника</text>

        {/* ── ALEXANDER'S ROUTE ── */}
        <path d="M395 170 Q415 165 430 155 Q455 135 460 105
                 Q470 82 490 75 Q540 55 590 48
                 Q640 42 685 55 Q705 68 715 85
                 Q700 115 685 140 Q665 158 655 155
                 Q640 165 625 162 Q590 155 570 148
                 Q555 140 548 130 Q538 118 524 110
                 Q495 98 488 118 Q480 138 485 160
                 Q490 185 488 205 Q482 225 475 240
                 Q465 255 460 268 Q452 285 448 300
                 Q445 318 450 335 Q455 350 462 360"
          fill="none" stroke="#f0c96a" strokeWidth="2.5" strokeDasharray="8,4"
          opacity="0.85"/>

        {/* Route arrow dots */}
        {[
          [395,170], [455,110], [590,48], [685,62], [655,155], [488,205], [462,335]
        ].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#f0c96a" opacity={0.9-i*0.05}/>
        ))}

        {/* ── LEGEND ── */}
        <rect x="12" y="12" width="195" height="78" rx="8"
          fill="rgba(13,30,58,0.85)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="22" y="32" fill="#f0f4ff" fontSize="10.5" fontFamily="Georgia" fontWeight="bold">
          Греческий мир I в. н.э.
        </text>
        <line x1="22" y1="42" x2="200" y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8"/>
        <circle cx="30" cy="55" r="4" fill="#f0c96a"/>
        <text x="42" y="59" fill="#f0c96a" fontSize="9" fontFamily="Georgia">Маршрут Александра</text>
        <circle cx="30" cy="72" r="4" fill="#e8b84b"/>
        <text x="42" y="76" fill="#e8b84b" fontSize="9" fontFamily="Georgia">Ключевые города</text>
        <rect x="25" y="82" width="12" height="6" rx="2" fill="#2a5c3a"/>
        <text x="42" y="89" fill="#6dbf7a" fontSize="9" fontFamily="Georgia">Территории</text>

        {/* Greek text label */}
        <text x="400" y="370" fill="rgba(200,212,240,0.35)" fontSize="10"
          textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic">
          ἡ Μεσόγειος θάλασσα — Средиземное море
        </text>
      </svg>
    </div>
  )
}

function Timeline() {
  const items = [
    { x: 60,  y: 50, label: 'XIII до н.э.', sub: 'Линейное письмо Б', col: '#5a6385', r: 6 },
    { x: 180, y: 50, label: 'VIII–IV до н.э.', sub: 'Классический греческий\n(Гомер, Платон)', col: '#5b6ef5', r: 7 },
    { x: 330, y: 50, label: 'IV до н.э.', sub: 'Александр Великий\nраспространяет язык', col: '#c99a2e', r: 8 },
    { x: 490, y: 50, label: 'III до н.э. – IV н.э.', sub: 'КОЙНЕ — язык НЗ', col: '#3abfae', r: 10 },
    { x: 650, y: 50, label: 'Сегодня', sub: 'Новогреческий\n(13 млн чел.)', col: '#6dbf7a', r: 6 },
  ]
  return (
    <div className="my-6 rounded-2xl border p-5" style={{borderColor:'var(--c-border)', background:'var(--c-card)'}}>
      <div className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{color:'var(--c-muted)'}}>
        Хронология греческого языка
      </div>
      <svg viewBox="0 0 720 120" className="w-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="50" x2="680" y2="50" stroke="var(--c-border)" strokeWidth="2"/>
        {items.map(({ x, y, label, sub, col, r }) => (
          <g key={x}>
            <circle cx={x} cy={y} r={r} fill={col} opacity="0.9"/>
            <text x={x} y={y - r - 6} fill={col} fontSize="8.5" textAnchor="middle"
              fontFamily="Georgia, serif" fontWeight="500">{label}</text>
            {sub.split('\n').map((line, i) => (
              <text key={i} x={x} y={y + r + 14 + i * 13} fill="var(--c-soft)"
                fontSize="8" textAnchor="middle" fontFamily="Georgia, serif">{line}</text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  )
}

function AlphabetChart() {
  const letters = [
    ['Α α','альфа','[а]',false], ['Β β','бета','[б]',true],  ['Γ γ','гамма','[г]',false], ['Δ δ','дельта','[д]',false],
    ['Ε ε','эпсилон','[э]кр.',false],['Ζ ζ','дзета','[дз]',false],['Η η','эта','[э]дл.',true],['Θ θ','тета','[тх]',false],
    ['Ι ι','йота','[и]',false], ['Κ κ','каппа','[к]',false], ['Λ λ','лямбда','[л]',false],['Μ μ','мю','[м]',false],
    ['Ν ν','ню','[н]',true],    ['Ξ ξ','кси','[кс]',false],  ['Ο ο','омикрон','[о]кр.',false],['Π π','пи','[п]',false],
    ['Ρ ρ','ро','[р]',false],   ['Σ σ/ς','сигма','[с]',false],['Τ τ','тау','[т]',false],['Υ υ','ипсилон','[ю]',false],
    ['Φ φ','фи','[ф]',false],   ['Χ χ','хи','[х]',false],    ['Ψ ψ','пси','[пс]',false],['Ω ω','омега','[о]дл.',false],
  ]
  return (
    <div className="my-6 rounded-2xl border overflow-hidden" style={{borderColor:'var(--c-border)'}}>
      <div className="px-5 py-3 flex items-center justify-between border-b" style={{background:'var(--c-card)', borderColor:'var(--c-border)'}}>
        <span className="text-[12px] font-bold uppercase tracking-widest text-gold">Греческий алфавит — 24 буквы</span>
        <span className="text-[11px] px-2 py-0.5 rounded-full" style={{background:'rgba(192,68,90,.15)', color:'#e07a8e'}}>
          ⚠️ красные — буквы-ловушки
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4" style={{background:'var(--c-card)'}}>
        {letters.map(([letter, name, sound, tricky], i) => (
          <div key={i} className="p-3 border-b border-r" style={{
            borderColor:'var(--c-border)',
            background: tricky ? 'rgba(192,68,90,0.08)' : 'transparent'
          }}>
            <div style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: '26px',
              lineHeight: 1.1,
              color: tricky ? '#e07a8e' : 'var(--c-heading)',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}>{letter as string}</div>
            <div style={{fontSize:'11px', color:'var(--c-muted)', marginTop:'2px'}}>{name as string}</div>
            <div style={{
              fontSize:'13px',
              fontFamily:'monospace',
              color: tricky ? '#e07a8e' : '#3abfae',
              fontWeight: 600,
              marginTop:'2px',
            }}>{sound as string}{tricky ? ' ⚠️' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  РЕНДЕР СЕКЦИЙ
// ═══════════════════════════════════════════════════════
function RenderSection({ s }: { s: any }) {
  if (s.type === 'illustration') {
    if (s.illustration === 'mediterranean-map') return <MediterraneanMap />
    if (s.illustration === 'timeline') return <Timeline />
    if (s.illustration === 'alphabet-chart') return <AlphabetChart />
    return null
  }

  const html = (text: string) => ({
    __html: (text || '')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--c-heading);font-weight:600">$1</strong>')
      .replace(/\n/g, '<br/>')
  })

  switch (s.type) {
    case 'intro':
      return (
        <div className="mb-8 p-6 rounded-2xl border" style={{background:'var(--c-card)', borderColor:'var(--c-border)'}}>
          <div style={{fontSize:'16px', lineHeight:'1.85', color:'var(--c-text)'}}
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'theory':
      return (
        <div className="mb-7">
          {s.title && <h3 style={{fontSize:'19px', fontWeight:600, color:'var(--c-heading)', marginBottom:'10px'}}>{s.title}</h3>}
          <div style={{fontSize:'16px', lineHeight:'1.85', color:'var(--c-text)'}}
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'table': {
      if (!s.data?.length) return null
      const headers = Object.keys(s.data[0])
      return (
        <div className="mb-8">
          {s.title && <h3 style={{fontSize:'19px', fontWeight:600, color:'var(--c-heading)', marginBottom:'6px'}}>{s.title}</h3>}
          {s.content && <p style={{fontSize:'14px', color:'var(--c-muted)', marginBottom:'10px'}}>{s.content}</p>}
          <div className="rounded-xl overflow-hidden border" style={{borderColor:'var(--c-border)'}}>
            <table className="lesson-table">
              <thead>
                <tr>
                  {headers.map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {s.data.map((row: any, i: number) => (
                  <tr key={i}>
                    {headers.map((h, hi) => (
                      <td key={h} style={{
                        fontFamily: hi === 0 ? 'var(--font-cormorant), Georgia, serif' : 'inherit',
                        fontSize: hi === 0 ? '18px' : '15px',
                        color: hi === 0 ? 'var(--c-heading)' : 'var(--c-text)',
                        fontWeight: hi === 0 ? 500 : 400,
                      }}>
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
    }

    case 'verse':
      return (
        <div className="mb-7 pl-5 py-1" style={{borderLeft:'3px solid rgba(201,154,46,.6)'}}>
          {s.title && (
            <div style={{fontSize:'11px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#c99a2e', marginBottom:'6px'}}>
              {s.title}
            </div>
          )}
          <div style={{fontSize:'16px', lineHeight:'1.85', color:'var(--c-text)'}}
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'tip':
      return (
        <div className="mb-7 p-5 rounded-xl" style={{background:'rgba(46,158,143,.07)', border:'1px solid rgba(46,158,143,.25)'}}>
          {s.title && <div style={{fontSize:'14px', fontWeight:600, color:'#3abfae', marginBottom:'6px'}}>💡 {s.title}</div>}
          <div style={{fontSize:'15px', lineHeight:'1.8', color:'var(--c-text)'}}
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    case 'warning':
      return (
        <div className="mb-7 p-5 rounded-xl" style={{background:'rgba(192,68,90,.07)', border:'1px solid rgba(192,68,90,.3)'}}>
          {s.title && <div style={{fontSize:'14px', fontWeight:600, color:'#e07a8e', marginBottom:'6px'}}>{s.title}</div>}
          <div style={{fontSize:'15px', lineHeight:'1.8', color:'var(--c-text)'}}
            dangerouslySetInnerHTML={html(s.content)} />
        </div>
      )

    default: return null
  }
}

// ═══════════════════════════════════════════════════════
//  СЛОВАРЬ
// ═══════════════════════════════════════════════════════
function VocabCard({ w }: { w: any }) {
  const [open, setOpen] = useState(false)
  return (
    <button onClick={() => setOpen(p => !p)} className="w-full text-left rounded-xl border transition-all duration-200"
      style={{
        padding: '14px 16px',
        background: open ? 'rgba(201,154,46,.06)' : 'var(--c-card)',
        borderColor: open ? 'rgba(201,154,46,.4)' : 'var(--c-border)',
      }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div style={{fontFamily:'var(--font-cormorant),Georgia,serif', fontSize:'24px', color:'var(--c-heading)', lineHeight:1.2, letterSpacing:'0.02em'}}>
            {w.greek}
          </div>
          <div style={{fontSize:'12px', color:'var(--c-muted)', fontFamily:'monospace', marginTop:'2px'}}>
            {w.transliteration}
          </div>
        </div>
        {w.frequency && (
          <div className="text-right shrink-0">
            <div style={{fontSize:'10px', color:'var(--c-muted)', textTransform:'uppercase', letterSpacing:'0.08em'}}>в НЗ</div>
            <div style={{fontSize:'15px', color:'#c99a2e', fontWeight:700, fontFamily:'monospace'}}>
              {w.frequency.toLocaleString()}×
            </div>
          </div>
        )}
      </div>
      {open ? (
        <div className="mt-3 pt-3" style={{borderTop:'1px solid rgba(201,154,46,.2)'}}>
          <div style={{fontSize:'17px', fontWeight:600, color:'var(--c-heading)', marginBottom:'4px'}}>{w.translation}</div>
          {w.example && <div style={{fontSize:'13px', color:'var(--c-muted)', fontStyle:'italic'}}>{w.example}</div>}
        </div>
      ) : (
        <div style={{fontSize:'11px', color:'rgba(90,99,133,.5)', marginTop:'6px'}}>нажмите для перевода</div>
      )}
    </button>
  )
}

// ═══════════════════════════════════════════════════════
//  УПРАЖНЕНИЕ — СОПОСТАВЛЕНИЕ
// ═══════════════════════════════════════════════════════
function MatchExercise({ ex }: { ex: any }) {
  const pairs = ex.pairs ?? []
  const [shuffledRight] = useState(() => [...pairs.map((p: any) => p.right)].sort(() => Math.random() - 0.5))
  const [selectedLeft,  setSelLeft]  = useState<string | null>(null)
  const [matched,       setMatched]  = useState<Record<string, string>>({})
  const [wrongRight,    setWrongRight] = useState<string | null>(null)

  function clickLeft(left: string) {
    if (matched[left]) return
    setSelLeft(l => l === left ? null : left)
    setWrongRight(null)
  }

  function clickRight(right: string) {
    if (!selectedLeft) return
    if (Object.values(matched).includes(right)) return
    const correct = pairs.find((p: any) => p.left === selectedLeft)?.right
    if (correct === right) {
      setMatched(prev => ({ ...prev, [selectedLeft]: right }))
      setSelLeft(null)
    } else {
      setWrongRight(right)
      setTimeout(() => { setWrongRight(null); setSelLeft(null) }, 700)
    }
  }

  const done = Object.keys(matched).length === pairs.length

  return (
    <div>
      {done ? (
        <div className="p-4 rounded-xl text-center text-sm font-semibold"
          style={{background:'rgba(109,191,122,.1)', border:'1px solid rgba(109,191,122,.3)', color:'#6dbf7a'}}>
          ✓ Отлично! Все пары правильно сопоставлены.
        </div>
      ) : (
        <>
          <div className="flex gap-3">
            <div className="flex-1 space-y-2">
              {pairs.map((p: any) => {
                const isMatched = !!matched[p.left]
                const isSel = selectedLeft === p.left
                return (
                  <button key={p.left} onClick={() => clickLeft(p.left)} disabled={isMatched}
                    className="w-full px-4 py-2.5 rounded-xl text-left border transition-all"
                    style={{
                      fontSize:'15px',
                      fontFamily:'var(--font-cormorant),Georgia,serif',
                      background: isMatched ? 'rgba(109,191,122,.1)' : isSel ? 'rgba(201,154,46,.12)' : 'var(--c-card)',
                      borderColor: isMatched ? 'rgba(109,191,122,.35)' : isSel ? 'rgba(201,154,46,.5)' : 'var(--c-border)',
                      color: isMatched ? '#6dbf7a' : isSel ? '#c99a2e' : 'var(--c-text)',
                      opacity: isMatched ? 0.7 : 1,
                    }}>
                    {p.left}
                  </button>
                )
              })}
            </div>
            <div className="flex-1 space-y-2">
              {shuffledRight.map((right: string) => {
                const isMatched = Object.values(matched).includes(right)
                const isWrong = wrongRight === right
                return (
                  <button key={right} onClick={() => clickRight(right)} disabled={isMatched}
                    className="w-full px-4 py-2.5 rounded-xl text-left border transition-all"
                    style={{
                      fontSize:'15px',
                      background: isMatched ? 'rgba(109,191,122,.1)' : isWrong ? 'rgba(192,68,90,.1)' : 'var(--c-card)',
                      borderColor: isMatched ? 'rgba(109,191,122,.35)' : isWrong ? 'rgba(192,68,90,.4)' : 'var(--c-border)',
                      color: isMatched ? '#6dbf7a' : isWrong ? '#e07a8e' : 'var(--c-text)',
                      opacity: isMatched ? 0.7 : 1,
                    }}>
                    {right}
                  </button>
                )
              })}
            </div>
          </div>
          {selectedLeft && (
            <p style={{fontSize:'12px', color:'#c99a2e', marginTop:'8px'}}>
              Выбрано: «{selectedLeft}» — теперь выберите перевод справа ↑
            </p>
          )}
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  СТАНДАРТНОЕ УПРАЖНЕНИЕ
// ═══════════════════════════════════════════════════════
function StandardExercise({ ex }: { ex: any }) {
  const [sel,       setSel]       = useState('')
  const [input,     setInput]     = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [showExp,   setShowExp]   = useState(false)

  const correct    = Array.isArray(ex.answer) ? ex.answer[0] : ex.answer
  const isCorrect  = submitted && (
    ex.type === 'choose'
      ? sel === correct
      : input.trim().toLowerCase().replace(/ё/g,'е') === correct.toLowerCase().replace(/ё/g,'е')
  )

  return (
    <div className="p-5 rounded-2xl border transition-all" style={{
      background: !submitted ? 'var(--c-card)' : isCorrect ? 'rgba(109,191,122,.05)' : 'rgba(192,68,90,.05)',
      borderColor: !submitted ? 'var(--c-border)' : isCorrect ? 'rgba(109,191,122,.3)' : 'rgba(192,68,90,.25)',
    }}>
      <p style={{fontSize:'16px', fontWeight:600, color:'var(--c-heading)', marginBottom:'14px'}}>{ex.question}</p>

      {ex.type === 'choose' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {ex.options?.map((opt: string) => (
            <button key={opt} disabled={submitted} onClick={() => !submitted && setSel(opt)}
              className="px-4 py-3 rounded-xl text-left border transition-all"
              style={{
                fontSize:'15px',
                background: submitted && opt === correct ? 'rgba(109,191,122,.12)' :
                            submitted && opt === sel && !isCorrect ? 'rgba(192,68,90,.12)' :
                            sel === opt ? 'rgba(201,154,46,.12)' : 'var(--c-card)',
                borderColor: submitted && opt === correct ? 'rgba(109,191,122,.4)' :
                             submitted && opt === sel && !isCorrect ? 'rgba(192,68,90,.4)' :
                             sel === opt ? 'rgba(201,154,46,.45)' : 'var(--c-border)',
                color: submitted && opt === correct ? '#6dbf7a' :
                       submitted && opt === sel && !isCorrect ? '#e07a8e' :
                       sel === opt ? '#c99a2e' : 'var(--c-text)',
                fontWeight: submitted && opt === correct ? 600 : 400,
              }}>
              {opt}
            </button>
          ))}
        </div>
      )}

      {(ex.type === 'translate' || ex.type === 'fill') && (
        <div className="mb-4">
          {ex.hint && !submitted && (
            <p style={{fontSize:'13px', color:'var(--c-muted)', marginBottom:'8px'}}>💡 {ex.hint}</p>
          )}
          <input type="text" value={input} disabled={submitted}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !submitted && setSubmitted(true)}
            placeholder="Введите ответ..."
            style={{
              width:'100%', padding:'10px 14px',
              borderRadius:'10px',
              border: `1px solid ${submitted && isCorrect ? 'rgba(109,191,122,.4)' : submitted ? 'rgba(192,68,90,.4)' : 'var(--c-border)'}`,
              background: 'var(--c-bg)', color:'var(--c-text)', fontSize:'16px',
              outline:'none',
            }}
          />
          {submitted && !isCorrect && (
            <p style={{marginTop:'8px', fontSize:'14px', color:'#6dbf7a'}}>
              Правильный ответ: <strong>{correct}</strong>
            </p>
          )}
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {!submitted ? (
          <button onClick={() => setSubmitted(true)}
            disabled={!sel && !input.trim()}
            style={{
              padding:'8px 20px', borderRadius:'10px', fontSize:'14px', fontWeight:600,
              background:'#c99a2e', color:'#111', cursor:'pointer',
              opacity: (!sel && !input.trim()) ? 0.4 : 1,
            }}>
            Проверить
          </button>
        ) : (
          <>
            <span style={{fontSize:'14px', fontWeight:600, color: isCorrect ? '#6dbf7a' : '#e07a8e'}}>
              {isCorrect ? '✓ Верно!' : '✗ Неверно'}
            </span>
            <button onClick={() => { setSubmitted(false); setSel(''); setInput(''); setShowExp(false) }}
              style={{fontSize:'14px', color:'var(--c-muted)', background:'none', border:'none', cursor:'pointer'}}>
              Попробовать снова
            </button>
            {ex.explanation && (
              <button onClick={() => setShowExp(p => !p)}
                style={{fontSize:'14px', color:'#c99a2e', background:'none', border:'none', cursor:'pointer', marginLeft:'auto'}}>
                {showExp ? 'Скрыть' : 'Почему?'}
              </button>
            )}
          </>
        )}
      </div>

      {showExp && ex.explanation && (
        <div style={{marginTop:'14px', paddingTop:'14px', borderTop:'1px solid var(--c-border)', fontSize:'14px', lineHeight:'1.7', color:'var(--c-soft)'}}>
          {ex.explanation}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════
//  ГЛАВНЫЙ КОМПОНЕНТ
// ═══════════════════════════════════════════════════════
export function LessonContent({ lesson, module: mod, userId, prev, next, isCompleted }: any) {
  const [completed, setCompleted] = useState(isCompleted)
  const [saving,    setSaving]    = useState(false)
  const [tab,       setTab]       = useState<'lesson' | 'vocab' | 'exercises'>('lesson')

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
    <article>
      {/* Breadcrumb */}
      <nav style={{display:'flex', gap:'8px', alignItems:'center', fontSize:'12px', color:'var(--c-muted)', marginBottom:'20px'}}>
        <span style={{color:'#c99a2e', fontWeight:600}}>Модуль {lesson.moduleId}</span>
        <span>/</span>
        <span>{mod?.title}</span>
      </nav>

      {/* Header */}
      <header style={{marginBottom:'28px'}}>
        <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'12px'}}>
          <span style={{fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#c99a2e', background:'rgba(201,154,46,.12)', padding:'3px 10px', borderRadius:'20px'}}>
            Урок {lesson.id}
          </span>
          {lesson.isFree && (
            <span style={{fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'#3abfae', background:'rgba(46,158,143,.12)', padding:'3px 10px', borderRadius:'20px'}}>
              Бесплатно
            </span>
          )}
          {completed && (
            <span style={{fontSize:'11px', fontWeight:700, color:'#6dbf7a', background:'rgba(109,191,122,.12)', padding:'3px 10px', borderRadius:'20px'}}>
              ✓ Пройден
            </span>
          )}
        </div>

        <h1 style={{
          fontFamily:'var(--font-cormorant),Georgia,serif',
          fontSize:'clamp(28px,4vw,40px)',
          fontWeight:400,
          color:'var(--c-heading)',
          lineHeight:1.2,
          marginBottom:'8px',
        }}>{lesson.title}</h1>

        <p style={{fontSize:'16px', color:'var(--c-soft)'}}>{lesson.subtitle}</p>

        <div style={{display:'flex', gap:'20px', marginTop:'12px', fontSize:'13px', color:'var(--c-muted)'}}>
          <span>⏱ {lesson.duration}</span>
          <span>📚 {lesson.vocab.length} слов</span>
          <span>✍️ {lesson.exercises.length} заданий</span>
        </div>
      </header>

      {/* Tabs */}
      <div style={{display:'flex', gap:'4px', padding:'4px', borderRadius:'14px', border:'1px solid var(--c-border)', background:'var(--c-card)', marginBottom:'28px'}}>
        {[
          { k: 'lesson',    label: `📖 Урок` },
          { k: 'vocab',     label: `📚 Словарь (${lesson.vocab.length})` },
          { k: 'exercises', label: `✍️ Задания (${lesson.exercises.length})` },
        ].map(t => (
          <button key={t.k} onClick={() => setTab(t.k as any)}
            style={{
              flex:1, padding:'8px 10px', borderRadius:'10px', fontSize:'14px', fontWeight:500,
              background: tab === t.k ? '#c99a2e' : 'transparent',
              color: tab === t.k ? '#111' : 'var(--c-soft)',
              border: 'none', cursor:'pointer', transition:'all .2s',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Lesson content */}
      {tab === 'lesson' && (
        <div>
          {lesson.sections.map((s: any, i: number) => <RenderSection key={i} s={s} />)}
          {lesson.summary.length > 0 && (
            <div style={{marginBottom:'28px', padding:'24px', borderRadius:'16px', background:'var(--c-card)', border:'1px solid var(--c-border)'}}>
              <h2 style={{fontSize:'17px', fontWeight:600, color:'var(--c-heading)', marginBottom:'14px'}}>📋 Итоги урока</h2>
              <ul style={{listStyle:'none', padding:0, margin:0}}>
                {lesson.summary.map((p: string, i: number) => (
                  <li key={i} style={{display:'flex', gap:'10px', fontSize:'15px', lineHeight:'1.7', color:'var(--c-text)', marginBottom:'6px'}}>
                    <span style={{color:'#c99a2e', marginTop:'1px', flexShrink:0}}>✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Vocab tab */}
      {tab === 'vocab' && (
        <div>
          <p style={{fontSize:'14px', color:'var(--c-muted)', marginBottom:'16px'}}>
            Нажмите на карточку, чтобы увидеть перевод и пример из Нового Завета
          </p>
          {lesson.vocab.length === 0 ? (
            <div style={{padding:'40px', textAlign:'center', color:'var(--c-muted)', background:'var(--c-card)', borderRadius:'16px', border:'1px solid var(--c-border)'}}>
              Словарь для этого урока скоро будет добавлен
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {lesson.vocab.map((w: any, i: number) => <VocabCard key={i} w={w} />)}
            </div>
          )}
        </div>
      )}

      {/* Exercises tab */}
      {tab === 'exercises' && (
        <div>
          {lesson.exercises.length === 0 ? (
            <div style={{padding:'40px', textAlign:'center', color:'var(--c-muted)', background:'var(--c-card)', borderRadius:'16px', border:'1px solid var(--c-border)'}}>
              Упражнения для этого урока скоро будут добавлены
            </div>
          ) : (
            <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
              {lesson.exercises.map((ex: any, i: number) => (
                <div key={i}>
                  <div style={{fontSize:'11px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--c-muted)', marginBottom:'8px'}}>
                    Задание {i + 1} из {lesson.exercises.length}
                  </div>
                  {ex.type === 'match' ? (
                    <div style={{padding:'20px', borderRadius:'16px', border:'1px solid var(--c-border)', background:'var(--c-card)'}}>
                      <p style={{fontSize:'16px', fontWeight:600, color:'var(--c-heading)', marginBottom:'14px'}}>{ex.question}</p>
                      <MatchExercise ex={ex} />
                    </div>
                  ) : (
                    <StandardExercise ex={ex} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Complete button */}
      {!completed && (
        <div style={{margin:'24px 0 32px', padding:'20px', borderRadius:'16px', background:'var(--c-card)', border:'1px solid var(--c-border)', textAlign:'center'}}>
          <p style={{fontSize:'15px', color:'var(--c-soft)', marginBottom:'14px'}}>
            Изучили материал? Отметьте урок как пройденный.
          </p>
          <button onClick={handleComplete} disabled={saving}
            style={{
              padding:'10px 32px', borderRadius:'12px', fontSize:'15px', fontWeight:600,
              background:'#c99a2e', color:'#111', border:'none', cursor:'pointer',
              opacity: saving ? 0.5 : 1,
            }}>
            {saving ? 'Сохраняем...' : '✓ Урок пройден'}
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav style={{display:'flex', justifyContent:'space-between', gap:'16px', paddingTop:'20px', borderTop:'1px solid var(--c-border)'}}>
        {prev ? (
          <Link href={`/lesson/${prev.id}`}
            style={{display:'flex', alignItems:'center', gap:'10px', padding:'12px 16px', borderRadius:'12px', border:'1px solid var(--c-border)', fontSize:'14px', color:'var(--c-soft)', textDecoration:'none', background:'var(--c-card)'}}>
            <span>←</span>
            <div>
              <div style={{fontSize:'11px', color:'var(--c-muted)'}}>Предыдущий</div>
              <div style={{fontWeight:500, maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{prev.title}</div>
            </div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/lesson/${next.id}`}
            style={{display:'flex', alignItems:'center', gap:'10px', padding:'12px 16px', borderRadius:'12px', fontSize:'14px', fontWeight:600, color:'#111', textDecoration:'none', background:'#c99a2e'}}>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:'11px', opacity:0.7}}>Следующий</div>
              <div style={{maxWidth:'150px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{next.title}</div>
            </div>
            <span>→</span>
          </Link>
        ) : (
          <Link href="/dashboard"
            style={{padding:'12px 20px', borderRadius:'12px', fontSize:'14px', fontWeight:600, color:'#111', textDecoration:'none', background:'#c99a2e'}}>
            В кабинет →
          </Link>
        )}
      </nav>
    </article>
  )
}

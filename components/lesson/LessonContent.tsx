// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
//  УТИЛИТЫ
// ─────────────────────────────────────────────────────────────────────────────

// Markdown-lite: **bold**, *italic*, `code`, \n→<br>
function md(text: string): string {
  if (!text) return ''
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="font-family:monospace;font-size:.88em;background:var(--c-card);padding:1px 5px;border-radius:4px">$1</code>')
    .replace(/\n/g, '<br/>')
}

// ─────────────────────────────────────────────────────────────────────────────
//  SVG КОМПОНЕНТЫ
// ─────────────────────────────────────────────────────────────────────────────
function MediterraneanMap() {
  return (
    <div style={{borderRadius:'14px',overflow:'hidden',border:'1.5px solid var(--c-border)',margin:'24px 0',background:'#0d1e3a'}}>
      <svg viewBox="0 0 800 360" style={{width:'100%',display:'block'}}>
        <defs>
          <radialGradient id="seaG" cx="50%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#1a3d6e"/><stop offset="100%" stopColor="#0b1e3a"/>
          </radialGradient>
        </defs>
        <rect width="800" height="360" fill="url(#seaG)"/>
        {Array.from({length:9}).map((_,i)=>(
          <path key={i} d={`M0 ${30+i*30} Q200 ${22+i*30} 400 ${30+i*30} T800 ${30+i*30}`} fill="none" stroke="#1e4a7a" strokeWidth="0.6" opacity="0.5"/>
        ))}
        <path d="M200 60 L230 55 L250 70 L260 110 L255 145 L248 170 L242 195 L250 220 L245 245 L235 260 L225 265 L220 255 L230 235 L225 210 L215 185 L205 160 L198 130 L192 100 L190 75 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="218" y="145" fill="#6dbf7a" fontSize="9" textAnchor="middle" fontFamily="Georgia" transform="rotate(-10,218,145)">ИТАЛИЯ</text>
        <path d="M340 45 L390 38 L430 45 L455 60 L460 90 L450 120 L440 145 L445 165 L435 185 L420 195 L410 185 L415 165 L405 145 L398 120 L385 100 L370 90 L355 80 L342 65 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="403" y="118" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ГРЕЦИЯ</text>
        <path d="M520 100 L600 90 L660 100 L700 130 L710 170 L680 200 L620 210 L565 195 L540 165 L530 135 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="618" y="155" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">М.АЗИЯ</text>
        <path d="M550 250 L650 240 L700 250 L720 280 L700 308 L620 318 L560 303 L545 278 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
        <text x="625" y="285" fill="#f0d090" fontSize="9" textAnchor="middle" fontFamily="Georgia">ЕГИПЕТ</text>
        <path d="M350 278 L500 263 L540 278 L545 308 L500 328 L400 333 L355 313 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
        <text x="447" y="306" fill="#f0d090" fontSize="8" textAnchor="middle" fontFamily="Georgia">ИЗРАИЛЬ / СИРИЯ</text>
        {[{x:220,y:232,n:'РИМ',c:'#f0d080'},{x:408,y:168,n:'АФИНЫ',c:'#80d0f0'},{x:490,y:174,n:'ЭФЕС',c:'#f0a060'},{x:473,y:296,n:'АНТИОХИЯ',c:'#a0f0a0'},{x:447,y:320,n:'ИЕРУСАЛИМ',c:'#f0f080'},{x:560,y:285,n:'АЛЕКСАНДРИЯ',c:'#f0c0a0'}].map(c=>(
          <g key={c.n}><circle cx={c.x} cy={c.y} r="5" fill={c.c} opacity="0.9"/><text x={c.x} y={c.y-9} fill={c.c} fontSize="7.5" textAnchor="middle" fontFamily="Georgia">{c.n}</text></g>
        ))}
      </svg>
    </div>
  )
}

function AlphabetChart() {
  const letters = [
    ['Α α','альфа','a'],['Β β','бета','b'],['Γ γ','гамма','g'],['Δ δ','дельта','d'],
    ['Ε ε','эпсилон','e кр.'],['Ζ ζ','дзета','dz'],['Η η','эта','э дл.'],['Θ θ','тета','th'],
    ['Ι ι','йота','i'],['Κ κ','каппа','k'],['Λ λ','лямбда','l'],['Μ μ','мю','m'],
    ['Ν ν','ню','n'],['Ξ ξ','кси','ks'],['Ο ο','омикрон','o кр.'],['Π π','пи','p'],
    ['Ρ ρ','ро','r'],['Σ σ/ς','сигма','s'],['Τ τ','тау','t'],['Υ υ','ипсилон','y/u'],
    ['Φ φ','фи','ph'],['Χ χ','хи','ch'],['Ψ ψ','пси','ps'],['Ω ω','омега','ō дл.'],
  ]
  return (
    <div style={{overflowX:'auto',margin:'20px 0',borderRadius:'12px',border:'1.5px solid var(--c-border)'}}>
      <table style={{width:'100%',borderCollapse:'collapse',background:'var(--c-card)',minWidth:'340px'}}>
        <thead>
          <tr style={{background:'var(--c-table-head)'}}>
            {['Буква','Название','Звук'].map(h=>(
              <th key={h} style={{padding:'10px 14px',textAlign:'left',fontFamily:'monospace',fontSize:'10px',letterSpacing:'2px',color:'#c99a2e',borderBottom:'2px solid var(--c-border)',textTransform:'uppercase'}}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {letters.map(([l,n,s],i)=>(
            <tr key={i} style={{background:i%2===0?'var(--c-card)':'var(--c-table-alt)',borderBottom:'1px solid var(--c-border)'}}>
              <td style={{padding:'9px 14px',fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'20px',color:'var(--c-heading)',fontWeight:700}}>{l}</td>
              <td style={{padding:'9px 14px',color:'var(--c-soft)',fontSize:'13px'}}>{n}</td>
              <td style={{padding:'9px 14px',fontFamily:'monospace',fontSize:'12px',color:'#6dbf7a'}}>[{s}]</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Timeline() {
  const events = [
    {y:'~330 до н.э.',e:'Александр Великий — κοινή становится общим языком Средиземноморья'},
    {y:'~200 до н.э.',e:'Перевод Ветхого Завета на греческий — Септуагинта (LXX)'},
    {y:'~5 до н.э.',e:'Рождение Иисуса. Вся Палестина говорит по-гречески'},
    {y:'50–65 н.э.',e:'Павел пишет послания на κοινή — первые тексты Нового Завета'},
    {y:'65–95 н.э.',e:'Евангелия и Откровение написаны на греческом'},
    {y:'~400 н.э.',e:'Иероним переводит Библию на латынь (Вульгата)'},
  ]
  return (
    <div style={{margin:'24px 0'}}>
      {events.map((e,i)=>(
        <div key={i} style={{display:'flex',gap:'16px',paddingBottom:'20px'}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:'12px'}}>
            <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#c99a2e',flexShrink:0,marginTop:'4px'}}/>
            {i<events.length-1&&<div style={{width:'2px',flex:1,background:'var(--c-border)',marginTop:'4px'}}/>}
          </div>
          <div>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#c99a2e',letterSpacing:'1px',marginBottom:'4px'}}>{e.y}</div>
            <div style={{fontSize:'15px',color:'var(--c-soft)',lineHeight:1.6}}>{e.e}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  РЕНДЕР СЕКЦИИ — читает реальную структуру данных (sections/content/data)
// ─────────────────────────────────────────────────────────────────────────────
function RenderSection({ s }: { s: any }) {
  if (!s) return null

  // Illustrations
  if (s.type === 'illustration') {
    if (s.illustration === 'mediterranean-map' || s.illustration === 'map') return <MediterraneanMap/>
    if (s.illustration === 'timeline')       return <Timeline/>
    if (s.illustration === 'alphabet-chart') return <AlphabetChart/>
    return null
  }

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (s.type === 'intro') return (
    <div style={{
      background:'var(--c-card)', border:'1.5px solid var(--c-border)',
      borderRadius:'16px', padding:'28px 32px', marginBottom:'28px',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{position:'absolute',right:'16px',bottom:'-8px',fontFamily:"'Playfair Display',serif",fontSize:'72px',fontWeight:900,opacity:.05,pointerEvents:'none',color:'#c99a2e',lineHeight:1}}>λόγος</div>
      {s.title && <h3 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'20px',fontWeight:700,color:'var(--c-heading)',marginBottom:'12px'}}>{s.title}</h3>}
      {s.content && <div style={{color:'var(--c-soft)',lineHeight:1.85,fontSize:'16px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )

  // ── THEORY ─────────────────────────────────────────────────────────────────
  if (s.type === 'theory') return (
    <div style={{marginBottom:'32px'}}>
      {s.title && (
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
          <span style={{display:'block',width:'28px',height:'2px',background:'#c99a2e',flexShrink:0}}/>
          <h2 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'clamp(22px,3vw,32px)',fontWeight:900,color:'var(--c-heading)',lineHeight:1.2,margin:0}}>{s.title}</h2>
        </div>
      )}
      {s.content && <div style={{color:'var(--c-soft)',lineHeight:1.85,fontSize:'16px',marginBottom:'16px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )

  // ── TABLE ──────────────────────────────────────────────────────────────────
  if (s.type === 'table') {
    const rawData: Record<string,string>[] = s.data ?? []
    if (rawData.length === 0) return null
    const headers = Object.keys(rawData[0])
    return (
      <div style={{marginBottom:'28px'}}>
        {s.title && <h3 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'19px',fontWeight:700,color:'var(--c-heading)',marginBottom:'8px'}}>{s.title}</h3>}
        {s.content && <p style={{color:'var(--c-muted)',fontSize:'14px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{overflowX:'auto',borderRadius:'12px',border:'1.5px solid var(--c-border)'}}>
          <table style={{width:'100%',borderCollapse:'collapse',background:'var(--c-card)',fontSize:'14px',minWidth:'400px'}}>
            <thead>
              <tr style={{background:'var(--c-table-head)'}}>
                {headers.map((h,i)=>(
                  <th key={i} style={{padding:'11px 14px',textAlign:i===0?'left':'center',fontFamily:'monospace',fontSize:'10px',letterSpacing:'1.5px',textTransform:'uppercase',color:'#c99a2e',borderBottom:'2px solid var(--c-border)',whiteSpace:'nowrap'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rawData.map((row,ri)=>(
                <tr key={ri} style={{background:ri%2===0?'var(--c-table-row)':'var(--c-table-alt)',borderBottom:'1px solid var(--c-border)'}}>
                  {headers.map((h,ci)=>(
                    <td key={ci} style={{padding:'10px 14px',textAlign:ci===0?'left':'center',verticalAlign:'middle'}}>
                      <span style={{fontFamily: ci>0 ? "'Playfair Display',var(--font-cormorant),Georgia,serif" : 'inherit',
                        fontSize: ci>0 ? '17px' : '13px', color:'var(--c-text)'}}
                        dangerouslySetInnerHTML={{__html:md(String(row[h]??''))}}/>
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

  // ── VERSE ──────────────────────────────────────────────────────────────────
  if (s.type === 'verse') return (
    <div style={{background:'var(--c-surface)',border:'1.5px solid var(--c-border)',borderLeft:'4px solid #c99a2e',borderRadius:'0 14px 14px 0',padding:'24px 28px',margin:'24px 0'}}>
      {s.title && <div style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'2px',color:'#c99a2e',marginBottom:'12px',textTransform:'uppercase'}}>{s.title}</div>}
      {s.content && <div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'clamp(17px,2.5vw,22px)',lineHeight:1.7,color:'var(--c-heading)',marginBottom:'8px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )

  // ── TIP ────────────────────────────────────────────────────────────────────
  if (s.type === 'tip') return (
    <div style={{background:'rgba(45,90,39,.12)',border:'1.5px solid rgba(100,180,80,.2)',borderRadius:'10px',padding:'14px 18px',margin:'16px 0',fontSize:'15px'}}>
      <strong style={{color:'#6dbf7a'}}>💡 {s.title && `${s.title}: `}</strong>
      <span style={{color:'var(--c-soft)'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )

  // ── WARNING ────────────────────────────────────────────────────────────────
  if (s.type === 'warning') return (
    <div style={{background:'rgba(140,60,20,.12)',border:'1.5px solid rgba(220,120,60,.22)',borderRadius:'10px',padding:'14px 18px',margin:'16px 0',fontSize:'15px'}}>
      <strong style={{color:'#e8a060'}}>{s.title ? s.title : '⚠️'}</strong>
      {s.content && <div style={{color:'var(--c-soft)',marginTop:'6px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )

  // ── EXAMPLE ────────────────────────────────────────────────────────────────
  if (s.type === 'example') return (
    <div style={{background:'var(--c-card)',border:'1.5px solid var(--c-border)',borderRadius:'12px',padding:'20px 24px',margin:'14px 0'}}>
      {s.title && <div style={{fontFamily:'monospace',fontSize:'11px',color:'var(--c-muted)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'8px'}}>{s.title}</div>}
      {s.content && <div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'20px',lineHeight:1.5,color:'var(--c-heading)'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
//  УПРАЖНЕНИЯ
// ─────────────────────────────────────────────────────────────────────────────

function AnalysisExercise({ ex }: { ex: any }) {
  const words: string[] = ex.words ?? []
  const answers: any[]  = ex.answers ?? []
  const [rev, setRev]   = useState<Record<number,boolean>>({})
  const [all, setAll]   = useState(false)
  const count = Object.values(rev).filter(Boolean).length

  function revealAll() {
    const m: Record<number,boolean> = {}
    words.forEach((_,i)=>{m[i]=true})
    setRev(m); setAll(true)
  }

  return (
    <div>
      <p style={{fontSize:'13px',color:'var(--c-muted)',marginBottom:'10px',fontStyle:'italic'}}>Нажмите на строку, чтобы открыть ответ</p>
      <div style={{overflowX:'auto',borderRadius:'10px',border:'1px solid var(--c-border)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px',background:'var(--c-card)',minWidth:'500px'}}>
          <thead>
            <tr>{['#','Форма','Падеж','Число','Род','Лекс. форма','Значение'].map((h,i)=>(
              <th key={i} style={{padding:'9px 10px',background:'var(--c-table-head)',color:'#c99a2e',fontFamily:'monospace',fontSize:'10px',letterSpacing:'1px',textAlign:'left',borderBottom:'1px solid var(--c-border)'}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {words.map((word,i)=>{
              const ans=answers[i]??{}; const isRev=rev[i]
              return (
                <tr key={i} onClick={()=>setRev(p=>({...p,[i]:!p[i]}))}
                  style={{borderBottom:'1px solid var(--c-border)',cursor:'pointer',
                    background:isRev?'rgba(201,154,46,.08)':i%2===0?'var(--c-card)':'var(--c-table-alt)',
                    transition:'background .15s'}}>
                  <td style={{padding:'8px 10px',fontFamily:'monospace',fontSize:'11px',color:'#c99a2e'}}>{i+1}</td>
                  <td style={{padding:'8px 10px',fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'20px',color:'var(--c-heading)'}}>{word}</td>
                  {isRev ? <>
                    <td style={{padding:'8px 10px',color:'#3abfae',fontWeight:600,fontSize:'12px'}}>{ans.case||'—'}</td>
                    <td style={{padding:'8px 10px',color:'var(--c-soft)',fontSize:'12px'}}>{ans.number||'—'}</td>
                    <td style={{padding:'8px 10px',color:'var(--c-soft)',fontSize:'12px'}}>{ans.gender||'—'}</td>
                    <td style={{padding:'8px 10px',fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'16px',color:'#c99a2e'}}>{ans.lexical||'—'}</td>
                    <td style={{padding:'8px 10px',color:'var(--c-soft)',fontSize:'12px'}}>{ans.meaning||'—'}</td>
                  </> : [0,1,2,3,4].map(j=>(
                    <td key={j} style={{padding:'8px 10px'}}>
                      <div style={{height:'12px',borderRadius:'3px',background:'var(--c-border)',width:j===3?'70px':j===4?'55px':'45px',opacity:.5}}/>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'8px'}}>
        <span style={{fontSize:'11px',color:'var(--c-muted)'}}>{count}/{words.length} открыто</span>
        {!all&&<button onClick={revealAll} style={{fontSize:'11px',color:'var(--c-muted)',background:'none',border:'1px solid var(--c-border)',borderRadius:'6px',padding:'4px 10px',cursor:'pointer'}}>Показать все</button>}
      </div>
    </div>
  )
}

function PhrasesExercise({ ex }: { ex: any }) {
  const pairs: {greek:string,russian:string}[] = ex.pairs ?? []
  const [rev, setRev] = useState<Record<number,boolean>>({})
  return (
    <div>
      {pairs.map(({greek,russian},i)=>(
        <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'11px 0',borderBottom:'1px solid var(--c-border)'}}>
          <span style={{fontFamily:'monospace',color:'#c99a2e',fontSize:'12px',minWidth:'20px',marginTop:'4px',flexShrink:0}}>{String.fromCharCode(945+i)}.</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'18px',color:'var(--c-heading)',lineHeight:1.5}} dangerouslySetInnerHTML={{__html:greek}}/>
            {rev[i] && <div style={{fontStyle:'italic',color:'#6dbf7a',fontSize:'14px',marginTop:'4px'}}>{russian}</div>}
          </div>
          <button onClick={()=>setRev(p=>({...p,[i]:!p[i]}))}
            style={{background:'none',border:'1px solid var(--c-border)',color:'var(--c-muted)',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',cursor:'pointer',fontFamily:'monospace',whiteSpace:'nowrap',flexShrink:0}}>
            {rev[i]?'скрыть':'ответ'}
          </button>
        </div>
      ))}
    </div>
  )
}

function ChooseExercise({ ex }: { ex: any }) {
  const [sel,     setSel]     = useState<string|null>(null)
  const [checked, setChecked] = useState(false)

  function optStyle(opt: string): React.CSSProperties {
    const base: React.CSSProperties = {padding:'10px 16px',borderRadius:'10px',fontSize:'14px',textAlign:'left',width:'100%',marginBottom:'6px',cursor:'pointer',transition:'all .15s',background:'transparent',border:'1px solid var(--c-border)',color:'var(--c-soft)'}
    if (!checked) return sel===opt ? {...base,borderColor:'#c99a2e',background:'rgba(201,154,46,.1)',color:'#c99a2e'} : base
    if (opt===ex.answer) return {...base,borderColor:'rgba(80,180,80,.5)',background:'rgba(80,180,80,.1)',color:'#6dbf7a',cursor:'default'}
    if (opt===sel)       return {...base,borderColor:'rgba(180,60,60,.4)',background:'rgba(180,60,60,.08)',color:'#e07a8e',cursor:'default'}
    return {...base,opacity:.4,cursor:'default'}
  }

  return (
    <div>
      <div style={{marginBottom:'12px'}}>
        {(ex.options??[]).map((opt:string,i:number)=>(
          <button key={i} onClick={()=>{if(!checked)setSel(opt)}} style={optStyle(opt)}>
            {checked&&opt===ex.answer&&'✓ '}{opt}
          </button>
        ))}
      </div>
      {!checked ? (
        <button onClick={()=>{if(sel)setChecked(true)}} disabled={!sel}
          style={{padding:'7px 18px',borderRadius:'9px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:sel?'pointer':'not-allowed',opacity:sel?1:.4}}>
          Проверить
        </button>
      ) : (
        <div>
          <button onClick={()=>{setSel(null);setChecked(false)}} style={{fontSize:'12px',color:'var(--c-muted)',background:'none',border:'1px solid var(--c-border)',borderRadius:'8px',padding:'5px 12px',cursor:'pointer',marginBottom:'10px'}}>↺ Попробовать снова</button>
          {ex.explanation && <div style={{fontSize:'13px',lineHeight:1.7,color:'var(--c-soft)',padding:'12px',borderRadius:'10px',background:'var(--c-card)',border:'1px solid var(--c-border)'}}>💡 {ex.explanation}</div>}
        </div>
      )}
    </div>
  )
}

function MatchExercise({ ex }: { ex: any }) {
  const pairs = ex.pairs ?? []
  const [shuffled] = useState(()=>[...pairs.map((_:any,i:number)=>i)].sort(()=>Math.random()-.5))
  const [sel, setSel]     = useState<Record<number,number|null>>({})
  const [checked, setChecked] = useState(false)

  function pick(li:number, ri:number) {
    if(checked) return
    setSel(p=>{
      const u={...p}
      Object.keys(u).forEach(k=>{if(u[Number(k)]===ri)delete u[Number(k)]})
      u[li]=ri; return u
    })
  }

  const allPicked = pairs.every((_:any,i:number)=>sel[i]!==undefined&&sel[i]!==null)
  const correct   = checked && pairs.every((_:any,i:number)=>sel[i]===i)

  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
        <div>
          {pairs.map((p:any,i:number)=>(
            <div key={i} style={{padding:'10px 14px',borderRadius:'10px',border:'1px solid var(--c-border)',background:'var(--c-card)',marginBottom:'6px',fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'17px',color:'var(--c-heading)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              {p.left}<span style={{fontSize:'12px',color:'var(--c-muted)',marginLeft:'8px'}}>→</span>
            </div>
          ))}
        </div>
        <div>
          {shuffled.map((origIdx:number)=>{
            const p=pairs[origIdx]; const used=Object.values(sel).includes(origIdx)
            return (
              <div key={origIdx} style={{padding:'10px 14px',borderRadius:'10px',border:'1px solid var(--c-border)',background:used?'rgba(201,154,46,.08)':'var(--c-card)',marginBottom:'6px',fontSize:'13px',color:used?'#c99a2e':'var(--c-soft)',display:'flex',gap:'4px',alignItems:'center',flexWrap:'wrap'}}>
                {pairs.map((_:any,li:number)=>(
                  <button key={li} onClick={()=>pick(li,origIdx)}
                    style={{fontSize:'11px',padding:'2px 7px',borderRadius:'5px',border:'1px solid',borderColor:sel[li]===origIdx?'#c99a2e':'var(--c-border)',background:sel[li]===origIdx?'rgba(201,154,46,.18)':'transparent',color:sel[li]===origIdx?'#c99a2e':'var(--c-muted)',cursor:'pointer'}}>
                    {li+1}
                  </button>
                ))}
                <span style={{marginLeft:'4px'}}>{p.right}</span>
              </div>
            )
          })}
        </div>
      </div>
      {!checked ? (
        <button onClick={()=>setChecked(true)} disabled={!allPicked}
          style={{padding:'7px 18px',borderRadius:'9px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:allPicked?'pointer':'not-allowed',opacity:allPicked?1:.4}}>
          Проверить
        </button>
      ) : (
        <div style={{padding:'10px 14px',borderRadius:'10px',background:correct?'rgba(80,180,80,.08)':'rgba(200,140,40,.08)',border:`1px solid ${correct?'rgba(80,180,80,.2)':'rgba(200,140,40,.2)'}`,fontSize:'13px',color:correct?'#6dbf7a':'#c8a860'}}>
          {correct?'✓ Верно!':'Проверьте пары.'}
          <button onClick={()=>{setSel({});setChecked(false)}} style={{marginLeft:'12px',fontSize:'11px',color:'var(--c-muted)',background:'none',border:'1px solid var(--c-border)',borderRadius:'6px',padding:'3px 10px',cursor:'pointer'}}>Снова</button>
        </div>
      )}
    </div>
  )
}

function TranslateExercise({ ex }: { ex: any }) {
  const [input,setInput]=useState(''); const [show,setShow]=useState(false)
  return (
    <div>
      {ex.greek&&<div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'20px',color:'var(--c-heading)',marginBottom:'10px',lineHeight:1.5}}>{ex.greek}</div>}
      {ex.hint&&!show&&<div style={{fontSize:'11px',color:'var(--c-muted)',fontFamily:'monospace',marginBottom:'8px'}}>{ex.hint}</div>}
      <textarea value={input} onChange={e=>setInput(e.target.value)} disabled={show} rows={2} placeholder="Ваш перевод..."
        style={{width:'100%',padding:'10px 14px',borderRadius:'10px',border:'1px solid var(--c-border)',background:'var(--c-surface)',color:'var(--c-text)',fontSize:'15px',lineHeight:'1.6',resize:'vertical',outline:'none',marginBottom:'10px',fontFamily:'inherit'}}/>
      <div style={{display:'flex',gap:'10px'}}>
        {!show ? (
          <button onClick={()=>setShow(true)} style={{padding:'7px 18px',borderRadius:'10px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:'pointer'}}>Показать перевод</button>
        ) : (
          <button onClick={()=>{setShow(false);setInput('')}} style={{fontSize:'12px',color:'var(--c-muted)',background:'none',border:'1px solid var(--c-border)',borderRadius:'8px',padding:'5px 12px',cursor:'pointer'}}>↺ Снова</button>
        )}
      </div>
      {show&&(
        <div style={{marginTop:'12px',padding:'12px 16px',borderRadius:'12px',background:'rgba(80,180,80,.07)',border:'1px solid rgba(80,180,80,.2)'}}>
          <div style={{fontSize:'11px',color:'#6dbf7a',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',marginBottom:'4px'}}>Перевод</div>
          <div style={{fontSize:'15px',lineHeight:1.7,color:'var(--c-text)'}}>{ex.answer}</div>
          {ex.note&&<div style={{marginTop:'8px',fontSize:'12px',color:'var(--c-muted)',fontStyle:'italic'}}>{ex.note}</div>}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ДИСПЕТЧЕР УПРАЖНЕНИЙ
// ─────────────────────────────────────────────────────────────────────────────
function ExerciseBlock({ ex, index }: { ex: any; index: number }) {
  const question = (ex.question??'')
    .replace(/\s*\(Упражнение\s+\d+,?\s*Маунс\)/gi,'')
    .replace(/\s*Упражнение\s+\d+\s*\(Маунс\)/gi,'')
    .replace(/^[📊🔤📖✍️]\s*/,'')
    .trim()

  return (
    <div style={{background:'rgba(255,255,255,.04)',border:'1px solid var(--c-border)',borderRadius:'12px',padding:'24px 26px',marginBottom:'18px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#c99a2e',color:'#111',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace',fontWeight:700,fontSize:'13px',flexShrink:0}}>{index+1}</div>
        <div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'17px',fontWeight:700,color:'var(--c-heading)'}}>{question||`Задание ${index+1}`}</div>
      </div>
      {ex.type==='analysis'                    && <AnalysisExercise  ex={ex}/>}
      {ex.type==='phrases'                     && <PhrasesExercise   ex={ex}/>}
      {ex.type==='choose'                      && <ChooseExercise    ex={ex}/>}
      {ex.type==='match'                       && <MatchExercise     ex={ex}/>}
      {(ex.type==='translate'||ex.type==='fill')&& <TranslateExercise ex={ex}/>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ЧЕКЛИСТ
// ─────────────────────────────────────────────────────────────────────────────
function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  return (
    <div style={{background:'rgba(201,154,46,.07)',border:'1px solid rgba(201,154,46,.18)',borderRadius:'12px',padding:'20px 24px',marginTop:'20px'}}>
      <h4 style={{fontFamily:"'Playfair Display',var(--font-cormorant),serif",color:'#c99a2e',fontSize:'17px',marginBottom:'14px'}}>Самопроверка</h4>
      {items.map((text,i)=>(
        <div key={i} onClick={()=>setChecked(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n})}
          style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontSize:'14px',cursor:'pointer',userSelect:'none'}}>
          <div style={{width:'18px',height:'18px',border:`1.5px solid ${checked.has(i)?'#c99a2e':'rgba(201,154,46,.3)'}`,borderRadius:'4px',flexShrink:0,marginTop:'2px',background:checked.has(i)?'#c99a2e':'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#111',transition:'all .2s'}}>
            {checked.has(i)?'✓':''}
          </div>
          <span style={{color:'var(--c-soft)'}}>{text}</span>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  VOCAB CARD
// ─────────────────────────────────────────────────────────────────────────────
function VocabCard({ w }: { w: any }) {
  const [flip,setFlip]=useState(false)
  return (
    <div onClick={()=>setFlip(p=>!p)}
      style={{background:'var(--c-card)',border:'1.5px solid var(--c-border)',borderRadius:'10px',padding:'14px 15px',cursor:'pointer',minHeight:'108px',display:'flex',flexDirection:'column',justifyContent:'space-between',transition:'border-color .2s'}}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#c99a2e'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--c-border)'}}>
      {!flip ? <>
        <div style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'22px',fontWeight:700,color:'var(--c-heading)',marginBottom:'4px'}}>{w.greek}</div>
        <div style={{fontFamily:'monospace',fontSize:'11px',color:'var(--c-muted)',marginBottom:'6px'}}>{w.transliteration}</div>
        <div style={{fontSize:'14px',fontWeight:600,color:'var(--c-text)'}}>{w.translation}</div>
        {w.frequency&&<div style={{fontSize:'11px',color:'var(--c-muted)',fontFamily:'monospace',marginTop:'4px'}}>×{w.frequency} в НЗ</div>}
      </> : <>
        <div style={{fontSize:'13px',color:'var(--c-soft)',fontStyle:'italic',flex:1}}>{w.example??'—'}</div>
        <div style={{fontSize:'11px',color:'#c99a2e',fontFamily:'monospace',marginTop:'8px'}}>← назад</div>
      </>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ГЛАВНЫЙ КОМПОНЕНТ
// ─────────────────────────────────────────────────────────────────────────────
export function LessonContent({ lesson, module: mod, userId, prev, next, isCompleted }: any) {
  const [completed, setCompleted] = useState(isCompleted)
  const [saving,    setSaving]    = useState(false)
  const [tab,       setTab]       = useState<'lesson'|'vocab'|'exercises'>('lesson')

  async function handleComplete() {
    setSaving(true)
    try {
      await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lessonId:lesson.id,completed:true})})
      setCompleted(true)
    } catch {} finally { setSaving(false) }
  }

  const lessonNum = lesson.id?.split('-')?.pop()??'?'
  // Use sections (correct field name from data)
  const sections  = lesson.sections ?? []

  return (
    <article>

      {/* ── ШАПКА ────────────────────────────────────────────────────────── */}
      <header style={{background:'var(--c-surface)',borderBottom:'1px solid var(--c-border)',padding:'48px 32px 36px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-10px',top:'50%',transform:'translateY(-50%)',fontFamily:"'Playfair Display',serif",fontSize:'120px',fontWeight:900,opacity:.04,letterSpacing:'-4px',pointerEvents:'none',whiteSpace:'nowrap',color:'var(--c-heading)',userSelect:'none'}}>ΕΛΛΗΝΙΚΑ</div>

        <div style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'4px',textTransform:'uppercase',color:'#c99a2e',marginBottom:'12px'}}>
          {mod?.title??`Модуль ${lesson.moduleId}`} · Глава {lessonNum}
        </div>
        <h1 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'clamp(28px,4.5vw,52px)',fontWeight:900,lineHeight:1.05,marginBottom:'12px',color:'var(--c-heading)'}}>
          {lesson.title}
        </h1>
        <p style={{fontSize:'16px',color:'var(--c-muted)',fontStyle:'italic',maxWidth:'520px',marginBottom:'20px'}}>{lesson.subtitle}</p>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
          {[
            `⏱ ${lesson.duration??'~40 мин'}`,
            `📚 ${(lesson.vocab??[]).length} слов`,
            `✍️ ${(lesson.exercises??[]).length} заданий`,
            completed ? '✓ Пройден' : null,
          ].filter(Boolean).map((chip,i)=>(
            <span key={i} style={{background:'var(--c-card)',border:'1px solid var(--c-border)',borderRadius:'30px',padding:'4px 12px',fontSize:'12px',fontFamily:'monospace',color:(chip as string).startsWith('✓')?'#6dbf7a':'var(--c-muted)'}}>
              {chip}
            </span>
          ))}
        </div>
      </header>

      {/* ── ТАБЫ НАВИГАЦИИ ───────────────────────────────────────────────── */}
      <div style={{background:'var(--c-surface)',borderBottom:'1px solid var(--c-border)',padding:'0 32px',display:'flex',overflowX:'auto',gap:0}}>
        {[
          {label:'📖 Урок',    k:'lesson'},
          {label:`📚 Словарь (${(lesson.vocab??[]).length})`, k:'vocab'},
          {label:`✍️ Задания (${(lesson.exercises??[]).length})`, k:'exercises'},
        ].map(item=>(
          <button key={item.k} onClick={()=>setTab(item.k as any)}
            style={{padding:'14px 20px',fontSize:'12px',fontFamily:'monospace',whiteSpace:'nowrap',background:'none',cursor:'pointer',
              color:tab===item.k?'#c99a2e':'var(--c-muted)',
              borderBottom:`2px solid ${tab===item.k?'#c99a2e':'transparent'}`,
              border:'none',
              borderBottom:`2px solid ${tab===item.k?'#c99a2e':'transparent'}`,
              transition:'all .2s'}}>
            {item.label}
          </button>
        ))}
      </div>

      {/* ── КОНТЕНТ ──────────────────────────────────────────────────────── */}
      <div style={{padding:'48px 32px 80px',maxWidth:'820px'}}>

        {/* УРОК */}
        {tab==='lesson' && (
          <div>
            {sections.map((s:any,i:number)=>(
              <div key={i}><RenderSection s={s}/></div>
            ))}

            {/* Итоги */}
            {(lesson.summary??[]).length > 0 && (
              <div style={{marginTop:'36px',padding:'28px 30px',background:'var(--c-card)',border:'1.5px solid var(--c-border)',borderRadius:'14px'}}>
                <h3 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",color:'#c99a2e',fontSize:'20px',fontWeight:700,marginBottom:'14px'}}>Итоги урока</h3>
                <ol style={{padding:0,listStyle:'none'}}>
                  {lesson.summary.map((item:string,i:number)=>(
                    <li key={i} style={{display:'flex',gap:'12px',padding:'10px 0',borderBottom:'1px solid var(--c-border)',fontSize:'15px',color:'var(--c-soft)',alignItems:'flex-start'}}>
                      <span style={{color:'#c99a2e',fontFamily:'monospace',fontSize:'12px',fontWeight:700,flexShrink:0,marginTop:'2px'}}>{String(i+1).padStart(2,'0')}</span>
                      <span dangerouslySetInnerHTML={{__html:md(item)}}/>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Кнопка «Пройден» */}
            {!completed && (
              <div style={{margin:'28px 0',padding:'22px',borderRadius:'14px',background:'var(--c-card)',border:'1.5px solid var(--c-border)',textAlign:'center'}}>
                <p style={{fontSize:'15px',color:'var(--c-muted)',marginBottom:'14px'}}>Изучили материал? Отметьте урок как пройденный.</p>
                <button onClick={handleComplete} disabled={saving}
                  style={{padding:'10px 32px',borderRadius:'10px',fontSize:'15px',fontWeight:700,background:'#c99a2e',color:'#111',border:'none',cursor:'pointer',opacity:saving?.5:1,fontFamily:"'Playfair Display',serif"}}>
                  {saving?'Сохраняем...':'✓ Урок пройден'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* СЛОВАРЬ */}
        {tab==='vocab' && (
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:'8px',fontFamily:'monospace',fontSize:'11px',letterSpacing:'3px',textTransform:'uppercase',color:'#c99a2e',marginBottom:'10px'}}>
              <span style={{display:'block',width:'24px',height:'1px',background:'#c99a2e'}}/>Слова урока
            </div>
            <h2 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'clamp(22px,3vw,32px)',fontWeight:900,color:'var(--c-heading)',marginBottom:'8px'}}>Словарный запас</h2>
            <p style={{color:'var(--c-muted)',fontSize:'14px',marginBottom:'20px'}}>Нажмите на карточку, чтобы увидеть пример. Число — частота в Новом Завете.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))',gap:'12px'}}>
              {(lesson.vocab??[]).map((w:any,i:number)=><VocabCard key={i} w={w}/>)}
            </div>
          </div>
        )}

        {/* ЗАДАНИЯ */}
        {tab==='exercises' && (
          <div style={{background:'var(--c-surface)',borderRadius:'18px',padding:'36px 30px',border:'1.5px solid var(--c-border)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',right:'-8px',top:'16px',fontFamily:"'Playfair Display',serif",fontSize:'80px',fontWeight:900,opacity:.04,pointerEvents:'none',color:'var(--c-heading)',whiteSpace:'nowrap'}}>Άσκηση</div>
            <h2 style={{fontFamily:"'Playfair Display',var(--font-cormorant),Georgia,serif",fontSize:'26px',fontWeight:900,color:'#c99a2e',marginBottom:'4px'}}>Задания</h2>
            <p style={{color:'var(--c-muted)',fontStyle:'italic',marginBottom:'24px',fontSize:'14px'}}>Изучите урок, затем выполните упражнения</p>
            {(lesson.exercises??[]).map((ex:any,i:number)=>(
              <ExerciseBlock key={i} ex={ex} index={i}/>
            ))}
            {lesson.checklist && <Checklist items={lesson.checklist}/>}
          </div>
        )}

        {/* НАВИГАЦИЯ */}
        <nav style={{display:'flex',justifyContent:'space-between',gap:'16px',paddingTop:'28px',borderTop:'1px solid var(--c-border)',marginTop:'28px'}}>
          {prev ? (
            <Link href={`/lesson/${prev.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'14px 18px',borderRadius:'12px',border:'1px solid var(--c-border)',background:'var(--c-card)',textDecoration:'none',flex:1,maxWidth:'48%'}}>
              <span style={{fontSize:'11px',fontFamily:'monospace',color:'var(--c-muted)',letterSpacing:'1px',textTransform:'uppercase'}}>← Назад</span>
              <span style={{fontSize:'14px',color:'var(--c-soft)',fontFamily:"'Playfair Display',serif"}}>{prev.title}</span>
            </Link>
          ) : <div/>}
          {next ? (
            <Link href={`/lesson/${next.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'14px 18px',borderRadius:'12px',border:'1px solid var(--c-border)',background:'var(--c-card)',textDecoration:'none',flex:1,maxWidth:'48%',textAlign:'right'}}>
              <span style={{fontSize:'11px',fontFamily:'monospace',color:'#c99a2e',letterSpacing:'1px',textTransform:'uppercase'}}>Далее →</span>
              <span style={{fontSize:'14px',color:'var(--c-heading)',fontFamily:"'Playfair Display',serif"}}>{next.title}</span>
            </Link>
          ) : <div/>}
        </nav>
      </div>
    </article>
  )
}

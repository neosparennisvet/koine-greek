// @ts-nocheck
'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─────────────────────────────────────────────────────────────────────────────
//  ОБЩИЕ СТИЛИ
// ─────────────────────────────────────────────────────────────────────────────
const S = {
  h2:  { fontFamily:"'Playfair Display',Georgia,serif", fontSize:'clamp(26px,3.5vw,38px)', fontWeight:900, lineHeight:1.15, marginBottom:'18px', color:'#eef3ff' } as React.CSSProperties,
  h3:  { fontFamily:"'Playfair Display',Georgia,serif", fontSize:'21px', fontWeight:700, marginBottom:'12px', color:'#c8d4f0' } as React.CSSProperties,
  p:   { marginBottom:'16px', lineHeight:1.85, color:'#b8c6e4', fontSize:'16px' } as React.CSSProperties,
  eyebrow: { display:'inline-flex', alignItems:'center', gap:'10px', fontFamily:'monospace', fontSize:'11px', letterSpacing:'3px', textTransform:'uppercase', color:'#c99a2e', marginBottom:'10px' } as React.CSSProperties,
  divider: { border:'none', height:'1px', background:'linear-gradient(90deg,transparent,#2e3450,transparent)', margin:'52px 0' } as React.CSSProperties,
  introCard: { background:'#0d1020', border:'1.5px solid #2e3450', borderRadius:'16px', padding:'32px 36px', marginBottom:'32px', position:'relative', overflow:'hidden' } as React.CSSProperties,
  tipBox:   { background:'rgba(45,90,39,.18)', border:'1.5px solid rgba(100,180,90,.25)', borderRadius:'10px', padding:'14px 18px', margin:'16px 0', fontSize:'15px', color:'#a8e0a0' } as React.CSSProperties,
  warnBox:  { background:'rgba(140,60,20,.18)', border:'1.5px solid rgba(220,120,60,.25)', borderRadius:'10px', padding:'14px 18px', margin:'16px 0', fontSize:'15px', color:'#f0b080' } as React.CSSProperties,
  hlBox:    { borderLeft:'4px solid #c99a2e', background:'rgba(201,154,46,.07)', borderRadius:'0 10px 10px 0', padding:'16px 20px', margin:'22px 0', fontStyle:'italic', color:'#d4c080' } as React.CSSProperties,
  exBlock:  { background:'#0f1220', border:'1.5px solid #2a3060', borderRadius:'12px', padding:'20px 24px', margin:'14px 0' } as React.CSSProperties,
  exegCard: { background:'#1a2a4a', border:'1.5px solid #2a4a7a', borderRadius:'16px', padding:'30px 34px', margin:'28px 0', position:'relative', overflow:'hidden' } as React.CSSProperties,
  tableWrap:{ overflowX:'auto', margin:'18px 0', borderRadius:'12px', border:'1.5px solid #2e3450' } as React.CSSProperties,
  hwSection:{ background:'#08091200', border:'1.5px solid #1e2440', borderRadius:'20px', padding:'40px 36px', marginTop:'0', position:'relative', overflow:'hidden' } as React.CSSProperties,
  exBox:    { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)', borderRadius:'12px', padding:'24px 26px', marginBottom:'20px' } as React.CSSProperties,
  vocabCard:{ background:'#0f1220', border:'1.5px solid #2a3060', borderRadius:'10px', padding:'14px 15px', cursor:'pointer', minHeight:'110px', display:'flex', flexDirection:'column', justifyContent:'space-between', transition:'all .2s' } as React.CSSProperties,
}

// ─────────────────────────────────────────────────────────────────────────────
//  SVG КОМПОНЕНТЫ
// ─────────────────────────────────────────────────────────────────────────────
function MediterraneanMap() {
  return (
    <div style={{borderRadius:'16px', overflow:'hidden', border:'1.5px solid #2e3450', margin:'24px 0', background:'#0d1e3a'}}>
      <svg viewBox="0 0 800 380" style={{width:'100%',display:'block'}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="seaBg2" cx="50%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#1a3d6e"/><stop offset="100%" stopColor="#0b1e3a"/>
          </radialGradient>
        </defs>
        <rect width="800" height="380" fill="url(#seaBg2)"/>
        {Array.from({length:10}).map((_,i)=>(
          <path key={i} d={`M0 ${35+i*30} Q200 ${26+i*30} 400 ${35+i*30} T800 ${35+i*30}`} fill="none" stroke="#1e4a7a" strokeWidth="0.6" opacity="0.5"/>
        ))}
        <path d="M200 60 L230 55 L250 70 L260 110 L255 145 L248 170 L242 195 L250 220 L245 245 L235 260 L225 265 L220 255 L230 235 L225 210 L215 185 L205 160 L198 130 L192 100 L190 75 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="218" y="145" fill="#6dbf7a" fontSize="9" textAnchor="middle" fontFamily="Georgia" transform="rotate(-10,218,145)">ИТАЛИЯ</text>
        <path d="M340 45 L390 38 L430 45 L455 60 L460 90 L450 120 L440 145 L445 165 L435 185 L420 195 L410 185 L415 165 L405 145 L398 120 L385 100 L370 90 L355 80 L342 65 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="403" y="120" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ГРЕЦИЯ</text>
        <path d="M520 100 L600 90 L660 100 L700 130 L710 170 L680 200 L620 210 L565 195 L540 165 L530 135 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
        <text x="618" y="155" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">М.АЗИЯ</text>
        <path d="M550 260 L650 250 L700 260 L720 290 L700 320 L620 330 L560 315 L545 290 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
        <text x="625" y="295" fill="#f0d090" fontSize="9" textAnchor="middle" fontFamily="Georgia">ЕГИПЕТ</text>
        <path d="M350 290 L500 275 L540 290 L545 320 L500 340 L400 345 L355 325 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
        <text x="447" y="318" fill="#f0d090" fontSize="8" textAnchor="middle" fontFamily="Georgia">ИЗРАИЛЬ/СИРИЯ</text>
        {[{x:220,y:232,n:'РИМ',c:'#f0d080'},{x:408,y:168,n:'АФИНЫ',c:'#80d0f0'},{x:490,y:177,n:'ЭФЕС',c:'#f0a060'},{x:473,y:307,n:'АНТИОХИЯ',c:'#a0f0a0'},{x:447,y:332,n:'ИЕРУСАЛИМ',c:'#f0f080'},{x:562,y:297,n:'АЛЕКСАНДРИЯ',c:'#f0c0a0'}].map(c=>(
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
    <div style={{...S.tableWrap,marginTop:'20px'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px',background:'#0a0d14',minWidth:'340px'}}>
        <thead><tr style={{background:'#13172a'}}>
          {['Буква','Название','Звук'].map(h=>(
            <th key={h} style={{padding:'10px 14px',textAlign:'left',fontFamily:'monospace',fontSize:'10px',letterSpacing:'1.5px',color:'#c99a2e',borderBottom:'2px solid #2e3450',textTransform:'uppercase'}}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {letters.map(([l,n,s],i)=>(
            <tr key={i} style={{background:i%2===0?'transparent':'rgba(255,255,255,.02)',borderBottom:'1px solid #1e2440'}}>
              <td style={{padding:'9px 14px',fontFamily:"'Playfair Display',Georgia,serif",fontSize:'20px',color:'#c0d8ff',fontWeight:700}}>{l}</td>
              <td style={{padding:'9px 14px',color:'#8898bb',fontSize:'13px'}}>{n}</td>
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
    {y:'~330 до н.э.',e:'Александр Великий — κοινή становится общим языком'},
    {y:'~200 до н.э.',e:'Перевод ВЗ на греческий — Септуагинта (LXX)'},
    {y:'~5 до н.э.',e:'Рождение Иисуса. Вся Палестина говорит по-гречески'},
    {y:'50–65 н.э.',e:'Павел пишет послания на κοινή — первые тексты НЗ'},
    {y:'65–95 н.э.',e:'Евангелия и Откровение — κοινή в расцвете'},
    {y:'~400 н.э.',e:'Иероним переводит Библию на латынь (Вульгата)'},
  ]
  return (
    <div style={{margin:'24px 0'}}>
      {events.map((e,i)=>(
        <div key={i} style={{display:'flex',gap:'16px',paddingBottom:'20px'}}>
          <div style={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:'12px'}}>
            <div style={{width:'12px',height:'12px',borderRadius:'50%',background:'#c99a2e',flexShrink:0,marginTop:'4px'}}/>
            {i<events.length-1&&<div style={{width:'2px',flex:1,background:'#2e3450',marginTop:'4px'}}/>}
          </div>
          <div>
            <div style={{fontFamily:'monospace',fontSize:'11px',color:'#c99a2e',letterSpacing:'1px',marginBottom:'4px'}}>{e.y}</div>
            <div style={{fontSize:'15px',color:'#b0c0e0',lineHeight:1.6}}>{e.e}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  РЕНДЕР СЕКЦИИ УРОКА
// ─────────────────────────────────────────────────────────────────────────────
function RenderSection({ s }: { s: any }) {
  if (!s) return null
  if (s.type === 'map')       return <MediterraneanMap/>
  if (s.type === 'alphabet')  return <AlphabetChart/>
  if (s.type === 'timeline')  return <Timeline/>
  if (s.type === 'illustration') {
    if (s.illustration === 'mediterranean-map') return <MediterraneanMap/>
    if (s.illustration === 'timeline')          return <Timeline/>
    if (s.illustration === 'alphabet-chart')    return <AlphabetChart/>
    return null
  }

  if (s.type === 'intro') return (
    <div style={S.introCard}>
      <div style={{position:'absolute',right:'20px',bottom:'-10px',fontFamily:"'Playfair Display',serif",fontSize:'80px',fontWeight:900,opacity:.05,pointerEvents:'none',color:'#c99a2e',lineHeight:1}}>{s.watermark??'λόγος'}</div>
      {s.title&&<h3 style={{...S.h3,color:'#eef3ff',marginBottom:'12px'}}>{s.title}</h3>}
      {s.body&&<div style={{...S.p,opacity:.92,color:'#c8d4f0'}} dangerouslySetInnerHTML={{__html:s.body.replace(/\n/g,'<br/>')}}/>}
      {s.points&&<ul style={{margin:'8px 0 0',padding:0,listStyle:'none'}}>
        {s.points.map((pt:string,i:number)=>(
          <li key={i} style={{display:'flex',gap:'10px',paddingBottom:'8px',color:'#a8b8d8',fontSize:'15px'}}>
            <span style={{color:'#c99a2e',flexShrink:0,marginTop:'2px'}}>›</span>
            <span dangerouslySetInnerHTML={{__html:pt}}/>
          </li>
        ))}
      </ul>}
    </div>
  )

  if (s.type === 'theory') return (
    <div style={{marginBottom:'28px'}}>
      {s.eyebrow&&<div style={S.eyebrow}><span style={{display:'block',width:'28px',height:'1px',background:'#c99a2e'}}/>{s.eyebrow}</div>}
      {s.title&&<h2 style={S.h2}>{s.title}</h2>}
      {s.subtitle&&<h3 style={S.h3}>{s.subtitle}</h3>}
      {s.body&&<p style={S.p} dangerouslySetInnerHTML={{__html:s.body.replace(/\n/g,'<br/>')}}/>}
      {s.points&&<ul style={{margin:'8px 0',padding:0,listStyle:'none'}}>
        {s.points.map((pt:string,i:number)=>(
          <li key={i} style={{display:'flex',gap:'12px',padding:'12px 16px',borderRadius:'10px',marginBottom:'8px',background:'rgba(255,255,255,.04)',border:'1px solid #1e2440',fontSize:'15px',alignItems:'flex-start',color:'#b0c0e4'}}>
            <span style={{flexShrink:0,width:'24px',height:'24px',background:'#0d1120',color:'#c99a2e',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace',fontSize:'12px',fontWeight:700,marginTop:'1px'}}>{i+1}</span>
            <span dangerouslySetInnerHTML={{__html:pt}}/>
          </li>
        ))}
      </ul>}
      {s.examples&&s.examples.map((ex:any,i:number)=>(
        <div key={i} style={S.exBlock}>
          <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'22px',color:'#c8d8ff',lineHeight:1.4,marginBottom:'6px'}} dangerouslySetInnerHTML={{__html:ex.greek}}/>
          {ex.trans&&<div style={{color:'#8898bb',fontStyle:'italic',fontSize:'14px',marginBottom:'6px'}}>{ex.trans}</div>}
          {ex.note&&<div style={{fontSize:'13px',color:'#6878a8'}}>{ex.note}</div>}
          {ex.tags&&<div style={{display:'flex',gap:'6px',flexWrap:'wrap',marginTop:'8px'}}>
            {ex.tags.map((t:string,j:number)=>(
              <span key={j} style={{background:'rgba(30,60,120,.5)',border:'1px solid #2a4a8a',color:'#80a8e0',padding:'2px 9px',borderRadius:'20px',fontSize:'11px',fontFamily:'monospace'}}>{t}</span>
            ))}
          </div>}
        </div>
      ))}
    </div>
  )

  if (s.type === 'table') return (
    <div style={{marginBottom:'28px'}}>
      {s.title&&<h3 style={S.h3}>{s.title}</h3>}
      {s.note&&<p style={{...S.p,fontSize:'14px',color:'#6878a8'}} dangerouslySetInnerHTML={{__html:s.note}}/>}
      <div style={S.tableWrap}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'14px',background:'#0a0d14',minWidth:s.minWidth??'400px'}}>
          <thead>
            <tr style={{background:'#13172a'}}>
              {s.headers.map((h:string,i:number)=>(
                <th key={i} style={{padding:'11px 14px',textAlign:i===0?'left':'center',fontFamily:'monospace',fontSize:'10px',letterSpacing:'1.5px',textTransform:'uppercase',color:'#c99a2e',borderBottom:'2px solid #2e3450',whiteSpace:'nowrap'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {s.rows.map((row:any[],ri:number)=>(
              <tr key={ri} style={{background:ri%2===0?'transparent':'rgba(255,255,255,.025)',borderBottom:'1px solid #1a1e30'}}>
                {row.map((cell:any,ci:number)=>(
                  <td key={ci} style={{padding:'10px 14px',textAlign:ci===0?'left':'center',verticalAlign:'middle',color:ci===0?'#8898bb':'#c0d0f0',fontFamily:ci>0?"'Playfair Display',Georgia,serif":'inherit',fontSize:ci>0?'18px':'13px'}}>
                    <span dangerouslySetInnerHTML={{__html:String(cell)}}/>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  if (s.type === 'verse') return (
    <div style={S.exegCard}>
      <div style={{position:'absolute',right:'14px',bottom:'-14px',fontFamily:"'Playfair Display',serif",fontSize:'80px',fontWeight:900,opacity:.06,pointerEvents:'none',color:'#c8d8ff',lineHeight:1}}>{s.watermark??'θεός'}</div>
      {s.reference&&<div style={{fontFamily:'monospace',fontSize:'11px',letterSpacing:'2px',color:'#c99a2e',marginBottom:'10px',textTransform:'uppercase'}}>{s.reference}</div>}
      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(20px,3vw,26px)',letterSpacing:'0.5px',lineHeight:1.5,color:'#d8e8ff',marginBottom:'8px'}}>{s.greek}</div>
      {s.trans&&<div style={{fontStyle:'italic',color:'rgba(200,210,240,.7)',fontSize:'15px',marginBottom:'14px'}}>{s.trans}</div>}
      {s.body&&<p style={{...S.p,color:'rgba(200,210,240,.88)',fontSize:'15px'}} dangerouslySetInnerHTML={{__html:s.body.replace(/\n/g,'<br/>')}}/>}
      {s.annotations&&<div style={{display:'flex',gap:'10px',flexWrap:'wrap',marginTop:'14px'}}>
        {s.annotations.map((a:any,i:number)=>(
          <div key={i} style={{background:'rgba(255,255,255,.08)',borderRadius:'8px',padding:'7px 12px',fontSize:'12px',fontFamily:'monospace'}}>
            <span style={{color:'#c99a2e',display:'block',fontFamily:"'Playfair Display',serif",fontSize:'17px',fontWeight:700}}>{a.form}</span>
            <span style={{color:'#8898bb'}}>{a.desc}</span>
          </div>
        ))}
      </div>}
    </div>
  )

  if (s.type === 'tip')     return <div style={S.tipBox}><strong>💡 </strong><span dangerouslySetInnerHTML={{__html:s.body}}/></div>
  if (s.type === 'warning') return <div style={S.warnBox}><strong>⚠️ </strong><span dangerouslySetInnerHTML={{__html:s.body}}/></div>
  if (s.type === 'highlight') return (
    <div style={S.hlBox}>
      {s.title&&<strong style={{fontStyle:'normal',color:'#c99a2e',display:'block',marginBottom:'6px'}}>{s.title}</strong>}
      <span dangerouslySetInnerHTML={{__html:s.body}}/>
    </div>
  )

  if (s.type === 'concept-grid') return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:'14px',margin:'24px 0'}}>
      {s.items.map((item:any,i:number)=>(
        <div key={i} style={{background:'#0f1220',border:'1.5px solid #2a3060',borderTop:`3px solid ${item.color??'#c99a2e'}`,borderRadius:'12px',padding:'22px 18px'}}>
          {item.icon&&<div style={{fontSize:'26px',marginBottom:'10px'}}>{item.icon}</div>}
          <h4 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'16px',fontWeight:700,color:item.color??'#c99a2e',marginBottom:'6px'}}>{item.title}</h4>
          <p style={{fontSize:'13px',color:'#7888a8',margin:0}} dangerouslySetInnerHTML={{__html:item.body}}/>
        </div>
      ))}
    </div>
  )

  if (s.type === 'article-grid') return (
    <div style={{marginBottom:'28px'}}>
      {s.title&&<h3 style={S.h3}>{s.title}</h3>}
      <div style={{display:'grid',gridTemplateColumns:'auto 1fr 1fr 1fr',gap:'2px',background:'#2e3450',borderRadius:'12px',overflow:'hidden',border:'1.5px solid #2e3450',margin:'18px 0'}}>
        <div style={{background:'#13172a',padding:'10px'}}/>
        {['Муж. р.','Жен. р.','Ср. р.'].map((g,i)=>(
          <div key={i} style={{background:'#13172a',padding:'10px',fontFamily:'monospace',fontSize:'11px',color:'#c99a2e',fontWeight:600,textAlign:'center'}}>{g}</div>
        ))}
        {(s.rows??[]).map((row:any[],ri:number)=>(
          <>
            <div key={`l${ri}`} style={{background:'#0e1128',padding:'10px',fontSize:'11px',fontFamily:'monospace',color:'#5a6a8a',textAlign:'right',display:'flex',alignItems:'center',justifyContent:'flex-end'}}>{row[0]}</div>
            {[row[1],row[2],row[3]].map((cell:string,ci:number)=>(
              <div key={ci} style={{background:'#0a0d14',padding:'12px 8px',textAlign:'center',fontFamily:"'Playfair Display',Georgia,serif",fontSize:'22px',fontWeight:700,color:ci===0?'#6090e0':ci===1?'#c070c0':'#60b060'}}>{cell}</div>
            ))}
          </>
        ))}
      </div>
    </div>
  )

  if (s.type === 'word-anatomy') return (
    <div style={{background:'#0f1220',border:'1.5px solid #2a3060',borderRadius:'16px',padding:'28px 20px 48px',margin:'20px 0',textAlign:'center'}}>
      {s.subtitle&&<div style={{fontFamily:'monospace',fontSize:'11px',color:'#5a6a8a',marginBottom:'8px'}}>{s.subtitle}</div>}
      <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(40px,8vw,68px)',fontWeight:900,letterSpacing:'2px',display:'flex',justifyContent:'center',lineHeight:1}}>
        {(s.parts??[]).map((part:any,i:number)=>(
          <span key={i} style={{color:i===0?'#6090e0':'#c99a2e',position:'relative'}}>
            {part.text}
            <span style={{position:'absolute',bottom:'-28px',left:'50%',transform:'translateX(-50%)',fontFamily:'monospace',fontSize:'10px',color:i===0?'#6090e0':'#c99a2e',whiteSpace:'nowrap'}}>{part.label}</span>
          </span>
        ))}
      </div>
      {s.legend&&<div style={{display:'flex',justifyContent:'center',gap:'24px',marginTop:'48px',flexWrap:'wrap'}}>
        {s.legend.map((l:any,i:number)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px',color:'#8898b8'}}>
            <div style={{width:'10px',height:'10px',borderRadius:'50%',background:i===0?'#6090e0':'#c99a2e',flexShrink:0}}/>
            <span dangerouslySetInnerHTML={{__html:l}}/>
          </div>
        ))}
      </div>}
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
      <p style={{fontSize:'13px',color:'#5a6a8a',marginBottom:'10px',fontStyle:'italic'}}>Нажмите на строку, чтобы открыть ответ</p>
      <div style={{overflowX:'auto',borderRadius:'10px',border:'1px solid rgba(255,255,255,.07)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px',minWidth:'520px'}}>
          <thead>
            <tr>{['#','Форма','Падеж','Число','Род','Лекс. форма','Значение'].map((h,i)=>(
              <th key={i} style={{padding:'9px 10px',background:'rgba(255,255,255,.07)',color:'#c99a2e',fontFamily:'monospace',fontSize:'10px',letterSpacing:'1px',textAlign:'left',borderBottom:'1px solid rgba(255,255,255,.08)'}}>{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {words.map((word,i)=>{
              const ans=answers[i]??{}; const isRev=rev[i]
              return (
                <tr key={i} onClick={()=>setRev(p=>({...p,[i]:!p[i]}))}
                  style={{borderBottom:'1px solid rgba(255,255,255,.04)',cursor:'pointer',background:isRev?'rgba(201,154,46,.05)':'transparent',transition:'background .15s'}}>
                  <td style={{padding:'8px 10px',fontFamily:'monospace',fontSize:'10px',color:'#c99a2e'}}>{i+1}</td>
                  <td style={{padding:'8px 10px',fontFamily:"'Playfair Display',Georgia,serif",fontSize:'19px',color:'#e8d080'}}>{word}</td>
                  {isRev ? <>
                    <td style={{padding:'8px 10px',color:'#3abfae',fontWeight:600,fontSize:'12px'}}>{ans.case??'—'}</td>
                    <td style={{padding:'8px 10px',color:'#b0c0e0',fontSize:'12px'}}>{ans.number??'—'}</td>
                    <td style={{padding:'8px 10px',color:'#b0c0e0',fontSize:'12px'}}>{ans.gender??'—'}</td>
                    <td style={{padding:'8px 10px',fontFamily:"'Playfair Display',Georgia,serif",fontSize:'16px',color:'#c99a2e'}}>{ans.lexical??'—'}</td>
                    <td style={{padding:'8px 10px',color:'#8898b8',fontSize:'12px'}}>{ans.meaning??'—'}</td>
                  </> : [0,1,2,3,4].map(j=>(
                    <td key={j} style={{padding:'8px 10px'}}>
                      <div style={{height:'11px',borderRadius:'3px',background:'rgba(255,255,255,.06)',width:j===3?'68px':j===4?'52px':'42px'}}/>
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'8px'}}>
        <span style={{fontSize:'11px',color:'#3a4a6a'}}>{count}/{words.length} открыто</span>
        {!all&&<button onClick={revealAll} style={{fontSize:'11px',color:'#5a6a8a',background:'none',border:'1px solid #2e3450',borderRadius:'6px',padding:'4px 10px',cursor:'pointer'}}>Показать все</button>}
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
        <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.05)'}}>
          <span style={{fontFamily:'monospace',color:'#c99a2e',fontSize:'12px',minWidth:'20px',marginTop:'4px',flexShrink:0}}>{String.fromCharCode(945+i)}.</span>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'17px',color:'#e8d080',lineHeight:1.5}} dangerouslySetInnerHTML={{__html:greek}}/>
            {rev[i]&&<div style={{fontStyle:'italic',color:'#a0f0a0',fontSize:'14px',marginTop:'5px'}}>{russian}</div>}
          </div>
          <button onClick={()=>setRev(p=>({...p,[i]:!p[i]}))}
            style={{background:'none',border:'1px solid rgba(255,255,255,.14)',color:'rgba(255,255,255,.38)',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',cursor:'pointer',fontFamily:'monospace',whiteSpace:'nowrap',flexShrink:0,transition:'all .2s'}}>
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

  const getStyle = (opt: string): React.CSSProperties => {
    const base: React.CSSProperties = {padding:'10px 16px',borderRadius:'10px',fontSize:'14px',textAlign:'left',width:'100%',marginBottom:'6px',cursor:'pointer',transition:'all .15s',background:'transparent',border:'1px solid rgba(255,255,255,.1)',color:'#9aa8c8'}
    if (!checked) return sel===opt?{...base,borderColor:'#c99a2e',background:'rgba(201,154,46,.1)',color:'#c99a2e'}:base
    if (opt===ex.answer) return {...base,borderColor:'rgba(80,180,80,.5)',background:'rgba(80,180,80,.1)',color:'#80f080',cursor:'default'}
    if (opt===sel)       return {...base,borderColor:'rgba(180,60,60,.4)',background:'rgba(180,60,60,.08)',color:'#f08080',cursor:'default'}
    return {...base,opacity:0.4,cursor:'default'}
  }

  return (
    <div>
      <div style={{marginBottom:'12px'}}>
        {ex.options.map((opt:string,i:number)=>(
          <button key={i} onClick={()=>{if(!checked)setSel(opt)}} style={getStyle(opt)}>
            {checked&&opt===ex.answer&&'✓ '}{opt}
          </button>
        ))}
      </div>
      {!checked?(
        <button onClick={()=>{if(sel)setChecked(true)}} disabled={!sel}
          style={{padding:'7px 18px',borderRadius:'9px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:sel?'pointer':'not-allowed',opacity:sel?1:0.4}}>
          Проверить
        </button>
      ):(
        <div>
          <button onClick={()=>{setSel(null);setChecked(false)}} style={{fontSize:'12px',color:'#4a5a78',background:'none',border:'1px solid #2e3450',borderRadius:'8px',padding:'5px 12px',cursor:'pointer',marginBottom:'10px'}}>↺ Попробовать снова</button>
          {ex.explanation&&<div style={{fontSize:'13px',lineHeight:'1.7',color:'#8898b8',padding:'12px',borderRadius:'10px',background:'rgba(255,255,255,.03)',border:'1px solid #2e3450'}}>💡 {ex.explanation}</div>}
        </div>
      )}
    </div>
  )
}

function MatchExercise({ ex }: { ex: any }) {
  const pairs = ex.pairs ?? []
  const [shuffled] = useState(()=>[...pairs.map((_:any,i:number)=>i)].sort(()=>Math.random()-.5))
  const [sel, setSel] = useState<Record<number,number|null>>({})
  const [checked, setChecked] = useState(false)

  function pick(li: number, ri: number) {
    if (checked) return
    setSel(p=>{
      const updated={...p}
      Object.keys(updated).forEach(k=>{if(updated[Number(k)]===ri)delete updated[Number(k)]})
      updated[li]=ri
      return updated
    })
  }

  const correct = checked && pairs.every((_:any,i:number)=>sel[i]===i)

  return (
    <div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
        <div>
          {pairs.map((p:any,i:number)=>(
            <div key={i} style={{padding:'10px 14px',borderRadius:'10px',border:'1px solid rgba(255,255,255,.09)',background:'rgba(255,255,255,.03)',marginBottom:'6px',fontFamily:"'Playfair Display',Georgia,serif",fontSize:'17px',color:'#e8d080',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              {p.left}
              <span style={{fontSize:'12px',color:'#3a4a6a',marginLeft:'8px'}}>→</span>
            </div>
          ))}
        </div>
        <div>
          {shuffled.map((origIdx:number)=>{
            const p=pairs[origIdx]; const used=Object.values(sel).includes(origIdx)
            return (
              <div key={origIdx} style={{padding:'10px 14px',borderRadius:'10px',border:'1px solid rgba(255,255,255,.09)',background:used?'rgba(201,154,46,.1)':'rgba(255,255,255,.03)',marginBottom:'6px',fontSize:'13px',color:used?'#c99a2e':'#8898b8',display:'flex',gap:'4px',alignItems:'center',flexWrap:'wrap'}}>
                {pairs.map((_:any,li:number)=>(
                  <button key={li} onClick={()=>pick(li,origIdx)}
                    style={{fontSize:'11px',padding:'2px 7px',borderRadius:'5px',border:'1px solid',borderColor:sel[li]===origIdx?'#c99a2e':'rgba(255,255,255,.1)',background:sel[li]===origIdx?'rgba(201,154,46,.2)':'transparent',color:sel[li]===origIdx?'#c99a2e':'#4a5a78',cursor:'pointer'}}>
                    {li+1}
                  </button>
                ))}
                <span style={{marginLeft:'4px'}}>{p.right}</span>
              </div>
            )
          })}
        </div>
      </div>
      {!checked?(
        <button onClick={()=>setChecked(true)} disabled={pairs.some((_:any,i:number)=>sel[i]===undefined||sel[i]===null)}
          style={{padding:'7px 18px',borderRadius:'9px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:'pointer'}}>
          Проверить
        </button>
      ):(
        <div style={{padding:'10px 14px',borderRadius:'10px',background:correct?'rgba(80,180,80,.08)':'rgba(200,140,40,.08)',border:`1px solid ${correct?'rgba(80,180,80,.2)':'rgba(200,140,40,.2)'}`,fontSize:'13px',color:correct?'#80c880':'#c8a860'}}>
          {correct?'✓ Верно!':'Некоторые пары не совпадают.'}
          <button onClick={()=>{setSel({});setChecked(false)}} style={{marginLeft:'12px',fontSize:'11px',color:'#4a5a78',background:'none',border:'1px solid #2e3450',borderRadius:'6px',padding:'3px 10px',cursor:'pointer'}}>Снова</button>
        </div>
      )}
    </div>
  )
}

function TranslateExercise({ ex }: { ex: any }) {
  const [input,setInput]=useState(''); const [show,setShow]=useState(false)
  return (
    <div>
      {ex.greek&&<div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'20px',color:'#e8d080',marginBottom:'10px',lineHeight:1.5}}>{ex.greek}</div>}
      {ex.hint&&!show&&<div style={{fontSize:'11px',color:'rgba(255,255,255,.28)',fontFamily:'monospace',marginBottom:'8px'}}>{ex.hint}</div>}
      <textarea value={input} onChange={e=>setInput(e.target.value)} disabled={show} rows={2} placeholder="Ваш перевод..."
        style={{width:'100%',padding:'10px 14px',borderRadius:'10px',border:'1px solid #2e3450',background:'#0a0d14',color:'#c8d4f0',fontSize:'15px',lineHeight:'1.6',resize:'vertical',outline:'none',marginBottom:'10px',fontFamily:'inherit'}}/>
      <div style={{display:'flex',gap:'10px'}}>
        {!show?(
          <button onClick={()=>setShow(true)} style={{padding:'7px 18px',borderRadius:'10px',fontSize:'13px',fontWeight:600,background:'rgba(201,154,46,.15)',color:'#c99a2e',border:'1px solid rgba(201,154,46,.35)',cursor:'pointer'}}>Показать перевод</button>
        ):(
          <button onClick={()=>{setShow(false);setInput('')}} style={{fontSize:'12px',color:'#4a5a78',background:'none',border:'1px solid #2e3450',borderRadius:'8px',padding:'5px 12px',cursor:'pointer'}}>↺ Снова</button>
        )}
      </div>
      {show&&(
        <div style={{marginTop:'12px',padding:'12px 16px',borderRadius:'12px',background:'rgba(80,180,80,.07)',border:'1px solid rgba(80,180,80,.2)'}}>
          <div style={{fontSize:'11px',color:'#60b060',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',marginBottom:'4px'}}>Перевод</div>
          <div style={{fontSize:'15px',lineHeight:1.7,color:'#b8d8b8'}}>{ex.answer}</div>
          {ex.note&&<div style={{marginTop:'8px',fontSize:'12px',color:'#4a6a4a',fontStyle:'italic'}}>{ex.note}</div>}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ДИСПЕТЧЕР УПРАЖНЕНИЙ
// ─────────────────────────────────────────────────────────────────────────────
function ExerciseBlock({ ex, index }: { ex: any; index: number }) {
  // Strip "Упражнение N (Маунс)" from question
  const question = (ex.question??'')
    .replace(/\s*\(Упражнение\s+\d+,?\s*Маунс\)/gi,'')
    .replace(/📊\s*/,'')
    .replace(/🔤\s*/,'')
    .replace(/📖\s*/,'')
    .trim()

  return (
    <div style={S.exBox}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <div style={{width:'32px',height:'32px',borderRadius:'50%',background:'#c99a2e',color:'#111',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'monospace',fontWeight:700,fontSize:'13px',flexShrink:0}}>{index+1}</div>
        <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'17px',fontWeight:700,color:'white'}}>{question||`Задание ${index+1}`}</div>
      </div>
      {ex.type==='analysis'  && <AnalysisExercise  ex={ex}/>}
      {ex.type==='phrases'   && <PhrasesExercise   ex={ex}/>}
      {ex.type==='choose'    && <ChooseExercise    ex={ex}/>}
      {ex.type==='match'     && <MatchExercise     ex={ex}/>}
      {(ex.type==='translate'||ex.type==='fill') && <TranslateExercise ex={ex}/>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ЧЕКЛИСТ
// ─────────────────────────────────────────────────────────────────────────────
function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())
  return (
    <div style={{background:'rgba(201,154,46,.07)',border:'1px solid rgba(201,154,46,.18)',borderRadius:'10px',padding:'20px 22px',marginTop:'20px'}}>
      <h4 style={{fontFamily:"'Playfair Display',serif",color:'#c99a2e',fontSize:'17px',marginBottom:'12px'}}>Самопроверка</h4>
      {items.map((text,i)=>(
        <div key={i} onClick={()=>setChecked(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n})}
          style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'8px 0',borderBottom:'1px solid rgba(255,255,255,.04)',fontSize:'14px',cursor:'pointer',userSelect:'none'}}>
          <div style={{width:'18px',height:'18px',border:`1.5px solid ${checked.has(i)?'#c99a2e':'rgba(200,150,40,.35)'}`,borderRadius:'4px',flexShrink:0,marginTop:'2px',background:checked.has(i)?'#c99a2e':'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#111',transition:'all .2s'}}>
            {checked.has(i)?'✓':''}
          </div>
          <span style={{color:'#a8b8d8'}}>{text}</span>
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
    <div onClick={()=>setFlip(p=>!p)} style={S.vocabCard}
      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#c99a2e';(e.currentTarget as HTMLElement).style.background='rgba(201,154,46,.06)'}}
      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='#2a3060';(e.currentTarget as HTMLElement).style.background='#0f1220'}}>
      {!flip?<>
        <div style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'22px',fontWeight:700,color:'#8ab8ff',marginBottom:'4px'}}>{w.greek}</div>
        <div style={{fontFamily:'monospace',fontSize:'11px',color:'#4a5a7a',marginBottom:'6px'}}>{w.transliteration}</div>
        <div style={{fontSize:'14px',fontWeight:600,color:'#c8d4f0'}}>{w.translation}</div>
        {w.frequency&&<div style={{fontSize:'11px',color:'#3a4a6a',fontFamily:'monospace',marginTop:'4px'}}>×{w.frequency} в НЗ</div>}
      </>:<>
        <div style={{fontSize:'13px',color:'#8898b8',fontStyle:'italic',marginBottom:'8px',flex:1}}>{w.example??'—'}</div>
        <div style={{fontSize:'11px',color:'#c99a2e',fontFamily:'monospace'}}>← нажмите обратно</div>
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

  return (
    <article style={{minHeight:'100vh'}}>

      {/* ШАПКА */}
      <header style={{background:'#08091a',padding:'56px 24px 44px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-20px',top:'50%',transform:'translateY(-50%)',fontFamily:"'Playfair Display',serif",fontSize:'140px',fontWeight:900,opacity:.05,letterSpacing:'-4px',pointerEvents:'none',whiteSpace:'nowrap',color:'#c8d4f0'}}>ΕΛΛΗΝΙΚΑ</div>
        <div style={{maxWidth:'860px',margin:'0 auto',position:'relative'}}>
          <div style={{fontFamily:'monospace',fontSize:'12px',letterSpacing:'4px',textTransform:'uppercase',color:'#c99a2e',marginBottom:'14px'}}>
            {mod?.title??`Модуль ${lesson.moduleId}`} · Глава {lessonNum}
          </div>
          <h1 style={{fontFamily:"'Playfair Display',Georgia,serif",fontSize:'clamp(32px,5vw,60px)',fontWeight:900,lineHeight:1.05,marginBottom:'14px',color:'white'}}>
            {lesson.title}
          </h1>
          <p style={{fontSize:'17px',color:'rgba(200,210,240,.62)',fontStyle:'italic',maxWidth:'520px',marginBottom:'22px'}}>{lesson.subtitle}</p>
          <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
            {[`⏱ ${lesson.duration??'~40 мин'}`,`📚 ${lesson.vocab?.length??0} слов`,`✍️ ${lesson.exercises?.length??0} заданий`,completed?'✓ Пройден':null].filter(Boolean).map((chip,i)=>(
              <span key={i} style={{background:'rgba(255,255,255,.07)',border:'1px solid rgba(255,255,255,.13)',borderRadius:'30px',padding:'5px 14px',fontSize:'12px',fontFamily:'monospace',color:(chip as string).startsWith('✓')?'#6dbf7a':'rgba(200,210,240,.65)'}}>{chip}</span>
            ))}
          </div>
        </div>
      </header>

      {/* НАВИГАЦИЯ */}
      <nav style={{background:'#08091a',borderTop:'1px solid rgba(255,255,255,.07)',padding:'0 24px',display:'flex',overflowX:'auto'}}>
        <div style={{maxWidth:'860px',margin:'0 auto',display:'flex',width:'100%'}}>
          {[{label:'📖 Урок',k:'lesson'},{label:`📚 Словарь (${lesson.vocab?.length??0})`,k:'vocab'},{label:`✍️ Задания (${lesson.exercises?.length??0})`,k:'exercises'}].map(item=>(
            <button key={item.k} onClick={()=>setTab(item.k as any)}
              style={{padding:'13px 18px',fontSize:'12px',fontFamily:'monospace',whiteSpace:'nowrap',background:'none',cursor:'pointer',transition:'all .2s',
                color:tab===item.k?'#c99a2e':'rgba(255,255,255,.38)',
                borderBottom:`2px solid ${tab===item.k?'#c99a2e':'transparent'}`,
                border:'none',borderBottom:`2px solid ${tab===item.k?'#c99a2e':'transparent'}`}}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* КОНТЕНТ */}
      <div style={{maxWidth:'860px',margin:'0 auto',padding:'52px 24px 80px'}}>

        {/* УРОК */}
        {tab==='lesson'&&(
          <div>
            {(lesson.content??[]).map((s:any,i:number)=>(
              s.type==='divider'
                ? <hr key={i} style={S.divider}/>
                : <div key={i} id={s.id}><RenderSection s={s}/></div>
            ))}
            {lesson.summary?.length>0&&(
              <div style={{marginTop:'40px',padding:'30px 32px',background:'#0d1020',border:'1.5px solid #2a3060',borderRadius:'16px'}}>
                <h3 style={{...S.h3,color:'#c99a2e',marginBottom:'16px'}}>Итоги урока</h3>
                <ol style={{padding:0,listStyle:'none'}}>
                  {lesson.summary.map((item:string,i:number)=>(
                    <li key={i} style={{display:'flex',gap:'14px',padding:'10px 0',borderBottom:'1px solid #1a1e30',fontSize:'15px',color:'#9aa8c8',alignItems:'flex-start'}}>
                      <span style={{color:'#c99a2e',fontFamily:'monospace',fontSize:'13px',fontWeight:700,flexShrink:0,marginTop:'2px'}}>{String(i+1).padStart(2,'0')}</span>
                      <span dangerouslySetInnerHTML={{__html:item}}/>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {!completed&&(
              <div style={{margin:'32px 0',padding:'24px',borderRadius:'16px',background:'#0d1020',border:'1.5px solid #2a3060',textAlign:'center'}}>
                <p style={{fontSize:'15px',color:'#5a6a8a',marginBottom:'14px'}}>Изучили материал? Отметьте урок как пройденный.</p>
                <button onClick={handleComplete} disabled={saving}
                  style={{padding:'11px 36px',borderRadius:'12px',fontSize:'15px',fontWeight:700,background:'#c99a2e',color:'#111',border:'none',cursor:'pointer',opacity:saving?0.5:1,fontFamily:"'Playfair Display',serif"}}>
                  {saving?'Сохраняем...':'✓ Урок пройден'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* СЛОВАРЬ */}
        {tab==='vocab'&&(
          <div>
            <div style={S.eyebrow}><span style={{display:'block',width:'28px',height:'1px',background:'#c99a2e'}}/>Слова урока</div>
            <h2 style={S.h2}>Словарный запас</h2>
            <p style={S.p}>Нажмите на карточку, чтобы увидеть пример. Числа показывают частоту в Новом Завете.</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(162px,1fr))',gap:'12px',marginTop:'20px'}}>
              {(lesson.vocab??[]).map((w:any,i:number)=><VocabCard key={i} w={w}/>)}
            </div>
          </div>
        )}

        {/* ЗАДАНИЯ */}
        {tab==='exercises'&&(
          <div style={{...S.hwSection,background:'transparent',border:'none',padding:'0'}}>
            <div style={{background:'#08091a',borderRadius:'20px',padding:'40px 36px',border:'1.5px solid #1e2440',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',right:'-10px',top:'18px',fontFamily:"'Playfair Display',serif",fontSize:'96px',fontWeight:900,opacity:.04,pointerEvents:'none',color:'#c99a2e',whiteSpace:'nowrap'}}>Άσκηση</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'28px',fontWeight:900,color:'#c99a2e',marginBottom:'6px'}}>Задания</h2>
              <p style={{color:'rgba(200,210,240,.5)',fontStyle:'italic',marginBottom:'28px',fontSize:'15px'}}>Изучите урок, затем выполните упражнения не подглядывая</p>
              {(lesson.exercises??[]).map((ex:any,i:number)=>(
                <ExerciseBlock key={i} ex={ex} index={i}/>
              ))}
              {lesson.checklist&&<Checklist items={lesson.checklist}/>}
            </div>
          </div>
        )}

        {/* ПЕРЕХОД */}
        <nav style={{display:'flex',justifyContent:'space-between',gap:'16px',paddingTop:'32px',borderTop:'1px solid #1e2440',marginTop:'32px'}}>
          {prev?(
            <Link href={`/lesson/${prev.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'14px 20px',borderRadius:'14px',border:'1px solid #1e2440',background:'#0d1020',textDecoration:'none',flex:1,maxWidth:'45%'}}>
              <span style={{fontSize:'11px',fontFamily:'monospace',color:'#3a4a6a',letterSpacing:'1px',textTransform:'uppercase'}}>← Назад</span>
              <span style={{fontSize:'15px',color:'#8898b8',fontFamily:"'Playfair Display',serif"}}>{prev.title}</span>
            </Link>
          ):<div/>}
          {next?(
            <Link href={`/lesson/${next.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'14px 20px',borderRadius:'14px',border:'1px solid #2a3460',background:'#0d1020',textDecoration:'none',flex:1,maxWidth:'45%',textAlign:'right'}}>
              <span style={{fontSize:'11px',fontFamily:'monospace',color:'#c99a2e',letterSpacing:'1px',textTransform:'uppercase'}}>Далее →</span>
              <span style={{fontSize:'15px',color:'#c8d4f0',fontFamily:"'Playfair Display',serif"}}>{next.title}</span>
            </Link>
          ):<div/>}
        </nav>
      </div>
    </article>
  )
}

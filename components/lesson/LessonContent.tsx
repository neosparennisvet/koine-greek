// @ts-nocheck
'use client'
import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'

const C = {
  bg:'var(--lesson-bg)',ink:'var(--lesson-ink)',accent:'var(--lesson-accent)',
  gold:'var(--lesson-gold)',blue:'var(--lesson-blue)',green:'var(--lesson-green)',
  soft:'var(--lesson-soft)',border:'var(--lesson-border)',card:'var(--lesson-card)',
  text:'var(--lesson-text)',muted:'var(--lesson-muted)',
}

function md(t){
  if(!t)return''
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\*(.+?)\*/g,'<em>$1</em>')
    .replace(/`(.+?)`/g,'<code style="font-family:var(--font-jetbrains),monospace;font-size:.85em;background:rgba(0,0,0,.07);padding:1px 5px;border-radius:3px">$1</code>')
    .replace(/\n/g,'<br/>')
}

function SL({text}){
  return <div style={{display:'inline-flex',alignItems:'center',gap:'10px',
    fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px',letterSpacing:'3px',
    textTransform:'uppercase',color:C.accent,marginBottom:'10px'}}>
    <span style={{display:'block',width:'28px',height:'1px',background:C.accent}}/>
    {text}
  </div>
}

function MedMap(){
  return <div style={{borderRadius:'12px',overflow:'hidden',border:`1.5px solid ${C.border}`,margin:'20px 0',background:'#0d1e3a'}}>
    <svg viewBox="0 0 800 360" style={{width:'100%',display:'block'}}>
      <defs><radialGradient id="sg" cx="50%" cy="60%" r="65%"><stop offset="0%" stopColor="#1a3d6e"/><stop offset="100%" stopColor="#0b1e3a"/></radialGradient></defs>
      <rect width="800" height="360" fill="url(#sg)"/>
      <path d="M200 60 L230 55 L250 70 L260 110 L255 145 L248 170 L242 195 L250 220 L245 245 L235 260 L225 265 L220 255 L230 235 L225 210 L215 185 L205 160 L198 130 L192 100 L190 75 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
      <path d="M340 45 L390 38 L430 45 L455 60 L460 90 L450 120 L440 145 L445 165 L435 185 L420 195 L410 185 L415 165 L405 145 L398 120 L385 100 L370 90 L355 80 L342 65 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
      <text x="403" y="118" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">ГРЕЦИЯ</text>
      <path d="M520 100 L600 90 L660 100 L700 130 L710 170 L680 200 L620 210 L565 195 L540 165 L530 135 Z" fill="#2a5c3a" stroke="#3a7a4a" strokeWidth="0.8"/>
      <text x="618" y="155" fill="#6dbf7a" fontSize="10" textAnchor="middle" fontFamily="Georgia" fontWeight="bold">М.АЗИЯ</text>
      <path d="M550 250 L650 240 L700 250 L720 280 L700 308 L620 318 L560 303 L545 278 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
      <text x="625" y="285" fill="#f0d090" fontSize="9" textAnchor="middle" fontFamily="Georgia">ЕГИПЕТ</text>
      <path d="M350 278 L500 263 L540 278 L545 308 L500 328 L400 333 L355 313 Z" fill="#c8a060" stroke="#a08040" strokeWidth="0.7"/>
      <text x="447" y="306" fill="#f0d090" fontSize="8" textAnchor="middle" fontFamily="Georgia">ИЗРАИЛЬ/СИРИЯ</text>
      {[{x:220,y:230,n:'РИМ'},{x:408,y:168,n:'АФИНЫ'},{x:490,y:172,n:'ЭФЕС'},{x:474,y:294,n:'АНТИОХИЯ'},{x:448,y:318,n:'ИЕРУСАЛИМ'},{x:558,y:282,n:'АЛЕКСАНДРИЯ'}].map(c=>(
        <g key={c.n}><circle cx={c.x} cy={c.y} r="5" fill="#c8922a" opacity="0.9"/>
        <text x={c.x} y={c.y-9} fill="#f0d898" fontSize="7.5" textAnchor="middle" fontFamily="Georgia">{c.n}</text></g>
      ))}
    </svg>
  </div>
}

function AlphaChart(){
  const rows=[['Α α','альфа','[а]'],['Β β','бета','[б]'],['Γ γ','гамма','[г]'],['Δ δ','дельта','[д]'],['Ε ε','эпсилон','[э] кр.'],['Ζ ζ','дзета','[дз]'],['Η η','эта','[э] дл.'],['Θ θ','тета','[th]'],['Ι ι','йота','[и]'],['Κ κ','каппа','[к]'],['Λ λ','лямбда','[л]'],['Μ μ','мю','[м]'],['Ν ν','ню','[н]'],['Ξ ξ','кси','[кс]'],['Ο ο','омикрон','[о] кр.'],['Π π','пи','[п]'],['Ρ ρ','ро','[р]'],['Σ σ/ς','сигма','[с]'],['Τ τ','тау','[т]'],['Υ υ','ипсилон','[ю]'],['Φ φ','фи','[ph]'],['Χ χ','хи','[ch]'],['Ψ ψ','пси','[пс]'],['Ω ω','омега','[о] дл.']]
  return <div style={{overflowX:'auto',margin:'20px 0',borderRadius:'12px',border:`1.5px solid ${C.border}`}}>
    <table style={{width:'100%',borderCollapse:'collapse',background:C.card,fontSize:'14px',minWidth:'320px'}}>
      <thead><tr style={{background:C.ink}}>{['Буква','Название','Звук'].map(h=><th key={h} style={{padding:'11px 14px',textAlign:'left',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1.5px',textTransform:'uppercase',color:C.gold}}>{h}</th>)}</tr></thead>
      <tbody>{rows.map(([l,n,s],i)=><tr key={i} style={{background:i%2===0?C.card:C.soft,borderBottom:`1px solid ${C.border}`}}>
        <td style={{padding:'9px 14px',fontFamily:'var(--font-playfair),serif',fontSize:'20px',color:C.blue,fontWeight:700}}>{l}</td>
        <td style={{padding:'9px 14px',color:C.text,fontSize:'13px'}}>{n}</td>
        <td style={{padding:'9px 14px',fontFamily:'var(--font-jetbrains),monospace',fontSize:'12px',color:C.green}}>{s}</td>
      </tr>)}</tbody>
    </table>
  </div>
}

function TimeLine(){
  const items=[{y:'~330 до н.э.',t:'Александр Великий',d:'κοινή становится общим языком Средиземноморья'},{y:'~200 до н.э.',t:'Септуагинта (LXX)',d:'Перевод Ветхого Завета на греческий'},{y:'~5 до н.э.',t:'Рождение Иисуса',d:'Вся Палестина говорит по-гречески'},{y:'50–65 н.э.',t:'Послания Павла',d:'Первые тексты Нового Завета на κοινή'},{y:'65–95 н.э.',t:'Евангелия',d:'Весь Новый Завет написан по-гречески'}]
  return <div style={{margin:'24px 0'}}>
    {items.map((e,i)=><div key={i} style={{display:'flex',gap:'16px',paddingBottom:'22px'}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:'14px',flexShrink:0}}>
        <div style={{width:'14px',height:'14px',borderRadius:'50%',background:C.gold,flexShrink:0,marginTop:'3px'}}/>
        {i<items.length-1&&<div style={{width:'2px',flex:1,background:C.border,marginTop:'4px'}}/>}
      </div>
      <div>
        <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',color:C.gold,letterSpacing:'1px',marginBottom:'2px'}}>{e.y}</div>
        <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'16px',fontWeight:700,color:C.blue,marginBottom:'3px'}}>{e.t}</div>
        <div style={{fontSize:'14px',color:C.muted,lineHeight:1.6}}>{e.d}</div>
      </div>
    </div>)}
  </div>
}

/* ═══ Section anchor ID helper ═══ */
function sectionAnchor(title, idx) {
  if (!title) return `section-${idx}`
  return 'sec-' + title.toLowerCase()
    .replace(/[^a-zа-яё0-9\s]/gi, '')
    .replace(/\s+/g, '-')
    .substring(0, 40)
}

function Sec({s, anchorId}){
  if(!s)return null
  if(s.type==='illustration'){
    if(s.illustration==='mediterranean-map'||s.illustration==='map')return<MedMap/>
    if(s.illustration==='timeline')return<TimeLine/>
    if(s.illustration==='alphabet-chart')return<AlphaChart/>
    return null
  }
  if(s.type==='intro')return(
    <div id={anchorId} style={{background:C.ink,color:'#f7f2e8',borderRadius:'16px',padding:'clamp(24px,4vw,34px) clamp(20px,4vw,38px)',marginBottom:'36px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'18px',bottom:'-14px',fontFamily:'var(--font-playfair),serif',fontSize:'90px',fontWeight:900,opacity:.07,pointerEvents:'none',color:C.gold,lineHeight:1,userSelect:'none'}}>γενική</div>
      {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'20px',fontWeight:700,color:C.gold,marginBottom:'12px'}}>{s.title}</h3>}
      <div style={{opacity:.9,lineHeight:1.8,fontSize:'16px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )
  if(s.type==='theory')return(
    <div id={anchorId} style={{marginBottom:'32px'}}>
      {s.title&&<><SL text="Теория"/><h2 style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(22px,3.5vw,34px)',fontWeight:900,lineHeight:1.15,marginBottom:'16px',color:C.text}}>{s.title}</h2></>}
      <div style={{fontSize:'17px',lineHeight:1.78,color:C.text}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )
  if(s.type==='table'){
    const data=s.data??[]
    if(!data.length)return null
    const cols=Object.keys(data[0])
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{overflowX:'auto',borderRadius:'12px',border:`1.5px solid ${C.border}`}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'15px',background:C.card,minWidth:'440px'}}>
            <thead><tr style={{background:C.ink}}>{cols.map((h,i)=><th key={i} style={{padding:'12px 14px',textAlign:i===0?'left':'center',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',color:C.gold,fontWeight:600}}>{h}</th>)}</tr></thead>
            <tbody>{data.map((row,ri)=><tr key={ri} style={{background:ri%2===0?C.card:C.soft,borderBottom:`1px solid ${C.border}`}}>
              {cols.map((col,ci)=><td key={ci} style={{padding:'11px 14px',textAlign:ci===0?'left':'center',verticalAlign:'middle'}}>
                <span style={{fontFamily:ci>0?'var(--font-playfair),serif':'inherit',fontSize:ci>0?'18px':'14px',color:C.text}} dangerouslySetInnerHTML={{__html:md(String(row[col]??''))}}/>
              </td>)}
            </tr>)}</tbody>
          </table>
        </div>
      </div>
    )
  }
  if(s.type==='verse')return(
    <div id={anchorId} style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'20px 24px',margin:'18px 0'}}>
      {s.title&&<div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px',color:C.accent,letterSpacing:'0.5px',borderBottom:`1px solid ${C.border}`,paddingBottom:'8px',marginBottom:'12px'}}>{s.title}</div>}
      <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(17px,2.5vw,22px)',lineHeight:1.5,color:C.blue}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )
  if(s.type==='highlight')return(
    <div id={anchorId} style={{borderLeft:`4px solid ${C.gold}`,background:'#fdf8ec',borderRadius:'0 10px 10px 0',padding:'16px 20px',margin:'20px 0',fontStyle:'italic',color:'#4a3f2f'}}>
      {s.title&&<strong style={{fontStyle:'normal',color:C.accent,display:'block',marginBottom:'6px'}}>{s.title}</strong>}
      <span dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )
  if(s.type==='tip')return(
    <div id={anchorId} style={{background:'#e8f5e4',border:'1.5px solid #a3d49a',borderRadius:'10px',padding:'14px 18px',margin:'16px 0',fontSize:'15px',color:'#1a2e18'}}>
      <strong>💡 {s.title?s.title+': ':''}</strong>
      <span dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )
  if(s.type==='warning')return(
    <div id={anchorId} style={{background:'#fdeae0',border:'1.5px solid #e8a882',borderRadius:'10px',padding:'14px 18px',margin:'16px 0',fontSize:'15px',color:'#2e1208'}}>
      <strong>{s.title??'⚠️ Внимание'}:</strong>
      {s.content&&<span style={{marginLeft:'4px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
    </div>
  )
  if(s.type==='example')return(
    <div id={anchorId} style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:'12px',padding:'20px 24px',margin:'14px 0'}}>
      {s.title&&<div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',color:C.muted,letterSpacing:'1px',textTransform:'uppercase',marginBottom:'8px'}}>{s.title}</div>}
      <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'22px',lineHeight:1.4,color:C.blue}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )

  /* ── ANATOMY — word split: stem + coloured ending ── */
  if(s.type==='anatomy'){
    const words = s.words ?? []
    // nom = teal (visible on both light/dark), acc = red, gen = violet, dat = green
    const caseColor = (c) => c==='nom'?'#0ea5a0':c==='acc'?'#c0392b':c==='gen'?'#7c4dff':c==='dat'?'#2e7d32':'#c8922a'
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'16px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:'16px'}}>
          {words.map((w,i)=>{
            const ec = caseColor(w.case)
            return(
              <div key={i} style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:'14px',padding:'20px 16px 16px',textAlign:'center',display:'flex',flexDirection:'column',gap:'12px',minWidth:0}}>
                {/* label */}
                <div style={{fontSize:'10px',color:C.muted,fontFamily:'var(--font-jetbrains),monospace',letterSpacing:'1px',textTransform:'uppercase',lineHeight:1.5}}>{w.label}</div>
                {/* word display */}
                <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(24px,4vw,40px)',fontWeight:900,letterSpacing:'1px',display:'flex',justifyContent:'center',flexWrap:'wrap',lineHeight:1.2,padding:'4px 0',wordBreak:'break-word',overflow:'hidden'}}>
                  <span style={{color:C.blue}}>{w.stem}</span>
                  <span style={{color:ec,fontWeight:900}}>{w.ending}</span>
                </div>
                {/* divider */}
                <div style={{height:'1px',background:C.border,margin:'0 8px'}}/>
                {/* legend */}
                <div style={{display:'flex',flexDirection:'column',gap:'5px',alignItems:'flex-start',padding:'0 4px'}}>
                  <span style={{display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'12px',color:C.text}}>
                    <span style={{width:'10px',height:'10px',borderRadius:'50%',background:C.blue,flexShrink:0,display:'inline-block'}}/>
                    <span>{w.stemMeaning}</span>
                  </span>
                  <span style={{display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'12px',color:C.text}}>
                    <span style={{width:'10px',height:'10px',borderRadius:'50%',background:ec,flexShrink:0,display:'inline-block'}}/>
                    <span>{w.endingMeaning}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* ── PARADIGM — full paradigm table with case-coloured rows ── */
  if(s.type==='paradigm'){
    const CASE_COLORS = {
      nom: {bg:'rgba(14,165,160,0.08)',border:'#0ea5a0',label:'#0ea5a0'},
      acc: {bg:'rgba(192,57,43,0.08)',border:'#c0392b',label:'#c0392b'},
      gen: {bg:'rgba(124,77,255,0.08)',border:'#7c4dff',label:'#7c4dff'},
      dat: {bg:'rgba(46,125,50,0.08)',border:'#2e7d32',label:'#2e7d32'},
    }
    const rows = s.rows ?? []
    const cols = s.cols ?? []
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{overflowX:'auto',borderRadius:'12px',border:`1.5px solid ${C.border}`,marginBottom:'8px'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'15px',background:C.card,minWidth:'400px'}}>
            <thead>
              <tr style={{background:C.ink}}>
                <th style={{padding:'12px 14px',textAlign:'left',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',color:C.muted,fontWeight:600,minWidth:'130px'}}>ПАДЕЖ</th>
                {cols.map((col,i)=>(
                  <th key={i} style={{padding:'12px 14px',textAlign:'center',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',color:col.color??C.gold,fontWeight:600}}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row,ri)=>{
                const cc = CASE_COLORS[row.case] ?? {bg:'transparent',border:'transparent',label:C.muted}
                return(
                  <tr key={ri} style={{background:cc.bg,borderBottom:`1px solid ${C.border}`}}>
                    <td style={{padding:'11px 14px',borderLeft:`3px solid ${cc.border}`,verticalAlign:'middle'}}>
                      <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:cc.label}}>{row.label}</div>
                      {row.sub&&<div style={{fontSize:'10px',color:C.muted,marginTop:'1px'}}>{row.sub}</div>}
                    </td>
                    {row.cells.map((cell,ci)=>{
                      // Parse stem|ending format
                      const parts = String(cell).split('|')
                      const hasSplit = parts.length===2
                      const endingColor = cc.label
                      return(
                        <td key={ci} style={{padding:'11px 14px',textAlign:'center',verticalAlign:'middle'}}>
                          {hasSplit?(
                            <span style={{fontFamily:'var(--font-playfair),serif',fontSize:'20px',fontWeight:700}}>
                              <span style={{color:C.blue}}>{parts[0]}</span>
                              <span style={{color:endingColor,fontWeight:900}}>{parts[1]}</span>
                            </span>
                          ):(
                            <span style={{fontFamily:'var(--font-playfair),serif',fontSize:'20px',color:C.text}} dangerouslySetInnerHTML={{__html:md(String(cell??'—'))}}/>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {s.hint&&<div style={{fontSize:'13px',color:C.muted,padding:'8px 12px',background:C.soft,borderRadius:'8px',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:'💡 '+md(s.hint)}}/>}
      </div>
    )
  }

  /* ── ARTICLE GRID — visual article table with coloured genders ── */
  if(s.type==='articlegrid'){
    const rows2 = s.rows ?? []
    const genderColors = {masc:C.blue, fem:'#9b2c8a', neut:'#2e7d32'}
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'12px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{display:'grid',gridTemplateColumns:'auto 1fr 1fr 1fr',gap:'2px',background:C.border,borderRadius:'12px',overflow:'hidden',border:`1.5px solid ${C.border}`,marginBottom:'10px'}}>
          {/* header row */}
          <div style={{background:C.ink,padding:'11px 12px',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',color:C.muted}}/>
          {[{label:'МУЖ. РОД',color:genderColors.masc},{label:'ЖЕН. РОД',color:genderColors.fem},{label:'СРЕД. РОД',color:genderColors.neut}].map((g,i)=>(
            <div key={i} style={{background:C.ink,padding:'11px 10px',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1.5px',textAlign:'center',color:g.color,fontWeight:700}}>{g.label}</div>
          ))}
          {rows2.map((row,ri)=>([
            <div key={`l${ri}`} style={{background:C.soft,padding:'10px 12px',fontSize:'11px',fontFamily:'var(--font-jetbrains),monospace',color:C.muted,display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'4px',borderBottom:`1px solid ${C.border}`}}>
              {row.label}
            </div>,
            ...(['masc','fem','neut'] as const).map((g,gi)=>(
              <div key={`c${ri}${gi}`} style={{background:C.card,padding:'13px 8px',textAlign:'center',fontFamily:'var(--font-playfair),serif',fontSize:'24px',fontWeight:700,color:genderColors[g],borderBottom:`1px solid ${C.border}`,transition:'background .15s',cursor:'default'}}
                onMouseEnter={e=>e.currentTarget.style.background=C.soft}
                onMouseLeave={e=>e.currentTarget.style.background=C.card}>
                {row[g]}
              </div>
            ))
          ]))}
        </div>
        {s.hint&&<div style={{fontSize:'13px',color:C.muted,padding:'8px 12px',background:C.soft,borderRadius:'8px',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:'💡 '+md(s.hint)}}/>}
      </div>
    )
  }

  /* ── POSITIONS — adjective position visualizer (attributive/predicative/substantive) ── */
  if(s.type==='positions'){
    const items = s.items ?? []
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'16px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
          {items.map((item,i)=>(
            <div key={i} style={{background:C.card,border:`1.5px solid ${C.border}`,borderRadius:'14px',padding:'18px 20px',display:'flex',flexDirection:'column',gap:'10px'}}>
              {/* position label */}
              <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted}}>{item.label}</div>
              {/* Greek phrase — each token coloured */}
              <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(22px,3vw,32px)',fontWeight:900,lineHeight:1.3,display:'flex',flexWrap:'wrap',gap:'6px',alignItems:'baseline'}}>
                {(item.tokens??[]).map((tok,ti)=>(
                  <span key={ti} style={{color:tok.color??C.text,whiteSpace:'nowrap'}}>{tok.text}</span>
                ))}
              </div>
              {/* divider */}
              <div style={{height:'1px',background:C.border}}/>
              {/* legend dots */}
              <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
                {(item.legend??[]).map((leg,li)=>(
                  <span key={li} style={{display:'inline-flex',alignItems:'center',gap:'7px',fontSize:'12px',color:C.text}}>
                    <span style={{width:'9px',height:'9px',borderRadius:'50%',background:leg.color,flexShrink:0,display:'inline-block'}}/>
                    <span>{leg.text}</span>
                  </span>
                ))}
              </div>
              {/* translation */}
              {item.translation&&<div style={{fontSize:'13px',color:C.muted,fontStyle:'italic',borderTop:`1px solid ${C.border}`,paddingTop:'8px'}}>{item.translation}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  /* ── PREPTABLE — preposition table (no case-row coloring, plain text cells) ── */
  if(s.type==='preptable'){
    const cols = s.cols ?? []
    const rows = s.rows ?? []
    // accent color per column index
    const colColors = ['#2a7fd4','#0ea5a0','#7c4dff','#c0392b','#c8922a']
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'8px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <div style={{overflowX:'auto',borderRadius:'12px',border:`1.5px solid ${C.border}`,marginBottom:'8px'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:'15px',background:C.card,minWidth:'400px'}}>
            <thead>
              <tr style={{background:C.ink}}>
                {cols.map((col,i)=>(
                  <th key={i} style={{padding:'12px 14px',textAlign:i===0?'left':'center',fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',color:col.color??colColors[i]??C.gold,fontWeight:600,minWidth:i===0?'90px':'auto'}}>{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row,ri)=>{
                const rowBg = ri%2===0?C.card:C.soft
                return(
                  <tr key={ri} style={{background:rowBg,borderBottom:`1px solid ${C.border}`,borderLeft:`3px solid ${row.color??'transparent'}`}}>
                    {row.cells.map((cell,ci)=>{
                      const isFirst = ci===0
                      const cellColor = isFirst?(row.color??colColors[0]):C.text
                      return(
                        <td key={ci} style={{padding:'12px 14px',textAlign:isFirst?'left':'center',verticalAlign:'middle'}}>
                          {isFirst?(
                            <span style={{fontFamily:'var(--font-playfair),serif',fontSize:'22px',fontWeight:900,color:cellColor,letterSpacing:'1px'}}>{cell}</span>
                          ):(
                            <span style={{fontSize:'14px',color:cellColor,lineHeight:1.5}} dangerouslySetInnerHTML={{__html:md(String(cell??'—'))}}/>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {s.hint&&<div style={{fontSize:'13px',color:C.muted,padding:'8px 12px',background:C.soft,borderRadius:'8px',lineHeight:1.6}} dangerouslySetInnerHTML={{__html:'💡 '+md(s.hint)}}/>}
      </div>
    )
  }

  /* ── EXEGESIS — dark theological insight card ── */
  if(s.type==='exegesis')return(
    <div id={anchorId} style={{background:C.blue,color:'white',borderRadius:'16px',padding:'clamp(28px,4vw,40px) clamp(20px,4vw,40px)',margin:'32px 0',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'14px',bottom:'-16px',fontFamily:'var(--font-playfair),serif',fontSize:'100px',fontWeight:900,opacity:.07,pointerEvents:'none',color:'white',userSelect:'none'}}>{s.watermark??'θεός'}</div>
      <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'2px',textTransform:'uppercase',color:C.gold,marginBottom:'10px'}}>📖 {s.label??'Прикосновение к экзегетике'}</div>
      {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'21px',fontWeight:700,color:C.gold,marginBottom:'14px'}}>{s.title}</h3>}
      <div style={{opacity:.9,fontSize:'15px',lineHeight:1.75}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>
    </div>
  )

  /* ── CASEGRID — visual case overview cards ── */
  if(s.type==='casegrid'){
    const cases = s.cases ?? []
    const caseStyles = {
      nom:{bg:'rgba(42,127,212,0.1)',border:'rgba(42,127,212,0.35)',color:'#2a7fd4',accent:'#1565c0'},
      acc:{bg:'rgba(192,57,43,0.1)',border:'rgba(192,57,43,0.35)',color:'#c0392b',accent:'#b71c1c'},
      gen:{bg:'rgba(124,77,255,0.1)',border:'rgba(124,77,255,0.35)',color:'#7c4dff',accent:'#6200ea'},
      dat:{bg:'rgba(46,125,50,0.1)',border:'rgba(46,125,50,0.35)',color:'#2e7d32',accent:'#1b5e20'},
    }
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<><SL text="Обзор"/><h2 style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(22px,3.5vw,34px)',fontWeight:900,lineHeight:1.15,marginBottom:'16px',color:C.text}}>{s.title}</h2></>}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))',gap:'14px',marginBottom:'16px'}}>
          {cases.map((c,i)=>{
            const cs = caseStyles[c.id] ?? caseStyles.nom
            return(
              <div key={i} style={{background:cs.bg,border:`1.5px solid ${cs.border}`,borderRadius:'12px',padding:'18px 20px',position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',right:'-4px',top:'-8px',fontFamily:'var(--font-playfair),serif',fontSize:'52px',opacity:.06,pointerEvents:'none',color:cs.color,lineHeight:1}}>{c.greek}</div>
                <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:cs.color,marginBottom:'4px'}}>{c.name}</div>
                <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'16px',fontWeight:700,color:C.text,marginBottom:'6px'}}>{c.question}</div>
                <div style={{fontSize:'14px',color:C.muted,lineHeight:1.5,marginBottom:'8px'}}>{c.desc}</div>
                <div style={{display:'flex',gap:'6px',flexWrap:'wrap'}}>
                  {(c.endings??[]).map((e,j)=>(
                    <span key={j} style={{display:'inline-block',padding:'2px 10px',borderRadius:'20px',fontSize:'14px',fontFamily:'var(--font-playfair),serif',fontWeight:700,background:'rgba(0,0,0,0.06)',color:cs.color,border:`1px solid ${cs.border}`}}>{e}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  /* ── RULES — numbered rules list ── */
  if(s.type==='rules'){
    const items = s.items ?? []
    return(
      <div id={anchorId} style={{marginBottom:'28px'}}>
        {s.title&&<h3 style={{fontFamily:'var(--font-playfair),serif',fontSize:'19px',fontWeight:700,color:C.blue,marginBottom:'12px'}}>{s.title}</h3>}
        {s.content&&<p style={{color:C.muted,fontSize:'15px',marginBottom:'14px'}} dangerouslySetInnerHTML={{__html:md(s.content)}}/>}
        <ul style={{listStyle:'none',padding:0,margin:0}}>
          {items.map((item,i)=>(
            <li key={i} style={{display:'flex',gap:'14px',padding:'14px 18px',borderRadius:'10px',marginBottom:'10px',background:C.card,border:`1.5px solid ${C.border}`,fontSize:'15px',alignItems:'flex-start'}}>
              <span style={{flexShrink:0,width:'30px',height:'30px',background:C.ink,color:C.gold,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-jetbrains),monospace',fontSize:'13px',fontWeight:700,marginTop:'1px'}}>{i+1}</span>
              <span style={{color:C.text,lineHeight:1.65}} dangerouslySetInnerHTML={{__html:md(item)}}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return null
}

function AnalysisEx({ex}){
  const words=ex.words??[],answers=ex.answers??[]
  const [rev,setRev]=useState({})
  const headers=ex.headers??['#','Форма','Падеж','Число','Род','Лекс. форма','Значение']
  return <div>
    <p style={{fontSize:'13px',color:'rgba(255,255,255,.4)',fontStyle:'italic',marginBottom:'12px',fontFamily:'var(--font-jetbrains),monospace'}}>Нажмите на строку чтобы открыть ответ</p>
    <div style={{overflowX:'auto'}}>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'13px',minWidth:'520px'}}>
        <thead><tr>{headers.map((h,i)=><th key={i} style={{padding:'9px 10px',background:'rgba(255,255,255,.1)',color:C.gold,fontFamily:'var(--font-jetbrains),monospace',fontSize:'10px',letterSpacing:'1px',textAlign:i>1?'center':'left',borderBottom:'1px solid rgba(255,255,255,.1)'}}>{h}</th>)}</tr></thead>
        <tbody>{words.map((word,i)=>{
          const a=answers[i]??{},isR=rev[i]
          return <tr key={i} onClick={()=>setRev(p=>({...p,[i]:!p[i]}))} style={{cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,.06)',background:isR?'rgba(200,146,42,.08)':i%2===0?'transparent':'rgba(255,255,255,.02)',transition:'background .15s'}}>
            <td style={{padding:'8px 10px',fontFamily:'var(--font-jetbrains),monospace',color:C.gold,fontSize:'11px'}}>{i+1}</td>
            <td style={{padding:'8px 10px',fontFamily:'var(--font-playfair),serif',fontSize:'20px',color:'#f0d898'}}>{word}</td>
            {isR?<>
              <td style={{padding:'8px 10px',textAlign:'center'}}><span style={{display:'inline-block',background:'#e4f5e4',color:'#2d5a27',fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px',fontWeight:700,padding:'2px 9px',borderRadius:'12px'}}>{a.case||'—'}</span></td>
              <td style={{padding:'8px 10px',textAlign:'center',color:'rgba(255,255,255,.6)',fontSize:'12px'}}>{a.number||'—'}</td>
              <td style={{padding:'8px 10px',textAlign:'center',color:'rgba(255,255,255,.6)',fontSize:'12px'}}>{a.gender||'—'}</td>
              <td style={{padding:'8px 10px',textAlign:'center',fontFamily:'var(--font-playfair),serif',fontSize:'18px',color:'#f0d898'}}>{a.lexical||'—'}</td>
              <td style={{padding:'8px 10px',textAlign:'center',color:'#a0ffb0',fontSize:'12px',fontStyle:'italic'}}>{a.meaning||'—'}</td>
            </>:[0,1,2,3,4].map(j=><td key={j} style={{padding:'8px 10px',textAlign:'center'}}><span style={{display:'inline-block',background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.14)',borderRadius:'6px',padding:'4px 9px',minWidth:'52px'}}><span style={{color:'rgba(255,255,255,.2)',fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px'}}>···</span></span></td>)}
          </tr>
        })}</tbody>
      </table>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
      <span style={{fontSize:'11px',color:'rgba(255,255,255,.3)',fontFamily:'var(--font-jetbrains),monospace'}}>{Object.values(rev).filter(Boolean).length}/{words.length} открыто</span>
      <button onClick={()=>{const m={};words.forEach((_,i)=>{m[i]=true});setRev(m)}} style={{fontSize:'11px',color:'rgba(255,255,255,.4)',background:'none',border:'1px solid rgba(255,255,255,.2)',borderRadius:'6px',padding:'4px 12px',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace'}}>Показать все</button>
    </div>
  </div>
}

function PhrasesEx({ex}){
  const pairs=ex.pairs??[]
  const [rev,setRev]=useState({})
  return <div>{pairs.map(({greek,russian,hint},i)=>(
    <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'12px 0',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
      <span style={{fontFamily:'var(--font-jetbrains),monospace',color:C.gold,fontSize:'13px',minWidth:'22px',marginTop:'3px',flexShrink:0}}>{i+1}.</span>
      <div style={{flex:1}}>
        <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'18px',color:'#f0e8c8',lineHeight:1.5}} dangerouslySetInnerHTML={{__html:greek}}/>
        {hint&&<div style={{fontSize:'11px',color:'rgba(255,255,255,.3)',fontFamily:'var(--font-jetbrains),monospace',marginTop:'2px'}}>{hint}</div>}
        {rev[i]&&<div style={{fontStyle:'italic',color:'#a0ffb0',fontSize:'14px',marginTop:'6px',lineHeight:1.5}}>{russian}</div>}
      </div>
      <button onClick={()=>setRev(p=>({...p,[i]:!p[i]}))} style={{background:'none',border:`1px solid ${rev[i]?'rgba(160,255,176,.4)':'rgba(255,255,255,.2)'}`,color:rev[i]?'#a0ffb0':'rgba(255,255,255,.4)',borderRadius:'6px',padding:'4px 10px',fontSize:'11px',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace',whiteSpace:'nowrap',flexShrink:0,transition:'all .15s'}}>
        {rev[i]?'скрыть':'ответ'}
      </button>
    </div>
  ))}</div>
}

function ChooseEx({ex}){
  const [sel,setSel]=useState(null),[checked,setChecked]=useState(false)
  const base={display:'block',width:'100%',textAlign:'left',padding:'10px 15px',borderRadius:'10px',marginBottom:'7px',cursor:'pointer',fontSize:'14px',transition:'all .15s',border:'1px solid',background:'rgba(255,255,255,.04)',color:'rgba(255,255,255,.75)',borderColor:'rgba(255,255,255,.12)',fontFamily:'inherit'}
  return <div>
    <div style={{marginBottom:'14px'}}>{(ex.options??[]).map((opt,i)=>{
      let s={...base}
      if(!checked){if(sel===opt)s={...s,borderColor:C.gold,background:'rgba(200,146,42,.1)',color:C.gold}}
      else if(opt===ex.answer)s={...s,borderColor:'rgba(100,200,100,.4)',background:'rgba(100,200,100,.08)',color:'#a0ffb0',cursor:'default'}
      else if(opt===sel)s={...s,borderColor:'rgba(200,80,80,.4)',background:'rgba(200,80,80,.08)',color:'#ff9898',cursor:'default'}
      else s={...s,opacity:.35,cursor:'default'}
      return <button key={i} onClick={()=>{if(!checked)setSel(opt)}} style={s}>{checked&&opt===ex.answer?'✓ ':''}{opt}</button>
    })}</div>
    {!checked?<button onClick={()=>{if(sel)setChecked(true)}} disabled={!sel} style={{padding:'7px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:600,background:'rgba(200,146,42,.2)',color:C.gold,border:`1px solid rgba(200,146,42,.4)`,cursor:sel?'pointer':'not-allowed',opacity:sel?1:.45,fontFamily:'inherit'}}>Проверить</button>:<div>
      <button onClick={()=>{setSel(null);setChecked(false)}} style={{fontSize:'11px',color:'rgba(255,255,255,.35)',background:'none',border:'1px solid rgba(255,255,255,.15)',borderRadius:'6px',padding:'4px 12px',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace',marginBottom:'10px'}}>↺ Снова</button>
      {ex.explanation&&<div style={{fontSize:'14px',lineHeight:1.7,color:'rgba(255,255,255,.65)',padding:'12px 16px',borderRadius:'10px',background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)'}}>💡 {ex.explanation}</div>}
    </div>}
  </div>
}

function MatchEx({ex}){
  const pairs=ex.pairs??[]
  const [shuffled]=useState(()=>[...pairs.map((_,i)=>i)].sort(()=>Math.random()-.5))
  const [sel,setSel]=useState({}),[checked,setChecked]=useState(false)
  function pick(li,ri){if(checked)return;setSel(p=>{const u={...p};Object.keys(u).forEach(k=>{if(u[Number(k)]===ri)delete u[Number(k)]});u[li]=ri;return u})}
  const allDone=pairs.every((_,i)=>sel[i]!=null)
  const correct=checked&&pairs.every((_,i)=>sel[i]===i)
  return <div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'14px'}}>
      <div>{pairs.map((p,i)=><div key={i} style={{padding:'10px 14px',borderRadius:'10px',border:'1px solid rgba(255,255,255,.1)',background:'rgba(255,255,255,.04)',marginBottom:'6px',fontFamily:'var(--font-playfair),serif',fontSize:'17px',color:'#f0e8c8',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        {p.left}<span style={{fontSize:'11px',color:C.gold,fontFamily:'var(--font-jetbrains),monospace',flexShrink:0,marginLeft:'6px'}}>{sel[i]!=null?`→${sel[i]+1}`:'?'}</span>
      </div>)}</div>
      <div>{shuffled.map(origIdx=><div key={origIdx} style={{marginBottom:'6px'}}>
        <div style={{padding:'8px 10px',borderRadius:'8px 8px 0 0',border:'1px solid rgba(255,255,255,.1)',borderBottom:'none',background:'rgba(255,255,255,.04)',fontSize:'13px',color:'rgba(255,255,255,.65)'}}>{pairs[origIdx].right}</div>
        <div style={{display:'flex',gap:'4px',padding:'5px 8px',border:'1px solid rgba(255,255,255,.1)',borderRadius:'0 0 8px 8px',background:'rgba(255,255,255,.02)',flexWrap:'wrap'}}>
          {pairs.map((_,li)=><button key={li} onClick={()=>pick(li,origIdx)} style={{fontSize:'11px',padding:'2px 8px',borderRadius:'5px',border:'1px solid',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace',background:sel[li]===origIdx?'rgba(200,146,42,.2)':'transparent',color:sel[li]===origIdx?C.gold:'rgba(255,255,255,.4)',borderColor:sel[li]===origIdx?C.gold:'rgba(255,255,255,.2)'}}>{li+1}</button>)}
        </div>
      </div>)}</div>
    </div>
    {!checked?<button onClick={()=>setChecked(true)} disabled={!allDone} style={{padding:'7px 20px',borderRadius:'8px',fontSize:'13px',fontWeight:600,background:'rgba(200,146,42,.2)',color:C.gold,border:`1px solid rgba(200,146,42,.4)`,cursor:allDone?'pointer':'not-allowed',opacity:allDone?1:.45,fontFamily:'inherit'}}>Проверить</button>
    :<div style={{padding:'12px 16px',borderRadius:'10px',background:correct?'rgba(100,200,100,.08)':'rgba(200,146,42,.08)',border:`1px solid ${correct?'rgba(100,200,100,.2)':'rgba(200,146,42,.2)'}`,color:correct?'#a0ffb0':C.gold,fontSize:'14px'}}>
      {correct?'✓ Все пары верны!':'Некоторые неверны.'}<button onClick={()=>{setSel({});setChecked(false)}} style={{marginLeft:'12px',fontSize:'11px',color:'rgba(255,255,255,.4)',background:'none',border:'1px solid rgba(255,255,255,.2)',borderRadius:'6px',padding:'3px 10px',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace'}}>Снова</button>
    </div>}
  </div>
}

function TransEx({ex}){
  const [input,setInput]=useState(''),[show,setShow]=useState(false)
  return <div>
    {ex.greek&&<div style={{fontFamily:'var(--font-playfair),serif',fontSize:'21px',color:'#f0d898',marginBottom:'8px',lineHeight:1.5}}>{ex.greek}</div>}
    {ex.hint&&<div style={{fontSize:'11px',color:'rgba(255,255,255,.3)',fontFamily:'var(--font-jetbrains),monospace',marginBottom:'10px'}}>{ex.hint}</div>}
    <textarea value={input} onChange={e=>setInput(e.target.value)} disabled={show} rows={2} placeholder="Ваш перевод..." style={{width:'100%',padding:'10px 14px',borderRadius:'10px',resize:'vertical',border:'1px solid rgba(255,255,255,.15)',background:'rgba(255,255,255,.05)',color:'rgba(255,255,255,.8)',fontSize:'15px',lineHeight:'1.6',outline:'none',marginBottom:'10px',fontFamily:'inherit'}}/>
    {!show?<button onClick={()=>setShow(true)} style={{padding:'7px 18px',borderRadius:'8px',fontSize:'13px',fontWeight:600,background:'rgba(200,146,42,.2)',color:C.gold,border:`1px solid rgba(200,146,42,.4)`,cursor:'pointer',fontFamily:'inherit'}}>Показать перевод</button>
    :<div>
      <button onClick={()=>{setShow(false);setInput('')}} style={{fontSize:'12px',color:'rgba(255,255,255,.4)',background:'none',border:'1px solid rgba(255,255,255,.2)',borderRadius:'6px',padding:'5px 12px',cursor:'pointer',fontFamily:'var(--font-jetbrains),monospace',marginBottom:'12px'}}>↺ Снова</button>
      <div style={{padding:'14px 18px',borderRadius:'12px',background:'rgba(160,255,176,.06)',border:'1px solid rgba(160,255,176,.2)'}}>
        <div style={{fontSize:'11px',color:'#a0ffb0',fontWeight:700,textTransform:'uppercase',letterSpacing:'1px',fontFamily:'var(--font-jetbrains),monospace',marginBottom:'5px'}}>Перевод</div>
        <div style={{fontSize:'15px',lineHeight:1.7,color:'rgba(255,255,255,.75)',fontStyle:'italic'}}>{ex.answer}</div>
        {ex.note&&<div style={{marginTop:'8px',fontSize:'12px',color:'rgba(255,255,255,.4)'}}>{ex.note}</div>}
      </div>
    </div>}
  </div>
}

function ExBlock({ex,index}){
  const title=(ex.question??'').replace(/\s*\(Упражнение\s+\d+,?\s*Маунс\)/gi,'').replace(/^[📊🔤📖✍️🗂]\s*/,'').trim()
  return <div style={{background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'12px',padding:'24px 26px',marginBottom:'20px'}}>
    <div style={{display:'flex',alignItems:'center',gap:'13px',marginBottom:'14px'}}>
      <div style={{width:'33px',height:'33px',borderRadius:'50%',background:C.gold,color:'#1a1208',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-jetbrains),monospace',fontWeight:700,fontSize:'13px',flexShrink:0}}>{index+1}</div>
      <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'18px',fontWeight:700,color:'white'}}>{title||`Задание ${index+1}`}</div>
    </div>
    {ex.instruction&&<p style={{fontSize:'14px',color:'rgba(255,255,255,.45)',fontStyle:'italic',marginBottom:'16px'}}>{ex.instruction}</p>}
    {ex.type==='analysis'&&<AnalysisEx ex={ex}/>}
    {ex.type==='phrases'&&<PhrasesEx ex={ex}/>}
    {ex.type==='choose'&&<ChooseEx ex={ex}/>}
    {ex.type==='match'&&<MatchEx ex={ex}/>}
    {(ex.type==='translate'||ex.type==='fill')&&<TransEx ex={ex}/>}
  </div>
}

function SelfCheck({items}){
  const [ch,setCh]=useState(new Set())
  if(!items?.length)return null
  return <div style={{background:'rgba(200,146,42,.1)',border:'1px solid rgba(200,146,42,.3)',borderRadius:'10px',padding:'22px 24px',marginTop:'24px'}}>
    <h4 style={{fontFamily:'var(--font-playfair),serif',color:C.gold,fontSize:'18px',fontWeight:700,marginBottom:'14px'}}>✅ Чеклист самопроверки</h4>
    {items.map((text,i)=><div key={i} onClick={()=>setCh(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n})} style={{display:'flex',alignItems:'flex-start',gap:'10px',padding:'9px 0',borderBottom:'1px solid rgba(255,255,255,.05)',fontSize:'14px',cursor:'pointer',userSelect:'none',color:'rgba(255,255,255,.7)'}}>
      <div style={{width:'18px',height:'18px',border:`1.5px solid ${ch.has(i)?C.gold:'rgba(200,146,42,.4)'}`,borderRadius:'4px',flexShrink:0,marginTop:'2px',background:ch.has(i)?C.gold:'transparent',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'11px',color:'#1a1208',transition:'all .2s'}}>{ch.has(i)?'✓':''}</div>
      {text}
    </div>)}
  </div>
}

/* ═══ VOCAB CARD — fixed hover: only border glow, no background change ═══ */
function VCard({w}){
  const [flip,setFlip]=useState(false)
  return <div onClick={()=>setFlip(p=>!p)} role="button"
    style={{
      background:C.card,
      border:`1.5px solid ${C.border}`,
      borderRadius:'10px',
      padding:'14px 15px',
      cursor:'pointer',
      minHeight:'110px',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      transition:'border-color .25s, box-shadow .25s',
    }}
    onMouseEnter={e=>{
      e.currentTarget.style.borderColor=C.gold
      e.currentTarget.style.boxShadow='0 0 12px rgba(200,146,42,.15)'
    }}
    onMouseLeave={e=>{
      e.currentTarget.style.borderColor=C.border
      e.currentTarget.style.boxShadow='none'
    }}>
    {!flip?<>
      <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'20px',fontWeight:700,color:C.blue,marginBottom:'3px'}}>{w.greek}</div>
      <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'11px',color:C.muted,marginBottom:'6px'}}>{w.transliteration}</div>
      <div style={{fontSize:'14px',fontWeight:600,color:C.text}}>{w.translation}</div>
      {w.frequency&&<div style={{fontSize:'11px',color:C.muted,fontFamily:'var(--font-jetbrains),monospace',marginTop:'4px'}}>×{w.frequency} в НЗ</div>}
    </>:<>
      <div style={{fontSize:'13px',color:C.muted,fontStyle:'italic',flex:1,lineHeight:1.6}}>{w.example??'—'}</div>
      <div style={{fontSize:'10px',color:C.gold,fontFamily:'var(--font-jetbrains),monospace',marginTop:'8px',letterSpacing:'1px'}}>← НАЗАД</div>
    </>}
  </div>
}

function PBar(){
  const [pct,setPct]=useState(0)
  useEffect(()=>{
    function u(){const el=document.documentElement;setPct(Math.min(100,(el.scrollTop/(el.scrollHeight-el.clientHeight))*100)||0)}
    window.addEventListener('scroll',u,{passive:true});return()=>window.removeEventListener('scroll',u)
  },[])
  return <div style={{position:'fixed',top:0,left:0,right:0,height:'3px',background:'rgba(0,0,0,.15)',zIndex:9999,pointerEvents:'none'}}>
    <div style={{height:'100%',width:`${pct}%`,transition:'width .1s',background:`linear-gradient(90deg,${C.gold},${C.accent})`}}/>
  </div>
}

const DIV = <hr style={{border:'none',height:'1px',background:`linear-gradient(90deg,transparent,var(--lesson-border),transparent)`,margin:'52px 0'}}/>

export function LessonContent({lesson,module:mod,userId,prev,next,isCompleted}){
  const [completed,setCompleted]=useState(isCompleted)
  const [saving,setSaving]=useState(false)
  const sections=lesson.sections??[],vocab=lesson.vocab??[],exercises=lesson.exercises??[],summary=lesson.summary??[]
  const lessonNum=lesson.id?.split('-').pop()??'?'

  /* ═══ Build dynamic navigation items from section titles ═══ */
  const navItems = useMemo(() => {
    const items = [{ href: '#lesson', label: 'Введение' }]

    // Add titled theory/table sections
    sections.forEach((s, i) => {
      if (s.title && (s.type === 'theory' || s.type === 'table')) {
        const anchor = sectionAnchor(s.title, i)
        // Truncate long titles for nav
        const label = s.title.length > 28 ? s.title.substring(0, 26) + '…' : s.title
        items.push({ href: `#${anchor}`, label })
      }
    })

    if (summary.length > 0) items.push({ href: '#summary', label: 'Итоги' })
    if (vocab.length > 0) items.push({ href: '#vocab', label: `Словарь (${vocab.length})` })
    if (exercises.length > 0) items.push({ href: '#homework', label: '📝 Задания' })

    return items
  }, [sections, vocab, exercises, summary])

  async function handleComplete(){
    setSaving(true)
    try{await fetch('/api/progress',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({lessonId:lesson.id,completed:true})});setCompleted(true)}catch{}finally{setSaving(false)}
  }

  return <div style={{background:C.bg,minHeight:'100vh',fontFamily:'var(--font-source-serif),Georgia,serif',fontSize:'17px',lineHeight:1.75,color:C.text,overflowX:'hidden'}}>
    <PBar/>

    {/* ── ШАПКА тёмная ─────────────────────────────────────────── */}
    <header style={{background:C.ink,color:'#f7f2e8',padding:'clamp(36px,5vw,60px) clamp(18px,4vw,40px) clamp(32px,4vw,50px)',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',right:'-20px',top:'50%',transform:'translateY(-50%)',fontFamily:'var(--font-playfair),serif',fontSize:'140px',fontWeight:900,opacity:.06,letterSpacing:'-4px',pointerEvents:'none',whiteSpace:'nowrap',color:'#f7f2e8',userSelect:'none'}}>ΕΛΛΗΝΙΚΑ</div>
        <div style={{fontFamily:'var(--font-jetbrains),monospace',fontSize:'12px',letterSpacing:'4px',textTransform:'uppercase',color:C.gold,marginBottom:'16px'}}>{mod?.title??`Модуль ${lesson.moduleId}`} · Глава {lessonNum}</div>
        <h1 style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(32px,6vw,64px)',fontWeight:900,lineHeight:1.05,marginBottom:'14px',color:'#f7f2e8'}}>{lesson.title}</h1>
        <p style={{fontSize:'18px',opacity:.7,fontStyle:'italic',maxWidth:'560px',marginBottom:'28px'}}>{lesson.subtitle}</p>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
          {[`⏱ ${lesson.duration??'~40 мин'}`,vocab.length>0?`📚 ${vocab.length} слов`:null,exercises.length>0?`✍️ ${exercises.length} заданий`:null,completed?'✓ Пройден':null].filter(Boolean).map((chip,i)=>(
            <span key={i} style={{background:'rgba(255,255,255,.08)',border:'1px solid rgba(255,255,255,.15)',borderRadius:'30px',padding:'5px 15px',fontSize:'13px',fontFamily:'var(--font-jetbrains),monospace',color:chip.startsWith('✓')?'#a0ffb0':'inherit'}}>{chip}</span>
          ))}
        </div>
    </header>

    {/* ── НАВИГАЦИЯ — sticky, with dynamic section links ─────── */}
    {/* ── НАВИГАЦИЯ — sticky, горизонтальный скролл внутри ──── */}
    <div style={{
      background:C.ink,
      borderTop:'1px solid rgba(255,255,255,.08)',
      position:'sticky',
      top:0,
      zIndex:20,
      width:'100%',
      maxWidth:'100vw',
    }}>
      <nav className="lesson-nav-scroll" style={{
        display:'flex',
        overflowX:'scroll',
        overflowY:'hidden',
        scrollbarWidth:'none',
        padding:'0 clamp(14px,3vw,32px)',
        WebkitOverflowScrolling:'touch',
      }}>
        {navItems.map((item,i)=>(
            <a key={i} href={item.href} style={{padding:'13px 16px',fontSize:'12px',fontFamily:'var(--font-jetbrains),monospace',color:'rgba(255,255,255,.45)',whiteSpace:'nowrap',borderBottom:'2px solid transparent',textDecoration:'none',display:'block',transition:'all .2s',flexShrink:0}}
              onMouseEnter={e=>{e.currentTarget.style.color=C.gold;e.currentTarget.style.borderBottomColor=C.gold}}
              onMouseLeave={e=>{e.currentTarget.style.color='rgba(255,255,255,.45)';e.currentTarget.style.borderBottomColor='transparent'}}>
              {item.label}
            </a>
          ))}
      </nav>
    </div>

    {/* ── КОНТЕНТ пергаментный ────────────────────────────────── */}
    <main id="lesson" style={{maxWidth:'900px',margin:'0 auto',padding:'clamp(36px,5vw,60px) clamp(14px,3vw,24px) 100px'}}>

      {sections.map((s,i)=>{
        const anchor = (s.title && (s.type === 'theory' || s.type === 'table'))
          ? sectionAnchor(s.title, i) : undefined
        return <div key={i}><Sec s={s} anchorId={anchor}/></div>
      })}

      {summary.length>0&&<>{DIV}
        <section id="summary">
          <SL text="Итоги урока"/>
          <h2 style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(22px,4vw,34px)',fontWeight:900,lineHeight:1.15,marginBottom:'20px',color:C.text}}>Что вы узнали</h2>
          <ul style={{listStyle:'none',padding:0,margin:'20px 0'}}>
            {summary.map((item,i)=><li key={i} style={{display:'flex',gap:'14px',padding:'14px 18px',borderRadius:'10px',marginBottom:'10px',background:C.card,border:`1.5px solid ${C.border}`,fontSize:'15px',alignItems:'flex-start'}}>
              <span style={{flexShrink:0,width:'28px',height:'28px',background:C.ink,color:C.gold,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-jetbrains),monospace',fontSize:'13px',fontWeight:600,marginTop:'1px'}}>{i+1}</span>
              <span style={{color:C.text}} dangerouslySetInnerHTML={{__html:md(item)}}/>
            </li>)}
          </ul>
        </section>
      </>}

      {vocab.length>0&&<>{DIV}
        <section id="vocab">
          <SL text="Лексический минимум"/>
          <h2 style={{fontFamily:'var(--font-playfair),serif',fontSize:'clamp(22px,4vw,34px)',fontWeight:900,lineHeight:1.15,marginBottom:'10px',color:C.text}}>Слова главы {lessonNum}</h2>
          <p style={{color:C.muted,fontSize:'15px',marginBottom:'20px'}}>Нажмите на карточку — увидите пример употребления в тексте.</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(175px,1fr))',gap:'12px'}}>
            {vocab.map((w,i)=><VCard key={i} w={w}/>)}
          </div>
        </section>
      </>}

      {exercises.length>0&&<>{DIV}
        <section id="homework">
          <div style={{background:C.ink,color:'#f7f2e8',borderRadius:'20px',padding:'clamp(28px,4vw,44px) clamp(18px,3vw,40px)',position:'relative',overflow:'hidden'}}>
            <div style={{position:'absolute',right:'-10px',top:'18px',fontFamily:'var(--font-playfair),serif',fontSize:'96px',fontWeight:900,opacity:.04,pointerEvents:'none',whiteSpace:'nowrap',color:'#f7f2e8',userSelect:'none'}}>Άσκηση</div>
            <div style={{fontFamily:'var(--font-playfair),serif',fontSize:'30px',fontWeight:900,color:C.gold,marginBottom:'6px'}}>Домашнее задание</div>
            <div style={{opacity:.6,fontStyle:'italic',marginBottom:'30px',fontSize:'16px'}}>Упражнение {lessonNum} · {lesson.title}</div>
            {exercises.map((ex,i)=><ExBlock key={i} ex={ex} index={i}/>)}
            {lesson.checklist&&<SelfCheck items={lesson.checklist}/>}
          </div>
        </section>
      </>}

      {!completed&&<div style={{margin:'44px 0',padding:'26px',borderRadius:'14px',background:C.card,border:`1.5px solid ${C.border}`,textAlign:'center'}}>
        <p style={{fontSize:'15px',color:C.muted,marginBottom:'14px'}}>Изучили материал? Отметьте урок как пройденный.</p>
        <button onClick={handleComplete} disabled={saving} style={{padding:'11px 36px',borderRadius:'10px',fontSize:'15px',fontWeight:700,background:C.gold,color:'#1a1208',border:'none',cursor:'pointer',fontFamily:'var(--font-playfair),serif',opacity:saving?.5:1,transition:'opacity .2s'}}>
          {saving?'Сохраняем…':'✓ Урок пройден'}
        </button>
      </div>}

      <nav style={{display:'flex',justifyContent:'space-between',gap:'16px',paddingTop:'32px',borderTop:`1px solid ${C.border}`,marginTop:'20px'}}>
        {prev?<Link href={`/lesson/${prev.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'16px 20px',borderRadius:'12px',border:`1.5px solid ${C.border}`,background:C.card,textDecoration:'none',flex:1,maxWidth:'48%',transition:'border-color .2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <span style={{fontSize:'11px',fontFamily:'var(--font-jetbrains),monospace',color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>← Назад</span>
          <span style={{fontSize:'15px',color:C.text,fontFamily:'var(--font-playfair),serif',fontWeight:700}}>{prev.title}</span>
        </Link>:<div/>}
        {next?<Link href={`/lesson/${next.id}`} style={{display:'flex',flexDirection:'column',gap:'4px',padding:'16px 20px',borderRadius:'12px',border:`1.5px solid ${C.border}`,background:C.card,textDecoration:'none',flex:1,maxWidth:'48%',textAlign:'right',transition:'border-color .2s'}} onMouseEnter={e=>e.currentTarget.style.borderColor=C.gold} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <span style={{fontSize:'11px',fontFamily:'var(--font-jetbrains),monospace',color:C.gold,letterSpacing:'1px',textTransform:'uppercase'}}>Далее →</span>
          <span style={{fontSize:'15px',color:C.text,fontFamily:'var(--font-playfair),serif',fontWeight:700}}>{next.title}</span>
        </Link>:<div/>}
      </nav>
    </main>
  </div>
}

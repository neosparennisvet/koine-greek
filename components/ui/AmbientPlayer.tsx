'use client'

import { useState, useRef, useEffect } from 'react'

// Free streaming ambient/instrumental tracks (CC0 / public domain)
const TRACKS = [
  {
    name: 'Медитативный мир',
    emoji: '🎹',
    // Direct URL to a known free ambient piano track
    url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_8cb749db16.mp3',
    color: '#c99a2e',
  },
  {
    name: 'Духовный покой',
    emoji: '🎻',
    url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_fbd3d22b85.mp3',
    color: '#3abfae',
  },
  {
    name: 'Антика',
    emoji: '🏛️',
    url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_d1718ab41b.mp3',
    color: '#9aa3be',
  },
]

// ─── Web Audio synthesis fallback (harmonic pentatonic ambient) ───────────
function buildAmbientSynth(ctx: AudioContext, volume: number) {
  // C minor pentatonic: C3, Eb3, F3, G3, Bb3, C4, Eb4, G4
  const scale = [130.81, 155.56, 174.61, 196.00, 233.08, 261.63, 311.13, 392.00]

  const master = ctx.createGain()
  master.gain.setValueAtTime(0, ctx.currentTime)
  master.gain.linearRampToValueAtTime(volume * 0.7, ctx.currentTime + 3)
  master.connect(ctx.destination)

  // Convolver reverb (impulse)
  const reverb = ctx.createConvolver()
  const irLength = ctx.sampleRate * 3
  const irBuffer = ctx.createBuffer(2, irLength, ctx.sampleRate)
  for (let c = 0; c < 2; c++) {
    const data = irBuffer.getChannelData(c)
    for (let i = 0; i < irLength; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.5)
    }
  }
  reverb.buffer = irBuffer
  reverb.connect(master)

  const dry  = ctx.createGain(); dry.gain.value  = 0.4; dry.connect(master)
  const wetG = ctx.createGain(); wetG.gain.value = 0.6; wetG.connect(reverb)

  const nodes: AudioNode[] = [master, reverb, dry, wetG]

  // Chord engine — plays slow arpeggiated chords
  const chords = [
    [0, 2, 4],    // C Eb F  → Cm7
    [2, 4, 6],    // F G Bb  → Fsus
    [1, 3, 5],    // Eb F Ab
    [0, 3, 7],    // C G Eb
  ]
  let chordIdx = 0
  let noteIdx  = 0

  function playNote() {
    if (!ctx || ctx.state === 'closed') return
    const chord = chords[chordIdx % chords.length]
    const freq  = scale[chord[noteIdx % chord.length]] * (noteIdx % chord.length === 0 ? 1 : 1)

    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    const filt = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.value = freq

    // Slight detuning for warmth
    const detune = ctx.createOscillator()
    const dg     = ctx.createGain()
    detune.type = 'sine'
    detune.frequency.value = freq * 1.004
    dg.gain.value = 0.3
    detune.connect(dg)

    filt.type = 'lowpass'
    filt.frequency.value = 1200
    filt.Q.value = 0.5

    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1.2)
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 3.5)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 5)

    osc.connect(filt)
    dg.connect(filt)
    filt.connect(gain)
    gain.connect(dry)
    gain.connect(wetG)

    osc.start()
    detune.start()
    osc.stop(ctx.currentTime + 5.2)
    detune.stop(ctx.currentTime + 5.2)

    nodes.push(osc, gain, filt, detune, dg)

    noteIdx++
    if (noteIdx % chord.length === 0) {
      chordIdx++
      noteIdx = 0
    }
  }

  // Schedule notes
  let interval: ReturnType<typeof setInterval>
  function start() {
    playNote()
    interval = setInterval(playNote, 2800)
  }
  function stop() {
    clearInterval(interval)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5)
    setTimeout(() => {
      nodes.forEach(n => { try { n.disconnect() } catch {} })
    }, 2000)
  }

  start()
  return { stop, setVolume: (v: number) => { master.gain.setTargetAtTime(v * 0.7, ctx.currentTime, 0.3) } }
}

// ─────────────────────────────────────────────────────────────────────────────
export function AmbientPlayer() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [playing,  setPlaying]  = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)
  const [volume,   setVolume]   = useState(0.3)
  const [error,    setError]    = useState(false)   // fallback to synth

  const audioRef  = useRef<HTMLAudioElement | null>(null)
  const synthRef  = useRef<{ stop: ()=>void; setVolume: (v:number)=>void } | null>(null)
  const ctxRef    = useRef<AudioContext | null>(null)
  const usingSynth= useRef(false)

  // Cleanup on unmount
  useEffect(() => () => { stopAll() }, [])

  function stopAll() {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
    if (synthRef.current) { synthRef.current.stop(); synthRef.current = null }
    ctxRef.current?.close()
    ctxRef.current = null
  }

  function startAudio(idx: number, vol: number) {
    stopAll()
    usingSynth.current = false
    setError(false)

    const track = TRACKS[idx]
    const audio = new Audio()
    audio.crossOrigin = 'anonymous'
    audio.volume = vol
    audio.loop   = true
    audio.src    = track.url

    audio.onerror = () => {
      // Fallback to synthesized ambient
      usingSynth.current = true
      setError(true)
      startSynth(vol)
    }

    audio.play().catch(() => {
      usingSynth.current = true
      setError(true)
      startSynth(vol)
    })

    audioRef.current = audio
  }

  function startSynth(vol: number) {
    try {
      if (!ctxRef.current || ctxRef.current.state === 'closed') {
        ctxRef.current = new AudioContext()
      }
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
      synthRef.current = buildAmbientSynth(ctxRef.current, vol)
    } catch {}
  }

  function togglePlay() {
    if (playing) {
      stopAll()
      setPlaying(false)
    } else {
      if (usingSynth.current || error) {
        startSynth(volume)
      } else {
        startAudio(trackIdx, volume)
      }
      setPlaying(true)
    }
  }

  function changeTrack(idx: number) {
    setTrackIdx(idx)
    if (playing) startAudio(idx, volume)
  }

  function changeVolume(v: number) {
    setVolume(v)
    if (audioRef.current) audioRef.current.volume = v
    synthRef.current?.setVolume(v)
  }

  const current = TRACKS[trackIdx]

  return (
    <div style={{position:'relative'}}>
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(p => !p)}
        title="Фоновая музыка"
        style={{
          width:'36px', height:'36px', borderRadius:'8px',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:'16px', transition:'all .2s',
          background: playing ? 'rgba(201,154,46,.12)' : 'transparent',
          border: playing ? '1px solid rgba(201,154,46,.4)' : '1px solid transparent',
          color: playing ? '#c99a2e' : '#5a6a8a',
          cursor: 'pointer',
          animation: playing ? 'pulse 2s infinite' : 'none',
        }}
      >
        {playing ? '♪' : '♩'}
      </button>

      {/* Panel */}
      {isOpen && (
        <div style={{
          position:'absolute', bottom:'48px', left:'0',
          width:'240px', borderRadius:'16px', border:'1px solid #2a3060',
          background:'#0d1020', padding:'16px', boxShadow:'0 20px 60px rgba(0,0,0,.6)', zIndex:999,
        }}>
          <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#5a6a8a',marginBottom:'12px'}}>🎵 Фоновая музыка</div>

          {/* Tracks */}
          <div style={{marginBottom:'12px'}}>
            {TRACKS.map((t,i)=>(
              <button key={i} onClick={()=>changeTrack(i)}
                style={{
                  width:'100%', display:'flex', alignItems:'center', gap:'10px',
                  padding:'8px 10px', borderRadius:'8px', fontSize:'13px',
                  textAlign:'left', cursor:'pointer', marginBottom:'4px',
                  background: trackIdx===i ? `${t.color}18` : 'transparent',
                  color: trackIdx===i ? t.color : '#6878a8',
                  border: `1px solid ${trackIdx===i ? `${t.color}35` : 'transparent'}`,
                  transition:'all .15s',
                }}>
                <span>{t.emoji}</span>
                <span style={{flex:1}}>{t.name}</span>
                {trackIdx===i && playing && <span style={{fontSize:'10px',animation:'pulse 1s infinite',opacity:.8}}>▶</span>}
              </button>
            ))}
          </div>

          {/* Volume */}
          <div style={{marginBottom:'12px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'6px'}}>
              <span style={{fontSize:'11px',color:'#3a4a6a'}}>Громкость</span>
              <span style={{fontSize:'11px',fontFamily:'monospace',color:'#5a6a8a'}}>{Math.round(volume*100)}%</span>
            </div>
            <input type="range" min="0" max="1" step="0.02" value={volume}
              onChange={e=>changeVolume(parseFloat(e.target.value))}
              style={{width:'100%',height:'4px',borderRadius:'4px',appearance:'none',cursor:'pointer',
                background:`linear-gradient(to right,#c99a2e ${volume*100}%,#1e2440 0)`}}/>
          </div>

          {/* Play button */}
          <button onClick={togglePlay}
            style={{
              width:'100%', padding:'9px', borderRadius:'10px', fontSize:'13px', fontWeight:600,
              cursor:'pointer', transition:'all .2s',
              background: playing ? 'rgba(192,68,90,.14)' : 'rgba(201,154,46,.14)',
              color:       playing ? '#e07a8e' : '#c99a2e',
              border:     `1px solid ${playing ? 'rgba(192,68,90,.3)' : 'rgba(201,154,46,.28)'}`,
            }}>
            {playing ? '⏸ Пауза' : '▶ Включить'}
          </button>

          {error && (
            <p style={{fontSize:'10px',color:'#3a5a3a',marginTop:'8px',textAlign:'center'}}>
              🎹 Синтезированный эмбиент
            </p>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

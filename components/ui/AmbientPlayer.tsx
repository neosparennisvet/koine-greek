'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Бесплатные ambient треки (YouTube embeds as audio via proxy won't work,
// using Web Audio API to generate simple ambient tones instead,
// OR link to free CC0 ambient music URLs)
const TRACKS = [
  {
    name: 'Античная тишина',
    emoji: '🏛️',
    // Генерируем через Web Audio API — не нужны внешние файлы
    type: 'generated' as const,
    freq: [220, 330, 440],
    color: '#c99a2e',
  },
  {
    name: 'Средиземное море',
    emoji: '🌊',
    type: 'generated' as const,
    freq: [174, 261, 348],
    color: '#3abfae',
  },
  {
    name: 'Рукопись',
    emoji: '📜',
    type: 'generated' as const,
    freq: [256, 384, 512],
    color: '#9aa3be',
  },
]

export function AmbientPlayer() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [playing,  setPlaying]  = useState(false)
  const [track,    setTrack]    = useState(0)
  const [volume,   setVolume]   = useState(0.25)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const nodesRef    = useRef<(OscillatorNode | GainNode)[]>([])

  function getCtx() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    return audioCtxRef.current
  }

  function stopAll() {
    nodesRef.current.forEach(n => {
      try { (n as OscillatorNode).stop?.(); n.disconnect() } catch {}
    })
    nodesRef.current = []
  }

  function startTrack(idx: number, vol: number) {
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()
    stopAll()

    const t = TRACKS[idx]
    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(vol, ctx.currentTime + 2)
    master.connect(ctx.destination)
    nodesRef.current.push(master)

    t.freq.forEach((f, i) => {
      const osc = ctx.createOscillator()
      const g   = ctx.createGain()
      osc.type = i === 0 ? 'sine' : 'sine'
      osc.frequency.value = f

      // Медленная модуляция для атмосферности
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.08 + i * 0.04
      lfoGain.gain.value = f * 0.008
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.start()

      g.gain.value = i === 0 ? 0.5 : i === 1 ? 0.3 : 0.2
      osc.connect(g)
      g.connect(master)
      osc.start()
      nodesRef.current.push(osc, g, lfo, lfoGain)
    })
  }

  function togglePlay() {
    if (playing) {
      stopAll()
      setPlaying(false)
    } else {
      startTrack(track, volume)
      setPlaying(true)
    }
  }

  function changeTrack(idx: number) {
    setTrack(idx)
    if (playing) {
      stopAll()
      setTimeout(() => startTrack(idx, volume), 100)
    }
  }

  function changeVolume(v: number) {
    setVolume(v)
    const master = nodesRef.current.find(n => n instanceof GainNode && (n as GainNode).gain.value > 0.01)
    if (master && playing) {
      ;(master as GainNode).gain.setTargetAtTime(v, getCtx().currentTime, 0.1)
    }
  }

  // Cleanup
  useEffect(() => () => { stopAll(); audioCtxRef.current?.close() }, [])

  const current = TRACKS[track]

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(p => !p)}
        title="Фоновая музыка"
        className={cn(
          'w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all border',
          playing
            ? 'border-gold/60 text-gold bg-gold/10 animate-pulse'
            : 'border-transparent text-soft hover:text-textc hover:bg-card/60'
        )}
      >
        {playing ? '♪' : '♩'}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          className="absolute bottom-12 left-0 w-[230px] rounded-2xl border p-4 shadow-xl z-50"
          style={{ background: 'var(--c-surface)', borderColor: 'var(--c-border)' }}
        >
          <div className="text-[11px] font-bold uppercase tracking-widest mb-3"
            style={{ color: 'var(--c-muted)' }}>
            🎵 Фоновая музыка
          </div>

          {/* Track list */}
          <div className="space-y-1 mb-3">
            {TRACKS.map((t, i) => (
              <button
                key={i}
                onClick={() => changeTrack(i)}
                className={cn(
                  'w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all text-left',
                  track === i
                    ? 'font-semibold'
                    : ''
                )}
                style={{
                  background: track === i ? `${t.color}18` : 'transparent',
                  color: track === i ? t.color : 'var(--c-soft)',
                  border: track === i ? `1px solid ${t.color}40` : '1px solid transparent',
                }}
              >
                <span>{t.emoji}</span>
                <span>{t.name}</span>
                {track === i && playing && <span className="ml-auto text-[10px] animate-pulse">▶</span>}
              </button>
            ))}
          </div>

          {/* Volume */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Громкость</span>
              <span className="text-[11px] font-mono" style={{ color: 'var(--c-muted)' }}>
                {Math.round(volume * 100)}%
              </span>
            </div>
            <input
              type="range" min="0" max="0.5" step="0.01" value={volume}
              onChange={e => changeVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{ background: `linear-gradient(to right, #c99a2e ${volume/0.5*100}%, var(--c-border) 0)` }}
            />
          </div>

          {/* Play button */}
          <button
            onClick={togglePlay}
            className="w-full py-2 rounded-xl text-[13px] font-semibold transition-all"
            style={{
              background: playing ? 'rgba(192,68,90,.15)' : 'rgba(201,154,46,.15)',
              color: playing ? '#e07a8e' : '#c99a2e',
              border: `1px solid ${playing ? 'rgba(192,68,90,.3)' : 'rgba(201,154,46,.3)'}`,
            }}
          >
            {playing ? '⏸ Пауза' : '▶ Играть'}
          </button>
          <p className="text-[10px] mt-2 text-center" style={{ color: 'var(--c-muted)' }}>
            Атмосферные тоны, созданные локально
          </p>
        </div>
      )}
    </div>
  )
}

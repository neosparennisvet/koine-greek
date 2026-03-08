'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function RegisterPage() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (password.length < 8) { setError('Пароль должен быть не менее 8 символов'); return }
    setLoading(true); setError(null)

    const { error } = await supabase.auth.signUp({
      email, password,
      options: { data: { full_name: name } },
    })

    if (error) {
      setError(error.message === 'User already registered' ? 'Этот email уже зарегистрирован' : 'Ошибка регистрации. Попробуйте снова.')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,168,67,.08),transparent)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-greek text-3xl font-semibold text-gold">Κοινή Greek</Link>
          <p className="text-soft text-sm mt-2">Создайте аккаунт бесплатно</p>
        </div>

        <div className="bg-deep border border-rim rounded-3xl p-8 shadow-[0_4px_40px_rgba(0,0,0,.5)]">

          {/* Free module badge */}
          <div className="bg-teal/10 border border-teal/20 rounded-xl px-4 py-3 text-sm text-tealb mb-6 text-center">
            🎁 Первый модуль (4 урока) — бесплатно после регистрации
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="bg-rose/10 border border-rose/30 rounded-xl px-4 py-3 text-sm text-rose">{error}</div>
            )}

            <div>
              <label className="block text-sm font-medium text-textc mb-2">Ваше имя</label>
              <input type="text" required value={name} onChange={e=>setName(e.target.value)} placeholder="Андрей"
                className="w-full px-4 py-3 bg-card border border-rim rounded-xl text-bright placeholder-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-textc mb-2">Email</label>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
                className="w-full px-4 py-3 bg-card border border-rim rounded-xl text-bright placeholder-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium text-textc mb-2">Пароль</label>
              <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Минимум 8 символов"
                className="w-full px-4 py-3 bg-card border border-rim rounded-xl text-bright placeholder-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-base bg-gold text-night hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.3)] disabled:opacity-50">
              {loading ? 'Создаём аккаунт...' : 'Создать аккаунт'}
            </button>
          </form>

          <p className="text-center text-xs text-muted mt-4">
            Нажимая кнопку, вы соглашаетесь с{' '}
            <Link href="/terms" className="text-soft hover:text-gold">условиями использования</Link>
          </p>
          <p className="text-center text-sm text-muted mt-4">
            Уже есть аккаунт?{' '}
            <Link href="/auth/login" className="text-gold hover:text-goldl font-medium">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

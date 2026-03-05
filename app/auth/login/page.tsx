'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Неверный email или пароль')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,168,67,.08),transparent)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="font-greek text-3xl font-semibold text-gold">Κοινή Greek</Link>
          <p className="text-soft text-sm mt-2">Войдите в свой аккаунт</p>
        </div>

        {/* Card */}
        <div className="bg-deep border border-rim rounded-3xl p-8 shadow-[0_4px_40px_rgba(0,0,0,.5)]">
          <form onSubmit={handleLogin} className="space-y-5">

            {error && (
              <div className="bg-rose/10 border border-rose/30 rounded-xl px-4 py-3 text-sm text-rose">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-textc mb-2">Email</label>
              <input
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-card border border-rim rounded-xl text-bright placeholder-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-textc mb-2">Пароль</label>
              <input
                type="password" required
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-card border border-rim rounded-xl text-bright placeholder-muted focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/10 transition-all"
              />
            </div>

            <div className="flex justify-end">
              <Link href="/auth/forgot" className="text-xs text-muted hover:text-gold transition-colors">
                Забыли пароль?
              </Link>
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-base bg-gold text-night hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Входим...' : 'Войти'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-6">
            Нет аккаунта?{' '}
            <Link href="/auth/register" className="text-gold hover:text-goldl font-medium">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

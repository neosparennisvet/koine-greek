'use client'

import { useState } from 'react'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  // NEXT_PUBLIC_ vars are replaced at build time - safe in client components
  const price = process.env.NEXT_PUBLIC_COURSE_PRICE_RUB ?? '14900'
  const priceFormatted = Number(price).toLocaleString('ru-RU')

  async function handlePay() {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/payments/yookassa', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Ошибка оплаты')
      window.location.href = data.confirmationUrl
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,168,67,.08),transparent)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="font-greek text-3xl font-semibold text-gold mb-2">Κοινή Greek</div>
          <p className="text-soft text-sm">Открыть полный курс</p>
        </div>

        <div className="bg-deep border border-rim rounded-3xl p-8 shadow-[0_4px_40px_rgba(0,0,0,.5)]">

          <div className="bg-card border border-rim rounded-2xl p-5 mb-6">
            <div className="text-sm font-semibold text-bright mb-3">📜 Библейский греческий — полный курс</div>
            <div className="space-y-1.5">
              {[
                '36 уроков по 5 модулям',
                '200+ интерактивных упражнений',
                'Личный кабинет и прогресс',
                'Поддержка преподавателя',
                'Сертификат об окончании',
                'Доступ навсегда',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-textc">
                  <span className="text-tealb text-xs">✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mb-6 px-1">
            <span className="text-textc">Итого</span>
            <span className="font-greek text-3xl font-semibold text-bright">{priceFormatted} ₽</span>
          </div>

          {error && (
            <div className="bg-rose/10 border border-rose/30 rounded-xl px-4 py-3 text-sm text-rose mb-4">{error}</div>
          )}

          <button
            onClick={handlePay}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-base bg-gold text-night hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.3)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Переходим к оплате...' : `Оплатить ${priceFormatted} ₽`}
          </button>

          <div className="mt-4 text-center space-y-1">
            <p className="text-xs text-muted">🔒 Оплата через ЮКассу · Карты МИР, Visa, Mastercard</p>
            <p className="text-xs text-muted">🛡️ 30-дневная гарантия возврата</p>
          </div>
        </div>
      </div>
    </div>
  )
}

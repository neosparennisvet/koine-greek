import Link from 'next/link'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Оплата прошла успешно' }

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-night flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="font-greek text-4xl font-semibold text-bright mb-4">Оплата прошла!</h1>
        <p className="text-soft mb-8">
          Доступ к полному курсу открыт. Вы можете начинать обучение прямо сейчас.
        </p>
        <Link href="/dashboard"
          className="inline-block px-8 py-3.5 rounded-xl font-semibold text-base bg-gold text-night hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.3)]">
          Перейти в кабинет →
        </Link>
      </div>
    </div>
  )
}

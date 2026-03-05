import { COURSE_MODULES, getAllLessons } from '@/lib/course-data'
import { CourseAccordion } from '@/components/lesson/CourseAccordion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/FeaturesSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Программа курса' }

const PRICE = process.env.NEXT_PUBLIC_COURSE_PRICE_RUB ?? '14900'

export default function CoursePage() {
  const total = getAllLessons().length

  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Header */}
        <div className="bg-gradient-to-b from-gold/5 to-transparent border-b border-rim px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-[3px] text-tealb mb-3">📜 Библейский греческий · Койне</div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

              <div>
                <h1 className="font-greek text-[clamp(36px,5vw,58px)] font-normal text-bright leading-tight mb-4">
                  Основы библейского<br /><em className="italic text-gold">греческого языка</em>
                </h1>
                <p className="text-soft text-base leading-relaxed mb-6 max-w-xl">
                  Полный курс от алфавита до свободного чтения Нового Завета. {COURSE_MODULES.length} модулей, {total} уроков, 200+ интерактивных упражнений.
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-soft mb-6">
                  <span>⭐ 4.9 (128 отзывов)</span>
                  <span>👥 340 студентов</span>
                  <span>🕐 ~80 часов материала</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[`${total} уроков`,'200+ упражнений','Словарь','Таблицы форм','Доступ навсегда','Сертификат'].map(tag=>(
                    <span key={tag} className="px-3 py-1.5 rounded-lg text-xs bg-card border border-rim text-textc">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Enroll card */}
              <div className="p-7 rounded-3xl bg-card border border-rim sticky top-20">
                <div className="font-greek text-5xl font-semibold text-bright leading-none mb-1">
                  {Number(PRICE).toLocaleString('ru-RU')} ₽
                </div>
                <div className="text-sm text-muted line-through mb-5">24 900 ₽ — скидка 40%</div>
                <Link href="/auth/register"
                  className="block w-full py-3.5 rounded-xl text-base font-bold bg-gold text-night hover:bg-goldl text-center transition-all hover:shadow-[0_6px_24px_rgba(212,168,67,.35)] mb-3">
                  Записаться на курс
                </Link>
                <Link href="/lesson/1-1"
                  className="block w-full py-3 rounded-xl text-sm font-medium border border-rim text-textc hover:border-soft text-center transition-colors mb-5">
                  Попробовать урок бесплатно
                </Link>
                <p className="text-center text-xs text-muted mb-5">🛡️ 30-дневная гарантия возврата</p>
                <div className="space-y-2">
                  {['♾️ Доступ навсегда','📱 Мобильная версия','🏆 Сертификат','💬 Поддержка преподавателя'].map(f=>(
                    <div key={f} className="text-sm text-soft flex items-center gap-2">{f}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="font-greek text-3xl font-semibold text-bright mb-8">Программа курса</h2>
          <CourseAccordion modules={COURSE_MODULES} />
        </div>

      </main>
      <Footer />
    </>
  )
}

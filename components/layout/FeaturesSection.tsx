import Link from 'next/link'
import { COURSE_MODULES } from '@/lib/course-data'

// ── FEATURES ──────────────────────────────────
const features = [
  { icon: '📜', color: 'bg-gold/10',   title: 'Живой язык Писания',        desc: 'Каждый грамматический раздел сразу применяется к реальным текстам НЗ — вы переводите с первого урока.' },
  { icon: '🎯', color: 'bg-teal/10',   title: 'Интерактивные упражнения',   desc: 'Морфологический анализ, перевод стихов, тесты с мгновенной проверкой — никакой скуки, только практика.' },
  { icon: '📊', color: 'bg-indigo/10', title: 'Личный прогресс',            desc: 'Кабинет студента показывает пройденные уроки, процент выполненных заданий и динамику по каждому модулю.' },
  { icon: '🔤', color: 'bg-amber/10',  title: 'Экзегетика с первого урока', desc: 'Как грамматика влияет на богословие — разбираем реальные примеры (Ин 1:1, Мк 1:1, Рим 1:17 и другие).' },
  { icon: '🌍', color: 'bg-rose/10',   title: 'Для русскоязычных',          desc: 'Курс полностью на русском языке. Студенты из России, СНГ и русскоязычной диаспоры по всему миру.' },
  { icon: '💬', color: 'bg-[rgba(150,80,220,.1)]', title: 'Поддержка преподавателя', desc: 'Вопросы по грамматике, разбор сложных мест, проверка домашних заданий — живая обратная связь.' },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-night to-deep">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-tealb text-xs font-semibold tracking-[3px] uppercase mb-4">
          <span className="w-6 h-px bg-tealb" />Почему именно мы
        </div>
        <h2 className="font-greek text-[clamp(36px,5vw,58px)] font-normal text-bright mb-4 leading-tight">
          Учиться должно быть <em className="italic text-gold">интересно</em>
        </h2>
        <p className="text-soft text-base leading-relaxed max-w-lg mb-14">
          Мы создали курс, который сочетает академическую строгость с современными методами обучения.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(f => (
            <div key={f.title} className="group p-7 rounded-2xl bg-card border border-rim hover:border-muted hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center text-xl mb-5`}>{f.icon}</div>
              <h3 className="text-base font-semibold text-bright mb-2">{f.title}</h3>
              <p className="text-sm text-soft leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CURRICULUM PREVIEW ─────────────────────────
export function CurriculumPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-tealb text-xs font-semibold tracking-[3px] uppercase mb-4">
          <span className="w-6 h-px bg-tealb" />Программа курса
        </div>
        <h2 className="font-greek text-[clamp(36px,5vw,58px)] font-normal text-bright mb-4 leading-tight">
          5 модулей — путь от нуля<br />до <em className="italic text-gold">чтения Писания</em>
        </h2>
        <p className="text-soft text-base leading-relaxed max-w-lg mb-14">
          Структура построена по классическому учебнику Уоллеса. Каждый модуль — логическая ступень.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {COURSE_MODULES.map(mod => (
            <Link
              key={mod.id}
              href="/course"
              className="group p-6 rounded-2xl bg-card border border-rim hover:border-gold hover:shadow-[0_0_0_1px_#9b7520] transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[11px] font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                  МОДУЛЬ {String(mod.id).padStart(2,'0')}
                </span>
              </div>
              <h3 className="text-base font-semibold text-bright mb-3">{mod.title}</h3>
              <div className="space-y-1.5">
                {mod.lessons.slice(0, 4).map(l => (
                  <div key={l.id} className="flex items-center gap-2 text-sm text-soft">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
                    {l.title}
                  </div>
                ))}
                {mod.lessons.length > 4 && (
                  <div className="text-xs text-muted pl-3.5">+ ещё {mod.lessons.length - 4} урока</div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-rim/60 font-mono text-xs text-muted">
                {mod.lessons.length} уроков{mod.id === 1 ? ' · Бесплатно' : ''}
              </div>
            </Link>
          ))}
          {/* CTA card */}
          <Link href="/auth/register" className="flex flex-col items-center justify-center p-8 rounded-2xl border border-dashed border-rim text-center hover:border-gold/50 transition-colors">
            <div className="text-4xl mb-4">✨</div>
            <div className="text-base font-semibold text-bright mb-2">Готов начать?</div>
            <div className="text-sm text-muted">Первый модуль бесплатно после регистрации</div>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ────────────────────────────────
const testimonials = [
  { stars: 5, text: 'Никогда не думал, что смогу читать греческий. После третьего модуля открыл Евангелие от Иоанна в оригинале — это было незабываемо.', name: 'Андрей К.', role: 'Пастор, Москва', initials: 'АК', grad: 'from-gold to-amber' },
  { stars: 5, text: 'Курс сделан с душой. Каждый урок — это не просто грамматика, а богословское открытие. Особенно понравился разбор Ин 1:1.', name: 'Наталья М.', role: 'Богослов, Киев', initials: 'НМ', grad: 'from-teal to-indigol' },
  { stars: 5, text: 'Занимаюсь 3 месяца. Уже перевожу Послание к Римлянам. Интерактивные упражнения — настоящая находка, намного лучше книжных.', name: 'Сергей В.', role: 'Семинарист, Берлин', initials: 'СВ', grad: 'from-rose to-amber' },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-deep">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 text-tealb text-xs font-semibold tracking-[3px] uppercase mb-4">
          <span className="w-6 h-px bg-tealb" />Отзывы студентов
        </div>
        <h2 className="font-greek text-[clamp(36px,5vw,58px)] font-normal text-bright mb-12 leading-tight">
          Они уже читают <em className="italic text-gold">Писание</em> по-гречески
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="p-7 rounded-2xl bg-card border border-rim">
              <div className="text-gold text-sm tracking-[3px] mb-4">{'★'.repeat(t.stars)}</div>
              <p className="text-base text-textc leading-relaxed italic mb-6">«{t.text}»</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.grad} flex items-center justify-center text-sm font-bold text-night shrink-0`}>{t.initials}</div>
                <div>
                  <div className="text-sm font-semibold text-bright">{t.name}</div>
                  <div className="text-xs text-muted">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PRICING ────────────────────────────────────
const PRICE = process.env.NEXT_PUBLIC_COURSE_PRICE_RUB ?? '14900'

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-3 text-tealb text-xs font-semibold tracking-[3px] uppercase mb-4">
          <span className="w-6 h-px bg-tealb" />Тарифы
        </div>
        <h2 className="font-greek text-[clamp(36px,5vw,58px)] font-normal text-bright mb-3 leading-tight text-center">
          Выберите свой <em className="italic text-gold">путь</em>
        </h2>
        <p className="text-soft text-center mb-14">Никаких скрытых платежей. Полный доступ сразу после оплаты.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Free */}
          <div className="p-8 rounded-3xl bg-card border border-rim flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Базовый</div>
            <div className="font-greek text-5xl font-semibold text-bright leading-none mb-1">0 ₽</div>
            <div className="text-sm text-soft mb-7">бесплатно навсегда</div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Модуль 1 полностью (4 урока)', 'Интерактивные упражнения', 'Личный кабинет'].map(f=>(
                <li key={f} className="flex items-start gap-2.5 text-sm text-textc"><span className="text-tealb mt-0.5">✓</span>{f}</li>
              ))}
              {['Модули 2–5', 'Поддержка преподавателя'].map(f=>(
                <li key={f} className="flex items-start gap-2.5 text-sm text-muted"><span className="mt-0.5">✗</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register" className="w-full py-3 rounded-xl text-sm font-semibold border border-rim text-textc hover:border-gold hover:text-gold transition-colors text-center block">
              Начать бесплатно
            </Link>
          </div>

          {/* Full — featured */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gold/8 to-card border border-gold flex flex-col shadow-[0_0_40px_rgba(212,168,67,.15)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-night text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">ПОПУЛЯРНЫЙ</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Полный курс</div>
            <div className="font-greek text-5xl font-semibold text-bright leading-none mb-1">
              {Number(PRICE).toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-sm text-soft mb-7">единоразово · доступ навсегда</div>
            <ul className="space-y-3 mb-8 flex-1">
              {['Все 5 модулей (36 уроков)', '200+ интерактивных упражнений', 'Личный кабинет и прогресс', 'Словарь и справочные таблицы', 'Поддержка преподавателя', 'Сертификат об окончании'].map(f=>(
                <li key={f} className="flex items-start gap-2.5 text-sm text-textc"><span className="text-tealb mt-0.5">✓</span>{f}</li>
              ))}
            </ul>
            <Link href="/auth/register" className="w-full py-3 rounded-xl text-sm font-bold bg-gold text-night hover:bg-goldl transition-all hover:shadow-[0_4px_20px_rgba(212,168,67,.3)] text-center block">
              Записаться на курс
            </Link>
          </div>

          {/* Group */}
          <div className="p-8 rounded-3xl bg-card border border-rim flex flex-col">
            <div className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">Группа / Семинария</div>
            <div className="font-greek text-4xl font-semibold text-bright leading-none mb-1">Свой</div>
            <div className="text-sm text-soft mb-7">тариф для команд от 5 чел.</div>
            <ul className="space-y-3 mb-8 flex-1">
              {['От 5 студентов', 'Панель администратора', 'Аналитика по группе', 'Персональные созвоны', 'Счёт для организации'].map(f=>(
                <li key={f} className="flex items-start gap-2.5 text-sm text-textc"><span className="text-tealb mt-0.5">✓</span>{f}</li>
              ))}
            </ul>
            <a href="mailto:hello@koine-greek.ru" className="w-full py-3 rounded-xl text-sm font-semibold border border-rim text-textc hover:border-gold hover:text-gold transition-colors text-center block">
              Связаться с нами
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-muted mt-8">🛡️ 30-дневная гарантия возврата средств</p>
      </div>
    </section>
  )
}

// ── FOOTER ─────────────────────────────────────
export function Footer() {
  return (
    <footer className="border-t border-rim py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="font-greek text-xl font-semibold text-gold mb-3">Κοινή Greek</div>
            <p className="text-sm text-muted leading-relaxed">Курс библейского греческого для тех, кто хочет читать Новый Завет в оригинале.</p>
          </div>
          {[
            { title: 'Курс', links: [['Программа','/course'],['Пробный урок','/lesson/1-1'],['Тарифы','/#pricing']] },
            { title: 'Студентам', links: [['Личный кабинет','/dashboard'],['Словарь','/vocabulary'],['Блог','/blog']] },
            { title: 'Помощь', links: [['FAQ','/faq'],['Возврат средств','/refund'],['Контакты','/contact']] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold text-bright uppercase tracking-wider mb-4">{col.title}</h4>
              <div className="space-y-2">
                {col.links.map(([label, href]) => (
                  <a key={label} href={href} className="block text-sm text-muted hover:text-textc transition-colors">{label}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-between items-center pt-6 border-t border-rim gap-4">
          <span className="text-xs text-muted">© 2025 Κοινή Greek. Все права защищены.</span>
          <span className="font-greek text-lg italic text-gold/30">ἐν ἀρχῇ ἦν ὁ λόγος</span>
        </div>
      </div>
    </footer>
  )
}

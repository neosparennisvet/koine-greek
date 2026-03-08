import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,168,67,.12),transparent)]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(91,110,245,.07),transparent)]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-greek text-[320px] font-bold italic text-[rgba(212,168,67,.035)] leading-none tracking-[-16px]">ΚΟΙΝΗ</span>
      </div>
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/25 bg-gold/10 text-goldl text-sm font-medium mb-8">
          <span className="text-[10px]">✦</span>
          Библейский греческий · Койне
        </div>
        <h1 className="font-greek text-[clamp(52px,9vw,108px)] font-light leading-[1.0] text-bright mb-4">
          Читай Новый Завет<br />в <em className="italic text-gold font-normal">оригинале</em>
        </h1>
        <p className="font-greek text-[clamp(22px,3.5vw,42px)] font-light italic text-soft tracking-[3px] mb-8">
          ἐν ἀρχῇ ἦν ὁ λόγος
        </p>
        <p className="text-lg leading-relaxed text-soft max-w-xl mb-12">
          Полный курс от алфавита до свободного чтения Нового Завета.
          5 модулей, 36 уроков, интерактивные упражнения, личный кабинет.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/course" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-semibold bg-gold text-night hover:bg-goldl transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(212,168,67,.35)]">
            Смотреть программу <span>→</span>
          </Link>
          <Link href="/course" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-base font-medium border border-rim text-textc hover:border-soft transition-all">
            Попробовать урок бесплатно
          </Link>
        </div>
        <div className="flex gap-12 mt-20 flex-wrap justify-center">
          {[['5','Модулей'],['36','Уроков'],['200+','Упражнений'],['∞','Доступ']].map(([num,label]) => (
            <div key={label} className="text-center">
              <div className="font-greek text-[42px] font-semibold text-gold leading-none mb-1">{num}</div>
              <div className="text-xs font-semibold uppercase tracking-widest text-muted">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

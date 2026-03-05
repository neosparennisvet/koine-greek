import type { CourseModule } from '@/types'

// ═══════════════════════════════════════════════
// Полная структура курса
// Контент уроков добавляется в /lib/lessons/
// ═══════════════════════════════════════════════

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: 'Введение',
    description: 'Знакомство с историей греческого языка, методикой обучения, алфавитом и базовой фонетикой.',
    lessons: [
      { id: '1-1', moduleId: 1, order: 1, title: 'Греческий язык и его история',        duration: '18 мин', isFree: true },
      { id: '1-2', moduleId: 1, order: 2, title: 'Как изучать греческий язык',           duration: '22 мин', isFree: true },
      { id: '1-3', moduleId: 1, order: 3, title: 'Алфавит и произношение',               duration: '35 мин', isFree: true },
      { id: '1-4', moduleId: 1, order: 4, title: 'Пунктуация и деление на слоги',        duration: '20 мин', isFree: true },
    ],
  },
  {
    id: 2,
    title: 'Система именных частей речи',
    description: 'Существительные, падежи, артикль, прилагательные и местоимения греческого языка.',
    lessons: [
      { id: '2-1', moduleId: 2, order: 1,  title: 'Знакомство с именами существительными',          duration: '25 мин', isFree: false },
      { id: '2-2', moduleId: 2, order: 2,  title: 'Именительный и винительный падеж. Артикль',       duration: '45 мин', isFree: false },
      { id: '2-3', moduleId: 2, order: 3,  title: 'Родительный и дательный падеж',                   duration: '40 мин', isFree: false },
      { id: '2-4', moduleId: 2, order: 4,  title: 'Предлоги. Глагол εἰμί',                           duration: '38 мин', isFree: false },
      { id: '2-5', moduleId: 2, order: 5,  title: 'Имена прилагательные',                            duration: '42 мин', isFree: false },
      { id: '2-6', moduleId: 2, order: 6,  title: 'Третье склонение',                                duration: '50 мин', isFree: false },
      { id: '2-7', moduleId: 2, order: 7,  title: 'Личные местоимения первого и второго лиц',        duration: '30 мин', isFree: false },
      { id: '2-8', moduleId: 2, order: 8,  title: 'αὐτός',                                           duration: '28 мин', isFree: false },
      { id: '2-9', moduleId: 2, order: 9,  title: 'Указательные местоимения',                        duration: '32 мин', isFree: false },
      { id: '2-10', moduleId: 2, order: 10, title: 'Относительные местоимения',                      duration: '35 мин', isFree: false },
    ],
  },
  {
    id: 3,
    title: 'Система глаголов изъявительного наклонения',
    description: 'Все временны́е формы и залоги греческого глагола в изъявительном наклонении.',
    lessons: [
      { id: '3-1',  moduleId: 3, order: 1,  title: 'Введение в глаголы',                                    duration: '30 мин', isFree: false },
      { id: '3-2',  moduleId: 3, order: 2,  title: 'Настоящее время действительного залога',                duration: '45 мин', isFree: false },
      { id: '3-3',  moduleId: 3, order: 3,  title: 'Слитные глаголы',                                       duration: '40 мин', isFree: false },
      { id: '3-4',  moduleId: 3, order: 4,  title: 'Настоящее время среднего/страдательного залога',        duration: '42 мин', isFree: false },
      { id: '3-5',  moduleId: 3, order: 5,  title: 'Будущее время действительного/среднего залога',         duration: '48 мин', isFree: false },
      { id: '3-6',  moduleId: 3, order: 6,  title: 'Корни глаголов. Другие формы будущего времени',         duration: '44 мин', isFree: false },
      { id: '3-7',  moduleId: 3, order: 7,  title: 'Имперфект',                                             duration: '50 мин', isFree: false },
      { id: '3-8',  moduleId: 3, order: 8,  title: 'Второй аорист действительного/среднего залога',         duration: '55 мин', isFree: false },
      { id: '3-9',  moduleId: 3, order: 9,  title: 'Первый аорист действительного/среднего залога',         duration: '52 мин', isFree: false },
      { id: '3-10', moduleId: 3, order: 10, title: 'Аорист и будущее время страдательного залога',          duration: '48 мин', isFree: false },
      { id: '3-11', moduleId: 3, order: 11, title: 'Перфект',                                               duration: '60 мин', isFree: false },
    ],
  },
  {
    id: 4,
    title: 'Причастия',
    description: 'Все типы причастий греческого языка: обстоятельственные, адъективные, перфектные.',
    lessons: [
      { id: '4-1', moduleId: 4, order: 1, title: 'Введение в причастия',                                      duration: '35 мин', isFree: false },
      { id: '4-2', moduleId: 4, order: 2, title: 'Обстоятельственные причастия настоящего времени',           duration: '50 мин', isFree: false },
      { id: '4-3', moduleId: 4, order: 3, title: 'Обстоятельственные причастия аориста',                      duration: '48 мин', isFree: false },
      { id: '4-4', moduleId: 4, order: 4, title: 'Адъективные причастия',                                     duration: '42 мин', isFree: false },
      { id: '4-5', moduleId: 4, order: 5, title: 'Причастия перфекта. Самостоятельный родительный падеж',     duration: '55 мин', isFree: false },
    ],
  },
  {
    id: 5,
    title: 'Неизъявительные формы глаголов и глаголы на μι',
    description: 'Сослагательное, повелительное наклонение, инфинитив и глаголы нетематического спряжения.',
    lessons: [
      { id: '5-1', moduleId: 5, order: 1, title: 'Сослагательное наклонение',                                 duration: '48 мин', isFree: false },
      { id: '5-2', moduleId: 5, order: 2, title: 'Инфинитив',                                                 duration: '45 мин', isFree: false },
      { id: '5-3', moduleId: 5, order: 3, title: 'Повелительное наклонение',                                  duration: '40 мин', isFree: false },
      { id: '5-4', moduleId: 5, order: 4, title: 'Изъявительное наклонение δίδωμι',                           duration: '52 мин', isFree: false },
      { id: '5-5', moduleId: 5, order: 5, title: 'Неизъявительные формы δίδωμι. Условные предложения',        duration: '58 мин', isFree: false },
      { id: '5-6', moduleId: 5, order: 6, title: 'ἵστημι, τίθημι, δείκνυμι. Разные мелочи',                  duration: '55 мин', isFree: false },
    ],
  },
]

// ── Утилиты ────────────────────────────────────
export function getAllLessons() {
  return COURSE_MODULES.flatMap(m => m.lessons)
}

export function getLessonById(id: string) {
  return getAllLessons().find(l => l.id === id) ?? null
}

export function getModuleByLessonId(lessonId: string) {
  return COURSE_MODULES.find(m => m.lessons.some(l => l.id === lessonId)) ?? null
}

export function getAdjacentLessons(lessonId: string) {
  const all = getAllLessons()
  const idx = all.findIndex(l => l.id === lessonId)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}

export const TOTAL_LESSONS = getAllLessons().length  // 36

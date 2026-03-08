// ═══════════════════════════════════════════════
// Типы данных проекта
// ═══════════════════════════════════════════════

// ── База данных ────────────────────────────────
export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'admin'
  has_access: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  yookassa_id: string | null
  amount: number
  currency: string
  status: 'pending' | 'succeeded' | 'canceled' | 'refunded'
  created_at: string
}

export interface LessonProgress {
  id: string
  user_id: string
  lesson_id: string
  completed: boolean
  score: number | null
  time_spent: number
  completed_at: string | null
  updated_at: string
}

// ── Контент курса ──────────────────────────────
export interface CourseLesson {
  id: string            // e.g. "1-1", "2-3"
  moduleId: number
  order: number
  title: string
  duration: string      // e.g. "45 мин"
  isFree: boolean
  content?: LessonContent
}

export interface CourseModule {
  id: number
  title: string
  description: string
  lessons: CourseLesson[]
}

export interface LessonContent {
  sections: LessonSection[]
  exercises: Exercise[]
  vocabulary: VocabWord[]
}

export type LessonSection =
  | { type: 'text';      body: string }
  | { type: 'heading2';  text: string }
  | { type: 'heading3';  text: string }
  | { type: 'infobox';   variant: 'gold'|'teal'|'rose'; label: string; body: string }
  | { type: 'anatomy';   word: string; stem: string; ending: string; stemLabel: string; endingLabel: string }
  | { type: 'table';     headers: string[]; rows: string[][] }
  | { type: 'paradigm';  data: ParadigmData }

export interface ParadigmData {
  title: string
  columns: string[]
  rows: Array<{ label: string; cells: string[] }>
}

export type Exercise =
  | { type: 'morphology'; items: MorphItem[] }
  | { type: 'translation'; items: TransItem[] }

export interface MorphItem {
  form: string
  case_: string
  number: string
  gender: string
  lexical: string
  meaning: string
}

export interface TransItem {
  greek: string
  hint: string
  answer: string
}

export interface VocabWord {
  greek: string
  transliteration: string
  meaning: string
  frequency: number
}

// ── API ────────────────────────────────────────
export interface ApiResponse<T = void> {
  data?: T
  error?: string
}

export interface PaymentCreateRequest {
  userId: string
}

export interface PaymentCreateResponse {
  confirmationUrl: string
  orderId: string
}

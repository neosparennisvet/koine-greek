// Автогенерируемые типы для Supabase
// Обновить командой: npx supabase gen types typescript --project-id <id> > lib/database.types.ts

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          role: 'student' | 'admin'
          has_access: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          role?: 'student' | 'admin'
          has_access?: boolean
        }
        Update: {
          full_name?: string | null
          avatar_url?: string | null
          has_access?: boolean
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          yookassa_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'succeeded' | 'canceled' | 'refunded'
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          yookassa_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'succeeded' | 'canceled' | 'refunded'
        }
        Update: {
          status?: 'pending' | 'succeeded' | 'canceled' | 'refunded'
          yookassa_id?: string | null
        }
      }
      lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          score: number | null
          time_spent: number
          completed_at: string | null
          updated_at: string
        }
        Insert: {
          user_id: string
          lesson_id: string
          completed?: boolean
          score?: number | null
          time_spent?: number
          completed_at?: string | null
        }
        Update: {
          completed?: boolean
          score?: number | null
          time_spent?: number
          completed_at?: string | null
        }
      }
    }
  }
}

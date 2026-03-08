// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json() as {
      lessonId?: string
      completed?: boolean
      score?: number
      timeSpent?: number
    }
    const { lessonId, completed, score, timeSpent } = body
    if (!lessonId) return NextResponse.json({ error: 'lessonId required' }, { status: 400 })

    const { error } = await supabase.from('lesson_progress').upsert({
      user_id:     user.id,
      lesson_id:   lessonId,
      completed:   completed ?? false,
      score:       score ?? null,
      time_spent:  timeSpent ?? 0,
      completed_at: completed ? new Date().toISOString() : null,
    }, { onConflict: 'user_id,lesson_id' })

    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

export async function GET() {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data } = await supabase.from('lesson_progress').select('*').eq('user_id', user.id)
  return NextResponse.json({ data })
}

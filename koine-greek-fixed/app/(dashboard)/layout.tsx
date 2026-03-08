// @ts-nocheck
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { getAllLessons } from '@/lib/course-data'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  // Find the last lesson user should continue from
  const { data: rawProgress } = await supabase
    .from('lesson_progress').select('lesson_id, completed').eq('user_id', user.id)
  const completedIds = new Set(
    ((rawProgress as any[]) ?? []).filter((p: any) => p.completed).map((p: any) => p.lesson_id)
  )
  const allLessons = getAllLessons()
  // Find first incomplete lesson, or first lesson if none completed
  const continueLessonId = allLessons.find(l => !completedIds.has(l.id))?.id ?? allLessons[0]?.id ?? '1-1'

  return (
    <div className="flex min-h-screen bg-night">
      <DashboardSidebar profile={profile} continueLessonId={continueLessonId} />
      <main className="flex-1 min-h-screen dashboard-main">
        {children}
      </main>
    </div>
  )
}

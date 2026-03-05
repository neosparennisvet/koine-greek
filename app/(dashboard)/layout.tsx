// @ts-nocheck
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('*').eq('id', user.id).single()

  return (
    <div className="flex min-h-screen bg-night">
      <DashboardSidebar profile={profile} />
      {/* На уроках sidebar скрыт — убираем отступ через CSS-переменную */}
      <main className="flex-1 min-h-screen dashboard-main">
        {children}
      </main>
    </div>
  )
}

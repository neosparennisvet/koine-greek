// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound, redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getLessonById, getAdjacentLessons, getModuleByLessonId, COURSE_MODULES } from '@/lib/course-data'
import { LessonSidebar } from '@/components/lesson/LessonSidebar'
import { LessonContent } from '@/components/lesson/LessonContent'
import type { Metadata } from 'next'

interface Props { params: { id: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLessonById(params.id)
  return { title: lesson?.title ?? 'Урок' }
}

export default async function LessonPage({ params }: Props) {
  const lesson = getLessonById(params.id)
  if (!lesson) notFound()

  const supabase = createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles').select('has_access').eq('id', user.id).single()

  if (!lesson.isFree && !(profile as any)?.has_access) redirect('/checkout')

  const { data: rawProgress } = await supabase
    .from('lesson_progress').select('lesson_id, completed').eq('user_id', user.id)

  const rows = (rawProgress as any[]) ?? []
  const completedIds = new Set(
    rows.filter((p: any) => p.completed).map((p: any) => p.lesson_id as string)
  )

  const { prev, next } = getAdjacentLessons(lesson.id)
  const module_ = getModuleByLessonId(lesson.id)

  return (
    <div className="flex min-h-screen">
      <LessonSidebar
        modules={COURSE_MODULES}
        currentLessonId={lesson.id}
        completedIds={completedIds}
        totalLessons={36}
        doneLessons={completedIds.size}
      />
      <div className="ml-[300px] flex-1 p-10 max-w-[900px]">
        <LessonContent
          lesson={lesson}
          module={module_}
          userId={user.id}
          prev={prev}
          next={next}
          isCompleted={completedIds.has(lesson.id)}
        />
      </div>
    </div>
  )
}

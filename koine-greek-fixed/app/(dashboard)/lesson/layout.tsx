// Lesson pages have their own full-width layout (no dashboard sidebar)
// We use the .lesson-layout class to reset the dashboard-main margin
export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return <div className="lesson-layout bg-night min-h-screen">{children}</div>
}

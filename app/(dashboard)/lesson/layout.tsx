// Lesson pages have their own full-width layout (no dashboard sidebar)
export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-night min-h-screen">{children}</div>
}

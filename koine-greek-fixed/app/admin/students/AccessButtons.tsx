'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function GrantAccessButton({ userId }: { userId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function grant() {
    setLoading(true)
    await fetch('/api/admin/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, grant: true }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={grant} disabled={loading}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-green-400/10 text-green-400 border border-green-400/30 hover:bg-green-400/20 transition-colors disabled:opacity-50">
      {loading ? '...' : '✓ Выдать доступ'}
    </button>
  )
}

export function RevokeAccessButton({ userId }: { userId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function revoke() {
    if (!confirm('Забрать доступ к курсу?')) return
    setLoading(true)
    await fetch('/api/admin/access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, grant: false }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <button onClick={revoke} disabled={loading}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose/10 text-rose border border-rose/30 hover:bg-rose/20 transition-colors disabled:opacity-50">
      {loading ? '...' : '✕ Забрать'}
    </button>
  )
}

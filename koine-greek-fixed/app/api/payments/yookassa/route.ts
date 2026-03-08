// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient, createAdminClient } from '@/lib/supabase-server'
import { v4 as uuidv4 } from 'uuid'

const YOOKASSA_API = 'https://api.yookassa.ru/v3'

// ── Создать платёж ─────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const shopId    = process.env.YOOKASSA_SHOP_ID!
    const secretKey = process.env.YOOKASSA_SECRET_KEY!
    const siteUrl   = process.env.NEXT_PUBLIC_SITE_URL!
    const amount    = process.env.NEXT_PUBLIC_COURSE_PRICE_RUB ?? '14900'

    const idempotenceKey = uuidv4()

    // Создаём заказ в БД
    const admin = createAdminClient()
    const { data: order, error: orderErr } = await admin.from('orders').insert({
      user_id:  user.id,
      amount:   Number(amount) * 100,  // храним в копейках
      currency: 'RUB',
      status:   'pending',
    }).select().single()

    if (orderErr) throw orderErr

    // Запрос к ЮКассе
    const body = {
      amount:       { value: amount, currency: 'RUB' },
      confirmation: { type: 'redirect', return_url: `${siteUrl}/payment/success?order=${order.id}` },
      capture:      true,
      description:  `Курс "Библейский греческий" — ${user.email}`,
      metadata:     { orderId: order.id, userId: user.id },
    }

    const resp = await fetch(`${YOOKASSA_API}/payments`, {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'Idempotence-Key': idempotenceKey,
        'Authorization':  'Basic ' + Buffer.from(`${shopId}:${secretKey}`).toString('base64'),
      },
      body: JSON.stringify(body),
    })

    if (!resp.ok) {
      const err = await resp.json()
      throw new Error(err.description ?? 'YooKassa error')
    }

    const payment = await resp.json()

    // Сохраняем yookassa_id
    await admin.from('orders').update({ yookassa_id: payment.id }).eq('id', order.id)

    return NextResponse.json({
      confirmationUrl: payment.confirmation.confirmation_url,
      orderId: order.id,
    })
  } catch (e: unknown) {
    console.error('Payment error:', e)
    const msg = e instanceof Error ? e.message : "Payment error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

// ── Webhook от ЮКассы ──────────────────────────
export async function PUT(req: NextRequest) {
  try {
    const event = await req.json()
    if (event.event !== 'payment.succeeded') {
      return NextResponse.json({ ok: true })
    }

    const payment  = event.object
    const orderId  = payment.metadata?.orderId
    const userId   = payment.metadata?.userId
    if (!orderId || !userId) return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })

    const admin = createAdminClient()

    // Обновляем статус заказа
    await admin.from('orders').update({ status: 'succeeded' }).eq('id', orderId)

    // Открываем доступ к курсу
    await admin.from('profiles').update({ has_access: true }).eq('id', userId)

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Payment error"
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}

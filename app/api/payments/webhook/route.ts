import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.text()
        // For now just log the webhook payload. In production persist to `payment_webhooks` and verify signature.
        // You can enhance this handler to verify headers and process events (payment.created, payment.updated).
        // Example header: request.headers.get('x-mercadopago-signature')
        console.log('[MP WEBHOOK] payload:', body)
        return NextResponse.json({ ok: true })
    } catch (err: any) {
        return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
    }
}

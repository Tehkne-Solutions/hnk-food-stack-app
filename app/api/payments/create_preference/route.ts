import { NextResponse } from 'next/server'
import { createPreference } from '../../../../src/services/mercadopago'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const items = body.items
        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json({ error: 'items is required' }, { status: 400 })
        }

        const pref = await createPreference(items)
        return NextResponse.json({ preference: pref })
    } catch (err: any) {
        return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
    }
}

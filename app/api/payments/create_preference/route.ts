import { NextResponse } from 'next/server'

/**
 * Mock endpoint para criar preferência Mercado Pago
 * Será habilitado quando o pacote @mercadopago/sdk-nodejs estiver instalado
 */

export async function POST(request: Request) {
    try {
        const body = await request.json() as { items?: unknown[] }
        const items = body.items

        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: 'items is required' },
                { status: 400 }
            )
        }

        // Mock response
        const mockPreferenceId = 'MOCK-PREF-' + Date.now()

        return NextResponse.json({
            preference: {
                id: mockPreferenceId,
                init_point: `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${mockPreferenceId}`,
                sandbox_init_point: `https://sandbox.mercadopago.com.br/checkout/v1/redirect?preference-id=${mockPreferenceId}`,
                items,
            },
        })
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}

/**
 * 🧠 API Endpoint para rastreamento de carrinho abandonado
 * Recebe dados via sendBeacon() do cliente
 */

import { NextRequest, NextResponse } from 'next/server'
import { trackAbandonedCart } from '@/actions/recovery-actions'

export async function POST(request: NextRequest) {
    try {
        const contentType = request.headers.get('content-type')

        let data: {
            org_id: string
            items: any[]
            total: number
            timestamp: string
        }

        // sendBeacon() envia como Blob, não JSON
        if (contentType?.includes('application/json')) {
            data = await request.json()
        } else {
            const text = await request.text()
            data = JSON.parse(text)
        }

        const { org_id, items, total, timestamp } = data

        // Validação básica
        if (!org_id || !items || items.length === 0 || !total) {
            return NextResponse.json(
                { error: 'Dados incompletos' },
                { status: 400 }
            )
        }

        // Extrair dados do cliente se disponível
        const userAgent = request.headers.get('user-agent')
        const ip = request.headers.get('x-forwarded-for') || 'unknown'

        // Rastrear abandono
        const result = await trackAbandonedCart(
            org_id,
            null, // customer_id será null até login
            'Guest', // customer_name padrão
            '', // customer_phone vazio por enquanto
            null, // customer_email
            items,
            total
        )

        if (!result.success) {
            throw new Error(result.error || 'Falha ao rastrear carrinho')
        }

        console.log(`✅ Carrinho abandonado rastreado: ${result.cartId}`)

        return NextResponse.json(
            {
                success: true,
                cartId: result.cartId,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('❌ Erro ao processar abandono:', error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

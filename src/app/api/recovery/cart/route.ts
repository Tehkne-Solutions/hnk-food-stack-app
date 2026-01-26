/**
 * 🧠 API para obter dados de carrinho abandonado
 * GET /api/recovery/cart?cartId=xxx&orgId=yyy
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClientInstance } from '@/lib/supabase'

const supabase = createClientInstance()!

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const cartId = searchParams.get('cartId')
        const orgId = searchParams.get('orgId')

        if (!cartId || !orgId) {
            return NextResponse.json(
                { error: 'cartId e orgId são obrigatórios' },
                { status: 400 }
            )
        }

        // Buscar carrinho
        const { data: cart, error } = await supabase
            .from('abandoned_carts')
            .select('*')
            .eq('id', cartId)
            .eq('org_id', orgId)
            .single()

        if (error || !cart) {
            return NextResponse.json(
                { error: 'Carrinho não encontrado' },
                { status: 404 }
            )
        }

        // Verificar se carrinho expirou (mais de 7 dias)
        const createdAt = new Date(cart.created_at)
        const now = new Date()
        const daysOld = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)

        if (daysOld > 7) {
            return NextResponse.json(
                { error: 'Carrinho expirou (mais de 7 dias)' },
                { status: 410 }
            )
        }

        return NextResponse.json(
            {
                success: true,
                cart,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('❌ Erro ao buscar carrinho:', error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

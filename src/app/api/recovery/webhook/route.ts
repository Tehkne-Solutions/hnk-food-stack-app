/**
 * 🧠 Webhook para receber eventos de n8n (Recovery Brain)
 * n8n dispara eventos de checkout/compra para completar ciclo
 */

import { NextRequest, NextResponse } from 'next/server'
import { markCartRecovered } from '@/actions/recovery-actions'

/**
 * POST /api/recovery/webhook
 * Recebe eventos de n8n:
 * - cart.recovered: Compra realizada via recovery link
 * - customer.data: Dados do cliente para próximas mensagens
 */
export async function POST(request: NextRequest) {
    try {
        const data = await request.json()

        const { event, cart_id, org_id, order_id, customer_data } = data

        // Validação
        if (!event || !cart_id || !org_id) {
            return NextResponse.json(
                { error: 'Campos obrigatórios faltando' },
                { status: 400 }
            )
        }

        switch (event) {
            case 'cart.recovered':
                // Usuário finalizou compra via recovery link
                if (!order_id) {
                    return NextResponse.json(
                        { error: 'order_id obrigatório para cart.recovered' },
                        { status: 400 }
                    )
                }

                const recoverResult = await markCartRecovered(
                    cart_id,
                    org_id,
                    order_id
                )

                if (!recoverResult.success) {
                    throw new Error(recoverResult.error)
                }

                console.log(`✅ Carrinho recuperado: ${cart_id} → Pedido: ${order_id}`)

                return NextResponse.json(
                    {
                        success: true,
                        message: 'Carrinho marcado como recuperado',
                    },
                    { status: 200 }
                )

            case 'customer.data':
                // n8n envia dados do cliente para futuras mensagens
                console.log(`📞 Dados do cliente recebidos:`, customer_data)

                // TODO: Atualizar abandoned_carts com dados do cliente
                // Para melhorar próximas mensagens de recovery

                return NextResponse.json(
                    {
                        success: true,
                        message: 'Dados do cliente registrados',
                    },
                    { status: 200 }
                )

            default:
                return NextResponse.json(
                    { error: `Evento desconhecido: ${event}` },
                    { status: 400 }
                )
        }
    } catch (error) {
        console.error('❌ Erro ao processar webhook de recovery:', error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

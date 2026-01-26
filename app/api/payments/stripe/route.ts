/**
 * @name Stripe Payment Intent API Route
 * @description Handle Stripe payment intent creation
 * @route POST /api/payments/stripe
 */

import { NextRequest, NextResponse } from 'next/server'
import { processCardPayment } from '@/lib/payment-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        const {
            amount,
            cardData,
            orderId,
        } = body

        // Validação básica
        if (!amount || !cardData || !orderId) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: amount, cardData, orderId',
            }, { status: 400 })
        }

        // Processar pagamento via Stripe (mock ou real)
        const result = await processCardPayment(orderId, amount, cardData)

        if (result.success) {
            return NextResponse.json(result, { status: 200 })
        } else {
            return NextResponse.json(result, { status: 400 })
        }
    } catch (error) {
        console.error('Stripe payment error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 })
    }
}

/**
 * @name Stripe Payment Status API Route
 * @description Check payment intent status
 * @route GET /api/payments/stripe?id=payment_intent_id
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const paymentId = searchParams.get('id')

        if (!paymentId) {
            return NextResponse.json({
                success: false,
                error: 'Payment ID is required',
            }, { status: 400 })
        }

        // Em modo mock, sempre retorna sucesso
        // Em modo real, buscaria status do Stripe
        const isProduction = !!process.env.STRIPE_SECRET_KEY

        if (isProduction) {
            // Aqui você implementaria a chamada real à API do Stripe
            return NextResponse.json({
                success: true,
                paymentId,
                status: 'succeeded',
                message: 'Real Stripe implementation would check status here',
            }, { status: 200 })
        } else {
            // Mock: sempre retorna sucesso
            return NextResponse.json({
                success: true,
                paymentId,
                status: 'succeeded',
                message: '[MOCK MODE] Payment status check',
            }, { status: 200 })
        }
    } catch (error) {
        console.error('Payment status check error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 })
    }
}

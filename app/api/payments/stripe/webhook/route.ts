/**
 * @name Stripe Webhook Handler
 * @description Handle Stripe webhook events (payment_intent.succeeded, payment_intent.payment_failed, etc)
 * @route POST /api/payments/stripe/webhook
 */

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const event = body

        console.log('📩 Stripe webhook received:', event.type)

        // Verificação de autenticidade do webhook (implementar assinatura Stripe em produção)
        // const sig = request.headers.get('stripe-signature')
        // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
        // Aqui você faria a validação com stripe.webhooks.constructEvent()

        switch (event.type) {
            case 'payment_intent.succeeded': {
                const paymentIntent = event.data.object
                console.log('✅ Payment succeeded:', paymentIntent.id)

                // Aqui você atualizaria o pedido no banco de dados
                // await updateOrderStatus(paymentIntent.metadata.orderId, 'paid')
                // await sendOrderConfirmationEmail(paymentIntent.metadata.orderId)

                return NextResponse.json(
                    { received: true, message: 'Payment processed successfully' },
                    { status: 200 }
                )
            }

            case 'payment_intent.payment_failed': {
                const paymentIntent = event.data.object
                console.log('❌ Payment failed:', paymentIntent.id)

                // Aqui você marcaria o pedido como falho
                // await updateOrderStatus(paymentIntent.metadata.orderId, 'failed')

                return NextResponse.json(
                    { received: true, message: 'Payment failure processed' },
                    { status: 200 }
                )
            }

            case 'charge.refunded': {
                const charge = event.data.object
                console.log('💰 Charge refunded:', charge.id)

                // Aqui você processaria o reembolso
                // await updateOrderStatus(charge.metadata.orderId, 'refunded')

                return NextResponse.json(
                    { received: true, message: 'Refund processed' },
                    { status: 200 }
                )
            }

            default: {
                console.log('⚠️ Unhandled event type:', event.type)
                return NextResponse.json(
                    { received: true, message: 'Event received but not processed' },
                    { status: 200 }
                )
            }
        }
    } catch (error) {
        console.error('Webhook error:', error)
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Internal server error',
            },
            { status: 500 }
        )
    }
}

/**
 * Handle GET requests (Stripe sometimes tests with GET)
 */
export async function GET() {
    return NextResponse.json({
        message: 'Stripe webhook endpoint. Use POST to send events.',
    })
}

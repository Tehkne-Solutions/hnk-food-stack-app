/**
 * @name PIX Payment API Route
 * @description Handle PIX payment generation and status checking
 * @route POST /api/payments/pix
 */

import { NextRequest, NextResponse } from 'next/server'
import { generatePixQRCode, checkPixPaymentStatus } from '@/lib/payment-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { amount, orderId } = body

        if (!amount || !orderId) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: amount, orderId',
            }, { status: 400 })
        }

        // Gerar QR Code PIX
        const pixData = generatePixQRCode(orderId, amount)

        return NextResponse.json({
            success: true,
            orderId,
            amount,
            method: 'pix',
            pixData,
            expiresIn: 3600, // 1 hora em segundos
            message: 'PIX QR Code generated. User has 1 hour to pay.',
        }, { status: 200 })
    } catch (error) {
        console.error('PIX payment error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 })
    }
}

/**
 * @name PIX Payment Status
 * @description Check PIX payment status
 * @route GET /api/payments/pix?orderId=order_id
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const orderId = searchParams.get('orderId')

        if (!orderId) {
            return NextResponse.json({
                success: false,
                error: 'orderId is required',
            }, { status: 400 })
        }

        // Verificar status do PIX
        const status = await checkPixPaymentStatus(orderId)

        return NextResponse.json({
            success: true,
            orderId,
            status,
            message: status === 'paid' ? 'Payment confirmed!' : 'Waiting for payment...',
        }, { status: 200 })
    } catch (error) {
        console.error('PIX status check error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 })
    }
}

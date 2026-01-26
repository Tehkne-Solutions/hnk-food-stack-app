/**
 * @name WhatsApp Send API Route
 * @description Handle WhatsApp message sending
 * @route POST /api/notifications/whatsapp
 */

import { NextRequest, NextResponse } from 'next/server'
import {
    sendOrderConfirmation,
    sendPreparingNotification,
    sendOnTheWayNotification,
    sendDeliveredNotification,
    sendReceiptImage,
} from '@/lib/whatsapp-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const {
            type, // 'order_confirmed', 'preparing', 'on_the_way', 'delivered'
            phone,
            orderId,
            customerName,
            total,
            estimatedDelivery,
            deliveryTime,
            receiptImageUrl,
        } = body

        // Validação básica
        if (!type || !phone || !orderId || !customerName) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields: type, phone, orderId, customerName',
            }, { status: 400 })
        }

        let result

        switch (type) {
            case 'order_confirmed':
                if (!total || !estimatedDelivery) {
                    return NextResponse.json({
                        success: false,
                        error: 'Missing fields for order_confirmed: total, estimatedDelivery',
                    }, { status: 400 })
                }
                result = await sendOrderConfirmation(
                    phone,
                    orderId,
                    customerName,
                    total,
                    estimatedDelivery
                )
                break

            case 'preparing':
                result = await sendPreparingNotification(phone, orderId, customerName)
                break

            case 'on_the_way':
                if (!deliveryTime) {
                    return NextResponse.json({
                        success: false,
                        error: 'Missing field for on_the_way: deliveryTime',
                    }, { status: 400 })
                }
                result = await sendOnTheWayNotification(
                    phone,
                    orderId,
                    customerName,
                    deliveryTime
                )
                break

            case 'delivered':
                result = await sendDeliveredNotification(phone, orderId, customerName)
                break

            case 'receipt_image':
                if (!receiptImageUrl) {
                    return NextResponse.json({
                        success: false,
                        error: 'Missing field for receipt_image: receiptImageUrl',
                    }, { status: 400 })
                }
                result = await sendReceiptImage(phone, orderId, receiptImageUrl)
                break

            default:
                return NextResponse.json({
                    success: false,
                    error: `Unknown notification type: ${type}`,
                }, { status: 400 })
        }

        return NextResponse.json(result, {
            status: result.success ? 200 : 400,
        })
    } catch (error) {
        console.error('WhatsApp API error:', error)
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error',
        }, { status: 500 })
    }
}

/**
 * Handle GET requests (health check)
 */
export async function GET() {
    return NextResponse.json({
        message: 'WhatsApp notification endpoint. Use POST to send messages.',
    })
}

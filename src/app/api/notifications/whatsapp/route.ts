import { NextRequest, NextResponse } from 'next/server'
import { sendOrderConfirmation, sendOrderStatusUpdate } from '@/services/notifications/whatsapp'

/**
 * POST /api/notifications/whatsapp
 * Recebe eventos de pedidos e envia notificações via WhatsApp
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { event, phone, order } = body

    // Validar campos obrigatórios
    if (!event || !phone || !order) {
      return NextResponse.json(
        { error: 'Campos obrigatórios faltando: event, phone, order' },
        { status: 400 }
      )
    }

    let result

    switch (event) {
      case 'order_created':
        result = await sendOrderConfirmation(phone, {
          customerId: order.customerId || 'N/A',
          customerName: order.customerName,
          orderId: order.orderId,
          items: order.items || 'Seu pedido',
          total: order.total,
          estimatedDate: order.estimatedDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
          confirmationCode: order.confirmationCode || Math.random().toString(36).substring(7).toUpperCase()
        })
        break

      case 'order_status_changed':
        result = await sendOrderStatusUpdate(phone, {
          customerName: order.customerName,
          orderId: order.orderId,
          newStatus: order.status,
          estimatedDate: order.estimatedDate,
          trackingLink: order.trackingLink
        })
        break

      default:
        return NextResponse.json(
          { error: `Evento não reconhecido: ${event}` },
          { status: 400 }
        )
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        messageId: result.messageId,
        timestamp: result.timestamp
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Erro na rota de notificação WhatsApp:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/notifications/whatsapp
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'WhatsApp Notification API',
    environment: process.env.NODE_ENV,
    n8nConfigured: !!process.env.N8N_WHATSAPP_WEBHOOK
  })
}

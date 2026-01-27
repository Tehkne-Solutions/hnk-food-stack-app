/**
 * Hook para integração com WhatsApp
 * Disparado após confirmação de pagamento
 */

export async function notifyOrderCreated(orderData: {
    customerId: string
    customerName: string
    customerPhone: string
    orderId: string
    items: string
    total: string
    estimatedDate?: string
    paymentMethod: string
}) {
    try {
        const response = await fetch('/api/notifications/whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: 'order_created',
                phone: orderData.customerPhone,
                order: {
                    customerId: orderData.customerId,
                    customerName: orderData.customerName,
                    orderId: orderData.orderId,
                    items: orderData.items,
                    total: orderData.total,
                    estimatedDate: orderData.estimatedDate || new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
                    confirmationCode: Math.random().toString(36).substring(7).toUpperCase()
                }
            })
        })

        if (!response.ok) {
            console.error('Erro ao enviar notificação WhatsApp:', response.statusText)
            return { success: false }
        }

        const data = await response.json()
        console.log('WhatsApp message sent:', data)
        return { success: true, ...data }
    } catch (error) {
        console.error('Erro ao chamar API de notificação:', error)
        return { success: false }
    }
}

export async function notifyOrderStatus(
    customerPhone: string,
    orderData: {
        customerName: string
        orderId: string
        status: 'pendente' | 'preparando' | 'entregue' | 'cancelado'
        estimatedDate?: string
        trackingLink?: string
    }
) {
    try {
        const statusMap: Record<string, string> = {
            pendente: '🕐 Seu pedido foi recebido e está sendo processado',
            preparando: '👨‍🍳 Seu pedido está sendo preparado',
            entregue: '✅ Seu pedido foi entregue',
            cancelado: '❌ Seu pedido foi cancelado'
        }

        const response = await fetch('/api/notifications/whatsapp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                event: 'order_status_changed',
                phone: customerPhone,
                order: {
                    customerName: orderData.customerName,
                    orderId: orderData.orderId,
                    status: statusMap[orderData.status] || orderData.status,
                    estimatedDate: orderData.estimatedDate,
                    trackingLink: orderData.trackingLink
                }
            })
        })

        if (!response.ok) {
            console.error('Erro ao enviar atualização de status:', response.statusText)
            return { success: false }
        }

        const data = await response.json()
        return { success: true, ...data }
    } catch (error) {
        console.error('Erro ao chamar API de status:', error)
        return { success: false }
    }
}

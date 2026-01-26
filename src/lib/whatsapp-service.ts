/**
 * @name WhatsApp Service - Order Notifications
 * @description Integração com WhatsApp Business API para notificações de pedidos
 * @version 1.0
 */

export interface WhatsAppMessage {
    orderId: string
    customerPhone: string
    customerName: string
    orderDetails: {
        items: Array<{ name: string; quantity: number; price: number }>
        total: number
        estimatedDelivery: string
    }
    messageType: 'order_confirmed' | 'preparing' | 'on_the_way' | 'delivered'
}

/**
 * Configuração do WhatsApp
 */
export const WHATSAPP_CONFIG = {
    enabled: !!process.env.WHATSAPP_BUSINESS_PHONE_ID,
    phoneId: process.env.WHATSAPP_BUSINESS_PHONE_ID || 'mock_phone_id',
    accessToken: process.env.WHATSAPP_BUSINESS_ACCESS_TOKEN || 'mock_token',
    businessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID || 'mock_account_id',
    isMockMode: !process.env.WHATSAPP_BUSINESS_ACCESS_TOKEN,
    apiVersion: 'v19.0',
}

/**
 * Envia notificação de pedido confirmado
 */
export async function sendOrderConfirmation(
    phone: string,
    orderId: string,
    customerName: string,
    total: number,
    estimatedDelivery: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const messageText = `
🎉 *Pedido Confirmado!*

Olá ${customerName}! 

Seu pedido #${orderId} foi confirmado com sucesso! 

💰 *Valor Total:* R$ ${total.toFixed(2)}
⏱️ *Entrega Estimada:* ${estimatedDelivery}

Você receberá atualizações em tempo real sobre seu pedido.

_Obrigado por escolher nossa pizzaria!_ 🍕
  `.trim()

    return sendWhatsAppMessage(phone, messageText)
}

/**
 * Envia notificação de pedido em preparação
 */
export async function sendPreparingNotification(
    phone: string,
    orderId: string,
    customerName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const messageText = `
👨‍🍳 *Pedido em Preparação*

Oi ${customerName}! 

Seu pedido #${orderId} está sendo preparado com carinho por nossos chefs! 

Você será notificado quando sair para entrega.
  `.trim()

    return sendWhatsAppMessage(phone, messageText)
}

/**
 * Envia notificação de pedido a caminho
 */
export async function sendOnTheWayNotification(
    phone: string,
    orderId: string,
    customerName: string,
    deliveryTime: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const messageText = `
🚗 *Pedido a Caminho!*

Oi ${customerName}! 

Seu pedido #${orderId} saiu para entrega! 🚴

🕐 *Tempo estimado:* ${deliveryTime}

Fique atento! O entregador chegará em breve.
  `.trim()

    return sendWhatsAppMessage(phone, messageText)
}

/**
 * Envia notificação de pedido entregue
 */
export async function sendDeliveredNotification(
    phone: string,
    orderId: string,
    customerName: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const messageText = `
✅ *Pedido Entregue!*

Oi ${customerName}! 

Seu pedido #${orderId} foi entregue com sucesso! 🎉

Muito obrigado pelo seu pedido! Esperamos vê-lo novamente em breve! 

⭐ *Avalie sua experiência:* [Link para avaliação]
  `.trim()

    return sendWhatsAppMessage(phone, messageText)
}

/**
 * Função interna para enviar mensagem WhatsApp
 */
async function sendWhatsAppMessage(
    recipientPhone: string,
    messageText: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
        // Remover caracteres especiais do telefone e garantir formato internacional
        const cleanPhone = recipientPhone.replace(/\D/g, '')
        const formattedPhone = cleanPhone.startsWith('55')
            ? cleanPhone
            : `55${cleanPhone}`

        // Em modo mock, simular envio
        if (WHATSAPP_CONFIG.isMockMode) {
            console.log('[WHATSAPP-MOCK] Message sent:', {
                to: formattedPhone,
                text: messageText,
                timestamp: new Date().toISOString(),
            })

            return {
                success: true,
                messageId: `wam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            }
        }

        // Em produção, chamar API real do WhatsApp
        const response = await fetch(
            `https://graph.instagram.com/${WHATSAPP_CONFIG.apiVersion}/${WHATSAPP_CONFIG.phoneId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: formattedPhone,
                    type: 'text',
                    text: {
                        preview_url: false,
                        body: messageText,
                    },
                }),
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            console.error('WhatsApp API Error:', errorData)
            return {
                success: false,
                error: errorData.error?.message || 'Failed to send WhatsApp message',
            }
        }

        const data = await response.json()
        return {
            success: true,
            messageId: data.messages[0].id,
        }
    } catch (error) {
        console.error('WhatsApp Send Error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Envia imagem do comprovante via WhatsApp
 */
export async function sendReceiptImage(
    phone: string,
    orderId: string,
    imageUrl: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
        const cleanPhone = phone.replace(/\D/g, '')
        const formattedPhone = cleanPhone.startsWith('55')
            ? cleanPhone
            : `55${cleanPhone}`

        if (WHATSAPP_CONFIG.isMockMode) {
            console.log('[WHATSAPP-MOCK] Image sent:', {
                to: formattedPhone,
                image: imageUrl,
                orderId,
            })

            return {
                success: true,
                messageId: `wam_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            }
        }

        // Em produção, chamar API real do WhatsApp
        const response = await fetch(
            `https://graph.instagram.com/${WHATSAPP_CONFIG.apiVersion}/${WHATSAPP_CONFIG.phoneId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${WHATSAPP_CONFIG.accessToken}`,
                },
                body: JSON.stringify({
                    messaging_product: 'whatsapp',
                    to: formattedPhone,
                    type: 'image',
                    image: {
                        link: imageUrl,
                    },
                }),
            }
        )

        if (!response.ok) {
            const errorData = await response.json()
            return {
                success: false,
                error: errorData.error?.message || 'Failed to send image',
            }
        }

        const data = await response.json()
        return {
            success: true,
            messageId: data.messages[0].id,
        }
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
        }
    }
}

/**
 * Cria template de mensagem personalisada para um pedido
 */
export function createOrderTemplate(order: WhatsAppMessage): string {
    const itemsList = order.orderDetails.items
        .map((item) => `• ${item.name} (${item.quantity}x) - R$ ${item.price.toFixed(2)}`)
        .join('\n')

    return `
📋 *Resumo do Pedido #${order.orderId}*

Olá ${order.customerName}! 

*Itens do Pedido:*
${itemsList}

*Valor Total:* R$ ${order.orderDetails.total.toFixed(2)}
*Entrega Estimada:* ${order.orderDetails.estimatedDelivery}

Obrigado por sua compra! 🍕
  `.trim()
}

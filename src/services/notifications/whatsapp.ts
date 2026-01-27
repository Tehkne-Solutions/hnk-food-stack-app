/**
 * WhatsApp Notification Service
 * Gerencia envio de mensagens via WhatsApp API (n8n/Twilio)
 */

export interface WhatsAppMessage {
  to: string
  templateName: string
  templateParams?: {
    customer_name?: string
    order_id?: string
    order_items?: string
    order_total?: string
    delivery_date?: string
    tracking_link?: string
    confirmation_code?: string
    [key: string]: string | undefined
  }
}

export interface WhatsAppResponse {
  success: boolean
  messageId?: string
  error?: string
  timestamp: string
}

/**
 * Envia mensagem via WhatsApp
 */
export async function sendWhatsAppMessage(
  message: WhatsAppMessage
): Promise<WhatsAppResponse> {
  try {
    // Validar telefone
    if (!message.to || !message.to.replace(/\D/g, '')) {
      return {
        success: false,
        error: 'Telefone inválido',
        timestamp: new Date().toISOString()
      }
    }

    // Formatar telefone: remover caracteres especiais e adicionar código país
    const phoneNumber = `55${message.to.replace(/\D/g, '')}`.slice(0, 13)

    // Chamar n8n webhook
    const n8nWebhookUrl = process.env.N8N_WHATSAPP_WEBHOOK
    if (!n8nWebhookUrl) {
      console.warn('N8N_WHATSAPP_WEBHOOK não configurado')
      return {
        success: false,
        error: 'Webhook n8n não configurado',
        timestamp: new Date().toISOString()
      }
    }

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phoneNumber,
        template: message.templateName,
        params: message.templateParams,
        timestamp: new Date().toISOString()
      })
    })

    if (!response.ok) {
      throw new Error(`n8n returned ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      messageId: data.messageId,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem WhatsApp:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Envia notificação de confirmação de pedido
 */
export async function sendOrderConfirmation(
  phoneNumber: string,
  orderData: {
    customerId: string
    customerName: string
    orderId: string
    items: string
    total: string
    estimatedDate: string
    confirmationCode: string
  }
): Promise<WhatsAppResponse> {
  return sendWhatsAppMessage({
    to: phoneNumber,
    templateName: 'order_confirmation',
    templateParams: {
      customer_name: orderData.customerName,
      order_id: orderData.orderId,
      order_items: orderData.items,
      order_total: orderData.total,
      delivery_date: orderData.estimatedDate,
      confirmation_code: orderData.confirmationCode
    }
  })
}

/**
 * Envia notificação de mudança de status do pedido
 */
export async function sendOrderStatusUpdate(
  phoneNumber: string,
  orderData: {
    customerName: string
    orderId: string
    newStatus: string
    estimatedDate?: string
    trackingLink?: string
  }
): Promise<WhatsAppResponse> {
  return sendWhatsAppMessage({
    to: phoneNumber,
    templateName: 'order_status_update',
    templateParams: {
      customer_name: orderData.customerName,
      order_id: orderData.orderId,
      status: orderData.newStatus,
      delivery_date: orderData.estimatedDate,
      tracking_link: orderData.trackingLink
    }
  })
}

/**
 * Envia promoção/oferta especial
 */
export async function sendPromotion(
  phoneNumber: string,
  promotionData: {
    customerName: string
    promoName: string
    discount: string
    validUntil: string
    link: string
  }
): Promise<WhatsAppResponse> {
  return sendWhatsAppMessage({
    to: phoneNumber,
    templateName: 'promotion',
    templateParams: {
      customer_name: promotionData.customerName,
      promo_name: promotionData.promoName,
      discount: promotionData.discount,
      valid_until: promotionData.validUntil,
      link: promotionData.link
    }
  })
}

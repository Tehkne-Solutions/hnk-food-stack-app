'use client'

export interface WhatsAppLinkOptions {
  phone: string
  message?: string
  campaign?: string
}

function cleanPhone(phone: string): string {
  return phone.replace(/^\+?55/, '').replace(/\D/g, '')
}

export function useWhatsAppLink(options: WhatsAppLinkOptions) {
  const { phone, message = 'Olá! Gostaria de fazer um pedido.', campaign } = options
  const cleanedPhone = cleanPhone(phone)

  const getLink = (customMsg?: string): string => {
    const finalMsg = customMsg || message
    const encoded = encodeURIComponent(finalMsg)
    const params = campaign ? `?utm_campaign=${campaign}` : ''
    return `https://wa.me/55${cleanedPhone}?text=${encoded}${params}`
  }

  const openWhatsApp = (customMsg?: string) => {
    if (typeof window !== 'undefined') {
      window.open(getLink(customMsg), '_blank')
    }
  }

  return {
    link: getLink(),
    getLink,
    openWhatsApp,
  }
}

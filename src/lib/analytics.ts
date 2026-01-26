/**
 * @name Analytics & UTM Tracking
 * @description Utilities para construir links com UTM parameters e event tracking
 * @author HNK Labs
 */

/**
 * Construir URL com parâmetros UTM para rastreamento
 * @param baseUrl - URL base (ex: "/bem-estar" ou "https://wa.me/...")
 * @param utmParams - Parâmetros UTM customizados
 * @returns URL completa com UTM params
 * 
 * @example
 * const url = buildUtmLink('/checkout', {
 *   utm_source: 'whatsapp',
 *   utm_content: 'fraldinha'
 * })
 */
export function buildUtmLink(
    baseUrl: string,
    utmParams: Record<string, string> = {}
): string {
    try {
        // Detectar se é URL absoluta ou relativa
        const isAbsolute = baseUrl.startsWith('http')
        const url = new URL(baseUrl, isAbsolute ? undefined : window.location.origin)

        // UTM padrões (podem ser sobrescritos)
        const defaultParams = {
            utm_source: 'hnk_food_stack',
            utm_medium: 'mobile_app',
            utm_campaign: 'churrascaria_bem_estar',
        }

        const allParams = { ...defaultParams, ...utmParams }

        Object.entries(allParams).forEach(([key, value]) => {
            url.searchParams.set(key, value)
        })

        return url.toString()
    } catch (error) {
        console.error('[UTM Builder] Erro:', error)
        return baseUrl
    }
}

/**
 * Enviar evento para Google Analytics
 * @param eventName - Nome do evento
 * @param eventData - Dados do evento
 */
export function trackEvent(
    eventName: string,
    eventData: Record<string, any> = {}
): void {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, eventData)
    }
}

/**
 * Enviar evento para Meta Pixel
 * @param eventName - Nome do evento
 * @param eventData - Dados do evento
 */
export function trackPixelEvent(
    eventName: string,
    eventData: Record<string, any> = {}
): void {
    if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', eventName, eventData)
    }
}

/**
 * Rastrear adição ao carrinho (Google + Meta)
 */
export function trackAddToCart(productData: {
    id: string
    name: string
    price: number
    category?: string
}): void {
    trackEvent('add_to_cart', {
        content_type: 'product',
        item_id: productData.id,
        item_name: productData.name,
        value: productData.price,
        currency: 'BRL',
    })

    trackPixelEvent('AddToCart', {
        content_name: productData.name,
        content_type: 'product',
        value: productData.price,
        currency: 'BRL',
    })
}

/**
 * Rastrear visualização de produto
 */
export function trackViewContent(productData: {
    id: string
    name: string
    price: number
    category?: string
}): void {
    trackEvent('view_item', {
        content_type: 'product',
        item_id: productData.id,
        item_name: productData.name,
        value: productData.price,
        currency: 'BRL',
    })

    trackPixelEvent('ViewContent', {
        content_name: productData.name,
        content_type: 'product',
        value: productData.price,
        currency: 'BRL',
    })
}

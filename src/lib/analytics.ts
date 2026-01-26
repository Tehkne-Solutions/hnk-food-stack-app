/**
 * @name Analytics & Event Tracking (GA4 + Meta Pixel + UTM)
 * @description Sistema completo de rastreamento com mock support
 * @version 2.0
 * @author HNK Labs
 * 
 * FEATURES:
 * - Google Analytics 4 (GA4) com modo mock
 * - Meta Pixel com modo mock
 * - UTM parameter builder
 * - Centralized event tracking
 * - localStorage debug para eventos mock
 */

// ================== CONFIG ==================

/**
 * Configuração de Analytics
 * Detecta automaticamente se está em modo mock (sem IDs reais)
 */
export const ANALYTICS_CONFIG = {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || 'G-MOCK-DEV-MODE',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '123456789',
    isDevelopment: process.env.NODE_ENV === 'development',
    isMockMode: !process.env.NEXT_PUBLIC_GA4_ID || !process.env.NEXT_PUBLIC_META_PIXEL_ID,
}

// ================== UTM BUILDER ==================

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


// ================== EVENT TRACKING ==================

/**
 * Enviar evento para Google Analytics 4
 * Em modo mock, registra no console e localStorage
 */
export function trackGAEvent(
    eventName: string,
    eventData: Record<string, string | number | boolean> = {}
): void {
    if (ANALYTICS_CONFIG.isMockMode) {
        console.log(`[GA4-MOCK] ${eventName}`, eventData)
        logMockEvent('ga4', eventName, eventData)
    } else if (typeof window !== 'undefined') {
        const windowObj = window as { gtag?: (action: string, event: string, data?: unknown) => void }
        if (windowObj.gtag) {
            windowObj.gtag('event', eventName, eventData)
        }
    }
}

/**
 * Enviar evento para Meta Pixel
 * Em modo mock, registra no console e localStorage
 */
export function trackPixelEvent(
    eventName: string,
    eventData: Record<string, string | number | boolean> = {}
): void {
    if (ANALYTICS_CONFIG.isMockMode) {
        console.log(`[META-PIXEL-MOCK] ${eventName}`, eventData)
        logMockEvent('pixel', eventName, eventData)
    } else if (typeof window !== 'undefined') {
        const fbqFunction = (window as { fbq?: (action: string, event: string, data?: unknown) => void } & object).fbq
        if (fbqFunction) {
            fbqFunction('track', eventName, eventData)
        }
    }
}

/**
 * Enviar evento para GA4 + Meta Pixel (dual tracking)
 */
export function trackEvent(
    eventName: string,
    eventData: Record<string, string | number | boolean> = {}
): void {
    trackGAEvent(eventName, eventData)
    trackPixelEvent(eventName, eventData)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug(`📊 Event tracked: ${eventName}`, eventData)
    }
}

// ================== PRODUCT & CART TRACKING ==================

/**
 * Rastrear adição ao carrinho (Google + Meta)
 */
export function trackAddToCart(productData: {
    id: string
    name: string
    price: number
    category?: string
}): void {
    trackGAEvent('add_to_cart', {
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

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('🛒 Add to Cart:', productData)
    }
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
    trackGAEvent('view_item', {
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

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('👁️ View Content:', productData)
    }
}

/**
 * Rastrear remoção do carrinho
 */
export function trackRemoveFromCart(productData: {
    id: string
    name: string
    price: number
}): void {
    trackGAEvent('remove_from_cart', {
        item_id: productData.id,
        item_name: productData.name,
        value: productData.price,
        currency: 'BRL',
    })

    trackPixelEvent('RemoveFromCart', {
        content_name: productData.name,
        value: productData.price,
        currency: 'BRL',
    })
}

/**
 * Rastrear visualização do carrinho
 */
export function trackViewCart(cartValue: number, itemCount: number): void {
    trackGAEvent('view_cart', {
        value: cartValue,
        currency: 'BRL',
        item_count: itemCount,
    })

    trackPixelEvent('ViewContent', {
        content_type: 'cart',
        value: cartValue,
        currency: 'BRL',
    })
}

/**
 * Rastrear início do checkout
 */
export function trackBeginCheckout(cartValue: number): void {
    trackGAEvent('begin_checkout', {
        value: cartValue,
        currency: 'BRL',
    })

    trackPixelEvent('InitiateCheckout', {
        value: cartValue,
        currency: 'BRL',
    })
}

/**
 * Rastrear compra/conversão
 */
export function trackPurchase(
    orderId: string,
    cartValue: number,
    tax?: number,
    shipping?: number
): void {
    const value = cartValue + (tax || 0) + (shipping || 0)

    trackGAEvent('purchase', {
        transaction_id: orderId,
        value,
        currency: 'BRL',
        tax: tax || 0,
        shipping: shipping || 0,
    })

    trackPixelEvent('Purchase', {
        value,
        currency: 'BRL',
    })

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('✅ Purchase tracked:', { orderId, value })
    }
}

/**
 * Rastrear busca
 */
export function trackSearch(query: string, resultsCount?: number): void {
    trackGAEvent('search', {
        search_term: query,
        ...(resultsCount && { results: resultsCount }),
    })

    trackPixelEvent('Search', {
        search_string: query,
    })
}

/**
 * Rastrear geração de lead (WhatsApp contact, etc)
 */
export function trackGenerateLead(leadType: string): void {
    trackGAEvent('generate_lead', {
        lead_type: leadType,
    })

    trackPixelEvent('Lead', {
        content_name: leadType,
    })
}

// ================== DEBUG & INITIALIZATION ==================

/**
 * Registrar evento mock no localStorage para debug
 */
function logMockEvent(
    platform: 'ga4' | 'pixel',
    eventName: string,
    eventData: Record<string, string | number | boolean>
): void {
    if (typeof window === 'undefined') return

    const key = `analytics_mock_${platform}`
    const events = JSON.parse(localStorage.getItem(key) || '[]') as Array<unknown>

    events.push({
        timestamp: new Date().toISOString(),
        event: eventName,
        data: eventData,
    })

    // Manter apenas últimos 50 eventos
    localStorage.setItem(key, JSON.stringify(events.slice(-50)))
}

/**
 * Obter eventos mock do localStorage para debug
 */
export function getMockEvents(platform: 'ga4' | 'pixel' | 'all' = 'all'): Array<unknown> {
    if (typeof window === 'undefined') return []

    if (platform === 'all') {
        const ga4 = JSON.parse(localStorage.getItem('analytics_mock_ga4') || '[]')
        const pixel = JSON.parse(localStorage.getItem('analytics_mock_pixel') || '[]')
        return [...ga4, ...pixel]
    }

    return JSON.parse(localStorage.getItem(`analytics_mock_${platform}`) || '[]')
}

/**
 * Limpar eventos mock do localStorage
 */
export function clearMockEvents(platform: 'ga4' | 'pixel' | 'all' = 'all'): void {
    if (typeof window === 'undefined') return

    if (platform === 'all') {
        localStorage.removeItem('analytics_mock_ga4')
        localStorage.removeItem('analytics_mock_pixel')
    } else {
        localStorage.removeItem(`analytics_mock_${platform}`)
    }

    console.log(`✅ Mock events cleared (${platform})`)
}

/**
 * Exibir status de Analytics (útil para debugging)
 */
export function printAnalyticsStatus(): void {
    console.group('📊 Analytics Status')
    console.log('Config:', ANALYTICS_CONFIG)
    console.log('Mock Mode:', ANALYTICS_CONFIG.isMockMode)
    console.log('GA4 ID:', ANALYTICS_CONFIG.ga4Id)
    console.log('Meta Pixel ID:', ANALYTICS_CONFIG.metaPixelId)

    if (ANALYTICS_CONFIG.isMockMode) {
        const ga4Events = getMockEvents('ga4')
        const pixelEvents = getMockEvents('pixel')
        console.log('GA4 Mock Events:', ga4Events)
        console.log('Meta Pixel Mock Events:', pixelEvents)
    }
    console.groupEnd()
}

/**
 * Inicializar GA4 (chamado no layout raiz)
 */
export function initializeGA4(): void {
    if (typeof window === 'undefined') return

    if (ANALYTICS_CONFIG.isMockMode) {
        console.warn('⚠️ Analytics em MODO MOCK')
        console.warn('📌 Configure NEXT_PUBLIC_GA4_ID em .env.local para rastreamento real')
        console.warn('📌 Configure NEXT_PUBLIC_META_PIXEL_ID em .env.local para Meta Pixel')
        return
    }

    // Carregar script GA4 real
    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga4Id}`
    script.async = true
    document.head.appendChild(script)

        // Inicializar dataLayer
        ; (window as { dataLayer?: unknown[] } & object).dataLayer = (window as { dataLayer?: unknown[] } & object).dataLayer || []

    const gtagFunction = function (...args: unknown[]): void {
        ; ((window as { dataLayer?: unknown[] } & object).dataLayer || []).push(args)
    }
        ; (window as { gtag?: typeof gtagFunction } & object).gtag = gtagFunction

    gtagFunction('js', new Date())
    gtagFunction('config', ANALYTICS_CONFIG.ga4Id)

    console.log('✅ GA4 initialized')
}

/**
 * Inicializar Meta Pixel (chamado no layout raiz)
 */
export function initializeMetaPixel(): void {
    if (typeof window === 'undefined') return

    if (ANALYTICS_CONFIG.isMockMode) {
        // Mock fbq function
        ; (window as { fbq?: (action: string, event: string, data?: unknown) => void } & object).fbq = function (action: string, event: string, data?: unknown) {
            console.log(`[META-PIXEL-MOCK] ${action}: ${event}`, data)
        }
        return
    }

    // Carregar script Meta Pixel real
    ; (window as { fbq?: (action: string, event: string, data?: unknown) => void } & object).fbq = function fbq(...args: unknown[]) {
        ; ((window as { _fbq?: unknown[] } & object)._fbq || (
            (window as { _fbq?: unknown[] } & object)._fbq = []
        )).push(args)
    }
        ; (window as unknown as { fbq: { disablePushState?: boolean } }).fbq!.disablePushState = true

    const script = document.createElement('script')
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'
    script.async = true
    document.head.appendChild(script)

        ; (window as { fbq?: (action: string, event: string, data?: unknown) => void } & object).fbq?.('init', ANALYTICS_CONFIG.metaPixelId)
        ; (window as { fbq?: (action: string, event: string, data?: unknown) => void } & object).fbq?.('track', 'PageView')

    console.log('✅ Meta Pixel initialized')
}
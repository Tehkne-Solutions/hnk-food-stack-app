/**
 * @name Event Tracker
 * @description Sistema centralizado de rastreamento de eventos
 * @version 1.0
 * 
 * Gerencia todos os eventos de usuário e dispara para:
 * - Google Analytics 4
 * - Meta Pixel
 * - GTM DataLayer (futuro)
 */

import {
    trackAddToCart,
    trackRemoveFromCart,
    trackViewContent,
    trackViewCart,
    trackBeginCheckout,
    trackPurchase,
    trackSearch,
    trackGenerateLead,
    trackEvent,
    ANALYTICS_CONFIG,
} from './analytics'

/**
 * Tipos de eventos rastreáveis
 */
export enum EventType {
    // Produto
    VIEW_PRODUCT = 'view_product',
    ADD_TO_CART = 'add_to_cart',
    REMOVE_FROM_CART = 'remove_from_cart',

    // Carrinho
    VIEW_CART = 'view_cart',

    // Checkout
    BEGIN_CHECKOUT = 'begin_checkout',
    PURCHASE = 'purchase',

    // Busca
    SEARCH = 'search',

    // Leads
    CONTACT_WHATSAPP = 'contact_whatsapp',
    CONTACT_EMAIL = 'contact_email',
    CONTACT_PHONE = 'contact_phone',

    // Custom
    CUSTOM = 'custom',
}

/**
 * Interface de evento
 */
export interface Event {
    type: EventType | string
    data: Record<string, unknown>
    timestamp?: Date
}

/**
 * Fila de eventos para batch processing (futuro)
 */
const eventQueue: Event[] = []

/**
 * Rastrear visualização de produto
 */
export function trackProductView(product: {
    id: string
    name: string
    price: number
    category?: string
    image?: string
}): void {
    const event: Event = {
        type: EventType.VIEW_PRODUCT,
        data: product,
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackViewContent(product)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: View Product', product)
    }
}

/**
 * Rastrear adição ao carrinho
 */
export function trackProductAddToCart(product: {
    id: string
    name: string
    price: number
    quantity?: number
    category?: string
}): void {
    const event: Event = {
        type: EventType.ADD_TO_CART,
        data: product,
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackAddToCart(product)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Add to Cart', product)
    }
}

/**
 * Rastrear remoção do carrinho
 */
export function trackProductRemoveFromCart(product: {
    id: string
    name: string
    price: number
}): void {
    const event: Event = {
        type: EventType.REMOVE_FROM_CART,
        data: product,
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackRemoveFromCart(product)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Remove from Cart', product)
    }
}

/**
 * Rastrear visualização do carrinho
 */
export function trackCartView(cartValue: number, itemCount: number): void {
    const event: Event = {
        type: EventType.VIEW_CART,
        data: { cartValue, itemCount },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackViewCart(cartValue, itemCount)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: View Cart', { cartValue, itemCount })
    }
}

/**
 * Rastrear início do checkout
 */
export function trackCheckoutStart(cartValue: number): void {
    const event: Event = {
        type: EventType.BEGIN_CHECKOUT,
        data: { cartValue },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackBeginCheckout(cartValue)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Begin Checkout', { cartValue })
    }
}

/**
 * Rastrear compra bem-sucedida
 */
export function trackCheckoutComplete(orderId: string, cartValue: number, tax?: number, shipping?: number): void {
    const event: Event = {
        type: EventType.PURCHASE,
        data: { orderId, cartValue, tax, shipping },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackPurchase(orderId, cartValue, tax, shipping)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Purchase', { orderId, cartValue, tax, shipping })
    }
}

/**
 * Rastrear busca
 */
export function trackUserSearch(query: string, resultsCount?: number): void {
    const event: Event = {
        type: EventType.SEARCH,
        data: { query, resultsCount },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackSearch(query, resultsCount)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Search', { query, resultsCount })
    }
}

/**
 * Rastrear contato via WhatsApp
 */
export function trackWhatsAppContact(
    phone: string,
    message?: string,
    source?: string
): void {
    const event: Event = {
        type: EventType.CONTACT_WHATSAPP,
        data: { phone, message, source },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackGenerateLead('whatsapp_contact')
    trackEvent('contact_whatsapp', {
        phone: phone.substring(phone.length - 4), // Hash para privacy
        source: source || 'unknown',
    })

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: WhatsApp Contact', { source })
    }
}

/**
 * Rastrear contato via Email
 */
export function trackEmailContact(email: string, subject?: string, source?: string): void {
    const event: Event = {
        type: EventType.CONTACT_EMAIL,
        data: { email, subject, source },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackGenerateLead('email_contact')
    trackEvent('contact_email', {
        source: source || 'unknown',
    })

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Email Contact', { source })
    }
}

/**
 * Rastrear contato via Telefone
 */
export function trackPhoneContact(phone: string, source?: string): void {
    const event: Event = {
        type: EventType.CONTACT_PHONE,
        data: { phone, source },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackGenerateLead('phone_contact')
    trackEvent('contact_phone', {
        source: source || 'unknown',
    })

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Phone Contact', { source })
    }
}

/**
 * Rastrear evento customizado
 */
export function trackCustomEvent(
    eventName: string,
    eventData: Record<string, unknown>
): void {
    const event: Event = {
        type: EventType.CUSTOM,
        data: { ...eventData, custom_event: eventName },
        timestamp: new Date(),
    }

    eventQueue.push(event)
    trackEvent(eventName, eventData as Record<string, string | number | boolean>)

    if (ANALYTICS_CONFIG.isDevelopment) {
        console.debug('📊 Event: Custom', { eventName, eventData })
    }
}

/**
 * Obter fila de eventos
 */
export function getEventQueue(): Event[] {
    return [...eventQueue]
}

/**
 * Limpar fila de eventos
 */
export function clearEventQueue(): void {
    eventQueue.length = 0
    console.log('✅ Event queue cleared')
}

/**
 * Exibir estatísticas de eventos
 */
export function printEventStats(): void {
    const stats = {
        total: eventQueue.length,
        byType: eventQueue.reduce(
            (acc, event) => {
                acc[event.type] = (acc[event.type] || 0) + 1
                return acc
            },
            {} as Record<string, number>
        ),
    }

    console.group('📊 Event Statistics')
    console.log('Total Events:', stats.total)
    console.log('By Type:', stats.byType)
    console.table(eventQueue)
    console.groupEnd()
}

export default {
    EventType,
    trackProductView,
    trackProductAddToCart,
    trackProductRemoveFromCart,
    trackCartView,
    trackCheckoutStart,
    trackCheckoutComplete,
    trackUserSearch,
    trackWhatsAppContact,
    trackEmailContact,
    trackPhoneContact,
    trackCustomEvent,
    getEventQueue,
    clearEventQueue,
    printEventStats,
}

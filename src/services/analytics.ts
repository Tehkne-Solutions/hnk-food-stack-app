/**
 * Serviço de Analytics
 * HNK-GIP Pattern: Rastreamento híbrido (Client-Side + Server-Side)
 * 
 * Integra com:
 * - Meta Pixel (Facebook Ads)
 * - Google Analytics 4
 * - Google Ads Conversion Tracking (GACT)
 * - Server-Side Event API (CAPI) para bypass de adblockers
 */

import type { AnalyticsEvent, AnalyticsEventType } from '@/types/analytics'

// Configurações (obter do banco de dados na FASE 1)
const FACEBOOK_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || ''
const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

/**
 * Disparar evento para Meta Pixel
 * Roda no client-side (JavaScript nativo)
 */
export function trackMetaPixelEvent(
    eventName: AnalyticsEventType,
    data?: Record<string, any>
) {
    if (!FACEBOOK_PIXEL_ID) return

    // Criar snippet do Meta Pixel se não existir
    if (typeof window !== 'undefined' && !(window as any).fbq) {
        (window as any).fbq = function (...args: any[]) {
            ; ((window as any).fbq.queue = (window as any).fbq.queue || []).push(args)
        }
            ; (window as any).fbq('init', FACEBOOK_PIXEL_ID)
            ; (window as any).fbq('track', 'PageView')
    }

    if ((window as any).fbq) {
        ; (window as any).fbq('track', eventName, data || {})
    }
}

/**
 * Disparar evento para Google Analytics 4
 * Roda no client-side
 */
export function trackGoogleAnalyticsEvent(
    eventName: AnalyticsEventType,
    data?: Record<string, any>
) {
    if (!GOOGLE_ANALYTICS_ID) return

    if (typeof window !== 'undefined' && (window as any).gtag) {
        ; (window as any).gtag('event', eventName, data || {})
    }
}

/**
 * Disparar ambos os eventos simultaneamente
 */
export function trackAnalyticsEvent(
    eventName: AnalyticsEventType,
    data?: Record<string, any>
) {
    trackMetaPixelEvent(eventName, data)
    trackGoogleAnalyticsEvent(eventName, data)
}

/**
 * Eventos pré-configurados
 */
export const analyticsEvents = {
    viewContent: (product: { id: string; name: string; price: number }) => ({
        event_name: 'ViewContent',
        value: product.price,
        currency: 'BRL',
        items: [
            {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
            },
        ],
    }),

    addToCart: (items: any[], total: number) => ({
        event_name: 'AddToCart',
        value: total,
        currency: 'BRL',
        items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
    }),

    initiateCheckout: (items: any[], total: number) => ({
        event_name: 'InitiateCheckout',
        value: total,
        currency: 'BRL',
        items,
    }),

    purchase: (orderId: string, items: any[], total: number, customer: any) => ({
        event_name: 'Purchase',
        value: total,
        currency: 'BRL',
        items,
        customer_email: customer.email,
        phone: customer.phone,
    }),

    lead: (data: any) => ({
        event_name: 'Lead',
        ...data,
    }),

    search: (searchQuery: string, resultsCount: number) => ({
        event_name: 'Search',
        value: resultsCount,
    }),
}

'use client'

import { useCallback } from 'react'
import {
    trackAnalyticsEvent,
    analyticsEvents,
    trackMetaPixelEvent,
    trackGoogleAnalyticsEvent,
} from '@/services/analytics'
import type { AnalyticsEventType } from '@/types/analytics'

/**
 * Hook useAnalytics
 * Facilita o disparo de eventos em componentes
 * 
 * @example
 * const { trackEvent, trackPurchase } = useAnalytics()
 * 
 * <button onClick={() => trackEvent('ViewContent', { value: 100 })}>
 *   Ver Produto
 * </button>
 */
export function useAnalytics() {
    const trackEvent = useCallback(
        (eventName: AnalyticsEventType, data?: Record<string, any>) => {
            trackAnalyticsEvent(eventName, data)
        },
        []
    )

    const trackViewContent = useCallback((product: any) => {
        const eventData = analyticsEvents.viewContent(product)
        trackAnalyticsEvent('ViewContent', eventData)
    }, [])

    const trackAddToCart = useCallback((items: any[], total: number) => {
        const eventData = analyticsEvents.addToCart(items, total)
        trackAnalyticsEvent('AddToCart', eventData)
    }, [])

    const trackInitiateCheckout = useCallback((items: any[], total: number) => {
        const eventData = analyticsEvents.initiateCheckout(items, total)
        trackAnalyticsEvent('InitiateCheckout', eventData)
    }, [])

    const trackPurchase = useCallback(
        (orderId: string, items: any[], total: number, customer: any) => {
            const eventData = analyticsEvents.purchase(orderId, items, total, customer)
            trackAnalyticsEvent('Purchase', eventData)
        },
        []
    )

    const trackLead = useCallback((data: any) => {
        const eventData = analyticsEvents.lead(data)
        trackAnalyticsEvent('Lead', eventData)
    }, [])

    const trackSearch = useCallback((query: string, count: number) => {
        const eventData = analyticsEvents.search(query, count)
        trackAnalyticsEvent('Search', eventData)
    }, [])

    // Métodos diretos para Meta Pixel
    const trackMetaEvent = useCallback(
        (eventName: AnalyticsEventType, data?: Record<string, any>) => {
            trackMetaPixelEvent(eventName, data)
        },
        []
    )

    // Métodos diretos para Google Analytics
    const trackGoogleEvent = useCallback(
        (eventName: AnalyticsEventType, data?: Record<string, any>) => {
            trackGoogleAnalyticsEvent(eventName, data)
        },
        []
    )

    return {
        trackEvent,
        trackViewContent,
        trackAddToCart,
        trackInitiateCheckout,
        trackPurchase,
        trackLead,
        trackSearch,
        trackMetaEvent,
        trackGoogleEvent,
    }
}
